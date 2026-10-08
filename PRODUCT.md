# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (2026-10-06): plain HTML, CSS and a small vanilla JavaScript file, with no build step. The site is one download page whose only live data is the latest release, read in the browser, so a framework or generator would add upkeep without adding anything a visitor sees.

Hosting is decided: GitHub Pages from this repository (`danielalyoshin/knobs-site`), on the custom domain `getknobs.app` (owner, 2026-10-06). The domain isn't bought yet, so nothing in the repository points to it until it is. The app's source stays in `danielalyoshin/knobs`; the two repositories are separate.

This repository is public, like the app's. Everything committed here can be read by anyone checking whether the site is genuine, including this file:

- The site's files live in `site/`, and a GitHub Actions workflow publishes only that folder. Repository notes such as this file are never served on the domain.
- Local design and agent tooling stays out of the repository (see `.gitignore`).
- Nothing private is committed: no email addresses, tokens or personal paths.

## Users

The people the knobs app is for (the knobs repository's PRODUCT.md has the full record), arriving to download it:

- **OBS users with a tuned chain.** Streamers, podcasters and gamers, many with an XLR mic, who keep OBS open all day to send their mic to a virtual cable. They know OBS.
- **People new to OBS**, who will install OBS only to tune a mic for knobs.

They find knobs through its GitHub README, the OBS forums and r/obs. Assumed, not measured: most arrive on a Windows PC, some on a phone from a forum link.

Their job on this site: decide the download is genuine, get the right file for their PC, and know what else they need before they run it.

## Product Purpose

The official place to download knobs's prebuilt Windows binaries. It points to the files on the knobs repository's GitHub Releases, says what each one is, and gives a careful user what they need to trust it: the version, the date, the checksum, the license and the source.

Success: a visitor gets the current file in one or two clicks, can check that it's the real one, and never wonders whether they're on a mirror or a download trap.

## Positioning

For knobs itself: OBS's exact mic sound without OBS. It runs the filter code from the user's own OBS install, so its output is bit-identical to OBS's. Equalizer APO, VoiceMeeter and NVIDIA Broadcast use their own DSP, and OBS plugins that send audio elsewhere still need OBS open.

For the site: every download is a file from the project's own GitHub Releases, listed with its checksum, on a site whose source is public too. The site hosts no binaries and asks nothing of the visitor.

## Operating Context

- Release data comes live from GitHub's REST API (`GET /repos/danielalyoshin/knobs/releases?per_page=10`), unauthenticated, in the visitor's browser. That allows 60 requests an hour per IP address. The page asks `/releases/latest` only when ten pre-releases fill the list, in case an older full release hides behind them.
- Downloads link to `github.com/danielalyoshin/knobs/releases/download/…`. The site never copies or proxies a binary.
- **The first release, v0.1.0, went out on 2026-10-08.** The page no longer has a no-release state (owner, 2026-10-07). When GitHub lists no release, can't be reached or is rate-limited, the page says which and links to the GitHub Releases page.
- What knobs needs to run, which a visitor must know before downloading: Windows 64-bit, OBS Studio 32.2.x (tested on 32.2.2), and a virtual cable such as VB-Cable.
- knobs is Windows only for now. Visitors on macOS, Linux or a phone should learn that, not get a file that won't run.

## Capabilities and Constraints

- Release contents, as shipped in v0.1.0: an installer (`knobs-<version>-setup.exe`), a portable zip (`knobs-<version>-portable.zip`, a `knobs/` folder with `knobs.exe` and a `portable_mode.txt` that keeps settings beside it) and `SHA256SUMS.txt`. GitHub publishes a SHA-256 digest for each asset.
- The page still finds each kind of file in a release rather than expecting exact names, and shows only what the release actually holds.
- The site says nothing about signing or SmartScreen: no signing status, no signer and no warning to get past (owner, 2026-10-06, on the plan that every release is code-signed). v0.1.0 shipped unsigned, and the owner chose to leave the page as it is (2026-10-07).
- License: GPL-2.0-or-later. knobs ships no OBS binaries; it runs the OBS the user installed.
- This repository's license is decided (owner, 2026-10-06): GPL-2.0-or-later, matching the app, in `LICENSE`. Not covered: `site/fonts/`, which stays under the SIL Open Font License, and the knobs logo files in `site/brand/`, which carry their own `site/brand/LICENSE` (all rights reserved, apart from the knobs repository's `TRADEMARKS.md`), matching the knobs repository's `assets/LICENSE` (owner, 2026-10-07). The scope note sits at the end of `LICENSE`, after the GPL text, because a note above it stops GitHub detecting the license.
- Terms, from the app: mic, filter chain, virtual cable (or cable), OBS profile, scene collection, monitoring device. For downloads: release, installer, portable zip, checksum.
- Open: whether the site uses any analytics.

## Brand Commitments

From the knobs repository's PRODUCT.md and `assets/README.md`, which stay the authority:

- **Name:** "knobs", all lowercase, even at the start of a sentence.
- **Voice:** plain and exact, like the README. Short sentences, everyday words, no hype, no exclamation marks, no jokes. Numbers where they help.
- **Logo:** the knob mark, the app icon and the horizontal lockups (dark text for light backgrounds, light text for dark), as SVG masters in the knobs repository's `assets/`. Don't recolor, rotate or stretch the knob. Keep clear space at least as long as the pointer, and don't show the mark smaller than 32 px.
- **Logo colors:** ink `#17181b` on light and `#e8eaee` on dark; red `#d63c42` on light and `#e5484d` on dark, for the pointer and "obs" in the wordmark. No cream. The wordmark is Sora, outlined in the SVGs.
- **Independence:** knobs isn't affiliated with or endorsed by the OBS Project. Say so wherever knobs is presented, this site included.
- **This site, from the owner's brief (2026-10-06):** professional and in line with the standard for open-source project sites. It must not look suspicious, and visitors should feel comfortable downloading. Not over the top: it serves its purpose, clear and clean.
- **Standing preference (2026-10-06):** the open-source download-page standard, played straight, with no concept or theme on top. The owner chose it over themed directions. Zed (zed.dev, its download page) and Audacity (audacityteam.org, its Windows download page) set the bar for finish.
- **Dark only (owner, 2026-10-07):** the site has one colour scheme, the dark one, whatever the visitor's system setting. It uses the light-text lockup.
- **Generic about apps (owner, 2026-10-07):** the site names no particular app (no Discord, Zoom or games). Like the README, it says "your other apps".

## Evidence on Hand

- Output bit-identical to OBS's, on test signals, on a chain of every audio filter in `obs-filters`, and on a recording of real voice. `knobs-compare` checks this against OBS itself.
- Mic to cable: 88.1 ms in knobs, 87.7 ms in OBS, on the same cable input.
- A four-filter chain, knobs running against OBS minimized: 0.72% against 5.64% of one CPU core, 36 MB against 469 MB of memory, 7–9 against 90–98 threads, and no GPU against 0.05%. Measured on a PC (Core Ultra 7 265K, OBS 32.2.2, Audient iD4, VB-Cable); say so wherever the numbers appear. The method is in the knobs repository's `docs/design.md`, "On real hardware" (plan.md is gone); the page links it as "How it was measured" (owner, 2026-10-07).
- The logo files, in `danielalyoshin/knobs` under `assets/`. The app icon and the light-text horizontal lockup are copied unchanged into `site/brand/`, beside the site's favicon (owner, 2026-10-07: the masters now carry the enlarged wordmark, so the site uses them as they are; the dark-text lockup left with the light mode).
- Not on hand, and not to be made up: download or star counts, users, testimonials, and screenshots of the tray app.

## Product Principles

1. **The download is the page.** The current file for a Windows PC is the first thing a visitor can act on.
2. **Every file from GitHub.** Downloads go to the project's GitHub Releases. Checksums, release notes and the source are one click away.
3. **Only what's true.** Version, date, size and checksum come from the actual release. When GitHub lists no release or can't be reached, say so and link to GitHub.
4. **Requirements before the download.** Windows 64-bit, OBS 32.2.x and a virtual cable, stated where the download is, so nobody gets a file that won't work for them.
5. **Plain like the README.** Nothing a cautious visitor could read as a download trap: no hype, no urgency, no surprise prompts.
