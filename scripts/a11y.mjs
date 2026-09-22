// Accessibility audit with axe-core (WCAG 2.1 A and AA rules) on every page, desktop and mobile.
import { chromium } from 'playwright';
import fs from 'node:fs';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const base = process.env.BASE || 'http://127.0.0.1:8124/';
const pages = ['index.html', 'tool.html', 'walkthrough.html', 'why-ace-t.html', 'story.html', 'downloads.html', 'about.html', '404.html'];
const b = await chromium.launch();
let total = 0;
for (const vp of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  const p = await b.newPage({ viewport: vp });
  for (const pg of pages) {
    await p.goto(base + pg, { waitUntil: 'networkidle' });
    await p.addScriptTag({ content: axe });
    const r = await p.evaluate(async () => await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }));
    for (const v of r.violations) {
      total++;
      console.log(`${vp.width} ${pg} [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
      v.nodes.slice(0, 3).forEach(n => console.log('    ', n.target.join(' '), n.failureSummary?.split('\n')[1] || ''));
    }
  }
}
console.log(total ? `${total} violation groups` : 'No axe violations');
await b.close();
