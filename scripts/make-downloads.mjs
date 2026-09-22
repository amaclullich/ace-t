// Renders the printable downloads, preview thumbnails and social images into static/.
// Needs Playwright (Chromium), docx and pdftoppm. Run: node scripts/make-downloads.mjs
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import { bedsideFormHtml, posterHtml, ogHtml } from '../src/print/forms.mjs';
import { bedside } from '../src/art/scenes.mjs';

const D = 'static/downloads', A = 'static/assets';
fs.mkdirSync(D, { recursive: true }); fs.mkdirSync(A, { recursive: true });
const tmp = '/tmp/ace-t-print'; fs.mkdirSync(tmp, { recursive: true });

const b = await chromium.launch();
const page = await b.newPage();
async function pdf(html, out, format) {
  fs.writeFileSync(`${tmp}/p.html`, html);
  await page.goto(`file://${tmp}/p.html`, { waitUntil: 'load' });
  await page.pdf({ path: out, format, printBackground: true, preferCSSPageSize: true });
  const pages = execFileSync('pdfinfo', [out]).toString().match(/Pages:\s+(\d+)/)[1];
  console.log(out, 'pages:', pages);
  if (pages !== '1') throw new Error(out + ' is not one page');
}
await pdf(bedsideFormHtml({ size: 'A4' }), `${D}/ACE-T-bedside-tool-A4.pdf`, 'A4');
await pdf(bedsideFormHtml({ size: 'Letter' }), `${D}/ACE-T-bedside-tool-US-Letter.pdf`, 'Letter');
await pdf(posterHtml(), `${D}/ACE-T-at-a-glance-A4.pdf`, 'A4');

// Poster PNG (A4 at 150 dpi)
execFileSync('pdftoppm', ['-png', '-r', '150', '-singlefile', `${D}/ACE-T-at-a-glance-A4.pdf`, `${D}/ACE-T-at-a-glance`]);
// Thumbnails
const thumb = (pdfFile, out) => { execFileSync('pdftoppm', ['-png', '-r', '40', '-singlefile', pdfFile, out]); };
thumb(`${D}/ACE-T-bedside-tool-A4.pdf`, `${A}/thumb-bedside-tool`);
thumb(`${D}/ACE-T-at-a-glance-A4.pdf`, `${A}/thumb-poster`);

// Word version, then a thumbnail of it via LibreOffice
execFileSync('node', ['scripts/make-docx.mjs', `${D}/ACE-T-bedside-tool-editable.docx`], { stdio: 'inherit' });
execFileSync('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', tmp, `${D}/ACE-T-bedside-tool-editable.docx`], { stdio: 'ignore' });
const docxPages = execFileSync('pdfinfo', [`${tmp}/ACE-T-bedside-tool-editable.pdf`]).toString().match(/Pages:\s+(\d+)/)[1];
console.log('docx pages (LibreOffice):', docxPages);
execFileSync('pdftoppm', ['-png', '-r', '40', '-f', '1', '-singlefile', `${tmp}/ACE-T-bedside-tool-editable.pdf`, `${A}/thumb-bedside-tool-docx`]);

// Social card and touch icon
const og = await b.newPage({ viewport: { width: 1200, height: 630 } });
fs.writeFileSync(`${tmp}/og.html`, ogHtml(bedside({ id: 'og' })));
await og.goto(`file://${tmp}/og.html`); await og.screenshot({ path: `${A}/og-ace-t.png` });
const ic = await b.newPage({ viewport: { width: 180, height: 180 } });
await ic.setContent(`<html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180"><rect width="64" height="64" fill="#0e5c57"/><text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="36" fill="#fff">A</text><circle cx="18" cy="54" r="4" fill="#6fd0c0"/><circle cx="32" cy="54" r="4" fill="#9dbdea"/><circle cx="46" cy="54" r="4" fill="#f0b37a"/></svg></body></html>`);
await ic.screenshot({ path: `${A}/apple-touch-icon.png` });
await b.close();
console.log('done');
