# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (2026-10-06): plain HTML, CSS and a small vanilla JavaScript file, with no build step. The site is one download page whose only live data is the latest release, read in the browser, so a framework or generator would add upkeep without adding anything a visitor sees.

The brand's files (the guide, the logo, the fonts and the design tokens) come from the knobs-brand repository, a git submodule at `knobs-brand/` (2026-10-14). The deploy copies the ones the page uses into `site/` (`tokens.css`, `fonts/`, `brand/`) with `scripts/copy-brand.sh` before it publishes, and a local preview runs the same script; the copies aren't committed, so moving the submodule to a newer commit is how the site takes a brand change. That copy is the deploy's only step.

Hosting is decided: GitHub Pages from this repository (`danielalyoshin/knobs-site`), on the custom domain `getknobs.app` (owner, 2026-10-06). The domain is set up (2026-10-07): the repository's Pages settings carry it, with HTTPS enforced, and its DNS points at GitHub Pages. The Actions deploy ignores a CNAME file, so the repository holds none. The canonical URL is https://getknobs.app/. Link previews use the share card, and their description states independence. There is no structured data, by choice: software rich results need ratings or reviews, which the site doesn't have. The app's source stays in `danielalyoshin/knobs`; the two repositories are separate.

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

The official place to download knobs's prebuilt Windows binaries. It points to the files on the knobs repository's GitHub Releases, says what each one is, and gives a careful user what they need to trust it: the version, the date, the checksum, the licence and the source.

Success: a visitor gets the current file in one or two clicks, can check that it's the real one, and never wonders whether they're on a mirror or a download trap.

## Positioning

For knobs itself: OBS's exact mic sound without OBS. It runs the filter code from the user's own OBS install, so its output is bit-identical to OBS's. Equalizer APO, VoiceMeeter and NVIDIA Broadcast use their own DSP, and OBS plugins that send audio elsewhere still need OBS open.

For the site: every download is a file from the project's own GitHub Releases, listed with its checksum, on a site whose source is public too. The site hosts no binaries and asks nothing of the visitor.

## Operating Context

- Release data comes live from GitHub's REST API (`GET /repos/danielalyoshin/knobs/releases?per_page=10`), unauthenticated, in the visitor's browser. That allows 60 requests an hour per IP address. The page asks `/releases/latest` only when ten pre-releases fill the list, in case an older full release hides behind them.
- Downloads link to `github.com/danielalyoshin/knobs/releases/download/…`. The site never copies or proxies a binary.
- **The first release, v0.1.0, went out on 2026-10-08.** The page no longer has a no-release state (owner, 2026-10-07). When GitHub lists no release, can't be reached or is rate-limited, the page says which and links to the GitHub Releases page.
- What knobs needs to run, which a visitor must know before downloading: Windows 10 (version 1803 or later) or 11, 64-bit; OBS Studio 32.2 to 33.x (tested on 32.2.2 and 33.0.0-rc1, supported since knobs 0.2.0); and a virtual cable such as VB-CABLE, which knobs's installer can install (since 0.3.0).
- knobs is Windows only for now. Visitors on macOS, Linux or a phone should learn that, not get a file that won't run.

## Capabilities and Constraints

- Release contents, as shipped since v0.1.0 (v1.0.0 is the latest, 2026-10-15): an installer (`knobs-<version>-setup.exe`), a portable zip (`knobs-<version>-portable.zip`, a `knobs/` folder with `knobs.exe` and a `portable_mode.txt` that keeps settings beside it) and `SHA256SUMS.txt`. GitHub publishes a SHA-256 digest for each asset. The installer installs for the current Windows account with no admin rights, and with no virtual cable on the PC it offers to install VB-CABLE, running VB-Audio's own setup. Since 0.3.0 a setup window walks the user through the mic, its filters and the cable (with walkthroughs of OBS and of installing VB-CABLE), and an update check, off until the user turns it on, is knobs's only network connection. Since 1.0.0 knobs also runs VST 2 plugins and NVIDIA's noise removal; a VST plugin that goes online does so whether it runs in knobs or in OBS, and the page says so beside the privacy line.
- The page still finds each kind of file in a release rather than expecting exact names, and shows only what the release actually holds.
- The site says nothing about signing or SmartScreen: no signing status, no signer and no warning to get past (owner, 2026-10-06, on the plan that every release is code-signed). v0.1.0 shipped unsigned, and the owner chose to leave the page as it is (2026-10-07). Every release since v0.1.1 is signed with Azure Artifact Signing, as the knobs README says; the rule stands, and the site still says nothing about it.
- Licence: GPL-2.0-or-later. knobs ships no OBS binaries; it runs the OBS the user installed.
- This repository's licence is decided (owner, 2026-10-06): GPL-2.0-or-later, matching the app, in `LICENSE`. Not covered: the files the deploy copies from the knobs-brand submodule, the fonts in `site/fonts/`, which stay under the SIL Open Font License, and the knobs logo files in `site/brand/`, which carry their own `site/brand/LICENSE` (all rights reserved, apart from the knobs repository's `TRADEMARKS.md`), matching the knobs repository's `assets/LICENSE` (owner, 2026-10-07). The scope note sits at the end of `LICENSE`, after the GPL text, because a note above it stops GitHub detecting the licence.
- Terms, from the app: mic, filter chain, virtual cable (or cable), OBS profile, scene collection, monitoring device. For downloads: release, installer, portable zip, checksum.
- Open: whether the site uses any analytics.

## Brand Commitments

From the knobs repository's PRODUCT.md, and for the logo from the knobs brand guide (the October 2026 rebrand: `knobs-brand/BRAND.md`, in the knobs-brand repository, a git submodule of this one), which stay the authority:

- **Name:** "knobs", all lowercase, even at the start of a sentence.
- **Voice:** plain and exact, like the README. Short sentences, everyday words, no hype, no exclamation marks, no jokes. Numbers where they help.
- **Logo:** the knob mark (a knob turned to its top position, with a red sweep for the level it has turned through), the app icon, and the horizontal and stacked lockups in light, dark, white and black versions, as SVG masters in knobs-brand. Don't recolour, rotate or stretch it. Keep a quarter of the mark's height clear on every side. Don't show the lockup under 24px tall or the mark under 16px. The brand guide has the full rules.
- **Logo colours:** graphite `#191b1d` and ink `#e5ecf6`; cap red `#df695e` on dark and `#c55149` on light, for the sweep and "obs" in the wordmark. No cream. The wordmark is Schibsted Grotesk, Medium for "kn" and SemiBold for "obs", redrawn and outlined in the SVGs.
- **Independence:** knobs isn't affiliated with or endorsed by the OBS Project. Say so wherever knobs is presented, this site included.
- **This site, from the owner's brief (2026-10-06):** professional and in line with the standard for open-source project sites. It must not look suspicious, and visitors should feel comfortable downloading. Not over the top: it serves its purpose, clear and clean.
- **Standing preference (2026-10-06):** the open-source download-page standard, played straight, with no concept or theme on top. The owner chose it over themed directions.
- **Light and dark (owner, 2026-10-13, reversing the 2026-10-07 dark-only decision):** the site follows the visitor's system setting, and a toggle in the header switches between the two and remembers the choice in the visitor's own browser (no cookie, nothing sent anywhere). The dark scheme sits on graphite with the light-ink lockup; the light scheme uses the same tokens with light values and the dark-ink lockup, whose red is cap red deep.
- **Generic about apps (owner, 2026-10-07):** the site names no particular app (no Discord, Zoom or games). Like the README, it says "your other apps".

## Evidence on Hand

- Output bit-identical to OBS's, on test signals, on a chain of every audio filter in `obs-filters`, on VST plugins, and on a recording of real voice. `knobs-compare` checks this against OBS itself. NVIDIA's noise removal behaves the same as it does in OBS, where its output isn't the same from run to run either.
- Mic to cable: 88.1 ms in knobs, 87.7 ms in OBS, on the same cable input.
- A four-filter chain, knobs running against OBS minimized: 0.94% against 7.08% of one CPU core and 27 MB against 445 MB of memory, each the average of two runs; 12–13 against 89–90 threads, the range across them; and no GPU against 0.05%. Measured twice over 60 s on a PC (Core Ultra 7 265K, OBS 32.2.2, Audient iD4, VB-CABLE); say so wherever the numbers appear. The method is in the knobs repository's `docs/design.md`, "On real hardware" (plan.md is gone); the page links it as "How it was measured" (owner, 2026-10-07).
- The logo files. Rebranded 2026-10-13: new mark, wordmark and colours, see the brand guide. The masters live in the knobs-brand submodule; the deploy copies the four horizontal lockups (light, dark, white and black), the favicon, the share card (`card.png`) and the iOS touch icon (`apple-touch-icon.png`) into `site/brand/`, under `brand/LICENSE`. The knobs repository takes the same submodule, at `brand/`, and renders its icons from it into `assets/`.
- Not on hand, and not to be made up: download or star counts, users, testimonials, and screenshots of the tray app.

## Product Principles

1. **The download is the page.** The current file for a Windows PC is the first thing a visitor can act on.
2. **Every file from GitHub.** Downloads go to the project's GitHub Releases. Checksums, release notes and the source are one click away.
3. **Only what's true.** Version, date, size and checksum come from the actual release. When GitHub lists no release or can't be reached, say so and link to GitHub.
4. **Requirements before the download.** Windows 10 or 11 (64-bit), OBS 32.2 to 33 and a virtual cable (the installer can install one), stated where the download is, so nobody gets a file that won't work for them.
5. **Plain like the README.** Nothing a cautious visitor could read as a download trap: no hype, no urgency, no surprise prompts.
