import { icon } from './art/icons.mjs';

export const SITE = {
  name: 'ACE-T',
  tagline: 'The first steps in delirium care',
  base: (process.env.PUBLIC_BASE_URL || 'https://amaclullich.github.io/ace-t').replace(/\/$/, ''),
  reviewed: 'September 2026',
  contact: 'alasdair@the4at.com',
};

export const NAV = [
  { href: 'tool.html', label: 'The tool', key: 'tool' },
  { href: 'walkthrough.html', label: 'Walkthrough', key: 'walkthrough' },
  { href: 'why-ace-t.html', label: 'Why ACE-T', key: 'why' },
  { href: 'story.html', label: 'The story', key: 'story' },
];

export const wordmark = (cls = '') => `<span class="wordmark ${cls}" aria-label="ACE-T"><span class="w-ac">AC</span><span class="w-e">E</span><span class="w-dash">-</span><span class="w-t">T</span></span>`;

export function layout({ key, title, description, path, body, scripts = [], ogImage = 'assets/og-ace-t.png', head = '' }) {
  const fullTitle = key === 'home' ? `ACE-T | Clear first steps after a positive delirium screen` : `${title} | ACE-T`;
  const url = `${SITE.base}/${path === 'index.html' ? '' : path}`;
  const nav = NAV.map(n => `<a href="${n.href}"${n.key === key ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  return `<!doctype html>
<html lang="en-GB" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0e5c57">
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
          <li><a href="https://www.the4at.com/" rel="noopener">The 4AT</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-base">
      <span>Content checked against the ACE-T manuscript, ${SITE.reviewed}.</span>
      <span>No cookies, tracking or patient data.</span>
    </div>
  </div>
</footer>
<script src="assets/site.js?v=__JSV__" defer></script>
${scripts.map(s => `<script src="assets/${s}?v=__JSV__" defer></script>`).join('\n')}
</body>
</html>
`;
}
