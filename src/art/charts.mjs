// Site-level before/after dot charts (dumbbells) for the pilot record review.
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
const BEFORE = '#7b8a86', AFTER = '#0e5c57', GRID = '#e2d9c9', INK = '#15302e', INK2 = '#44605c';

export function dumbbell({ id, title, sub, rows }) {
  const W = 560, rowH = 64, top = 34, left = 104, right = 36, H = top + rows.length * rowH + 30;
  const x = p => left + (p / 100) * (W - left - right);
  let g = '';
  [0, 25, 50, 75, 100].forEach(p => {
    g += `<line x1="${x(p)}" y1="${top - 10}" x2="${x(p)}" y2="${H - 26}" stroke="${GRID}" stroke-width="1"/>`;
    g += `<text x="${x(p)}" y="${H - 8}" text-anchor="middle" font-size="12" fill="${INK2}" font-family="${SANS}">${p}%</text>`;
  });
  rows.forEach((r, i) => {
    const y = top + i * rowH + rowH / 2 - 6;
    const pb = (r.b[0] / r.b[1]) * 100, pa = (r.a[0] / r.a[1]) * 100;
    g += `<text x="0" y="${y + 5}" font-size="15" font-weight="650" fill="${INK}" font-family="${SANS}">${r.site}</text>`;
    g += `<line x1="${x(pb)}" y1="${y}" x2="${x(pa)}" y2="${y}" stroke="${AFTER}" stroke-opacity=".35" stroke-width="4" stroke-linecap="round"/>`;
    const lb = `${r.b[0]}/${r.b[1]}`, la = `${r.a[0]}/${r.a[1]}`;
    const close = Math.abs(pa - pb) < 14;
    g += `<g class="mark"><title>${r.site}, before: ${lb} records (${Math.round(pb)}%)</title><circle cx="${x(pb)}" cy="${y}" r="8" fill="#fff" stroke="${BEFORE}" stroke-width="3"/></g>`;
    g += `<g class="mark"><title>${r.site}, after: ${la} records (${Math.round(pa)}%)</title><circle cx="${x(pa)}" cy="${y}" r="9" fill="${AFTER}" stroke="#fff" stroke-width="2"/></g>`;
    g += `<text x="${x(pb)}" y="${y + (close ? 26 : -16)}" text-anchor="middle" font-size="13" fill="${INK2}" font-family="${SANS}">${lb}</text>`;
    g += `<text x="${x(pa)}" y="${y - 16}" text-anchor="middle" font-size="13" font-weight="700" fill="${AFTER}" font-family="${SANS}">${la}</text>`;
  });
  const table = `<table class="data-table"><thead><tr><th scope="col">Hospital</th><th scope="col">Before ACE-T</th><th scope="col">After ACE-T</th></tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${r.site}</th><td>${r.b[0]} of ${r.b[1]}</td><td>${r.a[0]} of ${r.a[1]}</td></tr>`).join('')}</tbody></table>`;
  return `<figure class="chart" aria-labelledby="${id}-h">
  <h3 id="${id}-h">${title}</h3>
  <p class="chart-sub">${sub}</p>
  <div class="chart-legend" aria-hidden="true"><span><i style="background:#fff;border:3px solid ${BEFORE};width:14px;height:14px"></i>Before ACE-T</span><span><i style="background:${AFTER}"></i>After ACE-T</span></div>
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}. ${rows.map(r => `${r.site}: ${r.b[0]} of ${r.b[1]} before, ${r.a[0]} of ${r.a[1]} after`).join('; ')}.">${g}</svg>
  <details><summary>Show as a table</summary>${table}</details>
</figure>`;
}

export function bars({ id, title, rows }) {
  return `<figure class="chart" aria-labelledby="${id}-h">
  <h3 id="${id}-h">${title}</h3>
  <div style="display:grid;gap:14px;margin-top:14px">
  ${rows.map(r => {
    const p = Math.round((r.n / r.d) * 100);
    return `<div><div style="display:flex;justify-content:space-between;gap:12px;font-size:.95rem;margin-bottom:6px"><span>${r.label}</span><strong style="white-space:nowrap">${p}% <span style="font-weight:500;color:${INK2}">(${r.n} of ${r.d})</span></strong></div>
    <div style="height:12px;border-radius:6px;background:#efe7da" role="img" aria-label="${p} percent"><div style="width:${p}%;height:100%;border-radius:6px;background:${AFTER}"></div></div></div>`;
  }).join('')}
  </div>
</figure>`;
}
