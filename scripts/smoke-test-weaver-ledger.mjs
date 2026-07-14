#!/usr/bin/env node

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

const open = await fetchJson("/weaver%3Arow-225");
assertStatus(open, {
  handoffStatus: "requested",
  pigStatus: "not_started",
  qcStatus: "not_sent",
});

console.log("Weaver ledger smoke test passed.");
