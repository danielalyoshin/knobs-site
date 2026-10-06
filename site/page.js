/*
 * knobs download page: the release state in step 3, copy buttons,
 * and the setup rail. Needs release.js (window.knobsRelease).
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
    // The first-screen panel stacks every state in one cell, so its size never changes.
    $$('[data-release="stack"]').forEach(function (stack) {
      Array.prototype.forEach.call(stack.children, function (el) {
        var on = el.getAttribute("data-when") === state;
        el.classList.toggle("is-active", on);
        if (on) el.removeAttribute("inert"); else el.setAttribute("inert", "");
      });
    });
    // Step 3 in full swaps its states.
    $$('[data-release="swap"]').forEach(function (box) {
      Array.prototype.forEach.call(box.children, function (el) {
        if (el.hasAttribute("data-when")) el.hidden = el.getAttribute("data-when") !== state;
      });
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
    var dot = doc.createElement("span");
    dot.className = "sub-dot";
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
    // Until the owner lists a tag as signed, the panel says it isn't.
    $('[data-hero="unsigned"]').hidden = !!rel.signedBy;
    $('[data-hero="signed"]').hidden = !rel.signedBy;
    setText($('[data-hero="signer"]'), rel.signedBy || "");
  }

  function fileRow(f, rel, isPrimary) {
    var tpl = $("#tpl-file");
    var node = tpl.content.firstElementChild.cloneNode(true);
    function k(name) { return node.querySelector('[data-k="' + name + '"]'); }

    k("title").textContent = kindTitle(f);
    k("name").textContent = f.name;
    if (f.sizeLabel) k("size").textContent = sizeOf(f);
    else { k("size").remove(); node.querySelector(".file-meta .sep").remove(); }

    var link = k("link");
    link.href = f.url;
    k("sr").textContent = " " + f.name;
    if (isPrimary) {
      node.classList.add("is-primary");
      k("tag").hidden = false;
      link.classList.remove("btn-secondary");
      link.classList.add("btn-primary");
    }

    var hash = k("hash");
    if (f.kind === "checksums") {
      hash.remove();
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
      k("sha").parentNode.remove();
      var help = node.querySelector(".hash-help");
      help.style.marginTop = "0";
      help.textContent = rel.checksums
        ? "GitHub lists no SHA-256 for this file; the checksums file has it. Run this in PowerShell and compare the hash it prints:"
        : "This release lists no SHA-256 for this file. Run this in PowerShell to see its hash:";
    }
    return node;
  }

  function renderDetail(rel, synthetic) {
    setText($('[data-r="version"]'), rel.version);
    $('[data-r="pre"]').hidden = !rel.prerelease;
    $('[data-r="preview"]').hidden = !synthetic;
    var time = $('[data-r="date"]');
    time.textContent = rel.dateLabel;
    time.setAttribute("datetime", String(rel.publishedAt || "").slice(0, 10));
    $('[data-r="notes"]').href = rel.url;

    var list = $('[data-r="files"]');
    list.textContent = "";
    var primary = rel.installer || rel.portable;
    [rel.installer, rel.portable].concat(rel.other || [], [rel.checksums]).forEach(function (f) {
      if (f) list.appendChild(fileRow(f, rel, f === primary));
    });

    var sign = $('[data-r="signing-text"]');
    if (rel.signedBy) {
      sign.textContent = "";
      sign.appendChild(doc.createTextNode("The files are signed by "));
      sign.appendChild(el("b", "", rel.signedBy));
      sign.appendChild(doc.createTextNode(". To see the signature, right-click a file and choose "));
      sign.appendChild(el("b", "ui", "Properties › Digital Signatures"));
      sign.appendChild(doc.createTextNode("."));
    }
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
      renderDetail(r.release, !!r.synthetic);
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

    // A retry hid the button that had focus; put focus back in the same place.
    if (retryFrom && (doc.activeElement === doc.body || !doc.activeElement)) {
      var target = $(".is-active a, :not([hidden]) > .notice a", retryFrom);
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
      var source = from ? $(from) : btn.parentNode.querySelector("code");
      var text = btn.getAttribute("data-copy") || (source ? source.textContent : "");
      if (!text) return;
      copyText(text).then(function () {
        flash(btn, "Copied", true);
        announce("Copied to the clipboard.");
      }, function () {
        selectContents(source);
        flash(btn, "Press Ctrl+C", false);
      });
      return;
    }

    var retry = t.closest("[data-retry]");
    if (retry) {
      retryFrom = retry.closest("[data-release]");
      load();
      return;
    }

    var opener = t.closest("[data-open]");
    if (opener) {
      var d = doc.getElementById(opener.getAttribute("data-open"));
      if (d && d.tagName === "DETAILS") d.open = true;
    }
  });

  function openFromHash() {
    var id = location.hash.slice(1);
    var d = id && doc.getElementById(id);
    if (d && d.tagName === "DETAILS") d.open = true;
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  /* ---------- Setup rail: each step inks as it reaches the reading line ---------- */

  var steps = $$(".step");
  var queued = false;
  function updateRail() {
    queued = false;
    var line = window.innerHeight * 0.45;
    var current = -1;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].getBoundingClientRect().top <= line) current = i;
    }
    steps.forEach(function (s, i) {
      s.classList.toggle("is-reached", i <= current);
      s.classList.toggle("is-passed", i < current);
    });
  }
  function queueRail() {
    if (!queued) { queued = true; window.requestAnimationFrame(updateRail); }
  }
  if (steps.length) {
    window.addEventListener("scroll", queueRail, { passive: true });
    window.addEventListener("resize", queueRail);
    updateRail();
  }

  load();
})();
