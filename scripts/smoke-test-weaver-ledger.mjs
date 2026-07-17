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
