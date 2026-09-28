#!/usr/bin/env node

const pigBase = (process.env.PIG_BASE_URL || "https://pig.buttonpoetry.com").replace(/\/$/, "");
const weaverBase = (
  process.env.WEAVER_GRAPHICS_HANDOFF_BASE_URL
  || "https://weaver-912447899335.us-central1.run.app/graphics-handoff"
).replace(/\/$/, "");
const runId = process.env.PIG_SMOKE_RUN_ID || `pig-live-drive-smoke-${Date.now()}`;
const imageType = "QI";
let phase = "configuration";

async function requestJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": runId,
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    const text = await response.text();
    let payload = {};
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`${response.status} returned non-JSON: ${text.slice(0, 200)}`);
    }
    if (!response.ok || payload.ok === false) {
      throw new Error(`${response.status}: ${payload.error || text.slice(0, 240)}`);
    }
    return payload;
  } finally {
    clearTimeout(timer);
  }
}

function recordFrom(payload) {
  return payload.result?.record || payload.record || payload.result || payload;
}

async function patchRecord(graphicsRequestId, update) {
  return recordFrom(await requestJson(`${pigBase}/api/weaver/graphics-handoff/${encodeURIComponent(graphicsRequestId)}`, {
    method: "POST",
    body: JSON.stringify(update),
  }));
}

try {
  const config = await requestJson(`${pigBase}/api/drive-config`);
  const folderId = config.defaultFolder?.id;
  if (!config.serverUploadEnabled || !config.editableProjectStorageEnabled || !folderId) {
    throw new Error("Live P.I.G. Drive storage is not fully enabled.");
  }

  phase = "fixture creation";
  let graphicsRequestId = `${runId}:${imageType}`;
  const fixtureTitle = `LIVE DRIVE SMOKE ${runId}`;
  await requestJson(`${weaverBase}/requests`, {
    method: "POST",
    body: JSON.stringify({
      requests: [{
        graphicsRequestId,
        sourceSystem: "pig_smoke_test",
        sourceStatus: "needs_graphics",
        contentType: imageType,
        imageType,
        sourceRecordId: graphicsRequestId,
        sourcePayload: {
          sourceSystem: "pig_smoke_test",
          smokeTest: true,
          title: fixtureTitle,
          poemTitle: fixtureTitle,
          bookTitle: "P.I.G. Smoke Test Fixtures",
          author: "P.I.G. Test Runner",
          excerpt: "Synthetic Drive-backed smoke test. No production content is used.",
        },
      }],
    }),
  });

  phase = "claim";
  const claim = recordFrom(await requestJson(
    `${pigBase}/api/weaver/graphics-handoff/${encodeURIComponent(graphicsRequestId)}/claim`,
    { method: "POST", body: JSON.stringify({ claimedBy: "P.I.G. live Drive smoke test" }) },
  ));
  graphicsRequestId = claim.graphicsRequestId || graphicsRequestId;
  if (claim.handoffStatus !== "claimed") throw new Error(`Expected claimed; got ${claim.handoffStatus}`);

  phase = "editable JSON upload";
  const pigProjectId = `${runId}-project`;
  const projectUpload = await requestJson(`${pigBase}/api/drive/upload-editable-project-sidecar`, {
    method: "POST",
    body: JSON.stringify({
      folderId,
      fileName: `${runId}.png`,
      project: {
        kind: "pig.editableProject",
        schemaVersion: 3,
        pigProjectId,
        title: fixtureTitle,
        author: "P.I.G. Test Runner",
        bookTitle: "P.I.G. Smoke Test Fixtures",
        poemText: "Synthetic Drive-backed smoke test. No production content is used.",
        sourceRecord: { graphicsRequestId, imageType, smokeTest: true },
      },
    }),
  });
  const editableProjectFileId = projectUpload.project?.projectFileId;
  const editableProjectUrl = projectUpload.project?.projectUrl;
  if (!editableProjectFileId || !editableProjectUrl) throw new Error("Drive did not return editable project identity.");

  phase = "editable JSON reopen";
  const reopened = await requestJson(`${pigBase}/api/editable-projects/${encodeURIComponent(editableProjectFileId)}`);
  const reopenedProject = reopened.project?.project || reopened.project || reopened;
  if (reopenedProject.pigProjectId !== pigProjectId) {
    throw new Error(`Reopened the wrong project: ${reopenedProject.pigProjectId || "missing pigProjectId"}`);
  }

  phase = "PNG upload";
  const onePixelPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl3ZQAAAABJRU5ErkJggg==";
  const imageUpload = await requestJson(`${pigBase}/api/drive/upload-generated-image`, {
    method: "POST",
    body: JSON.stringify({ folderId, fileName: `${runId}.png`, imageDataUrl: onePixelPng }),
  });
  const asset = imageUpload.upload || {};
  const assetFileId = asset.assetFileId || asset.id || asset.fileId;
  if (!assetFileId || !asset.assetUrl) throw new Error("Drive did not return PNG file identity.");

  phase = "Weaver upload lifecycle";
  await patchRecord(graphicsRequestId, {
    handoffStatus: "uploaded",
    pigStatus: "uploaded",
    imageType,
    contentType: imageType,
    assetFileId,
    driveFileId: assetFileId,
    assetUrl: asset.assetUrl,
    assetPreviewUrl: asset.assetPreviewUrl,
    pigProjectId,
    editableProjectKind: "pig.editableProject",
    editableProjectSchemaVersion: 3,
    editableProjectFileId,
    editableProjectUrl,
    smokeTest: true,
  });

  phase = "Weaver completion handoff";
  const completionId = `${runId}-completion`;
  await requestJson(`${pigBase}/api/weaver/completed-graphics`, {
    method: "POST",
    body: JSON.stringify({
      completions: [{
        completionId,
        requestId: graphicsRequestId,
        graphicsRequestId,
        pigProjectId,
        imageType,
        contentType: imageType,
        author: "P.I.G. Test Runner",
        poemTitle: fixtureTitle,
        bookTitle: "P.I.G. Smoke Test Fixtures",
        quoteText: "Synthetic Drive-backed smoke test. No production content is used.",
        assetFileId,
        driveFileId: assetFileId,
        assetUrl: asset.assetUrl,
        assetPreviewUrl: asset.assetPreviewUrl,
        editableProjectKind: "pig.editableProject",
        editableProjectSchemaVersion: 3,
        editableProjectFileId,
        editableProjectUrl,
        completedAt: new Date().toISOString(),
        sourceTool: "P.I.G.",
        smokeTest: true,
      }],
    }),
  });
  await patchRecord(graphicsRequestId, {
    handoffStatus: "sent_to_weaver_qc",
    pigStatus: "uploaded",
    qcStatus: "pending",
    smokeTest: true,
  });

  phase = "queue removal";
  const queue = await requestJson(`${weaverBase}/queue?filter=all&limit=250`);
  const records = queue.records || queue.queue || queue.requests || [];
  if (records.some((record) => record.graphicsRequestId === graphicsRequestId)) {
    throw new Error("Completed fixture remained in Weaver's actionable queue.");
  }

  phase = "final ledger identity";
  const finalRecord = recordFrom(await requestJson(`${weaverBase}/${encodeURIComponent(graphicsRequestId)}`));
  const expectedIdentity = { assetFileId, editableProjectFileId, pigProjectId };
  for (const [field, expected] of Object.entries(expectedIdentity)) {
    if (finalRecord[field] !== expected) {
      throw new Error(`Final ledger lost ${field}: expected ${expected}, got ${finalRecord[field]}`);
    }
  }
  if (finalRecord.editableProjectAvailable !== true) {
    throw new Error(`Final ledger did not mark the editable project available: ${finalRecord.editableProjectAvailable}`);
  }

  console.log(JSON.stringify({
    ok: true,
    runId,
    graphicsRequestId,
    completionId,
    pigProjectId,
    editableProjectFileId,
    editableProjectUrl,
    assetFileId,
    assetUrl: asset.assetUrl,
  }, null, 2));
} catch (error) {
  console.error(JSON.stringify({ ok: false, runId, phase, error: error.message }, null, 2));
  process.exitCode = 1;
}
