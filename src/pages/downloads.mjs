import { icon } from '../art/icons.mjs';

export default {
  key: 'downloads', path: 'downloads.html', title: 'Download ACE-T',
  description: 'Download the ACE-T bedside tool as a PDF (A4 or US Letter) or an editable Word document, and the ACE-T at a glance poster.',
  body: ({ sizes }) => `
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">Downloads</p>
    <h1>Download ACE-T</h1>
    <p class="lede">Print the bedside form for the ward, edit the Word version to match your local wording, or put the poster up where staff will see it.</p>
  </div>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="wrap">
    <div class="dl-grid">
      <article class="dl-card">
        <div class="dl-thumb"><img src="assets/thumb-bedside-tool.png" alt="Preview of the one-page ACE-T bedside form" width="170" height="240" loading="lazy"></div>
        <span class="dl-meta">PDF · one page · ${sizes.a4}</span>
        <h2 class="h-card">ACE-T bedside form</h2>
        <p>All 22 prompts with tick boxes and space for notes, the four-hour target, the distress score and a signature block. Ready to print.</p>
        <div class="dl-actions">
          <a class="btn btn-primary" href="downloads/ACE-T-bedside-tool-A4.pdf" download>${icon('download')}A4</a>
          <a class="btn btn-secondary" href="downloads/ACE-T-bedside-tool-US-Letter.pdf" download>${icon('download')}US Letter</a>
        </div>
      </article>
      <article class="dl-card">
        <div class="dl-thumb"><img src="assets/thumb-bedside-tool-docx.png" alt="Preview of the editable Word version of the ACE-T form" width="170" height="240" loading="lazy"></div>
        <span class="dl-meta">Word · editable · ${sizes.docx}</span>
        <h2 class="h-card">Editable Word version</h2>
        <p>The same form as a Word document, in black and white. Change the screening tool, local escalation route or wording to fit your service.</p>
        <div class="dl-actions">
          <a class="btn btn-primary" href="downloads/ACE-T-bedside-tool-editable.docx" download>${icon('download')}Word (.docx)</a>
        </div>
      </article>
      <article class="dl-card">
        <div class="dl-thumb"><img src="assets/thumb-poster.png" alt="Preview of the ACE-T at a glance poster" width="170" height="240" loading="lazy"></div>
        <span class="dl-meta">PDF and PNG · ${sizes.poster}</span>
        <h2 class="h-card">ACE-T at a glance</h2>
        <p>A colour poster of the three domains and the four-hour target, for staff rooms, nursing stations and teaching.</p>
        <div class="dl-actions">
          <a class="btn btn-primary" href="downloads/ACE-T-at-a-glance-A4.pdf" download>${icon('download')}PDF (A4)</a>
          <a class="btn btn-secondary" href="downloads/ACE-T-at-a-glance.png" download>${icon('image')}PNG</a>
        </div>
      </article>
    </div>

    <div class="grid-2 mt-3">
      <div class="card">
        <h2 class="h-card">Walkthrough files</h2>
        <p>For teaching sessions, or for listening without the animation.</p>
        <ul class="tick-list" style="--d-tint: var(--brand-tint)">
          <li><a href="media/ace-t-walkthrough.mp3" download>Narration, MP3 (${sizes.mp3})</a></li>
          <li><a href="media/ace-t-walkthrough-transcript.txt" download>Transcript, plain text</a></li>
          <li><a href="media/ace-t-walkthrough.vtt" download>Captions, WebVTT</a></li>
        </ul>
      </div>
      <div class="card">
        <h2 class="h-card">Using the forms</h2>
        <p>ACE-T supports clinical judgement, local policy and the agreed treatment plan. If you adapt the Word version, keep the three domains and the four-hour target, and check the wording with your local delirium lead or practice educator.</p>
        <p class="muted mb-0">A completed form contains patient information. Store it in line with your organisation’s records policy. This website does not collect any patient data.</p>
      </div>
    </div>
  </div>
</section>
`,
};
