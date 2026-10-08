/*
 * knobs download page: the release state in step 3, its file list, copy
 * buttons, and the panels the path opens in place. Needs release.js
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

  function show(state) {
    root.setAttribute("data-release-state", state);
    // The panel stacks every state in one cell, so its size never changes.
    $$('[data-release="stack"] > [data-when]').forEach(function (el) {
      var on = el.getAttribute("data-when") === state;
      el.classList.toggle("is-active", on);
      if (on) el.removeAttribute("inert"); else el.setAttribute("inert", "");
    });
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
    if (primary) {
      link.href = primary.url;
      setText($('[data-hero="label"]'), "Download knobs " + rel.version);
      setDescription($('[data-hero="sub"]'), primary);
    } else {
      link.href = rel.url;
      setText($('[data-hero="label"]'), "knobs " + rel.version + " on GitHub");
      setText($('[data-hero="sub"]'), "Open the release to see its files");
    }
    var time = $('[data-hero="date"]');
    time.textContent = rel.dateLabel;
    time.setAttribute("datetime", String(rel.publishedAt || "").slice(0, 10));
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
  }

  function renderError(reason) {
    var limited = reason === "rate-limited";
    var msg = limited
      ? "GitHub limits how often this page can check, and the limit was reached. The releases page works now."
      : "GitHub couldn’t be reached.";
    $$('[data-error="reason"]').forEach(function (n) { n.textContent = msg; });
    // The rate-limit message already points to the releases page, and asking
    // again can't work until the limit resets, so there's no "Try again".
    $$('[data-error="after"]').forEach(function (n) { n.hidden = limited; });
    $$("[data-retry]").forEach(function (n) { n.hidden = limited; });
  }

  var retryFrom = null;

  function render(r) {
    r = r || { state: "error" };
    root.classList.toggle("is-preview", !!r.synthetic);

    if (r.state === "ready" && r.release) {
      renderHero(r.release);
      renderFiles(r.release);
      show("ready");
      announce("Latest release: knobs " + r.release.version + ", " + r.release.dateLabel + ".");
    } else if (r.state === "none") {
      show("none");
      announce("knobs has no release yet. You can build it from source.");
    } else {
      renderError(r.reason);
      show("error");
      announce("Couldn’t check GitHub for a release. The releases page link still works.");
    }

    // A retry hid the button that had focus. Chrome may still report the
    // now inert button as focused, so check for that too, then move focus
    // to the new state's main action.
    var a = doc.activeElement;
    if (retryFrom && (!a || a === doc.body || a.closest("[inert], [hidden]"))) {
      var target = $(".is-active .btn-primary", retryFrom) || $(".is-active a", retryFrom);
      if (target) target.focus();
    }
    retryFrom = null;
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

    var retry = t.closest("[data-retry]");
    if (retry) {
      retryFrom = retry.closest("[data-release]");
      load();
      return;
    }

    // "Checksums": shows or hides the file list under the panel's links.
    var toggle = t.closest("button[aria-controls]");
    if (toggle) {
      expand(toggle, toggle.getAttribute("aria-expanded") !== "true");
      return;
    }

    var opener = t.closest("[data-open]");
    if (opener) {
      openTarget(opener.getAttribute("data-open"));
      return;
    }

    // A panel under the path closed from its own summary takes no room, so
    // focus goes back to the link or button that opens it.
    var sum = t.closest(".path-more > details > summary");
    if (sum && sum.parentNode.open) {
      var id = sum.parentNode.id;
      window.requestAnimationFrame(function () {
        var back = $$("[data-open]").filter(function (n) {
          return n.getAttribute("data-open") === id && !n.closest("[inert]") && n.getClientRects().length;
        })[0];
        if (back) back.focus();
      });
    }
  });

  function expand(btn, open) {
    var t = doc.getElementById(btn.getAttribute("aria-controls"));
    if (!t) return;
    btn.setAttribute("aria-expanded", String(open));
    t.hidden = !open;
  }

  // A disclosure opens; a list with a button that controls it opens with
  // that button, so a link to #files lands on the open file list.
  function openTarget(id) {
    var t = id && doc.getElementById(id);
    if (!t) return null;
    if (t.tagName === "DETAILS") t.open = true;
    else $$("button[aria-controls]").forEach(function (b) {
      if (b.getAttribute("aria-controls") === id) expand(b, true);
    });
    return t;
  }

  window.addEventListener("hashchange", function () { openTarget(location.hash.slice(1)); });
  // Arriving at #build or #new-to-obs: the panel took no room when the
  // browser looked for it, so scroll to it once it's open.
  var arrived = openTarget(location.hash.slice(1));
  if (arrived && arrived.tagName === "DETAILS") {
    window.requestAnimationFrame(function () { arrived.scrollIntoView(); });
  }

  /* ---------- How it works: one signal through the path ---------- */

  // The first time the whole signal path is in view, one signal runs
  // through it (styles.css): a short pulse along each wire at one speed,
  // knobs's node lighting as it arrives, each filter's dot in turn as the
  // pulse runs down the chain, then on to the cable and the apps. Only a
  // path still below the fold waits for it, as the charts do. With reduced
  // motion, in forced colours or without IntersectionObserver the drawing
  // stays as it is.
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

    fig.classList.add("is-armed");
    var io = new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      var r = e.boundingClientRect, vh = window.innerHeight;
      // The whole drawing, or as much of it as the screen can show.
      if (!e.isIntersecting || (r.bottom > vh - 16 && r.top > vh * 0.35)) return;
      io.disconnect();
      play();
    }, { threshold: steps });
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

    function play() {
      fig.classList.remove("is-armed");
      if (calm()) return;

      var dash = parseFloat(getComputedStyle(fig).getPropertyValue("--sp-dash")) || 32;
      var down = stages[1].getBoundingClientRect().top >= stages[0].getBoundingClientRect().bottom;
      var nodes = stages.map(function (li) { return $(".sp-node", li); });
      var wires = stages.slice(0, -1).map(function (li) { return addPulse(li, down); });
      var run = addPulse(chain, true);
      var timed = nodes.slice();

      // Starts a pulse at `at`; returns when its head reaches the wire's end.
      function send(w, at, speed) {
        speed = speed || SPEED;
        setTime(w.el, "--at", at);
        setTime(w.el, "--run", (w.len + dash) / speed);
        return at + w.len / speed;
      }

      setTime(nodes[0], "--at", 0);
      var t = send(wires[0], 80);
      setTime(nodes[1], "--at", t);

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
        setTime(nodes[n + 1], "--at", t);
        t += 40;
      }

      fig.classList.add("is-playing");
      setTimeout(function () {
        fig.classList.remove("is-playing");
        wires.concat(run).forEach(function (w) { w.el.remove(); });
        timed.forEach(function (el) {
          el.style.removeProperty("--at");
          if (!el.getAttribute("style")) el.removeAttribute("style");
        });
      }, t + 1000);
    }
  })();

  /* ---------- The wave ---------- */

  // The three bands at the seam lie flat on the rule until the release
  // has settled and the whole strip is in view, then rise and start to
  // drift (styles.css). They run only while they're on screen and the tab
  // is showing. Reduced motion never moves them.
  var wave = $(".wave");
  if (wave) {
    var hasIO = "IntersectionObserver" in window;
    var waveSeen = !hasIO, waveWhole = !hasIO;
    var waveRun = function () {
      if (waveWhole && !doc.hidden && /^(ready|none|error)$/.test(root.getAttribute("data-release-state"))) {
        wave.classList.add("is-up");
      }
      wave.classList.toggle("is-paused", !waveSeen || doc.hidden || !wave.classList.contains("is-up"));
    };
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
