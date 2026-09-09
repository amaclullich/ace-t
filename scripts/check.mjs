import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(root, 'docs');
const pages = (await readdir(docs)).filter((name) => name.endsWith('.html'));
const html = new Map(await Promise.all(pages.map(async (name) => [name, await readFile(join(docs, name), 'utf8')])));
let checkedLinks = 0;
for (const [name, text] of html) {
  assert.equal((text.match(/<h1\b/g) || []).length, 1, `${name}: one primary heading`);
  assert.match(text, /<html lang="en-GB">/, `${name}: language`);
  assert.match(text, /name="viewport"/, `${name}: viewport`);
  assert.match(text, /<title>[^<]+<\/title>/, `${name}: title`);
  assert.match(text, /<main id="main"/, `${name}: main landmark`);
  assert.match(text, /class="skip" href="#main"/, `${name}: skip link`);
  assert.equal((text.match(/aria-current="page"/g) || []).length, name === '404.html' ? 0 : 1, `${name}: active navigation`);
  const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: unique IDs`);
  for (const img of text.matchAll(/<img\b[^>]*>/g)) {
    assert.match(img[0], /\balt="[^"]+"/, `${name}: image alternative`);
    assert.match(img[0], /\bwidth="\d+"/, `${name}: image dimensions`);
    assert.match(img[0], /\bheight="\d+"/, `${name}: image dimensions`);
  }
  for (const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    assert(!url.startsWith('http:'), `${name}: HTTPS external resources`);
    if (/^(?:https:|mailto:)/.test(url)) continue;
    const [path, fragment] = url.split('#');
    assert(!path.startsWith('/'), `${name}: project-path-safe local URL ${url}`);
    const target = path || name;
    await access(join(docs, target));
    if (fragment) assert((html.get(target) || '').includes(`id="${fragment}"`), `${name}: missing anchor ${url}`);
    checkedLinks++;
  }
  assert(!/<(?:iframe|form|input)\b/i.test(text), `${name}: no third-party embeds or patient-data input`);
  for (const resource of text.matchAll(/(?:src|href)="(https:\/\/[^\"]+\.(?:js|css))"/g)) {
    assert(resource[1].startsWith('https://amaclullich.github.io/ace-t/'), `${name}: no third-party runtime dependencies`);
  }
  assert(!/positive screen is not a confirmed diagnosis|treatment after detection, not prevention/i.test(text), `${name}: requested removals`);
  assert(!/\/Users\/|\.docx|HOLD BEFORE|TODO|Lorem ipsum/.test(text), `${name}: no private files or placeholders`);
}
const bedside = html.get('use-ace-t.html');
for (const phrase of ['Document 4AT score and delirium.', 'Communicate the delirium plan.', 'Discuss actions with the team.', 'urinary retention', 'constipation', 'nutrition', 'medication review', 'capillary blood glucose', 'QDAT', 'hearing aids', 'falls risk', 'leaflet', 'urgent concerns', 'four hours', 'in parallel']) {
  assert(bedside.toLowerCase().includes(phrase.toLowerCase()), `Missing source-aligned bedside prompt: ${phrase}`);
}
assert.equal((bedside.match(/class="action-section/g) || []).length, 3, 'Three ACE-T domains');
assert.match(html.get('resources.html'), /did not establish an improvement in patient outcomes/, 'Evidence limitations retained');
const script = await readFile(join(docs, 'assets/site.js'), 'utf8');
assert(!/localStorage|sessionStorage|document\.cookie|fetch\(|XMLHttpRequest/.test(script), 'No tracking or data persistence');
const css = await readFile(join(docs, 'assets/styles.css'), 'utf8');
assert.match(css, /@media print/, 'Print layout');
assert.match(css, /:focus-visible/, 'Keyboard focus indication');
assert.match(css, /max-width: 48rem/, 'Small-screen layout');

function luminance(hex) {
  const values = hex.match(/[a-f\d]{2}/gi).map((v) => parseInt(v, 16) / 255).map((v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
}
const pairs = [['132f3d', 'ffffff'], ['516571', 'ffffff'], ['076c68', 'e9f5f2'], ['245da8', 'edf3fc'], ['845009', 'fff3dd'], ['d2e3ea', '132f3d'], ['516571', 'f3f7f8']];
for (const [foreground, background] of pairs) {
  const a = luminance(foreground), b = luminance(background);
  const contrast = (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
  assert(contrast >= 4.5, `Insufficient text contrast: ${foreground}/${background}: ${contrast.toFixed(2)}`);
}
const image = await readFile(join(docs, 'assets/ace-t-overview.png'));
assert.equal(image.subarray(1,4).toString(), 'PNG', 'Infographic is a real PNG');
assert.equal(image.readUInt32BE(16), 1122, 'Infographic width matches markup');
assert.equal(image.readUInt32BE(20), 1402, 'Infographic height matches markup');
console.log(`PASS: ${pages.length} pages, ${checkedLinks} internal references, ${pairs.length} text colour pairs, required clinical wording, image dimensions, static privacy checks.`);
