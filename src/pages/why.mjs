import { icon } from '../art/icons.mjs';
import { bars } from '../art/charts.mjs';

export default {
  key: 'why', path: 'why-ace-t.html', title: 'Why ACE-T',
  description: 'Why a nurse-focused tool for the first hours after a positive delirium screen was needed, what ACE-T gives nurses, what staff said about it, and where the 4AT fits.',
  body: () => `
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">Why ACE-T</p>
    <h1>The gap after the screen</h1>
    <p class="lede">Tools for detecting delirium are well established. What should happen in the first hours after a positive screen, and who should do it, has been far less clearly defined. ACE-T sets out the nursing part of that response.</p>
  </div>
</section>

<section class="section-tight" style="padding-top:8px">
  <div class="wrap grid-2">
    <div class="card">
      <h2 style="font-size:1.6rem">Delirium is common and serious</h2>
      <p>Delirium is a sudden change in attention and thinking that develops over hours or days and often fluctuates. Some people become agitated; others become quiet and drowsy, which is easier to miss.</p>
      <p>About 20 to 30% of people on hospital medical wards have delirium. Compared with people who do not develop it, people with delirium are more likely to stay longer in hospital, to have falls and pressure sores, to need long-term care, to have a higher incidence of dementia, and to die.</p>
      <p class="muted" style="font-size:.9rem;margin:0">Source: NICE guideline CG103, context section.</p>
    </div>
    <div class="card">
      <h2 style="font-size:1.6rem">Treatment advice varies</h2>
      <p>Guidelines describe delirium treatment under several different labels:</p>
      <ul class="labels-list" aria-label="Labels used in guidelines">
        <li>multicomponent non-pharmacological interventions</li><li>a multicomponent program</li><li>non-drug strategies</li><li>established pathways of good care</li>
      </ul>
      <p>The content ranges from two brief recommendations to a programme of 15 components. Most guidelines do not say which professional group is responsible for which action. The few that assign roles still do not set out the order or timing of nursing actions in the hours after a positive screen.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="nurses-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Why nurses</p>
      <h2 id="nurses-h">Nurses are there when the screen is positive</h2>
      <p>In many health systems, nurses carry out most delirium screening. That puts them in the best position to respond as soon as a screen is positive, and to bring in the rest of the team.</p>
      <p>Nurses also carry much of the ongoing care of a person with delirium: managing interventions, monitoring distress, talking with families and keeping the person safe. Studies have found gaps in escalation and action after positive screens, and in telling patients and families about the diagnosis.</p>
      <p>ACE-T gives nurses a practical, shared starting point for those first hours. Medical assessment and the wider team’s work continue alongside it.</p>
    </div>
    <div class="card" style="padding:28px">
      <h3>What ACE-T asks of a nurse</h3>
      <ul class="tick-list" style="--d-tint: var(--brand-tint)">
        <li>Consider observations, comfort and familiar checks</li>
        <li>Check whether investigations and a medication review have happened</li>
        <li>Assess distress and the care environment</li>
        <li>Document delirium or suspected delirium, with the score</li>
        <li>Communicate with the team and the family, escalating concerns under local policy</li>
      </ul>
      <p class="muted mt-1" style="margin-bottom:0">Diagnosing the cause, and ordering investigations outside local policy, stay with the team members whose role covers them.</p>
    </div>
  </div>
</section>

<section class="section section-card" aria-labelledby="gives-h">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Benefits</p>
      <h2 id="gives-h">What ACE-T gives you</h2>
    </div>
    <div class="feature-grid">
      <div class="feature"><div class="feature-icon">${icon('compass')}</div><h3>A clear place to start</h3><p>When the screen is positive, you know what to look at first, on one page, without searching through a long protocol.</p></div>
      <div class="feature"><div class="feature-icon">${icon('search')}</div><h3>Familiar checks in one list</h3><p>Observations, glucose, bloods, retention, constipation, hydration, nutrition, infection, pain and medicines, all in one list.</p></div>
      <div class="feature"><div class="feature-icon">${icon('heart')}</div><h3>Attention to the person</h3><p>Distress, agitation, reassurance, sensory aids, the environment and the people who know the patient are part of the response.</p></div>
      <div class="feature"><div class="feature-icon">${icon('pen')}</div><h3>Delirium in the record</h3><p>Documenting “delirium” or “? delirium” and the score makes it visible to everyone who reads the notes.</p></div>
      <div class="feature"><div class="feature-icon">${icon('team')}</div><h3>Structured communication</h3><p>The score and findings go to the clinical team, the family is informed, and the plan is discussed with the multidisciplinary team.</p></div>
      <div class="feature"><div class="feature-icon">${icon('clock')}</div><h3>A shared time frame</h3><p>Four hours to complete, start or escalate what applies, with urgent concerns acted on at once.</p></div>
      <div class="feature"><div class="feature-icon">${icon('layers')}</div><h3>Works with your screening tool</h3><p>Use it after a positive 4AT, CAM or other locally used tool. Record whichever score your service uses.</p></div>
      <div class="feature"><div class="feature-icon">${icon('sliders')}</div><h3>Adaptable</h3><p>The editable Word version lets services match local wording, roles and documentation.</p></div>
      <div class="feature"><div class="feature-icon">${icon('shield')}</div><h3>Clear about scope</h3><p>ACE-T supports nursing judgement and local policy. It sits alongside medical assessment and the wider team.</p></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="said-h">
  <div class="wrap split" style="align-items:start">
    <div>
      <p class="eyebrow">What staff said</p>
      <h2 id="said-h">Rated clear, usable and helpful</h2>
      <p>Before ACE-T was used with patients, 53 staff at the three pilot hospitals reviewed it: 26 nurses, 19 physicians and 8 advanced practice providers. Most rated it favourably.</p>
      <p>Twenty-one of 52 (40%) found at least one section unclear or difficult, and their comments shaped the version on this site. <a href="story.html#feedback">Read how the feedback changed ACE-T</a>.</p>
      <p class="note">These ratings describe what staff thought of the tool on paper. They are not measurements of how it performed at the bedside.</p>
    </div>
    ${bars({ id: 'survey', title: 'Staff ratings of the provisional tool', rows: [
      { label: 'Easy or very easy to use', n: 39, d: 52 },
      { label: 'Instructions and steps clear or very clear', n: 41, d: 53 },
      { label: 'Very or extremely helpful for nursing assessment and management', n: 37, d: 53 },
      { label: 'Very or extremely helpful for improving delirium care', n: 37, d: 52 },
    ] })}
  </div>
</section>

<section class="section section-alt" aria-labelledby="md-h">
  <div class="wrap grid-2" style="align-items:start">
    <div>
      <p class="eyebrow">A useful term</p>
      <h2 id="md-h">Multidomain treatment</h2>
      <p>The ACE-T paper uses <strong>multidomain delirium treatment</strong> for the package of actions that makes up routine delirium treatment: finding and addressing triggers, managing symptoms and supporting recovery.</p>
      <p>The term avoids dividing treatment into “non-pharmacological” and “pharmacological” parts. Guidelines advise against giving psychotropic drugs routinely, and allow brief, targeted use for severe distress that other measures have not relieved, or for safety. Medicines are therefore one optional part of a wider set of actions.</p>
      <p>ACE-T covers the nursing part of multidomain treatment in the first hours.</p>
    </div>
    <div id="the-4at">
      <p class="eyebrow">Where the 4AT fits</p>
      <h2>Detect with the 4AT, respond with ACE-T</h2>
      <p>The 4AT is a short bedside test for delirium. Its four items cover <strong>A</strong>lertness, the <strong>A</strong>MT4 (age, date of birth, place and year), <strong>A</strong>ttention (months of the year backwards) and <strong>A</strong>cute change or fluctuating course. It does not need special training.</p>
      <p>A score of 4 or more suggests delirium. A score of 1 to 3 suggests cognitive impairment but not delirium, and 0 suggests no delirium and no moderate to severe cognitive impairment. A positive 4AT should lead to clinical assessment and, with ACE-T, to a nursing response.</p>
      <p>NICE recommends the 4AT for assessing delirium in hospital and long-term care. In critical care, or in the recovery room after surgery, it recommends the CAM-ICU or ICDSC instead.</p>
      <a class="link-arrow" href="https://www.the4at.com/userguide" rel="noopener">The official 4AT user guide${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="not-h">
  <div class="wrap grid-2" style="align-items:start">
    <div>
      <p class="eyebrow">Scope</p>
      <h2 id="not-h">What ACE-T does not do</h2>
      <ul class="not-list">
        <li>It does not detect delirium. Use the 4AT or your local screening tool for that.</li>
        <li>It does not make a diagnosis. A positive screen needs clinical assessment.</li>
        <li>It does not cover every part of delirium treatment. The team plan continues after the first hours.</li>
        <li>It is not a delirium prevention programme.</li>
        <li>It does not replace medical assessment or the work of other professions.</li>
      </ul>
    </div>
    <div class="card">
      <h3>Evidence so far</h3>
      <p>ACE-T has been through staged development and a small pilot in three hospitals. Staff ratings were positive, and delirium was documented more often after it was introduced at all three sites.</p>
      <p>The pilot did not measure patient outcomes, and its samples were small and not random. The authors recommend a prospective feasibility study before testing clinical effectiveness.</p>
      <a class="link-arrow" href="story.html#results">Pilot results and limitations${icon('arrow')}</a>
    </div>
  </div>
</section>
`,
};
