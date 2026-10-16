/*
 * knobs download page: the release in three places, the hero's big
 * button, Download for Windows (a row per file with its checksum opened in
 * place) and Get knobs where the page ends; the copy buttons; the charts'
 * one sweep and the signal path's one pass; the video's controls and its
 * expanded view. Needs release.js (window.knobsRelease). Light and dark
 * are theme.js's.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var KR = window.knobsRelease;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function setText(el, text) { if (el) el.textContent = text; }
  function setAll(sel, text) { $$(sel).forEach(function (el) { el.textContent = text; }); }

  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  /* ---------- Announcements ---------- */

  var statusEl = $("#release-status");
  function announce(msg) {
    if (!statusEl) return;
    statusEl.textContent = "";
    setTimeout(function () { statusEl.textContent = msg; }, 60);
  }

  /* ---------- Release states ---------- */

  // Three stacks follow one state: the hero's ([data-release="hero"]),
  // Download for Windows' ([data-release="files"]) and the one where the
  // page ends ([data-release="end"]). Each shows only its active state, so
  // it's as tall as what it holds. One live region speaks for all three.
  var stacks = $$("[data-release]");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shown = false;
  // Arriving by a link into the release (#files), the page lands on the
  // link's target once the answer shows (see land). A visitor who has moved
  // on by then, by scrolling, clicking, tapping, pressing a key or following
  // another link, is left where they are.
  var landing = location.hash.slice(1);
  var MOVES = ["wheel", "touchmove", "pointerdown", "keydown"];
  function stayPut() {
    landing = "";
    MOVES.forEach(function (t) { window.removeEventListener(t, stayPut, true); });
  }
  if (landing) MOVES.forEach(function (t) { window.addEventListener(t, stayPut, { capture: true, passive: true }); });

  // A stack takes its active state's own height. When an answer changes
  // it, the stack moves from the old height to the new one on the same
  // curve the arriving state settles on (styles.css), so nothing under it
  // jumps.
  function resize(stack, from) {
    var to = stack.offsetHeight;
    if (calm || Math.abs(to - from) < 1) return;
    stack.style.height = from + "px";
    stack.classList.add("is-sizing");
    stack.getBoundingClientRect(); // start from the old height
    stack.style.height = to + "px";
    stack._knobsTimer = setTimeout(function () { stopResize(stack); }, 360);
  }

  function stopResize(stack) {
    clearTimeout(stack._knobsTimer);
    stack.classList.remove("is-sizing");
    stack.style.height = "";
  }

  function activeIn(stack) {
    return $$("[data-when]", stack).filter(function (s) { return s.parentNode === stack && s.classList.contains("is-active"); })[0] || null;
  }

  function show(state) {
    var had = doc.activeElement;
    var hadStack = stacks.filter(function (s) { return s.contains(had); })[0] || null;
    var froms = stacks.map(function (s) { return s.offsetHeight; });
    stacks.forEach(stopResize);
    root.setAttribute("data-release-state", state);
    stacks.forEach(function (stack, i) {
      $$("[data-when]", stack).forEach(function (s) {
        if (s.parentNode !== stack) return;
        var on = s.getAttribute("data-when") === state;
        s.classList.toggle("is-active", on);
        if (on) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      });
      if (shown) resize(stack, froms[i]);
    });
    shown = true;
    land(state);
    // The control that had focus left with its state (a retry, or an answer
    // arriving). Chrome may still report a now inert control as focused, so
    // check for that too. Focus goes to the main action of the same place's
    // new state: the big button in the hero and where the page ends, the
    // first file's Download in Download for Windows.
    if (hadStack && (doc.activeElement !== had || had.closest("[inert]"))) {
      var active = activeIn(hadStack);
      var next = !had.closest("[inert]") ? had : active && ($(".btn-primary, .file-dl", active) || $("a, button, summary", active));
      if (next) next.focus();
    }
  }

  // Once the answer shows, a visitor who arrived by a link into it lands
  // on its target: #files opens every file's checksum. Without an answer
  // to show it in (an error), they land on the section instead. A target
  // after the rows (the build steps, a later section) moved down when the
  // rows arrived, unless the browser held it in place, so once the rows
  // have settled the page lands on it again.
  function land(state) {
    if (!landing || state === "static") return;
    var id = landing;
    var target = doc.getElementById(id);
    var stack = target && stacks.filter(function (s) { return s.contains(target); })[0];
    if (target && !stack) {
      setTimeout(function () {
        if (landing !== id) return; // the visitor moved on
        stayPut();
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }, calm ? 0 : 360);
      return;
    }
    stayPut();
    if (!stack) return;
    var active = activeIn(stack);
    if (active && active.contains(target) && !target.hidden) {
      if (target.id === "files") openChecks();
      target.scrollIntoView();
    } else {
      (stack.closest("section") || stack).scrollIntoView();
    }
  }

  function kindTitle(f) {
    return { installer: "Installer", portable: "Portable zip", checksums: "Checksums file" }[f.kind] || "Other file";
  }

  function sizeOf(f) { return f.sizeLabel ? f.sizeLabel.replace(" ", "\u00a0") : ""; }

  // Off Windows the label already says Windows, so the line under it
  // doesn't say it again (a screen reader reads the two as one name).
  function describe(f, away) {
    if (f.kind === "installer") return (away ? "" : "Windows ") + "x64 installer (." + f.ext + ")";
    if (f.kind === "portable") return away ? "x64 portable zip" : "Portable zip for Windows x64";
    return f.name;
  }

  // "What it is · 4.8 MB", with the size kept on one line with its dot.
  function setDescription(node, f, away) {
    node.textContent = describe(f, away);
    if (!f.sizeLabel) return;
    node.appendChild(doc.createTextNode(" "));
    var size = el("span", "nowrap sub-size");
    // Hidden from screen readers, like every other separator.
    var dot = el("span", "sub-dot", "· ");
    dot.setAttribute("aria-hidden", "true");
    size.appendChild(dot);
    size.appendChild(doc.createTextNode(sizeOf(f)));
    node.appendChild(size);
  }

  // The big button, in the hero and again where the page ends. Off Windows
  // it reads "Download for Windows", under the note that says what knobs
  // runs on, for someone fetching it for their PC, and its second line
  // names the file without saying Windows again.
  function renderGet(rel) {
    var primary = rel.installer || rel.portable;
    var away = root.classList.contains("not-windows");
    $$(".get").forEach(function (box) {
      function k(name) { return $('[data-get="' + name + '"]', box); }
      var link = k("link");
      // Without a file the button opens the release page, so it carries
      // GitHub's mark rather than the download arrow.
      k("icon").setAttribute("href", primary ? "#i-download" : "#i-github");
      if (primary) {
        link.href = primary.url;
        setText(k("label"), away ? "Download for Windows" : "Download knobs " + rel.version);
        setDescription(k("sub"), primary, away);
      } else {
        link.href = rel.url;
        setText(k("label"), "knobs " + rel.version + " on GitHub");
        setText(k("sub"), "Open the release to see its files");
      }
      k("pre").hidden = !rel.prerelease;
    });
  }

  // "Current version: 0.3.0 · October 13, 2026 | Release notes". The date
  // is added here, so it's never an empty <time>.
  function renderMeta(rel) {
    setText($('[data-r="version"]'), rel.version);
    $('[data-r="pre"]').hidden = !rel.prerelease;
    var date = $('[data-r="date"]');
    var time = $("time", date);
    if (!time) {
      time = doc.createElement("time");
      date.appendChild(time);
    }
    time.textContent = rel.dateLabel;
    time.setAttribute("datetime", String(rel.publishedAt || "").slice(0, 10));
    date.hidden = !rel.dateLabel;
    $('[data-r="notes"]').href = rel.url;
  }

  // What each kind of file is, in the row under its title.
  function fileDescription(node, f) {
    if (f.kind === "installer") {
      node.textContent = "Installs for your Windows account only, with no admin rights. With no virtual cable on your PC, it offers to install VB-CABLE.";
    } else if (f.kind === "portable") {
      // Only the installer carries VB-CABLE, so the zip says it leaves the
      // cable to the visitor.
      node.appendChild(doc.createTextNode("Unzip it anywhere and run "));
      node.appendChild(el("code", "", "knobs.exe"));
      node.appendChild(doc.createTextNode(". It keeps its settings in its own folder, and doesn’t install a cable for you."));
    } else if (f.kind === "checksums") {
      node.textContent = "The SHA-256 of every file in the release.";
    } else {
      node.remove();
    }
  }

  // One file's row: its title, what it is, its name and size, its
  // Download, and its checksum: the SHA-256 with Copy and the PowerShell
  // line that prints True if the file matches, with Copy. The first copy of
  // knobs is the main download, and its row takes the cap-red edge. Every
  // file that runs knobs has the outlined Download; the checksums file is
  // there to check the others, so its Download is a quiet link.
  function fileRow(f, rel, isPrimary, recommend) {
    var tpl = $("#tpl-file");
    var node = tpl.content.firstElementChild.cloneNode(true);
    function k(name) { return node.querySelector('[data-k="' + name + '"]'); }

    node.classList.add("is-" + f.kind);
    if (isPrimary) node.classList.add("is-primary");
    k("title").textContent = kindTitle(f);
    if (isPrimary) k("tag").hidden = !recommend;
    else k("tag").remove();
    fileDescription(k("desc"), f);
    k("name").textContent = f.name;
    if (f.sizeLabel) k("size").textContent = sizeOf(f);
    else k("size-unit").remove();

    var link = k("link");
    link.href = f.url;
    // Every file that runs knobs gets the outlined button, the big solid one
    // being the hero's; the checksums file, which only checks the others, a
    // quiet link.
    if (f.kind === "checksums") link.className = "file-dl file-link";
    else link.classList.add("btn-secondary");
    k("link-name").textContent = " " + f.name;

    if (f.kind === "checksums") {
      k("check").remove();
      return node;
    }
    k("check-name").textContent = " of " + f.name;

    // With the hash, PowerShell prints True or False; -eq ignores case, so
    // its capitals match GitHub's lower case. A file that isn't at the path
    // (saved elsewhere, or renamed by a second download) would otherwise
    // print an error and then a False, which reads as a tampered file:
    // -ErrorAction Stop ends the line at the error. The file name is escaped
    // for the double quotes, though GitHub already strips odd characters.
    var path = "\"$HOME\\Downloads\\" + f.name.replace(/[`$"\u201c\u201d\u201e]/g, "`$&") + "\"";
    var cmd = "(Get-FileHash " + path + " -Algorithm SHA256 -ErrorAction Stop).Hash";
    // Same text, but a wrap never splits an option from its dash or its value.
    var cmdEl = k("cmd");
    cmdEl.appendChild(el("span", "nowrap", "(Get-FileHash"));
    cmdEl.appendChild(doc.createTextNode(" " + path + " "));
    cmdEl.appendChild(el("span", "nowrap", "-Algorithm SHA256"));
    cmdEl.appendChild(doc.createTextNode(" "));
    cmdEl.appendChild(el("span", "nowrap", "-ErrorAction Stop).Hash"));
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
    } else if (rel.checksums) {
      // The line prints a hash, not True or False: the checksums file holds
      // the one to compare it with.
      k("sha-item").remove();
      k("cmd-help").textContent = "GitHub lists no SHA-256 for this file, but the checksums file has it. Run this in PowerShell and compare the hash it prints with that one.";
      k("cmd-result").textContent = "If the two differ,";
    } else {
      // Nothing to compare with, so nothing to say about a mismatch.
      k("sha-item").remove();
      k("cmd-help").textContent = "This release lists no SHA-256 for this file. Run this in PowerShell to see its hash.";
      k("cmd-after").remove();
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
    // A release without files has no rows: its page on GitHub instead.
    var none = !list.children.length;
    list.hidden = none;
    $('[data-r="nofiles"]').hidden = !none;
    $('[data-r="release"]').href = rel.url;
    setText($('[data-r="release-label"]'), "knobs " + rel.version + " on GitHub");
    // The hero's "Other downloads and checksums" now lands on the rows, with
    // every checksum open. With no rows it would promise files that aren't
    // there, so it goes. (In the error states styles.css hides it: it would
    // only lead back to the same error.)
    var more = $(".hero-more");
    if (more) {
      more.hidden = none;
      $("a", more).setAttribute("href", "#files");
    }
  }

  function openChecks() {
    $$("#files details.file-check").forEach(function (d) { d.open = true; });
  }

  function renderError(reason) {
    var limited = reason === "rate-limited";
    var unlisted = reason === "unlisted";
    var head = unlisted ? "Couldn’t find a release" : "Couldn’t check for a release";
    var why = limited
      ? "GitHub limits how often this page can check, and that limit is used up for now. The releases page on GitHub still has every file."
      : unlisted ? "GitHub didn’t list one." : "This page couldn’t reach GitHub.";
    setAll('[data-error="head"]', head);
    setAll('[data-error="reason"]', why);
    // The rate-limit message already points to the releases page, and asking
    // again can't work until the limit resets, so there's no "Try again".
    // With no release listed, the releases page may not have the files.
    $$('[data-error="after"]').forEach(function (n) { n.hidden = limited || unlisted; });
    $$("[data-retry]").forEach(function (b) { b.hidden = limited; });
    // Said aloud as it reads on the page.
    return head + ". " + why + (limited || unlisted ? "" : " The releases page on GitHub has every file.");
  }

  function render(r) {
    r = r || { state: "error" };
    root.classList.toggle("is-preview", !!r.synthetic);

    if (r.state === "ready" && r.release) {
      renderGet(r.release);
      renderMeta(r.release);
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

    if (t.closest("[data-retry]")) load();
    // A link to #files opens every checksum even when the address already
    // ends in #files, where no hashchange follows the click.
    else if (t.closest('a[href="#files"]')) openChecks();
  });

  // A link to #build opens the build steps (its target sits inside them);
  // one to #files opens every file's checksum, once the files are there.
  function openTarget(id) {
    if (id === "files") openChecks();
    var t = id && doc.getElementById(id);
    var d = t && t.closest("details");
    if (d) d.open = true;
  }

  window.addEventListener("hashchange", function () { stayPut(); openTarget(location.hash.slice(1)); });
  openTarget(location.hash.slice(1));

  /* ---------- How it works: one signal through the path ---------- */

  // The first time the whole signal path is in view, one signal runs
  // through it (styles.css draws it): out of the mic in ink and into knobs,
  // where each filter's fader runs up to its setting in turn, top to
  // bottom; then out of knobs in cap red, through the cable to the apps,
  // each lighting as the signal reaches it. The whole path holds lit for a
  // moment, then settles. It runs once. A path already on screen when the
  // page loads stays as it is, lit, and so does the drawing with reduced
  // motion, in forced colours, or without IntersectionObserver or the Web
  // Animations API.
  //
  // The signal travels on the page's one curve (--ease), in two legs: the
  // mic to knobs, and knobs to the apps without a stop at the cable. Each
  // leg's curve starts at its first icon's centre and is laid so the signal
  // reaches its last icon ARRIVE of the way along it: it comes out of an
  // icon already moving, and slows into the next without crawling, since
  // the curve's slowest stretch falls out of sight. Both legs keep one
  // speed, set from the path's length so the signal is in sight for MOVING
  // ms at any width or text size, and the pass takes about three seconds:
  // well under the five after which moving content needs a way to pause it
  // (WCAG 2.2.2).
  (function () {
    var fig = $(".signal");
    if (!fig) return;
    function matches(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }
    function still() { return matches("(prefers-reduced-motion: reduce)") || matches("(forced-colors: active)"); }

    var stages = $$(".signal-path > .sp", fig);
    var knobs = $(".sp-knobs", fig);
    var k = stages.indexOf(knobs);
    var rows = $$(".sp-chain > li", fig);
    if (still() || !("IntersectionObserver" in window) || !fig.animate || k < 1 || k > stages.length - 2 || !rows.length) return;

    var MOVING = 1900; // ms the signal is in sight on the wires, mic to apps
    var ARRIVE = 0.7;  // how far along its curve a leg reaches its last icon
    var DWELL = 100;   // from the signal reaching knobs to its first filter lighting
    var STEP = 90;     // from one filter lighting to the next
    var HOLD = 600;    // the whole path lit, from the signal reaching the apps
    var SETTLE = parseFloat(getComputedStyle(root).getPropertyValue("--duration-slow")) || 320;
    var timers = [];
    var anims = [];
    var timed = [];
    var width = 0;

    // The page's one curve, the cubic-bezier in --ease: time and distance
    // as functions of one parameter, both rising from 0 to 1, so halving
    // finds the parameter for a given time or distance.
    var ease = (getComputedStyle(root).getPropertyValue("--ease").match(/-?\d*\.?\d+/g) || []).map(Number);
    if (ease.length !== 4) ease = [0.2, 0, 0, 1];
    function bez(p1, p2, t) { var u = 1 - t; return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t; }
    function rate(p1, p2, t) { var u = 1 - t; return 3 * u * u * p1 + 6 * u * t * (p2 - p1) + 3 * t * t * (1 - p2); }
    function solve(p1, p2, v) {
      var lo = 0, hi = 1;
      for (var i = 0; i < 30; i++) {
        var mid = (lo + hi) / 2;
        if (bez(p1, p2, mid) < v) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
    // The share of a leg's time the signal takes to cover a share of its way.
    function when(d) { return bez(ease[0], ease[2], solve(ease[1], ease[3], d)); }
    // Its speed against the leg's average, and its top speed, which the
    // trail is measured against.
    function speed(t) { return rate(ease[1], ease[3], t) / Math.max(rate(ease[0], ease[2], t), 1e-6); }
    var top = 0;
    for (var t = 0; t <= 1; t += 1 / 64) top = Math.max(top, speed(t));

    // When a part lights (--at) and, for what goes out again, when (--off).
    function setTime(node, on, off) {
      node.style.setProperty("--at", Math.round(on) + "ms");
      if (off !== undefined) node.style.setProperty("--off", Math.round(off) + "ms");
      timed.push(node);
    }

    // A pulse on the wire it shares its box with (styles.css): the signal's
    // trail and head, which the box clips to the wire.
    function addPulse(li, down) {
      var p = el("span", down ? "sp-pulse is-y" : "sp-pulse");
      p.setAttribute("aria-hidden", "true");
      p.appendChild(el("span", "sp-trail"));
      p.appendChild(el("span", "sp-head"));
      li.appendChild(p);
      return p;
    }

    // The lit icon: a copy laid over the stage's icon for the pass.
    function addLight(li) {
      var icon = $(".sp-icon", li);
      var lit = icon.cloneNode(true);
      lit.classList.add("is-lit");
      icon.parentNode.insertBefore(lit, icon.nextSibling);
      return lit;
    }

    // Moves the signal along a leg from `at`: its head and trail on each of
    // the leg's wires, as transforms sampled from the curve every 16ms (a
    // frame), so the compositor runs them, until both are past the last
    // wire's end. The trail is as long as the signal is fast: its full
    // length from half its top speed up, and nothing at rest.
    function move(leg, at, g) {
      var end = leg.wires[leg.wires.length - 1].to + g.dash + g.head;
      var span = leg.ms * when(Math.min(1, (end - leg.from) / leg.len));
      var n = Math.ceil(span / 16) + 1;
      leg.wires.forEach(function (w) {
        var head = [], trail = [];
        for (var i = 0; i < n; i++) {
          var f = i / (n - 1);
          var t = solve(ease[0], ease[2], f * span / leg.ms);
          var x = leg.from + leg.len * bez(ease[1], ease[3], t) - w.from;
          var tail = Math.min(1, 2 * speed(t) / top);
          head.push({ offset: f, transform: g.move + "(" + (x - g.head / 2).toFixed(2) + "px)" });
          trail.push({ offset: f, transform: g.move + "(" + (x - g.dash).toFixed(2) + "px) " + g.scale + "(" + tail.toFixed(3) + ")" });
        }
        var timing = { duration: span, delay: at, fill: "both" };
        anims.push(w.el.lastChild.animate(head, timing), w.el.firstChild.animate(trail, timing));
      });
    }

    function stop() {
      timers.forEach(clearTimeout);
      timers = [];
      anims.forEach(function (a) { a.cancel(); });
      anims = [];
      fig.classList.remove("is-playing");
      $$(".sp-pulse, .sp-icon.is-lit", fig).forEach(function (n) { n.remove(); });
      timed.forEach(function (node) {
        node.style.removeProperty("--at");
        node.style.removeProperty("--off");
        if (!node.getAttribute("style")) node.removeAttribute("style");
      });
      timed = [];
    }

    function play() {
      stop();
      fig.classList.remove("is-armed");
      if (still()) return;

      // The path runs along one axis: across on wide screens, down on
      // narrow ones. Places on it are measured on that axis.
      var icons = stages.map(function (li) { return $(".sp-icon", li).getBoundingClientRect(); });
      var down = icons[1].top >= icons[0].bottom;
      var cs = getComputedStyle(fig);
      var g = {
        move: down ? "translateY" : "translateX",
        scale: down ? "scaleY" : "scaleX",
        dash: parseFloat(cs.getPropertyValue("--sp-dash")) || 44,
        head: parseFloat(cs.getPropertyValue("--pulse-box")) || 7
      };
      var c = icons.map(function (r) { return down ? r.top + r.height / 2 : r.left + r.width / 2; });
      var wires = stages.slice(0, -1).map(function (li) {
        var p = addPulse(li, down), r = p.getBoundingClientRect();
        return { el: p, from: down ? r.top : r.left, to: down ? r.bottom : r.right };
      });
      var last = stages.length - 1;
      // A leg from stage a to stage b: its curve starts at a's icon centre,
      // and the signal reaches the end of the last wire, at b's icon, ARRIVE
      // of the way along it. It shows from its first wire's start (lead).
      function leg(a, b) {
        var len = (wires[b - 1].to - c[a]) / ARRIVE;
        return { from: c[a], len: len, lead: (wires[a].from - c[a]) / len, wires: wires.slice(a, b) };
      }
      var toKnobs = leg(0, k), onward = leg(k, last);
      function seen(l) { return l.len * (when(ARRIVE) - when(l.lead)); }
      var msPerPx = MOVING / (seen(toKnobs) + seen(onward));
      toKnobs.ms = toKnobs.len * msPerPx;
      onward.ms = onward.len * msPerPx;
      // How long a leg's signal takes to reach a place on it.
      function reach(l, s) { return l.ms * when((s - l.from) / l.len); }

      // The mic lights as the signal sets off. Once it's in knobs, each
      // filter takes it in turn, and the signal leaves as the last one
      // lights: it shows on the next wire just then. Each stage after
      // knobs lights as the signal reaches it, and once it reaches the
      // apps the whole path holds lit, then settles.
      var arrive = reach(toKnobs, wires[k - 1].to);
      rows.forEach(function (li, i) { setTime(li, arrive + DWELL + i * STEP); });
      var out = arrive + DWELL + (rows.length - 1) * STEP;
      var leave = out - reach(onward, wires[k].from);
      var lit = stages.map(function (li, i) {
        if (i === 0) return 0;
        return i < k ? reach(toKnobs, wires[i - 1].to) : leave + reach(onward, wires[i - 1].to);
      });
      var settle = lit[last] + HOLD;
      stages.forEach(function (li, i) { if (i !== k) setTime(addLight(li), lit[i], settle); });
      move(toKnobs, 0, g);
      move(onward, leave, g);

      width = fig.offsetWidth;
      fig.getBoundingClientRect(); // the unlit drawing is laid out before the pass starts
      fig.classList.add("is-playing");
      timers.push(setTimeout(stop, settle + SETTLE));
    }

    // A pass is laid out for the drawing's width. If that changes mid-pass
    // (a phone turned), the pass ends there and the drawing settles.
    window.addEventListener("resize", function () {
      if (!fig.classList.contains("is-playing") || fig.offsetWidth === width) return;
      stop();
    });

    // In view: the whole drawing inside the window, clear of its bottom
    // tenth, or, for a drawing taller than that (very large text), filling
    // the window's middle third. The pass starts then, at once.
    var steps = [];
    for (var i = 0; i <= 10; i++) steps.push(i / 10);
    var io = new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      var r = e.boundingClientRect, vh = window.innerHeight;
      var zone = e.rootBounds ? e.rootBounds.height : vh * 0.9;
      if (e.isIntersecting && (e.intersectionRatio > 0.99 || (r.height > zone && r.top <= vh / 3 && r.bottom >= vh * 2 / 3))) {
        io.disconnect();
        play();
      }
    }, { threshold: steps, rootMargin: "0px 0px -10% 0px" });

    if (fig.getBoundingClientRect().top >= window.innerHeight) {
      fig.classList.add("is-armed");
      io.observe(fig);
    }
  })();

  /* ---------- The video ---------- */

  // The reel (index.html says what it is). This takes it over. It plays
  // only while it's on screen and the tab is showing, starting muted, since
  // browsers only start a muted video by themselves, and from the poster's
  // own frame, so the still turns into motion without a cut. When the
  // browser asks to save data, or the visitor asks for reduced motion, it
  // waits for Play, its poster showing. Nothing loads before it's wanted.
  // In place of the browser's controls, which stay only without
  // JavaScript, it gets three of its own, in a row under it:
  //   Pause and Play, so the loop can always be stopped (WCAG 2.2.2);
  //   the sound, off until the visitor turns it on;
  //   Expand, which opens the video large in a modal dialog over the
  //   dimmed page, the same <video> moved into it, so it plays on without
  //   a break, and its controls with it, where Expand becomes Minimize.
  // A visitor's own choice stands: paused stays paused until they press
  // Play, and Expand counts as pressing it.
  //
  // The loop runs on without a break at its seam. The browser's own loop
  // seeks back to the start, which leaves a gap there: a few milliseconds
  // of silence in Chrome, and as much as half a second in Safari. Where
  // Media Source Extensions take the file, it's fetched once and handed to
  // the video again ahead of each seam, end to end on one timeline, so the
  // picture and the sound run straight on. Each encode's sound is cut so
  // its packets tile the loop exactly (DESIGN.md, The reel), and the copies
  // meet with nothing between them. Without them, or if anything fails,
  // the browser's own loop plays the same files.
  (function () {
    var video = $(".video-frame video");
    if (!video) return;
    var frame = video.parentNode;
    var fig = frame.parentNode;
    var LOOP = 24;           // seconds: 1440 frames at 60 fps
    var START = 1312 / 60;   // the poster's frame
    var AHEAD = 12;          // seconds left in the timeline when the next copy goes in
    var still = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    // Read once: it only decides whether the loop starts by itself.
    var saveData = !!(navigator.connection && navigator.connection.saveData);
    var chosen = "";   // "play" or "pause", once the visitor says
    var hasIO = "IntersectionObserver" in window;
    // Where the frame is now, until the observer first reports, so a loop
    // that's on screen starts at once rather than waiting for it.
    var box = frame.getBoundingClientRect();
    var inView = !hasIO || (box.bottom > 0 && box.top < window.innerHeight);
    var expanded = false;
    var mode = "";       // "", then "mse" or "native"
    var ready = false;   // at the poster's frame, able to play

    video.controls = false;
    video.autoplay = false;
    video.muted = true;

    function icon(id) {
      var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "icon");
      svg.setAttribute("aria-hidden", "true");
      var use = doc.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", id);
      svg.appendChild(use);
      return svg;
    }
    function button(cls, id, word) {
      var b = el("button", "video-btn" + (word ? "" : " is-icon") + (cls ? " " + cls : ""));
      b.type = "button";
      b.appendChild(icon(id));
      if (word) b.appendChild(el("span", "", word));
      return b;
    }
    function setIcon(b, id) { $("use", b).setAttribute("href", id); }

    var bar = el("div", "video-controls");
    var play = button("", "#i-pause", "Pause");
    var sound = button("", "#i-muted");
    var grow = button("", "#i-expand");
    bar.appendChild(play);
    bar.appendChild(sound);
    bar.appendChild(grow);
    // Under the reel, never over it.
    function home() { fig.insertBefore(bar, frame.nextSibling); }
    home();

    function wanted() {
      if (chosen) return chosen === "play";
      return !saveData && !(still && still.matches);
    }
    function going() { return wanted() && (inView || expanded) && !doc.hidden; }
    // Playing, or about to: while the file loads, the button already offers
    // Pause, so the loop can be stopped before it starts.
    function playing() { return !video.paused || (!ready && !!mode && going()); }

    // Each button says what pressing it does; the sound's icon shows how
    // it is now, as players do.
    function label() {
      var on = playing();
      setIcon(play, on ? "#i-pause" : "#i-play");
      $("span", play).textContent = on ? "Pause" : "Play";
      play.setAttribute("aria-label", on ? "Pause the video" : "Play the video");
      setIcon(sound, video.muted ? "#i-muted" : "#i-sound");
      sound.setAttribute("aria-label", video.muted ? "Turn the sound on" : "Turn the sound off");
      setIcon(grow, expanded ? "#i-minimize" : "#i-expand");
      grow.setAttribute("aria-label", expanded ? "Minimize the video" : "Expand the video");
    }

    function update() {
      var go = going();
      if (go && !mode) load();
      if (go && ready) {
        var p = video.play();
        if (p && p.catch) p.catch(function () { label(); });
      } else if (!go && !video.paused) {
        video.pause();
      }
      label();
    }

    // Loading, the first time it's wanted: the first encode Media Source
    // Extensions take, played gaplessly, or else the browser's own choice
    // and loop.
    function load() {
      var MS = window.ManagedMediaSource || window.MediaSource;
      var src = MS && MS.isTypeSupported && $$("source", video).filter(function (s) {
        return MS.isTypeSupported(s.type);
      })[0];
      if (!src || !window.fetch || !window.Promise || !window.DataView) return native();
      gapless(MS, src);
    }

    // The browser's own loop, from the poster's frame: set before anything
    // loads, the time is where playback starts.
    function native() {
      if (mode === "native") return;
      mode = "native";
      video.removeAttribute("src");
      video.loop = true;
      video.load();
      video.currentTime = START;
      ready = true;
      update();
    }

    // An encode is an MP4 in fragments: its header (ftyp, moov, sidx), then
    // the fragments (moof and mdat), then an index (mfra). The header goes
    // in once; the fragments go in again for every loop.
    function split(buf) {
      var view = new DataView(buf), at = 0, first = -1, end = buf.byteLength;
      while (at + 8 <= buf.byteLength) {
        var size = view.getUint32(at);
        var type = String.fromCharCode(view.getUint8(at + 4), view.getUint8(at + 5), view.getUint8(at + 6), view.getUint8(at + 7));
        if (size < 8) throw new Error("box size");
        if (type === "moof" && first < 0) first = at;
        if (type === "mfra") { end = at; break; }
        at += size;
      }
      if (first < 0) throw new Error("no fragments");
      return { head: buf.slice(0, first), body: buf.slice(first, end) };
    }

    function gapless(MS, src) {
      mode = "mse";
      var ms = new MS();
      var sb, parts, copies = 0, busy = false, failed = false;
      var chain = Promise.resolve();

      function fail() {
        if (failed) return;
        failed = true;
        mode = "";
        video.removeEventListener("timeupdate", ahead);
        native();
      }
      // One change to the buffer at a time, each once the last is done.
      function step(fn) {
        chain = chain.then(function () {
          return new Promise(function (done, stop) {
            function end() { off(); done(); }
            function err() { off(); stop(new Error("buffer")); }
            function off() { sb.removeEventListener("updateend", end); sb.removeEventListener("error", err); }
            sb.addEventListener("updateend", end);
            sb.addEventListener("error", err);
            fn();
          });
        });
        return chain;
      }
      // The next copy of the loop, on the timeline right after the last,
      // trimmed to exactly its 24 seconds. The copy before last goes first,
      // so the buffer holds two at most.
      function copy() {
        var n = copies++;
        busy = true;
        if (n > 1) step(function () { sb.remove(0, (n - 1) * LOOP); });
        return step(function () {
          sb.timestampOffset = n * LOOP;
          sb.appendWindowEnd = (n + 1) * LOOP;
          sb.appendWindowStart = n * LOOP;
          sb.appendBuffer(parts.body);
        }).then(function () { busy = false; });
      }
      function ahead() {
        if (!busy && !failed && copies * LOOP - video.currentTime < AHEAD) copy().catch(fail);
      }

      if (window.ManagedMediaSource && MS === window.ManagedMediaSource) video.disableRemotePlayback = true;
      video.loop = false;
      video.addEventListener("error", function () { if (mode === "mse") fail(); });
      ms.addEventListener("sourceopen", function () {
        try { sb = ms.addSourceBuffer(src.type); } catch (e) { return fail(); }
        // An open-ended timeline, so it never reaches an end. Where that
        // can't be set, the timeline grows with each copy instead.
        try { ms.duration = Infinity; } catch (e) { /* as it is */ }
        fetch(src.src).then(function (res) {
          if (!res.ok) throw new Error(res.status);
          return res.arrayBuffer();
        }).then(function (buf) {
          parts = split(buf);
          step(function () { sb.appendBuffer(parts.head); });
          return copy();
        }).then(function () {
          video.addEventListener("seeked", function () {
            ready = true;
            video.addEventListener("timeupdate", ahead);
            ahead();
            update();
          }, { once: true });
          video.currentTime = START;
        }).catch(fail);
      }, { once: true });
      // Attached first, so the browser's own loading of the <source> list,
      // which waits for preload, never starts.
      video.src = URL.createObjectURL(ms);
      video.preload = "auto";
    }

    video.addEventListener("play", label);
    video.addEventListener("pause", label);
    video.addEventListener("volumechange", label);
    play.addEventListener("click", function () {
      chosen = playing() ? "pause" : "play";
      update();
    });
    sound.addEventListener("click", function () { video.muted = !video.muted; });

    // The expanded view: built once, opened as a modal dialog, so the page
    // behind it can't be reached and Esc closes it. Its controls go with
    // the video, under it on the right, so Expand, now Minimize, stays
    // where it was pressed and keeps the focus. Without dialogs, there is
    // no Expand.
    var focus = el("dialog", "video-focus");
    if (focus.showModal) {
      focus.setAttribute("aria-label", "knobs in 24 seconds, a looping video");
      var body = el("div", "video-focus-body");
      var stage = el("div", "video-frame");
      body.appendChild(stage);
      focus.appendChild(body);
      doc.body.appendChild(focus);

      grow.addEventListener("click", function () {
        if (expanded) return focus.close();
        expanded = true;
        // Moved in one go, the video plays on.
        stage.appendChild(video);
        frame.classList.add("is-away");
        body.appendChild(bar);
        focus.showModal();
        grow.focus();
        if (!playing()) chosen = "play";
        update();
      });
      // A click on the dimmed page around it closes it too.
      focus.addEventListener("click", function (e) {
        if (e.target === focus || e.target === body) focus.close();
      });
      focus.addEventListener("close", function () {
        expanded = false;
        frame.insertBefore(video, frame.firstChild);
        frame.classList.remove("is-away");
        home();
        // Read once so Safari lays the moved button out; until then it
        // won't take the focus.
        void grow.offsetWidth;
        grow.focus();
        update();
      });
    } else {
      grow.hidden = true;
    }

    if (hasIO) {
      new IntersectionObserver(function (entries) {
        inView = entries[entries.length - 1].isIntersecting;
        update();
      }, { threshold: 0.2 }).observe(frame);
    }
    doc.addEventListener("visibilitychange", update);
    if (still) {
      if (still.addEventListener) still.addEventListener("change", update);
      else if (still.addListener) still.addListener(update);
    }
    update();
  })();

  load();
})();
