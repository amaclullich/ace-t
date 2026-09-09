# ACE-T

A concise, nurse-focused static website about the first steps in delirium care.

Published at **https://amaclullich.github.io/ace-t/** using GitHub Pages, from `main` / `docs`.

## Updating

No package installation is required. With a current Node.js version:

```sh
npm run build
npm run check
```

Edit clinical copy and page templates in `build.mjs`, styling in `src/styles.css`, and the small print enhancement in `src/site.js`. Keep both source and the generated `docs` folder committed. GitHub Pages serves only `docs`.

The site works without JavaScript, except for its convenience Print button (the browser's own print command always works). There are no third-party fonts, runtime dependencies, analytics, forms, cookies or browser storage.

## Clinical source

The definitive ACE-T source is the current manuscript for submission, *Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems*, Cours et al., reviewed 9 September 2026. The bedside page is an adaptation of Table 1, using the requested 4AT wording. The source manuscript and private working files are not included in this repository.

General delirium and 4AT context is supported by the official 4AT user guide and NICE CG103, linked in the website. The pilot is described as preliminary, not proof of clinical effectiveness. Read `CONTENT-NOTES.md` before changing clinical content.

## Custom domain later

No custom domain or CNAME is configured. When the owner supplies the exact domain and authorises the change, add it in GitHub Pages settings, make the appropriate DNS records, and rebuild with `PUBLIC_BASE_URL=https://the-chosen-domain` so canonical URLs, the sitemap and 404 paths use the new domain. Re-enable/enforce HTTPS after the certificate is ready. Ordinary page and asset links are relative, so they work at both a Pages project path and a domain root.
