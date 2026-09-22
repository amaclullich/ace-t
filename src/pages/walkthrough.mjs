import { icon } from '../art/icons.mjs';
import { playerHtml, chaptersHtml, transcriptHtml } from '../walkthrough-build.mjs';

export default {
  key: 'walkthrough', path: 'walkthrough.html', title: 'Narrated walkthrough',
  scripts: ['walkthrough.js'],
  description: 'A narrated, animated walkthrough of the ACE-T tool for nurses, with captions, chapters and a full transcript. Under five minutes.',
  body: () => `
<section class="page-hero" style="padding-bottom:24px">
  <div class="wrap">
    <p class="eyebrow">Walkthrough</p>
    <h1>ACE-T at the bedside</h1>
    <p class="lede">A narrated walkthrough of every ACE-T prompt, from the positive screen to the shared plan. Press play, or jump to a chapter.</p>
    <div class="walk-meta">
      <span>${icon('clock')}4 minutes 41 seconds</span>
      <span>${icon('cc')}Captions on by default</span>
      <span>${icon('transcript')}Full transcript below</span>
    </div>
  </div>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="wrap walk-layout">
    ${playerHtml()}
    <noscript><p class="note">The animation needs JavaScript. You can still listen to the narration here and read the transcript below.</p><audio controls preload="none" src="media/ace-t-walkthrough.mp3" style="width:100%"></audio></noscript>
    <div>
      <h2 class="h3" style="font-size:1.35rem">Chapters</h2>
      ${chaptersHtml()}
    </div>
    <p class="muted" style="font-size:.93rem">Keyboard: with the player selected, <span class="kbd">Space</span> plays or pauses, <span class="kbd">←</span> and <span class="kbd">→</span> move 5 seconds, <span class="kbd">C</span> turns captions on or off and <span class="kbd">F</span> opens full screen.</p>
  </div>
</section>

<section class="section section-card" aria-labelledby="tr-h">
  <div class="wrap wrap-narrow">
    <p class="eyebrow">Transcript</p>
    <h2 id="tr-h">What the narrator says</h2>
    <p class="muted">Select any paragraph or word to play from that point.</p>
    <div class="transcript">
      ${transcriptHtml()}
    </div>
    <div class="btn-row mt-2">
      <a class="btn btn-secondary" href="media/ace-t-walkthrough.vtt" download>${icon('cc')}Captions file (VTT)</a>
      <a class="btn btn-secondary" href="media/ace-t-walkthrough-transcript.txt" download>${icon('transcript')}Transcript (text)</a>
      <a class="btn btn-secondary" href="media/ace-t-walkthrough.mp3" download>${icon('download')}Narration (MP3)</a>
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="wrap">
    <div class="band">
      <div>
        <h2>Ready to use it?</h2>
        <p>Read each prompt with the reason behind it, or download the bedside form.</p>
      </div>
      <div class="btn-row">
        <a class="btn btn-secondary" href="tool.html">Open the tool</a>
        <a class="btn btn-outline" href="downloads.html">${icon('download')}Downloads</a>
      </div>
    </div>
  </div>
</section>
`,
};
