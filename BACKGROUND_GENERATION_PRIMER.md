# Background Generation Primer

This is a practical guide to the different ways P.I.G. can get or make backgrounds, and when each one is the right choice.

## Current Best Options

### 1. P.I.G. native AI background generation

Use this when:
- you want the fastest in-app workflow
- you want the poem text to stay exact while only the background changes
- you want to iterate without leaving P.I.G.

Strengths:
- already integrated
- keeps the text layer deterministic
- works well for abstract, painterly, paper, collage, and poster-like backgrounds

Weaknesses:
- not always the best choice for very literal scenes or highly art-directed compositions
- can take multiple generations to get a precise visual metaphor

Current model options in P.I.G.:
- `gpt-image-2-2026-04-21` as the preferred pinned model
- `gpt-image-2` as the moving alias
- `gpt-image-1.5`
- `gpt-image-1`
- `gpt-image-1-mini`
- `chatgpt-image-latest`

P.I.G. remembers the selected model in the browser, so switching back to a fallback model should persist across sessions until changed.

Official references:
- [OpenAI image generation guide](https://platform.openai.com/docs/guides/image-generation)
- [OpenAI image generation models](https://platform.openai.com/docs/models)

### 2. ChatGPT image generation inside ChatGPT Business

Use this when:
- you want to ideate visually before committing to a final P.I.G. version
- you want fast conversational prompting and revisions
- you want to test several art directions before bringing one back into P.I.G.

Strengths:
- very good for quick exploration
- easy to ask for variations conversationally
- useful when the right image needs a little back-and-forth instead of one exact prompt

Weaknesses:
- less structured than the in-app P.I.G. workflow
- requires bringing the result back into P.I.G. if you want the full quote-image workflow

Official references:
- [ChatGPT Business overview](https://openai.com/business/chatgpt-pricing/)
- [Creating images in ChatGPT](https://help.openai.com/en/articles/8932459-dall-e-in-chatgpt)

### 3. Import a photo or finished image as the background

Use this when:
- you already have a photo, illustration, scan, or exported background you want
- you want art direction that AI is not reliably hitting
- you want to use house assets or campaign visuals

Strengths:
- most controllable path
- best for known campaign art, author assets, product shots, or custom illustrations
- avoids repeated generation cost

Weaknesses:
- depends on having the source asset already
- may still need text/contrast adjustments in P.I.G.

P.I.G. now supports:
- importing a background photo/image directly
- reusing that background inside the current project
- saving backgrounds into a small reusable in-browser background library

### 4. Build a reusable background library

Use this when:
- you have recurring visual motifs
- you want to avoid regenerating the same kinds of backgrounds
- you want a bank of “known good” house looks

Good use cases:
- paper washes
- storm textures
- hand-painted gradients
- collage scans
- recurring symbolic backgrounds
- campaign-specific visual systems

Recommendation:
- keep a library of reusable backgrounds for reliable production
- use native AI generation mostly for exploration and new metaphors

## Best Workflow By Need

### Fastest production path
1. Load text
2. Import a saved background or reusable background
3. Adjust text and metadata
4. Upload to Drive and send to Weaver

### Fastest creative exploration path
1. Load text
2. Use `Generate AI Background`
3. Randomize / tune typography
4. Save strong backgrounds to the background library

### Most art-directed path
1. Generate or create candidate art in ChatGPT or elsewhere
2. Import the chosen image into P.I.G.
3. Use P.I.G. for typography, metadata, export, Drive, and Weaver handoff

## Recommendation For Button

Best long-term mix:
- use P.I.G. native AI for fast internal exploration
- use imported images for known-good campaign art
- build a reusable background library for reliable repeated production
- use ChatGPT image generation as a brainstorming layer, not necessarily the final export layer

That combination should give you:
- speed
- repeatability
- more control
- less wasted generation effort
