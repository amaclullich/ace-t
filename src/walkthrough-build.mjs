import fs from 'node:fs';
import { SCENES } from './art/walkthrough-art.mjs';
import { icon } from './art/icons.mjs';

const data = JSON.parse(fs.readFileSync(new URL('./data/walkthrough.json', import.meta.url)));
export const DURATION = data.duration;
const norm = s => s.toLowerCase().replace(/[’'`]/g, '').replace(/[^a-z0-9\-? ]+/g, ' ').replace(/\?/g, '').trim();
const WORDS = data.words.map(([s, e, w]) => ({ s, e, w, n: norm(w) }));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function resolver(timing) {
  const inScene = WORDS.filter(w => w.s >= timing.start - 0.4 && w.s < timing.end);
  const T = (phrase, off = 0) => {
    const toks = norm(phrase).split(/\s+/);
    for (let i = 0; i <= inScene.length - toks.length; i++) {
      let ok = true;
      for (let j = 0; j < toks.length; j++) {
        const w = inScene[i + j].n;
        if (!(w === toks[j] || (j === toks.length - 1 && w.startsWith(toks[j])))) { ok = false; break; }
      }
      if (ok) return +(Math.max(timing.start + 0.2, inScene[i].s - 0.12) + off).toFixed(2);
    }
    throw new Error(`Phrase not found in scene ${timing.key}: "${phrase}"`);
  };
  const S = off => +(timing.start + off).toFixed(2);
  return { T, S };
}

export const CHAPTERS = SCENES.map((sc, i) => {
  const timing = data.scenes[i];
  if (timing.key !== sc.key) throw new Error('Scene order mismatch at ' + i);
  return { ...sc, start: timing.start, end: i === SCENES.length - 1 ? DURATION + 5 : data.scenes[i + 1].start, timing };
});

const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
const LETTER = { ac: 'AC', pe: 'E', tr: 'T' };

function sceneHtml(ch, i, { poster = false } = {}) {
  const { T, S } = resolver({ ...ch.timing, end: ch.end });
  const art = ch.art(T, S);
  const d = ch.d ? ` data-d="${ch.d}"` : '';
  const prompts = ch.prompts.map(p => {
    const pd = p.d === 'urgent' ? ' style="--pd: var(--urgent)"' : p.d ? ` style="--pd: var(--${p.d})"` : '';
    return `<li data-t="${T(p.at)}"${pd}><i aria-hidden="true"></i><span>${esc(p.text)}</span></li>`;
  }).join('');
  const sec = ch.d ? `<b>${LETTER[ch.d]}</b>` : '';
  return `<div class="scene${poster ? ' active' : ''}" data-start="${ch.start}" data-end="${ch.end}"${d} aria-hidden="${poster ? 'false' : 'true'}">
    <div class="scene-text"><p class="scene-section">${sec}${esc(ch.section)}</p><p class="scene-title">${esc(ch.title)}</p><ul class="scene-prompts">${prompts}</ul></div>
    <div class="scene-art">${art}</div>
  </div>`;
}

export function posterStage(index = 0) {
  const ch = CHAPTERS[index];
  return `<div class="stage poster-stage" aria-hidden="true"><div class="brandline"><span><b>ACE-T</b></span><span>Narrated walkthrough</span></div>${sceneHtml(ch, index, { poster: true })}</div>`;
}

export function playerHtml() {
  const scenes = CHAPTERS.map((c, i) => sceneHtml(c, i)).join('\n');
  const caps = JSON.stringify(data.captions);
  const ticks = CHAPTERS.slice(1).map(c => `<i style="left:${((c.start / DURATION) * 100).toFixed(2)}%"></i>`).join('');
  return `
<div class="player paused" tabindex="0" data-duration="${DURATION}" aria-label="ACE-T narrated walkthrough. Press space to play or pause.">
  <audio preload="metadata" src="media/ace-t-walkthrough.mp3"></audio>
  <div class="stage">
    <div class="brandline"><span><b>ACE-T</b></span><span>Nursing care after a positive delirium screen</span></div>
    ${scenes}
    <button class="stage-start" type="button" aria-label="Play the walkthrough"><span class="bigplay">${icon('play')}</span><span class="startlabel">Play the walkthrough · 4 min 41 s</span></button>
    <div class="progress-mini" aria-hidden="true"></div>
  </div>
  <div class="captionbar" aria-live="off"><p class="cap"></p></div>
  <div class="controls">
    <button class="ctl play" type="button" aria-label="Play" data-play='${icon('play')}' data-pause='${icon('pause')}'>${icon('play')}</button>
    <button class="ctl back" type="button" aria-label="Back 10 seconds">${icon('back')}</button>
    <div class="scrub"><input type="range" min="0" max="${DURATION}" step="0.1" value="0" aria-label="Seek"><span class="ticks" aria-hidden="true">${ticks}</span></div>
    <span class="time" aria-hidden="true">0:00 / ${fmt(DURATION)}</span>
    <button class="ctl fwd" type="button" aria-label="Forward 10 seconds">${icon('fwd')}</button>
    <button class="ctl speed" type="button" aria-label="Playback speed 1">1×</button>
    <button class="ctl cc" type="button" aria-pressed="true" aria-label="Captions">${icon('cc')}</button>
    <button class="ctl fs" type="button" aria-label="Full screen">${icon('expand')}</button>
  </div>
</div>
<script type="application/json" id="wt-captions">${caps.replace(/</g, '\\u003c')}</script>`;
}

export function chaptersHtml() {
  return `<ol class="chapters">${CHAPTERS.map((c, i) => `<li><button type="button" data-start="${c.start}"${c.d ? ` data-d="${c.d}"` : ''} aria-current="${i === 0}"><span class="ch-time">${fmt(c.start)}</span><span><span class="ch-sec">${esc(c.section)}</span><span class="ch-title">${esc(c.title)}</span></span></button></li>`).join('')}</ol>`;
}

export function transcriptHtml() {
  return CHAPTERS.map(c => {
    const ws = WORDS.filter(w => w.s >= c.start - 0.3 && w.s < c.end - 0.3);
    const body = ws.map(w => `<span class="w" data-s="${w.s}">${esc(w.w)}</span>`).join(' ');
    return `<p data-start="${c.start}" tabindex="0"><span class="t-time">${fmt(c.start)}</span>${body}</p>`;
  }).join('\n');
}

export function plainTranscript() {
  return CHAPTERS.map(c => WORDS.filter(w => w.s >= c.start - 0.3 && w.s < c.end - 0.3).map(w => w.w).join(' ')).join('\n\n');
}

export function vtt() {
  const ts = t => { const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = (t % 60).toFixed(3).padStart(6, '0'); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`; };
  return 'WEBVTT\n\n' + data.captions.map((c, i) => `${i + 1}\n${ts(c.s)} --> ${ts(c.e)}\n${c.t}\n`).join('\n');
}
