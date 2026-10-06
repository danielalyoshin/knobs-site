# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (2026-10-06): plain HTML, CSS and a small vanilla JavaScript file, with no build step. The site is one download page whose only live data is the latest release, read in the browser, so a framework or generator would add upkeep without adding anything a visitor sees.

Hosting is decided: GitHub Pages from this repository (`danielalyoshin/knobs-site`), on a custom domain. The domain isn't chosen yet. The app's source stays in `danielalyoshin/knobs`; the two repositories are separate.

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

The official place to download knobs's prebuilt Windows binaries. It points to the files on the knobs repository's GitHub Releases, says what each one is, and gives a careful user what they need to trust it: the version, the date, the checksum, the signature, the license and the source.

Success: a visitor gets the current file in one or two clicks, can check that it's the real one, and never wonders whether they're on a mirror or a download trap.

## Positioning

For knobs itself: OBS's exact mic sound without OBS. It runs the filter code from the user's own OBS install, so its output is bit-identical to OBS's. Equalizer APO, VoiceMeeter and NVIDIA Broadcast use their own DSP, and OBS plugins that send audio elsewhere still need OBS open.

For the site: every download is a file from the project's own GitHub Releases, listed with its checksum, on a site whose source is public too. The site hosts no binaries and asks nothing of the visitor.

## Operating Context

- Release data comes live from GitHub's REST API (`GET /repos/danielalyoshin/knobs/releases/latest`), unauthenticated, in the visitor's browser. That allows 60 requests an hour per IP address. With no release, the endpoint returns 404.
- Downloads link to `github.com/danielalyoshin/knobs/releases/download/…`. The site never copies or proxies a binary.
- **As of 2026-10-06 there is no release.** The knobs README says to build from source until there is one. The site needs a truthful no-release state, and a fallback to the GitHub Releases page when the API fails or is rate-limited.
- What knobs needs to run, which a visitor must know before downloading: Windows 64-bit, OBS Studio 32.2.x (tested on 32.2.2), and a virtual cable such as VB-Cable.
- knobs is Windows only for now. Visitors on macOS, Linux or a phone should learn that, not get a file that won't run.

## Capabilities and Constraints

- Planned release contents (confirmed 2026-10-06): an installer (`.exe` or `.msi`, not decided), a portable `.zip`, SHA-256 checksums, and binaries code-signed with Authenticode.
- None of these exist yet, and asset file names aren't decided. The page has to find each kind of file in a release rather than expect exact names, and show only what the release actually holds.
- Until a release is actually signed, the site must not say it is. If a release is unsigned, say what Windows SmartScreen will show.
- License: GPL-2.0-or-later. knobs ships no OBS binaries; it runs the OBS the user installed.
- Terms, from the app: mic, filter chain, virtual cable (or cable), OBS profile, scene collection, monitoring device. For downloads: release, installer, portable zip, checksum.
- Open: the custom domain, and whether the site uses any analytics.

## Brand Commitments

From the knobs repository's PRODUCT.md and `assets/README.md`, which stay the authority:

- **Name:** "knobs", all lowercase, even at the start of a sentence.
- **Voice:** plain and exact, like the README. Short sentences, everyday words, no hype, no exclamation marks, no jokes. Numbers where they help.
- **Logo:** the knob mark, the app icon and the horizontal lockups (dark text for light backgrounds, light text for dark), as SVG masters in the knobs repository's `assets/`. Don't recolor, rotate or stretch the knob. Keep clear space at least as long as the pointer, and don't show the mark smaller than 32 px.
- **Logo colors:** ink `#17181b` on light and `#e8eaee` on dark; red `#d63c42` on light and `#e5484d` on dark, for the pointer and "obs" in the wordmark. No cream. The wordmark is Sora, outlined in the SVGs.
- **Independence:** knobs isn't affiliated with or endorsed by the OBS Project. Say so wherever knobs is presented, this site included.
- **This site, from the owner's brief (2026-10-06):** professional and in line with the standard for open-source project sites. It must not look suspicious, and visitors should feel comfortable downloading. Not over the top: it serves its purpose, clear and clean.
- **Standing preference (2026-10-06):** the open-source download-page standard, played straight, with no concept or theme on top. The owner chose it over themed directions. Zed (zed.dev, its download page) and Audacity (audacityteam.org, its Windows download page) set the bar for finish.

## Evidence on Hand

- Output bit-identical to OBS's, on test signals, on a chain of every audio filter in `obs-filters`, and on a recording of real voice. `knobs-compare` checks this against OBS itself.
- Mic to cable: 88.1 ms in knobs, 87.7 ms in OBS, on the same cable input.
- A four-filter chain, knobs running against OBS minimized: 0.72% against 5.64% of one CPU core, 36 MB against 469 MB of memory, 7–9 against 90–98 threads, and no GPU against 0.05%. Measured on one PC (Core Ultra 7 265K, OBS 32.2.2, Audient iD4, VB-Cable); say so wherever the numbers appear.
- The logo files, in `danielalyoshin/knobs` under `assets/`. Not yet copied into this repository.
- Not on hand, and not to be made up: a release, download or star counts, users, testimonials, and screenshots of the tray app.

## Product Principles

1. **The download is the page.** The current file for a Windows PC is the first thing a visitor can act on.
2. **Every file from GitHub.** Downloads go to the project's GitHub Releases. Checksums, release notes and the source are one click away.
3. **Only what's true.** Version, date, size, checksum and signature come from the actual release. When there's no release, or GitHub can't be reached, say so and link to GitHub.
4. **Requirements before the download.** Windows 64-bit, OBS 32.2.x and a virtual cable, stated where the download is, so nobody gets a file that won't work for them.
5. **Plain like the README.** Nothing a cautious visitor could read as a download trap: no hype, no urgency, no surprise prompts.
