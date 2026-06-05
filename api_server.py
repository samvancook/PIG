#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import random
import re
import sqlite3
import subprocess
import time
import uuid
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import error as urllib_error
from urllib import request as urllib_request
from urllib.parse import parse_qs, quote, unquote, urlparse


APP_ROOT = Path(__file__).resolve().parent
WORKSPACE_ROOT = APP_ROOT.parent
APP_DATA_ROOT = APP_ROOT / "data"
LEGACY_WEAVER_ROW_CAP = 60
LEGACY_WEAVER_PROCESS_MAX_MS = 5000
WEAVER_REWORK_FILTERS = {"rework", "rework_requested", "rejected"}


class EmptyHandoffQueueError(RuntimeError):
    pass


def env_path(name: str, default: Path) -> Path:
    value = os.environ.get(name, "").strip()
    return Path(value).expanduser() if value else default


FORMAL_CATALOG_DB = env_path("PIG_FORMAL_CATALOG_DB", WORKSPACE_ROOT / "poetry_catalog" / "formal_catalog.db")
EXCERPT_RUNTIME_DB = env_path(
    "PIG_EXCERPT_RUNTIME_DB",
    APP_DATA_ROOT / "excerpt_library_runtime.db"
    if (APP_DATA_ROOT / "excerpt_library_runtime.db").exists()
    else WORKSPACE_ROOT.parent / "Excerpt Management" / "data" / "excerpt_library_runtime.db",
)
QI_STATUS_DB = env_path(
    "PIG_QI_STATUS_DB",
    APP_DATA_ROOT / "excerpt_library_qi_status.db"
    if (APP_DATA_ROOT / "excerpt_library_qi_status.db").exists()
    else WORKSPACE_ROOT.parent / "Excerpt Management" / "data" / "excerpt_library_qi_status.db",
)
NORMALIZED_EXCERPT_DB = env_path(
    "PIG_NORMALIZED_EXCERPT_DB",
    APP_DATA_ROOT / "excerpt_library_normalized.db"
    if (APP_DATA_ROOT / "excerpt_library_normalized.db").exists()
    else WORKSPACE_ROOT.parent / "Excerpt Management" / "data" / "excerpt_library_normalized.db",
)
SHORT_POEMS_JSON = env_path(
    "PIG_SHORT_POEMS_JSON",
    APP_DATA_ROOT / "full-poems-120-or-less-v74.json"
    if (APP_DATA_ROOT / "full-poems-120-or-less-v74.json").exists()
    else WORKSPACE_ROOT / "poetry_catalog" / "exports" / "full-poems-120-or-less-v74.json",
)
BOOK_AUTHOR_MAP_JSON = env_path(
    "PIG_BOOK_AUTHOR_MAP_JSON",
    APP_DATA_ROOT / "book_author_map.json",
)
ARTIST_HANDLE_SPREADSHEET_ID = os.environ.get(
    "PIG_ARTIST_HANDLE_SPREADSHEET_ID",
    "1vy5K8r9S-C4cV5qLqQquw35ZhMz8X5dlFaB4h4tZ4_o",
).strip()
ARTIST_HANDLE_SHEET_NAME = os.environ.get(
    "PIG_ARTIST_HANDLE_SHEET_NAME",
    "Handle Database (all entries)",
).strip()


def poetry_please_ranked_texts_url() -> str:
    return os.environ.get(
        "POETRY_PLEASE_RANKED_TEXTS_URL",
        "https://poetryplease.org/api/pig/ranked-texts",
    ).strip()


def poetry_please_auth_token() -> str:
    return os.environ.get("POETRY_PLEASE_AUTH_TOKEN", "").strip()


def poetry_please_api_key() -> str:
    return os.environ.get("POETRY_PLEASE_API_KEY", "").strip()


def poetry_please_auth_headers() -> list[str]:
    headers: list[str] = []

    api_key = poetry_please_api_key()
    if api_key:
        headers.append(f"x-api-key: {api_key}")

    token = poetry_please_auth_token()
    if token:
        headers.append(f"Authorization: Bearer {token}")

    return headers


def poetry_please_token_error() -> str | None:
    if poetry_please_api_key():
        return None

    token = poetry_please_auth_token()
    if not token:
        return "Neither POETRY_PLEASE_API_KEY nor POETRY_PLEASE_AUTH_TOKEN is configured."

    parts = token.split(".")
    if len(parts) < 2:
        return None

    try:
        payload = parts[1]
        payload += "=" * (-len(payload) % 4)
        decoded = json.loads(base64.urlsafe_b64decode(payload.encode("utf-8")).decode("utf-8"))
    except Exception:
        return None

    exp = decoded.get("exp")
    if not isinstance(exp, int):
        return None
    if exp <= int(time.time()):
        return "POETRY_PLEASE_AUTH_TOKEN has expired. Add a durable POETRY_PLEASE_API_KEY or a fresh Poetry Please token to .env and restart P.I.G."
    return None


def weaver_graphics_requests_url() -> str:
    return os.environ.get(
        "WEAVER_PIG_GRAPHICS_REQUESTS_URL",
        "https://weaver.buttonpoetry.com/api/pig/graphics-requests",
    ).strip()


def weaver_graphics_request_books_url() -> str:
    return os.environ.get(
        "WEAVER_PIG_GRAPHICS_REQUEST_BOOKS_URL",
        "https://weaver.buttonpoetry.com/api/pig/graphics-request-books",
    ).strip()


def weaver_completed_graphics_url() -> str:
    return os.environ.get(
        "WEAVER_PIG_COMPLETED_GRAPHICS_URL",
        "https://weaver.buttonpoetry.com/api/pig/completed-graphics",
    ).strip()


def weaver_graphics_handoff_base_url() -> str:
    return os.environ.get(
        "WEAVER_GRAPHICS_HANDOFF_BASE_URL",
        "https://weaver.buttonpoetry.com/graphics-handoff",
    ).strip().rstrip("/")


def default_drive_folder_id() -> str:
    return os.environ.get("PIG_DEFAULT_DRIVE_FOLDER_ID", "").strip()


def default_drive_folder_name() -> str:
    return os.environ.get("PIG_DEFAULT_DRIVE_FOLDER_NAME", "").strip()


def server_drive_upload_enabled() -> bool:
    return bool(default_drive_folder_id())


def dict_factory(cursor: sqlite3.Cursor, row: tuple) -> dict:
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}


def open_connection(path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(path)
    connection.row_factory = dict_factory
    return connection


def load_dotenv() -> None:
    for candidate in (APP_ROOT / ".env", WORKSPACE_ROOT / ".env"):
        if not candidate.exists():
            continue

        for raw_line in candidate.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


def fetch_service_account_access_token() -> str:
    metadata_request = urllib_request.Request(
        "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
        headers={"Metadata-Flavor": "Google"},
    )
    try:
        with urllib_request.urlopen(metadata_request, timeout=10) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        raise RuntimeError("Could not fetch the Cloud Run service account access token.") from exc

    token = str(payload.get("access_token", "")).strip()
    if not token:
        raise RuntimeError("Cloud Run service account token response did not include an access token.")
    return token


def decode_data_url(data_url: str) -> tuple[str, bytes]:
    if not data_url.startswith("data:") or "," not in data_url:
        raise ValueError("Invalid image payload.")

    header, encoded = data_url.split(",", 1)
    mime_type = header[5:].split(";")[0] or "application/octet-stream"
    if ";base64" not in header:
        raise ValueError("Image payload must be base64 encoded.")
    return mime_type, base64.b64decode(encoded)


TRANSIENT_GOOGLE_STATUS_CODES = {429, 500, 502, 503, 504}


def drive_api_request(url: str, *, method: str = "GET", body: bytes | None = None, headers: dict | None = None) -> dict:
    access_token = fetch_service_account_access_token()
    request_headers = {
        "Authorization": f"Bearer {access_token}",
        **(headers or {}),
    }
    attempts = 3 if method == "GET" else 1
    for attempt in range(attempts):
        request = urllib_request.Request(url, data=body, headers=request_headers, method=method)
        try:
            with urllib_request.urlopen(request, timeout=60) as response:
                content = response.read().decode("utf-8")
            return json.loads(content) if content else {}
        except urllib_error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            try:
                payload = json.loads(detail)
                message = payload.get("error", {}).get("message") or detail
            except Exception:
                message = detail or str(exc)
            if exc.code in TRANSIENT_GOOGLE_STATUS_CODES and attempt < attempts - 1:
                time.sleep(0.75 * (attempt + 1))
                continue
            raise RuntimeError(f"Google API request failed ({exc.code}): {message}")
        except Exception as exc:
            if attempt < attempts - 1:
                time.sleep(0.75 * (attempt + 1))
                continue
            raise RuntimeError("Google API request failed.") from exc

    raise RuntimeError("Google API request failed.")


def upload_image_to_drive(folder_id: str, file_name: str, image_data_url: str) -> dict:
    mime_type, image_bytes = decode_data_url(image_data_url)
    boundary = f"pig-{int(time.time() * 1000)}"
    metadata = {
        "name": file_name,
        "mimeType": mime_type,
        "parents": [folder_id],
    }

    body = b"".join(
        [
            f"--{boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{json.dumps(metadata)}\r\n".encode("utf-8"),
            f"--{boundary}\r\nContent-Type: {mime_type}\r\n\r\n".encode("utf-8"),
            image_bytes,
            f"\r\n--{boundary}--".encode("utf-8"),
        ]
    )

    payload = drive_api_request(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink,webContentLink,thumbnailLink",
        method="POST",
        body=body,
        headers={"Content-Type": f"multipart/related; boundary={boundary}"},
    )

    file_id = str(payload.get("id", "")).strip()
    if not file_id:
        raise RuntimeError("Drive upload failed.")

    try:
        drive_api_request(
            f"https://www.googleapis.com/drive/v3/files/{file_id}/permissions?supportsAllDrives=true",
            method="POST",
            body=json.dumps({"role": "reader", "type": "anyone"}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
    except Exception:
        pass

    return {
        "id": file_id,
        "assetUrl": payload.get("webViewLink") or f"https://drive.google.com/file/d/{file_id}/view",
        "assetPreviewUrl": f"https://drive.google.com/thumbnail?id={file_id}&sz=w1600",
    }


def source_label(source_type: str) -> str:
    labels = {
      "excerpt_library": "All excerpt texts",
      "approved_excerpt_library": "Approved / QI-ready excerpts",
      "poetry_please_ranked_texts": "Poetry Please ranked texts",
      "weaver_graphics_requests": "Weaver needs-graphics queue",
      "catalog_short_poems": "Catalog short poems",
    }
    return labels.get(source_type, source_type)


def source_availability() -> dict[str, dict]:
    poetry_please_error = poetry_please_token_error()
    return {
        "weaver_graphics_requests": {
            "available": bool(weaver_graphics_requests_url()),
            "label": source_label("weaver_graphics_requests"),
            "kind": "remote",
        },
        "poetry_please_ranked_texts": {
            "available": bool(poetry_please_ranked_texts_url()) and poetry_please_error is None,
            "label": source_label("poetry_please_ranked_texts"),
            "kind": "remote",
            "message": poetry_please_error or "",
        },
        "excerpt_library": {
            "available": EXCERPT_RUNTIME_DB.exists(),
            "label": source_label("excerpt_library"),
            "kind": "local",
        },
        "approved_excerpt_library": {
            "available": EXCERPT_RUNTIME_DB.exists() and QI_STATUS_DB.exists(),
            "label": source_label("approved_excerpt_library"),
            "kind": "local",
        },
        "catalog_short_poems": {
            "available": SHORT_POEMS_JSON.exists(),
            "label": source_label("catalog_short_poems"),
            "kind": "local",
        },
    }


def preview_text(text: str, limit: int = 160) -> str:
    collapsed = " ".join((text or "").split())
    if len(collapsed) <= limit:
        return collapsed
    return f"{collapsed[:limit - 1].rstrip()}…"


def normalize_text(value: str) -> str:
    return str(value or "").strip()


def normalize_key(value: str) -> str:
    return normalize_text(value).lower()


def normalize_catalog_lookup_key(value: str) -> str:
    return (
        normalize_text(value)
        .replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("–", "-")
        .replace("—", "-")
        .lower()
    )


def normalize_text_body(value: str) -> str:
    return (
        normalize_text(value)
        .replace("\r\n", "\n")
        .replace("\r", "\n")
        .replace("\t", " ")
        .replace("  ", " ")
        .strip()
    )


def normalize_excerpt_lookup_key(value: str) -> str:
    normalized = normalize_catalog_lookup_key(normalize_text_body(value)).replace("\n", " ")
    normalized = re.sub(r"\s+", " ", normalized).strip()
    normalized = re.sub(r'^[\'"“”‘’«»‹›]+', "", normalized)
    normalized = re.sub(r'[\'"“”‘’«»‹›]+$', "", normalized)
    normalized = re.sub(r"[.!?,;:]+$", "", normalized)
    return normalized.strip()


def is_photo_instruction_text(value: str) -> bool:
    normalized = normalize_text_body(value).strip().upper()
    normalized = re.sub(r'^[\s*\'"“”‘’«»‹›-]+', "", normalized)
    normalized = re.sub(r"\s+", " ", normalized).strip()
    return bool(re.match(r"^(PHOTO OF|WHOLE POEM PHOTO\b|PICTURE OF ENDING|IMAGE OF ENDING)", normalized))


def record_text_identity(author: str, title: str, book_title: str, text: str) -> str:
    parts = [
        normalize_catalog_lookup_key(author),
        normalize_catalog_lookup_key(title),
        normalize_catalog_lookup_key(book_title),
        normalize_excerpt_lookup_key(text),
    ]
    return "|".join(parts)


_excerpt_enrichment_cache: dict[str, dict] = {}
_book_author_map_cache: dict[str, str] | None = None


def lookup_excerpt_enrichment(text: str) -> dict | None:
    lookup_key = normalize_excerpt_lookup_key(text)
    if not lookup_key:
        return None

    if lookup_key in _excerpt_enrichment_cache:
        return _excerpt_enrichment_cache[lookup_key]

    enrichment = None

    candidate_sources: list[tuple[Path, str, tuple[str, str, str], str]] = []
    if NORMALIZED_EXCERPT_DB.exists():
        candidate_sources.append(
            (
                NORMALIZED_EXCERPT_DB,
                """
                SELECT primary_author, primary_poem_title, primary_book_title
                FROM excerpts
                WHERE normalized_excerpt = ?
                ORDER BY pull_count DESC, source_row_count DESC, id DESC
                LIMIT 1
                """,
                ("primary_author", "primary_poem_title", "primary_book_title"),
                "normalized",
            )
        )
    if EXCERPT_RUNTIME_DB.exists():
        candidate_sources.append(
            (
                EXCERPT_RUNTIME_DB,
                """
                SELECT author, poem_title, book_title
                FROM excerpt_entries
                WHERE normalized_excerpt = ?
                ORDER BY character_count ASC, id ASC
                LIMIT 1
                """,
                ("author", "poem_title", "book_title"),
                "runtime",
            )
        )

    for path, sql, fields, _label in candidate_sources:
        try:
            connection = open_connection(path)
        except Exception:
            continue

        try:
            row = connection.execute(sql, (lookup_key,)).fetchone()
        finally:
            connection.close()

        if not row:
            continue

        author_field, title_field, book_field = fields
        enrichment = {
            "author": normalize_text(row.get(author_field) or ""),
            "poemTitle": normalize_text(row.get(title_field) or ""),
            "bookTitle": normalize_text(row.get(book_field) or ""),
        }
        break

    _excerpt_enrichment_cache[lookup_key] = enrichment
    return enrichment


def apply_excerpt_enrichment(author: str, title: str, book_title: str, enrichment: dict | None) -> tuple[str, str, str]:
    if not enrichment:
        return author, title, book_title

    enriched_author = enrichment.get("author") or ""
    enriched_title = enrichment.get("poemTitle") or ""
    enriched_book = enrichment.get("bookTitle") or ""

    # If an exact-text catalog match disagrees with the upstream author/book pair,
    # keep the matched pair together instead of producing mixed filenames.
    has_conflict = (
        enriched_author
        and enriched_book
        and ((author and normalize_key(author) != normalize_key(enriched_author)) or (book_title and normalize_key(book_title) != normalize_key(enriched_book)))
    )
    if has_conflict:
        return enriched_author, enriched_title or title, enriched_book

    return author or enriched_author, title or enriched_title, book_title or enriched_book


def load_book_author_map() -> dict[str, str]:
    global _book_author_map_cache
    if _book_author_map_cache is not None:
        return _book_author_map_cache

    mapping: dict[str, str] = {}
    if BOOK_AUTHOR_MAP_JSON.exists():
        try:
            rows = json.loads(BOOK_AUTHOR_MAP_JSON.read_text(encoding="utf-8"))
            for row in rows if isinstance(rows, list) else []:
                title = normalize_text(row.get("title") if isinstance(row, dict) else "")
                author = normalize_text(row.get("author") if isinstance(row, dict) else "")
                if title and author:
                    mapping[normalize_key(title)] = author
        except Exception:
            mapping = {}

    _book_author_map_cache = mapping
    return mapping


def lookup_author_by_book_title(book_title: str) -> str:
    title = normalize_text(book_title)
    if not title:
        return ""
    return load_book_author_map().get(normalize_key(title), "")


def build_stable_text_hash(type_value: str, author: str, title: str, book: str, text: str) -> str:
    payload = "||".join(
        [
            normalize_key(type_value),
            normalize_catalog_lookup_key(author),
            normalize_catalog_lookup_key(title),
            normalize_catalog_lookup_key(book),
            normalize_text_body(text),
        ]
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def search_excerpt_library(query: str, limit: int, approved_only: bool) -> list[dict]:
    if not EXCERPT_RUNTIME_DB.exists():
        raise FileNotFoundError(f"Excerpt runtime DB not found at {EXCERPT_RUNTIME_DB}")

    with open_connection(EXCERPT_RUNTIME_DB) as connection:
        sql = """
            SELECT
                ee.id,
                ee.author,
                ee.book_title AS bookTitle,
                ee.poem_title AS title,
                ee.excerpt_text AS text,
                ee.excerpt_hash
            FROM excerpt_entries ee
        """
        params: list[object] = []

        if approved_only:
            if not QI_STATUS_DB.exists():
                raise FileNotFoundError(f"QI status DB not found at {QI_STATUS_DB}")
            connection.execute("ATTACH DATABASE ? AS qi", (str(QI_STATUS_DB),))
            sql += """
                JOIN qi.excerpt_qi_status qs
                  ON qs.excerpt_hash = ee.excerpt_hash
                WHERE (qs.has_qi_asset = 1 OR qs.qi_approved_count > 0 OR qs.qi_graphic_made_count > 0)
            """
        else:
            sql += " WHERE 1 = 1 "

        sql += """
            AND upper(ltrim(ee.excerpt_text, ' *''"“”‘’«»‹›-')) NOT LIKE 'PHOTO OF%'
            AND upper(ltrim(ee.excerpt_text, ' *''"“”‘’«»‹›-')) NOT LIKE 'WHOLE POEM PHOTO%'
        """

        if query:
            sql += """
                AND (
                    lower(ee.author) LIKE lower(?)
                    OR lower(ee.book_title) LIKE lower(?)
                    OR lower(ee.poem_title) LIKE lower(?)
                    OR lower(ee.excerpt_text) LIKE lower(?)
                )
            """
            like_query = f"%{query}%"
            params.extend([like_query, like_query, like_query, like_query])

        sql += " ORDER BY ee.character_count ASC, ee.id ASC LIMIT ?"
        params.append(limit)
        rows = connection.execute(sql, params).fetchall()

    return [
        {
            "id": row["id"],
            "sourceType": "approved_excerpt_library" if approved_only else "excerpt_library",
            "sourceLabel": source_label("approved_excerpt_library" if approved_only else "excerpt_library"),
            "author": row["author"] or "",
            "bookTitle": row["bookTitle"] or "",
            "title": row["title"] or "Untitled excerpt",
            "text": row["text"] or "",
            "preview": preview_text(row["text"] or ""),
        }
        for row in rows
        if not is_photo_instruction_text(row["text"] or "")
    ]


def search_catalog_short_poems(query: str, limit: int) -> list[dict]:
    if not SHORT_POEMS_JSON.exists():
        raise FileNotFoundError(f"Short poems export not found at {SHORT_POEMS_JSON}")

    rows = json.loads(SHORT_POEMS_JSON.read_text(encoding="utf-8"))
    normalized_query = query.lower()

    filtered = []
    for row in rows:
        if is_photo_instruction_text(row.get("excerpt", "")):
            continue
        haystack = " ".join(
            [
                row.get("author", ""),
                row.get("book", ""),
                row.get("title", ""),
                row.get("excerpt", ""),
            ]
        ).lower()
        if normalized_query and normalized_query not in haystack:
            continue
        filtered.append(
            {
                "id": row.get("contentId") or row.get("imageId"),
                "sourceType": "catalog_short_poems",
                "sourceLabel": source_label("catalog_short_poems"),
                "author": row.get("author") or "",
                "bookTitle": row.get("book") or "",
                "title": row.get("title") or "Untitled poem",
                "text": row.get("excerpt") or "",
                "preview": preview_text(row.get("excerpt") or ""),
            }
        )
        if len(filtered) >= limit:
            break

    return filtered


def is_transient_remote_error(message: str) -> bool:
    lowered = message.lower()
    return any(
        token in lowered
        for token in (
            "503",
            "502",
            "504",
            "429",
            "unavailable",
            "temporarily unavailable",
            "service is currently unavailable",
            "timeout",
            "timed out",
        )
    )


def clean_remote_error_message(message: str) -> str:
    if "sheets metadata read failed" in message.lower() or is_transient_remote_error(message):
        return "Source metadata is temporarily unavailable. Try Search source again in a moment."
    return message


def fetch_json_via_curl(url: str, headers: list[str] | None = None) -> dict:
    last_error = ""
    for attempt in range(3):
        command = ["curl", "-sS", url]
        for header in headers or []:
            command.extend(["-H", header])
        result = subprocess.run(
            command,
            check=False,
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode != 0:
            last_error = result.stderr.strip() or f"curl failed while requesting {url}"
        else:
            try:
                data = json.loads(result.stdout)
            except json.JSONDecodeError:
                last_error = result.stdout.strip() or f"Invalid JSON returned for {url}"
            else:
                if isinstance(data, dict) and data.get("ok") is False:
                    error_value = data.get("error") or f"Request failed for {url}"
                    last_error = error_value if isinstance(error_value, str) else json.dumps(error_value)
                else:
                    return data

        if is_transient_remote_error(last_error) and attempt < 2:
            time.sleep(0.75 * (attempt + 1))
            continue
        raise RuntimeError(clean_remote_error_message(last_error))

    raise RuntimeError(clean_remote_error_message(last_error or f"Request failed for {url}"))


def fetch_json_via_curl_with_metrics(url: str, headers: list[str] | None = None) -> tuple[dict, dict]:
    marker = "__PIG_CURL_METRICS__"
    header_path = Path("/tmp") / f"pig-curl-headers-{uuid.uuid4().hex}.txt"
    command = [
        "curl",
        "-sS",
        "-D",
        str(header_path),
        "-w",
        f"\n{marker}\t%{{http_code}}\t%{{time_namelookup}}\t%{{time_connect}}\t%{{time_appconnect}}\t%{{time_starttransfer}}\t%{{time_total}}\n",
    ]
    for header in headers or []:
        command.extend(["-H", header])
    command.append(url)

    started = time.monotonic()
    try:
        result = subprocess.run(
            command,
            check=False,
            capture_output=True,
            text=True,
            timeout=120,
        )
        elapsed_ms = round((time.monotonic() - started) * 1000)
        stdout, _, metric_line = result.stdout.rpartition(f"\n{marker}\t")
        metric_parts = metric_line.strip().split("\t") if metric_line else []
        response_headers = header_path.read_text() if header_path.exists() else ""
        server_timing = ""
        for line in response_headers.splitlines():
            if line.lower().startswith("server-timing:"):
                server_timing = line.split(":", 1)[1].strip()
                break
        metrics = {
            "status": metric_parts[0] if len(metric_parts) > 0 else "",
            "dnsMs": round(float(metric_parts[1]) * 1000) if len(metric_parts) > 1 and metric_parts[1] else None,
            "connectMs": round(float(metric_parts[2]) * 1000) if len(metric_parts) > 2 and metric_parts[2] else None,
            "tlsMs": round(float(metric_parts[3]) * 1000) if len(metric_parts) > 3 and metric_parts[3] else None,
            "firstByteMs": round(float(metric_parts[4]) * 1000) if len(metric_parts) > 4 and metric_parts[4] else None,
            "curlTotalMs": round(float(metric_parts[5]) * 1000) if len(metric_parts) > 5 and metric_parts[5] else None,
            "elapsedMs": elapsed_ms,
            "serverTiming": server_timing,
        }
        if result.returncode != 0:
            raise RuntimeError(result.stderr.strip() or f"curl failed while requesting {url}")
        body = stdout if metric_line else result.stdout
        data = json.loads(body)
        if isinstance(data, dict) and data.get("ok") is False:
            error_value = data.get("error") or f"Request failed for {url}"
            raise RuntimeError(error_value if isinstance(error_value, str) else json.dumps(error_value))
        return data, metrics
    finally:
        try:
            header_path.unlink(missing_ok=True)
        except Exception:
            pass


_artist_handle_records_cache: tuple[float, list[dict]] | None = None


def load_artist_handle_records() -> list[dict]:
    global _artist_handle_records_cache
    now = time.time()
    if _artist_handle_records_cache and now - _artist_handle_records_cache[0] < 300:
        return _artist_handle_records_cache[1]

    sheet_range = quote(f"{ARTIST_HANDLE_SHEET_NAME}!A:Q", safe="")
    spreadsheet_id = quote(ARTIST_HANDLE_SPREADSHEET_ID, safe="")
    try:
        data = drive_api_request(
            f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/{sheet_range}"
        )
    except RuntimeError:
        if _artist_handle_records_cache:
            return _artist_handle_records_cache[1]
        raise
    rows = data.get("values") or []
    records: list[dict] = []
    for row in rows[1:]:
        values = list(row) + [""] * 17
        name = str(values[0]).strip()
        if not name:
            continue
        records.append(
            {
                "author": name,
                "twitter": str(values[1]).strip(),
                "instagram": str(values[2]).strip(),
                "facebook": str(values[3]).strip(),
                "tiktok": str(values[4]).strip(),
                "website": str(values[5] or values[14]).strip(),
                "notes": str(values[6]).strip(),
                "type": str(values[7]).strip(),
                "active": str(values[8]).strip(),
                "bsky": str(values[10]).strip(),
                "catalog": str(values[11]).strip(),
                "alternateName": str(values[12]).strip(),
                "pronouns": str(values[13]).strip(),
                "email": str(values[15]).strip(),
                "location": str(values[16]).strip(),
            }
        )
    _artist_handle_records_cache = (now, records)
    return records


def lookup_artist_handle_record(author: str) -> dict | None:
    author_key = normalize_key(author)
    if not author_key:
        return None
    for record in load_artist_handle_records():
        candidate_names = [record.get("author", ""), record.get("alternateName", "")]
        if any(normalize_key(name) == author_key for name in candidate_names if name):
            return record
    return None


def send_json_via_curl(url: str, method: str, payload: dict | None = None, headers: list[str] | None = None) -> dict:
    command = ["curl", "-sS", "-X", method, url, "-H", "Content-Type: application/json"]
    for header in headers or []:
        command.extend(["-H", header])
    if payload is not None:
        command.extend(["--data-binary", json.dumps(payload)])
    result = subprocess.run(
        command,
        check=False,
        capture_output=True,
        text=True,
        timeout=120,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"curl failed while requesting {url}")
    data = json.loads(result.stdout or "{}")
    if isinstance(data, dict) and data.get("ok") is False:
        raise RuntimeError(data.get("error") or f"Request failed for {url}")
    return data


def map_poetry_please_ranked_text_row(row: dict) -> dict:
    text = normalize_text_body(row.get("text") or "")
    author = normalize_text(row.get("author") or "")
    title = normalize_text(row.get("title") or "")
    book = normalize_text(row.get("book") or "")
    source_type = normalize_text(row.get("sourceType") or "").upper() or "EXC"
    text_hash = normalize_text(row.get("textHash") or "") or build_stable_text_hash(source_type, author, title, book, text)
    text_id = normalize_text(row.get("textId") or "") or f"PP:{source_type}:{text_hash[:16].upper()}"
    matching_graphics = row.get("matchingGraphics") or []
    return {
        "id": text_id,
        "textId": text_id,
        "textHash": text_hash,
        "sourceType": "poetry_please_ranked_texts",
        "sourceLabel": source_label("poetry_please_ranked_texts"),
        "sourceSystem": "poetry_please",
        "poetryPleaseSourceType": source_type,
        "sourceRecordId": normalize_text(row.get("sourceRecordId") or ""),
        "sourceRecordIds": row.get("sourceRecordIds") or [],
        "author": author,
        "bookTitle": book,
        "title": title or "Untitled text",
        "text": text,
        "preview": preview_text(text),
        "rank": int(row.get("rank") or 0),
        "score": int(row.get("score") or 0),
        "likes": int(row.get("likes") or 0),
        "dislikes": int(row.get("dislikes") or 0),
        "meh": int(row.get("meh") or 0),
        "movedMe": int(row.get("movedMe") or 0),
        "totalVotes": int(row.get("totalVotes") or 0),
        "releaseCatalog": normalize_text(row.get("releaseCatalog") or ""),
        "bookLink": normalize_text(row.get("bookLink") or ""),
        "siblingRecordCount": int(row.get("siblingRecordCount") or 0),
        "matchingStrategy": normalize_text(row.get("matchingStrategy") or ""),
        "matchingGraphicCount": int(row.get("matchingGraphicCount") or len(matching_graphics)),
        "matchingGraphics": matching_graphics,
    }


def search_poetry_please_ranked_texts(
    query: str,
    limit: int,
    min_score: int = 1,
    min_votes: int = 1,
    types: str = "EXC,FP",
    book_title: str = "",
) -> list[dict]:
    ranked_texts_url = poetry_please_ranked_texts_url()
    auth_headers = poetry_please_auth_headers()
    token_error = poetry_please_token_error()

    if not ranked_texts_url:
        raise RuntimeError("POETRY_PLEASE_RANKED_TEXTS_URL is not configured.")
    if token_error:
        raise RuntimeError(token_error)
    if not auth_headers:
        raise RuntimeError("Neither POETRY_PLEASE_API_KEY nor POETRY_PLEASE_AUTH_TOKEN is configured.")

    from urllib.parse import quote_plus

    url = (
        f"{ranked_texts_url}?limit={max(limit, 200)}"
        f"&minScore={max(0, min_score)}&minVotes={max(0, min_votes)}&types={quote_plus(types)}"
    )
    payload = fetch_json_via_curl(url, headers=auth_headers)
    rows = payload.get("rows") or []
    normalized_query = normalize_text(query).lower()
    normalized_book_title = normalize_text(book_title).lower()
    results: list[dict] = []

    for row in rows:
        mapped = map_poetry_please_ranked_text_row(row)
        if normalized_book_title and normalize_text(mapped.get("bookTitle", "")).lower() != normalized_book_title:
            continue
        haystack = " ".join(
            [
                mapped.get("textId", ""),
                mapped.get("author", ""),
                mapped.get("bookTitle", ""),
                mapped.get("title", ""),
                mapped.get("text", ""),
                mapped.get("releaseCatalog", ""),
            ]
        ).lower()
        if normalized_query and normalized_query not in haystack:
            continue
        results.append(mapped)
        if len(results) >= limit:
            break

    return results


def search_poetry_please_ranked_text_books(min_score: int = 1, min_votes: int = 1, types: str = "EXC,FP") -> list[dict]:
    matches = search_poetry_please_ranked_texts("", 5000, min_score=min_score, min_votes=min_votes, types=types)
    counts: dict[str, dict[str, int | str]] = {}
    for item in matches:
        title = normalize_text(item.get("bookTitle") or "")
        if not title:
            continue
        key = normalize_key(title)
        entry = counts.get(key)
        if not entry:
            counts[key] = {"title": title, "count": 1}
            continue
        entry["count"] = int(entry["count"]) + 1
        if title == title.title() and str(entry["title"]) != str(entry["title"]).title():
            entry["title"] = title
    return [
        {"title": str(entry["title"]), "count": int(entry["count"])}
        for entry in sorted(counts.values(), key=lambda entry: (-int(entry["count"]), str(entry["title"]).lower()))
    ]


def load_poetry_please_ranked_text_record(record_id: str) -> dict:
    matches = search_poetry_please_ranked_texts("", 500, min_score=0, min_votes=0)
    row = next(
        (
            item
            for item in matches
            if str(item.get("id")) == str(record_id)
            or str(item.get("textId") or "") == str(record_id)
            or str(item.get("sourceRecordId") or "") == str(record_id)
            or str(item.get("textHash") or "") == str(record_id)
        ),
        None,
    )
    if not row:
        raise KeyError(f"Record {record_id} not found in Poetry Please ranked texts.")
    return row


def map_graphics_handoff_ledger_row(row: dict) -> dict:
    graphics_request_id = str(row.get("graphicsRequestId") or row.get("requestId") or "").strip()
    source_sheet_row = row.get("sourceSheetRow") or row.get("queueSheetRow") or ""
    if not source_sheet_row and graphics_request_id.startswith("weaver:row-"):
        source_sheet_row = graphics_request_id.replace("weaver:row-", "", 1)
    text = row.get("quoteText") or row.get("sourceText") or row.get("text") or row.get("excerpt") or ""
    title = row.get("poemTitle") or row.get("title") or "Untitled excerpt"
    book_title = row.get("bookTitle") or row.get("book") or ""
    author = row.get("author") or row.get("sourceAuthor") or lookup_author_by_book_title(book_title)
    author, title, book_title = apply_excerpt_enrichment(author, title, book_title, lookup_excerpt_enrichment(text))
    return {
        "id": graphics_request_id or str(source_sheet_row),
        "sourceType": "weaver_graphics_requests",
        "sourceLabel": source_label("weaver_graphics_requests"),
        "graphicsRequestId": graphics_request_id,
        "recordId": row.get("sourceRecordId") or row.get("recordId") or "",
        "queueSheetRow": source_sheet_row,
        "bookTitle": book_title,
        "author": author,
        "title": title,
        "text": text,
        "preview": preview_text(text),
        "requestStatus": row.get("handoffStatus") or row.get("pigStatus") or row.get("status") or "",
        "workflowStatus": row.get("sourceStatus") or row.get("weaverStatus") or "",
        "assetUrl": row.get("assetUrl") or row.get("driveLink") or "",
        "assetPreviewUrl": row.get("assetPreviewUrl") or row.get("previewUrl") or "",
        "completedAt": row.get("sentToQcAt") or row.get("uploadedAt") or row.get("generatedAt") or "",
        "created": row.get("created") or row.get("createdAt") or row.get("requestedAt") or "",
        "completionCount": row.get("completionCount") or 0,
        "handoffLedger": True,
        "handoffStatus": row.get("handoffStatus") or "",
        "pigStatus": row.get("pigStatus") or "",
    }


def search_weaver_graphics_handoff_queue(
    query: str,
    limit: int,
    filter_value: str,
    book_title: str = "",
    diagnostics: list[dict] | None = None,
) -> list[dict]:
    from urllib.parse import quote_plus

    base_url = weaver_graphics_handoff_base_url()
    normalized_query = query.lower().strip()
    if limit >= 5000:
        queue_limit = limit
    elif normalized_query or book_title:
        queue_limit = max(limit * 10, 200)
    else:
        queue_limit = max(limit * 4, 50)
    url = f"{base_url}/queue?limit={queue_limit}&filter={quote_plus(filter_value or 'current_titles')}"
    if book_title:
        url += f"&bookTitle={quote_plus(book_title)}"
    should_retry_empty = (filter_value or "current_titles") == "current_titles" and not normalized_query and not book_title
    rows = []
    last_event: dict | None = None

    for attempt in range(2 if should_retry_empty else 1):
        request_id = f"pig-handoff-{uuid.uuid4().hex}"
        started = time.monotonic()
        try:
            payload, fetch_metrics = fetch_json_via_curl_with_metrics(url, [f"X-Request-Id: {request_id}"])
        except Exception as exc:
            elapsed_ms = round((time.monotonic() - started) * 1000)
            event = {
                "event": "pig.weaver_handoff_queue",
                "requestId": request_id,
                "url": url,
                "attempt": attempt + 1,
                "status": "error",
                "elapsedMs": elapsed_ms,
                "error": str(exc),
            }
            print(json.dumps(event), flush=True)
            if diagnostics is not None:
                diagnostics.append({key: value for key, value in event.items() if key != "event"})
            raise
        rows = payload.get("queue") or payload.get("requests") or payload.get("items") or payload.get("records") or []
        elapsed_ms = round((time.monotonic() - started) * 1000)
        event = {
            "event": "pig.weaver_handoff_queue",
            "requestId": request_id,
            "url": url,
            "attempt": attempt + 1,
            "status": "ok",
            "elapsedMs": elapsed_ms,
            "responseStatus": fetch_metrics.get("status"),
            "dnsMs": fetch_metrics.get("dnsMs"),
            "connectMs": fetch_metrics.get("connectMs"),
            "tlsMs": fetch_metrics.get("tlsMs"),
            "firstByteMs": fetch_metrics.get("firstByteMs"),
            "curlTotalMs": fetch_metrics.get("curlTotalMs"),
            "serverTiming": fetch_metrics.get("serverTiming"),
            "recordCount": len(rows),
        }
        print(json.dumps(event), flush=True)
        if diagnostics is not None:
            diagnostics.append({key: value for key, value in event.items() if key != "event"})
        last_event = event
        if rows or not should_retry_empty:
            break
        time.sleep(0.35)

    if should_retry_empty and not rows:
        raise EmptyHandoffQueueError(
            f"Weaver handoff queue returned 0 current-title records after retry. "
            f"Last requestId={last_event.get('requestId') if last_event else ''}."
        )

    results: list[dict] = []

    for row in rows:
        mapped = map_graphics_handoff_ledger_row(row)
        if not (mapped.get("text") or "").strip():
            continue
        if is_photo_instruction_text(mapped.get("text", "")):
            continue
        if book_title and normalize_key(mapped.get("bookTitle", "")) != normalize_key(book_title):
            continue
        haystack = " ".join(
            [
                mapped.get("graphicsRequestId", ""),
                mapped.get("author", ""),
                mapped.get("bookTitle", ""),
                mapped.get("title", ""),
                mapped.get("text", ""),
            ]
        ).lower()
        if normalized_query and normalized_query not in haystack:
            continue
        results.append(mapped)
    return sort_weaver_records_fifo(dedupe_records_by_text_identity(results))[:limit]


def claim_graphics_handoff_request(graphics_request_id: str) -> dict:
    from urllib.parse import quote

    if not graphics_request_id:
        raise ValueError("graphicsRequestId is required.")
    return send_json_via_curl(
        f"{weaver_graphics_handoff_base_url()}/{quote(graphics_request_id, safe='')}/claim",
        "POST",
        {"claimedBy": "P.I.G."},
    )


def patch_graphics_handoff_request(graphics_request_id: str, updates: dict) -> dict:
    from urllib.parse import quote

    if not graphics_request_id:
        raise ValueError("graphicsRequestId is required.")
    return send_json_via_curl(
        f"{weaver_graphics_handoff_base_url()}/{quote(graphics_request_id, safe='')}",
        "PATCH",
        updates,
    )


def build_weaver_graphics_request_records(row: dict) -> list[dict]:
    graphics_request_id = row.get("graphicsRequestId") or ""
    base = {
        "sourceType": "weaver_graphics_requests",
        "sourceLabel": source_label("weaver_graphics_requests"),
        "graphicsRequestId": graphics_request_id,
        "recordId": row.get("recordId") or "",
        "bookTitle": row.get("bookTitle") or "",
        "approved": row.get("approved") or "",
        "created": row.get("created") or "",
        "workflowStatus": row.get("workflowStatus") or row.get("requestStatus") or "",
        "requestStatus": row.get("requestStatus") or "",
        "completionCount": row.get("completionCount") or row.get("completedGraphicCount") or row.get("completedGraphicsCount") or 0,
        "assetUrl": row.get("assetUrl") or "",
        "completedAt": row.get("completedAt") or "",
        "source": row.get("source") or "",
        "excerptCount": row.get("excerptCount") or 0,
        "queueRowCount": row.get("queueRowCount") or 0,
    }

    excerpts = row.get("excerpts") or []
    if excerpts:
        records = []
        for index, excerpt in enumerate(excerpts):
            quote_text = excerpt.get("quoteText") or ""
            if is_photo_instruction_text(quote_text):
                continue
            queue_sheet_row = excerpt.get("queueSheetRow")
            record_id = excerpt.get("recordId") or row.get("recordId") or ""
            record_key = str(queue_sheet_row or f"{graphics_request_id}::{index}")
            enrichment = lookup_excerpt_enrichment(quote_text)
            author = excerpt.get("author") or row.get("author") or ""
            title = excerpt.get("poemTitle") or row.get("poemTitle") or "Untitled excerpt"
            book_title = row.get("bookTitle") or ""
            author, title, book_title = apply_excerpt_enrichment(author, title, book_title, enrichment)
            author = author or lookup_author_by_book_title(book_title)
            records.append(
                {
                    **base,
                    "id": record_key,
                    "queueSheetRow": queue_sheet_row,
                    "recordId": record_id,
                    "bookTitle": book_title,
                    "author": author,
                    "title": title,
                    "text": quote_text,
                    "preview": preview_text(quote_text),
                    "notes": excerpt.get("notes") or row.get("notes") or "",
                    "completionCount": excerpt.get("completionCount") or excerpt.get("completedGraphicCount") or base["completionCount"],
                    "assetUrl": excerpt.get("assetUrl") or base["assetUrl"],
                    "completedAt": excerpt.get("completedAt") or base["completedAt"],
                    "requestStatus": excerpt.get("requestStatus") or base["requestStatus"],
                }
            )
        return [record for record in records if not weaver_record_has_existing_graphic(record)]

    quote_text = row.get("quoteText") or ""
    if is_photo_instruction_text(quote_text):
        return []
    record_key = row.get("queueSheetRow") or graphics_request_id or row.get("recordId")
    enrichment = lookup_excerpt_enrichment(quote_text)
    author = row.get("author") or ""
    title = row.get("poemTitle") or "Untitled excerpt"
    book_title = row.get("bookTitle") or ""
    author, title, book_title = apply_excerpt_enrichment(author, title, book_title, enrichment)
    author = author or lookup_author_by_book_title(book_title)
    return [
        {
            **base,
            "id": str(record_key),
            "queueSheetRow": row.get("queueSheetRow"),
            "bookTitle": book_title,
            "author": author,
            "title": title,
            "text": quote_text,
            "preview": preview_text(quote_text),
            "notes": row.get("notes") or "",
        }
    ]


def build_weaver_rework_records(row: dict) -> list[dict]:
    base = {
        "sourceType": "weaver_graphics_requests",
        "sourceLabel": source_label("weaver_graphics_requests"),
        "graphicsRequestId": row.get("graphicsRequestId") or "",
        "recordId": row.get("recordId") or "",
        "bookTitle": row.get("bookTitle") or "",
        "approved": row.get("approved") or "",
        "created": row.get("created") or "",
        "workflowStatus": row.get("workflowStatus") or row.get("requestStatus") or "",
        "requestStatus": row.get("requestStatus") or "",
        "completionCount": row.get("completionCount") or row.get("completedGraphicCount") or row.get("completedGraphicsCount") or 0,
        "assetUrl": row.get("assetUrl") or "",
        "assetPreviewUrl": row.get("assetPreviewUrl") or "",
        "completedAt": row.get("completedAt") or row.get("latestCompletedAt") or "",
        "source": row.get("source") or "",
        "excerptCount": row.get("excerptCount") or 0,
        "queueRowCount": row.get("queueRowCount") or 0,
        "rejectReason": row.get("rejectReason") or "",
        "metadataIssue": row.get("metadataIssue") or "",
        "aestheticIssue": row.get("aestheticIssue") or "",
        "qcNote": row.get("qcNote") or "",
    }
    records = []
    excerpts = row.get("excerpts") or []
    for index, excerpt in enumerate(excerpts or [{}]):
        quote_text = excerpt.get("quoteText") or row.get("quoteText") or ""
        if is_photo_instruction_text(quote_text):
            continue
        queue_sheet_row = excerpt.get("queueSheetRow") or row.get("queueSheetRow")
        record_key = str(queue_sheet_row or f"{base['graphicsRequestId']}::{index}")
        records.append(
            {
                **base,
                "id": record_key,
                "queueSheetRow": queue_sheet_row,
                "recordId": excerpt.get("recordId") or row.get("recordId") or "",
                "author": excerpt.get("author") or row.get("author") or "",
                "title": excerpt.get("poemTitle") or row.get("poemTitle") or "Untitled excerpt",
                "text": quote_text,
                "preview": preview_text(quote_text),
                "notes": excerpt.get("notes") or row.get("notes") or "",
                "rejectReason": excerpt.get("rejectReason") or base["rejectReason"],
                "metadataIssue": excerpt.get("metadataIssue") or base["metadataIssue"],
                "aestheticIssue": excerpt.get("aestheticIssue") or base["aestheticIssue"],
                "qcNote": excerpt.get("qcNote") or base["qcNote"],
            }
        )
    return records


def positive_int(value) -> int:
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0


def weaver_row_is_open(row: dict) -> bool:
    status = str(row.get("requestStatus") or row.get("workflowStatus") or "").strip().lower()
    if status and status not in {"open", "rework_requested"}:
        return False
    return not weaver_record_has_existing_graphic(row)


def weaver_record_is_rework(record: dict) -> bool:
    status = " ".join(
        str(record.get(key) or "").strip().lower()
        for key in (
            "requestStatus",
            "workflowStatus",
            "handoffStatus",
            "pigStatus",
            "qcStatus",
            "status",
            "rejectReason",
            "metadataIssue",
            "aestheticIssue",
            "qcNote",
        )
    )
    return "rework" in status or "reject" in status


def weaver_record_has_existing_graphic(record: dict) -> bool:
    count_keys = (
        "completionCount",
        "completedGraphicCount",
        "completedGraphicsCount",
        "graphicMadeCount",
        "qiGraphicMadeCount",
    )
    if any(positive_int(record.get(key)) > 0 for key in count_keys):
        return True

    truthy_keys = (
        "hasCompletedGraphic",
        "hasGraphic",
        "graphicMade",
        "hasQiAsset",
    )
    if any(str(record.get(key) or "").strip().lower() in {"1", "true", "yes", "y"} for key in truthy_keys):
        return True

    text_keys = (
        "assetUrl",
        "assetPreviewUrl",
        "driveLink",
        "fileLink",
        "completedAt",
        "existingGraphicFileName",
        "completedGraphicUrl",
    )
    return any(str(record.get(key) or "").strip() for key in text_keys)


def dedupe_records_by_text_identity(records: list[dict]) -> list[dict]:
    seen: set[str] = set()
    unique_records: list[dict] = []
    for record in records:
        identity = record_text_identity(
            record.get("author", ""),
            record.get("title") or record.get("poemTitle") or "",
            record.get("bookTitle") or record.get("book") or "",
            record.get("text") or record.get("quoteText") or "",
        )
        if identity and identity in seen:
            continue
        if identity:
            seen.add(identity)
        unique_records.append(record)
    return unique_records


def weaver_fifo_sort_key(record: dict) -> tuple:
    row_number = positive_int(record.get("queueSheetRow") or record.get("sourceSheetRow"))
    row_sort = row_number if row_number else 10**12
    created = str(
        record.get("created")
        or record.get("createdAt")
        or record.get("requestedAt")
        or record.get("submittedAt")
        or ""
    ).strip()
    identity = str(
        record.get("graphicsRequestId")
        or record.get("id")
        or record.get("recordId")
        or ""
    ).strip()
    return (row_sort, created or "9999", identity)


def sort_weaver_records_fifo(records: list[dict]) -> list[dict]:
    return sorted(records, key=weaver_fifo_sort_key)


def search_weaver_graphics_requests(
    query: str,
    limit: int,
    filter_value: str,
    book_title: str = "",
    diagnostics: list[dict] | None = None,
    force_legacy: bool = False,
) -> list[dict]:
    rework_only = filter_value in WEAVER_REWORK_FILTERS
    if not rework_only:
        try:
            ledger_results = search_weaver_graphics_handoff_queue(query, limit, filter_value, book_title, diagnostics)
            if ledger_results:
                if diagnostics is not None:
                    diagnostics.append(
                        {
                            "step": "handoff_queue_process",
                            "status": "ok",
                            "resultCount": len(ledger_results),
                            "returnedCount": min(len(ledger_results), limit),
                        }
                    )
                return sort_weaver_records_fifo(dedupe_records_by_text_identity(ledger_results))[:limit]
        except EmptyHandoffQueueError:
            if not force_legacy:
                raise RuntimeError(
                    "Weaver handoff queue returned no current-title records after retry, so P.I.G. skipped the slow legacy fallback. "
                    "Try Search source again, or add legacy=1 to force the old queue path for debugging."
                )
        except Exception:
            pass

    filter_value = filter_value or "current_titles"
    legacy_filter = "all" if rework_only else filter_value
    url = f"{weaver_graphics_requests_url()}?filter={legacy_filter}&limit={LEGACY_WEAVER_ROW_CAP}"
    if book_title:
        from urllib.parse import quote_plus
        url += f"&bookTitle={quote_plus(book_title)}"

    legacy_fetch_started = time.monotonic()
    data = fetch_json_via_curl(url)
    all_rows = data.get("requests") or []
    rows = all_rows if rework_only else all_rows[:LEGACY_WEAVER_ROW_CAP]
    if diagnostics is not None:
        diagnostics.append(
            {
                "step": "legacy_queue_fetch",
                "status": "ok",
                "elapsedMs": round((time.monotonic() - legacy_fetch_started) * 1000),
                "rowCount": len(all_rows),
                "processedRowCap": len(rows),
            }
        )
    normalized_query = query.lower().strip()

    legacy_process_started = time.monotonic()
    results = []
    for row in rows:
        if (time.monotonic() - legacy_process_started) * 1000 > LEGACY_WEAVER_PROCESS_MAX_MS:
            if diagnostics is not None:
                diagnostics.append(
                    {
                        "step": "legacy_queue_process_cap",
                        "status": "stopped",
                        "maxMs": LEGACY_WEAVER_PROCESS_MAX_MS,
                        "candidateCount": len(results),
                    }
                )
            break
        if book_title and normalize_key(row.get("bookTitle", "")) != normalize_key(book_title):
            continue
        if rework_only and not weaver_record_is_rework(row):
            continue
        if not weaver_row_is_open(row):
            continue
        haystack = " ".join(
            [
                row.get("author", ""),
                row.get("bookTitle", ""),
                row.get("poemTitle", ""),
                row.get("quoteText", ""),
                row.get("notes", ""),
                row.get("graphicsRequestId", ""),
                " ".join((excerpt.get("quoteText") or "") for excerpt in (row.get("excerpts") or [])),
            ]
        ).lower()
        if normalized_query and normalized_query not in haystack:
            continue
        record_builder = build_weaver_rework_records if rework_only else build_weaver_graphics_request_records
        for record in record_builder(row):
            if rework_only and not weaver_record_is_rework(record):
                continue
            if book_title and normalize_key(record.get("bookTitle", "")) != normalize_key(book_title):
                continue
            results.append(record)
    deduped_results = dedupe_records_by_text_identity(results)
    sorted_results = sort_weaver_records_fifo(deduped_results)[:limit]
    if diagnostics is not None:
        diagnostics.append(
            {
                "step": "legacy_queue_process",
                "status": "ok",
                "elapsedMs": round((time.monotonic() - legacy_process_started) * 1000),
                "candidateCount": len(results),
                "dedupedCount": len(deduped_results),
                "returnedCount": len(sorted_results),
            }
        )
    return sorted_results


def search_weaver_graphics_request_books(filter_value: str) -> list[dict]:
    filter_value = filter_value or "current_titles"
    if filter_value in WEAVER_REWORK_FILTERS:
        data = fetch_json_via_curl(f"{weaver_graphics_requests_url()}?filter=all&limit={LEGACY_WEAVER_ROW_CAP}")
        counts: dict[str, int] = {}
        for row in data.get("requests") or []:
            if not weaver_record_is_rework(row):
                continue
            title = str(row.get("bookTitle") or "").strip()
            if title:
                counts[title] = counts.get(title, 0) + max(1, positive_int(row.get("queueRowCount") or row.get("excerptCount")))
        return [
            {"key": normalize_key(title), "title": title, "count": count}
            for title, count in sorted(counts.items(), key=lambda item: item[0].lower())
        ]
    if filter_value == "current_titles":
        try:
            records = search_weaver_graphics_handoff_queue("", 5000, filter_value)
            counts: dict[str, int] = {}
            titles: dict[str, str] = {}
            for record in records:
                title = str(record.get("bookTitle") or "").strip()
                if not title:
                    continue
                key = normalize_key(title)
                titles.setdefault(key, title)
                counts[key] = counts.get(key, 0) + 1
            return [
                {"key": key, "title": titles[key], "count": counts[key]}
                for key in sorted(counts, key=lambda item: titles[item].lower())
            ]
        except Exception:
            pass
    data = fetch_json_via_curl(f"{weaver_graphics_request_books_url()}?filter={filter_value}")
    return data.get("books") or []


def load_weaver_graphics_request_record(record_id: str, filter_value: str = "all") -> dict:
    matches = search_weaver_graphics_requests("", 5000, filter_value)
    row = next(
        (
            item
            for item in matches
            if str(item["id"]) == str(record_id)
            or str(item.get("graphicsRequestId") or "") == str(record_id)
            or str(item.get("queueSheetRow") or "") == str(record_id)
        ),
        None,
    )
    if not row:
        raise KeyError(f"Record {record_id} not found in Weaver graphics requests.")
    return row


def load_record(source_type: str, record_id: str) -> dict:
    if source_type in {"excerpt_library", "approved_excerpt_library"}:
        results = search_excerpt_library("", 100000, approved_only=source_type == "approved_excerpt_library")
        for row in results:
            if str(row["id"]) == str(record_id):
                return row
        raise KeyError(f"Record {record_id} not found in {source_type}.")

    if source_type == "catalog_short_poems":
        matches = search_catalog_short_poems("", 100000)
        row = next((item for item in matches if str(item["id"]) == str(record_id)), None)
        if not row:
            raise KeyError(f"Record {record_id} not found in catalog.")
        return row

    if source_type == "weaver_graphics_requests":
        return load_weaver_graphics_request_record(record_id, "all")

    if source_type == "poetry_please_ranked_texts":
        return load_poetry_please_ranked_text_record(record_id)

    raise KeyError(f"Unsupported source type: {source_type}")


def random_excerpt_library_record(approved_only: bool) -> dict:
    if not EXCERPT_RUNTIME_DB.exists():
        raise FileNotFoundError(f"Excerpt runtime DB not found at {EXCERPT_RUNTIME_DB}")

    with open_connection(EXCERPT_RUNTIME_DB) as connection:
        sql = """
            SELECT
                ee.id,
                ee.author,
                ee.book_title AS bookTitle,
                ee.poem_title AS title,
                ee.excerpt_text AS text,
                ee.excerpt_hash
            FROM excerpt_entries ee
        """
        if approved_only:
            if not QI_STATUS_DB.exists():
                raise FileNotFoundError(f"QI status DB not found at {QI_STATUS_DB}")
            connection.execute("ATTACH DATABASE ? AS qi", (str(QI_STATUS_DB),))
            sql += """
                JOIN qi.excerpt_qi_status qs
                  ON qs.excerpt_hash = ee.excerpt_hash
                WHERE (qs.has_qi_asset = 1 OR qs.qi_approved_count > 0 OR qs.qi_graphic_made_count > 0)
            """
        else:
            sql += " WHERE 1 = 1 "

        sql += """
            AND upper(ltrim(ee.excerpt_text, ' *''"“”‘’«»‹›-')) NOT LIKE 'PHOTO OF%'
            AND upper(ltrim(ee.excerpt_text, ' *''"“”‘’«»‹›-')) NOT LIKE 'WHOLE POEM PHOTO%'
        """

        sql += " ORDER BY RANDOM() LIMIT 1"
        row = connection.execute(sql).fetchone()

    if not row:
        raise KeyError("No random excerpt record found.")

    source_type = "approved_excerpt_library" if approved_only else "excerpt_library"
    return {
        "id": row["id"],
        "sourceType": source_type,
        "sourceLabel": source_label(source_type),
        "author": row["author"] or "",
        "bookTitle": row["bookTitle"] or "",
        "title": row["title"] or "Untitled excerpt",
        "text": row["text"] or "",
        "preview": preview_text(row["text"] or ""),
    }


def random_catalog_short_poem() -> dict:
    matches = search_catalog_short_poems("", 100000)
    if not matches:
        raise KeyError("No catalog short poems available.")
    return random.choice(matches)


def random_record(source_type: str, filter_value: str = "current_titles", book_title: str = "") -> dict:
    if source_type == "excerpt_library":
        return random_excerpt_library_record(approved_only=False)
    if source_type == "approved_excerpt_library":
        return random_excerpt_library_record(approved_only=True)
    if source_type == "catalog_short_poems":
        return random_catalog_short_poem()
    if source_type == "weaver_graphics_requests":
        matches = search_weaver_graphics_requests("", 5000, filter_value, book_title)
        if not matches:
            raise KeyError("No Weaver graphics requests available.")
        return random.choice(matches)
    if source_type == "poetry_please_ranked_texts":
        matches = search_poetry_please_ranked_texts("", 200, book_title=book_title)
        if not matches:
            raise KeyError("No Poetry Please ranked texts available.")
        return random.choice(matches)
    if source_type == "any":
        candidates = []
        for candidate_source in (
            "weaver_graphics_requests",
            "poetry_please_ranked_texts",
            "approved_excerpt_library",
            "catalog_short_poems",
            "excerpt_library",
        ):
            try:
                candidates.append(random_record(candidate_source))
            except Exception:
                continue
        if not candidates:
            raise KeyError("No random records available from any configured source.")
        return random.choice(candidates)
    raise KeyError(f"Unsupported source type: {source_type}")


def image_size_label(width: int, height: int) -> str:
    if width == height:
        return "1024x1024"
    if height > width:
        return "1024x1536"
    return "1536x1024"


def generate_background(prompt: str, model: str, width: int, height: int) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set. Export it before starting the server.")

    final_prompt = (
        "Create a background-only image for a typography poster. "
        "Do not include any letters, words, logos, signatures, captions, or typographic marks. "
        "Leave enough visual calm for overlaid poem text to remain legible. "
        f"Prompt: {prompt}"
    )

    payload = {
        "model": model,
        "prompt": final_prompt,
        "size": image_size_label(width, height),
    }

    result = subprocess.run(
        [
            "curl",
            "-sS",
            "https://api.openai.com/v1/images/generations",
            "-H",
            f"Authorization: Bearer {api_key}",
            "-H",
            "Content-Type: application/json",
            "-d",
            json.dumps(payload),
        ],
        check=False,
        capture_output=True,
        text=True,
        timeout=120,
    )

    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "curl failed while generating the background.")

    data = json.loads(result.stdout)

    if "error" in data:
        message = data["error"].get("message") if isinstance(data["error"], dict) else str(data["error"])
        raise RuntimeError(message or "The image generation API returned an error.")

    image_items = data.get("data") or []
    if not image_items:
        raise RuntimeError("No image was returned by the image generation API.")

    b64_json = image_items[0].get("b64_json")
    if not b64_json:
        raise RuntimeError("The image response did not include base64 image data.")

    return f"data:image/png;base64,{b64_json}"


def default_openai_image_model() -> str:
    return os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2-2026-04-21").strip() or "gpt-image-2-2026-04-21"


def post_completed_graphics_to_weaver(completions: list[dict]) -> dict:
    if not completions:
        raise ValueError("At least one completion is required.")

    payload = {"completions": completions}
    result = subprocess.run(
        [
            "curl",
            "-sS",
            weaver_completed_graphics_url(),
            "-H",
            "Content-Type: application/json",
            "-d",
            json.dumps(payload),
        ],
        check=False,
        capture_output=True,
        text=True,
        timeout=120,
    )

    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "curl failed while posting completed graphics to Weaver.")

    if not result.stdout.strip():
        return {"ok": True}

    data = json.loads(result.stdout)
    if isinstance(data, dict) and "error" in data:
        message = data["error"].get("message") if isinstance(data["error"], dict) else str(data["error"])
        raise RuntimeError(message or "Weaver returned an error while accepting the completion payload.")
    return data if isinstance(data, dict) else {"ok": True, "response": data}


class ApiHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_ROOT), **kwargs)

    def send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)

        if parsed.path == "/api/health":
            self.send_json(
                {
                    "ok": True,
                    "service": "pig",
                    "liveWeaverReadUrl": weaver_graphics_requests_url(),
                    "liveWeaverWriteUrl": weaver_completed_graphics_url(),
                    "sourceAvailability": source_availability(),
                }
            )
            return

        if parsed.path == "/api/app-config":
            self.send_json(
                {
                    "ok": True,
                    "defaultSource": "weaver_graphics_requests",
                    "sourceAvailability": source_availability(),
                }
            )
            return

        if parsed.path == "/api/social-media/lookup":
            params = parse_qs(parsed.query)
            author = params.get("author", [""])[0].strip()
            try:
                record = lookup_artist_handle_record(author)
            except Exception as exc:
                self.send_json(
                    {
                        "record": None,
                        "source": "Artist Handle Primary",
                        "warning": f"Social media sheet lookup is temporarily unavailable: {exc}",
                    }
                )
                return
            self.send_json({"record": record, "source": "Artist Handle Primary"})
            return

        if parsed.path == "/api/drive-config":
            client_id = os.environ.get("GOOGLE_OAUTH_CLIENT_ID", "").strip()
            api_key = os.environ.get("GOOGLE_API_KEY", "").strip()
            app_id = os.environ.get("GOOGLE_APP_ID", "").strip()
            default_folder_id = default_drive_folder_id()
            default_folder_name = default_drive_folder_name()
            self.send_json(
                {
                    "enabled": bool(client_id and api_key),
                    "serverUploadEnabled": server_drive_upload_enabled(),
                    "clientId": client_id,
                    "apiKey": api_key,
                    "appId": app_id,
                    "defaultFolder": {
                        "id": default_folder_id,
                        "name": default_folder_name or "Default dev folder",
                    }
                    if default_folder_id
                    else None,
                }
            )
            return

        if parsed.path == "/api/search":
            params = parse_qs(parsed.query)
            source_type = params.get("source", ["excerpt_library"])[0]
            query = params.get("q", [""])[0].strip()
            limit = max(1, min(int(params.get("limit", ["12"])[0]), 50))
            filter_value = params.get("filter", ["current_titles"])[0]
            book_title = params.get("bookTitle", [""])[0].strip()
            debug_enabled = params.get("debug", [""])[0].strip().lower() in {"1", "true", "yes"}
            force_legacy = (
                params.get("legacy", [""])[0].strip().lower() in {"1", "true", "yes"}
                or params.get("forceLegacy", [""])[0].strip().lower() in {"1", "true", "yes"}
            )
            diagnostics: list[dict] | None = [] if debug_enabled else None

            try:
                if source_type == "excerpt_library":
                    results = search_excerpt_library(query, limit, approved_only=False)
                elif source_type == "approved_excerpt_library":
                    results = search_excerpt_library(query, limit, approved_only=True)
                elif source_type == "weaver_graphics_requests":
                    results = search_weaver_graphics_requests(
                        query,
                        limit,
                        filter_value,
                        book_title,
                        diagnostics,
                        force_legacy,
                    )
                elif source_type == "poetry_please_ranked_texts":
                    results = search_poetry_please_ranked_texts(query, limit, book_title=book_title)
                elif source_type == "catalog_short_poems":
                    results = search_catalog_short_poems(query, limit)
                else:
                    raise KeyError(f"Unsupported source type: {source_type}")
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            payload = {"results": results}
            if diagnostics is not None:
                payload["debug"] = diagnostics
            self.send_json(payload)
            return

        if parsed.path == "/api/weaver/graphics-request-books":
            params = parse_qs(parsed.query)
            filter_value = params.get("filter", ["current_titles"])[0]

            try:
                books = search_weaver_graphics_request_books(filter_value)
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"books": books})
            return

        if parsed.path == "/api/poetry-please/ranked-text-books":
            try:
                books = search_poetry_please_ranked_text_books()
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"books": books})
            return

        if parsed.path == "/api/record":
            params = parse_qs(parsed.query)
            source_type = params.get("source", [""])[0]
            record_id = params.get("id", [""])[0]

            try:
                record = load_record(source_type, record_id)
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"record": record})
            return

        if parsed.path == "/api/random":
            params = parse_qs(parsed.query)
            source_type = params.get("source", ["any"])[0]
            filter_value = params.get("filter", ["current_titles"])[0]
            book_title = params.get("bookTitle", [""])[0].strip()

            try:
                record = random_record(source_type, filter_value, book_title)
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"record": record})
            return

        super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)

        if parsed.path.startswith("/api/weaver/graphics-handoff/"):
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)

            try:
                payload = json.loads(raw_body.decode("utf-8") or "{}")
                path_parts = parsed.path.removeprefix("/api/weaver/graphics-handoff/").split("/")
                graphics_request_id = unquote(path_parts[0]) if path_parts else ""
                if len(path_parts) == 2 and path_parts[1] == "claim":
                    result = claim_graphics_handoff_request(graphics_request_id)
                else:
                    result = patch_graphics_handoff_request(graphics_request_id, payload)
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"ok": True, "result": result})
            return

        if parsed.path == "/api/weaver/completed-graphics":
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)

            try:
                payload = json.loads(raw_body.decode("utf-8"))
                completions = payload.get("completions")
                if not isinstance(completions, list):
                    raise ValueError("Payload must include a completions array.")
                result = post_completed_graphics_to_weaver(completions)
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"ok": True, "result": result})
            return

        if parsed.path == "/api/drive/upload-generated-image":
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)

            try:
                payload = json.loads(raw_body.decode("utf-8"))
                folder_id = str(payload.get("folderId", "")).strip() or default_drive_folder_id()
                file_name = str(payload.get("fileName", "")).strip()
                image_data_url = str(payload.get("imageDataUrl", "")).strip()

                if not folder_id:
                    raise ValueError("A Drive folder is required.")
                if not file_name:
                    raise ValueError("A file name is required.")
                if not image_data_url:
                    raise ValueError("An image payload is required.")

                result = upload_image_to_drive(folder_id, file_name, image_data_url)
            except Exception as exc:
                self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"ok": True, "upload": result})
            return

        if parsed.path != "/api/generate-background":
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)

        try:
            payload = json.loads(raw_body.decode("utf-8"))
            prompt = str(payload.get("prompt", "")).strip()
            model = str(payload.get("model", default_openai_image_model())).strip() or default_openai_image_model()
            width = int(payload.get("width", 1080))
            height = int(payload.get("height", 1350))

            if not prompt:
                raise ValueError("Prompt is required.")

            image_data_url = generate_background(prompt, model, width, height)
        except Exception as exc:
            self.send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
            return

        self.send_json({"imageDataUrl": image_data_url})


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve the poem image generator app and local data APIs.")
    port_default = int(os.environ.get("PORT", "8123"))
    host_default = os.environ.get("HOST", "0.0.0.0" if "PORT" in os.environ else "127.0.0.1")
    parser.add_argument("--host", default=host_default)
    parser.add_argument("--port", type=int, default=port_default)
    return parser.parse_args()


def main() -> int:
    load_dotenv()
    args = parse_args()
    server = ThreadingHTTPServer((args.host, args.port), ApiHandler)
    print(f"Serving poem image generator at http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
