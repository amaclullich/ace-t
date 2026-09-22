# ACE-T website

A static website for nurses about **ACE-T** (Acute Triggers, Patient Experience, Treatment): a one-page tool for the first hours after a positive delirium screen.

Published at **https://amaclullich.github.io/ace-t/** with GitHub Pages, from `main` / `docs`.

## What is on the site

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | The three domains, the four-hour target, how ACE-T fits after a positive screen, pilot headlines |
| The tool | `tool.html` | All 22 prompts from Table 1, each with a short reason, the Quick Distress Assessment Tool, handover |
| Walkthrough | `walkthrough.html` | Narrated animation (SVG and CSS, synced to the ElevenLabs narration), captions, chapters, clickable transcript |
| Why ACE-T | `why-ace-t.html` | The gap after the screen, benefits for nurses, staff ratings, multidomain treatment, where the 4AT fits |
| The story | `story.html` | How ACE-T was developed and piloted, told from the submitted paper, with site-level charts |
| Downloads | `downloads.html` | Bedside form (PDF, A4 and US Letter), editable Word form (monochrome), poster (PDF and PNG) |
| About | `about.html` | Source, citation, further reading, contact, accessibility and privacy |

`use-ace-t.html`, `delirium-and-4at.html` and `resources.html` redirect visitors from the first version of the site.

## Updating

Requires Node.js 20 or later. The site itself has no runtime dependencies, fonts, cookies or analytics.

```sh
npm install            # only needed for downloads, map and checks
npm run build          # writes docs/
npm run check          # links, anchors, headings, house-style words
npm run serve          # local server with range requests, http://127.0.0.1:8123/
```

- **Clinical wording** lives in one place: `src/data/tool.mjs`. The tool page, bedside PDFs, Word form and poster are all generated from it. After changing it, run `npm run downloads` and then `npm run build`.
- **Pages** are in `src/pages/`, the shared header and footer in `src/layout.mjs`, styles in `src/css/site.css`.
- **Illustrations** are original SVG drawn in code: `src/art/scenes.mjs` (bedside scene, clock, letters), `src/art/walkthrough-art.mjs` (the twelve walkthrough scenes), `src/art/map.mjs` (pilot sites map, built from Natural Earth data via `world-atlas`), `src/art/charts.mjs`.
- **Walkthrough timing** comes from word-level alignment of the narration (`src/data/walkthrough.json`). Each animated element is timed to a spoken phrase, so the build fails if the narration and the scene cues stop matching. The narration is `static/media/ace-t-walkthrough.mp3` (ElevenLabs, version B of the September 2026 teaching videos). If the narration is re-recorded, regenerate the word timings and captions and replace `walkthrough.json`.
- Keep both the source and the generated `docs/` folder committed. GitHub Pages serves only `docs/`.

## Source

Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A. Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems. Submitted for publication, 2026. See `CONTENT-NOTES.md` before changing clinical content. The manuscript itself is not in this repository.
