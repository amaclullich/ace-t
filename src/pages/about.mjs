import { SITE } from '../layout.mjs';

export default {
  key: 'about', path: 'about.html', title: 'About this site',
  description: 'Who maintains the ACE-T website, the development team, evidence and limitations, sources, related delirium resources and contact details.',
  body: () => `
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">About</p>
    <h1>About this site</h1>
    <p class="lede">An educational website for nurses and other healthcare staff about ACE-T, a tool for the first hours after a positive delirium screen.</p>
  </div>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="wrap grid-2" style="align-items:start">
    <div class="card" id="ownership">
      <h2 style="font-size:1.5rem">Who maintains this site</h2>
      <p>This site is maintained by <a href="https://www.alasdairmaclullich.com/">Professor Alasdair MacLullich</a>, Professor of Geriatric Medicine at the University of Edinburgh and a geriatrician at the Royal Infirmary of Edinburgh. He is one of the developers of ACE-T and the 4AT.</p>
      <p>His <a href="https://edwebprofiles.ed.ac.uk/profile/alasdair-maclullich">University of Edinburgh profile</a> describes his clinical and academic work. His <a href="https://www.research.ed.ac.uk/en/persons/alasdair-maclullich/">research profile</a> lists his publications.</p>
      <p>ACE-T was developed by a team of nurses and doctors in Edinburgh, Frankfurt and Stanford. <a href="story.html#team">See the authors and affiliations</a>.</p>
    </div>
    <div class="card" id="evidence">
      <h2 style="font-size:1.5rem">Evidence and intended use</h2>
      <p>ACE-T is intended for nurses and other healthcare staff caring for someone with suspected delirium after detection. Use it with clinical assessment, local policy and the wider team.</p>
      <p>The evidence described here comes from a development study and a small pilot at three hospitals. The pilot measured staff views and documentation. It did not establish an effect on patient outcomes or validate the four-hour target. <a href="story.html#results">Read the results and limitations</a>.</p>
      <p>This site uses the manuscript submitted for publication in 2026. A link to the published paper will be added when it is available.</p>
    </div>
    <div class="card" id="source">
      <h2 style="font-size:1.5rem">Source and citation</h2>
      <p>The ACE-T content on this site is taken from the development and pilot paper, which is the source for the tool prompts and pilot results:</p>
      <div class="cite">Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A. Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems. Submitted for publication, 2026.</div>
      <p class="mt-1">The bedside prompts follow Table 1 of the paper, with the 4AT named as the screening tool. The “Why” notes on the tool page are teaching notes written for this site and checked against NICE guideline CG103. A link to the published paper will be added when it is available.</p>
    </div>
    <div class="card">
      <h2 style="font-size:1.5rem">Related resources</h2>
      <p>Resources maintained by Alasdair include the 4AT, Delirium Academy and Delirium Support. The national guidelines provide further clinical guidance:</p>
      <ul class="tick-list" style="--d-tint: var(--brand-tint)">
        <li><a href="https://www.the4at.com/" rel="noopener">The 4AT</a>: the assessment tool, user guide and training material</li>
        <li><a href="https://www.nice.org.uk/guidance/cg103" rel="noopener">NICE guideline CG103</a>: delirium prevention, diagnosis and management in hospital and long-term care</li>
        <li><a href="https://www.sign.ac.uk/our-guidelines/risk-reduction-and-management-of-delirium/" rel="noopener">SIGN 157</a>: risk reduction and management of delirium</li>
        <li><a href="https://deliriumacademy.com/" rel="noopener">Delirium Academy</a>: delirium education for healthcare staff</li>
        <li><a href="https://deliriumsupport.com/" rel="noopener">Delirium Support</a>: information for patients, families and carers</li>
      </ul>
    </div>
    <div class="card">
      <h2 style="font-size:1.5rem">Editorial approach and corrections</h2>
      <p>The bedside prompts, teaching notes and pilot findings have different sources. The prompts follow the manuscript; the added teaching notes use the clinical guidance linked above. Website edits preserve the wording and scoring of clinical instruments.</p>
      <p>The site’s content record documents a manuscript check on 23 September 2026. The language, source links and evidence summaries were updated on 28 September 2026.</p>
      <p>The site is maintained by Professor Alasdair MacLullich, University of Edinburgh. To report a content or accessibility problem, email <a href="mailto:${SITE.contact}">${SITE.contact}</a>.</p>
      <p class="mb-0">Please do not send identifiable patient information by email.</p>
    </div>
    <div class="card">
      <h2 style="font-size:1.5rem">Accessibility and privacy</h2>
      <p>The site uses readable text sizes, keyboard-accessible controls, layouts that adapt to phones, a text alternative for every chart, and captions and a transcript for the walkthrough. Animations are reduced if your device asks for reduced motion.</p>
      <p class="mb-0">There are no cookies, analytics, advertising, forms or patient data entry. The hosting provider, GitHub Pages, may process technical request information; see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub’s privacy statement</a>.</p>
    </div>
  </div>
</section>
`,
};
