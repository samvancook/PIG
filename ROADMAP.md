# P.I.G. Roadmap

## Active Stability Sprint

- Treat Weaver's handoff ledger as the only source of truth for queue membership, actionability, counts, status, completion, and rework visibility.
- Use `https://weaver-912447899335.us-central1.run.app/graphics-handoff` for ledger reads, claims, and lifecycle patches. P.I.G. must not connect directly to Firestore.
- Keep legacy queue loading debug-only through `legacy=1` / `forceLegacy=1`; normal user loads must never fall back to legacy APIs or locally reconstructed counts.
- Do not dedupe, suppress, or reinterpret ledger-owned records as queue truth in P.I.G. Display only records Weaver marks `isActionable: true` for the requested `queueView`.
- Keep local tabled/history state as interface assistance only; it must not alter Weaver counts or server truth.
- Verify the known approved record plus a live actionable queue record with `scripts/smoke-test-weaver-ledger.mjs` before deployment; do not rely on an open record remaining open forever.
- Preserve the explicit text-only rework message whenever a durable editable project cannot be restored.
- Current status (July 17, 2026): dedicated synthetic QI and FPI records pass claim, generated, uploaded, submitted, revision rejection, exact editable-project identity recovery, approval, and queue-removal checks through `scripts/smoke-test-production-flow.mjs` against live Weaver.

## Highest-Value Next Updates

1. Weaver duplicate suppression, end-to-end
   - Keep the shared handoff ledger as a top priority.
   - P.I.G. should read actionable work from the ledger, claim records before work starts, and update lifecycle states as graphics are generated, exported, uploaded, and sent to QC.
   - Weaver should stop returning any request that is generated, exported, uploaded, sent to QC, approved, or otherwise no longer actionable.
   - Add a `Keep excerpt in queue for another graphic` option to the Drive upload and Weaver QC handoff flow.
   - When selected, preserve the excerpt as actionable after upload and create a distinct graphic-variant identity for the completed asset, while retaining the shared excerpt/source-request identity for history and QC.
   - Make subsequent variants visible as separate graphics rather than duplicate completions, with clear variant numbering or IDs.
   - Add a P.I.G. duplicate guardrail for incoming Weaver records: compare normalized excerpt identity before display, hide exact duplicate queue rows from active work, and show an audit count with the affected queue-row IDs.
   - Keep duplicate filtering distinct from intentional multi-variant graphics: duplicate source rows should be flagged or suppressed, while deliberate second graphics should remain available through their graphic-variant identities.
   - Add a review path for optionally closing or removing confirmed duplicate rows upstream in Weaver rather than silently masking the source-data issue forever.
   - Event metadata: P.I.G. accepts and preserves optional `sourceEvent` / `sourceEventLabel` as secondary context for future campaign grouping, batch generation, output routing, and reporting. These fields must not replace author, poem title, book, excerpt, or Weaver queue identity.

2. Weaver rework workflow
   - Current status: P.I.G. has a `Rework` filter in the existing Weaver panel that shows `rework_requested` / rejected items, including the Short Form Contest May 2026 rework set.
   - Current status: rework/rejected server-side records bypass browser local suppression so localStorage cannot hide actionable rework.
   - Add a dedicated Rework panel or separate source option (`Weaver rework`) if the filter becomes frequent enough to deserve its own workspace.
   - Keep the normal queue clean: rework records should be visible through the Rework workflow, not mixed into ordinary new-work queue loading unless explicitly requested.
   - Show the previous graphic for each rework item by pulling `assetUrl` / `assetPreviewUrl` from Weaver handoff or legacy rework payload.
   - Display the previous graphic as a compact preview near the text/source controls.
   - Add previous-graphic actions: `Open in Drive`, `Copy asset URL`, and optionally `Use as reference`.
   - Show Weaver rework notes in a dedicated visible `Rework Notes` box.
   - Include metadata issue, aesthetic issue, QC note, reject reason, requested changes, and any Weaver production notes instead of burying them in generic notes.
   - Make rework actions explicit: `Load rework`, `Mark fixed and send`, and `Keep for another pass`.
   - Preserve the original Weaver request identity when a rework graphic is sent back, instead of treating it as a fresh graphic.
   - Track version identity with fields such as `originalGraphicsRequestId`, `revisionOf`, and `version`, so Weaver and P.I.G. can distinguish correction/revision graphics from fresh alternates.
   - Rework visibility should be controlled by Weaver status and handoff data; browser localStorage may support UX but must not be the source of truth for hiding server-side rework items.

3. Tabled graphics workflow
   - Current status: P.I.G. can locally table Weaver requests and show them through a `TABLED` source option so they are out of the normal work queue.
   - Add resolution actions later, such as return to queue, mark not suitable, request metadata/content review, merge with duplicate, or send back to Weaver with a tabled reason.
   - Move tabled state into Weaver/handoff ledger once the workflow is stable so tabled visibility is shared across browsers and machines.

4. Background export reliability
   - Keep all export paths flattening the fully visible canvas into an opaque PNG.
   - Guard against transparent/missing generated-background layers in Drive uploads and downloads.
   - Current status: the main export paths use a flattened export canvas; keep this protected as the export pipeline evolves.

5. Image generation workflow upgrade
   - Maintain the model selector with dated and fallback image models such as `gpt-image-2-2026-04-21`, `gpt-image-2`, `gpt-image-1.5`, and `gpt-image-1`.
   - Persist the chosen model between sessions.
   - Make model failures clear and preserve the current graphic if generation fails.

6. Template Studio font integration and fallback truth
   - Sequence this after the stability/rework sprint.
   - Current status (July 17, 2026): body, title, author, and book selectors come from one role-filtered registry and display only fonts verified in the current browser. Export does not silently substitute an unavailable font.
   - Bundle verified licensed fonts with P.I.G. so production export does not depend on Google Fonts or device-installed fonts.
     - Inventory actual binaries and record provenance, license, allowed web use, family, weight, and style.
     - Start with a small core of open-licensed editorial serif, sans serif, display, mono, and handwriting families.
     - Retain each license file in the repository and document attribution requirements.
     - Convert approved sources to WOFF2 where needed and load them through local `@font-face` declarations.
     - Generate the canonical registry from bundled files; never expose wishlist-only or unverified families.
     - Verify every family/weight/style in canvas and PNG export with external network access disabled.
   - Replace independently maintained font menus with one shared P.I.G. font registry and one reusable font-selector component. Body, title, author, book, Template Studio, and future text roles should all consume that registry, with per-instance role/category/availability filters rather than duplicated option lists.
   - Preserve one canonical family plus weight/style metadata. Treat entries such as `Bookmania Bold Italic` and `Proxima Nova Semibold` as variants of their families rather than unrelated font families where the supplied files support that mapping.
   - Preserve this integration priority order:
     - Book-specific/embedded: Bookmania; Canto; Charis SIL; Close; Desire Pro; DunbarTall; KBREINDEERGAMES; KidsBook; KidsScrawl; Marcellus; Proxima Nova; Satisfy; Utopia Std.
     - Explicit EPUB design fonts: Bookmania Bold; Bookmania Bold Italic; Bookmania Light; Bookmania Regular; Bookmania Regular Italic; Bookmania Semibold; Canto Regular; Canto Roman; DunbarTall-Medium; DunbarTall-Regular; Fenix Regular; FreightText Pro; Gotham; Gotham (T1) Bold; Gotham (T1) Book; Gotham (T1) MediumItalic; Life-Roman; Minion Pro; MinionPro-Regular; PF Videotext Regular; Proxima Nova Bold; Proxima Nova Medium; Proxima Nova Semibold; Proxima Nova Condensed Medium; Proxima Nova Cn Rg; Proxima Nova (OTF) Bold; Proxima Nova (OTF) Medium; Proxima Nova (TT) Bold; Proxima Nova (TT) Medium; Proxima Nova (TT) Regular; Proxima Nova (TT) Semibold; Raleway Light; Raleway Light Italic; Raleway Medium; Trade Gothic Next LT Pro; Utopia; Utopia Std; Utopia Std Italic; Utopia Std Regular; Utopia Std Semi.
     - Generic/system: Arial; Calibri; Cambria; Courier New; Garamond; Georgia; Gill Sans; Gill Sans MT; Helvetica Neue; Liberation Serif; Times; Times New Roman; Times Roman; Verdana; Wingdings.
     - DOCX-only review/noise: Andale Mono; Arial Unicode MS; Bodoni SvtyTwo OS ITC TT-Bold; Bodoni SvtyTwo OS ITC TT-Book; Bodoni SvtyTwo OS ITC TT-BookIt; Droid Serif; Symbol.
   - Inventory the actual font files and licenses before exposing a font as available. EPUB embedding rights do not automatically grant permission to redistribute a font as a P.I.G. webfont. Keep missing, unlicensed, symbol-only, and Office-theme fonts unavailable or in a clearly labeled diagnostic group.
   - Until that inventory is complete, treat every listed non-system font as a candidate, not an integrated webfont. Fonts without a verified file plus usable web/redistribution rights remain roadmap-only. Treat Wingdings, Symbol, and likely Office-theme/DOCX noise as diagnostic-only unless a specific production use is approved.
   - Split fonts into clearly reliable, locally available, dynamically loaded, and system-fallback groups.
   - Stop silent fallback to Georgia or any other unintended default; show an explicit warning when a selected font cannot render.
   - Persist canonical font id, family, weight, style, source, availability, and fallback policy in editable project JSON so rework and durable reopen restore the intended typography exactly.
   - Load and verify every selected role font before canvas rendering/export. A failed font must block or clearly warn on export rather than silently changing the graphic.
   - Add a font availability check to Template Studio previews so template designers can see whether a template depends on fonts P.I.G. can actually load.
   - Expand the supported font set intentionally, with each added font tested in the browser and in exported PNG output.
   - Continue tuning templates against the real QI library and Canva references.
   - Bring quote marks back only after a better graphics pass: replace the current decorative quote-mark controls with stronger, template-aware quote assets and safer layout rules.

7. History/snapshot robustness
   - Snapshots should preserve generated backgrounds, imported photos, settings, text, source metadata, handoff/export state, and model choice.
   - Avoid losing a strong graphic after randomizing, loading another text, or switching sources.
   - Treat snapshots as the local first version of permanent editable P.I.G. project records, not just temporary browser history.
   - Keep editable project records separate from exported PNGs: store structured design state, source identity, template settings, layout, colors, background references, attribution settings, social data, handoff ids, and export asset refs.
   - Add durable editable QI/project storage after the local schema stabilizes. Preferred shape: a small project API backed by Firestore or Drive/Cloud Storage JSON records, with Drive/Cloud Storage file ids stored as references rather than embedded image blobs.
   - Rework should eventually reopen the exact editable project record that produced the rejected graphic instead of reconstructing from thumbnails or exported images.
   - Add clear project identity fields such as `pigProjectId`, `qiId`, `graphicsRequestId`, `revisionOf`, `version`, and `assetRefs` so P.I.G., Weaver, and history can distinguish a new graphic, a revision, and a second intentional variant.
   - Keep resource use low by storing state JSON and asset references; do not store repeated base64 canvases or duplicate high-res PNGs inside project records.

8. Panel/workflow polish
   - Keep the left rail ordered by workflow: source/template, text, background, layout/type, metadata, export/QC, history/resources.
   - Continue reducing panel scroll traps and oversized sections.
   - Add a production lock system for carrying selected settings across a future graphic or batch without making them permanent template defaults.
   - Start with lockable colors, then consider locks for font, template, background treatment, logo/website attribution, text box placement, and metadata styling.
   - Make active locks visible and easy to clear so users do not accidentally keep stale styling across unrelated graphics.

9. Import-photo/background library
   - Let imported photos/backgrounds be used immediately.
   - Let useful backgrounds be saved as reusable resources/templates.
   - Add better naming, previewing, and resource management over time.

10. Template Studio scope and versioned template boundary
   - Keep Template Studio focused on reusable template design, not production queue/workflow behavior.
   - Template Studio owns template families and variants, default canvas ratio, starting positions, default typography, default colors, background/texture defaults, attribution/logo defaults, preview fixtures, and safe-layout checks.
   - Normal P.I.G. owns queue/rework/tabled records, one-off graphic edits, social handles, Drive export/upload, Weaver handoff, history/rework recovery, and batch production workflow.
   - Separate template definitions, template-specific assets, attribution recipes, safe-layout rules, font declarations, and preview fixtures from the broader P.I.G. application code.
   - Define a stable, versioned template contract so P.I.G. can load a template bundle without template work touching source, export, Weaver, Drive, or QC behavior.
   - Evaluate whether the template bundle should live in its own repository or as an independently versioned package first. Prefer a separate repository if template iteration will have its own history, releases, and collaborators.
   - Build a lightweight template preview/studio workflow with representative quote fixtures and export checks.
   - Add safer template defaults so initial title, excerpt, author/book, website, and logo placement does not overlap.
   - Require each template to start with at least one Button Poetry attribution element enabled; default attribution should include `www.buttonpoetry.com`.
   - Allow template-level attribution choices such as website only, button logo only, full Button Poetry logo, website plus button logo, and website plus full logo.
   - Let the main P.I.G. app pin a known-good template-bundle version and deliberately update it when new templates are ready.

11. Codex Drive cloud migration
   - Current status: the shared Codex Drive root exists and P.I.G. durable editable project files have been moved into `PIG/Editable Projects`.
   - Current status: deployed P.I.G. writes new durable editable project JSON into `PIG/Editable Projects`.
   - Use a product/tool-centered Drive structure rather than mirroring the local Mac filesystem.
   - Keep the cloud source of truth organized around P.I.G., Weaver, Poetry Please, Template Studio, QI/source libraries, and shared docs.
   - Keep a `Local Machine Archive` area only for unsorted legacy snapshots or materials that need local-path context.
   - Maintain the full migration map in `CLOUD_MIGRATION_MAP.md`.
   - Next safe migrations: create the standard Drive folder structure, copy P.I.G. roadmap/decision docs into `PIG/Roadmap + Decisions`, and move obvious excerpt database Drive items into `QI + Source Libraries/Excerpt Database`.
   - Review before migrating large ebook extraction folders, credentials, generated image exports, and anything whose product ownership is ambiguous.
   - Before continuing migration, answer and record these confirmation questions:
     - What is canonical for each category: P.I.G. editable project JSON, app code, template assets, QI/excerpt data, social handle data, and final PNG exports?
     - What should happen to local P.I.G. runtime DB files: archive only, operational source, skip, or replace with a managed cloud source?
     - What are the local ebook/text extraction folders: raw source, generated extraction output, scratch, historical archive, or active QI input?
     - Which secrets/credentials are explicitly excluded from Drive, and where should docs point instead?
     - Should Template Studio remain under `PIG/Templates` for now or become its own active top-level product folder?
     - What is the retention policy for final PNG exports and old duplicate editable project JSON files?
     - What naming conventions should govern editable projects, exported PNGs, template bundles, QI source files, migration archives, and dated local snapshots?
   - Add a migration review inventory before uploading large/ambiguous local folders, with columns for local path, size, file count, proposed Drive destination, source-of-truth status, and action: migrate now, archive, skip, or needs review.

12. Full Poems source lanes
   - Current scope: add `FP: All` as a text-backed, read/select-first P.I.G. source loaded from `data/full-poems-all.json`.
   - Add `FP: Highly Ranked` as a Poetry Please score-prioritized sub-lane over the same local FP catalog.
   - Repair paused `FP: Highly Ranked` search before continuing ranked-lane work: live ranked filters populate from Poetry Please scores, but live ranked search returned zero results during validation.
   - Poetry Please is the review/ranking source of truth; P.I.G. should consume Poetry Please scores as an overlay to prioritize full poems for graphics generation.
   - Do not mutate the local FP export when applying Poetry Please scores.
   - Export catalog poem sources as `FPI`, not `QI`, in generated Drive filenames and upload metadata. This applies to catalog short poems, `FP: All`, and the paused `FP: Highly Ranked` source.
   - Make FPI and QI lifecycle handling equivalent. Today QI is usually governed by Weaver handoff status, while FPI catalog records use local P.I.G. suppression after send. Replace this with a shared source-of-truth path so both image types have the same completion, queue removal, repeat/second-graphic, rework, and audit behavior.
   - Validate required FP fields before serving the lane: `contentId`, `imageId`, `imageType`, `bookShortener`, `author`, `book`, `title`, `excerpt`, and `releaseCatalog`.
   - Preserve poem line breaks from `excerpt` exactly when loading FP records.
   - Support author/title search plus catalog and book filters.
   - Do not include `data/full-poems-all-review-needed.json` rows in the normal FP lane.
   - Future lane: define `FPI` separately for image-backed full poem photos, scans, and screenshots because those need OCR/manual review instead of normal text search.
   - Proposed FPI fields: `contentId`, `imageId`, `imageType: FPI`, `bookShortener`, `author`, `book`, `title`, `imageUrl`, `driveLink`, `releaseCatalog`, `bookLink`, `pageNumber`, `ocrText`, and `reviewStatus`.

13. Multi-page poem graphics
   - Add an explicit multi-page export/send mode for full poems or long excerpts instead of silently shrinking text until it fits one canvas.
   - Preserve source line breaks while paginating.
   - Use the active template as the page style, but render page-specific text chunks into numbered outputs.
   - Suggested naming: existing base filename plus `- 01`, `- 02`, etc., with image type preserved as `FPI`.
   - Show a page count preview before export/send so the user can confirm the set.
   - Send multi-page sets to Weaver as one grouped production item with per-page assets and shared source metadata.
- Gather empirical line-count and fit data from Button books to replace the initial 25-line split with a stronger page-fit heuristic. Track real book page examples by trim/template, font size, line height, title/author spacing, and safe text area.
- Deployment path confirmed July 17, 2026: load the existing project `.env`, then use `deploy-cloud-run.sh`, which deploys through `pig-drive-uploader@poetry-image-generator.iam.gserviceaccount.com` impersonation.

14. Printed book template refinement
   - Add per-element font controls for printed book templates: title, author, poem body, book title, and logo/attribution.
   - Preserve the default visual hierarchy: title/author use a clean sans-serif; poem body uses a bookish serif.
   - Add more flexible author placement controls while keeping the canonical default below the poem title.
   - Keep author text visually shorter than the poem title by default, with automatic size reduction when needed.
   - Continue tuning logo placement per printed-book background so it sits naturally in the page corner across right-page, left-page, wood, and transparent variants.

15. Weaver/FPI lifecycle and rework contract
   - Upgrade Weaver and P.I.G. so FPI graphics move through the same durable lifecycle as QI graphics.
   - Weaver should treat `imageType` as a first-class row/request field and preserve it through request, completion, QC, approval, rejection, rework, and revision.
   - A rejected FPI must appear in `GET /graphics-handoff/queue?filter=rework` with `imageType: "FPI"`, `queueView: "rework"`, `isActionable: true`, `statusLabel`, `nextAction`, and all rework note fields.
   - Preserve identity fields across FPI rework:
     - `graphicsRequestId`
     - `originalGraphicsRequestId`
     - `revisionOf`
     - `version`
     - `pigProjectId`
     - `sourceRecordId`
     - `contentId`
     - `imageId`
   - Preserve asset fields across FPI rework:
     - `assetUrl`
     - `assetPreviewUrl`
     - `assetFileId`
     - `previousAssetUrl`
     - `previousAssetPreviewUrl`
   - Preserve source fields needed for P.I.G. reload:
     - `poemTitle` / `title`
     - `author`
     - `bookTitle`
     - `quoteText` / `excerpt`
     - `releaseCatalog`
     - `bookShortener`
   - Preserve rework/QC fields:
     - `reworkReason`
     - `rejectReason`
     - `rejectedReason`
     - `metadataIssue`
     - `aestheticIssue`
     - `qcNote`
     - `requestedChanges`
     - `notes`
   - P.I.G. should not need separate FPI local suppression or special rework handling once Weaver owns FPI lifecycle state.
   - Acceptance test:
     - Create/send an FPI from P.I.G.
     - Reject it in Weaver.
     - Confirm it appears in P.I.G. Rework with `imageType: "FPI"`, correct notes, correct prior asset, and durable identity.
     - Resend from P.I.G. and confirm Weaver links the revision to the rejected FPI instead of creating an unrelated completion.

## Current Sprint Recommendation

The controlled QI/FPI rework contract and live Drive upload/error paths are now verified. Next, inventory actual font files and redistribution rights, then extend the canonical registry with verified family/weight/style variants. After that, exercise one genuine operator-created QI and FPI revision through the UI to complement the repeatable synthetic contract test.
