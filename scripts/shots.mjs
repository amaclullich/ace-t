// Screenshots of built pages for visual review. Usage: node scripts/shots.mjs [page...] [--mobile]
import { chromium } from 'playwright';
import fs from 'node:fs';
const args = process.argv.slice(2);
const mobile = args.includes('--mobile');
const pages = args.filter(a => !a.startsWith('--'));
const base = process.env.BASE || 'http://127.0.0.1:8123/';
const list = pages.length ? pages : ['index.html', 'tool.html', 'walkthrough.html', 'why-ace-t.html', 'story.html', 'downloads.html', 'about.html'];
fs.mkdirSync('/tmp/shots', { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errors = [];
p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
p.on('pageerror', e => errors.push('pageerror: ' + e.message));
p.on('requestfailed', r => errors.push('requestfailed: ' + r.url()));
for (const pg of list) {
  await p.goto(base + pg, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  const f = `/tmp/shots/${pg.replace('.html', '')}${mobile ? '-m' : ''}.png`;
  await p.screenshot({ path: f, fullPage: true });
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  const ow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(pg, 'height', h, ow ? 'HORIZONTAL OVERFLOW' : '');
}
console.log(errors.length ? errors.join('\n') : 'no console errors');
await b.close();
