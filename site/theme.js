/*
 * Light and dark, on the download page and the 404: the toggle in the
 * header, the browser's bar, and printing. The script in each page's
 * <head> applies a stored choice before the first paint; this does the
 * rest. Classic script, no dependencies.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var toggle = doc.querySelector(".theme-toggle");
  var lightSystem = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

  function matches(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }

  // The page follows the system's scheme until the visitor uses the toggle;
  // then their choice stands: data-theme on <html>, kept in localStorage as
  // "knobs-theme". CSS shows the toggle's sun or moon, and its name, for the
  // scheme on screen.
  function showing() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return lightSystem && lightSystem.matches ? "light" : "dark";
  }

  // A switch lands in one frame: every colour takes the new scheme's at
  // once, rather than the links and buttons easing over from the old one on
  // their hover transitions (base.css, .is-switching). The first frame is
  // drawn with nothing fading; by the second the transitions can come back.
  var switches = 0;
  function switching(change) {
    switches++;
    root.classList.add("is-switching");
    change();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (--switches === 0) root.classList.remove("is-switching");
      });
    });
  }

  // The browser's bar (theme-color) takes the header's ground. Its two metas
  // carry the system's schemes; once there is a choice, both take the chosen
  // scheme's ground. The <head> script does that first and keeps each one's
  // own in data-system. In forced colours the canvas is the visitor's own,
  // so the bar keeps following the system there.
  var bars = Array.prototype.slice.call(doc.querySelectorAll('meta[name="theme-color"]'));
  var systemBars = bars.map(function (m) { return m.getAttribute("data-system") || m.getAttribute("content"); });
  function paintBar() {
    var chosen = root.hasAttribute("data-theme") && !matches("(forced-colors: active)");
    var ground = getComputedStyle(root).getPropertyValue("--ground").trim();
    bars.forEach(function (m, i) { m.setAttribute("content", chosen && ground ? ground : systemBars[i]); });
  }

  // The hover name is the name CSS shows for the scheme on screen, so the
  // two always say the same thing.
  function name() {
    if (!toggle) return;
    var shown = toggle.querySelector(showing() === "dark" ? ".tt-to-light" : ".tt-to-dark");
    if (shown) toggle.title = shown.textContent;
  }

  // Said once per press, in the page's live region: the 404's own, or the
  // one the download page tells its release in.
  var status = doc.getElementById("scheme-status") || doc.getElementById("release-status");
  function announce(msg) {
    if (!status) return;
    status.textContent = "";
    setTimeout(function () { status.textContent = msg; }, 60);
  }

  paintBar();
  name();

  // Until there's a choice, the scheme follows the system, and so does the
  // name; a change there lands in one frame too.
  function systemChanged() {
    if (!root.hasAttribute("data-theme")) switching(function () {});
    name();
  }
  if (lightSystem) {
    if (lightSystem.addEventListener) lightSystem.addEventListener("change", systemChanged);
    else if (lightSystem.addListener) lightSystem.addListener(systemChanged);
  }

  // On paper the page is the light scheme, whatever is on screen: the dark
  // grounds don't print, and its light words would be left on white paper.
  // After printing the screen's own scheme comes back. Without JavaScript
  // printing follows the screen.
  var printing = false;
  var screenTheme = null;
  window.addEventListener("beforeprint", function () {
    if (printing) return;
    printing = true;
    screenTheme = root.getAttribute("data-theme");
    switching(function () { root.setAttribute("data-theme", "light"); });
  });
  window.addEventListener("afterprint", function () {
    if (!printing) return;
    printing = false;
    switching(function () {
      if (screenTheme === null) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", screenTheme);
    });
  });

  if (!toggle) return;
  toggle.addEventListener("click", function () {
    var next = showing() === "dark" ? "light" : "dark";
    switching(function () { root.setAttribute("data-theme", next); });
    try { localStorage.setItem("knobs-theme", next); } catch (e) { /* not kept; it still applies now */ }
    paintBar();
    name();
    announce(next === "light" ? "Light mode." : "Dark mode.");
  });
})();
