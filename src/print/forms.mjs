// HTML sources for the printable downloads (rendered to PDF/PNG with Chromium).
import { DOMAINS, QDAT } from '../data/tool.mjs';
import { fourHourClock, badge, ICONS, C } from '../art/scenes.mjs';

const SITE_URL = 'amaclullich.github.io/ace-t';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const CITE = 'Adapted from Table 1 of Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A. Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems. Submitted for publication, 2026.';

const baseCss = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #15302e; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .serif { font-family: Georgia, "Times New Roman", serif; }
  .wm { font-family: Georgia, serif; font-weight: 700; letter-spacing: -.01em; }
  .wm .a { color: #10756b; } .wm .e { color: #2d5f98; } .wm .d { color: #8a9a96; } .wm .t { color: #a9591a; }
`;

export function bedsideFormHtml({ size = 'A4' } = {}) {
  const letter = size === 'Letter';
  const rowH = letter ? 5.4 : 5.8;
  const fs = letter ? 7.9 : 8.3;
  const domainTable = d => `
    <table class="dom d-${d.id}">
      <colgroup><col style="width:10mm"><col><col style="width:56mm"></colgroup>
      <thead><tr><th colspan="3"><span class="lt">${d.letter}</span><span class="nm">${d.name}${d.sub ? `<span class="sub"> · ${d.sub}</span>` : ''}</span><span class="q">${d.question}</span></th></tr>
      <tr class="colh"><td class="cb">Done</td><td>Action</td><td class="nt">Notes, findings, escalated to</td></tr></thead>
      <tbody>${d.items.map(it => `<tr><td class="cb"><span class="box"></span></td><td class="it">${esc(it.form)}</td><td class="nt"></td></tr>`).join('')}</tbody>
    </table>`;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>ACE-T bedside form (${size})</title><style>
  ${baseCss}
  @page { size: ${letter ? 'letter' : 'A4'}; margin: ${letter ? '8mm 10mm' : '9mm 11mm'}; }
  body { font-size: ${fs}pt; line-height: 1.25; width: ${letter ? '195.9mm' : '188mm'}; }
  .top { display: grid; grid-template-columns: 1fr 72mm; gap: 6mm; align-items: stretch; }
  .wm { font-size: 26pt; line-height: 1; }
  .title-sub { font-size: 10.5pt; font-weight: 700; margin-top: 1.5mm; }
  .title-sub2 { font-size: 8pt; color: #44605c; margin-top: .8mm; }
  .label { border: 1.2px dashed #8a9a96; border-radius: 2mm; padding: 2mm 3mm; font-size: 7.5pt; color: #6b7f7b; min-height: 18mm; }
  .screen { margin-top: 2mm; display: grid; grid-template-columns: 1.1fr 1fr 1.6fr 1fr; gap: 3mm; }
  .fld { border-bottom: 1px solid #9aa7a3; padding: 0 0 1mm; font-size: 7.8pt; color: #44605c; min-height: 7mm; display: flex; align-items: flex-end; }
  .fld b { color: #15302e; margin-right: 2mm; }
  .banner { margin-top: 2.5mm; background: #10302d; color: #fff; border-radius: 2mm; padding: 1.8mm 3.5mm; display: grid; grid-template-columns: 11mm 1fr; gap: 3mm; align-items: center; font-size: 8.2pt; }
  .banner svg { width: 11mm; height: 11mm; }
  .banner strong { font-size: 9.2pt; }
  .banner .urg { color: #ffb8a8; font-weight: 700; }
  table.dom { width: 100%; border-collapse: collapse; margin-top: 2.2mm; table-layout: fixed; }
  table.dom th { text-align: left; padding: 1.2mm 2.4mm; color: #fff; font-weight: 700; }
  .d-ac th { background: #10756b; } .d-pe th { background: #2d5f98; } .d-tr th { background: #a9591a; }
  .lt { font-family: Georgia, serif; font-size: 11pt; display: inline-block; min-width: 9mm; }
  .nm { font-size: 10pt; margin-right: 3mm; } .sub { font-weight: 400; font-size: 8pt; opacity: .9; }
  .q { font-weight: 400; font-style: italic; font-family: Georgia, serif; font-size: 8.2pt; opacity: .95; float: right; margin-top: .6mm; }
  tr.colh td { font-size: 6.6pt; text-transform: uppercase; letter-spacing: .06em; color: #6b7f7b; padding: 1mm 2.4mm .6mm; border-bottom: 1px solid #d3c8b4; }
  table.dom td { border-bottom: 1px solid #e2d9c9; padding: .5mm 2.4mm; height: ${rowH}mm; vertical-align: middle; }
  .d-ac tbody tr:nth-child(odd) td { background: #f2f8f6; } .d-pe tbody tr:nth-child(odd) td { background: #f2f6fb; } .d-tr tbody tr:nth-child(odd) td { background: #fcf5ec; }
  td.cb { text-align: center; padding: 0 !important; }
  td.nt { border-left: 1px solid #e2d9c9; }
  .box { display: inline-block; width: 3.6mm; height: 3.6mm; border: 1.3px solid #15302e; border-radius: .6mm; background: #fff; vertical-align: middle; }
  .bottom { margin-top: 2.4mm; display: grid; grid-template-columns: 1.35fr 1fr; gap: 4mm; }
  .qdat { border: 1px solid #c1d3ea; border-radius: 2mm; padding: 1.6mm 3mm; background: #f2f6fb; font-size: 6.9pt; line-height: 1.22; }
  .qdat h4 { margin: 0 0 1mm; font-size: 8.2pt; color: #214b7a; }
  .qdat ol { margin: .8mm 0 0; padding: 0; list-style: none; display: grid; gap: .3mm; }
  .qdat li { display: grid; grid-template-columns: 4mm 1fr; }
  .qdat li b { color: #214b7a; }
  .sign { border: 1px solid #d3c8b4; border-radius: 2mm; padding: 2mm 3mm; display: grid; gap: 1.2mm; font-size: 7.8pt; }
  .sign .fld { min-height: 5.6mm; }
  .foot { margin-top: 2.4mm; display: flex; justify-content: space-between; gap: 5mm; font-size: 6.2pt; color: #6b7f7b; line-height: 1.3; }
  .foot .u { white-space: nowrap; font-weight: 700; color: #0e5c57; }
  </style></head><body>
  <div class="top">
    <div>
      <div class="wm"><span class="a">AC</span><span class="e">E</span><span class="d">-</span><span class="t">T</span></div>
      <div class="title-sub">Initial nursing response after a positive delirium screen</div>
      <div class="title-sub2">Acute Triggers · Patient Experience · Treatment. Start after a positive screen or when delirium is suspected.</div>
    </div>
    <div class="label">Patient label, or name, date of birth and hospital number</div>
  </div>
  <div class="screen">
    <div class="fld"><b>Date</b></div>
    <div class="fld"><b>Time of screen</b></div>
    <div class="fld"><b>Screening tool</b>&nbsp;4AT&nbsp;<span class="box"></span>&nbsp; Other&nbsp;<span class="box"></span>&nbsp;______</div>
    <div class="fld"><b>Score</b></div>
  </div>
  <div class="banner">
    ${fourHourClock({ dark: true, id: 'pf' })}
    <div><strong>Aim to complete, start or escalate the actions that apply within 4 hours of the positive screen.</strong> <span class="urg">Act on urgent concerns immediately.</span> Work on the three domains in parallel, using clinical judgement, your scope of practice and local policy.</div>
  </div>
  ${DOMAINS.map(domainTable).join('')}
  <div class="bottom">
    <div class="qdat">
      <h4>Quick Distress Assessment Tool (QDAT)</h4>
      Observe the person and ask: <i>${QDAT.ask}</i>
      <ol>${QDAT.levels.map(l => `<li><b>${l.s}</b><span>${esc(l.t)}</span></li>`).join('')}</ol>
    </div>
    <div class="sign">
      <div class="fld"><b>Completed by</b></div>
      <div class="fld"><b>Role</b></div>
      <div class="fld"><b>Signature</b></div>
      <div class="fld"><b>Date and time completed</b></div>
    </div>
  </div>
  <div class="foot"><span>${CITE} Screening tool wording follows the 4AT; record your local tool if different.</span><span class="u">${SITE_URL}</span></div>
  </body></html>`;
}

export function posterHtml() {
  const col = d => `
    <div class="col c-${d.id}">
      <div class="ch"><span class="lt">${d.letter}</span><div><div class="nm">${d.name}</div><div class="q">${d.question}</div></div></div>
      <ul>${d.items.map(it => `<li>${esc(it.t)}${it.d && it.t !== 'Check observations' ? '' : ''}</li>`).join('')}</ul>
    </div>`;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>ACE-T at a glance</title><style>
  ${baseCss}
  @page { size: A4; margin: 0; }
  body { width: 210mm; height: 297mm; background: #f8f4ec; position: relative; overflow: hidden; }
  .pad { padding: 13mm 13mm 0; }
  .wm { font-size: 58pt; line-height: .95; }
  .kick { font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; font-weight: 700; color: #0e5c57; margin-bottom: 3mm; }
  h1 { font-family: Georgia, serif; font-size: 22pt; line-height: 1.12; margin: 3mm 0 0; max-width: 120mm; }
  .head { display: grid; grid-template-columns: 1fr 60mm; gap: 6mm; align-items: center; }
  .band { margin: 7mm 0 0; background: #10302d; color: #e9f1ee; border-radius: 4mm; padding: 5mm 6mm; display: grid; grid-template-columns: 26mm 1fr; gap: 6mm; align-items: center; font-size: 10.5pt; line-height: 1.4; }
  .band svg { width: 26mm; height: 26mm; }
  .band strong { color: #fff; font-size: 12.5pt; display: block; margin-bottom: 1mm; }
  .band .urg { color: #ffb8a8; font-weight: 700; }
  .cols { margin-top: 6mm; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; }
  .col { background: #fffdf9; border: 1px solid #e2d9c9; border-radius: 4mm; overflow: hidden; }
  .ch { display: grid; grid-template-columns: 14mm 1fr; gap: 3mm; align-items: center; padding: 4mm 4mm 3.5mm; color: #fff; }
  .c-ac .ch { background: #10756b; } .c-pe .ch { background: #2d5f98; } .c-tr .ch { background: #a9591a; }
  .lt { font-family: Georgia, serif; font-weight: 700; font-size: 17pt; background: rgba(255,255,255,.18); border-radius: 2.5mm; height: 13mm; display: grid; place-items: center; }
  .nm { font-weight: 700; font-size: 12.5pt; }
  .q { font-family: Georgia, serif; font-style: italic; font-size: 8.6pt; opacity: .95; line-height: 1.3; margin-top: .6mm; }
  .col ul { list-style: none; margin: 0; padding: 3.5mm 4mm 4mm; display: grid; gap: 2.3mm; font-size: 9.1pt; line-height: 1.32; }
  .col li { display: grid; grid-template-columns: 4.5mm 1fr; gap: 1.5mm; }
  .col li::before { content: ""; width: 3.4mm; height: 3.4mm; border-radius: .8mm; margin-top: .6mm; border: 1.4px solid currentColor; }
  .c-ac li::before { color: #10756b; } .c-pe li::before { color: #2d5f98; } .c-tr li::before { color: #a9591a; }
  .flow { margin-top: 6mm; display: grid; grid-template-columns: 1fr 8mm 1fr 8mm 1fr; align-items: center; gap: 2mm; font-size: 9.2pt; }
  .fb { background: #fffdf9; border: 1px solid #e2d9c9; border-radius: 3mm; padding: 3mm 3.5mm; line-height: 1.35; }
  .fb b { display: block; font-size: 10pt; margin-bottom: .6mm; }
  .ar { text-align: center; color: #6b7f7b; font-size: 14pt; }
  .foot { position: absolute; left: 13mm; right: 13mm; bottom: 9mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 7.2pt; color: #6b7f7b; gap: 8mm; line-height: 1.35; }
  .foot .u { font-weight: 700; color: #0e5c57; font-size: 10pt; white-space: nowrap; }
  </style></head><body><div class="pad">
  <div class="head">
    <div>
      <div class="kick">For nurses · Delirium care</div>
      <div class="wm"><span class="a">AC</span><span class="e">E</span><span class="d">-</span><span class="t">T</span></div>
      <h1>The first steps after a positive delirium screen</h1>
    </div>
    <div class="art">${badgeTrio()}</div>
  </div>
  <div class="band">
    ${fourHourClock({ dark: true, id: 'pp' })}
    <div><strong>Aim for four hours</strong>Complete, start or escalate the actions that apply within four hours of the positive screen. <span class="urg">Act on urgent concerns immediately.</span> Work on the three domains in parallel, within your role and local policy.</div>
  </div>
  <div class="cols">${DOMAINS.map(col).join('')}</div>
  <div class="flow">
    <div class="fb"><b>Detect</b>Positive 4AT (4 or more), positive local screen, or suspected delirium</div><div class="ar">→</div>
    <div class="fb"><b>Respond with ACE-T</b>Nursing actions in the first four hours, alongside medical assessment</div><div class="ar">→</div>
    <div class="fb"><b>Shared plan</b>Delirium documented, team and family informed, plan agreed</div>
  </div>
  </div>
  <div class="foot"><span>${CITE}</span><span class="u">${SITE_URL}</span></div>
  </body></html>`;
}

function badgeTrio() {
  return `<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M44 150 Q 110 10 176 150" fill="none" stroke="#44605c" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round" opacity=".5"/>
    ${badge(44, 150, 30, C.ac, ICONS.pulse)}${badge(110, 64, 30, C.pe, ICONS.heart)}${badge(176, 150, 30, C.tr, ICONS.clip)}
  </svg>`;
}

export function ogHtml(heroSvg) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}
  body { width: 1200px; height: 630px; background: #f8f4ec; display: grid; grid-template-columns: 600px 560px; gap: 20px; align-items: center; padding: 0 20px 0 70px; overflow: hidden; }
  .wm { font-size: 110px; line-height: 1; }
  h1 { font-family: Georgia, serif; font-size: 50px; line-height: 1.1; margin: 22px 0 18px; color: #15302e; }
  p { font-size: 25px; color: #44605c; margin: 0; line-height: 1.4; }
  svg { width: 100%; height: auto; }
  </style></head><body><div><div class="wm"><span class="a">AC</span><span class="e">E</span><span class="d">-</span><span class="t">T</span></div><h1>Clear first steps after a positive delirium screen</h1><p>A one-page nursing tool: Acute Triggers, Patient Experience and Treatment.</p></div><div>${heroSvg}</div></body></html>`;
}
