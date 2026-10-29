# P.I.G. Roadmap

## Active Stability Sprint

- Multi-card graphics: ordered draft editing, numbered ZIP export, grouped Drive send, and one Weaver QC item for the set are implemented. The private three-card repair round trip passed. Prioritize a staff-made multi-page FPI next, then verify a DBAT prompt pair and long QI through QC and rework before broader staff rollout. See item 13.
- Template-design priority: Studio now supports named Editorial and Printed Book variants from approved layouts. Verify one staff-created variant from save through P.I.G. export. Two active Fall 2026 variants were saved through P.I.G.; separately verify one completed graphic's Weaver handoff, P.I.G. reopen, and export; see item 15.
- Source pulldown cleanup is a priority: give Poetry Please repair requests their own clearly labeled lane, then audit the source and filter pulldowns for duplicate or confusing choices. Keep distinct queue ownership and repair workflows intact while consolidating labels and entry points.
- P.I.G. production configuration: the approved deployment path is `./deploy-cloud-run.sh`. Its checked-in defaults now include the production Drive folder ID and name so an unset local variable cannot blank them. Before the next deployment, verify that destination and the live Drive configuration. Keep secrets outside Git and preserve existing Cloud Run secrets.
- Next configuration guardrails: stop the approved deploy script before production changes if a required value is blank; show an explicit administrator error when server-side upload is unavailable; add a focused post-deploy check for the expected folder and server-side upload path. Do not request new authentication scopes or change deployment methods.
- Later cross-project idea: after P.I.G.'s configuration contract is verified, consider the same fail-closed pattern for Weaver, Poetry Please, and other major projects in their own roadmaps.
- Book Specific QI checkpoint: the shared Drive registry, canonical `BOOKSHORTENER-YYYY` assignment, saved visual state, authenticated create/update/archive, and image limits are committed. Saved variants are now listed by book in P.I.G.'s Book Specific QI picker. See `PIG_HANDOFF_2026-09-28.md` for the earlier synthetic test.
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
   - Audit suspected duplicate Weaver rows using normalized excerpt identity and affected queue-row IDs. Keep Weaver's `isActionable` and `queueView` authoritative; resolve confirmed duplicates upstream instead of silently hiding ledger-owned work in P.I.G.
   - Keep duplicate filtering distinct from intentional multi-variant graphics: duplicate source rows should be flagged or suppressed, while deliberate second graphics should remain available through their graphic-variant identities.
   - Add a review path for optionally closing or removing confirmed duplicate rows upstream in Weaver rather than silently masking the source-data issue forever.
   - Event metadata: P.I.G. accepts and preserves optional `sourceEvent` / `sourceEventLabel` as secondary context for future campaign grouping, batch generation, output routing, and reporting. These fields must not replace author, poem title, book, excerpt, or Weaver queue identity.

2. Weaver rework workflow
   - Live contract audit (July 20, 2026): the first 50 production rework records exposed by Weaver contained no `pigProjectId`, `editableProjectFileId`, `editableProjectUrl`, version, or populated QC notes. P.I.G. cannot restore exact prior designs for those records without guessing. Weaver must preserve the original completion's durable project identity and QC payload when creating the rework view.
   - P.I.G. now labels each row truthfully as `Load editable rework` when durable identity exists or `Load text only` when Weaver did not provide it.
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
   - Trial Cormorant Garamond, EB Garamond, and Fraunces quote glyphs in P.I.G. with marks off by default. After staff selects preferred designs, let Studio save the mark style, size, position, color, and on/off state as a versioned default for each template, with safe placement rules.

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
   - Current status: Book Specific QI variants use a shared Drive-backed registry with authenticated Button Poetry create/update/archive controls. Each active variant stores its background and complete visual control state, is assigned by canonical `BOOKSHORTENER-RELEASEYEAR` book key, and is listed by book in the P.I.G. picker, with matches for the current record first.
   - Current guardrails: background assets are limited to 12 MB and 6000 x 6000 pixels; saved template state excludes poem content and queue/workflow controls; archived variants remain in the registry but are hidden from production selectors.
   - Next: add registry version history/rollback and a small admin view for archived variants if actual use shows those are needed.

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

13. Multi-card graphics (active build)
   - Use one editable P.I.G. project for an ordered set of cards. Keep a shared source identity, template family, canvas ratio, and Weaver request identity, with per-card text, role, and eventually layout overrides. Existing single-card projects continue to work.
   - First three workflows: (a) multi-page FPI/full poem, (b) DBAT prompt pairs with QI, FP, or FPI content followed by a prompt card, especially for Instagram, and (c) a full poem or long section presented as QI across multiple cards. Do not relabel a QI as FPI merely because it spans cards; preserve the source's image type.
   - Next staff-facing slice — multi-page FPI: make the existing card-set action easy to find when an FPI is loaded; let staff split a full poem at chosen stanza or line breaks, check reading order and text fit on every card, and use a consistent first/middle/final design with intentional title, author, and branding placement. Save and reopen one editable set, then send it as one FPI through Weaver QC and Poetry Please. Test with a real approved FPI before calling this workflow ready for staff.
   - Implemented: P.I.G. can add, reorder, switch, and edit poem/prompt cards, split poem text at a chosen line break, preview each card, save the ordered draft in an editable project, and download a numbered draft PNG ZIP. FPI cards can select left/right printed-book page backgrounds, new FPI poem cards default to a `(cont.)` title, and staff can gather poem text back onto card 1 or remove a card without losing its text. The grouped send uploads numbered PNGs, preserves one editable project, and sends one completion with an ordered asset set; Weaver QC displays each card. A draft ZIP does not mark the Weaver request complete. If a card upload fails, the request remains actionable.
   - Composition: retain source line breaks and stanza boundaries; let staff choose card breaks manually. Later suggest breaks based on measured rendered fit, with no silent shrinking below a readable minimum. Show overflow and missing-text warnings, and require review of each card before export.
   - Template system: FPI printed-book cards can choose page backgrounds independently, and the code records text typography and positions per card. One October 28 editable JSON contains two cards with different font sizes and text positions; two PNG files with matching names are in the same Drive folder. This does not establish who made the project, whether those settings survived reopening, or whether the PNGs reflect them. Verify a durable reopen and both rendered cards before calling the round trip complete. Broader per-card template overrides remain future work. Studio should eventually save reusable first/middle/final and content/prompt defaults; DBAT prompt cards need a distinct prompt treatment. Keep branding and attribution deliberate across the set.
   - Output: show card count and order before export; make numbered PNGs using one base filename plus `- 01`, `- 02`, etc. Offer a grouped download, then a grouped Drive send. The upload should be atomic from the staff perspective: either all cards are linked to one set or the record remains actionable.
   - Weaver contract: one production item/QC review for the set, with ordered per-card asset IDs/URLs, shared source and editable-project ID, and set-level status. Rework reopens the editable set. P.I.G. opens an identified affected card and reuses unchanged card assets when sending its replacement; the private three-card round trip through Weaver and Poetry Please passed October 27, 2026. Do not mark a request exported or suppress it after only one card.
   - Validation: test an FPI with stanza-aware breaks, a DBAT QI/FP/FPI plus prompt pair, and a long QI. Reopen the editable set, export each card in order, send through Weaver and Poetry Please, reject and revise one card, then confirm queue status and IDs remain linked. Keep a synthetic three-card round trip as the release check.
   - Fit research: gather real Button book examples by trim/template, font size, line height, title/author spacing, and safe text area before choosing an automatic split heuristic.

14. Printed book template refinement
   - Shipped October 22, 2026: Studio's poem and combined author/book Y positions can move above their Printed Book defaults. Recheck with a staff saved variant if the placement issue recurs.
   - Add per-element font controls for printed book templates: title, author, poem body, book title, and logo/attribution.
   - Preserve the default visual hierarchy: title/author use a clean sans-serif; poem body uses a bookish serif.
   - Add more flexible author placement controls while keeping the canonical default below the poem title.
   - Keep author text visually shorter than the poem title by default, with automatic size reduction when needed.
   - Continue tuning logo placement per printed-book background so it sits naturally in the page corner across right-page, left-page, wood, and transparent variants.

15. Staff-designed templates for the next contest or Spring 2027 books
   - Shipped October 22, 2026: Studio's saved Book Specific picker has an all-books path, so staff can change families or choose another book without reloading.
   - Shipped October 22, 2026: Editorial → Framed honors Studio's quote-position controls, centers the quote in its circle, and omits the off-center dots. Its corrected shared layout is version 2.
   - Expose poem line spacing in Studio preview and saved template defaults. P.I.G. already measures line spacing as a multiplier of font size; let staff set that multiplier or keep the starter default, then confirm it survives save, reload, and export.
   - Goal: every book and every contest can have its own named, reusable template without requiring a code change for each design.
   - Use Template Studio as the design workspace for future programs. It can edit built-in defaults and save shared book variants with an uploaded base graphic, movable cover, crop, and resolution check. Extend that workflow to general and contest variants, with preview fixtures and safe layout checks.
   - Define the Studio-to-P.I.G. contract: Studio publishes versioned templates scoped globally, to a canonical book, or to a contest ID; P.I.G. offers the approved version in the appropriate menu and records that version on each finished graphic. Keep the Fall 2026 production upload path in P.I.G. separate from this work.
   - Define allowed controls per starter so staff can create variants without accidentally changing essential layout or attribution.
   - Keep book templates assigned to their canonical book identity and contest templates assigned to their contest identity. Label every saved variant with its assignment in the production picker; preserve the original starter and support updating or archiving the variant.
   - Shipped October 23, 2026: Studio can create a named Editorial or Printed Book variant from an approved built-in layout, then update, archive, or restore a prior version without changing the starter. P.I.G. lists active variants in the matching Family → Variant menu. These variants save supported layout and branding values; separate uploaded backgrounds remain in the Book Specific workflow.
   - After that workflow is proven, let authorized staff create a **new template family** when no existing family fits. Define its allowed elements, canvas sizes, attribution requirements, and starter variants before publishing it to P.I.G.
   - Current Studio capability: edit and revert built-in layout defaults; create/update/archive/revert named Editorial and Printed Book variants; create/update shared book variants from approved starters, including Book Specific QI. Uploaded Book Specific backgrounds appear in Studio's preview. Fall Short Form Contest variants are created in P.I.G., outside Studio. Creating new template families and uploading separate assets for general named variants remain future work.
   - Later, as the book library grows, let Book Specific QI use a Family per canonical book and Variants within that book. Default to the loaded book, shorten labels when its assignment is already clear, and keep an all-books path when book metadata is incomplete.
   - Shipped October 19, 2026: P.I.G. has an explicit PNG/JPEG base-graphic upload and shared save control for the Fall 2026 Short Form Contest program `button-poetry-s-fall-2026-short-form-contest-da82891d`. Saved variants use the existing Button Poetry editor authorization and shared Drive storage. Applying one keeps poem text editable above its base graphic; the six built-in Short Form layouts remain available.
   - Verification remaining: two active staff-saved Fall variants appear in P.I.G.'s shared registry. Confirm a completed graphic's Weaver handoff, P.I.G. reopen/export, and unchanged Weaver request and Poetry Please submission IDs. An active-queue search alone cannot establish completed-graphic status.
   - Weaver's current public queue omits `programId` even though Poetry Please sends it. P.I.G. temporarily recognizes the verified Fall program through an exact match on Weaver's contest source, contest label, and `releaseCatalog`. Have Weaver expose the original `programId` in its queue contract; then remove this narrow fallback. Do not use book keys as contest identity.
   - After general variant creation, add broader platform ratio guidance, safe layout checks, and a draft/publish review step. P.I.G.'s Fall-specific update/archive controls remain a separate maintenance item.

16. Weaver/FPI lifecycle and rework contract
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

Verify the October 28 FPI project's distinct card styles after durable reopen and render; project authorship and PNG contents are unverified. Verify a staff-created named Studio variant from save through P.I.G. export, including update and restore. Separately, trace one staff-made Fall graphic through Weaver and P.I.G. reopen/export. Check Book Specific quote marks on a real QI when that work returns; font inventory and broader FPI lifecycle changes remain later items.
