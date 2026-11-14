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
| The story | `story.html` | How ACE-T was developed and piloted, told from the paper (medRxiv preprint), with site-level charts |
| Downloads | `downloads.html` | Bedside form (PDF, A4 and US Letter), editable Word form (monochrome), poster (PDF and PNG) |
| About | `about.html` | Source, citation, further reading, contact, accessibility and privacy |

`use-ace-t.html`, `delirium-and-4at.html` and `resources.html` redirect visitors from the first version of the site.

## Updating

Requires Node.js 20 or later. The site itself has no runtime dependencies or web fonts. It uses limited Google Analytics (G-Z1V76FJWPK), on by default with an opt-out notice and an “Analytics preferences” button in the footer; the code is in `src/js/site.js`.

```sh
npm install            # only needed for downloads, map and checks
npm run build          # writes docs/
npm run check          # links, anchors, headings, house-style words
npm run serve          # local server with range requests, http://127.0.0.1:8123/
```

- **Regenerating the downloads** (`npm run downloads`): build with `FONTCONFIG_FILE="$PWD/scripts/print-fonts.conf" CHROME_PATH=/usr/bin/google-chrome npm run downloads`. The path to the font file must be absolute. The published PDFs were made by Chrome 153 (the PDF producer field reads "Skia/PDF m153") with Liberation Sans standing in for Helvetica and Liberation Serif for Georgia. `scripts/print-fonts.conf` makes those two the only fonts the browser can use and turns font hinting off. Both settings are needed. With hinting on, Chrome rounds the letter widths, the spacing of every line changes, and the small capital labels (DONE, ACTION, HOURS) are split into separate letters in the text layer of the PDF. With other fonts the bedside form can run onto a second page, and the script then stops. After a rebuild, compare each PDF with the previous one at 300 dpi (`pdftoppm -r 300`) and with `pdftotext -bbox`: the pixels and word positions should differ only where the source changed. A rebuild of the September 2026 source with this file reproduces the September PDFs with no pixel different. The social image (`static/assets/og-ace-t.png`) and the touch icon are screenshots, and their edge smoothing varies between machines, so restore them from git after a rebuild unless their source changed (`git checkout HEAD -- static/assets/og-ace-t.png static/assets/apple-touch-icon.png`).
- **Contact details** (email, University of Edinburgh profile, postal address) are set once in `SITE` in `src/layout.mjs` and used in the footer and on the About page.

- **Clinical wording** lives in one place: `src/data/tool.mjs`. The tool page, bedside PDFs, Word form and poster are all generated from it. After changing it, run `npm run downloads` and then `npm run build`.
- **Pages** are in `src/pages/`, the shared header and footer in `src/layout.mjs`, styles in `src/css/site.css`.
- **Illustrations** are original SVG drawn in code: `src/art/scenes.mjs` (bedside scene, clock, letters), `src/art/walkthrough-art.mjs` (the twelve walkthrough scenes), `src/art/map.mjs` (pilot sites map, built from Natural Earth data via `world-atlas`), `src/art/charts.mjs`.
- **Walkthrough timing** comes from word-level alignment of the narration (`src/data/walkthrough.json`). Each animated element is timed to a spoken phrase, so the build fails if the narration and the scene cues stop matching. The narration is `static/media/ace-t-walkthrough.mp3` (ElevenLabs, version B of the September 2026 teaching videos). If the narration is re-recorded, regenerate the word timings and captions and replace `walkthrough.json`.
- Keep both the source and the generated `docs/` folder committed. GitHub Pages serves only `docs/`.

## Licence

ACE-T version 1.0 is free to use under CC BY 4.0. The wording is set once on the About page (`src/pages/about.mjs`, `#licence`) and repeated in `src/layout.mjs` (footer and structured data), `src/pages/downloads.mjs`, `src/print/forms.mjs` and `scripts/make-docx.mjs`.

## Source

Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A. Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems. medRxiv 2026.11.08.26367532 (preprint). https://www.medrxiv.org/content/10.64898/2026.11.08.26367532v1 See `CONTENT-NOTES.md` before changing clinical content. The manuscript itself is not in this repository.
