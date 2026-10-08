/*
 * knobs download page: the release state in step 3, with its file list and
 * build steps opened in place, and the copy buttons. Needs release.js
 * (window.knobsRelease).
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var KR = window.knobsRelease;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function setText(el, text) { if (el) el.textContent = text; }

  /* ---------- Announcements ---------- */

  var statusEl = $("#release-status");
  function announce(msg) {
    if (!statusEl) return;
    statusEl.textContent = "";
    setTimeout(function () { statusEl.textContent = msg; }, 60);
  }

  /* ---------- Release states ---------- */

  var stack = $('[data-release="stack"]');
  var build = $("#build");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shown = false;
  var landing = location.hash.slice(1);

  // The panel takes the active state's own height. When an answer changes
  // it, the panel moves from the old height to the new one on the same
  // curve the arriving state settles on (styles.css), so nothing under it
  // jumps.
  function resize(from) {
    var to = stack.offsetHeight;
    if (calm || Math.abs(to - from) < 1) return;
    stack.style.height = from + "px";
    stack.classList.add("is-sizing");
    stack.getBoundingClientRect(); // start from the old height
    stack.style.height = to + "px";
    stack._knobsTimer = setTimeout(stopResize, 360);
  }

  function stopResize() {
    clearTimeout(stack._knobsTimer);
    stack.classList.remove("is-sizing");
    stack.style.height = "";
  }

  function show(state) {
    var had = doc.activeElement;
    if (!stack || !stack.contains(had)) had = null;
    var from = stack ? stack.offsetHeight : 0;
    if (stack) stopResize();
    root.setAttribute("data-release-state", state);
    var active = null;
    $$('[data-release="stack"] > [data-when]').forEach(function (el) {
      var on = el.getAttribute("data-when") === state;
      el.classList.toggle("is-active", on);
      if (on) { el.removeAttribute("inert"); active = el; } else el.setAttribute("inert", "");
    });
    // The build steps open under the buttons of whichever state offers them.
    var actions = active && $(".actions", active);
    if (build && actions && actions.nextElementSibling !== build) actions.parentNode.insertBefore(build, actions.nextSibling);
    if (stack && shown) resize(from);
    shown = true;
    // Arriving by a link into the panel (#files, #build): once the answer
    // shows, land on the link's target, or on the panel when the answer
    // doesn't offer it (the build steps once a release exists, the file
    // list when the release has no files).
    var target = landing && state !== "static" && doc.getElementById(landing);
    if (target) {
      landing = "";
      if (stack.contains(target)) (active.contains(target) && !target.hidden ? target : $("#step-3")).scrollIntoView();
    }
    // The control that had focus left with its state (a retry, or an answer
    // arriving), or moved with the build steps. Chrome may still report a
    // now inert control as focused, so check for that too. Focus stays on
    // the build steps when the new state has them, and goes to the new
    // state's main action otherwise.
    if (had && (doc.activeElement !== had || had.closest("[inert]"))) {
      var next = !had.closest("[inert]") ? had : $(".btn-primary", active) || $("a, button, summary", active);
      if (next) next.focus();
    }
  }

  function kindTitle(f) {
    return { installer: "Installer", portable: "Portable zip", checksums: "Checksums" }[f.kind] || "Other file";
  }

  function sizeOf(f) { return f.sizeLabel ? f.sizeLabel.replace(" ", "\u00a0") : ""; }

  function describe(f) {
    if (f.kind === "installer") return "Windows x64 installer (." + f.ext + ")";
    if (f.kind === "portable") return "Portable zip for Windows x64";
    return f.name;
  }

  // "What it is · 4.5 MB", with the size kept on one line with its dot.
  function setDescription(node, f) {
    node.textContent = describe(f);
    if (!f.sizeLabel) return;
    node.appendChild(doc.createTextNode(" "));
    var size = doc.createElement("span");
    size.className = "nowrap sub-size";
    // Hidden from screen readers, like every other separator.
    var dot = doc.createElement("span");
    dot.className = "sub-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.textContent = "· ";
    size.appendChild(dot);
    size.appendChild(doc.createTextNode(sizeOf(f)));
    node.appendChild(size);
  }

  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function renderHero(rel) {
    var primary = rel.installer || rel.portable;
    var link = $('[data-hero="link"]');
    // The non-Windows note under the button names what the button gets.
    setText($('[data-hero="os-file"]'),
      rel.installer ? "This is the installer" : rel.portable ? "This is the portable zip" : "Its files are");
    // Without a file the button opens the release page, so it carries
    // GitHub's mark rather than the download arrow.
    $('[data-hero="icon"]').setAttribute("href", primary ? "#i-download" : "#i-github");
    if (primary) {
      link.href = primary.url;
      setText($('[data-hero="label"]'), "Download knobs " + rel.version);
      setDescription($('[data-hero="sub"]'), primary);
    } else {
      link.href = rel.url;
      setText($('[data-hero="label"]'), "knobs " + rel.version + " on GitHub");
      setText($('[data-hero="sub"]'), "Open the release to see its files");
    }
    // The date is added here, so it's never an empty <time>.
    var meta = $(".rs-meta");
    var sep = $(".sep", meta);
    var time = $("time", meta);
    if (!time) {
      time = doc.createElement("time");
      meta.insertBefore(time, sep);
    }
    time.textContent = rel.dateLabel;
    time.setAttribute("datetime", String(rel.publishedAt || "").slice(0, 10));
    time.hidden = sep.hidden = !rel.dateLabel;
    $('[data-hero="notes"]').href = rel.url;
    $('[data-hero="pre"]').hidden = !rel.prerelease;
    var zip = $('[data-hero="portable"]');
    if (rel.installer && rel.portable) {
      zip.href = rel.portable.url;
      setText($('[data-hero="portable-label"]'), "Portable zip" + (rel.portable.sizeLabel ? ", " + sizeOf(rel.portable) : ""));
      zip.hidden = false;
    } else {
      zip.hidden = true;
    }
  }

  function fileRow(f, rel, isPrimary, recommend) {
    var tpl = $("#tpl-file");
    var node = tpl.content.firstElementChild.cloneNode(true);
    function k(name) { return node.querySelector('[data-k="' + name + '"]'); }

    k("title").textContent = kindTitle(f);
    k("name").textContent = f.name;
    k("link").href = f.url;
    if (f.sizeLabel) k("size").textContent = sizeOf(f);
    else k("size-unit").remove();
    if (isPrimary) k("tag").hidden = !recommend;

    if (f.kind === "checksums") {
      k("sha-item").remove();
      k("cmd-item").remove();
      return node;
    }
    // With the hash, PowerShell prints True or False; -eq ignores case, so
    // its capitals match GitHub's lower case. The file name is escaped for
    // the double quotes, though GitHub already strips odd characters.
    var path = "\"$HOME\\Downloads\\" + f.name.replace(/[`$"\u201c\u201d\u201e]/g, "`$&") + "\"";
    var cmd = "(Get-FileHash " + path + " -Algorithm SHA256).Hash";
    // Same text, but a wrap never splits an option from its dash.
    var cmdEl = k("cmd");
    cmdEl.appendChild(el("span", "nowrap", "(Get-FileHash"));
    cmdEl.appendChild(doc.createTextNode(" " + path + " "));
    cmdEl.appendChild(el("span", "nowrap", "-Algorithm SHA256).Hash"));
    if (f.sha256) {
      cmd += " -eq '" + f.sha256 + "'";
      cmdEl.appendChild(doc.createTextNode(" "));
      cmdEl.appendChild(el("span", "nowrap", "-eq"));
      cmdEl.appendChild(doc.createTextNode(" "));
      cmdEl.appendChild(el("span", "cmd-hash", "'" + f.sha256 + "'"));
    }
    k("copy-cmd").setAttribute("data-copy", cmd);
    k("copy-cmd").setAttribute("aria-label", "Copy the PowerShell command for " + f.name);
    if (f.sha256) {
      k("sha").textContent = f.sha256;
      k("copy-sha").setAttribute("data-copy", f.sha256);
      k("copy-sha").setAttribute("aria-label", "Copy the SHA-256 of " + f.name);
    } else {
      k("sha-item").remove();
      k("cmd-help").textContent = rel.checksums
        ? "GitHub lists no SHA-256 for this file; the checksums file has it. Run this in PowerShell and compare the hash it prints:"
        : "This release lists no SHA-256 for this file. Run this in PowerShell to see its hash:";
    }
    return node;
  }

  function renderFiles(rel) {
    var list = $('[data-r="files"]');
    list.textContent = "";
    var primary = rel.installer || rel.portable;
    var apps = [rel.installer, rel.portable].concat(rel.other || []).filter(Boolean);
    // "Recommended" only means something beside another copy of knobs.
    apps.concat([rel.checksums]).forEach(function (f) {
      if (f) list.appendChild(fileRow(f, rel, f === primary, apps.length > 1));
    });
    // A release without files has nothing to list, so no "Checksums".
    var toggle = $(".rs-toggle");
    if (!list.children.length) expand(toggle, false);
    toggle.hidden = !list.children.length;
  }

  function renderError(reason) {
    var limited = reason === "rate-limited";
    var unlisted = reason === "unlisted";
    setText($('[data-error="head"]'), unlisted ? "Couldn’t find a release" : "Couldn’t check for a release");
    setText($('[data-error="reason"]'), limited
      ? "GitHub limits how often this page can check, and the limit was reached. The releases page works now."
      : unlisted ? "GitHub didn’t list one." : "GitHub couldn’t be reached.");
    // The rate-limit message already points to the releases page, and asking
    // again can't work until the limit resets, so there's no "Try again".
    // With no release listed, the releases page may not have the files.
    $('[data-error="after"]').hidden = limited || unlisted;
    // Nor can the note for visitors not on Windows point at those files,
    // so it says what knobs is for, as the page does before an answer.
    setText($('[data-error="os-what"]'), unlisted ? "knobs is" : "The files there are");
    setText($('[data-error="os-who"]'), unlisted ? "It doesn’t" : "knobs doesn’t");
    $("[data-retry]").hidden = limited;
    return unlisted
      ? "GitHub didn’t list a release. The releases page link still works."
      : "Couldn’t check GitHub for a release. The releases page link still works.";
  }

  function render(r) {
    r = r || { state: "error" };
    root.classList.toggle("is-preview", !!r.synthetic);

    if (r.state === "ready" && r.release) {
      renderHero(r.release);
      renderFiles(r.release);
      show("ready");
      announce((r.release.prerelease ? "Latest pre-release: knobs " : "Latest release: knobs ") + r.release.version +
        (r.release.dateLabel ? ", " + r.release.dateLabel : "") + ".");
    } else {
      var said = renderError(r.reason);
      show("error");
      announce(said);
    }
  }

  function load() {
    show("static");
    root.setAttribute("data-release-state", "loading");
    if (!KR) { render({ state: "error" }); return; }
    KR.load().then(render, function () { render({ state: "error" }); });
  }

  /* ---------- Measured: each chart's bars are drawn once ---------- */

  // The first time a chart comes into view, one sweep draws its bars from
  // zero at the same pace on every line (styles.css). Only charts still
  // below the fold wait for it; one already on screen stays drawn, and so
  // does every chart with reduced motion or without IntersectionObserver.
  (function () {
    var charts = $$("[data-sweep]");
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!charts.length || calm || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-swept");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -15% 0px" });
    charts.forEach(function (c) {
      if (c.getBoundingClientRect().top < window.innerHeight) return;
      c.classList.add("is-armed");
      io.observe(c);
    });
  })();

  /* ---------- Copy ---------- */

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = doc.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      doc.body.appendChild(ta);
      ta.select();
      try { if (doc.execCommand("copy")) resolve(); else reject(new Error("copy failed")); }
      catch (e) { reject(e); }
      finally { ta.remove(); }
    });
  }

  function flash(btn, label, ok) {
    var l = btn.querySelector(".copy-label");
    btn.classList.toggle("is-copied", ok);
    if (l) l.textContent = label;
    clearTimeout(btn._knobsTimer);
    btn._knobsTimer = setTimeout(function () {
      btn.classList.remove("is-copied");
      if (l) l.textContent = "Copy";
    }, 1800);
  }

  function selectContents(node) {
    if (!node) return;
    var range = doc.createRange();
    range.selectNodeContents(node);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  doc.addEventListener("click", function (e) {
    var t = e.target;
    if (!t.closest) return;

    var btn = t.closest(".copy");
    if (btn) {
      var from = btn.getAttribute("data-copy-from");
      var source = from ? $(from) : (btn.closest(".check") || btn.parentNode).querySelector("code");
      var text = btn.getAttribute("data-copy") || (source ? source.textContent : "");
      if (!text) return;
      copyText(text).then(function () {
        flash(btn, "Copied", true);
        announce("Copied to the clipboard.");
      }, function () {
        selectContents(source);
        flash(btn, "Press Ctrl+C", false);
        // The button's aria-label hides its new text, so say it.
        announce("Couldn’t copy. The text is selected, so press Ctrl+C to copy it.");
      });
      return;
    }

    if (t.closest("[data-retry]")) {
      load();
      return;
    }

    // "Checksums": shows or hides the file list under the panel's links.
    var toggle = t.closest("button[aria-controls]");
    if (toggle) expand(toggle, toggle.getAttribute("aria-expanded") !== "true");
  });

  function expand(btn, open) {
    var t = doc.getElementById(btn.getAttribute("aria-controls"));
    if (!t) return;
    btn.setAttribute("aria-expanded", String(open));
    t.hidden = !open;
  }

  // A link to #build opens the build steps; one to #files opens the file
  // list, with the button that controls it.
  function openTarget(id) {
    var t = id && doc.getElementById(id);
    if (!t) return;
    if (t.tagName === "DETAILS") t.open = true;
    else $$("button[aria-controls]").forEach(function (b) {
      if (b.getAttribute("aria-controls") === id && !b.hidden) expand(b, true);
    });
  }

  window.addEventListener("hashchange", function () { openTarget(location.hash.slice(1)); });
  openTarget(location.hash.slice(1));

  /* ---------- How it works: one signal through the path ---------- */

  // The first time the whole signal path is in view, one signal runs
  // through it (styles.css): a short pulse along each wire at one speed,
  // each stage's icon lighting as it arrives (knobs's stays lit), each
  // filter's dot in turn as the pulse runs down the chain, then on to the
  // cable and the apps. Only a path still below the fold waits for it, as
  // the charts do. With reduced motion, in forced colours or without
  // IntersectionObserver the drawing stays as it is.
  (function () {
    var fig = $(".signal");
    function matches(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }
    function calm() { return matches("(prefers-reduced-motion: reduce)") || matches("(forced-colors: active)"); }
    if (!fig || calm() || !("IntersectionObserver" in window)) return;
    if (fig.getBoundingClientRect().top < window.innerHeight) return;

    var stages = $$(".signal-path > .sp", fig);
    var chain = $(".sp-chain", fig);
    if (stages.length < 2 || !chain) return;

    var SPEED = 0.5;  // px per ms, on every wire
    var SLOW = 0.28;  // down the chain, so the filters light one by one
    var steps = [];
    for (var i = 0; i <= 10; i++) steps.push(i / 10);

    // The observer's view stops 16px short of the bottom edge, so the whole
    // drawing in view is a ratio of 1, itself a threshold: the check runs
    // the moment the drawing is whole, even on a slow scroll. A drawing
    // taller than that view plays once its top is in the top 35%.
    fig.classList.add("is-armed");
    var io = new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      var r = e.boundingClientRect, vh = window.innerHeight;
      var room = e.rootBounds ? e.rootBounds.height : vh - 16;
      var shown = e.intersectionRatio > 0.99 || (r.height > room && r.top <= vh * 0.35);
      if (!e.isIntersecting || !shown) return;
      io.disconnect();
      play();
    }, { threshold: steps, rootMargin: "0px 0px -16px 0px" });
    io.observe(fig);

    function setTime(el, name, ms) { el.style.setProperty(name, Math.round(ms) + "ms"); }

    // A pulse on the wire it shares its box with (styles.css).
    function addPulse(parent, down) {
      var p = doc.createElement("span");
      p.className = down ? "sp-pulse is-y" : "sp-pulse";
      p.setAttribute("aria-hidden", "true");
      parent.appendChild(p);
      var b = p.getBoundingClientRect();
      return { el: p, len: down ? b.height : b.width, top: b.top };
    }

    // The lit icon: an ink copy laid over the stage's icon for the run.
    function addLight(li) {
      var icon = $(".sp-icon", li);
      var lit = icon.cloneNode(true);
      lit.classList.add("is-lit");
      icon.parentNode.insertBefore(lit, icon.nextSibling);
      return lit;
    }

    function play() {
      fig.classList.remove("is-armed");
      if (calm()) return;

      var dash = parseFloat(getComputedStyle(fig).getPropertyValue("--sp-dash")) || 32;
      var down = stages[1].getBoundingClientRect().top >= stages[0].getBoundingClientRect().bottom;
      var lights = stages.map(addLight);
      var wires = stages.slice(0, -1).map(function (li) { return addPulse(li, down); });
      var run = addPulse(chain, true);
      var timed = [];

      // Starts a pulse at `at`; returns when its head reaches the wire's end.
      function send(w, at, speed) {
        speed = speed || SPEED;
        setTime(w.el, "--at", at);
        setTime(w.el, "--run", (w.len + dash) / speed);
        return at + w.len / speed;
      }

      setTime(lights[0], "--at", 0);
      var t = send(wires[0], 80);
      setTime(lights[1], "--at", t);

      // Down the chain: each dot lights as the pulse's head passes it.
      var c0 = t + 200;
      $$("li", chain).forEach(function (li) {
        var b = li.getBoundingClientRect();
        setTime(li, "--at", c0 + Math.max(0, b.top + b.height / 2 - run.top) / SLOW);
        timed.push(li);
      });
      t = send(run, c0, SLOW) + 160;

      // Out of knobs, into the cable, and on to the apps.
      for (var n = 1; n < wires.length; n++) {
        t = send(wires[n], t);
        setTime(lights[n + 1], "--at", t);
        t += 40;
      }

      fig.classList.add("is-playing");
      setTimeout(function () {
        fig.classList.remove("is-playing");
        wires.concat(run).forEach(function (w) { w.el.remove(); });
        lights.forEach(function (el) { el.remove(); });
        timed.forEach(function (el) {
          el.style.removeProperty("--at");
          if (!el.getAttribute("style")) el.removeAttribute("style");
        });
      }, t + 1000);
    }
  })();

  /* ---------- The wave ---------- */

  // The clip at the seam lies flat on the rule until the release has
  // settled and the whole strip is in view, then rises and starts to drift
  // (styles.css). It runs only while it's on screen and the tab is
  // showing. Reduced motion never moves it.
  var wave = $(".wave");
  if (wave) {
    var hasIO = "IntersectionObserver" in window;
    var waveSeen = !hasIO, waveWhole = !hasIO;
    var waveRun = function () {
      if (waveWhole && !doc.hidden && /^(ready|error)$/.test(root.getAttribute("data-release-state"))) {
        wave.classList.add("is-up");
      }
      wave.classList.toggle("is-paused", !waveSeen || doc.hidden || !wave.classList.contains("is-up"));
    };
    // Each step of the drift moves the clip one device pixel at whatever
    // pixel ratio the screen has (125% and 150% scaling included): one
    // tile, read from the first copy's offset, in tile x ratio steps. Its
    // hairlines then never land between pixels, so they never blur or
    // shimmer while it moves. Asked again when the ratio changes (a zoom,
    // or the window moving to another screen).
    var waveUse = wave.querySelector("use");
    var waveTile = waveUse ? parseFloat(waveUse.getAttribute("x")) : 0;
    var waveSteps = function () {
      var ratio = window.devicePixelRatio || 1;
      if (waveTile) wave.style.setProperty("--wave-steps", String(Math.max(1, Math.round(waveTile * ratio))));
      if (window.matchMedia) {
        var mq = window.matchMedia("(resolution: " + ratio + "dppx)");
        var again = function () {
          if (mq.removeEventListener) mq.removeEventListener("change", again); else mq.removeListener(again);
          waveSteps();
        };
        if (mq.addEventListener) mq.addEventListener("change", again); else mq.addListener(again);
      }
    };
    waveSteps();
    if (hasIO) {
      new IntersectionObserver(function (entries) {
        var e = entries[entries.length - 1];
        waveSeen = e.isIntersecting;
        waveWhole = e.intersectionRatio > 0.99;
        waveRun();
      }, { threshold: [0, 1] }).observe(wave);
    }
    doc.addEventListener("visibilitychange", waveRun);
    if ("MutationObserver" in window) {
      new MutationObserver(waveRun).observe(root, { attributes: true, attributeFilter: ["data-release-state"] });
    } else {
      wave.classList.add("is-up");
    }
    waveRun();
  }

  load();
})();
