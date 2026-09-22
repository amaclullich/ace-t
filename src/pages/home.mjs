import { icon } from '../art/icons.mjs';
import { bedside, fourHourClock } from '../art/scenes.mjs';
import { DOMAINS } from '../data/tool.mjs';
import { posterStage } from '../walkthrough-build.mjs';
import { sitesMap } from '../art/map.mjs';

const examples = {
  ac: ['Observations and conscious level', 'Blood glucose and routine blood tests', 'Retention, constipation, hydration and nutrition', 'Infection, pain and medicines'],
  pe: ['Distress and agitation', 'Reassurance and reorientation', 'Glasses, hearing aids and a calm space', 'Relatives, friends and carers'],
  tr: ['Falls risk and immediate support', 'Document delirium and the 4AT score', 'Tell the clinical team and the family', 'Agree the plan with the team'],
};

export default {
  key: 'home', path: 'index.html', title: 'Home',
  description: 'ACE-T is a one-page nursing tool for the first hours after a positive delirium screen: Acute Triggers, Patient Experience and Treatment. Free PDF and Word versions, a narrated walkthrough and the story of how it was developed.',
  body: () => `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">For nurses · Delirium care</p>
      <h1>Clear first steps after a positive delirium screen</h1>
      <p class="lede">ACE-T is a one-page nursing tool for the first hours after delirium is detected. It helps you look for acute triggers, attend to the patient’s experience, and start treatment and communication with the team.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="walkthrough.html">${icon('play')}Watch the walkthrough</a>
        <a class="btn btn-secondary" href="downloads.html">${icon('download')}Download ACE-T</a>
      </div>
      <ul class="hero-meta">
        <li>${icon('clock')}Narrated walkthrough, under 5 minutes</li>
        <li>${icon('file')}Free PDF and Word versions</li>
        <li>${icon('pin')}Piloted in Edinburgh, Frankfurt and Stanford</li>
      </ul>
    </div>
    <div class="hero-art">${bedside({ id: 'hero' })}</div>
  </div>
</section>

<section class="section section-card" aria-labelledby="domains-h">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">The tool</p>
      <h2 id="domains-h">Three domains, started together</h2>
      <p class="lede">ACE-T groups the early nursing response into three domains. You work through them in parallel, using your clinical judgement about which actions apply to the person in front of you.</p>
    </div>
    <div class="domain-grid">
      ${DOMAINS.map(d => `
      <article class="domain-card" data-d="${d.id}">
        <span class="domain-letter" aria-hidden="true">${d.letter}</span>
        <h3>${d.name}</h3>
        <p class="domain-q">${d.question}</p>
        <ul class="tick-list">${examples[d.id].map(e => `<li>${e}</li>`).join('')}</ul>
        <a class="link-arrow" href="tool.html#${d.id}">All ${d.items.length} ${d.name} prompts${icon('arrow')}</a>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section section-dark" aria-labelledby="hours-h">
  <div class="wrap hours">
    <div class="hours-clock">${fourHourClock({ id: 'home-clock' })}</div>
    <div>
      <p class="eyebrow" style="color:#9fe0d4">Timing</p>
      <h2 id="hours-h">Aim for four hours</h2>
      <p class="lede" style="color:#cfe0dc">Complete, start or escalate the actions that apply within four hours of the positive screen. Four hours is a practical target for the whole initial response. It is not a safety threshold.</p>
      <div class="hours-points">
        <div class="hours-point urgent"><strong>Urgent concerns</strong>Act on them immediately and escalate through your local pathway.</div>
        <div class="hours-point"><strong>In parallel</strong>The three domains can be worked on at the same time, by more than one person.</div>
        <div class="hours-point"><strong>Then keep going</strong>Repeat relevant actions as the person’s condition changes, and hand over what is outstanding.</div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="flow-h">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Where ACE-T fits</p>
      <h2 id="flow-h">From a positive screen to a shared plan</h2>
      <p class="lede">Detection tools such as the 4AT tell you that delirium may be present. ACE-T sets out what the nurse does next, alongside medical assessment and the rest of the team.</p>
    </div>
    <div class="flow" role="list">
      <div class="flow-step" role="listitem">
        <span class="flow-num">Step 1</span>
        <h3>Positive screen</h3>
        <p>A 4AT score of 4 or more, a positive result on your local screening tool, or clinical recognition of suspected delirium.</p>
      </div>
      <div class="flow-arrow" aria-hidden="true">${icon('arrow')}</div>
      <div class="flow-step" role="listitem">
        <span class="flow-num">Step 2 · Start ACE-T</span>
        <div class="flow-lanes">
          ${DOMAINS.map(d => `<div class="flow-lane" data-d="${d.id}"><span class="fl-letter">${d.letter}</span><span><strong>${d.name}</strong><span>${d.short}</span></span></div>`).join('')}
        </div>
        <div class="flow-timebar" aria-hidden="true"><span>Screen</span><i></i><span>4 hours</span></div>
      </div>
      <div class="flow-arrow" aria-hidden="true">${icon('arrow')}</div>
      <div class="flow-step" role="listitem">
        <span class="flow-num">Step 3</span>
        <h3>Shared plan</h3>
        <p>Delirium documented, the team and family informed, and a treatment plan agreed. Care then continues beyond the first four hours.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="teaser-h">
  <div class="wrap teaser">
    <a class="teaser-card" href="walkthrough.html" aria-label="Open the narrated walkthrough">
      ${posterStage(0)}
      <span class="teaser-play" aria-hidden="true"><span>${icon('play')}</span></span>
    </a>
    <div>
      <p class="eyebrow">Walkthrough</p>
      <h2 id="teaser-h">Every prompt, explained in under five minutes</h2>
      <p>A narrated, animated walkthrough of ACE-T at the bedside: what to check, what to ask, what to record and who to tell. It has captions, chapters and a full transcript, so you can use it on the ward, in teaching or on a phone.</p>
      <a class="btn btn-primary mt-1" href="walkthrough.html">${icon('play')}Play the walkthrough</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="benefits-h">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Why nurses use it</p>
      <h2 id="benefits-h">What ACE-T gives you at the bedside</h2>
    </div>
    <div class="feature-grid">
      <div class="feature"><div class="feature-icon">${icon('compass')}</div><h3>A clear place to start</h3><p>The first nursing actions after a positive screen, together on one page.</p></div>
      <div class="feature"><div class="feature-icon">${icon('search')}</div><h3>Familiar checks, brought together</h3><p>Glucose, retention, constipation, hydration and pain are quick to check and easily overlooked. ACE-T puts them side by side.</p></div>
      <div class="feature"><div class="feature-icon">${icon('heart')}</div><h3>Attention to the person</h3><p>Distress, reassurance, glasses and hearing aids, a calmer space, and the people who know the patient.</p></div>
      <div class="feature"><div class="feature-icon">${icon('pen')}</div><h3>Delirium made visible</h3><p>Writing “delirium” or “? delirium” and the score in the record means everyone who reads the notes can see it.</p></div>
      <div class="feature"><div class="feature-icon">${icon('team')}</div><h3>A team response</h3><p>Findings go to the clinical team, the family is informed, and the plan is agreed with the multidisciplinary team.</p></div>
      <div class="feature"><div class="feature-icon">${icon('sliders')}</div><h3>Fits your setting</h3><p>Use it with the 4AT or your local screening tool. The Word version can be edited to match local wording and policy.</p></div>
    </div>
    <p class="mt-2"><a class="link-arrow" href="why-ace-t.html">Read why ACE-T was needed${icon('arrow')}</a></p>
  </div>
</section>

<section class="section section-card" aria-labelledby="pilot-h">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">From the pilot</p>
      <h2 id="pilot-h">Tested in three hospitals, in three countries</h2>
      <p class="lede">ACE-T was refined with feedback from hospital staff and then introduced at the Royal Infirmary of Edinburgh, AGAPLESION Markus Krankenhaus in Frankfurt, and Stanford Hospital in California.</p>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-num">53</div><p><strong>staff reviewed the tool</strong> before it was used: 26 nurses, 19 physicians and 8 advanced practice providers.</p></div>
      <div class="stat"><div class="stat-num">3 in 4</div><p><strong>staff rated ACE-T easy or very easy to use</strong> (39 of 52), and 41 of 53 rated its steps clear or very clear.</p></div>
      <div class="stat"><div class="stat-num">9–10 of 10</div><p><strong>reviewed records at each hospital documented delirium</strong> after ACE-T was introduced, compared with 0 to 3 of 10 before.</p></div>
    </div>
    <p class="note">This was an early developmental pilot with small, non-random samples of records. It describes staff views and what was written in the notes. It did not measure patient outcomes. <a href="story.html#results">What the pilot found, and its limits</a>.</p>
  </div>
</section>

<section class="section" aria-labelledby="story-h">
  <div class="wrap split">
    <div class="art-frame">${sitesMap({ id: 'home-map' })}</div>
    <div>
      <p class="eyebrow">The story</p>
      <h2 id="story-h">How ACE-T came to be</h2>
      <p>Tools for detecting delirium are well established. What a nurse should do in the first hours after a positive screen has been much less clear. ACE-T began in Edinburgh as an attempt to write that response down, and grew into a collaboration between clinicians in the UK, Germany and the United States.</p>
      <a class="link-arrow" href="story.html">Read the story of ACE-T${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section-tight" aria-labelledby="band-h">
  <div class="wrap">
    <div class="band">
      <div>
        <h2 id="band-h">Take ACE-T to your ward</h2>
        <p>Print the one-page bedside form, adapt the Word version to your local wording, or put the overview poster up in the staff area.</p>
      </div>
      <div class="btn-row">
        <a class="btn btn-secondary" href="downloads/ACE-T-bedside-tool-A4.pdf" download>${icon('download')}PDF</a>
        <a class="btn btn-outline btn" href="downloads/ACE-T-bedside-tool-editable.docx" download>${icon('download')}Word</a>
        <a class="btn btn-outline btn" href="downloads.html">All downloads</a>
      </div>
    </div>
  </div>
</section>
`,
};
