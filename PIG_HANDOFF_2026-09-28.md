# P.I.G. handoff — 2026-09-28

This handoff condenses the complete **NEW PIG** chat (353 retrieved turns, from its opening handoff through its context-window failure). It is historical orientation, not a substitute for the current checkout, live service, Weaver contract, or current roadmap. Thread ID: `019e74dd-519e-70d1-bcc7-69efba752244`.

## Immediate state and next action

- Repository: `poem-image-generator`, branch `main`, at `11ce77b` and aligned with `origin/main` before the current uncommitted batch.
- Dirty batch: `ROADMAP.md`, `api_server.py`, `deploy-cloud-run.sh`, `index.html`, `script.js`, plus untracked `scripts/smoke-test-live-drive-flow.mjs`. The pre-cleanup diff was 674 additions and 6 deletions across the five tracked files.
- The last successful NEW PIG status check (August 24) reported the live app serving the same Book Specific QI asset build as this dirty checkout. That is evidence, not a fresh September 28 revision check.
- The Book Specific QI implementation was reported deployed as `pig-00225-htt` on August 11. Its authenticated create/apply mutation canary was not completed because the prior CLI credential needed reauthentication and browser automation could not attach an image.
- On September 28, the source batch was committed and pushed as `c89fd03`. A follow-up fix (`9962a16`) stopped forcing Google consent on the first Drive-token request, without changing the requested scope. The approved `./deploy-cloud-run.sh` deployed it as `pig-00226-jfn`, serving 100% traffic. The live asset version and the existing production Drive folder settings were verified.
- A synthetic PNG was saved as `SMOKE TEST — archive after verification`, book key `PIGSMOKE-2026`, template ID `book-template-1790615181018-31aa8d`. The live UI reported success and the public registry lists it. No sign-in or consent popup appeared on this successful save. Applying and archiving remain unverified: the picker filters by the currently loaded record, and the synthetic book has no actionable record to load. The synthetic variant remains active but is assigned only to that synthetic book.
- Next: provide a narrow management path that can select a saved variant without an actionable book record, then apply and archive the synthetic variant. Use only the approved `./deploy-cloud-run.sh` for any needed deployment.

## Architecture and ownership decisions

- **Weaver owns queue truth:** actionability, counts, status, rework, coverage needs, and completion. P.I.G. displays and acts on Weaver's handoff ledger; it must not rebuild counts from browser state, legacy APIs, or direct Firestore access. Normal loads use the direct Cloud Run graphics-handoff endpoint; legacy loading is debug-only.
- **Exact identity for rework:** reopen the durable editable project identified by Weaver. Never guess from local history, similar text, a thumbnail, or a prior row. If identity is missing, say `Load text only`. A wrong background is worse than an explicit limitation.
- **Preserve provenance:** keep the same `graphicsRequestId` through claim, upload, QC, rejection, and revision; carry `pigProjectId`, `editableProjectFileId`, asset ID/URL, schema/kind, and repair provenance. Weaver must retain valid identity when later patches omit fields.
- **Editable project storage:** structured JSON lives separately from the exported PNG in shared Drive storage. Keep file IDs and references, not repeated base64 canvases. The Codex Drive has `PIG / Editable Projects`; the service account is the server-side uploader.
- **Book Specific QI:** a shared Drive-backed registry, rather than browser-only templates. Assign variants by `BOOKSHORTENER-YYYY`; retain the displayed title as metadata. Save background and visual controls, but exclude poem content and queue controls. Authenticated Button Poetry users can create, update, and archive; archived variants stay in the registry but leave normal selectors. Limits: 12 MB and 6000 × 6000 pixels.
- **Template boundary:** Template Studio owns reusable visual defaults. Normal P.I.G. owns queue work, one-off edits, upload/QC, history, and rework. Shared book-specific variants are production templates, visible only for their assigned book.
- **Delivery:** local edits are a temporary step. The user explicitly asked that useful P.I.G. work reach the hosted app, with a Git checkpoint. The existing deployment script is the only approved deployment workflow; do not request new scopes or switch methods after a failure.

## Verified history and lessons

- July 22: the user successfully reopened an exact editable rework, resubmitted it, and saw it leave P.I.G.'s Rework lane. This established that the path works when Weaver provides valid durable identity. Older rework records without that identity remain text-only.
- July 22–23: stale/deleted editable JSON IDs caused Drive 404s and several PNG uploads without completed Weaver handoff. P.I.G. was changed to create a fresh editable sidecar on export, use the new ID, and avoid reusing stale IDs. Weaver Drive access and identity normalization were also part of the failures; do not diagnose every 404 as a P.I.G. upload problem.
- August 3: controlled Poetry Please repair completed under the same canonical request and was approved. A record missing from Weaver `filter=all` was initially misdiagnosed as lost; that filter excludes terminal records. Query the exact record to verify terminal state.
- August 11: a real synthetic PNG and editable JSON were uploaded and reopened. Weaver initially lost the IDs (`null`, empty, or literal `None`); after a Weaver fix, a fresh live test retained `assetFileId`, `pigProjectId`, and `editableProjectFileId`, marked the editable project verified, and removed the request from the actionable queue. `scripts/smoke-test-live-drive-flow.mjs` encodes this separate lifecycle test.
- Earlier Book Specific QI review found and fixed blank-logo selection, stale book/catalog assignment, and hidden-background reuse. The shared registry replaced a browser-only first version. Authentication, canonical book keys, complete visual state, archive controls, and image limits followed. The live authenticated mutation remains the gap.
- August 4: a deploy cleared the default Drive folder setting and sent operators toward personal Google authorization. The current deploy script checks in a default folder ID/name to prevent that exact blank override. Verify the destination before another deploy; additional fail-closed and post-deploy checks are still roadmap work.
- The user repeatedly corrected long diagnostic loops and scope expansion. Use one bounded check tied to the observed failure, distinguish confirmed facts from guesses, and stop optional passes once the question is answered.

## Open work, kept separate from this checkpoint

1. Add a narrow variant-management path for saved Book Specific QI templates when no matching actionable record is loaded. Apply and archive the labeled synthetic variant, then verify it leaves production selectors.
2. Keep the source, live revision, and Drive configuration aligned through the existing approved deployment workflow.
4. For later product work: registry version history/rollback, archive administration if actually needed, font-file/license inventory and explicit font fallback behavior, production setting locks, shared tabled-state ownership, and intentional second-graphic variants. These are roadmap items, not prerequisites for this cleanup.

## Source-of-truth order

1. Current production service and Weaver's exact handoff record for live behavior.
2. Current repository files and Git state for reproducible source.
3. Current `ROADMAP.md` and `NAMING_CONVENTIONS.md` for intended work and naming.
4. This handoff and the NEW PIG chat for historical decisions and failure context.
