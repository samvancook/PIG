# P.I.G. Roadmap

## Highest-Value Next Updates

1. Weaver duplicate suppression, end-to-end
   - Keep the shared handoff ledger as a top priority.
   - P.I.G. should read actionable work from the ledger, claim records before work starts, and update lifecycle states as graphics are generated, exported, uploaded, and sent to QC.
   - Weaver should stop returning any request that is generated, exported, uploaded, sent to QC, approved, or otherwise no longer actionable.
   - Add a `Keep excerpt in queue for another graphic` option to the Drive upload and Weaver QC handoff flow.
   - When selected, preserve the excerpt as actionable after upload and create a distinct graphic-variant identity for the completed asset, while retaining the shared excerpt/source-request identity for history and QC.
   - Make subsequent variants visible as separate graphics rather than duplicate completions, with clear variant numbering or IDs.

2. Background export reliability
   - Keep all export paths flattening the fully visible canvas into an opaque PNG.
   - Guard against transparent/missing generated-background layers in Drive uploads and downloads.
   - Current status: the main export paths use a flattened export canvas; keep this protected as the export pipeline evolves.

3. Image generation workflow upgrade
   - Maintain the model selector with dated and fallback image models such as `gpt-image-2-2026-04-21`, `gpt-image-2`, `gpt-image-1.5`, and `gpt-image-1`.
   - Persist the chosen model between sessions.
   - Make model failures clear and preserve the current graphic if generation fails.

4. Template/font truth pass
   - Split fonts into clearly reliable vs experimental/system fallback groups.
   - Make font fallback visible when a selected font fails to load.
   - Continue tuning templates against the real QI library and Canva references.

5. History/snapshot robustness
   - Snapshots should preserve generated backgrounds, imported photos, settings, text, source metadata, handoff/export state, and model choice.
   - Avoid losing a strong graphic after randomizing, loading another text, or switching sources.

6. Panel/workflow polish
   - Keep the left rail ordered by workflow: source/template, text, background, layout/type, metadata, export/QC, history/resources.
   - Continue reducing panel scroll traps and oversized sections.

7. Import-photo/background library
   - Let imported photos/backgrounds be used immediately.
   - Let useful backgrounds be saved as reusable resources/templates.
   - Add better naming, previewing, and resource management over time.

8. Independent template studio and versioned template boundary
   - Separate template definitions, template-specific assets, and preview fixtures from the P.I.G. application code.
   - Define a stable, versioned template contract so P.I.G. can load a template bundle without template work touching source, export, Weaver, Drive, or QC behavior.
   - Evaluate whether the template bundle should live in its own repository or as an independently versioned package first. Prefer a separate repository if template iteration will have its own history, releases, and collaborators.
   - Build a lightweight template preview/studio workflow with representative quote fixtures and export checks.
   - Let the main P.I.G. app pin a known-good template-bundle version and deliberately update it when new templates are ready.

## Current Sprint Recommendation

Keep the handoff ledger moving with Weaver. Inside P.I.G., prioritize export reliability and font/template truth because those protect finished work and reduce surprise in production.
