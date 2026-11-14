# Clinical content notes

Reviewed 23 September 2026 against the manuscript for submission (7 September 2026 version).

- The manuscript is the source of authority. The prompts follow Table 1 (revised pilot version), with the 4AT named as the default screening tool and other local tools allowed ("Document 'delirium' or '? delirium' and the 4AT (or local screening) score").
- Domain names: Acute Triggers, Patient Experience, Treatment (nursing treatment and communication). The name comes from ACute triggers, patient Experience, Treatment. The provisional version was called ACE-T-N (Supplement 1).
- Four hours: complete, start or escalate applicable actions within four hours of the positive screen. Urgent concerns need immediate action. Actions can run in parallel. Four hours is a practical target, not a safety threshold.
- Scope: ACE-T does not ask nurses to diagnose the cause or order investigations outside local policy, and does not replace multidisciplinary care.
- The "Why" lines on the tool page are teaching notes written for the website and checked against NICE CG103 (recommendations and context). They are not part of Table 1 and are not on the printed form.
- QDAT wording follows the manuscript footnote, with UK spelling; source reference McCartney et al., Age Ageing 2025;54(6):afaf166 (reference 21 in the manuscript).
- Pilot results are reported site by site, as in the manuscript, with its limitations: small non-random samples, changes in ward mix, forms counted as documentation, no test of four-hour completion, no patient outcomes. No effectiveness claims.
- Staff survey figures: 53 respondents (26 nurses, 19 physicians, 8 advanced practice providers); easy or very easy to use 39/52; clear 41/53; helpful for nursing assessment and management 37/53; helpful for improving care 37/52; section unclear 21/52.
- Narration: the existing ElevenLabs track (version B, "ACE-T at the bedside", September 2026). Its script was written from the August 2026 tool and manuscript and matches Table 1 in substance.
- No conflict of interest statements, AI disclosures or disclaimers are added to the site content.
- Delirium prevalence and outcomes on the Why page are from NICE CG103 (context section). 4AT scoring bands are from the official 4AT user guide.

## 14 November 2026

- The paper is now a medRxiv preprint (posted 9 November 2026): medRxiv 2026.11.08.26367532, https://www.medrxiv.org/content/10.64898/2026.11.08.26367532v1. Citations on the site and on the forms were changed from "Submitted for publication, 2026" to the preprint.
- The 22 prompts in `src/data/tool.mjs` were compared with Table 1 of the preprint, read from the table image on medRxiv (T1.large.jpg). The number, order and meaning of the prompts are the same (9 Acute Triggers, 6 Patient Experience, 7 Treatment). The wording on the site differs from Table 1 in ten small ways. An earlier note here said there was one difference; that was wrong.
  1. Table 1: "Observations (pulse, blood pressure, oxygen saturation, respiratory rate, temperature and conscious level)". Site: "Observations: pulse, blood pressure, oxygen saturation, respiratory rate, temperature, conscious level".
  2. Table 1: "(e.g., urinalysis or wound check)". Site: "(for example, urinalysis or wound check)".
  3. Table 1: "Assess pain (none / mild / moderate / severe)". Site: "Assess pain: none / mild / moderate / severe".
  4. Table 1: "(e.g., whether a single room is needed)". Site: "(for example, whether a single room is needed)".
  5. Table 1: "other necessary communication aids". Site: "other communication aids".
  6. Table 1: "the local screening score". Site: "the 4AT (or local screening) score". This one is deliberate.
  7. Site adds "Score: ____" after the QDAT prompt.
  8. QDAT, Table 1 footnote: "verbalizes" and "requiring ongoing reassurance". Site: "Verbalises" and "needing ongoing reassurance".
  9. QDAT, Table 1 footnote: "observe the patient and ask". Site: "Observe the person and ask".
  10. Domain label, Table 1: "Treatment (Nursing)". Site: "Treatment · Nursing treatment and communication".
  The Table 1 footnote says that local forms differed slightly in screening terminology and documentation format. Whether version 1.0 should keep the site wording or take the Table 1 wording for items 5, 8 and 9 is for the authors to decide.
- Added: a link from the leaflet prompt to the printable family leaflets on deliriumsupport.com; a short account of how ACE-T relates to the TIME bundle (Why page), taken from the paper's Methods; an optional "Tell us you are using ACE-T" email link and a translations note (Downloads page); the authors' names on the home page; a count of form downloads in analytics (`ace_t_download` event).
- Licence and version (added after the co-authors agreed): the form is ACE-T version 1.0 (November 2026), free to use under CC BY 4.0 with no permission needed. The statement is on the About page (#licence), the Downloads page, the footer of every page, the PDF and Word forms, the poster and llms.txt. Adapted versions say what changed and are called "adapted from ACE-T". Keep the prompts unchanged until a new version number is issued.
