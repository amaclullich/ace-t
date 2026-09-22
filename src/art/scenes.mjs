// Original illustrations for the ACE-T site and walkthrough.
// Flat vector style: cream, teal, blue and amber; no real people, logos or clinical data.

export const C = {
  ink: '#15302e', ink2: '#44605c', line: '#e2d9c9', paper: '#f8f4ec', card: '#fffdf9',
  ac: '#10756b', acT: '#ddefea', pe: '#2d5f98', peT: '#e2ebf6', tr: '#a9591a', trT: '#f7e7d4',
  frame: '#35524e', frame2: '#8fa7a1', gown: '#9cb9d2', gownD: '#7f9fbc', blanket: '#2f7d73', blanketD: '#25665e',
  skin1: '#e4b99a', skin2: '#a26a4a', skin3: '#7a4c34', hairGrey: '#d4d8d6', hairDark: '#231d1b', scrubs: '#1f3f5f', scrubsD: '#17314a',
};

// Small reusable badge: circle with icon path (24px icon space scaled)
export function badge(x, y, r, fill, iconBody, cls = '') {
  const s = (r * 1.1) / 24;
  return `<g class="${cls}"><g transform="translate(${x} ${y})">
    <circle r="${r + 6}" fill="${fill}" opacity=".16"/>
    <circle r="${r}" fill="${fill}"/>
    <g transform="translate(${-12 * s} ${-12 * s}) scale(${s})" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconBody}</g>
  </g></g>`;
}

const I = {
  pulse: '<path d="M3 12h4l2-5 4 10 2.5-6 1.5 3h4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/>',
  clip: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3.8A.8.8 0 0 1 9.8 3h4.4a.8.8 0 0 1 .8.8v.7"/><path d="m8.5 11 1.5 1.5 3-3M8.5 16.5l1.5 1.5 3-3M15 11h1M15 16.5h1"/>',
  chat: '<path d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4Z"/><path d="M8 9.5h8M8 12.5h5"/>',
  drop: '<path d="M12 3.5c-3 4.2-6 7.3-6 10.6a6 6 0 0 0 12 0c0-3.3-3-6.4-6-10.6Z"/>',
  tube: '<path d="M9 3h6M10 3v13.5a2 2 0 0 0 4 0V3"/><path d="M10 11h4"/>',
  thermo: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z"/><path d="M12 9v7"/>',
  pill: '<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m9.4 8.6 5.2 6.8"/>',
  bug: '<circle cx="12" cy="12" r="4.2"/><path d="M12 3v4.8M12 16.2V21M3 12h4.8M16.2 12H21M5.6 5.6l3.4 3.4M15 15l3.4 3.4M18.4 5.6 15 9M9 15l-3.4 3.4"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z"/>',
  cup: '<path d="M6 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/>',
  bladder: '<path d="M12 4c4 0 7 3 7 7.5S16 19 12 19s-7-3-7-7.5S8 4 12 4Z"/><path d="M12 19v2.5"/>',
  shield: '<path d="M12 3 19 6v5.5c0 4.2-3 7.4-7 9.5-4-2.1-7-5.3-7-9.5V6l7-3Z"/><path d="m9 12 2 2 4-4.5"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>',
  leaflet: '<path d="M4 6.5 9 4.5l6 2 5-2v13l-5 2-6-2-5 2v-13Z"/><path d="M9 4.5v13M15 6.5v13"/>',
  glasses: '<circle cx="7" cy="14" r="3.5"/><circle cx="17" cy="14" r="3.5"/><path d="M10.5 14h3M3.5 13l1.5-6h2.5M20.5 13 19 7h-2.5"/>',
  ear: '<path d="M7 9.5a5 5 0 1 1 10 0c0 3-2.8 3.8-3.4 6.6A3 3 0 0 1 8 16"/><path d="M10 10a2 2 0 1 1 3.6 1.2"/>',
  room: '<path d="M3 19V9.5M21 19v-5.5H9V11H5.5a2.5 2.5 0 0 0-2.5 2.5M3 16h18"/><circle cx="6.5" cy="8" r="1.8"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  food: '<path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M16 21V3c-2.2 1-3.5 3.5-3.5 7v3H16"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  alert: '<path d="M12 4 2.8 19.5h18.4L12 4Z"/><path d="M12 10v4.2M12 17h.01"/>',
  repeat: '<path d="M4 11a7 7 0 0 1 12-4.9L18 8M18 4v4h-4M20 13a7 7 0 0 1-12 4.9L6 16M6 20v-4h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  team: '<circle cx="12" cy="7" r="2.6"/><circle cx="5.5" cy="9.5" r="2.1"/><circle cx="18.5" cy="9.5" r="2.1"/><path d="M7.5 19a4.5 4.5 0 0 1 9 0M2.5 17.5a3 3 0 0 1 4.6-2.6M21.5 17.5a3 3 0 0 0-4.6-2.6"/>',
};
export { I as ICONS };

// A stroke icon placed in art space
export function glyph(name, x, y, size, color, sw = 2) {
  const s = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${sw / s * (s > 1 ? 1 : 1)}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">${I[name]}</g>`;
}

/* ---------- Bedside scene (hero and several walkthrough scenes) ---------- */
export function bedside({ id = 'bs', nurse = true, badges = true, extras = '', badgeCls = ['float', 'float2', 'float'], sheet = true, speech = '', cls = '', clock = true, win = true, title = 'A nurse at the bedside of an older patient, with three symbols for the ACE-T domains' } = {}) {
  const b = badges ? `
    <path d="M232 176 Q 330 60 452 186" fill="none" stroke="${C.ink2}" stroke-width="2" stroke-dasharray="2 8" stroke-linecap="round" opacity=".45"/>
    ${badge(232, 176, 25, C.ac, I.pulse, badgeCls[0])}
    ${badge(330, 108, 25, C.pe, I.heart, badgeCls[1])}
    ${badge(452, 186, 25, C.tr, I.clip, badgeCls[2])}` : '';
  const n = nurse ? `
    <g class="nurse" transform="translate(0 -14)">
      <!-- nurse behind the bed, waist up -->
      <path d="M333 338 L338 268 Q344 236 388 232 Q432 236 438 268 L443 338 Z" fill="${C.scrubs}"/>
      <path d="M372 236 L388 262 L404 236" fill="none" stroke="#e9eef2" stroke-width="4" stroke-linejoin="round"/>
      <rect x="378" y="214" width="20" height="22" rx="6" fill="${C.skin2}"/>
      <circle cx="388" cy="194" r="29" fill="${C.skin2}"/>
      <path d="M358 190 C356 160 392 150 412 166 C420 173 420 186 417 196 C410 178 392 172 372 180 C366 183 362 188 358 196 Z" fill="${C.hairDark}"/>
      <circle cx="412" cy="170" r="11" fill="${C.hairDark}"/>
      <circle cx="372" cy="197" r="2.6" fill="${C.ink}"/>
      <circle cx="388" cy="198" r="2.6" fill="${C.ink}"/>
      <path d="M371 210 q7 5 14 0" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="416" y="262" width="12" height="16" rx="2" fill="#fff" opacity=".9"/>
      <!-- arms and clipboard -->
      <path d="M346 262 C 332 280 330 292 342 302" fill="none" stroke="${C.scrubsD}" stroke-width="17" stroke-linecap="round"/>
      <path d="M428 262 C 434 286 412 298 384 298" fill="none" stroke="${C.scrubsD}" stroke-width="17" stroke-linecap="round"/>
      ${sheet ? `<g transform="translate(0 -12) rotate(-10 352 290)">
        <rect x="328" y="258" width="50" height="64" rx="6" fill="#fff" stroke="${C.line}" stroke-width="2"/>
        <rect x="343" y="253" width="20" height="10" rx="3" fill="${C.ink2}"/>
        <rect x="335" y="272" width="6" height="6" rx="1.5" fill="${C.ac}"/><rect x="345" y="273" width="26" height="4" rx="2" fill="${C.line}"/>
        <rect x="335" y="285" width="6" height="6" rx="1.5" fill="${C.pe}"/><rect x="345" y="286" width="22" height="4" rx="2" fill="${C.line}"/>
        <rect x="335" y="298" width="6" height="6" rx="1.5" fill="${C.tr}"/><rect x="345" y="299" width="24" height="4" rx="2" fill="${C.line}"/>
      </g>` : ''}
      <circle cx="343" cy="302" r="8" fill="${C.skin2}"/>
      <circle cx="381" cy="297" r="8" fill="${C.skin2}"/>
    </g>` : '';
  return `<svg class="${cls}" viewBox="0 0 640 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">${title}</title>
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5efe9"/><stop offset="1" stop-color="#efe6d6"/></linearGradient>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3e6ee"/><stop offset="1" stop-color="#eef4ef"/></linearGradient>
  </defs>
  <rect x="26" y="36" width="588" height="438" rx="130" fill="url(#${id}-bg)"/>
  <ellipse cx="320" cy="476" rx="250" ry="14" fill="${C.ink}" opacity=".07"/>
  <!-- window -->
  <g style="${win ? '' : 'display:none'}">
    <rect x="478" y="64" width="112" height="98" rx="10" fill="url(#${id}-sky)" stroke="#d8ccb8" stroke-width="6"/>
    <circle cx="560" cy="92" r="11" fill="#f6dfa8" opacity=".9"/>
    <path d="M534 66v94M480 113h108" stroke="#d8ccb8" stroke-width="5"/>
  </g>
  <!-- wall clock -->
  <g style="${clock ? '' : 'display:none'}">
    <circle cx="118" cy="112" r="31" fill="#fff" stroke="${C.frame}" stroke-width="5"/>
    <path d="M118 112V92M118 112l13 8" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="118" cy="112" r="3.5" fill="${C.tr}"/>
    ${[0, 1, 2, 3].map(i => { const a = i * Math.PI / 2; return `<circle cx="${(118 + 23 * Math.sin(a)).toFixed(1)}" cy="${(112 - 23 * Math.cos(a)).toFixed(1)}" r="2.2" fill="${C.ink2}"/>`; }).join('')}
  </g>
  ${b}
  ${n}
  <!-- bed -->
  <g>
    <rect x="88" y="246" width="22" height="196" rx="10" fill="${C.frame}"/>
    <path d="M112 334 L112 262 Q114 246 130 250 L262 322 L270 334 Z" fill="#fff" stroke="#d3c9b7" stroke-width="2"/>
    <rect x="110" y="330" width="404" height="42" rx="14" fill="#fff" stroke="#d3c9b7" stroke-width="2"/>
    <rect x="110" y="370" width="404" height="15" rx="7" fill="${C.frame}"/>
    <rect x="142" y="384" width="11" height="58" rx="4" fill="${C.frame2}"/>
    <rect x="470" y="384" width="11" height="58" rx="4" fill="${C.frame2}"/>
    <circle cx="147" cy="452" r="11" fill="${C.frame}"/><circle cx="476" cy="452" r="11" fill="${C.frame}"/>
    <rect x="506" y="296" width="20" height="106" rx="9" fill="${C.frame}"/>
    <!-- pillow -->
    <ellipse cx="164" cy="270" rx="50" ry="21" transform="rotate(30 164 270)" fill="#f4f1ea" stroke="#d9d0c0" stroke-width="2"/>
    <!-- patient -->
    <path d="M158 290 Q164 266 196 266 L276 318 L286 334 L198 338 Z" fill="${C.gown}"/>
    <path d="M186 274 L200 286" stroke="${C.gownD}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="183" cy="240" r="29" fill="${C.skin1}"/>
    <path d="M157 252 C146 226 160 206 184 206 C200 206 210 213 213 224 C206 219 198 218 192 221 C186 216 176 218 172 226 C167 234 166 244 166 256 Z" fill="${C.hairGrey}"/>
    <circle cx="192" cy="240" r="2.5" fill="${C.ink}"/>
    <circle cx="205" cy="239" r="2.5" fill="${C.ink}"/>
    <path d="M195 254 q5 1.5 10 0" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M205 282 C 226 300 246 312 270 318" fill="none" stroke="${C.gown}" stroke-width="15" stroke-linecap="round"/>
    <circle cx="272" cy="318" r="8" fill="${C.skin1}"/>
    <!-- blanket -->
    <path d="M244 318 Q300 300 356 314 Q420 294 476 318 L510 332 L510 372 L232 372 Q226 344 244 318 Z" fill="${C.blanket}"/>
    <path d="M250 336 Q330 322 400 336 T 500 344" fill="none" stroke="${C.blanketD}" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    
  </g>
  <!-- bedside cabinet -->
  <g>
    <rect x="540" y="340" width="64" height="104" rx="8" fill="#e7dccb" stroke="#cdbfa8" stroke-width="2"/>
    <path d="M540 372h64" stroke="#cdbfa8" stroke-width="2"/><rect x="564" y="354" width="16" height="4" rx="2" fill="#b3a489"/>
    <rect x="552" y="312" width="16" height="28" rx="4" fill="#e7f0f3" stroke="#b9cdd4" stroke-width="2"/>
    <g fill="none" stroke="${C.ink}" stroke-width="2.4"><circle cx="578" cy="333" r="6"/><circle cx="593" cy="333" r="6"/><path d="M584 333h3"/></g>
  </g>
  ${speech}
  ${extras}
</svg>`;
}

/* ---------- Four hour clock ---------- */
export function fourHourClock({ dark = true, id = 'clk' } = {}) {
  const r = 100, cx = 120, cy = 120;
  const ink = dark ? '#ffffff' : C.ink;
  const face = dark ? 'rgba(255,255,255,.06)' : '#fff';
  const ring = dark ? 'rgba(255,255,255,.18)' : C.line;
  const arc = (a0, a1) => {
    const p = a => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  };
  const seg = (Math.PI * 2) / 12;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = i * seg, big = i % 3 === 0;
    const r1 = r - 14, r2 = r - (big ? 26 : 20);
    return `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + r2 * Math.sin(a)).toFixed(1)}" y2="${(cy - r2 * Math.cos(a)).toFixed(1)}" stroke="${ink}" stroke-opacity="${big ? .8 : .4}" stroke-width="${big ? 3 : 2}" stroke-linecap="round"/>`;
  }).join('');
  return `<svg viewBox="0 0 240 240" role="img" aria-labelledby="${id}-t" xmlns="http://www.w3.org/2000/svg">
  <title id="${id}-t">Clock face with the first four hours highlighted</title>
  <circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="${face}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${ring}" stroke-width="12"/>
  <path d="${arc(0.02, seg * 1.33)}" fill="none" stroke="${C.ac}" stroke-width="12" stroke-linecap="round"/>
  <path d="${arc(seg * 1.36, seg * 2.66)}" fill="none" stroke="${dark ? '#5d8fce' : C.pe}" stroke-width="12" stroke-linecap="round"/>
  <path d="${arc(seg * 2.69, seg * 3.98)}" fill="none" stroke="${dark ? '#e0924f' : C.tr}" stroke-width="12" stroke-linecap="round"/>
  ${ticks}
  <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="64" fill="${ink}">4</text>
  <text x="${cx}" y="${cy + 42}" text-anchor="middle" font-family="-apple-system, Segoe UI, Roboto, Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="2" fill="${ink}" fill-opacity=".8">HOURS</text>
</svg>`;
}

/* ---------- ACE-T letters diagram ---------- */
export function lettersDiagram({ id = 'let' } = {}) {
  return `<svg viewBox="0 0 720 250" role="img" aria-labelledby="${id}-t" xmlns="http://www.w3.org/2000/svg">
  <title id="${id}-t">How the name ACE-T is formed: AC from ACute triggers, E from patient Experience, T from Treatment</title>
  <g font-family="Georgia, serif" font-weight="700">
    <text x="60" y="118" font-size="112" fill="${C.ac}">AC</text>
    <text x="252" y="118" font-size="112" fill="${C.pe}">E</text>
    <text x="340" y="118" font-size="112" fill="#9aa9a5">-</text>
    <text x="404" y="118" font-size="112" fill="${C.tr}">T</text>
  </g>
  <g font-family="-apple-system, Segoe UI, Roboto, Arial, sans-serif" font-size="21">
    <path d="M128 140v34" stroke="${C.ac}" stroke-width="3" stroke-linecap="round"/>
    <text x="40" y="206" fill="${C.ink}"><tspan font-weight="800" fill="${C.ac}">AC</tspan>ute triggers</text>
    <path d="M288 140v34" stroke="${C.pe}" stroke-width="3" stroke-linecap="round"/>
    <text x="200" y="206" fill="${C.ink}">patient <tspan font-weight="800" fill="${C.pe}">E</tspan>xperience</text>
    <path d="M438 140v34" stroke="${C.tr}" stroke-width="3" stroke-linecap="round"/>
    <text x="400" y="206" fill="${C.ink}"><tspan font-weight="800" fill="${C.tr}">T</tspan>reatment</text>
  </g>
  <g>
    <rect x="560" y="44" width="136" height="164" rx="12" fill="#fff" stroke="${C.line}" stroke-width="2"/>
    <text x="578" y="80" font-family="Georgia, serif" font-weight="700" font-size="24" fill="${C.ink}">ACE-T</text>
    <rect x="578" y="98" width="10" height="10" rx="2" fill="${C.ac}"/><rect x="596" y="100" width="80" height="6" rx="3" fill="${C.line}"/>
    <rect x="578" y="122" width="10" height="10" rx="2" fill="${C.ac}"/><rect x="596" y="124" width="64" height="6" rx="3" fill="${C.line}"/>
    <rect x="578" y="146" width="10" height="10" rx="2" fill="${C.pe}"/><rect x="596" y="148" width="74" height="6" rx="3" fill="${C.line}"/>
    <rect x="578" y="170" width="10" height="10" rx="2" fill="${C.tr}"/><rect x="596" y="172" width="58" height="6" rx="3" fill="${C.line}"/>
  </g>
</svg>`;
}
