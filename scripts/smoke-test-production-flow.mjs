#!/usr/bin/env node

const baseUrl = (
  process.env.WEAVER_GRAPHICS_HANDOFF_BASE_URL
  || "https://weaver-912447899335.us-central1.run.app/graphics-handoff"
).replace(/\/$/, "");

const runId = process.env.PIG_SMOKE_RUN_ID || `pig-smoke-${Date.now()}`;

async function requestJson(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": runId,
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    const text = await response.text();
    const payload = text ? JSON.parse(text) : {};
    if (!response.ok || payload.ok === false) {
      throw new Error(`${options.method || "GET"} ${path}: ${response.status} ${payload.error || text.slice(0, 240)}`);
    }
    return payload.record || payload;
  } finally {
    clearTimeout(timer);
  }
}

async function patchRecord(graphicsRequestId, update) {
  return requestJson(`/${encodeURIComponent(graphicsRequestId)}`, {
    method: "PATCH",
    body: JSON.stringify({ update }),
  });
}

function assertFields(record, expected, phase) {
  for (const [key, value] of Object.entries(expected)) {
    if (record?.[key] !== value) {
      throw new Error(`${phase}: expected ${key}=${value}, got ${record?.[key]}`);
    }
  }
}

async function exerciseFixture(imageType) {
  const graphicsRequestId = `${runId}:${imageType}`;
  const editableProjectFileId = `${runId}-${imageType}-editable-json`;
  const assetFileId = `${runId}-${imageType}-png`;
  const sourcePayload = {
    sourceSystem: "pig_smoke_test",
    smokeTest: true,
    title: `${imageType} production-flow fixture`,
    poemTitle: `${imageType} production-flow fixture`,
    bookTitle: "P.I.G. Smoke Test Fixtures",
    author: "P.I.G. Test Runner",
    excerpt: imageType === "FPI" ? "" : "Synthetic test text. No production content is used.",
    imageUrl: imageType === "FPI" ? `https://example.invalid/${assetFileId}-source.png` : "",
  };

  await requestJson("/requests", {
    method: "POST",
    body: JSON.stringify({
      requests: [{
        graphicsRequestId,
        sourceSystem: "pig_smoke_test",
        sourceStatus: "needs_graphics",
        contentType: imageType,
        imageType,
        sourceRecordId: graphicsRequestId,
        sourcePayload,
      }],
    }),
  });

  const claimed = await requestJson(`/${encodeURIComponent(graphicsRequestId)}/claim`, {
    method: "POST",
    body: JSON.stringify({ claimedBy: "P.I.G. production smoke test" }),
  });
  assertFields(claimed, { graphicsRequestId, handoffStatus: "claimed" }, `${imageType} claim`);

  await patchRecord(graphicsRequestId, {
    handoffStatus: "generated",
    pigStatus: "generated",
    imageType,
    contentType: imageType,
    pigProjectId: `${runId}-${imageType}-project`,
    editableProjectFileId,
    editableProjectUrl: `https://drive.google.com/file/d/${editableProjectFileId}/view`,
    exportType: "smoke_fixture",
    smokeTest: true,
  });

  const uploaded = await patchRecord(graphicsRequestId, {
    handoffStatus: "uploaded",
    pigStatus: "uploaded",
    imageType,
    contentType: imageType,
    assetFileId,
    driveFileId: assetFileId,
    assetUrl: `https://drive.google.com/file/d/${assetFileId}/view`,
    assetPreviewUrl: `https://drive.google.com/thumbnail?id=${assetFileId}`,
    pigProjectId: `${runId}-${imageType}-project`,
    editableProjectFileId,
    editableProjectUrl: `https://drive.google.com/file/d/${editableProjectFileId}/view`,
    smokeTest: true,
  });
  assertFields(uploaded, { graphicsRequestId, pigStatus: "uploaded", imageType }, `${imageType} export`);

  await patchRecord(graphicsRequestId, {
    handoffStatus: "sent_to_weaver_qc",
    pigStatus: "uploaded",
    qcStatus: "pending",
    imageType,
    contentType: imageType,
    smokeTest: true,
  });

  await patchRecord(graphicsRequestId, {
    handoffStatus: "rejected",
    pigStatus: "not_started",
    qcStatus: "needs_revision",
    imageType,
    contentType: imageType,
    pigProjectId: `${runId}-${imageType}-project`,
    editableProjectFileId,
    editableProjectUrl: `https://drive.google.com/file/d/${editableProjectFileId}/view`,
    revisionOf: graphicsRequestId,
    version: 2,
    qcPayload: {
      rejectReason: "correct_and_recreate",
      qcNote: "Synthetic rework contract check.",
      requestedChanges: "Verify exact editable project identity.",
    },
    smokeTest: true,
  });

  const reworkQueue = await requestJson("/queue?filter=rework&limit=250");
  const reworkRecords = reworkQueue.records || reworkQueue.queue || reworkQueue.requests || [];
  const rework = reworkRecords.find((record) => record.graphicsRequestId === graphicsRequestId);
  if (!rework) {
    throw new Error(`${imageType} rejected fixture did not enter the Rework queue.`);
  }
  assertFields(
    rework,
    {
      graphicsRequestId,
      queueView: "rework",
      isActionable: true,
      imageType,
      pigProjectId: `${runId}-${imageType}-project`,
      editableProjectFileId,
    },
    `${imageType} rework contract`,
  );

  await requestJson(`/${encodeURIComponent(graphicsRequestId)}/claim`, {
    method: "POST",
    body: JSON.stringify({ claimedBy: "P.I.G. rework smoke test" }),
  });

  const completed = await patchRecord(graphicsRequestId, {
    handoffStatus: "approved",
    pigStatus: "uploaded",
    qcStatus: "approved",
    imageType,
    contentType: imageType,
    smokeTest: true,
  });
  assertFields(
    completed,
    { graphicsRequestId, handoffStatus: "approved", pigStatus: "uploaded", qcStatus: "approved", imageType },
    `${imageType} completion`,
  );

  const queue = await requestJson("/queue?filter=all&limit=250");
  const records = queue.records || queue.queue || queue.requests || [];
  if (records.some((record) => record.graphicsRequestId === graphicsRequestId)) {
    throw new Error(`${imageType} completed fixture remained in the actionable queue.`);
  }

  return { graphicsRequestId, editableProjectFileId, assetFileId };
}

const results = [];
for (const imageType of ["QI", "FPI"]) {
  results.push(await exerciseFixture(imageType));
}

console.log(JSON.stringify({ ok: true, runId, results }, null, 2));
