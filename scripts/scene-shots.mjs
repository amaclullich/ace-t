import { chromium } from 'playwright';
const base = process.env.BASE || 'http://127.0.0.1:8123/';
const width = +(process.env.W || 1280);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto(base + 'walkthrough.html', { waitUntil: 'networkidle' });
const scenes = await p.$$eval('.scene', els => els.map(e => [+e.dataset.start, +e.dataset.end]));
const times = (process.env.TIMES ? process.env.TIMES.split(',').map(Number) : scenes.map(([s, e]) => Math.min(e, 281) - 0.6));
let i = 0;
for (const t of times) {
  await p.evaluate(t => { const r = document.querySelector('.scrub input'); r.value = t; r.dispatchEvent(new Event('input')); }, t);
  await p.waitForTimeout(3600);
  const el = await p.$('.player');
  await el.screenshot({ path: `/tmp/shots/scene-${String(i).padStart(2, '0')}${process.env.SUF || ''}.png` });
  i++;
}
console.log('scenes', scenes.length, errs.length ? errs : 'no errors');
await b.close();
