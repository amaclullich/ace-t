// Editable Word version of the ACE-T bedside form. Monochrome by design (black, white and greys).
import fs from 'node:fs';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  AlignmentType, VerticalAlign, TableLayoutType, Footer, PageOrientation,
} from 'docx';
import { DOMAINS, QDAT } from '../src/data/tool.mjs';

const FONT = 'Arial';
const W = 10466; // A4 width 11906 minus 720 x 2 margins
const thin = { style: BorderStyle.SINGLE, size: 4, color: '8C8C8C' };
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const allThin = { top: thin, bottom: thin, left: thin, right: thin };
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 17, bold: o.bold, italics: o.italics, color: o.color || '000000' });
const para = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { before: o.before || 0, after: o.after || 0, line: o.line || 228 }, alignment: o.align, keepNext: o.keepNext });
const cell = (children, width, o = {}) => new TableCell({
  children: Array.isArray(children) ? children : [children], width: { size: width, type: WidthType.DXA },
  borders: o.borders || allThin, shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  verticalAlign: o.v || VerticalAlign.CENTER, margins: { top: o.pt ?? 28, bottom: o.pb ?? 28, left: 100, right: 100 }, columnSpan: o.span,
});
const BOX = '☐';

function header() {
  const left = [
    para(run('ACE-T', { size: 44, bold: true }), { line: 240 }),
    para(run('Initial nursing response after a positive delirium screen', { size: 22, bold: true }), { before: 40 }),
    para(run('Acute Triggers · Patient Experience · Treatment. Start after a positive screen or when delirium is suspected.', { size: 16, color: '404040' }), { before: 40 }),
  ];
  const right = [para(run('Patient label, or name, date of birth and hospital number', { size: 15, color: '595959' }))];
  const dashed = { style: BorderStyle.DASHED, size: 6, color: '808080' };
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [6466, 4000], layout: TableLayoutType.FIXED,
    rows: [new TableRow({ height: { value: 1050, rule: 'atLeast' }, children: [
      cell(left, 6466, { borders: { top: none, bottom: none, left: none, right: none }, v: VerticalAlign.TOP, pt: 0 }),
      cell(right, 4000, { borders: { top: dashed, bottom: dashed, left: dashed, right: dashed }, v: VerticalAlign.TOP }),
    ] })],
  });
}

function screenRow2() {
  const widths = [2200, 2300, 3766, 2200];
  const mk = (i, label, extra = '') => new TableCell({
    width: { size: widths[i], type: WidthType.DXA }, borders: { top: none, left: none, right: none, bottom: thin }, verticalAlign: VerticalAlign.BOTTOM,
    margins: { top: 180, bottom: 40, left: 60, right: 160 },
    children: [para([run(label + ' ', { bold: true, size: 16 }), run(extra, { size: 16, color: '404040' })])],
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, rows: [new TableRow({ children: [mk(0, 'Date'), mk(1, 'Time of screen'), mk(2, 'Screening tool', `4AT ${BOX}   Other ${BOX} ________`), mk(3, 'Score')] })] });
}

function banner() {
  const b = { style: BorderStyle.SINGLE, size: 12, color: '000000' };
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W], layout: TableLayoutType.FIXED,
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA }, borders: { top: b, bottom: b, left: b, right: b }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'EDEDED' },
      margins: { top: 90, bottom: 90, left: 140, right: 140 },
      children: [para([
        run('Aim to complete, start or escalate the actions that apply within 4 hours of the positive screen. ', { bold: true, size: 17 }),
        run('Act on urgent concerns immediately. ', { bold: true, size: 17 }),
        run('Work on the three domains in parallel, using clinical judgement, your scope of practice and local policy.', { size: 17 }),
      ])],
    })] })],
  });
}

function domainTable(d) {
  const widths = [620, 6946, 2900];
  const head = new TableRow({ tableHeader: true, cantSplit: true, children: [new TableCell({
    columnSpan: 3, width: { size: W, type: WidthType.DXA }, borders: allThin, shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'D9D9D9' },
    margins: { top: 50, bottom: 50, left: 120, right: 120 },
    children: [para([run(`${d.letter}   ${d.name}${d.sub ? ` · ${d.sub}` : ''}`, { bold: true, size: 20 }), run(`    ${d.question}`, { italics: true, size: 16, color: '404040' })])],
  })] });
  const colh = new TableRow({ tableHeader: true, cantSplit: true, children: [
    cell(para(run('Done', { size: 13, bold: true, color: '595959' }), { align: AlignmentType.CENTER }), widths[0], { pt: 20, pb: 20 }),
    cell(para(run('Action', { size: 13, bold: true, color: '595959' })), widths[1], { pt: 20, pb: 20 }),
    cell(para(run('Notes, findings, escalated to', { size: 13, bold: true, color: '595959' })), widths[2], { pt: 20, pb: 20 }),
  ] });
  const rows = d.items.map((it, i) => new TableRow({ cantSplit: true, height: { value: 318, rule: 'atLeast' }, children: [
    cell(para(run(BOX, { size: 20 }), { align: AlignmentType.CENTER }), widths[0], { fill: i % 2 ? undefined : 'F5F5F5' }),
    cell(para(run(it.form, { size: 16 })), widths[1], { fill: i % 2 ? undefined : 'F5F5F5' }),
    cell(para(run('')), widths[2], { fill: i % 2 ? undefined : 'F5F5F5' }),
  ] }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, rows: [head, colh, ...rows] });
}

function bottom() {
  const qd = [
    para(run('Quick Distress Assessment Tool (QDAT)', { bold: true, size: 16 })),
    para([run('Observe the person and ask: ', { size: 14 }), run(QDAT.ask, { italics: true, size: 14 })], { before: 20, line: 210 }),
    ...QDAT.levels.map(l => para([run(`${l.s}  `, { bold: true, size: 14 }), run(l.t, { size: 14 })], { before: 20, line: 210 })),
  ];
  const sgRows = ['Completed by', 'Role', 'Signature', 'Date and time completed'].map(l => new TableRow({ height: { value: 440, rule: 'atLeast' }, children: [new TableCell({
    width: { size: 4000, type: WidthType.DXA }, verticalAlign: VerticalAlign.BOTTOM, margins: { top: 20, bottom: 20, left: 0, right: 0 },
    borders: { top: none, left: none, right: none, bottom: thin },
    children: [para(run(l, { bold: true, size: 15 }))],
  })] }));
  const sg = [new Table({ width: { size: 4000, type: WidthType.DXA }, columnWidths: [4000], layout: TableLayoutType.FIXED, rows: sgRows }), para(run(''))];
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [6066, 4400], layout: TableLayoutType.FIXED, rows: [new TableRow({ cantSplit: true, children: [
    cell(qd, 6066, { v: VerticalAlign.TOP, pt: 60, pb: 60 }),
    cell(sg, 4400, { v: VerticalAlign.TOP, pt: 0, pb: 60 }),
  ] })] });
}

const spacer = (h = 100) => new Paragraph({ children: [], spacing: { before: 0, after: 0, line: h, lineRule: 'exact' } });

const doc = new Document({
  creator: 'ACE-T', title: 'ACE-T bedside form (editable)', description: 'ACE-T: initial nursing response after a positive delirium screen',
  styles: { default: { document: { run: { font: FONT, size: 17 } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT }, margin: { top: 560, bottom: 700, left: 720, right: 720, footer: 280 } } },
    footers: { default: new Footer({ children: [para([
      run('Adapted from Table 1 of Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A. Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems. Submitted for publication, 2026. ', { size: 12, color: '595959' }),
      run('amaclullich.github.io/ace-t', { size: 12, bold: true, color: '000000' }),
    ])] }) },
    children: [
      header(), spacer(120), screenRow2(), spacer(140), banner(), spacer(120),
      domainTable(DOMAINS[0]), spacer(100), domainTable(DOMAINS[1]), spacer(100), domainTable(DOMAINS[2]), spacer(120),
      bottom(),
    ],
  }],
});

const out = process.argv[2] || 'static/downloads/ACE-T-bedside-tool-editable.docx';
fs.writeFileSync(out, await Packer.toBuffer(doc));
console.log('wrote', out);
