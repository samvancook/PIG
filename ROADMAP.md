# P.I.G. Roadmap

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

3. Background export reliability
   - Keep all export paths flattening the fully visible canvas into an opaque PNG.
   - Guard against transparent/missing generated-background layers in Drive uploads and downloads.
   - Current status: the main export paths use a flattened export canvas; keep this protected as the export pipeline evolves.

4. Image generation workflow upgrade
   - Maintain the model selector with dated and fallback image models such as `gpt-image-2-2026-04-21`, `gpt-image-2`, `gpt-image-1.5`, and `gpt-image-1`.
   - Persist the chosen model between sessions.
   - Make model failures clear and preserve the current graphic if generation fails.

5. Template/font truth pass
   - Split fonts into clearly reliable vs experimental/system fallback groups.
   - Make font fallback visible when a selected font fails to load.
   - Continue tuning templates against the real QI library and Canva references.
   - Bring quote marks back only after a better graphics pass: replace the current decorative quote-mark controls with stronger, template-aware quote assets and safer layout rules.

6. History/snapshot robustness
   - Snapshots should preserve generated backgrounds, imported photos, settings, text, source metadata, handoff/export state, and model choice.
   - Avoid losing a strong graphic after randomizing, loading another text, or switching sources.

7. Panel/workflow polish
   - Keep the left rail ordered by workflow: source/template, text, background, layout/type, metadata, export/QC, history/resources.
   - Continue reducing panel scroll traps and oversized sections.

8. Import-photo/background library
   - Let imported photos/backgrounds be used immediately.
   - Let useful backgrounds be saved as reusable resources/templates.
   - Add better naming, previewing, and resource management over time.

9. Independent template studio and versioned template boundary
   - Separate template definitions, template-specific assets, and preview fixtures from the P.I.G. application code.
   - Define a stable, versioned template contract so P.I.G. can load a template bundle without template work touching source, export, Weaver, Drive, or QC behavior.
   - Evaluate whether the template bundle should live in its own repository or as an independently versioned package first. Prefer a separate repository if template iteration will have its own history, releases, and collaborators.
   - Build a lightweight template preview/studio workflow with representative quote fixtures and export checks.
   - Let the main P.I.G. app pin a known-good template-bundle version and deliberately update it when new templates are ready.

## Current Sprint Recommendation

Keep the handoff ledger moving with Weaver. Inside P.I.G., prioritize export reliability and font/template truth because those protect finished work and reduce surprise in production.
