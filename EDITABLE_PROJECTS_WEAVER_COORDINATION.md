# Editable P.I.G. Projects / Weaver Coordination

This document tracks the contract work needed so P.I.G. can keep durable editable project records for QI graphics while Weaver remains the source of truth for queue state.

## Current P.I.G. Shape

P.I.G. now treats local snapshots as editable project records:

- `kind`: `pig.editableProject`
- `schemaVersion`: `1`
- `id`: same value as `pigProjectId` for local compatibility
- `pigProjectId`: stable editable project id for one P.I.G. design state
- `sourceIdentity`: source/QI/handoff identity for the content
- `controlValues`: editable design controls
- `assetRefs`: exported file-level asset references
- `selectedRecord`: source record snapshot
- `exportState`: latest export/handoff state

P.I.G. also includes `pigProjectId`, `editableProjectKind`, and `editableProjectSchemaVersion` in Weaver completion payloads and handoff ledger patches.

## Confirm With Weaver

- Confirm Weaver can accept and persist `pigProjectId` on completed graphics and handoff ledger updates.
- Confirm Weaver should echo `pigProjectId` back in future rework handoff rows.
- Confirm whether Weaver wants `editableProjectKind` and `editableProjectSchemaVersion`, or only `pigProjectId`.
- Confirm the naming relationship among:
  - `graphicsRequestId`: queue/request identity
  - `pigProjectId`: editable design-state identity
  - `completionId`: one completed export/send event
  - `assetFileId`: Drive file identity
  - `revisionOf`: prior request/project/asset being corrected
  - `version`: revision or variant number

## Likely Weaver Contract Additions

For completed graphics rows:

- `pigProjectId`
- `editableProjectKind`
- `editableProjectSchemaVersion`
- `assetFileId`
- `assetUrl`
- `assetPreviewUrl`
- `assetCreatedTime`

For rework queue rows returned to P.I.G.:

- `editableProjectFileId` or `projectFileId`: the Drive file id for the saved editable P.I.G. JSON that produced the rejected graphic
- `pigProjectId`: stable editable design identity, useful when P.I.G. can resolve it through its editable project index
- `revisionOf`
- `version`
- `previousAssetUrl`
- `previousAssetPreviewUrl`
- `assetFileId` / `previousAssetFileId` if available
- full rework notes / reason fields

## Open Decisions

- Durable storage location for editable project JSON:
  - Drive JSON file per project is the first implemented path.
  - Firestore document per project remains a possible later upgrade.
  - Cloud Storage JSON object per project
- Whether Weaver should store the editable project JSON itself or only store `pigProjectId` and asset refs.
- Whether a rework should create a new `pigProjectId` immediately or retain the original project id with a new `version`.
- Whether intentional alternate graphics should share the original `sourceIdentity` but always receive a new `pigProjectId`.

## Current Durable Storage Step

P.I.G. can now save editable project JSON through `POST /api/editable-projects`.

- Storage target: Google Drive JSON file.
- Configuration: `PIG_EDITABLE_PROJECTS_FOLDER_ID`.
- Optional display name: `PIG_EDITABLE_PROJECTS_FOLDER_NAME`.
- Autosaves remain browser-local only.
- Explicit `Save Snapshot` and post-Drive/QC saves attempt durable JSON storage when configured.

## Read / Reopen Path

P.I.G. can now load durable editable project JSON through `GET /api/editable-projects/{id}`.

- `{id}` can be a `pigProjectId`, which resolves to `{pigProjectId}.json` in the configured folder.
- `{id}` can also be a Drive file id.
- History / Resources includes an `Open durable project` field for pasting either value.
- Loaded durable projects are restored through the same editable snapshot path as local project history.
- Because Drive shared-drive search by filename can be unreliable from the service account, P.I.G. now stores `editableProjectFileId` in local history after each durable save.
- Local history cards should prefer `editableProjectFileId` for durable reopen, while `pigProjectId` remains the stable design identity.
- P.I.G. now also maintains `pig-editable-project-index.json` in the editable project folder. The index maps `pigProjectId` to `projectFileId`, so future loads can resolve stable project ids without relying on Drive filename search.

## Next P.I.G. Step

Confirm Weaver is persisting and echoing `editableProjectFileId`/`projectFileId` for rework rows. `pigProjectId` alone is not enough unless P.I.G.'s Drive index already contains a matching entry. If neither durable id is present, P.I.G. must load text only and clearly say the editable project is unavailable.

Completed local stepping stone:

- History / Resources now includes a current editable project readout with `pigProjectId` and latest asset refs.
