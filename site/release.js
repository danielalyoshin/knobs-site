/*
 * Reads the latest knobs release from GitHub's public REST API and sorts its
 * files into what the download page shows. Classic script, no dependencies:
 * it defines window.knobsRelease.
 *
 *   knobsRelease.load().then(function (r) { ... })
 *
 * r.state is one of:
 *   "ready"  a release exists; r.release holds it
 *   "none"   no published release yet (GitHub lists none)
 *   "error"  GitHub couldn't be reached, or the rate limit was hit
 *            (r.reason is "rate-limited" then)
 *
 * Add ?preview=ready|none|error|loading to the page URL to see each state
 * with made-up data. r.synthetic is true then, and the page must say so.
 * Preview works only on a local server: on the real domain the made-up
 * checksums could end up beside a real release with the same version.
 */
(function () {
  "use strict";

  var REPO = "danielalyoshin/knobs";
  var API = "https://api.github.com/repos/" + REPO;
  var REPO_URL = "https://github.com/" + REPO;
  var CACHE_KEY = "knobs-release-v2";
  // How long this tab reuses an answer. A release is kept for 10 minutes;
  // "no release" for one, so the first release shows soon after it's out.
  var CACHE_MS = { ready: 10 * 60 * 1000, none: 60 * 1000 };
  // After the rate limit is hit, the error is kept until GitHub says the
  // limit resets, within these bounds, so a reload doesn't ask in vain.
  var LIMIT_MS = { fallback: 5 * 60 * 1000, min: 30 * 1000, max: 15 * 60 * 1000 };
  var PAGE = 10;
  var TIMEOUT_MS = 8000;

  var links = {
    repo: REPO_URL,
    releases: REPO_URL + "/releases",
    latest: REPO_URL + "/releases/latest",
    issues: REPO_URL + "/issues",
    license: REPO_URL + "/blob/main/LICENSE",
    readme: REPO_URL + "#readme",
    building: REPO_URL + "#building",
    knownLimits: REPO_URL + "#known-limits",
    site: "https://github.com/danielalyoshin/knobs-site",
    obs: "https://obsproject.com/download",
    vbcable: "https://vb-audio.com/Cable/"
  };

  function formatBytes(n) {
    if (typeof n !== "number" || !isFinite(n)) return "";
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(0) + " KB";
    return (n / (1024 * 1024)).toFixed(1) + " MB";
  }

  function formatDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    try {
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
    } catch (e) {
      return iso.slice(0, 10);
    }
  }

  function sha256Of(asset) {
    // GitHub reports a digest for each file uploaded since mid-2025: "sha256:<hex>".
    // Only 64 hex digits pass: the hash goes into a command visitors paste.
    var d = asset && asset.digest;
    if (typeof d === "string" && /^sha256:[0-9a-f]{64}$/i.test(d)) return d.slice(7).toLowerCase();
    return null;
  }

  function toFile(asset, kind) {
    return {
      kind: kind,
      name: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      sizeLabel: formatBytes(asset.size),
      sha256: sha256Of(asset),
      ext: (asset.name.match(/\.([a-z0-9]+)$/i) || [, ""])[1].toLowerCase()
    };
  }

  function classify(assets) {
    var installer = null, portable = null, checksums = null, other = [];
    var exe = [], msi = [], zip = [];
    assets.forEach(function (a) {
      var n = a.name.toLowerCase();
      if (/sha256|checksum/.test(n)) {
        if (!checksums) checksums = toFile(a, "checksums");
        else other.push(toFile(a, "other"));
      } else if (/\.msi$/.test(n)) msi.push(a);
      else if (/\.exe$/.test(n)) exe.push(a);
      else if (/\.zip$/.test(n) && !/source|src/.test(n)) zip.push(a);
      else other.push(toFile(a, "other"));
    });
    // An installer is an .msi, or an .exe that doesn't call itself portable.
    var setupExe = exe.filter(function (a) { return !/portable/i.test(a.name); });
    var pick = msi[0] || setupExe.filter(function (a) { return /setup|install/i.test(a.name); })[0] || setupExe[0];
    if (pick) installer = toFile(pick, "installer");
    var zipPick = zip.filter(function (a) { return /portable/i.test(a.name); })[0] || zip[0];
    if (zipPick) portable = toFile(zipPick, "portable");
    [].concat(msi, exe, zip).forEach(function (a) {
      if ((!installer || a.name !== installer.name) && (!portable || a.name !== portable.name)) {
        other.push(toFile(a, "other"));
      }
    });
    return { installer: installer, portable: portable, checksums: checksums, other: other };
  }

  function normalize(raw) {
    var files = classify(raw.assets || []);
    var version = String(raw.tag_name || "").replace(/^v/i, "");
    return {
      tag: raw.tag_name,
      version: version,
      name: raw.name || raw.tag_name,
      prerelease: !!raw.prerelease,
      publishedAt: raw.published_at,
      dateLabel: formatDate(raw.published_at),
      url: raw.html_url,
      notes: raw.body || "",
      installer: files.installer,
      portable: files.portable,
      checksums: files.checksums,
      other: files.other
    };
  }

  function readCache() {
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      var now = Date.now();
      if (c && now >= c.at && now < c.until) return c.result;
    } catch (e) { /* storage blocked or empty */ }
    return null;
  }

  function writeCache(result, ms) {
    if (!ms) return;
    var now = Date.now();
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: now, until: now + ms, result: result })); } catch (e) {}
  }

  function getJSON(url) {
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS) : null;
    return fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      if (timer) clearTimeout(timer);
      return res;
    }, function (err) {
      if (timer) clearTimeout(timer);
      throw err;
    });
  }

  // GitHub answers 403 or 429 when the rate limit is hit, and says when to ask again.
  function failure(res) {
    if (res.status !== 403 && res.status !== 429) return new Error("GitHub answered " + res.status);
    var after = Number(res.headers.get("retry-after"));
    var reset = Number(res.headers.get("x-ratelimit-reset"));
    var ms = after > 0 ? after * 1000 : reset > 0 ? reset * 1000 - Date.now() : LIMIT_MS.fallback;
    var err = new Error("rate-limited");
    err.waitMs = Math.min(LIMIT_MS.max, Math.max(LIMIT_MS.min, ms));
    return err;
  }

  /*
   * The latest release is the newest full release, or the newest pre-release
   * when there's no full one. The releases list answers 200 even when it's
   * empty, so a visitor's console shows no 404 while there's no release, and
   * one request usually settles it. (A release marked "latest" by hand on
   * GitHub doesn't count; the newest full release wins.)
   */
  function fetchLive() {
    return getJSON(API + "/releases?per_page=" + PAGE).then(function (res) {
      if (!res.ok) throw failure(res);
      return res.json().then(function (list) {
        if (!Array.isArray(list)) throw new Error("GitHub sent something unexpected");
        var all = list.filter(function (x) { return x && !x.draft; }).sort(function (a, b) {
          return (Date.parse(b.created_at) || 0) - (Date.parse(a.created_at) || 0);
        });
        var full = all.filter(function (x) { return !x.prerelease; })[0];
        if (full) return { state: "ready", release: normalize(full) };
        // A full page of pre-releases could hide an older full release.
        if (list.length >= PAGE) return fetchLatest(all[0]);
        return all[0] ? { state: "ready", release: normalize(all[0]) } : { state: "none" };
      });
    });
  }

  function fetchLatest(newestPre) {
    return getJSON(API + "/releases/latest").then(function (res) {
      if (res.ok) return res.json().then(function (j) { return { state: "ready", release: normalize(j) }; });
      if (res.status === 404) return newestPre ? { state: "ready", release: normalize(newestPre) } : { state: "none" };
      throw failure(res);
    });
  }

  /* Made-up data for ?preview=. Names, sizes and digests are invented. */
  var FIXTURE = {
    tag_name: "v0.1.0",
    name: "knobs 0.1.0",
    prerelease: false,
    published_at: "2026-11-02T18:00:00Z",
    html_url: REPO_URL + "/releases/tag/v0.1.0",
    body: "First release.",
    assets: [
      { name: "knobs-0.1.0-setup-x64.exe", size: 4718592, browser_download_url: REPO_URL + "/releases/download/v0.1.0/knobs-0.1.0-setup-x64.exe",
        digest: "sha256:3f8a1c0e9b7d4e2a6c5f1b8d0e3a7c9f2b4d6e8a1c3f5b7d9e0a2c4f6b8d0e1a" },
      { name: "knobs-0.1.0-portable-x64.zip", size: 3984588, browser_download_url: REPO_URL + "/releases/download/v0.1.0/knobs-0.1.0-portable-x64.zip",
        digest: "sha256:9c2e4a6b8d0f1e3c5a7b9d1f3e5c7a9b0d2f4e6c8a0b2d4f6e8c0a1b3d5f7e9c" },
      { name: "SHA256SUMS.txt", size: 196, browser_download_url: REPO_URL + "/releases/download/v0.1.0/SHA256SUMS.txt",
        digest: "sha256:1a3c5e7f9b0d2f4a6c8e0b1d3f5a7c9e2b4d6f8a0c1e3b5d7f9a2c4e6b8d0f1a" }
    ]
  };

  function preview(mode) {
    if (mode === "loading") return new Promise(function () {});
    var out;
    if (mode === "none") out = { state: "none" };
    else if (mode === "error") out = { state: "error", reason: "rate-limited" };
    else out = { state: "ready", release: normalize(FIXTURE) };
    out.synthetic = true;
    return new Promise(function (resolve) { setTimeout(function () { resolve(out); }, 350); });
  }

  function isLocal() {
    return /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname);
  }

  function load() {
    var mode = null;
    try { mode = new URLSearchParams(location.search).get("preview"); } catch (e) {}
    if (mode && isLocal()) return preview(mode);
    var cached = readCache();
    if (cached) return Promise.resolve(cached);
    return fetchLive().then(function (result) {
      writeCache(result, CACHE_MS[result.state]);
      return result;
    }, function (err) {
      var result = { state: "error", reason: String(err && err.message || err) };
      // Other errors aren't kept: "Try again" may work a moment later.
      writeCache(result, err && err.waitMs);
      return result;
    });
  }

  window.knobsRelease = { load: load, links: links, formatBytes: formatBytes, formatDate: formatDate };
})();
