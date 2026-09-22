import { bedside, fourHourClock, lettersDiagram } from '../src/art/scenes.mjs';
import { chromium } from 'playwright';
import fs from 'fs';
const which = process.argv[2] || 'bedside';
const map = { bedside: () => bedside(), clock: () => `<div style="background:#10302d;padding:20px;width:300px">${fourHourClock()}</div>`, letters: () => lettersDiagram() };
const html = `<html><body style="margin:0;background:#f8f4ec"><div style="width:900px">${map[which]()}</div></body></html>`;
fs.writeFileSync('/tmp/prev.html', html);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 900, height: 740 } });
await p.goto('file:///tmp/prev.html'); await p.screenshot({ path: `/tmp/prev-${which}.png`, fullPage: true }); await b.close();
