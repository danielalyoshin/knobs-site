/*
 * Light and dark, on the download page and the 404: the toggle in the
 * header, the browser's bar, and printing. The page is dark until the
 * visitor chooses light. The script in each page's <head> applies a stored
 * choice before the first paint; this does the rest. Classic script, no
 * dependencies.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var toggle = doc.querySelector(".theme-toggle");

  // Each page's <html> starts with data-theme="dark", whatever the system's
  // scheme. The toggle sets it, and keeps the choice in localStorage as
  // "knobs-theme". CSS shows the toggle's sun or moon, and its name, for the
  // scheme on screen.
  function showing() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
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

  // The browser's bar (theme-color) takes the header's ground, in the
  // scheme on screen. The <head> script sets it for a stored choice.
  var bar = doc.querySelector('meta[name="theme-color"]');
  function paintBar() {
    var ground = getComputedStyle(root).getPropertyValue("--ground").trim();
    if (bar && ground) bar.setAttribute("content", ground);
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

  name();

  // On paper the page is the light scheme, whatever is on screen: the dark
  // grounds don't print, and its light words would be left on white paper.
  // After printing the screen's own scheme comes back. Without JavaScript
  // printing follows the screen.
  var printing = false;
  var screenTheme = "dark";
  window.addEventListener("beforeprint", function () {
    if (printing) return;
    printing = true;
    screenTheme = showing();
    switching(function () { root.setAttribute("data-theme", "light"); });
  });
  window.addEventListener("afterprint", function () {
    if (!printing) return;
    printing = false;
    switching(function () { root.setAttribute("data-theme", screenTheme); });
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
