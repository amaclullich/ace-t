(function () {
  var player = document.querySelector('.player');
  if (!player) return;
  var audio = player.querySelector('audio');
  var stage = player.querySelector('.stage');
  var startBtn = player.querySelector('.stage-start');
  var playBtn = player.querySelector('.ctl.play');
  var backBtn = player.querySelector('.ctl.back');
  var fwdBtn = player.querySelector('.ctl.fwd');
  var ccBtn = player.querySelector('.ctl.cc');
  var speedBtn = player.querySelector('.ctl.speed');
  var fsBtn = player.querySelector('.ctl.fs');
  var scrub = player.querySelector('.scrub input');
  var timeEl = player.querySelector('.time');
  var capBar = document.querySelector('.captionbar');
  var capText = capBar ? capBar.querySelector('.cap') : null;
  var mini = player.querySelector('.progress-mini');
  var chapterBtns = Array.prototype.slice.call(document.querySelectorAll('.chapters button'));
  var paras = Array.prototype.slice.call(document.querySelectorAll('.transcript p'));
  var words = Array.prototype.slice.call(document.querySelectorAll('.transcript .w'));
  var wordTimes = words.map(function (w) { return +w.getAttribute('data-s'); });
  var caps = JSON.parse(document.getElementById('wt-captions').textContent);
  var DURATION = +player.getAttribute('data-duration');

  var scenes = Array.prototype.slice.call(player.querySelectorAll('.scene')).map(function (el) {
    return {
      el: el,
      s: +el.getAttribute('data-start'),
      e: +el.getAttribute('data-end'),
      items: Array.prototype.slice.call(el.querySelectorAll('[data-t]')).map(function (n) { return { n: n, t: +n.getAttribute('data-t') }; }),
      dims: Array.prototype.slice.call(el.querySelectorAll('[data-dim]')).map(function (n) { return { n: n, t: +n.getAttribute('data-dim') }; })
    };
  });

  var current = -1, raf = 0, lastWord = -1, lastCap = -1, lastPara = -1;
  var speeds = [1, 1.25, 1.5, 0.75];
  var speedIdx = 0;

  function fmt(t) {
    t = Math.max(0, Math.floor(t));
    return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
  }
  function sceneAt(t) {
    for (var i = scenes.length - 1; i >= 0; i--) if (t >= scenes[i].s - 0.05) return i;
    return 0;
  }
  function lastIndexAtOrBefore(arr, t) {
    var lo = 0, hi = arr.length - 1, ans = -1;
    while (lo <= hi) { var mid = (lo + hi) >> 1; if (arr[mid] <= t) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
    return ans;
  }

  function render(t, instant) {
    if (instant) stage.classList.add('instant');
    var idx = sceneAt(t);
    if (idx !== current) {
      scenes.forEach(function (sc, i) {
        var on = i === idx;
        sc.el.classList.toggle('active', on);
        sc.el.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (!on) {
          sc.items.forEach(function (it) { it.n.classList.remove('on'); });
          sc.dims.forEach(function (it) { it.n.classList.remove('dim'); });
        }
      });
      chapterBtns.forEach(function (b, i) { b.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
      current = idx;
    }
    var sc = scenes[idx];
    sc.items.forEach(function (it) { it.n.classList.toggle('on', t >= it.t); });
    sc.dims.forEach(function (it) { it.n.classList.toggle('dim', t >= it.t); });

    // captions
    var ci = -1;
    for (var k = 0; k < caps.length; k++) { if (t >= caps[k].s - 0.05 && t < caps[k].e + 0.35) { ci = k; } }
    if (!player.classList.contains('started')) ci = -1;
    if (ci !== lastCap && capText) { capText.textContent = ci >= 0 ? caps[ci].t : ''; lastCap = ci; }

    // transcript
    var wi = lastIndexAtOrBefore(wordTimes, t + 0.02);
    if (wi !== lastWord) {
      if (lastWord >= 0 && words[lastWord]) words[lastWord].classList.remove('now');
      if (wi >= 0 && !audio.paused) words[wi].classList.add('now');
      lastWord = wi;
    }
    if (idx !== lastPara) {
      paras.forEach(function (p, i) { p.classList.toggle('current', i === idx); });
      lastPara = idx;
    }

    var pct = Math.min(100, (t / DURATION) * 100);
    scrub.value = t.toFixed(1);
    scrub.style.setProperty('--pct', pct + '%');
    scrub.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(DURATION) + ', ' + chapterBtns[idx].querySelector('.ch-title').textContent);
    if (mini) mini.style.width = pct + '%';
    timeEl.textContent = fmt(t) + ' / ' + fmt(DURATION);
    if (instant) requestAnimationFrame(function () { requestAnimationFrame(function () { stage.classList.remove('instant'); }); });
  }

  function loop() {
    render(audio.currentTime, false);
    if (!audio.paused) raf = requestAnimationFrame(loop);
  }
  function setPlaying(p) {
    player.classList.toggle('paused', !p);
    player.classList.toggle('playing', p);
    playBtn.innerHTML = p ? playBtn.getAttribute('data-pause') : playBtn.getAttribute('data-play');
    playBtn.setAttribute('aria-label', p ? 'Pause' : 'Play');
  }
  function play() {
    player.classList.add('started');
    var pr = audio.play();
    if (pr && pr.catch) pr.catch(function () { setPlaying(false); });
  }
  function toggle() { if (audio.paused) play(); else audio.pause(); }
  function seek(t, andPlay) {
    t = Math.max(0, Math.min(DURATION - 0.1, t));
    audio.currentTime = t;
    player.classList.add('started');
    render(t, true);
    if (andPlay && audio.paused) play();
  }

  audio.addEventListener('play', function () { setPlaying(true); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); });
  audio.addEventListener('pause', function () { setPlaying(false); cancelAnimationFrame(raf); render(audio.currentTime, false); });
  audio.addEventListener('ended', function () { setPlaying(false); });
  audio.addEventListener('seeked', function () { render(audio.currentTime, true); });

  startBtn.addEventListener('click', function () { seek(0, false); play(); });
  playBtn.addEventListener('click', toggle);
  backBtn.addEventListener('click', function () { seek(audio.currentTime - 10, false); });
  fwdBtn.addEventListener('click', function () { seek(audio.currentTime + 10, false); });
  scrub.addEventListener('input', function () { seek(+scrub.value, false); });
  ccBtn.addEventListener('click', function () {
    var on = ccBtn.getAttribute('aria-pressed') !== 'true';
    ccBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (capBar) capBar.hidden = !on;
  });
  speedBtn.addEventListener('click', function () {
    speedIdx = (speedIdx + 1) % speeds.length;
    audio.playbackRate = speeds[speedIdx];
    speedBtn.textContent = speeds[speedIdx] + '×';
    speedBtn.setAttribute('aria-label', 'Playback speed ' + speeds[speedIdx]);
  });
  if (fsBtn) {
    if (!player.requestFullscreen && !player.webkitRequestFullscreen) fsBtn.hidden = true;
    fsBtn.addEventListener('click', function () {
      var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
      else { (player.requestFullscreen || player.webkitRequestFullscreen).call(player); }
    });
  }
  chapterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      seek(+b.getAttribute('data-start'), true);
      player.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  paras.forEach(function (p) {
    p.addEventListener('click', function (e) {
      var w = e.target.closest ? e.target.closest('.w') : null;
      seek(w ? +w.getAttribute('data-s') : +p.getAttribute('data-start'), true);
    });
    p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seek(+p.getAttribute('data-start'), true); } });
  });
  player.addEventListener('keydown', function (e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') && (e.key === ' ' || e.key === 'Enter')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowRight' && e.target.tagName !== 'INPUT') { e.preventDefault(); seek(audio.currentTime + 5, false); }
    else if (e.key === 'ArrowLeft' && e.target.tagName !== 'INPUT') { e.preventDefault(); seek(audio.currentTime - 5, false); }
    else if (e.key === 'c') { ccBtn.click(); }
    else if (e.key === 'f' && fsBtn) { fsBtn.click(); }
  });

  // Start from a link such as walkthrough.html#t=85
  var m = /t=(\d+(?:\.\d+)?)/.exec(location.hash);
  render(m ? +m[1] : 0, true);
  if (m) { audio.currentTime = +m[1]; player.classList.add('started'); }
  setPlaying(false);
  player.classList.add('ready');
})();
