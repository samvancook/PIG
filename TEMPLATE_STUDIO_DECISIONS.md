# Template Studio Decisions

## Control Grouping

Template Studio and P.I.G. should keep these concepts separate:

- Typography & Layout: type mechanics and placement.
- Text Styling: color, contrast, and visual treatment applied to text.
- Branding / Attribution: Button Poetry marks, website, badges, and other required brand signals.
- Background: canvas/background color, generated images, imported photos, textures, and background assets.

## Element Capabilities

| Element | Can turn on/off | Can move | Can style | Current owner / notes |
| --- | --- | --- | --- | --- |
| Excerpt / poem text | No; core required content | Yes, through text box X/Y/width/height | Yes, font, weight, size, line height, spacing, alignment, color, auto contrast, adaptive chunks | Production P.I.G. may override per graphic; Template Studio owns template defaults. |
| Poem title | Yes | Yes | Yes, size, spacing, style, color | Title handling can auto de-duplicate title from excerpt text. |
| Author | Yes | Yes | Yes, size, spacing, style, color | Treated as credit text. |
| Book / secondary attribution | Yes | Yes | Yes, size, spacing, style, color | Off by default for some templates, but should be template-configurable. |
| Social media handle line | Yes | Yes, but currently indirectly positioned near credits | Yes, color/contrast behavior follows handle controls | Production P.I.G. owns handle lookup and per-author data; Template Studio may define default placement. |
| Emphasis text | Yes | Yes, through emphasis layout controls when active | Yes, size, line height, color, bold/italic markup in excerpt | Hidden when emphasis is not active. |
| Text box blur / readability layer | Yes | Follows text box | Yes, blur amount and feather | A readability treatment, not a brand element. |
| Decorative quote mark | Currently hidden/off | Yes, when restored | Yes, style, size, weight, color | Roadmap item: restore later with stronger template-aware graphics. |
| Button Poetry website | Yes | Not yet directly movable in UI | Text content editable; color auto contrast applies | Branding / Attribution. Default should remain `www.buttonpoetry.com`. |
| Button Poetry mark/logo | Yes, via mode selection | Template-controlled today | Yes, through logo/mode variants | Every template should start with at least one Button Poetry attribution element enabled. |
| Short Form Contest badge | Template-controlled | Template-controlled | Year/text should be data-driven; badge kerning remains a template quality item | Branding / contest-specific template element. |
| Background color A/B | No, background always exists | Not applicable | Yes | Belongs in Background, even if controls currently sit near layout in older UI. |
| Generated/imported background image | Yes, by setting/clearing image | Crop/fit behavior is template/app controlled | Prompt/model/source controlled | Production P.I.G. owns per-graphic generation/import; Template Studio owns defaults. |
| Template overlay / texture | Template-controlled | Template-controlled | Template-controlled | Template Studio owns these defaults. |

## Current UI Decision

- Typography & Layout contains mechanics: canvas size, font family/weight, alignment, sizing, spacing, text box position, fit, and type positioning.
- Text Styling contains colors and contrast: excerpt/title/author/book colors, auto contrast, adaptive text chunks, alternate chunk color, and palette shuffle.
- Title / Credits Layout contains visibility, positioning, and type mechanics for title, author, and book.
- Branding / Attribution contains Button Poetry website and mark/logo controls.

## Open Decisions

- Move background color A/B fully into Background.
- Add direct move/size controls for website and Button Poetry mark if needed.
- Decide whether social handle placement should be independent or continue to follow credit layout.
- Restore detailed quote-mark controls only after the quote-mark graphic system is redesigned.
