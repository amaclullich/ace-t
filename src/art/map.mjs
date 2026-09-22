import fs from 'node:fs';
import { C } from './scenes.mjs';
const M = JSON.parse(fs.readFileSync(new URL('./map-dots.json', import.meta.url)));
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";

function arc(a, b, lift) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - lift;
  return `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`;
}
function label(x, y, title, sub, anchor = 'start', color = C.ink) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${SANS}" font-size="21" font-weight="700" fill="${color}">${title}</text><text x="${x}" y="${y + 24}" text-anchor="${anchor}" font-family="${SANS}" font-size="16.5" font-weight="500" fill="${C.ink2}">${sub}</text>`;
}
export function sitesMap({ id = 'map' } = {}) {
  const { W, H, dots, sites } = M;
  const s = sites.stanford, e = sites.edinburgh, f = sites.frankfurt;
  const d = dots.map(([x, y]) => `M${x} ${y}h0`).join('');
  const pin = (p, c) => `<circle cx="${p[0]}" cy="${p[1]}" r="16" fill="${c}" opacity=".18"/><circle cx="${p[0]}" cy="${p[1]}" r="8" fill="${c}" stroke="#fff" stroke-width="3"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-t" xmlns="http://www.w3.org/2000/svg">
  <title id="${id}-t">Map of the three pilot sites: Stanford in California, Edinburgh in Scotland and Frankfurt in Germany</title>
  <path d="${d}" stroke="#cfc4b0" stroke-width="4.2" stroke-linecap="round"/>
  <path d="${arc(s, e, 120)}" fill="none" stroke="${C.ac}" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>
  <path d="${arc(e, f, 26)}" fill="none" stroke="${C.ac}" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>
  <path d="${arc(s, f, 150)}" fill="none" stroke="${C.ac}" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round" opacity=".45"/>
  ${pin(s, C.ac)}${pin(e, C.pe)}${pin(f, C.tr)}
  <g>
    <rect x="${s[0] - 10}" y="${s[1] + 20}" width="238" height="66" rx="10" fill="#fff" opacity=".94"/>
    ${label(s[0] + 4, s[1] + 46, 'Stanford, USA', 'Acute Care for Elders unit')}
  </g>
  <g>
    <rect x="${e[0] - 238}" y="${e[1] - 84}" width="228" height="66" rx="10" fill="#fff" opacity=".94"/>
    ${label(e[0] - 226, e[1] - 58, 'Edinburgh, UK', 'Geriatric medicine wards')}
  </g>
  <g>
    <rect x="${f[0] - 214}" y="${f[1] + 20}" width="240" height="66" rx="10" fill="#fff" opacity=".94"/>
    ${label(f[0] - 202, f[1] + 46, 'Frankfurt, Germany', 'Delirium team, medical wards')}
  </g>
</svg>`;
}
