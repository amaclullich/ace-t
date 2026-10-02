import { icon } from './art/icons.mjs';

export const SITE = {
  name: 'ACE-T',
  tagline: 'The first steps in delirium care',
  base: (process.env.PUBLIC_BASE_URL || 'https://theace-t.com').replace(/\/$/, ''),
  reviewed: 'September 2026',
  contact: 'alasdair@the4at.com',
  updated: '2026-10-02',
};

export const NAV = [
  { href: 'tool.html', label: 'The tool', key: 'tool' },
  { href: 'walkthrough.html', label: 'Walkthrough', key: 'walkthrough' },
  { href: 'why-ace-t.html', label: 'Why ACE-T', key: 'why' },
  { href: 'story.html', label: 'The story', key: 'story' },
];

export const wordmark = (cls = '') => `<span class="wordmark ${cls}" aria-label="ACE-T"><span class="w-ac">AC</span><span class="w-e">E</span><span class="w-dash">-</span><span class="w-t">T</span></span>`;

export function layout({ key, title, description, path, body, scripts = [], ogImage = 'assets/og-ace-t.png', head = '', modified = SITE.updated }) {
  const fullTitle = key === '404' ? `${title} | ACE-T` : title;
  const url = `${SITE.base}/${path === 'index.html' ? '' : path}`;
  const nav = NAV.map(n => `<a href="${n.href}"${n.key === key ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  const ownerId = `${SITE.base}/about.html#ownership`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Thing', '@id': `${SITE.base}/#ace-t`, name: 'ACE-T: initial nursing response to delirium', description: 'A nursing tool covering Acute Triggers, Patient Experience and Treatment after delirium detection.', url: `${SITE.base}/tool.html` },
      { '@type': 'Person', '@id': ownerId, name: 'Alasdair MacLullich',
        url: 'https://www.alasdairmaclullich.com/', jobTitle: 'Professor of Geriatric Medicine',
        affiliation: { '@type': 'Organization', name: 'University of Edinburgh' },
        sameAs: ['https://edwebprofiles.ed.ac.uk/profile/alasdair-maclullich', 'https://www.research.ed.ac.uk/en/persons/alasdair-maclullich/'] },
      { '@type': 'WebSite', '@id': `${SITE.base}/#website`, url: `${SITE.base}/`, name: 'ACE-T',
        inLanguage: 'en-GB', publisher: { '@id': ownerId } },
      { '@type': key === 'about' ? 'AboutPage' : 'WebPage', '@id': `${url}#webpage`,
        url, name: fullTitle, description, inLanguage: 'en-GB', dateModified: modified,
        isPartOf: { '@id': `${SITE.base}/#website` }, publisher: { '@id': ownerId },
        about: { '@id': `${SITE.base}/#ace-t` } }
    ]
  };
  if (key === 'downloads') {
    const documents = [
      ['ACE-T-bedside-tool-A4.pdf', 'ACE-T bedside form, A4', 'application/pdf'],
      ['ACE-T-bedside-tool-US-Letter.pdf', 'ACE-T bedside form, US Letter', 'application/pdf'],
      ['ACE-T-bedside-tool-editable.docx', 'ACE-T bedside form, editable Word', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      ['ACE-T-at-a-glance-A4.pdf', 'ACE-T at a glance, A4', 'application/pdf'],
      ['ACE-T-at-a-glance.png', 'ACE-T at a glance, PNG', 'image/png'],
    ];
    const documentRefs = documents.map(([file]) => ({ '@id': `${SITE.base}/downloads/${file}` }));
    schema['@graph'].find(item => item['@id'] === `${url}#webpage`).hasPart = documentRefs;
    for (const [file, name, encodingFormat] of documents) {
      schema['@graph'].push({ '@type': 'DigitalDocument', '@id': `${SITE.base}/downloads/${file}`, name,
        url: `${SITE.base}/downloads/${file}`, encodingFormat, inLanguage: 'en-GB',
        about: { '@id': `${SITE.base}/#ace-t` }, publisher: { '@id': ownerId },
        isPartOf: { '@id': `${url}#webpage` } });
    }
  }
  const updatedLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${modified}T00:00:00Z`));
  return `<!doctype html>
<html lang="en-GB" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
${key === '404' ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${url}">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
<meta name="theme-color" content="#0e5c57">
<meta name="msvalidate.01" content="1ABA82F102DF1190DEEBABCE5577DBB4">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ACE-T">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.base}/${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="stylesheet" href="assets/site.css?v=__CSSV__">
<script>document.documentElement.classList.remove('no-js');</script>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="./" aria-label="ACE-T home">${wordmark()}<span class="brand-tag">The first steps in delirium care</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">${icon('menu')}<span>Menu</span></button>
    <nav class="nav" id="site-nav" aria-label="Main">
      ${nav}
      <a class="nav-cta" href="downloads.html"${key === 'downloads' ? ' aria-current="page"' : ''}>${icon('download')}Download</a>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        ${wordmark()}
        <p class="mt-1" style="max-width:30em">A nurse-focused tool for the first hours after a positive delirium screen: Acute Triggers, Patient Experience and Treatment. Use it with clinical judgement, your local delirium pathway and the wider team.</p>
      </div>
      <div>
        <h2>Use ACE-T</h2>
        <ul>
          <li><a href="tool.html">The tool</a></li>
          <li><a href="walkthrough.html">Narrated walkthrough</a></li>
          <li><a href="downloads.html">PDF and Word downloads</a></li>
          <li><a href="tool.html#qdat">Quick Distress Assessment Tool</a></li>
        </ul>
      </div>
      <div>
        <h2>Background</h2>
        <ul>
          <li><a href="why-ace-t.html">Why ACE-T</a></li>
          <li><a href="story.html">How ACE-T was developed</a></li>
          <li><a href="about.html">About, citation and contact</a></li>
          <li><button class="analytics-preferences" type="button">Analytics preferences</button></li>
          <li><a href="https://www.the4at.com/" rel="noopener">The 4AT</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-base">
      <span>Content checked against the ACE-T manuscript, ${SITE.reviewed}.</span>
      <span>Maintained by <a href="about.html#ownership">Alasdair MacLullich</a>. Website page updated ${updatedLabel}.</span>
    </div>
  </div>
</footer>
<section class="analytics-choice" aria-labelledby="analytics-choice-title" hidden>
  <div class="wrap">
    <h2 id="analytics-choice-title">Optional website analytics</h2>
    <p>May we use Google Analytics to understand visits and downloads? It starts only if you allow it. We do not use advertising tracking. You can change your choice in the footer. <a href="about.html#privacy">Privacy information</a></p>
    <div class="btn-row"><button class="btn btn-secondary" type="button" data-analytics="denied">Do not allow</button><button class="btn btn-secondary" type="button" data-analytics="granted">Allow analytics</button></div>
  </div>
</section>
<script src="assets/site.js?v=__JSV__" defer></script>
${scripts.map(s => `<script src="assets/${s}?v=__JSV__" defer></script>`).join('\n')}
</body>
</html>
`;
}
