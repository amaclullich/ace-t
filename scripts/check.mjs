// Checks the built site: internal links and anchors, required files, headings, and house-style words.
// Usage: node scripts/check.mjs            (add --external to also check external links)
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'docs';
const pages = fs.readdirSync(OUT).filter(f => f.endsWith('.html'));
const problems = [];
const ids = {};
const text = {};
for (const p of pages) {
  const html = fs.readFileSync(path.join(OUT, p), 'utf8');
  ids[p] = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  text[p] = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ');
}
const external = new Set();
for (const p of pages) {
  const html = fs.readFileSync(path.join(OUT, p), 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let u = m[1];
    if (/^(mailto:|data:)/.test(u)) continue;
    if (/^https?:/.test(u)) { if (!u.startsWith('https://amaclullich.github.io/ace-t')) external.add(u); else continue; continue; }
    const [file, hash] = u.split('#');
    const f = (file.split('?')[0] || p).replace(/^\.\/?$/, 'index.html') || 'index.html';
    const target = f === '' ? p : f;
    if (!fs.existsSync(path.join(OUT, target))) problems.push(`${p}: missing file ${u}`);
    else if (hash && target.endsWith('.html') && !/^t=/.test(hash) && !ids[target]?.has(hash)) problems.push(`${p}: missing anchor ${u}`);
  }
  // headings ending in a full stop
  for (const m of html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)) {
    const t = m[1].replace(/<[^>]+>/g, '').trim();
    if (/\.$/.test(t)) problems.push(`${p}: heading ends with a full stop: "${t}"`);
  }
}
// House style: banned words and marks in visible text
const banned = [/\bcannot\b/i, /\bplainly\b/i, /\bmatter(s|ed|ing)?\b/i, /\blands\b/i, /\bload-bearing\b/i, /\bthe whole point\b/i, /\bthe shape of\b/i, /\blives in\b/i, /\bhonest(ly)?\b/i, /\bexactly\b/i, /\babsolutely\b/i, /\bstep by step\b/i, /\bshort answer\b/i, /\bgates?\b/i, /—/, /\bfair enough\b/i, /\bgenuinely\b/i, /\bstraightforward\b/i, /\bworth noting\b/i, /\bhere(’|')s\b/i, /\bquietly\b/i];
for (const p of pages) {
  const t = text[p].replace(/Scene transcript.*$/, '');
  for (const re of banned) { const m = t.match(new RegExp(`.{0,40}${re.source}.{0,40}`, re.flags)); if (m) problems.push(`${p}: style word ${re} in "…${m[0]}…"`); }
}
for (const f of ['downloads/ACE-T-bedside-tool-A4.pdf', 'downloads/ACE-T-bedside-tool-US-Letter.pdf', 'downloads/ACE-T-bedside-tool-editable.docx', 'downloads/ACE-T-at-a-glance-A4.pdf', 'downloads/ACE-T-at-a-glance.png', 'media/ace-t-walkthrough.mp3', 'media/ace-t-walkthrough.vtt', 'media/ace-t-walkthrough-transcript.txt', 'assets/og-ace-t.png', 'assets/apple-touch-icon.png', 'assets/favicon.svg', '.nojekyll', 'sitemap.xml', 'robots.txt']) {
  if (!fs.existsSync(path.join(OUT, f))) problems.push('missing required file ' + f);
}
if (process.argv.includes('--external')) {
  for (const u of external) {
    try {
      const r = await fetch(u, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link check' } });
      console.log(r.status, u);
      if (r.status >= 400) problems.push(`external ${r.status}: ${u}`);
    } catch (e) { problems.push(`external error: ${u} ${e.message}`); }
  }
} else console.log(`${external.size} external links (run with --external to test)`);
console.log(problems.length ? problems.join('\n') : `OK: ${pages.length} pages, links, anchors, headings and style words checked`);
process.exitCode = problems.length ? 1 : 0;
