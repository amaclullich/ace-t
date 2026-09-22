// Scene illustrations for the narrated walkthrough. Each element that animates carries
// class="anim ..." and data-t="<seconds>" (absolute time in the narration), resolved at build time.
import { C, ICONS as I, badge, bedside } from './scenes.mjs';

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
const SERIF = 'Georgia, serif';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const svg = (title, inner) => `<svg viewBox="0 0 640 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(title)}">${inner}</svg>`;
const txt = (x, y, s, { size = 18, weight = 600, fill = C.ink, anchor = 'middle', family = SANS, italic = false } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}"${italic ? ' font-style="italic"' : ''}>${esc(s)}</text>`;
const A = (cls, t, inner, extra = '') => `<g class="anim ${cls}" data-t="${t}"${extra}>${inner}</g>`;
const labelBadge = (x, y, r, color, icon, label, t, cls = 'pop', lblFill = C.ink) =>
  A(cls, t, `${badge(x, y, r, color, icon)}${label ? txt(x, y + r + 26, label, { size: 17, weight: 650, fill: lblFill }) : ''}`);

function page(x, y, w, h, rot, rows, { head = C.line, fill = '#fff' } = {}) {
  let r = '';
  rows.forEach((row, i) => {
    const yy = y + 42 + i * 20;
    r += `<rect x="${x + 16}" y="${yy}" width="8" height="8" rx="2" fill="${row.c || C.line}"/><rect x="${x + 32}" y="${yy + 1}" width="${row.w}" height="6" rx="3" fill="${C.line}"/>`;
  });
  return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${C.line}" stroke-width="2"/><rect x="${x + 16}" y="${y + 16}" width="${w * 0.5}" height="9" rx="4" fill="${head}"/>${r}</g>`;
}

function aceSheet(x, y, w, h, { rowsPer = 3, highlight = null } = {}) {
  const doms = [['Acute Triggers', C.ac, C.acT], ['Patient Experience', C.pe, C.peT], ['Treatment', C.tr, C.trT]];
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${C.line}" stroke-width="2"/>`;
  out += txt(x + 24, y + 44, 'ACE-T', { size: 30, weight: 700, family: SERIF, anchor: 'start' });
  const bh = (h - 76) / 3;
  doms.forEach(([n, c, t], i) => {
    const by = y + 64 + i * bh;
    out += `<g${highlight ? ` class="anim lit" data-t="${highlight[i]}"` : ''}><rect x="${x + 16}" y="${by}" width="${w - 32}" height="${bh - 10}" rx="10" fill="${t}"/>`;
    out += txt(x + 30, by + 26, n, { size: 17, weight: 700, fill: c, anchor: 'start' });
    for (let j = 0; j < rowsPer; j++) {
      const ry = by + 40 + j * 16;
      if (ry > by + bh - 18) break;
      out += `<rect x="${x + 30}" y="${ry}" width="9" height="9" rx="2" fill="none" stroke="${c}" stroke-width="2"/><rect x="${x + 46}" y="${ry + 2}" width="${w - 110 - j * 22}" height="5" rx="2.5" fill="${c}" opacity=".25"/>`;
    }
    out += '</g>';
  });
  return out;
}

export const SCENES = [
  {
    key: 'start', section: 'At the bedside', title: 'You have a positive delirium screen',
    prompts: [
      { text: 'What might be contributing?', at: 'what might be contributing', d: 'ac' },
      { text: 'How is the patient feeling?', at: 'how is the patient feeling', d: 'pe' },
      { text: 'What needs to be communicated?', at: 'what needs to be communicated', d: 'tr' },
    ],
    art: (T, S) => {
      const card = A('from-down', S(0.6), `<rect x="46" y="58" width="196" height="84" rx="14" fill="#fff" stroke="${C.line}" stroke-width="2"/>
        ${txt(66, 90, 'Delirium screen', { size: 16, weight: 600, fill: C.ink2, anchor: 'start' })}
        ${txt(66, 124, 'Positive', { size: 28, weight: 700, family: SERIF, anchor: 'start' })}
        <circle cx="208" cy="100" r="18" fill="${C.trT}"/><path d="M208 90v20M198 100h20" stroke="${C.tr}" stroke-width="4" stroke-linecap="round"/>`);
      const extras = `${card}
        <path class="draw" data-t="${T('ace-t brings')}" style="--len:420" d="M232 176 Q 330 60 452 186" fill="none" stroke="${C.ink2}" stroke-width="2.5" stroke-dasharray="420" stroke-linecap="round" opacity=".45"/>
        ${A('pop', T('what might be contributing'), badge(232, 176, 25, C.ac, I.pulse))}
        ${A('pop', T('how is the patient feeling'), badge(330, 108, 25, C.pe, I.heart))}
        ${A('pop', T('what needs to be communicated'), badge(452, 186, 25, C.tr, I.clip))}`;
      return bedside({ id: 'w0', badges: false, clock: false, extras, title: 'A nurse at the bedside after a positive delirium screen' });
    },
  },
  {
    key: 'why', section: 'Why ACE-T exists', title: 'Making the next steps clearer',
    prompts: [
      { text: 'Advice varies between papers and protocols', at: 'research papers' },
      { text: 'Who acts, and when, is often unclear', at: 'without clearly saying' },
      { text: 'ACE-T sets out the nursing contribution', at: 'ace-t was developed' },
      { text: 'A team response', at: 'supports a team response' },
    ],
    art: (T, S) => {
      const dim = T('ace-t was developed');
      const docs = [
        [40, 70, -9, [{ w: 90 }, { w: 60, c: '#c9b99e' }, { w: 76 }, { w: 40 }]],
        [190, 40, 5, [{ w: 70 }, { w: 84 }, { w: 50, c: '#a9bcc0' }, { w: 72 }, { w: 30 }]],
        [370, 76, -4, [{ w: 60, c: '#c9b99e' }, { w: 80 }, { w: 44 }]],
        [110, 250, 6, [{ w: 84 }, { w: 40 }, { w: 64 }, { w: 70, c: '#a9bcc0' }]],
        [440, 250, -7, [{ w: 50 }, { w: 76 }, { w: 60 }, { w: 34 }, { w: 70 }]],
      ];
      let out = '';
      docs.forEach(([x, y, r, rows], i) => {
        out += `<g class="anim from-down fade-later" data-t="${S(0.4 + i * 0.35)}" data-dim="${dim}">${page(x, y, 136, 176, r, rows, { head: '#d9cfbd' })}</g>`;
      });
      const q = [[120, 72], [300, 44], [470, 84], [200, 262], [520, 262]];
      q.forEach(([x, y], i) => {
        out += `<g class="anim pop" data-t="${T('without clearly saying', i * 0.25)}" data-dim="${dim}"><circle cx="${x}" cy="${y}" r="17" fill="${C.ink2}"/>${txt(x, y + 7, '?', { size: 21, weight: 700, fill: '#fff' })}</g>`;
      });
      out += A('pop', dim, `<g filter="url(#sh1)">${aceSheet(220, 110, 210, 280)}</g>`);
      out += A('from-down', T('supports a team response'), `<rect x="190" y="420" width="270" height="56" rx="28" fill="${C.ink}"/>${`<g transform="translate(214 434) scale(1.2)" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I.team}</g>`}${txt(342, 455, 'A team response', { size: 19, weight: 650, fill: '#fff' })}`);
      return svg('Many different protocols replaced by one clear ACE-T sheet', `<defs><filter id="sh1" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#15302e" flood-opacity=".18"/></filter></defs>${out}`);
    },
  },
  {
    key: 'tool', section: 'What it is for', title: 'Three sections, used after detection',
    prompts: [
      { text: 'Acute Triggers', at: 'acute triggers', d: 'ac' },
      { text: 'Patient Experience', at: 'patient experience', d: 'pe' },
      { text: 'Treatment', at: 'and treatment', d: 'tr' },
    ],
    art: (T, S) => {
      const blocks = [['AC', 'Acute Triggers', C.ac, C.acT, 'acute triggers'], ['E', 'Patient Experience', C.pe, C.peT, 'patient experience'], ['T', 'Treatment', C.tr, C.trT, 'and treatment']];
      let out = A('from-left', S(0.4), `<rect x="24" y="200" width="150" height="64" rx="32" fill="#fff" stroke="${C.line}" stroke-width="2"/>${txt(99, 238, 'Positive screen', { size: 17, weight: 650 })}`);
      out += `<path class="draw" data-t="${S(0.9)}" style="--len:80" d="M180 232 H 236" stroke="${C.ink2}" stroke-width="3" stroke-dasharray="80" fill="none" stroke-linecap="round"/>`;
      out += A('fade', S(1.3), `<path d="M226 222 l12 10 -12 10" fill="none" stroke="${C.ink2}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
      out += `<path class="draw" data-t="${S(1.0)}" style="--len:400" d="M250 110 V 354" stroke="${C.line}" stroke-width="3" stroke-dasharray="400" fill="none"/>`;
      blocks.forEach(([l, n, c, t, ph], i) => {
        const y = 62 + i * 116;
        out += A('from-right', T(ph), `<rect x="262" y="${y}" width="352" height="96" rx="18" fill="${t}"/><rect x="278" y="${y + 16}" width="64" height="64" rx="14" fill="${c}"/>${txt(310, y + 58, l, { size: 30, weight: 700, family: SERIF, fill: '#fff' })}${txt(362, y + 57, n, { size: 24, weight: 700, fill: c, anchor: 'start' })}`);
      });
      out += A('from-down', T('treatment of delirium'), `<rect x="262" y="424" width="352" height="40" rx="20" fill="#fff" stroke="${C.line}" stroke-width="2"/>${txt(438, 450, 'For treatment, after detection', { size: 16, weight: 650, fill: C.ink2 })}`);
      out += A('from-down', T('use it alongside'), `<rect x="262" y="472" width="352" height="40" rx="20" fill="${C.ink}"/>${txt(438, 498, 'With clinical assessment and local pathways', { size: 15, weight: 650, fill: '#fff' })}`);
      return svg('The three ACE-T sections follow a positive screen', out);
    },
  },
  {
    key: 'time', section: 'Timing', title: 'The first four hours',
    prompts: [
      { text: 'A practical target for the initial response', at: 'the aim is' },
      { text: 'Escalate urgent concerns immediately', at: 'escalate urgent concerns', d: 'urgent' },
      { text: 'The sections run in parallel', at: 'the sections can be used' },
    ],
    art: (T, S) => {
      const cx = 320, cy = 170, r = 128;
      const pt = a => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
      const seg = Math.PI * 2 / 12;
      const [x1, y1] = pt(seg * 4);
      const arcLen = (r * seg * 4).toFixed(0);
      let ticks = '';
      for (let i = 0; i < 12; i++) {
        const a = i * seg, big = i % 3 === 0, r1 = r - 18, r2 = r - (big ? 32 : 25);
        ticks += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + r2 * Math.sin(a)).toFixed(1)}" y2="${(cy - r2 * Math.cos(a)).toFixed(1)}" stroke="${C.ink}" stroke-opacity="${big ? .7 : .35}" stroke-width="${big ? 4 : 2.5}" stroke-linecap="round"/>`;
      }
      let out = `<circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.line}" stroke-width="14"/>${ticks}`;
      out += `<path class="draw" data-t="${S(0.6)}" style="--len:${arcLen};transition-duration:3.2s" d="M${cx} ${cy - r} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${C.brand || '#0e5c57'}" stroke-width="14" stroke-dasharray="${arcLen}" stroke-linecap="round"/>`;
      out += txt(cx, cy + 22, '4', { size: 84, weight: 700, family: SERIF });
      out += txt(cx, cy + 56, 'HOURS', { size: 18, weight: 700, fill: C.ink2 });
      out += A('pop', T('escalate urgent concerns'), `<circle cx="512" cy="72" r="44" fill="#a8261d" opacity=".14" class="pulse-ring"/><circle cx="512" cy="72" r="36" fill="#a8261d"/><g transform="translate(494 54) scale(1.5)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I.alert}</g>${txt(512, 136, 'Act now', { size: 18, weight: 700, fill: '#a8261d' })}`);
      const lanes = [['Acute Triggers', C.ac, C.acT], ['Patient Experience', C.pe, C.peT], ['Treatment', C.tr, C.trT]];
      lanes.forEach(([n, c, t], i) => {
        const y = 346 + i * 52;
        out += A('fade', T('the sections can be used', 0), `<rect x="70" y="${y}" width="500" height="38" rx="19" fill="${t}"/>${txt(90, y + 25, n, { size: 16, weight: 700, fill: c, anchor: 'start' })}`);
        out += `<g class="anim grow" data-t="${T('the sections can be used', 0.3 + i * 0.15)}"><rect x="250" y="${y + 13}" width="300" height="12" rx="6" fill="${c}"/></g>`;
      });
      return svg('A clock showing a four hour target, with the three sections running at the same time', out);
    },
  },
  {
    key: 'observations', section: 'Acute Triggers', d: 'ac', title: 'What might be contributing?',
    prompts: [
      { text: 'Observations and conscious level', at: 'begin by checking observations' },
      { text: 'Capillary blood glucose', at: 'check capillary' },
      { text: 'Routine blood tests sent?', at: 'whether routine blood tests' },
      { text: 'Escalate abnormal findings', at: 'escalate abnormal' },
    ],
    art: (T, S) => {
      let out = `<rect x="40" y="36" width="560" height="300" rx="24" fill="#173633"/><rect x="58" y="54" width="524" height="92" rx="14" fill="#10292a"/>`;
      const ecgD = 'M70 104 H130 l10 -30 14 58 12 -44 9 16 H250 l10 -30 14 58 12 -44 9 16 H370 l10 -30 14 58 12 -44 9 16 H490 l10 -30 14 58 12 -44 9 16 H570';
      out += `<path d="${ecgD}" fill="none" stroke="#5fd1b9" stroke-opacity=".28" stroke-width="2.5" stroke-linejoin="round"/>`;
      out += `<path d="${ecgD}" fill="none" stroke="#7ff0d6" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" class="ecg" pathLength="600"/>`;
      const tiles = [['Pulse', 'pulse'], ['Blood pressure', 'blood pressure'], ['Oxygen saturation', 'oxygen saturation'], ['Respiratory rate', 'respiratory rate'], ['Temperature', 'temperature'], ['Conscious level', 'conscious level']];
      tiles.forEach(([n, ph], i) => {
        const x = 58 + (i % 3) * 178, y = 162 + Math.floor(i / 3) * 80;
        out += `<g class="anim lit" data-t="${T(ph)}"><rect x="${x}" y="${y}" width="168" height="68" rx="12" fill="#1f4744"/><rect x="${x}" y="${y}" width="6" height="68" rx="3" fill="#5fd1b9"/>${txt(x + 18, y + 41, n, { size: 15.5, weight: 650, fill: '#fff', anchor: 'start' })}</g>`;
      });
      out += labelBadge(110, 408, 34, C.ac, I.drop, 'Glucose', T('check capillary'));
      out += labelBadge(250, 408, 34, C.ac, I.tube, 'Blood tests', T('whether routine blood tests'));
      out += A('from-left', T('escalate abnormal'), `<rect x="340" y="378" width="262" height="62" rx="31" fill="${C.ink}"/><g transform="translate(360 391) scale(1.5)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5"/></g>${txt(488, 416, 'Escalate if abnormal', { size: 17, weight: 650, fill: '#fff' })}`);
      return svg('A monitor with the observations to check, then blood glucose and blood tests', out);
    },
  },
  {
    key: 'needs', section: 'Acute Triggers', d: 'ac', title: 'Familiar checks, in one place',
    prompts: [
      { text: 'Urinary retention and constipation', at: 'assess for urinary' },
      { text: 'Hydration, nutrition and pain', at: 'review hydration' },
      { text: 'Infection, where clinically indicated', at: 'consider infection' },
      { text: 'Has medication review been done?', at: 'check whether medication' },
    ],
    art: (T, S) => {
      const tiles = [['Bladder and bowels', I.bladder, 'urinary retention'], ['Hydration', I.cup, 'hydration'], ['Nutrition', I.food, 'nutrition'], ['Pain', I.bolt, 'and pain'], ['Infection', I.bug, 'consider infection'], ['Medicines', I.pill, 'medication review']];
      let out = `<rect class="draw" data-t="${T('bring together')}" style="--len:2100" x="26" y="42" width="588" height="436" rx="30" fill="none" stroke="${C.ac}" stroke-width="3" stroke-dasharray="2100"/>`;
      tiles.forEach(([n, ic, ph], i) => {
        const x = 50 + (i % 3) * 184, y = 66 + Math.floor(i / 3) * 206;
        out += A('pop', T(ph), `<rect x="${x}" y="${y}" width="172" height="186" rx="20" fill="#fff" stroke="${C.line}" stroke-width="2"/><circle cx="${x + 86}" cy="${y + 76}" r="42" fill="${C.acT}"/><g transform="translate(${x + 86 - 24} ${y + 76 - 24}) scale(2)" fill="none" stroke="${C.ac}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ic}</g>${txt(x + 86, y + 152, n, { size: 17, weight: 650 })}`);
      });
      return svg('Six familiar checks: bladder and bowels, hydration, nutrition, pain, infection and medicines', out);
    },
  },
  {
    key: 'experience', section: 'Patient Experience', d: 'pe', title: 'Ask, listen, observe',
    prompts: [
      { text: 'Look for distress and agitation', at: 'observe for distress' },
      { text: '“How are you feeling?”', at: 'how are you feeling' },
      { text: '“Is anything bothering you?”', at: 'is anything bothering' },
      { text: 'Quiet patients can be distressed too', at: 'a patient does not have to be' },
    ],
    art: (T, S) => {
      const q = A('from-down', T('quick distress'), `<rect x="30" y="34" width="212" height="112" rx="16" fill="#fff" stroke="${C.line}" stroke-width="2"/>${txt(48, 64, 'Distress score (QDAT)', { size: 15, weight: 700, fill: C.pe, anchor: 'start' })}
        ${[0, 1, 2, 3].map(i => `<rect x="${48 + i * 46}" y="80" width="38" height="46" rx="8" fill="${['#e2ebf6', '#c9d9ee', '#a9c2e3', '#7fa3d2'][i]}"/>${txt(67 + i * 46, 112, String(i), { size: 22, weight: 700, family: SERIF, fill: C.ink })}`).join('')}`);
      const ring = A('fade', T('observe for distress'), `<circle cx="186" cy="240" r="40" fill="none" stroke="${C.pe}" stroke-width="3" class="pulse-ring"/>`);
      const b1 = A('pop', T('how are you feeling'), `<rect x="242" y="44" width="220" height="58" rx="18" fill="${C.pe}"/><path d="M372 100 l-6 22 24-22" fill="${C.pe}"/>${txt(352, 80, 'How are you feeling?', { size: 18, weight: 650, fill: '#fff' })}`);
      const b2 = A('pop', T('is anything bothering'), `<rect x="428" y="112" width="200" height="58" rx="18" fill="${C.pe}"/><path d="M440 168 l-10 20 26-20" fill="${C.pe}"/>${txt(528, 138, 'Is anything', { size: 17, weight: 650, fill: '#fff' })}${txt(528, 159, 'bothering you?', { size: 17, weight: 650, fill: '#fff' })}`);
      return bedside({ id: 'w6', badges: false, clock: false, win: false, extras: ring + q + b1 + b2, title: 'A nurse asking a patient how they are feeling, with the four-point distress score' });
    },
  },
  {
    key: 'environment', section: 'Patient Experience', d: 'pe', title: 'Help the person feel secure and oriented',
    prompts: [
      { text: 'Reassure and reorient', at: 'offer reassurance' },
      { text: 'Glasses, hearing aids and communication aids', at: 'check that glasses' },
      { text: 'A calm space, a single room if needed', at: 'consider the environment' },
      { text: 'Relatives, friends or carers', at: 'involve relatives' },
    ],
    art: (T, S) => {
      const e = [
        labelBadge(96, 92, 30, C.pe, I.chat, 'Reassure', T('offer reassurance')),
        labelBadge(236, 70, 30, C.pe, I.glasses, 'Glasses', T('check that glasses')),
        labelBadge(364, 70, 30, C.pe, I.ear, 'Hearing aids', T('hearing aids')),
        labelBadge(566, 238, 30, C.pe, I.room, 'Calm space', T('consider the environment')),
        labelBadge(510, 92, 30, C.pe, I.people, 'Family, friends', T('involve relatives')),
      ].join('');
      return bedside({ id: 'w7', badges: false, clock: false, win: false, extras: e, title: 'Reassurance, glasses, hearing aids, a calm space and family around the patient' });
    },
  },
  {
    key: 'treatment', section: 'Treatment', d: 'tr', title: 'What does this patient need now?',
    prompts: [
      { text: 'Falls risk', at: 'consider falls risk' },
      { text: 'Supportive measures, if needed', at: 'immediate supportive' },
      { text: 'Document delirium or ? delirium, and the score', at: 'document delirium' },
      { text: 'A positive screen needs clinical assessment', at: 'remember that' },
    ],
    art: (T, S) => {
      let out = labelBadge(90, 96, 36, C.tr, I.shield, 'Falls risk', T('consider falls risk'));
      out += labelBadge(90, 236, 36, C.tr, I.drop, 'Fluids', T('fluids or oxygen'));
      out += A('pop', T('fluids or oxygen', 0.4), `<circle cx="90" cy="376" r="42" fill="${C.tr}" opacity=".16"/><circle cx="90" cy="376" r="36" fill="${C.tr}"/>${txt(90, 386, 'O₂', { size: 26, weight: 700, family: SERIF, fill: '#fff' })}${txt(90, 438, 'Oxygen', { size: 17, weight: 650 })}`);
      out += A('fade', T('neither is an automatic'), `${txt(90, 470, 'only if needed', { size: 15, weight: 600, fill: C.ink2, italic: true })}`);
      out += `<rect x="190" y="40" width="410" height="440" rx="18" fill="#fff" stroke="${C.line}" stroke-width="2"/>`;
      out += txt(218, 84, 'Clinical record', { size: 22, weight: 700, family: SERIF, anchor: 'start' });
      for (let i = 0; i < 4; i++) out += `<rect x="218" y="${108 + i * 22}" width="${330 - i * 40}" height="7" rx="3.5" fill="${C.line}"/>`;
      out += A('fade', T('document delirium'), `${txt(218, 238, '? delirium', { size: 40, weight: 700, family: SERIF, italic: true, fill: C.tr, anchor: 'start' })}<path class="draw" data-t="${T('document delirium', 0.5)}" style="--len:220" d="M218 252 q60 8 196 -2" stroke="${C.tr}" stroke-width="3" fill="none" stroke-dasharray="220" stroke-linecap="round"/>`);
      out += A('fade', T('local screening score'), `${txt(218, 306, 'Screening score:', { size: 20, weight: 650, fill: C.ink2, anchor: 'start' })}<rect x="382" y="284" width="64" height="32" rx="8" fill="${C.trT}"/>${txt(414, 307, '4+', { size: 20, weight: 700, fill: C.tr })}`);
      out += A('pop', T('document delirium', 0.2), `<g transform="translate(520 196) rotate(20)"><rect x="-8" y="-60" width="16" height="84" rx="4" fill="${C.ink}"/><path d="M-8 24 L0 42 L8 24 Z" fill="${C.tr}"/></g>`);
      out += A('from-down', T('remember that'), `<rect x="218" y="388" width="356" height="64" rx="14" fill="${C.ink}"/><g transform="translate(236 404) scale(1.3)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I.people}</g>${txt(410, 428, 'Needs clinical assessment', { size: 18, weight: 650, fill: '#fff' })}`);
      return svg('Falls risk, fluids and oxygen if needed, and documenting delirium with the screening score', out);
    },
  },
  {
    key: 'team', section: 'Treatment', d: 'tr', title: 'Share what you have found',
    prompts: [
      { text: 'Tell the clinical team', at: 'communicate the score' },
      { text: 'Inform the family, offer a leaflet', at: 'inform the family' },
      { text: 'Agree the plan with the team', at: 'discuss the treatment plan' },
    ],
    art: (T, S) => {
      const cx = 320, cy = 270;
      const nodes = [
        ['Clinical team', 320, 62, I.team, C.tr, T('communicate the score'), 36],
        ['Family', 150, 424, I.heart, C.pe, T('inform the family'), 32],
        ['Leaflet', 490, 424, I.leaflet, C.pe, T('delirium leaflet'), 32],
        ['Doctors', 92, 280, I.people, C.ac, T('doctors'), 27],
        ['Advanced practitioners', 146, 138, I.people, C.ac, T('advanced practitioners'), 27],
        ['Therapists', 494, 138, I.people, C.ac, T('therapists'), 27],
        ['Pharmacists', 548, 280, I.people, C.ac, T('pharmacists'), 27],
      ];
      let lines = '', nd = '';
      nodes.forEach(([n, x, y, ic, c, t, r]) => {
        const len = Math.hypot(x - cx, y - cy).toFixed(0);
        lines += `<path class="draw" data-t="${t}" style="--len:${len}" d="M${cx} ${cy} L${x} ${y}" stroke="${c}" stroke-width="3" stroke-dasharray="${len}" opacity=".6"/>`;
        nd += A('pop', t, `${badge(x, y, r, c, ic)}${n === 'Advanced practitioners' ? txt(x, y + r + 24, 'Advanced', { size: 15, weight: 650 }) + txt(x, y + r + 42, 'practitioners', { size: 15, weight: 650 }) : txt(x, y + r + 24, n, { size: 16, weight: 650 })}`);
      });
      const ring = `<circle class="draw" data-t="${T('multidisciplinary team')}" style="--len:1260" cx="${cx}" cy="${cy}" r="200" fill="none" stroke="${C.ink2}" stroke-width="2.5" stroke-dasharray="1260" opacity=".4"/>`;
      const centre = `${badge(cx, cy, 46, C.tr, I.clip)}<rect x="${cx - 84}" y="${cy + 58}" width="168" height="28" rx="14" fill="#fbf8f2"/>${txt(cx, cy + 78, 'Nurse, with ACE-T', { size: 17, weight: 700 })}`;
      return svg('The nurse shares findings with the clinical team, the family and colleagues', ring + lines + nd + centre);
    },
  },
  {
    key: 'judgement', section: 'Professional judgement', title: 'Fit the tool to the patient',
    prompts: [
      { text: 'Add what is needed', at: 'what should be added' },
      { text: 'Leave out what is unnecessary', at: 'what is unnecessary' },
      { text: 'Use the locally agreed wording', at: 'wording may differ' },
      { text: 'Repeat relevant actions as care continues', at: 'relevant actions can be repeated' },
    ],
    art: (T, S) => {
      let out = `<circle class="draw" data-t="${T('relevant actions can be repeated')}" style="--len:1320" cx="370" cy="256" r="206" fill="none" stroke="${C.ac}" stroke-width="4" stroke-dasharray="1320" stroke-linecap="round" opacity=".5"/>`;
      out += A('pop', T('relevant actions can be repeated', 0.6), `<circle cx="370" cy="50" r="26" fill="${C.ac}"/><g transform="translate(355 35) scale(1.25)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I.repeat}</g>`);
      out += `<rect x="240" y="92" width="260" height="330" rx="16" fill="#fff" stroke="${C.line}" stroke-width="2"/>`;
      out += txt(264, 132, 'ACE-T', { size: 26, weight: 700, family: SERIF, anchor: 'start' });
      const rows = [C.ac, C.ac, C.pe, C.pe, C.tr, C.tr];
      rows.forEach((c, i) => {
        const y = 156 + i * 34;
        const inner = `<rect x="264" y="${y}" width="14" height="14" rx="3" fill="none" stroke="${c}" stroke-width="2.4"/><rect x="288" y="${y + 4}" width="${170 - (i % 3) * 30}" height="7" rx="3.5" fill="${c}" opacity=".3"/>`;
        out += i === 3 ? `<g class="anim strike" data-t="${T('what is unnecessary')}">${inner}<path d="M260 ${y + 7} H470" stroke="${C.ink2}" stroke-width="2.5"/></g>` : inner;
      });
      out += A('from-right', T('what should be added'), `<rect x="258" y="366" width="224" height="36" rx="10" fill="${C.acT}"/><rect x="270" y="377" width="14" height="14" rx="3" fill="none" stroke="${C.ac}" stroke-width="2.4"/><rect x="294" y="381" width="120" height="7" rx="3.5" fill="${C.ac}" opacity=".5"/>`);
      out += A('pop', T('what should be added'), `<circle cx="520" cy="384" r="22" fill="${C.ac}"/><path d="M520 374v20M510 384h20" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`);
      out += A('pop', T('what is unnecessary'), `<circle cx="520" cy="${156 + 3 * 34 + 7}" r="22" fill="${C.ink2}"/><path d="M510 ${156 + 3 * 34 + 7}h20" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`);
      ['4AT', 'CAM', 'Local wording'].forEach((n, i) => {
        const w = n.length > 4 ? 136 : 76, x = [40, 40, 10][i], y = [170, 226, 282][i];
        out += A('from-left', T('wording may differ', i * 0.25), `<rect x="${x}" y="${y}" width="${w}" height="42" rx="21" fill="#fff" stroke="${C.line}" stroke-width="2"/>${txt(x + w / 2, y + 27, n, { size: 16, weight: 650, fill: C.ink2 })}`);
      });
      return svg('Adding and removing items on the ACE-T sheet, local wording, and repeating actions', out);
    },
  },
  {
    key: 'close', section: 'A practical next step', title: 'A clear place to start',
    prompts: [
      { text: 'Look for acute triggers', at: 'look for acute triggers', d: 'ac' },
      { text: 'Attend to the patient’s experience', at: 'attend to the patient', d: 'pe' },
      { text: 'Bring treatment and communication together', at: 'bring treatment', d: 'tr' },
      { text: 'Try it with your team', at: 'take a look' },
    ],
    art: (T, S) => {
      let out = A('from-down', S(0.5), `<rect x="120" y="22" width="400" height="44" rx="22" fill="#fff" stroke="${C.line}" stroke-width="2"/>${txt(320, 50, 'Early pilot: encouraging staff feedback', { size: 16, weight: 650, fill: C.ink2 })}`);
      out += `<g>${aceSheet(170, 86, 300, 380, { rowsPer: 4, highlight: [T('look for acute triggers'), T('attend to the patient'), T('bring treatment')] })}</g>`;
      out += labelBadge(548, 400, 36, C.ink, I.team, 'Your team', T('take a look'));
      return svg('The ACE-T sheet with its three sections highlighted in turn', out);
    },
  },
];
