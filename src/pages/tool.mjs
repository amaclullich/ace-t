import { icon } from '../art/icons.mjs';
import { DOMAINS, QDAT } from '../data/tool.mjs';
import { fourHourClock } from '../art/scenes.mjs';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export default {
  key: 'tool', path: 'tool.html', title: 'The ACE-T tool',
  description: 'The full ACE-T bedside tool: Acute Triggers, Patient Experience and Treatment prompts for the first four hours after a positive delirium screen, with the reason for each prompt and the Quick Distress Assessment Tool.',
  body: () => `
<section class="page-hero">
  <div class="wrap page-hero-grid">
    <div>
      <p class="eyebrow">The bedside tool</p>
      <h1>Using ACE-T</h1>
      <p class="lede">You have just done a 4AT, or another delirium screen, and the result is positive. Or you are worried that a patient has delirium. Start ACE-T now, and work through the three domains in parallel.</p>
      <div class="btn-row mt-2 no-print">
        <a class="btn btn-primary" href="downloads/ACE-T-bedside-tool-A4.pdf" download>${icon('download')}Bedside form (PDF)</a>
        <a class="btn btn-secondary" href="downloads/ACE-T-bedside-tool-editable.docx" download>${icon('download')}Editable Word version</a>
        <button class="btn btn-ghost" type="button" data-print>${icon('printer')}Print this page</button>
      </div>
      <ul class="toc no-print" aria-label="On this page">
        ${DOMAINS.map(d => `<li><a href="#${d.id}" data-d="${d.id}"><span class="dot"></span>${d.letter} · ${d.name}</a></li>`).join('')}
        <li><a href="#qdat">Distress score (QDAT)</a></li>
        <li><a href="#after">After the first four hours</a></li>
      </ul>
    </div>
    <div class="no-print" style="width:100%;max-width:260px;justify-self:center">${fourHourClock({ dark: false, id: 'tool-clock' })}</div>
  </div>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="wrap">
    <div class="two-col">
      <div class="callout callout-urgent">
        <div class="ci">${icon('alert')}</div>
        <div>
          <h2 class="h-card">Four hours, and urgent concerns first</h2>
          <p>Aim to complete, start or escalate the actions that apply within four hours of the positive screen. Act on urgent concerns immediately, using your local escalation pathway.</p>
          <p>Four hours is a practical target for the whole initial response. Several actions can happen at the same time.</p>
        </div>
      </div>
      <div class="callout">
        <div class="ci">${icon('team')}</div>
        <div>
          <h2 class="h-card">Within your role, with the team</h2>
          <p>ACE-T covers the nursing part of the first response. Diagnosis, investigations and prescribing stay with the team members whose role covers them, under local policy.</p>
          <p>Use your judgement: some prompts will not apply to every patient, and others may need adding.</p>
        </div>
      </div>
    </div>

    ${DOMAINS.map(d => `
    <section class="domain-section" id="${d.id}" data-d="${d.id}" aria-labelledby="${d.id}-h">
      <div class="domain-head">
        <span class="domain-letter" aria-hidden="true">${d.letter}</span>
        <div>
          <h2 id="${d.id}-h">${d.name}${d.sub ? `<span class="visually-hidden">: ${d.sub}</span>` : ''}</h2>
          <p>${d.question}</p>
        </div>
      </div>
      <ol class="items">
        ${d.items.map(it => `<li class="item"><div><h3>${esc(it.t)}</h3>${it.d ? `<p>${esc(it.d)}</p>` : ''}<span class="why"><b>Why:</b> ${esc(it.why)}</span></div></li>`).join('')}
      </ol>
      ${d.id === 'pe' ? qdatBlock() : ''}
    </section>`).join('')}

    <section class="domain-section" id="after" aria-labelledby="after-h">
      <h2 id="after-h">After the first four hours</h2>
      <div class="grid-2">
        <div class="card">
          <h3>Keep the plan going</h3>
          <p>ACE-T is the start of delirium treatment. Revisit relevant prompts as the person’s condition changes, and follow the treatment plan agreed with the team.</p>
        </div>
        <div class="card">
          <h3>Hand over clearly</h3>
          <p>At handover, include the delirium or suspected delirium, the screening score, what has been done, and anything still outstanding or escalated.</p>
        </div>
      </div>
      <p class="note">Adapted from Table 1 of the ACE-T development and pilot manuscript (Cours et al., submitted for publication 2026). The web version names the 4AT as the screening tool; ACE-T can be used after any locally used delirium screen. The “Why” lines are teaching notes for this website, consistent with NICE guideline CG103. <a href="about.html#source">Source and citation</a>.</p>
    </section>
  </div>
</section>
`,
};

function qdatBlock() {
  return `
      <div class="qdat" id="qdat">
        <p class="eyebrow" style="color:var(--pe)">Optional score</p>
        <h3>Quick Distress Assessment Tool (QDAT)</h3>
        <p class="muted">Observe the person, then ask:</p>
        <p class="qdat-ask">${QDAT.ask}</p>
        <div class="qdat-scale">
          ${QDAT.levels.map(l => `<div class="qdat-level"><span class="qdat-score">${l.s}</span><p>${esc(l.t)}</p></div>`).join('')}
        </div>
        <p class="qdat-src">${QDAT.source}</p>
      </div>`;
}
