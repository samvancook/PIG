#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Exercise P.I.G.'s routing with fixtures before checking the live ledger.
execFileSync(process.env.PYTHON || "python3", ["-c", `
import api_server as api
from unittest.mock import patch
from urllib.parse import parse_qs, urlparse

row = {"graphicsRequestId": "weaver:qi:contest-canary", "author": "Leslie Kaup",
       "quoteText": "First line\\nSecond line", "isActionable": True,
       "queueView": "current_titles"}
def queue(url, headers):
    params = parse_qs(urlparse(url).query)
    assert int(params["limit"][0]) >= 5000, params
    assert params["filter"] == ["all"], params
    # The match sits beyond the old 200-row search cap.
    rows = [{**row, "author": "Other writer"} for _ in range(220)] + [row]
    return {"records": rows[:int(params["limit"][0])]}, {}

with patch.object(api, "fetch_json_via_curl_with_metrics", side_effect=queue), \\
     patch.object(api, "lookup_excerpt_enrichment", return_value=None), \\
     patch.object(api, "fetch_json_via_curl", side_effect=AssertionError("Legacy fallback")):
    results = api.search_weaver_graphics_requests("Leslie Kaup", 12, "all")
    assert len(results) == 1 and results[0]["graphicsRequestId"] == row["graphicsRequestId"]
    assert results[0]["text"] == row["quoteText"]

for view in ("all", "current_titles", "poetry_please_repairs"):
    with patch.object(api, "search_weaver_graphics_handoff_queue", return_value=[]), \\
         patch.object(api, "fetch_json_via_curl", side_effect=AssertionError("Legacy fallback")):
        assert api.search_weaver_graphics_requests("no match", 12, view) == []

def books(url):
    assert "/graphics-handoff/books?filter=all" in url, url
    return {"books": [{"bookTitle": "Contest", "count": 9}]}
with patch.object(api, "fetch_json_via_curl", side_effect=books):
    assert api.search_weaver_graphics_request_books("all")[0]["count"] == 9
print("P.I.G. durable queue routing regression passed.")
`], { cwd: fileURLToPath(new URL("..", import.meta.url)), stdio: "inherit" });

if (process.argv.includes("--offline")) process.exit(0);

const baseUrl = (
  process.env.WEAVER_GRAPHICS_HANDOFF_BASE_URL ||
  "https://weaver-912447899335.us-central1.run.app/graphics-handoff"
).replace(/\/$/, "");

async function fetchJson(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { "X-Request-Id": `pig-smoke-${Date.now()}` },
      signal: controller.signal,
    });
    const body = await response.text();
    if (!response.ok) {
      throw new Error(`${response.status} ${body.slice(0, 240)}`);
    }
    const payload = JSON.parse(body);
    return payload.record || payload;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchQueue(filter = "current_titles") {
  const payload = await fetchJson(`/queue?filter=${encodeURIComponent(filter)}&limit=250`);
  return payload.queue || payload.requests || payload.items || payload.records || [];
}

function assertStatus(record, expected) {
  for (const [key, value] of Object.entries(expected)) {
    if (record?.[key] !== value) {
      throw new Error(`${record?.graphicsRequestId || "record"} expected ${key}=${value}, got ${record?.[key]}`);
    }
  }
}

const approved = await fetchJson("/weaver%3Arow-200");
assertStatus(approved, {
  handoffStatus: "approved",
  pigStatus: "uploaded",
  qcStatus: "approved",
});

const queue = await fetchQueue();
if (queue.some((record) => record?.graphicsRequestId === "weaver:row-200")) {
  throw new Error("Approved record weaver:row-200 was returned in the actionable current_titles queue.");
}
for (const record of queue) {
  if (record?.isActionable !== true) {
    throw new Error(`${record?.graphicsRequestId || "queue record"} is not explicitly actionable.`);
  }
  if (record?.queueView !== "current_titles") {
    throw new Error(`${record?.graphicsRequestId || "queue record"} has queueView=${record?.queueView}.`);
  }
}

const actionable = queue[0];
if (!actionable?.graphicsRequestId) {
  throw new Error("Weaver current_titles queue did not provide a live actionable record to verify.");
}
const actionableDetail = await fetchJson(`/${encodeURIComponent(actionable.graphicsRequestId)}`);
assertStatus(actionableDetail, {
  graphicsRequestId: actionable.graphicsRequestId,
  isActionable: true,
  queueView: "current_titles",
});

console.log("Weaver ledger smoke test passed.");
