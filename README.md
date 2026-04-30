# Poem Image Generator MVP

This is a local web app for generating two-layer poem images from your existing excerpt resources.

## What it does

- Preserves the poem text exactly as entered
- Searches local sources:
  - excerpt library runtime DB
  - Weaver approved / QI-ready excerpts
  - curated short-poems catalog export
- Lets you change font, weight, size, line height, alignment, and inset
- Supports two layout modes:
  - preserve line breaks with wrap
  - paragraph flow
- Generates simple backgrounds:
  - solid
  - gradient
  - stripes
  - dots
- Can generate AI backgrounds through OpenAI while keeping the text layer deterministic
- Exports the result as a PNG

## Run it

Start the local app server from the `poem-image-generator` folder.

You can provide your OpenAI key in either of these ways:

```bash
export OPENAI_API_KEY=your_key_here
```

or create `poem-image-generator/.env` with:

```bash
OPENAI_API_KEY=your_key_here
```

Then run:

```bash
python3 api_server.py
```

Then open `http://127.0.0.1:8123`.

## Optional Google Drive Upload

To use `Save to Drive and Send to Weaver`, add these environment variables before starting the server:

```bash
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_API_KEY=your_google_api_key
GOOGLE_APP_ID=your_google_project_number
```

The Drive flow uses browser-based Google sign-in plus a folder picker, uploads the current PNG to the selected Drive folder, then posts the resulting asset URLs to Weaver QC.

## Cloud Prep

P.I.G. is now prepared for container hosting without changing the local workflow.

- `api_server.py` will still default to `127.0.0.1:8123` locally
- if a hosting platform provides `PORT`, the server will listen on that port
- if `PORT` is present, the server will default to `0.0.0.0`
- a basic health check is available at `/api/health`
- environment-aware app config is available at `/api/app-config`
- a production-ready container file is included in [Dockerfile](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/Dockerfile)
- a first-pass Cloud Run deploy helper is included in [deploy-cloud-run.sh](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/deploy-cloud-run.sh)

You can build and run the container locally with:

```bash
docker build -t pig-app .
docker run --rm -p 8080:8080 --env-file .env pig-app
```

Then open `http://127.0.0.1:8080`.

Important note:
- the live Weaver graphics-request and completion flow is cloud-friendly now
- local excerpt DB/search sources still depend on files outside this folder unless you provide cloud-accessible replacements through these env vars:
  - `PIG_EXCERPT_RUNTIME_DB`
  - `PIG_QI_STATUS_DB`
  - `PIG_NORMALIZED_EXCERPT_DB`
  - `PIG_SHORT_POEMS_JSON`
  - `PIG_FORMAL_CATALOG_DB`
- in a hosted environment, the app now marks unavailable local-only sources as unavailable instead of pretending they exist

Example Cloud Run deploy:

```bash
cd poem-image-generator
chmod +x deploy-cloud-run.sh
PROJECT_ID=poetry-image-generator REGION=us-central1 SERVICE_NAME=pig ./deploy-cloud-run.sh
```

## Files

- [index.html](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/index.html)
- [styles.css](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/styles.css)
- [script.js](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/script.js)
- [api_server.py](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/api_server.py)

## Repository Notes

P.I.G. is now intended to live in its own Git repo from this folder. Secrets and local runtime artifacts are intentionally ignored:

- `.env` stays local and should never be committed.
- `data/*.db` files are runtime data bundles, not normal Git files. One local DB is larger than GitHub's standard per-file limit, so use Git LFS or move the data source to cloud storage before expecting a fresh clone to be fully self-contained.
- `data/book_author_map.json` and `data/full-poems-120-or-less-v74.json` are small enough to track as bundled app data.

## Best next upgrades

1. Add custom font upload support.
2. Add source-specific filters such as author, release catalog, and excerpt length.
3. Add saved prompt presets for different background styles.
4. Improve QI-library-driven template tuning.

## New Workflow Notes

- Background photos can now be imported directly into P.I.G.
- Imported or generated bitmap backgrounds can now be saved into a small reusable in-browser background library.
- The default hosted Drive flow now uploads through the Cloud Run service account when using the configured default Shared Drive folder.

Background options primer:
- [BACKGROUND_GENERATION_PRIMER.md](/Users/buttonpublishingone/Desktop/CODEX/Social%20Media%20Dev/poem-image-generator/BACKGROUND_GENERATION_PRIMER.md)

## Paused / Outstanding

These are the unresolved items we parked at the end of the April 21, 2026 session.

1. Re-check title color rendering in hosted P.I.G.
The title color picker and rendered output still do not feel fully trustworthy in all cases, especially when auto-contrast is active on mixed dark/light backgrounds.

2. Repair already-broken transparent PNGs in Drive.
New exports are now flattened correctly, but older broken files in the dev Drive folder still need either:
- exact re-export from a surviving project snapshot, or
- approximate repair by flattening transparency onto a chosen background.

3. Audit whether any broken Drive exports still have recoverable exact snapshots.
We confirmed which Drive files are broken, but did not find a clear surviving hosted snapshot for them yet. If the original browser/session still has those projects, some may still be exact-recoverable.

4. Decide on the repair approach for the currently broken Drive files.
Current broken set identified:
- `WAKEFIELD - SWTWOB - QUOTE IMAGE - MY POINT FOREVER ENDLESSLY`
- `BELLA - WTF - QUOTE IMAGE - WHALE X TEARDROP`
- `TRAN - AEO - QUOTE IMAGE - CONFUCIUS WAS NOT A FEMINIST`
- `whale x teardrop.png`

5. Keep `pig.buttonpoetry.com` as a deferred infrastructure item.
Hosted Cloud Run is working at the `run.app` URL, but the custom domain is still blocked by DNS/certificate routing issues and is intentionally paused for now.
