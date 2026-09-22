import { icon } from '../art/icons.mjs';
import { lettersDiagram } from '../art/scenes.mjs';
import { sitesMap } from '../art/map.mjs';
import { dumbbell, bars } from '../art/charts.mjs';

const chapter = (n, kicker, id, inner) => `
<article class="chapter" id="${id}" aria-labelledby="${id}-h">
  <div class="chapter-label"><span class="chapter-num">${String(n).padStart(2, '0')}</span><span class="chapter-kicker">${kicker}</span></div>
  <div class="chapter-body">${inner.replace('<h2>', `<h2 id="${id}-h">`)}</div>
</article>`;

export default {
  key: 'story', path: 'story.html', title: 'The story of ACE-T',
  description: 'How ACE-T was developed: the gap after a positive delirium screen, a nursing tool drafted in Edinburgh, feedback from 53 staff, and a pilot in Edinburgh, Frankfurt and Stanford.',
  body: () => `
<section class="page-hero">
  <div class="wrap page-hero-grid">
    <div>
      <p class="eyebrow">The story</p>
      <h1>How ACE-T was made</h1>
      <p class="lede">A one-page nursing tool, drafted by clinicians in three countries, reshaped by feedback from 53 hospital staff, and piloted in Edinburgh, Frankfurt and Stanford. This account follows the ACE-T development and pilot paper.</p>
    </div>
    <div class="art-frame">${sitesMap({ id: 'story-map' })}</div>
  </div>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="wrap">
${chapter(1, 'Starting point', 'question', `
    <h2>The question after the screen</h2>
    <p>A nurse completes a delirium screen and the result is positive. The next question is practical: what should happen now, and who should do it?</p>
    <p>Delirium care has three parts: detection, treatment and prevention. Tools for detecting delirium are well established, and so are approaches to preventing it. Treatment is much less clearly defined. Guidelines and other sources describe a package of actions, such as finding and addressing triggers, managing symptoms and supporting recovery, but they differ a great deal in what that package contains.</p>
    <p>Even the name varies. In guidelines, delirium treatment appears as:</p>
    <ul class="labels-list"><li>multicomponent non-pharmacological interventions</li><li>a multicomponent program</li><li>non-drug strategies</li><li>established pathways of good care</li></ul>
    <p>The content ranges from two brief recommendations to a programme of 15 components.</p>`)}

${chapter(2, 'The gap', 'gap', `
    <h2>Who does what, and when</h2>
    <p>Most guidelines do not say which professional group is responsible for which action. Two go further. The American Psychiatric Association’s 2025 guideline notes that nurses “deliver or assure delivery” of most non-drug interventions. The German S3 guideline places the urgent medical work-up with specialist physicians, and allocates non-drug care to nursing, occupational therapy and physiotherapy by problem area.</p>
    <p>Neither sets out the order or timing of what nurses should do in the hours immediately after a positive screen.</p>
    <p>Outside guidelines, research studies, textbook chapters, order sets and clinical pathways vary in the same ways: sequence, timing, documentation, and which discipline does what. As a result, clinical teams vary in how they respond to a positive screen. Studies have found gaps in identifying triggers that could be reversed, in assessing and managing distress, and in telling patients and families about the diagnosis. Several have found gaps in escalation and action after positive screens.</p>`)}

${chapter(3, 'The idea', 'idea', `
    <h2>Start with the nurse</h2>
    <p>In many health systems, nurses carry out most delirium screening. They are therefore in the best position to respond as soon as a screen is positive. They also carry much of the ongoing care: managing interventions, monitoring distress, talking with families and keeping patients safe.</p>
    <p>The idea for ACE-T came from two Edinburgh clinicians: Alasdair MacLullich, a geriatrician at the University of Edinburgh who developed the 4AT, and Maggie Higgins, a nurse in Medicine of the Elderly at the Royal Infirmary of Edinburgh. They wanted a short, practical tool for the first steps after a positive screen, one that nurses could start straight away and that would sit alongside the medical and wider team roles.</p>
    <blockquote>A practical nurse-focused tool is needed to guide the first steps after a positive screen.</blockquote>
    <p class="muted" style="font-size:.95rem">From the introduction to the ACE-T paper.</p>`)}

${chapter(4, 'A useful term', 'multidomain', `
    <h2>Multidomain treatment</h2>
    <p>The ACE-T paper uses the term <strong>multidomain delirium treatment</strong> for the whole package of actions involved in treating delirium in routine care.</p>
    <p>The term avoids splitting treatment into “non-pharmacological” and “pharmacological” parts. Guidelines advise against giving psychotropic drugs routinely, and allow brief, targeted use for severe distress that other measures have not relieved, or for safety. Medicines are therefore one optional part of a wider set of actions. The term also separates a package of care from single interventions, such as a particular drug or music.</p>
    <p>ACE-T is a nurse-led tool for the first part of multidomain treatment.</p>`)}

${chapter(5, 'Development', 'drafting', `
    <h2>Drafting the tool</h2>
    <p>Alasdair MacLullich and Maggie Higgins drafted the provisional tool with Alexandra Cours of Stanford University School of Medicine and Johannes Trabert of AGAPLESION Markus Krankenhaus in Frankfurt. They drew on published delirium guidelines and clinical care standards, on the structure of the multidisciplinary TIME bundle (Triggers, Investigations, Management and Engagement), and on their own clinical experience.</p>
    <p>They grouped the first nursing actions into three domains, and the name comes from them.</p>
    <figure class="chapter-figure art-frame">${lettersDiagram({ id: 'story-letters' })}<figcaption>AC for ACute triggers, E for patient Experience, T for Treatment. In its provisional form the tool was called ACE-T-N, with the N standing for nursing.</figcaption></figure>
    <p>From the start, ACE-T had defined limits. It prompts nurses to consider observations, to check whether clinically indicated investigations and a medication review have happened, to assess distress and the care environment, to document delirium, and to communicate with the clinical team and the family. It does not require nurses to diagnose the cause or order investigations outside local policy, and it does not replace wider multidisciplinary care.</p>
    <p>Early drafts were revised after nurses and physician colleagues commented on the layout and content.</p>`)}

${chapter(6, 'Feedback', 'feedback', `
    <h2>Asking the people who would use it</h2>
    <p>Before ACE-T was used with patients, local investigators at the three hospitals asked nurses, physicians, physician associates and assistants, and nurse practitioners to review the provisional tool and fill in an anonymous paper survey. Fifty-three people took part: 26 nurses, 19 physicians and 8 advanced practice providers.</p>
    <div class="chapter-figure">${bars({ id: 'story-survey', title: 'Staff ratings of the provisional tool', rows: [
      { label: 'Easy or very easy to use', n: 39, d: 52 },
      { label: 'Instructions and steps clear or very clear', n: 41, d: 53 },
      { label: 'Very or extremely helpful for nursing assessment and management', n: 37, d: 53 },
      { label: 'Very or extremely helpful for improving delirium care', n: 37, d: 52 },
    ] })}</div>
    <p>The ratings were encouraging, and the criticism was useful. Twenty-one of 52 respondents (40%) said at least one section was unclear or difficult, and 22 wrote suggestions. Their comments kept returning to the same points:</p>
    <ul>
      <li>Make the line between nursing and medical actions clearer, especially in Acute Triggers.</li>
      <li>Simplify Acute Triggers for a busy shift.</li>
      <li>Fit ACE-T into existing documentation, so nothing is written twice.</li>
      <li>Add more person-centred prompts to Patient Experience.</li>
      <li>Phrase each item as a question or an instruction.</li>
    </ul>
    <p>Of the 22 people who wrote comments, 5 raised uncertainty about medication review, 5 about where diagnostic work-up and ordering blood tests should stop for nurses, 4 about Acute Triggers in general, 4 about the layout, and 3 about NEWS2 or the QDAT.</p>
    <div class="card mt-2">
      <h3>What changed</h3>
      <p>The project group kept the three domains and revised the rest. The revised version:</p>
      <ul class="tick-list" style="--d-tint: var(--brand-tint)">
        <li>made nursing actions and medical escalation clearer</li>
        <li>simplified Acute Triggers</li>
        <li>added prompts about distress, reorientation, glasses and hearing aids, carers, and safety</li>
        <li>set one target, after feedback about differing timescales: four hours from the positive screen to complete, start or escalate the actions that apply, with urgent concerns acted on immediately</li>
      </ul>
    </div>`)}

${chapter(7, 'The pilot', 'pilot', `
    <h2>Three hospitals, three ways of working</h2>
    <p>Each hospital introduced ACE-T through its own clinical teams. There was no shared training package or standard procedure, so each site used its own approach.</p>
    <div class="sites">
      <div class="site-card" data-d="ac"><h3>Stanford</h3><span class="where">Stanford Hospital, California, USA</span><dl><dt>Where</dt><dd>Acute Care for Elders unit</dd><dt>Screen</dt><dd>Confusion Assessment Method (CAM)</dd><dt>Format</dt><dd>Paper, introduced by the geriatric Clinical Nurse Specialist</dd></dl></div>
      <div class="site-card" data-d="pe"><h3>Edinburgh</h3><span class="where">Royal Infirmary of Edinburgh, UK</span><dl><dt>Where</dt><dd>Geriatric medicine wards</dd><dt>Screen</dt><dd>Routine local practice</dd><dt>Format</dt><dd>Paper, introduced through geriatric medicine nursing links</dd></dl></div>
      <div class="site-card" data-d="tr"><h3>Frankfurt</h3><span class="where">AGAPLESION Markus Krankenhaus, Germany</span><dl><dt>Where</dt><dd>Delirium team for the medical wards</dd><dt>Screen</dt><dd>4AT</dd><dt>Format</dt><dd>Electronic, in the delirium team’s records</dd></dl></div>
    </div>
    <p class="mt-2">Working in three health systems showed differences in professional scope, terminology, workflow and documentation that a single site might have missed. One example is how comfortable nurses are writing “delirium” in the notes rather than “? delirium”. ACE-T allows either.</p>
    <p>In Edinburgh, the investigators felt that the tool’s explicit nursing focus and simple format helped local teams engage with it.</p>`)}

${chapter(8, 'Results', 'results', `
    <h2>What the records showed</h2>
    <p>At each hospital, local reviewers looked at 10 records from before ACE-T was introduced and 10 from after: 60 records in all. Each had a positive delirium screen or a documented diagnosis of delirium. Reviewers noted which care actions were documented in the 48 hours after the first positive screen.</p>
    <p>The clearest pattern, seen at all three hospitals, was whether delirium itself was written down.</p>
    <div class="chart-grid">
      ${dumbbell({ id: 'doc', title: 'Delirium or suspected delirium documented', sub: 'Records with delirium documented, out of those reviewed', rows: [
        { site: 'Frankfurt', b: [1, 10], a: [10, 10] }, { site: 'Edinburgh', b: [0, 10], a: [10, 10] }, { site: 'Stanford', b: [3, 10], a: [9, 10] }] })}
      ${dumbbell({ id: 'comm', title: 'Findings communicated to the medical team', sub: 'Out of records where this applied', rows: [
        { site: 'Frankfurt', b: [4, 10], a: [9, 9] }, { site: 'Edinburgh', b: [2, 4], a: [10, 10] }, { site: 'Stanford', b: [0, 5], a: [3, 10] }] })}
    </div>
    <p>Other items were more mixed. Documented distress assessment rose in Stanford (3 of 10 before, 10 of 10 after) and in Frankfurt (4 of 10 to 6 of 10), and was already high in Edinburgh (9 of 10 before, 7 of 9 after). Informing the patient or family, and giving a leaflet, varied between sites.</p>
    <p>Vital signs and blood test review were already recorded in almost every Edinburgh and Stanford record before ACE-T. In Frankfurt, the baseline records came from the delirium team rather than the full ward notes, so the low baseline figures there are likely to reflect, at least in part, which records were reviewed.</p>
    <div class="card mt-2">
      <h3>What the pilot does not show</h3>
      <ul class="not-list">
        <li>Completed ACE-T forms counted as documentation, so changes in care and changes in recording are mixed together.</li>
        <li>It did not test whether actions were completed within four hours.</li>
        <li>The samples were small and not random, and the mix of wards changed between the two periods in Edinburgh and Stanford.</li>
        <li>Reviewers knew which period each record came from, and agreement between reviewers was not tested.</li>
        <li>It did not measure patient outcomes, safety, staff workload or unintended effects.</li>
        <li>Patients and family carers were not involved in the first stage of development.</li>
      </ul>
    </div>`)}

${chapter(9, 'Next steps', 'next', `
    <h2>What comes next</h2>
    <p>The paper recommends a prospective feasibility study. It would design the implementation with bedside nurses, patients and carers; look at how ACE-T fits with the work of other disciplines; formally assess content validity and usability; and include consecutive eligible patients rather than a selected sample.</p>
    <p>It would measure reach, uptake, completion within four hours, fidelity, staff workload, acceptability, communication with patients and carers, and unintended consequences. It would also test whether an electronic version reduces duplicate recording without adding alerts or paperwork. That groundwork would make it possible to test clinical effectiveness.</p>
    <p>The authors describe ACE-T as a promising, practical tool for the initial nursing response to delirium, and a starting point for teams who want those first steps to be clearer and more consistent in routine care.</p>
    <ol class="timeline" aria-label="Stages of ACE-T development">
      <li><strong>Drafting</strong><span>Provisional tool, called ACE-T-N, drafted by clinicians in Edinburgh, Stanford and Frankfurt.</span></li>
      <li><strong>Staff review</strong><span>53 staff rate the provisional tool and suggest changes; the tool is revised before clinical use.</span></li>
      <li><strong>Summer 2025</strong><span>Baseline records reviewed at the three hospitals.</span></li>
      <li><strong>Autumn and winter 2025 to 2026</strong><span>ACE-T in use; records reviewed after introduction.</span></li>
      <li><strong>2026</strong><span>Development and pilot paper submitted for publication.</span></li>
    </ol>`)}

${chapter(10, 'The team', 'team', `
    <h2>The authors</h2>
    <div class="team">
      <div class="person"><strong>Alexandra Cours, MD</strong><span>Geriatric Medicine, Stanford University School of Medicine, Palo Alto, USA. Corresponding author.</span></div>
      <div class="person"><strong>Johannes Trabert, MD</strong><span>Medizinisch-Geriatrische Klinik, AGAPLESION Markus Krankenhaus, Frankfurt am Main, Germany</span></div>
      <div class="person"><strong>Maggie Higgins, RN</strong><span>Medicine of the Elderly, Royal Infirmary of Edinburgh, NHS Lothian, UK</span></div>
      <div class="person"><strong>Umar Saleem, MD</strong><span>Medicine of the Elderly, Royal Infirmary of Edinburgh, NHS Lothian, UK</span></div>
      <div class="person"><strong>Elizabeth Sampson, MD, PhD</strong><span>Academic Centre for Healthy Ageing, Queen Mary University of London, UK</span></div>
      <div class="person"><strong>Nannette Storr-Street, MS, CNS</strong><span>Inpatient Geriatrics, Stanford Health Care, Palo Alto, USA</span></div>
      <div class="person"><strong>Alasdair MacLullich, MB ChB, PhD</strong><span>Ageing and Health, Usher Institute, University of Edinburgh, UK</span></div>
    </div>
    <p class="mt-2">The authors thank the colleagues who took part in the survey and in introducing ACE-T at each site.</p>
    <div class="cite"><strong>Source:</strong> Cours A, Trabert J, Higgins M, Saleem U, Sampson E, Storr-Street N, MacLullich A. Development and pilot evaluation of ACE-T, a nurse-focused delirium initial-response tool, across three health systems. Submitted for publication, 2026.</div>`)}
  </div>
</section>

<section class="section-tight">
  <div class="wrap">
    <div class="band">
      <div><h2>See the tool itself</h2><p>Every prompt, with the reason behind it, and the forms to download.</p></div>
      <div class="btn-row"><a class="btn btn-secondary" href="tool.html">Open the tool</a><a class="btn btn-outline" href="walkthrough.html">${icon('play')}Walkthrough</a></div>
    </div>
  </div>
</section>
`,
};
