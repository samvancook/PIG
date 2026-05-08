# P.I.G. Roadmap

## Highest-Value Next Updates

1. Weaver duplicate suppression, end-to-end
   - Keep the shared handoff ledger as a top priority.
   - P.I.G. should read actionable work from the ledger, claim records before work starts, and update lifecycle states as graphics are generated, exported, uploaded, and sent to QC.
   - Weaver should stop returning any request that is generated, exported, uploaded, sent to QC, approved, or otherwise no longer actionable.

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

## Current Sprint Recommendation

Keep the handoff ledger moving with Weaver. Inside P.I.G., prioritize export reliability and font/template truth because those protect finished work and reduce surprise in production.
