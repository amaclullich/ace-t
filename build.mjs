// Builds the static ACE-T website into docs/ (served by GitHub Pages from main /docs).
// Usage: node build.mjs     (no runtime dependencies; dev tools are only needed for downloads and checks)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { layout, SITE } from './src/layout.mjs';
import { plainTranscript, vtt } from './src/walkthrough-build.mjs';

import home from './src/pages/home.mjs';
import tool from './src/pages/tool.mjs';
import walkthrough from './src/pages/walkthrough.mjs';
import why from './src/pages/why.mjs';
import story from './src/pages/story.mjs';
import downloads from './src/pages/downloads.mjs';
import about from './src/pages/about.mjs';

const OUT = 'docs';
const pages = [home, tool, walkthrough, why, story, downloads, about];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });

// Static files (media, downloads, images)
fs.cpSync('static', OUT, { recursive: true });

const css = fs.readFileSync('src/css/site.css', 'utf8');
const siteJs = fs.readFileSync('src/js/site.js', 'utf8');
const walkJs = fs.readFileSync('src/js/walkthrough.js', 'utf8');
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const cssV = hash(css), jsV = hash(siteJs + walkJs);
fs.writeFileSync(path.join(OUT, 'assets/site.css'), css);
fs.writeFileSync(path.join(OUT, 'assets/site.js'), siteJs);
fs.writeFileSync(path.join(OUT, 'assets/walkthrough.js'), walkJs);

fs.writeFileSync(path.join(OUT, 'assets/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0e5c57"/><text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="36" fill="#fff">A</text><circle cx="18" cy="54" r="4" fill="#6fd0c0"/><circle cx="32" cy="54" r="4" fill="#9dbdea"/><circle cx="46" cy="54" r="4" fill="#f0b37a"/></svg>`);

// Walkthrough text files
fs.mkdirSync(path.join(OUT, 'media'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'media/ace-t-walkthrough-transcript.txt'), `ACE-T at the bedside: narrated walkthrough transcript\n${SITE.base}/walkthrough.html\n\n${plainTranscript()}\n`);
fs.writeFileSync(path.join(OUT, 'media/ace-t-walkthrough.vtt'), vtt());

const size = f => { try { const b = fs.statSync(path.join(OUT, f)).size; return b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.round(b / 1e3)} KB`; } catch { return ''; } };
const sizes = {
  a4: size('downloads/ACE-T-bedside-tool-A4.pdf'), docx: size('downloads/ACE-T-bedside-tool-editable.docx'),
  poster: size('downloads/ACE-T-at-a-glance-A4.pdf'), mp3: size('media/ace-t-walkthrough.mp3'),
};

const finish = html => html.replace(/__CSSV__/g, cssV).replace(/__JSV__/g, jsV);
for (const p of pages) {
  const html = layout({ key: p.key, title: p.title, description: p.description, path: p.path, scripts: p.scripts, body: p.body({ sizes }) });
  fs.writeFileSync(path.join(OUT, p.path), finish(html));
}

// 404
fs.writeFileSync(path.join(OUT, '404.html'), finish(layout({
  key: '404', title: 'Page not found', description: 'This page could not be found.', path: '404.html',
  body: `<section class="page-hero"><div class="wrap wrap-narrow"><p class="eyebrow">404</p><h1>Page not found</h1><p class="lede">The page you asked for is not here. It may have moved when the site was updated.</p><div class="btn-row mt-2"><a class="btn btn-primary" href="${SITE.base}/">ACE-T home</a><a class="btn btn-secondary" href="${SITE.base}/tool.html">The tool</a></div></div></section>`,
})).replace(/href="assets\//g, `href="${SITE.base}/assets/`).replace(/src="assets\//g, `src="${SITE.base}/assets/`).replace(/href="(tool|walkthrough|why-ace-t|story|downloads|about)\.html"/g, `href="${SITE.base}/$1.html"`).replace('href="./"', `href="${SITE.base}/"`));

// Redirects from the earlier version of the site
const redirects = { 'use-ace-t.html': 'tool.html', 'delirium-and-4at.html': 'why-ace-t.html#the-4at', 'resources.html': 'downloads.html' };
for (const [from, to] of Object.entries(redirects)) {
  fs.writeFileSync(path.join(OUT, from), `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>ACE-T</title><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${SITE.base}/${to}"><meta name="robots" content="noindex"></head><body><p><a href="${to}">This page has moved. Continue to ACE-T.</a></p></body></html>\n`);
}

fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${SITE.base}/${p.path === 'index.html' ? '' : p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.base}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log(`Built ${pages.length} pages into ${OUT}/ (css ${cssV}, js ${jsV})`);
