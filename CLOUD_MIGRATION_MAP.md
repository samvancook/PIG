# Codex Drive Migration Map

Root Drive folder: `Codex` (`0ABJ8d01E4tn7Uk9PVA`)

## 2026-07-10 Status

- P.I.G. local repo: `/Users/buttonpublishingone/Desktop/CODEX/Social Media Dev/poem-image-generator`
- P.I.G. GitHub remote: `https://github.com/samvancook/PIG.git`
- Current local branch: `main`
- Current live P.I.G. URL: `https://pig-896298340620.us-central1.run.app`
- The Drive migration script is blocked by `gcloud` Drive scope limits. The connected Google Drive tool can upload new migration refresh files, but cannot overwrite older files unless the Drive app has write access to each target file.
- Verified 2026-07-14: the connected Google Drive tool can update files it created itself. For now, connector-created Drive copies are the editable cloud copies; older migrated files should be treated as snapshots unless/until a service-account or impersonation Drive API path is documented.
- Code source of truth should move through GitHub after reviewing and committing the dirty local worktree. Drive should hold docs, assets, editable project JSON, exports, and product coordination materials.

## Migration Goal

Move Codex work from a local-machine-shaped workspace into a product/tool-centered cloud workspace. The Drive should become a durable coordination layer for active products, not a full mirror of the Mac filesystem.

## Recommended Top-Level Structure

```text
Codex/ (0ABJ8d01E4tn7Uk9PVA)
  00_Admin/ (1JfcMqUhbe-OqKd4JDgXOx5VVoPzBtedz)
  01_Shared_Docs/ (17p0wGKuFQqaWAjfb8MjSV0is6tYZsXqA)
  PIG/ (1I9PaWFBYvVjVsEOSEc5bCm0W4UI5XUYE)
  Weaver/ (1AsSOfPQbvARKDpJFSEGC3rcVs9FbB3ER)
  Poetry Please/ (1n7HW4jnjNHeP5cEuwcPoYX5o3uE0sGjS)
  Template Studio/ (1dEERpZ-kO6jX0rmwXF4CBAH_yZxNDgd-)
  QI + Source Libraries/ (1FYL9jwqnUHt1rnI2dTeOjDXC_46ep4NL)
  Social Media + Handles/ (1u4IaA-ex16EdW3kxnSOuYlrutBsHI6lJ)
  Local Machine Archive/ (1-dJoEh9ZrNGa_Z1Bi9WyyKebFY691ax5)
```

## Product Folder Pattern

Use this pattern for P.I.G., Weaver, Poetry Please, and future product folders:

```text
Product/
  Roadmap + Decisions/
  Specs + Contracts/
  Active Work/
  Assets/
  Exports/
  Test Assets/
  Deployment Notes/
  Scratch/
```

P.I.G. has a slightly more specific version:

```text
PIG/ (1I9PaWFBYvVjVsEOSEc5bCm0W4UI5XUYE)
  Roadmap + Decisions/ (1dtmwt3HmpKtwxD5WKOUo-iFUNwp9W5Wv)
  Specs + Contracts/ (1WhbVgMhKxeX-UymT7wJZbA8aBQ-ImtHW)
  Editable Projects/ (1feZWKlY26jQi9Vzz9CNEm48J2Fpygtrz)
  Templates/ (1BTKiQlOm7bRh6PV8DSCh0ELvh4SIghpy)
  Exports/ (1C-oC9jLETvDLxtnScQxWmMTwBi-KWWNP)
  Test Assets/ (10fPT-zD28QXtHVLLE7I0NzSqT05eEdhy)
  Deployment Notes/ (1emnTDZfUppC-a47gMG9ugM-VENOihhup)
  Scratch/ (1Zaphe_RN0-BaAK55iKMbvNRc6TKBAXl-)
```

Additional created folders:

```text
PIG/Templates/
  Reusable Assets/ (1_h5O0FDva3Bs2ZbmsXYHhApey-SI2Eqj)
  Template Studio Source/ (1VuCzlnzwhZTQR3RTNPz4SHJ-ZhJy4f2Q)

QI + Source Libraries/
  Excerpt Database/ (1acFk5_ij0XyA1Jo5Y8ZMIMlSVjHM62dB)
  Metadata/ (1O95t4q1zVg4gncTInkZpnzSj5Kk6PFLR)
```

## Migration Rules

- Product/tool folders are the cloud source of truth.
- `Local Machine Archive/` is for unsorted snapshots or legacy material that should not become an operating structure.
- Do not mirror the whole local filesystem into Drive.
- Move only clearly classifiable Drive items automatically.
- Copy local documentation into Drive; keep local repo docs as canonical source until a repo/cloud-doc workflow is chosen.
- P.I.G. durable editable project JSON belongs in `PIG/Editable Projects`.
- QI/excerpt database materials belong in `QI + Source Libraries/Excerpt Database`.

## Completed

- Created `PIG/`.
- Created `PIG/Editable Projects/`.
- Moved existing P.I.G. editable project JSON files from the Codex root into `PIG/Editable Projects/`.
- Updated deployed P.I.G. config so new editable snapshots save to `PIG/Editable Projects/`.
- Created the recommended product/tool-centered top-level Drive folders.
- Created the standard P.I.G. subfolders.
- Copied current P.I.G. planning docs into `PIG/Roadmap + Decisions/`.
- Created `QI + Source Libraries/Excerpt Database/` (`1acFk5_ij0XyA1Jo5Y8ZMIMlSVjHM62dB`).
- Moved `Excerpt Database System` and `Excerpt Database - DB Workflow Export` into `QI + Source Libraries/Excerpt Database/`.
- Uploaded additional P.I.G. docs into `PIG/Roadmap + Decisions/`: `NAMING_CONVENTIONS.md`, `BACKGROUND_GENERATION_PRIMER.md`, and `README.md`.
- Uploaded Template Studio source files into `PIG/Templates/Template Studio Source/`: `template-studio.html` and `template-studio.js`.
- Uploaded local reusable P.I.G. assets into `PIG/Templates/Reusable Assets/`: quote-mark SVGs and Button/semicolon logo assets.
- Uploaded small QI metadata JSON files into `QI + Source Libraries/Metadata/`: `book_author_map.json` and `full-poems-120-or-less-v74.json`.

## Safe Next Migrations

- Decide whether Template Studio should remain under `PIG/Templates` or move toward its own product workspace.
- Add similar subfolder structures to Weaver and Poetry Please when their current docs/assets are ready to file.
- Create a retention/cleanup policy for duplicate editable project JSON files.
- Decide whether local P.I.G. runtime DB files should be archived, ignored, or replaced by a managed cloud source.

## Confirm Before Continuing

Answer these before moving large or ambiguous local folders:

- What is canonical for each category?
  - P.I.G. editable project JSON
  - P.I.G. app code
  - template assets and template bundles
  - QI/excerpt data
  - social handle data
  - final PNG exports
- What should happen to local P.I.G. runtime DB files?
  - archive only
  - operational source
  - skip
  - replace with a managed cloud source
- What are the ebook/text extraction folders?
  - raw source
  - generated extraction output
  - scratch
  - historical archive
  - active QI input
- Which secrets/credentials are excluded from Drive, and where should docs point instead?
- Should Template Studio remain under `PIG/Templates` for now or become its own active top-level product folder?
- What is the retention policy for final PNG exports and old duplicate editable project JSON files?
- What naming conventions should govern editable projects, exported PNGs, template bundles, QI source files, migration archives, and dated local snapshots?

Use this inventory format before uploading large/ambiguous folders:

```text
Local path | Size | File count | Proposed Drive destination | Source-of-truth status | Action
```

Allowed actions:

```text
migrate now | archive | skip | needs review
```

## Needs Review Before Moving

- Large local ebook/text extraction folders.
- Generated images and exports not clearly tied to P.I.G. durable project records.
- Credentials, service-account files, and deployment secrets.
- Any historical files where preserving local path context matters.

## Open Decisions

- Whether Template Studio eventually becomes a separate repo/project folder or remains inside `PIG/Templates`.
- Whether durable editable project JSON should remain Drive-only or move later to Firestore/Cloud Storage.
- Retention policy for old duplicate project JSON files.
- Naming conventions for exported PNGs, editable project records, template bundles, and Weaver completion assets.
