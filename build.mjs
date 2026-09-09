import { mkdir, writeFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'docs');
const base = (process.env.PUBLIC_BASE_URL || 'https://amaclullich.github.io/ace-t').replace(/\/$/, '');
const reviewed = '9 September 2026';
const arrow = '<span class="arrow" aria-hidden="true">→</span>';
const externalArrow = '<span aria-hidden="true">↗</span>';
const links = {
  fourAT: 'https://www.the4at.com/',
  fourATGuide: 'https://www.the4at.com/userguide',
  fourATDownload: 'https://www.the4at.com/4at-download',
  nice: 'https://www.nice.org.uk/guidance/cg103/chapter/Recommendations',
  families: 'https://deliriumsupport.com/',
  academy: 'https://deliriumacademy.com/',
};

const nav = [
  ['index.html', 'Overview'],
  ['use-ace-t.html', 'Use ACE-T'],
  ['delirium-and-4at.html', 'Delirium & the 4AT'],
  ['resources.html', 'Resources'],
];
const button = (href, label, secondary = false) => `<a class="button${secondary ? ' secondary' : ''}" href="${href}">${label} ${arrow}</a>`;
const printButton = '<button class="button secondary" type="button" data-print hidden>Print this guide <span aria-hidden="true">↓</span></button>';
const timing = `<div class="timing"><div class="time-label"><span>Aim for the first</span><strong>4 hours</strong></div><div><p>Complete, initiate or escalate the applicable ACE-T actions within four hours of a positive delirium screen.</p><p><strong>Act immediately on urgent concerns.</strong> Actions can happen in parallel; the four-hour target is not a reason to wait.</p></div></div>`;

function layout({ file, title, description, body, pageClass = '' }) {
  const canonical = `${base}/${file === 'index.html' ? '' : file}`;
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#132f3d">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${title}</title>
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ACE-T">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles.css">
  <script src="assets/site.js" defer></script>
</head>
<body class="${pageClass}">
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="index.html" aria-label="ACE-T home"><span class="wordmark">ACE-T</span><span class="brand-note">The first steps<br>in delirium care</span></a>
    <nav class="main-nav" aria-label="Main navigation">${nav.map(([href, label]) => `<a href="${href}"${href === file ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
  </div></header>
  <main id="main" tabindex="-1">${body}</main>
  <footer class="site-footer"><div class="wrap footer-inner"><div>
    <p class="footer-title">ACE-T · Nurse-focused delirium care</p>
    <p class="footer-note">An initial-response guide to support clinical judgement and local pathways. Use within your role and alongside the wider clinical team.</p>
    <div class="footer-links"><a href="resources.html#evidence">About & evidence</a><a href="resources.html#site-information">Site information & privacy</a><a href="mailto:alasdair@the4at.com">Contact</a><a href="${links.fourAT}">The 4AT ${externalArrow}</a></div>
  </div><p class="footer-date">Content reviewed<br><time datetime="2026-09-09">${reviewed}</time></p></div></footer>
</body>
</html>`;
}

function heading(kicker, title, lead, actions = '') {
  return `<div class="page-heading"><div class="wrap"><p class="kicker">${kicker}</p><h1>${title}</h1><p class="lead">${lead}</p>${actions ? `<div class="actions">${actions}</div>` : ''}</div></div>`;
}

function article(anchors, content, note = '') {
  return `<div class="wrap page-layout"><aside class="page-rail"><p class="rail-label">On this page</p><nav aria-label="On this page">${anchors.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav>${note ? `<p class="rail-note">${note}</p>` : ''}</aside><div class="article">${content}</div></div>`;
}

const acute = [
  ['Check observations.', 'Pulse, blood pressure, oxygen saturation, respiratory rate, temperature and conscious level.'],
  ['Check capillary blood glucose.', ''],
  ['Check whether routine blood tests have been sent.', 'Follow local policy for investigations and escalation.'],
  ['Assess for urinary retention and constipation.', ''],
  ['Assess hydration and nutrition.', ''],
  ['Initiate or review an infection work-up where appropriate.', 'Use clinical findings and local guidance.'],
  ['Assess pain.', 'Record whether it is absent, mild, moderate or severe.'],
  ['Check that a medication review has been completed.', ''],
];
const experience = [
  ['Assess distress.', 'Observe the person and ask how they are feeling. Consider the Quick Distress Assessment Tool (QDAT), where appropriate.'],
  ['Note agitation.', ''],
  ['Reassure and reorient.', 'Explain where the person is, what is happening and who you are.'],
  ['Consider the care environment.', 'For example, whether a single room would be appropriate.'],
  ['Make sensory and communication aids available.', 'Check glasses, hearing aids and other communication aids.'],
  ['Consider involving relatives, friends or carers.', ''],
];
const treatment = [
  ['Assess falls risk.', ''],
  ['Provide immediate support if needed.', 'Fluids, oxygen and other support as appropriate, within local policy and your scope of practice.'],
  ['Document 4AT score and delirium.', 'Use “delirium” or “? delirium” as appropriate. Where another local delirium assessment tool is used, record its score.'],
  ['Communicate the delirium plan.', 'Share the screening score and relevant findings with the clinical team.'],
  ['Discuss actions with the team.', 'Agree the treatment plan with the multidisciplinary team, including what needs to happen next.'],
  ['Inform the family where appropriate.', 'Offer delirium information to the patient and family, including a leaflet where appropriate.'],
];
function actionSection(id, name, letters, strap, items, className = '') {
  return `<section class="action-section ${className}" id="${id}"><div class="action-heading"><span class="letters" aria-hidden="true">${letters}</span><div><h2>${name}</h2><p>${strap}</p></div></div><ul class="action-list">${items.map(([label, detail]) => `<li><div><strong>${label}</strong>${detail ? ` <span class="detail">${detail}</span>` : ''}</div></li>`).join('')}</ul></section>`;
}

const pages = [
  {
    file: 'index.html',
    title: 'ACE-T | The first steps in delirium care',
    description: 'A practical, nurse-focused guide to the first steps after delirium is detected: acute triggers, patient experience, treatment and communication.',
    body: `<div class="wrap"><section class="hero" aria-labelledby="home-title"><div><p class="kicker">A practical guide for nurses</p><h1 id="home-title">The first steps in delirium care.</h1><p class="lead">ACE-T helps you turn delirium detection into timely, coordinated care — with clear nursing actions across three domains.</p><div class="actions">${button('use-ace-t.html', 'Use ACE-T')}<a class="text-link" href="delirium-and-4at.html">Understand delirium treatment</a></div></div><div class="domain-index"><p class="index-label">Three domains. One coordinated response.</p><a class="domain-link" href="use-ace-t.html#acute-triggers"><span class="letters" aria-hidden="true">AC</span><span><strong>Acute triggers</strong><span class="description">Check for problems contributing to delirium.</span></span>${arrow}</a><a class="domain-link experience" href="use-ace-t.html#patient-experience"><span class="letters" aria-hidden="true">E</span><span><strong>Patient experience</strong><span class="description">Recognise distress. Reassure and support.</span></span>${arrow}</a><a class="domain-link treatment" href="use-ace-t.html#treatment"><span class="letters" aria-hidden="true">T</span><span><strong>Treatment & communication</strong><span class="description">Act, document and share the delirium plan.</span></span>${arrow}</a></div></section>${timing}<section class="section split-section" aria-labelledby="next-title"><div><p class="kicker">From recognition to response</p><h2 id="next-title">A starting point for what to do next.</h2></div><div class="intro-copy"><p>Nurses are often the first to recognise delirium and carry out a delirium assessment such as the 4AT. ACE-T gives structure to the initial bedside response after a positive screen or recognition of suspected delirium.</p><p>It brings together checks for acute triggers, attention to the patient’s experience, and treatment and communication. It supports nursing care alongside medical assessment and the wider team’s work.</p><div class="plain-links"><a href="delirium-and-4at.html#why-4at">Why we use the 4AT ${arrow}</a><a href="resources.html#evidence">How ACE-T was developed ${arrow}</a></div></div></section></div><section class="soft-band"><div class="wrap handover"><div><p class="kicker">Make the plan visible</p><h2>Document. Communicate. Discuss.</h2></div><ul class="handover-list"><li>Document the <strong>4AT score and delirium</strong>.</li><li><strong>Communicate the delirium plan</strong> and relevant findings.</li><li><strong>Discuss actions with the team</strong> and inform family where appropriate.</li></ul></div></section>`,
  },
  {
    file: 'use-ace-t.html',
    title: 'Use ACE-T | A bedside guide for nurses',
    description: 'Nursing actions across acute triggers, patient experience, and treatment and communication, with a practical four-hour target and immediate escalation for urgent concerns.',
    pageClass: 'bedside-guide',
    body: heading('The bedside guide', 'Use ACE-T', 'Start after a positive delirium screen or recognition of suspected delirium. Consider each domain and complete, initiate or escalate the actions that apply.', printButton + '<a class="text-link" href="resources.html#downloads">Get the overview infographic</a>') + article([
      ['start', 'Before you start'], ['acute-triggers', 'AC · Acute triggers'], ['patient-experience', 'E · Patient experience'], ['treatment', 'T · Treatment & communication'], ['ongoing-care', 'Continue the care'],
    ], `<section id="start">${timing}<p class="source-note">Use clinical judgement and local pathways. ACE-T does not require nurses to diagnose the underlying cause or arrange investigations outside their role.</p></section>${actionSection('acute-triggers', 'Acute triggers', 'AC', 'Look for problems that need assessment or action.', acute)}${actionSection('patient-experience', 'Patient experience', 'E', 'Attend to the person as well as the clinical findings.', experience, 'experience')}${actionSection('treatment', 'Treatment & communication', 'T', 'Provide support and make the next steps clear.', treatment, 'treatment')}<section id="ongoing-care"><h2>Continue the care</h2><p>ACE-T provides an initial response. Revisit relevant actions as the person’s condition changes, and continue the wider delirium treatment plan. Hand over the delirium, the assessment score, actions taken and outstanding concerns.</p><p class="source-note">Adapted from Table 1 of the current ACE-T development and pilot manuscript. This web guide uses 4AT wording; the manuscript also accommodates local delirium screening tools. <a href="resources.html#evidence">Read about the source and evidence.</a></p></section>`, 'A clinical prompt, not a patient record. There is no need to enter patient information on this site.'),
  },
  {
    file: 'delirium-and-4at.html',
    title: 'Delirium treatment and the 4AT | ACE-T',
    description: 'Understand delirium, what treatment involves, why nurses use the 4AT, and how ACE-T supports the initial response after detection.',
    body: heading('The clinical background', 'Delirium treatment & the 4AT', 'Recognising delirium is the beginning of a response. Treatment means addressing contributing problems, relieving distress and supporting recovery.') + article([
      ['what-is-delirium', 'What delirium is'], ['treatment-means', 'What treatment involves'], ['why-4at', 'Why we use the 4AT'], ['together', 'Using the tools together'],
    ], `<section id="what-is-delirium"><h2>A sudden change in brain function</h2><p>Delirium is an acute change in mental functioning that develops over hours or days and often fluctuates. A person may have difficulty paying attention, become confused, or be unusually sleepy or agitated.</p><p>Some people become quiet and withdrawn rather than restless. Delirium can also occur in someone who already has dementia. Knowing what the person is usually like helps the team recognise a new change.</p><p class="source-note">Background: <a href="${links.nice}">NICE delirium guideline</a>.</p></section><section id="treatment-means"><h2>Treatment has several parts</h2><p>There is no single bedside action that covers all of delirium treatment. The ACE-T paper uses <strong>multidomain delirium treatment</strong> for the package of actions involved.</p><ol class="sequence"><li><div><h3>Find and address contributing problems</h3><p>Assess acute illness and other triggers, including pain, hydration, urinary retention, constipation and medicines. Arrange or escalate further assessment within local pathways.</p></div></li><li><div><h3>Respond to the person’s experience</h3><p>Assess distress, offer reassurance and reorientation, support communication, and involve people who know the patient where appropriate.</p></div></li><li><div><h3>Support safety, care and recovery</h3><p>Provide the support the person needs, document delirium, and coordinate a treatment plan with the multidisciplinary team.</p></div></li></ol><p>Nursing and medical actions work together. ACE-T focuses on the initial nursing response; the full treatment plan continues beyond these first steps.</p></section><section id="why-4at"><h2>Why we use the 4AT</h2><p>Delirium can be missed, especially when a patient is quiet or drowsy. The <a href="${links.fourAT}">4AT</a> gives staff a brief, structured bedside assessment for delirium and cognitive impairment.</p><p>Its four items cover alertness, brief orientation questions, attention, and acute change or fluctuation. A score of <strong>4 or more suggests delirium</strong> and should prompt clinical assessment and an appropriate response.</p><p>Interpret the result in the whole clinical context, including changes from the person’s usual state. The <a href="${links.fourATGuide}">official 4AT user guide</a> explains administration and scoring.</p><div class="callout"><p><strong>The 4AT supports detection. ACE-T supports the initial response.</strong> Document the 4AT score and delirium, communicate the delirium plan, and discuss actions with the team.</p></div><p class="source-note">Use the assessment tool appropriate to your setting. NICE recommends CAM-ICU or ICDSC in critical care and the recovery room after surgery.</p></section><section id="together"><h2>Connect detection to care</h2><p>After a positive screen or recognition of suspected delirium, begin the applicable ACE-T actions and involve the clinical team. Urgent concerns need immediate action; the four-hour target helps organise the remaining initial response.</p><div class="actions">${button('use-ace-t.html', 'Open the bedside guide')}${button(links.fourATDownload, 'Get the 4AT', true)}</div><p class="source-note">Sources: the <a href="resources.html#evidence">current ACE-T manuscript</a>, the <a href="${links.fourATGuide}">4AT user guide</a>, and <a href="${links.nice}">NICE recommendations on delirium assessment and treatment</a>.</p></section>`),
  },
  {
    file: 'resources.html',
    title: 'Resources and evidence | ACE-T',
    description: 'The ACE-T overview infographic, printable bedside guide, development and pilot evidence, and trusted delirium and 4AT resources.',
    body: heading('Keep the essentials close', 'Resources & evidence', 'An overview to share, a bedside guide to print, and the background to ACE-T.') + article([
      ['downloads', 'ACE-T resources'], ['evidence', 'Development & evidence'], ['further-reading', 'Further reading'], ['site-information', 'About this site'],
    ], `<section id="downloads"><h2>ACE-T resources</h2><div class="preview"><div><p class="kicker">A one-page overview</p><h3>The ACE-T infographic</h3><p>A concise visual summary of the three domains and the first four hours. Use the bedside guide for the fuller nursing prompts.</p><div class="actions">${button('assets/ace-t-overview.png', 'View infographic')}<a class="text-link" href="assets/ace-t-overview.png" download="ACE-T-overview.png">Download PNG</a></div><p class="source-note">Text is also available in the <a href="use-ace-t.html">accessible bedside guide</a>.</p></div><a href="assets/ace-t-overview.png" aria-label="View the full ACE-T overview infographic"><img src="assets/ace-t-overview.png" width="1122" height="1402" loading="lazy" alt="ACE-T overview: acute triggers, patient experience, and treatment and communication in the first four hours. Full text is available in the bedside guide."></a></div><div class="resource-row"><div><h3>Printable bedside guide</h3><p>The three domains, action prompts and escalation advice. Use your browser’s print option to print or save a PDF.</p></div><a class="text-link" href="use-ace-t.html">Open guide ${arrow}</a></div></section><section id="evidence"><h2>Development & evidence</h2><p>ACE-T was developed by clinicians to give nurses a practical starting point after delirium is detected. Its three domains bring together acute triggers, patient experience, and treatment and communication.</p><p>The developmental pilot involved teams in Edinburgh, Frankfurt and Stanford. It examined staff views and clinical documentation before and after introduction. Feedback informed the revised nursing prompts and the four-hour target.</p><div class="callout warning"><p><strong>The evidence is preliminary.</strong> Staff feedback was encouraging, and delirium documentation was more frequent after introduction. The pilot was small and non-randomised; it did not establish an improvement in patient outcomes or test completion within four hours.</p></div><h3>The source for this website</h3><div class="publication"><p>Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A.</p><p><cite>Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems.</cite></p><p class="small">Current manuscript for submission; version reviewed September 2026. The manuscript, including its revised tool in Table 1, is the source of authority for the ACE-T content here. A publication link will be added when available.</p></div><p class="source-note">The web guide is a concise adaptation, with “document 4AT score” wording. ACE-T can also follow other locally used delirium screening tools.</p></section><section id="further-reading"><h2>Further reading</h2><div class="resource-row"><div><h3>The 4AT</h3><p>The assessment tool, official user guide and downloadable versions.</p></div><a class="text-link" href="${links.fourAT}">Visit the4AT.com ${externalArrow}</a></div><div class="resource-row"><div><h3>NICE delirium guideline</h3><p>Recommendations for assessment, diagnosis and management in hospital and long-term care.</p></div><a class="text-link" href="${links.nice}">Read guidance ${externalArrow}</a></div><div class="resource-row"><div><h3>Delirium Support</h3><p>Plain-language information for patients, families and carers.</p></div><a class="text-link" href="${links.families}">Visit site ${externalArrow}</a></div><div class="resource-row"><div><h3>Delirium Academy</h3><p>Delirium education for healthcare professionals and care staff.</p></div><a class="text-link" href="${links.academy}">Visit site ${externalArrow}</a></div></section><section id="site-information"><h2>About this site</h2><p>This site is maintained by Professor Alasdair MacLullich. It is an educational guide for healthcare professionals, with a particular focus on nursing practice. Apply clinical judgement, local policy and the treatment plan agreed with the clinical team.</p><h3>Content and accessibility</h3><p>Content was checked against the current ACE-T manuscript on ${reviewed}. The site uses readable text, keyboard-accessible links, layouts that adapt to smaller screens, and an HTML alternative to the infographic. To report a content or accessibility problem, email <a href="mailto:alasdair@the4at.com">alasdair@the4at.com</a>.</p><h3>Privacy</h3><p>This site has no analytics, advertising, forms or patient-data entry. It does not set cookies or use browser storage. The hosting provider, GitHub Pages, may process technical request information; see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s privacy statement</a>. External websites have their own privacy policies. Please do not email identifiable patient information.</p></section>`),
  },
];

await mkdir(join(out, 'assets'), { recursive: true });
await cp(join(root, 'assets'), join(out, 'assets'), { recursive: true });
await cp(join(root, 'src/styles.css'), join(out, 'assets/styles.css'));
await cp(join(root, 'src/site.js'), join(out, 'assets/site.js'));
for (const page of pages) await writeFile(join(out, page.file), layout(page));
await writeFile(join(out, '.nojekyll'), '');
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(({file}) => `<url><loc>${base}/${file === 'index.html' ? '' : file}</loc><lastmod>2026-09-09</lastmod></url>`).join('')}</urlset>\n`);
// Absolute paths let the 404 page work from an arbitrarily nested missing URL.
const missing = layout({file: '404.html', title: 'Page not found | ACE-T', description: 'Return to the ACE-T guide to initial delirium care.', body: heading('ACE-T', 'This page could not be found.', 'The link may have changed. You can return to the overview or open the bedside guide.', button('index.html', 'ACE-T overview') + button('use-ace-t.html', 'Bedside guide', true))});
await writeFile(join(out, '404.html'), missing.replace(/href="(?!https:|mailto:|#)([^"]+)"/g, (_, path) => `href="${base}/${path}"`).replace('src="assets/site.js"', `src="${base}/assets/site.js"`).replace('<meta name="description"', '<meta name="robots" content="noindex">\n  <meta name="description"'));
console.log(`Built ${pages.length} pages and a 404 page in docs/. Base URL: ${base}`);
