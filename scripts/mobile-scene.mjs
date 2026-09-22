import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:8124/walkthrough.html', { waitUntil: 'networkidle' });
const times = (process.env.TIMES || '19,41,63,84,111,137,160,187,212,236,257,280').split(',').map(Number);
let i = 0;
for (const t of times) {
  await p.evaluate(t => { const r = document.querySelector('.scrub input'); r.value = t; r.dispatchEvent(new Event('input')); }, t);
  await p.waitForTimeout(3000);
  await (await p.$('.player')).screenshot({ path: `/tmp/shots/m-scene-${String(i++).padStart(2, '0')}.png` });
}
await b.close();
