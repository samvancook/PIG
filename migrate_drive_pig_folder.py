#!/usr/bin/env python3
import json
import mimetypes
from pathlib import Path
import ssl
import subprocess
import sys
import urllib.parse
import urllib.request

ROOT_FOLDER_ID = "0ABJ8d01E4tn7Uk9PVA"
APP_ROOT = Path(__file__).resolve().parent
FOLDER_MIME = "application/vnd.google-apps.folder"


def token() -> str:
    return subprocess.check_output(["gcloud", "auth", "print-access-token"], text=True).strip()


ACCESS_TOKEN = token()


def request(url: str, method: str = "GET", body: dict | None = None) -> dict:
    data = json.dumps(body).encode("utf-8") if body is not None else None
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    if body is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    context = ssl._create_unverified_context()
    with urllib.request.urlopen(req, timeout=60, context=context) as response:
        raw = response.read().decode("utf-8")
    return json.loads(raw) if raw else {}


def q(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


def list_children(parent_id: str) -> list[dict]:
    query = f"'{q(parent_id)}' in parents and trashed = false"
    url = (
        "https://www.googleapis.com/drive/v3/files"
        "?supportsAllDrives=true&includeItemsFromAllDrives=true&corpora=allDrives"
        "&fields=files(id,name,mimeType,parents)"
        f"&q={urllib.parse.quote(query)}"
    )
    return request(url).get("files", [])


def find_child_folder(parent_id: str, name: str) -> str:
    for item in list_children(parent_id):
        if item.get("name") == name and item.get("mimeType") == "application/vnd.google-apps.folder":
            return item["id"]
    return ""


def create_folder(parent_id: str, name: str) -> str:
    payload = {
        "name": name,
        "mimeType": FOLDER_MIME,
        "parents": [parent_id],
    }
    url = "https://www.googleapis.com/drive/v3/files?supportsAllDrives=true&fields=id,name"
    return request(url, "POST", payload)["id"]


def ensure_folder(parent_id: str, name: str) -> str:
    return find_child_folder(parent_id, name) or create_folder(parent_id, name)


def move_file(file_id: str, old_parent_id: str, new_parent_id: str) -> None:
    url = (
        f"https://www.googleapis.com/drive/v3/files/{urllib.parse.quote(file_id)}"
        "?supportsAllDrives=true"
        f"&addParents={urllib.parse.quote(new_parent_id)}"
        f"&removeParents={urllib.parse.quote(old_parent_id)}"
        "&fields=id,name,parents"
    )
    request(url, "PATCH", {})


def upload_or_update_text_file(parent_id: str, local_path: Path, drive_name: str) -> dict:
    return upload_or_update_file(parent_id, local_path, drive_name)


def upload_or_update_file(parent_id: str, local_path: Path, drive_name: str) -> dict:
    existing_id = ""
    for item in list_children(parent_id):
        if item.get("name") == drive_name:
            existing_id = item["id"]
            break

    content = local_path.read_bytes()
    mime_type = mimetypes.guess_type(local_path.name)[0] or "application/octet-stream"
    if local_path.suffix.lower() == ".md":
        mime_type = "text/markdown"
    boundary = "pig-drive-migration"
    metadata = {"name": drive_name, "mimeType": mime_type}
    if not existing_id:
        metadata["parents"] = [parent_id]
    body = b"".join(
        [
            f"--{boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{json.dumps(metadata)}\r\n".encode("utf-8"),
            f"--{boundary}\r\nContent-Type: {mime_type}\r\n\r\n".encode("utf-8"),
            content,
            f"\r\n--{boundary}--".encode("utf-8"),
        ]
    )
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": f"multipart/related; boundary={boundary}",
    }
    if existing_id:
        url = (
            f"https://www.googleapis.com/upload/drive/v3/files/{urllib.parse.quote(existing_id)}"
            "?uploadType=multipart&supportsAllDrives=true&fields=id,name"
        )
        method = "PATCH"
    else:
        url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name"
        method = "POST"
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    context = ssl._create_unverified_context()
    with urllib.request.urlopen(req, timeout=60, context=context) as response:
        raw = response.read().decode("utf-8")
    result = json.loads(raw) if raw else {}
    result["updatedExisting"] = bool(existing_id)
    return result


def upload_tree(parent_id: str, local_dir: Path, *, skip_names: set[str] | None = None) -> list[dict]:
    uploaded = []
    skip_names = skip_names or set()
    for local_path in sorted(local_dir.iterdir(), key=lambda path: path.name.lower()):
        if local_path.name in skip_names:
            continue
        if local_path.is_dir():
            child_id = ensure_folder(parent_id, local_path.name)
            uploaded.extend(upload_tree(child_id, local_path, skip_names=skip_names))
        elif local_path.is_file():
            result = upload_or_update_file(parent_id, local_path, local_path.name)
            result["sourcePath"] = str(local_path.relative_to(APP_ROOT))
            uploaded.append(result)
    return uploaded


def is_pig_editable_json(item: dict) -> bool:
    name = item.get("name", "")
    return name == "pig-editable-project-index.json" or (name.startswith("project-") and name.endswith(".json"))


def main() -> int:
    folders = {}
    for name in (
        "00_Admin",
        "01_Shared_Docs",
        "PIG",
        "Weaver",
        "Poetry Please",
        "Template Studio",
        "QI + Source Libraries",
        "Social Media + Handles",
        "Local Machine Archive",
    ):
        folders[name] = ensure_folder(ROOT_FOLDER_ID, name)

    pig_id = ensure_folder(ROOT_FOLDER_ID, "PIG")
    pig_subfolders = {}
    for name in (
        "Roadmap + Decisions",
        "Specs + Contracts",
        "Editable Projects",
        "Templates",
        "Exports",
        "Test Assets",
        "Deployment Notes",
        "Scratch",
    ):
        pig_subfolders[name] = ensure_folder(pig_id, name)

    qi_excerpt_id = ensure_folder(folders["QI + Source Libraries"], "Excerpt Database")
    qi_metadata_id = ensure_folder(folders["QI + Source Libraries"], "Metadata")
    template_assets_id = ensure_folder(pig_subfolders["Templates"], "Reusable Assets")
    template_source_id = ensure_folder(pig_subfolders["Templates"], "Template Studio Source")
    uploaded_docs = []
    for doc_name in (
        "ROADMAP.md",
        "CLOUD_MIGRATION_MAP.md",
        "EDITABLE_PROJECTS_WEAVER_COORDINATION.md",
        "TEMPLATE_STUDIO_DECISIONS.md",
        "NAMING_CONVENTIONS.md",
        "BACKGROUND_GENERATION_PRIMER.md",
        "README.md",
    ):
        local_path = APP_ROOT / doc_name
        if local_path.exists():
            uploaded_docs.append(upload_or_update_text_file(pig_subfolders["Roadmap + Decisions"], local_path, doc_name))
    uploaded_template_source = []
    for file_name in ("template-studio.html", "template-studio.js"):
        local_path = APP_ROOT / file_name
        if local_path.exists():
            uploaded_template_source.append(upload_or_update_file(template_source_id, local_path, file_name))
    uploaded_assets = upload_tree(template_assets_id, APP_ROOT / "assets", skip_names={".DS_Store"})
    uploaded_metadata = []
    for file_name in ("book_author_map.json", "full-poems-120-or-less-v74.json"):
        local_path = APP_ROOT / "data" / file_name
        if local_path.exists():
            uploaded_metadata.append(upload_or_update_file(qi_metadata_id, local_path, file_name))

    editable_id = pig_subfolders["Editable Projects"]
    moved = []
    skipped = []
    for item in list_children(ROOT_FOLDER_ID):
        if is_pig_editable_json(item):
            move_file(item["id"], ROOT_FOLDER_ID, editable_id)
            moved.append({"name": item["name"], "id": item["id"]})
        elif item.get("name") in {"Excerpt Database System", "Excerpt Database - DB Workflow Export"}:
            move_file(item["id"], ROOT_FOLDER_ID, qi_excerpt_id)
            moved.append({"name": item["name"], "id": item["id"], "destination": "QI + Source Libraries/Excerpt Database"})
        else:
            skipped.append({"name": item.get("name"), "mimeType": item.get("mimeType")})
    print(
        json.dumps(
            {
                "topLevelFolders": folders,
                "pigFolderId": pig_id,
                "pigSubfolders": pig_subfolders,
                "qiExcerptDatabaseFolderId": qi_excerpt_id,
                "qiMetadataFolderId": qi_metadata_id,
                "templateAssetsFolderId": template_assets_id,
                "templateStudioSourceFolderId": template_source_id,
                "uploadedDocs": uploaded_docs,
                "uploadedTemplateSource": uploaded_template_source,
                "uploadedAssetsCount": len(uploaded_assets),
                "uploadedMetadata": uploaded_metadata,
                "moved": moved,
                "skipped": skipped,
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
