// Single source for the ACE-T prompts. Adapted from Table 1 of the ACE-T development and pilot
// manuscript (Cours et al., submitted 2026), with the 4AT named as the default screening tool.
// "why" lines are short teaching rationales consistent with NICE CG103.

export const DOMAINS = [
  {
    id: 'ac', letter: 'AC', name: 'Acute Triggers', question: 'What might be causing or worsening the delirium?',
    short: 'Look for problems that may be causing or worsening the delirium.',
    items: [
      { t: 'Check observations', d: 'Pulse, blood pressure, oxygen saturation, respiratory rate, temperature and conscious level.', form: 'Observations: pulse, blood pressure, oxygen saturation, respiratory rate, temperature, conscious level',
        why: 'Abnormal observations can point to acute illness, such as infection, low oxygen levels or dehydration, that may be causing or worsening the delirium.' },
      { t: 'Check capillary blood glucose', form: 'Capillary blood glucose',
        why: 'Low or high blood glucose can cause delirium, and it is quick to check at the bedside.' },
      { t: 'Check that routine blood tests have been sent', form: 'Check that routine blood tests have been sent',
        why: 'Blood tests help the team look for causes such as infection, dehydration and electrolyte problems. Follow local policy on who requests and reviews them.' },
      { t: 'Assess for urinary retention and constipation', form: 'Assess for urinary retention and constipation',
        why: 'Both are common, uncomfortable and easily missed, and both can contribute to delirium.' },
      { t: 'Assess hydration status', form: 'Assess hydration status',
        why: 'Dehydration is a common contributor to delirium and can often be corrected.' },
      { t: 'Assess nutrition status', form: 'Assess nutrition status',
        why: 'Poor nutrition is a recognised risk factor for delirium, and people with delirium often need help to eat and drink.' },
      { t: 'Start or review an infection work-up, as appropriate', d: 'For example, urinalysis or a wound check.', form: 'Initiate or review infection work-up as appropriate (for example, urinalysis or wound check)',
        why: 'Infection is a common trigger. Be guided by symptoms and signs, and by local guidance on which tests to use.' },
      { t: 'Assess pain', d: 'Record it as none, mild, moderate or severe.', form: 'Assess pain: none / mild / moderate / severe',
        why: 'Pain can cause or worsen delirium, and people with delirium may not report it. Look for non-verbal signs, particularly if the person has communication difficulties.' },
      { t: 'Check whether a medication review has been completed', form: 'Check whether medication review has been completed',
        why: 'Medicines are a common contributor, including new sedating drugs and regular medicines that have been missed or stopped. Raise any concerns with the prescriber.' },
    ],
  },
  {
    id: 'pe', letter: 'E', name: 'Patient Experience', question: 'How is the person feeling, and what would help?',
    short: 'Recognise distress, reassure, and support communication.',
    items: [
      { t: 'Check for distress', d: 'Use the Quick Distress Assessment Tool (QDAT) where appropriate.', form: 'Check for distress using the Quick Distress Assessment Tool (QDAT), where appropriate. Score: ____',
        why: 'Distress is common in delirium, and a quiet or drowsy person may still be distressed.' },
      { t: 'Note any agitation', form: 'Note any agitation',
        why: 'Describe what you see and when it happens. Agitation can reflect pain, fear or another need that the team can address.' },
      { t: 'Provide reassurance and reorientation', d: 'Explain who you are, where the person is and what is happening.', form: 'Provide reassurance and reorientation',
        why: 'Calm, clear explanation helps people make sense of their surroundings. Repeat it as often as needed.' },
      { t: 'Consider the patient’s environment', d: 'For example, whether a single room is needed.', form: 'Consider patient environment (for example, whether a single room is needed)',
        why: 'Noise, poor lighting and moves between wards or rooms can add to confusion.' },
      { t: 'Make sure glasses, hearing aids and other communication aids are available', form: 'Ensure glasses, hearing aids and other communication aids are available',
        why: 'People are less disorientated when they can see and hear clearly. Check that aids work and are within reach.' },
      { t: 'Consider involving relatives, friends or carers', form: 'Consider involving relatives, friends or carers',
        why: 'People who know the patient can describe their usual self, offer familiar reassurance and help the team notice change.' },
    ],
  },
  {
    id: 'tr', letter: 'T', name: 'Treatment', sub: 'Nursing treatment and communication', question: 'What does the person need now, and who needs to know?',
    short: 'Support the person, document delirium and share the plan.',
    items: [
      { t: 'Consider falls risk', form: 'Consider falls risk',
        why: 'Delirium increases the risk of falls. Review the person’s risk and use local falls prevention measures.' },
      { t: 'Consider whether fluids, oxygen or other immediate supportive measures are needed', form: 'Consider whether fluids, oxygen or other immediate supportive measures are required',
        why: 'Some people need these straight away. They are not automatic for everyone with delirium: decide within your scope of practice and local policy.' },
      { t: 'Document “delirium” or “? delirium” and the 4AT score in the clinical record', d: 'If your service uses a different screening tool, record its score.', form: 'Document “delirium” or “? delirium” and the 4AT (or local screening) score in the clinical record',
        why: 'Writing it down makes the delirium visible to everyone who reads the record, and gives a starting point for tracking change.' },
      { t: 'Communicate the screening score and relevant findings to the clinical team', form: 'Communicate the screening score and relevant findings to the clinical team',
        why: 'The team needs this information to complete a clinical assessment and plan treatment.' },
      { t: 'Inform the family, where appropriate', form: 'Inform the family where appropriate',
        why: 'Families are often worried by sudden change in someone they know well. They can also tell you what is new.' },
      { t: 'Offer the delirium information leaflet to the patient and family, where appropriate', form: 'Provide the delirium information leaflet to the patient and family where appropriate',
        why: 'Written information helps people understand delirium and remember what they were told.' },
      { t: 'Discuss the treatment plan with the multidisciplinary team', form: 'Discuss the treatment plan with the multidisciplinary team',
        why: 'Agree who does what next. Delirium care continues beyond the first four hours.' },
    ],
  },
];

export const QDAT = {
  ask: '“How are you feeling? Is anything bothering you?”',
  levels: [
    { s: 0, t: 'Appears settled, lying or sitting comfortably, with no signs of pain or distress.' },
    { s: 1, t: 'Verbalises mild distress and/or appears mildly concerned or worried (for example, furrowed brow).' },
    { s: 2, t: 'Verbalises moderate distress and/or displays physical signs of distress (for example, restlessness).' },
    { s: 3, t: 'Verbalises severe distress and/or is visibly in distress throughout the assessment, needing ongoing reassurance.' },
  ],
  source: 'Quick Distress Assessment Tool (QDAT), as described in the ACE-T manuscript; see McCartney H et al. Age Ageing 2025;54(6):afaf166.',
};

export const FOUR_HOURS = {
  head: 'Aim for four hours',
  body: 'Complete, start or escalate the actions that apply within four hours of the positive screen.',
  urgent: 'Act on urgent concerns immediately.',
  parallel: 'Several actions can happen at the same time.',
  note: 'Four hours is a practical target for the initial response. It is not a safety threshold.',
};
