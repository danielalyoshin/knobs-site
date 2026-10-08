---
name: knobs
description: The download page for knobs, set as the open-source download-page standard, played straight.
colors:
  ink: "#e8eaee"
  ink-hover: "#ffffff"
  on-ink: "#17181b"
  paper: "#0f1012"
  paper-subtle: "#141518"
  surface: "#17181b"
  surface-sunken: "#121316"
  hairline: "#26282d"
  hairline-strong: "#363940"
  graphite-2: "#b0b4bc"
  graphite-3: "#8b8f98"
  signal-ok: "#4cc38a"
  signal-warn: "#f0a33c"
  brand-red: "#e5484d"
typography:
  display:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.1rem + 3.4vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.35rem + 1.3vw, 2.375rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.018em"
  title:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.008em"
  title-sm:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  pitch-lede:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  chart-value:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.55
    fontFeature: "tnum"
  numeral:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  body:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  ui-sm:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
  button:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.2
  tag:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, Cascadia Mono, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.875em"
    fontWeight: 400
    fontFeature: "liga 0"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "999px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  content: "72rem"
  measure: "52ch"
  head-col: "20rem"
  col-gap: "64px"
  path-gap: "32px"
  node: "max(33px, 2.0625rem)"
  signal-gap: "40px"
  signal-icon: "max(21px, 1.25rem + 1px)"
  chart-bar: "10px"
  chart-room: "5.25rem"
  section-top: "clamp(64px, 6.5vw, 96px)"
  section-bottom: "clamp(48px, 5vw, 72px)"
  station-pad: "24px"
  seam-strip: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.on-ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.paper-subtle}"
    textColor: "{colors.ink}"
  button-build:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-download:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
    height: "60px"
    width: "100%"
  step-node:
    backgroundColor: "{colors.paper-subtle}"
    textColor: "{colors.graphite-2}"
    typography: "{typography.numeral}"
    rounded: "{rounded.round}"
    size: "max(33px, 2.0625rem)"
  step-node-inked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.numeral}"
    rounded: "{rounded.round}"
    size: "max(33px, 2.0625rem)"
  station:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 24px 24px"
  signal-icon:
    textColor: "{colors.graphite-3}"
    size: "max(21px, 1.25rem + 1px)"
  signal-panel-knobs:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "14px 20px 20px"
  signal-chain:
    backgroundColor: "{colors.paper-subtle}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.md}"
  chart-bar-knobs:
    backgroundColor: "{colors.ink}"
    rounded: "0 4px 4px 0"
    height: "10px"
  chart-bar-obs:
    backgroundColor: "{colors.graphite-3}"
    rounded: "0 4px 4px 0"
    height: "10px"
  file-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "16px 0 0"
  check-value:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
  code-block:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 0 14px 16px"
  copy-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite-2}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
    height: "30px"
  tag:
    textColor: "{colors.graphite-2}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  nav-link:
    textColor: "{colors.graphite-2}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  nav-link-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
  source-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "34px"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
---

# Design System: knobs

## Overview

**Creative North Star: "The Setup Path, Set Straight"**

The knobs site is the open-source download page done the way the best projects do it: a graphite ground, cool greys taken from the knob, light ink for the one thing to press, and nothing on top. There is no concept and no theme, and the one decoration, a drawn, synthetic speech clip along the seam under the first screen, never competes with the file. The finish bar is the download pages of Zed and Audacity: exact spacing, hairline structure, honest states, and every link visibly going where it says. The site is dark only: one colour scheme, whatever the visitor's system setting.

The page reads as a path. Setup is the four numbered steps on the first screen, joined by a hairline rail, and the download is step 3, held in the one bordered panel on the path. What a step needs beyond its few lines opens in place inside that panel, never in a separate box: the release's files and checksums, and the build steps. Below the first screen come two sections, How it works and Measured, set as open typography on hairline rules: a signal path drawn as one wire through four icons, ruled rows of facts and claims, and plain bar charts that CSS draws from the measurements' own tables. Density is moderate and calm; sections breathe on generous vertical padding, and inside a section the type does the work.

Motion settles and never performs. Every transition runs on one curve, `cubic-bezier(0.2, 0, 0, 1)`: 160ms for feedback (a hover, a copy confirmation, the file list or the build steps opening, a chevron turning) and 320ms for structure (a release state settling into step 3, and the station moving to its new height). Whatever appears fades in as it drops 4px into place, and nothing else about it moves. Beyond that grammar the page has four motions of its own, each described with its component: each bar chart's one-time 720ms sweep when it first scrolls into view (see Measurement Charts), the signal path's one pass the first time the whole drawing is in view (see Signal Path), and the seam clip, which rises from its rule once the release has settled, drifts left at 30px a second as the page's one continuous motion, and lifts to full strength while the download is hovered or focused (see Seam Clip). Jumps within the page scroll smoothly; nothing else moves on scroll, and reduced motion stills all of it.

**Key Characteristics:**
- Restrained palette on one dark scheme: cool graphite neutrals, light ink as the only action colour, brand red only inside the logo.
- IBM Plex Sans for every word on the page, from the pitch to the footnotes; IBM Plex Mono for anything copyable; Sora only inside the outlined logo.
- 1px hairlines carry structure, and every line that meets a node or icon runs through its centre; one tight lift is the only shadow.
- A step rail with round numbered nodes, and a single "station" panel for the download that takes each state's own height; the signal path in How it works echoes it with one wire, four icons and one ink-bordered panel.
- Measurements drawn as plain bars on linear scales from zero, knobs in ink and OBS in graphite, every value printed beside its bar.
- One decoration: a drawn, synthetic speech clip, 1px columns edge to edge along the seam under the first screen, drifting slowly.
- Self-contained: the fonts, logo and icons are served from the site; the only outside request is the GitHub releases API.

## Colors

A cool, near-monochrome graphite palette drawn from the knob, on one dark scheme (`color-scheme: dark`, theme colour Paper), with light ink as the single voice of action.

### Primary
- **Brand Ink** (`ink`): body text, headings, and the fill of every primary action: the primary button, the download button, the skip links, step 3's inked node, focus rings and text selection. It also marks knobs wherever knobs is shown beside OBS or in the signal: knobs's bars, names and values in the charts, the knobs panel's border and caret, knobs's icon, the dots of its chain, and the pulse that runs along the wire. It is the logo's own light ink.
- **Ink Lifted** (`ink-hover`): the hover fill of ink buttons, pure white.
- **On Ink** (`on-ink`): text and icons on an ink fill.

### Neutral
- **Paper** (`paper`): the page ground for the content sections and the preview strip, and the browser's theme colour. The charts' value labels sit on it, so a label masks any gridline it crosses.
- **Paper Subtle** (`paper-subtle`): the header, the first screen with the path, and the footer; the fill of the idle step nodes and of the signal path's chain; and the hover fill of secondary buttons.
- **Surface** (`surface`): bordered containers: the station, the knobs panel in the signal path (and its caret's fill), secondary buttons, copy buttons and the header's Source link; also the chain's slider handles.
- **Surface Sunken** (`surface-sunken`): code blocks, the hash and command wells in the file list, and the nav-link hover.
- **Hairline** (`hairline`): row dividers, the seam rule over How it works, the header's and footer's rules, table body rules, the rules that open the station's foot, its file list and the build steps, the borders of the wells and the chain, the chain's row rules, and the delay chart's gridlines.
- **Hairline Strong** (`hairline-strong`): container borders, the step rail and the bracket, idle node rings, each section title's rule, table header rules, the charts' zero lines, the chain's slider tracks, the outlines of tags and copy buttons, the underline at rest of a link on its own line or row, the scrollbar thumb, and the seam clip's columns.
- **Graphite 2** (`graphite-2`): secondary prose: the lede, step descriptions, the station's state text, fact text, measurement text, the build cost line, nav links, "More in the README", idle node numerals, the footer's links, and the links inside quiet notes ("Known limits", "How it was measured", the legal lines). In the charts, the legend and OBS's name and values; in the chain, the slider handles' rings.
- **Graphite 3** (`graphite-3`): tertiary text: hints, footnotes and captions, the bracket's line, the non-Windows note, the requirement line under the download, the github.com destination, file metadata, the signal path's notes, table headers, tick labels, separators, chevrons, and the footer's line under the lockup. Also the underline at rest of a link inside a sentence; the signal path's wire, arrowheads and the mic, cable and apps icons; the chain's wire and slider values; OBS's bars; and the seam clip's louder core.

### Status
- **Signal Green** (`signal-ok`): only the "Copied" confirmation on copy buttons.
- **Signal Amber** (`signal-warn`): only the preview strip's icon, which marks made-up release data.

### Brand
- **Logo Red** (`brand-red`): lives inside the logo files only, on the knob's pointer and "obs" in the wordmark. The stylesheet doesn't declare it.

### Named Rules
**The One Ink Rule.** Ink is the only action colour. A primary action is an ink fill; a secondary action is a surface fill with a strong hairline. No other hue ever marks something to press.

**The Red Stays in the Logo Rule.** Brand red appears in the lockup and app icon and nowhere else: not as a link colour, a button, a marker, a badge or a background.

**The Logo Is Not Ours to Recolour Rule.** Use the site's lockup file, the light-text lockup for dark grounds, the knobs repository's master (see Lockup under Navigation). Never recolour, rotate or stretch the knob, never show it under 32px tall, and keep clear space at least the length of the pointer around it.

**The One Scheme Rule.** The page has one colour scheme, the dark one, and every role has one value. Don't add a light theme, a switch that follows the system setting, or a second lockup.

## Typography

**Display Font:** IBM Plex Sans at 600, self-hosted
**Body Font:** IBM Plex Sans at 400 and 500, the same family
**Label/Mono Font:** IBM Plex Mono at 400, self-hosted, falling back to the system monospace (Cascadia Mono on Windows)

**Character:** Plex Sans is plain and engineered, with the slightly squared, open forms of a well-made technical manual, which suits a page whose job is to be trusted. One family sets every role, so the hierarchy comes from size, weight and tone, never from a change of voice. Plex Mono is its companion on the same vertical metrics, so a version or a checksum sits on the line beside the prose without a jump. Sora stays in the wordmark alone, which keeps the lockup reading as the logo rather than as one more heading.

**Files.** The Latin subsets exactly as the official IBM Plex release ships them (`@ibm/plex-sans` 1.1.0, `@ibm/plex-mono` 2.5.0, github.com/IBM/plex), four woff2 files in `site/fonts/` (Plex Sans 400, 500 and 600, Plex Mono 400) with the release's own unicode ranges and its SIL Open Font License beside them (`OFL-IBM-Plex.txt`). Nothing copyable is set heavier than 400, so Plex Mono ships its regular only. The page preloads the three Plex Sans weights; Plex Mono loads when a mono line renders. Every face uses `font-display: swap`, and until Plex arrives the text sets in "IBM Plex Sans Fallback": Arial scaled to Plex's width and line metrics on this page's own text (400: size 100.14%; 600: Arial Bold at 96.6%), so the swap barely moves a line.

### Hierarchy
- **Display** (600, fluid 2rem to 4rem, line height 1.06, tracking -0.025em): the single h1, "Your OBS mic chain, in every app.", plain and in one tone. Its two halves are inline blocks, so it breaks only at the comma, and a half wraps inside itself only with very large text, never running off the page. On the horizontal path (1024px and up) the halves never wrap, so it always takes two lines there. Below 1024px, where the whole sentence fits, it takes one line: from about 615px to 1023px wide in headless Chromium without a scrollbar.
- **Headline** (600, fluid 1.75rem to 2.375rem, line height 1.2, tracking -0.018em): section titles, each on its own rule.
- **Title** (600, 1.1875rem, line height 1.3, tracking -0.008em): path step titles, fact terms, measurement titles. On the horizontal path each open step's title is capped at 9em, so all three take two lines ("Tune your mic / in OBS", with "your mic" kept together) and their descriptions start on one line.
- **Title Small** (600, 1rem, line height 1.4): the release state's head inside the station ("From GitHub Releases", "Couldn't check for a release"), a status line under the step's title rather than a second title; also the signal path's stage names.
- **Pitch Lede** (400, 1.125rem, line height 1.55, Graphite 2): the one paragraph beside the headline, capped at the measure. It drops to 1rem below 640px.
- **Chart Value** (0.9375rem, tabular): the value at the tip of each bar, knobs's in ink 600 and OBS's in Graphite 2 at 400; the delay values' numbers at 1rem 600.
- **Numeral** (600, 0.875rem, tabular): step node numbers.
- **Body** (400, 1rem, line height 1.55): the page default; fact text.
- **Body Small** (0.9375rem; line height 1.5 for the path's step text, the station's state text and the build steps, 1.55 elsewhere): step descriptions, the station's state text, the build steps, tables, measurement and chart text, the footer's line under the lockup and its links.
- **UI Small** (0.875rem): nav links, the path's and the station's link rows, file names and metadata, the signal path's notes and chain rows, "More in the README", the Source link (500) and the footer's column heads (600).
- **Label** (0.8125rem, line height 1.45, Graphite 3): hints, the bracket's line, the non-Windows note, the requirement line and the github.com destination, footnotes and captions, table headers, tick labels, hashes and commands, Copy buttons (500), the build cost line, the preview strip and the legal lines. Sentence case, no tracking.
- **Tag** (600, 0.75rem, line height 1, Graphite 2): the "Pre-release" and "Recommended" tags, the page's smallest text.
- **Mono** (Plex Mono 400, 0.875em of its context, ligatures off): versions in running text, file names, hashes, commands, paths, hosts, the github.com destination.

### Named Rules
**The Wordmark Face Rule.** Sora is the wordmark's face and lives only in the logo files, as outlined paths. The page never loads it and never sets text in it. Every heading, numeral, figure, line of prose, button and label is IBM Plex Sans; everything copyable is IBM Plex Mono.

**The Copyable Is Mono Rule.** If a visitor could paste it or type it (a version in running text, a file name, a checksum, a command, a path, a host), it is set in Plex Mono with ligatures off. Numbers that line up, file sizes among them, are Plex Sans with tabular figures: Plex Sans's default figures are already tabular, and `tabular-nums` stays declared for the fallback faces. A SHA-256 wraps in even rows of 32 characters (16 where the file list is narrower than 17.5em, as on phones), so it can be compared in chunks.

**The Measure Rule.** Every text cap is the `--measure` token, 52ch: the lede, fact and measurement text, chart captions, the station's state text, requirement line and non-Windows note, and the build steps. In Plex Sans 1ch is the width of "0" (0.6em) while an average character is about 0.45em, so 52ch sets lines of about 66 to 72 characters at any text size. Never cap text in rem, and never read "68ch" as 68 characters.

**The No Small Caps Rule.** Labels and table headers are small sentence-case text in Graphite 3. There are no uppercase tracked labels above headings.

## Layout

Content sits on a 72rem column with a fluid gutter (16px to 40px). The first screen opens on the pitch: the headline and the lede side by side on a two-column grid (`min-content minmax(0, 1fr)`), the headline's column as wide as its longer line and the lede 64px after it, with their cap heights level. The lede's top padding makes up the difference between the two line boxes: in Plex Sans a first line's cap height sits 0.207em under the top of a 1.06 line and 0.452em under a 1.55 line, so the padding is the display size times 0.207 less the lede size times 0.452. Below it, the path band spans the full content width with four columns weighted 1 : 1 : 2 : 1 and a 32px gap (40px at 1600px and wider), so step 3's station gets the room for the download.

Content sections open on a section head: the title, and in How it works "More in the README" at the far end, in one flex row on its own 1px Hairline Strong rule the width of the content. No rule crosses the page between two content sections; the only full-width rule is the seam over How it works, where the clip sits. Sections are padded `clamp(64px, 6.5vw, 96px)` above and `clamp(48px, 5vw, 72px)` after, so the space between them reads as the pause before the next title. Under a head, the rows (How it works' facts, Measured's measurements) keep a two-column grid: a 20rem term column and the body, 64px apart. How it works ends on its last fact, with no closing rule, and Measured's head rule opens its first measurement. The first screen, header and footer sit on Paper Subtle, the content sections on Paper.

Spacing is a loose 4px rhythm: 4 and 8 for tight inline gaps, 12 to 16 between related lines, 20 to 24 inside panels, 40 to 96 between blocks.

**Responsive behaviour.**
- **1024px and up:** the pitch stands side by side; the path is horizontal, with the bracket ("Start from step 3") over steps 1 and 2 above the rail, from node 1 to node 3, and the non-Windows note in balanced lines 12px under the station. The open steps' titles take two lines each, so their descriptions line up.
- **Below 1024px:** the pitch stacks, the lede 20px under the headline at the measure; the path turns vertical, one rail down the left of the nodes, capped at 40rem; the station indents to the step text and its node sits on the rail; the bracket becomes a plain line above the steps, which breaks after the question wherever the question fits on a line (360px and up). Facts and measurements stack, the term or claim over its text or chart.
- **Below 900px:** the signal path turns vertical: the wire runs down the left, the arrowheads point down, and the knobs panel sits right of the rail with its caret on its left edge (see Signal Path).
- **Below 720px:** the footer's link columns close from 72px to 48px apart.
- **Below 640px:** the header drops to 56px and the lockup to 32px tall (145px wide); the first screen's top padding and the path's top margin drop to 28px, the lede to 1rem, and path step descriptions hide, so the download stays inside the first screen; the ready state's links, "Checksums" among them, become a ruled list of 44px rows, and the open file list continues it.
- **Below 520px:** the section links leave the header row for a row of their own under it, 44px tall and flush with the gutter. From 520px up they share the top row with the lockup and "Source".
- **Below 480px:** the download button's size moves to its own line, without its dot, and the destination drops its "From". Both do the same wherever the station is narrower than 19.5em (a container query), which is the horizontal path's narrowest widths, from 1024px to about 1100px.
- **Below 360px:** "Build from source" may wrap, and the date and "Release notes" take a row each in the ready state's ruled list. Nothing scrolls sideways at 320px.
- **Very large text** (container queries, in the container's own em): where the station or the file list is narrower than 12.5em (390px at 200% text), the station's buttons, its non-Windows note and the github.com line wrap, the file list's command runs each start a line and wrap between their words, and Copy drops under its label at the right. Where the station is narrower than 30em (the horizontal path and phones), the build commands' Copy button moves under them, at the right. The footer's link columns wrap under the lockup's line whenever they don't fit beside it.
- **Narrow charts** (container queries, in the chart's own em, so they follow the text size): below 34em each footprint measure's name goes over its bars (every phone); below 22em the delay scale labels only 0, 50 and 100 ms; below 20em each Same sound result goes under its input, and below 18em the delay's names go over its bars. See Measurement Charts.

**The Text Size Rule.** Breakpoints are set in em, so the widths above are at the browser's default 16px text. A visitor who raises the browser's text size gets the layout of a narrower window, never squeezed columns: at 200% text a 1440px window takes the 720px layout. Controls that hold text grow with it (min-height, never a fixed height), the path's nodes are `max(33px, 2.0625rem)` and the signal path's icons `max(21px, 1.25rem + 1px)`, kept odd.

**The Download in the First Screen Rule.** At every width, step 3's primary action is visible without scrolling. When space runs short, cut the descriptions of the other steps, never the station. At 390x844 the download button ends at 656px and every other state's primary action by 733px, or 779px with the non-Windows note. At 680x800 every state's primary action ends by 658px, or 703px with the note. (Figures from headless Chromium with a mouse pointer, no scrollbar and Plex loaded, the GitHub API answered locally.)

- **Short desktop windows** (1024px wide or more and 680px tall or less, such as a 1080p laptop at 150% scaling, about 1280x610): the first screen's top padding and the path's top margin drop to 40px, so every state's primary action ends by 539px from 1250 to 1300px wide.
- **Shorter still** (560px tall or less, such as a 1366x768 laptop at 125%, about 1093x520): they drop to 28px, and each state shows its buttons right under its head, then its explanation; opened, the build steps come after the explanation. Only the order on screen changes; the reading and tab order stay the page's. From 1024 to 1099px wide every state's primary action ends by 446px.
- **The vertical path in a short window** (below 1024px wide and 850px tall or less, such as 1000x800): the other steps' descriptions hide, as on phones, and their titles and links stay. At 1000x800 every state's primary action ends by 702px, or 747px with the non-Windows note.

**The Thumb Rule.** On a touch screen (`pointer: coarse`) every target is at least 44px tall: buttons, copy buttons and the label rows that hold them, nav links, the Source link, the "Checksums" toggle and the release's links, footer links, "More in the README" and every link that stands on its own line. Those grow in the flow, with negative margins that keep their text where it was; a step link whose label wraps grows by its extra lines. A link inside a sentence keeps its line and gets an invisible hit area 44px tall, centred on the link's own box, so it holds at any text size. Below 640px the lockup's link grows to 44px inside the 56px header. The bracket is a drawing and ignores taps, so a tap on it reaches the link under it. Mouse layouts keep their density.

## Elevation & Depth

The system is flat. Depth comes from tone (Paper Subtle bands, Surface panels, Sunken wells) and 1px hairlines, not from shadow. One shadow exists: a tight lift of a single pixel, used on the two panels that carry knobs itself, the station that holds the download and the knobs panel in the signal path.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.5)`): the station and the knobs panel in the signal path. Nothing else.

### Named Rules
**The One Lift Rule.** A shadow is never larger than the lift. If a container needs more presence, give it a stronger hairline or the ink border, not a deeper shadow.

## Shapes

Gently rounded rectangles on hairline borders. Containers that hold content (the station, the knobs panel) use the 12px radius; buttons, the Source link, the skip links, code blocks, the hash and command wells and the signal path's chain use 8px; copy buttons and nav links 6px; the focus ring and the data end of every chart bar 4px. Step nodes and the chain's slider handles are true circles; tags are pills.

Icons are bare glyphs drawn inline as 1.5px strokes with round caps and joins. The interface icons come from one 16px sprite: download, external, copy, check, chevron and info, with the GitHub mark filled. They sit at 16px, at 12px beside link text, at 20px in the download button, and at 1em for the checks in the Same sound readout. The signal path has four icons of its own in the same style, drawn 20px wide in an odd box (see Signal Path).

**The Hairline Structure Rule.** Structure is drawn with 1px lines: rails, the bracket, row dividers, table rules, section rules, the signal path's wire, arrowheads and caret, the chain's wire and sliders, and the charts' gridlines and baselines. A line never grows past 1px. The seam clip's columns are the one set of 1px lines that isn't structure.

**The Centred Line Rule.** Every 1px line that meets a node or an icon runs through its centre exactly. Nodes and icon boxes are an odd number of pixels at every text size (`max(33px, 2.0625rem)` for step nodes; `max(21px, 1.25rem + 1px)`, rounded to stay odd, for the signal path's icons), so their centre is a pixel's centre, and each line sits at `(size - 1px) / 2` across them: the step rail, the bracket's ticks, the station's top border, the vertical rail, the signal path's wire and the caret's point. An arrowhead's 7px box sits at `(size - 7px) / 2`, so its tip is level with the centre. The line stays sharp at 1x and 2x.

## Components

### Buttons
- **Shape:** gently rounded (8px), at least 40px tall, 16px side padding, Plex Sans 500 at 15px, an optional 16px icon 8px from the label.
- **Leading icon:** says where the button goes: the GitHub mark for a page on GitHub ("Releases on GitHub"), the download icon for a file, a chevron for something that opens in place ("Build from source").
- **Primary:** ink fill, on-ink text. Hover lightens to Ink Lifted.
- **Secondary:** surface fill, strong hairline border, ink text. Hover darkens the border to Graphite 3 and fills Paper Subtle.
- **Download (signature):** a full-width primary button, at least 60px tall with 10px by 18px padding, its 20px download icon 12px from two balanced lines: "Download knobs 0.1.0" (600, 16px) and a sub-line at the label size, 78% opacity, with tabular figures, that names the file and its size ("Windows x64 installer (.exe) · 4.5 MB", or "Portable zip for Windows x64 · 3.8 MB" when the release has no installer). A release with neither file reads "knobs 0.1.0 on GitHub" and "Open the release to see its files", carries the GitHub mark, and opens the release.
- **Build from source:** a native disclosure whose summary is a secondary button with 8px block padding: a chevron that turns down while open, then two lines, "Build from source" and "(Visual Studio 2022 and CMake)" at the label size in Graphite 2, so the cost is read before the click. It sits 8px under the active state's actions (the static and error states; a release replaces it) and opens the build steps in place (see Station).
- **Rows of buttons** sit 8px apart and line up by their tops.
- **Active:** every button presses down 1px. Transitions run 160ms on the standard curve.
- **Focus:** a 2px ink outline, 2px offset, 4px radius, everywhere on the page. In the phone header's scrolling row of section links the ring sits inside the link.

### Links
- Underlined at 1px with a 0.22em offset, taking the text colour on hover. A link inside a sentence (the bracket's line, the requirement line, the build steps, a signal-path stage's note, captions, the legal lines) rests with a Graphite 3 underline, since a hairline barely shows among words of nearly its own colour on the dark grounds. A link on its own line or row keeps the Hairline Strong underline. The footer's column links and the header's section links stand without an underline until hover.
- Links that leave the site carry the 12px external arrow after the text. Buttons and file links say where they go with their leading icon instead (the GitHub mark, the download icon), and "Checksums", which opens in place, carries a chevron that turns down while the list is open. Links within the page ("Start from step 3", the footer's "On this page") carry no icon. One exception, the owner's: the footer's "GPL-2.0-or-later" link, inside the license sentence, has no arrow.
- The header "Source" link is a small outlined button with the GitHub mark, 34px tall.
- **README links:** where the knobs README says more than the page, the page links it rather than copying it, and states only what a visitor needs to decide. "More in the README" stands at the far end of How it works' title rule, UI Small in Graphite 2, ink on hover. Where room is tight the label is shorter and the rest is for screen readers only: "Known limits" in the station's requirement line, "Turn off the app's own processing" under step 4, and "The README" in the build steps. "How it was measured", at the end of the footprint caption, is Graphite 2.

### Step Rail and Nodes (signature)
- **Path (first screen):** four round nodes (33px, growing with the text size; Plex Sans 600 numerals) on a 1px Hairline Strong rail through their centres. Idle nodes are Paper Subtle inside a Hairline Strong ring, with Graphite 2 numerals. Step 3's node is inked and sits on the station's top border, which runs through its centre; on the horizontal path the rail runs from node to node and carries on as that border. Each step is a title, a line (hidden on phones and short vertical layouts) and its links, and step 3, "Get knobs running", is the station. Step titles are not links. Step 2 has no link.
- **Bracket:** a 1px open bracket over steps 1 and 2 that runs from node 1 to node 3, 12px above the nodes, its ticks running down through node 1's centre and node 3's, so each node covers its tick's end. Its label-size line, 8px above it, reads "Already have OBS `32.2.x`, a tuned mic and a cable? Start from step 3.", with the version in mono and "Start from step 3" linking to the station. It is centred between the ticks and stays on one line from 1024px up; where it can't fit, it breaks after the question. On the vertical path it is a plain line of text above the steps.
- **Forced colours:** the rail is drawn as borders, so it survives, and step 3's inked node fills with the visitor's own text colour (`CanvasText`, numeral in `Canvas`).

### Station (signature)
- The one bordered panel on the path: Surface fill, Hairline Strong border, 12px radius, the lift. Its node sits on the top border and its title under the node, like the other steps'. Padding is 24px at the sides and foot on the horizontal path, 16px 20px 20px on the vertical path and 14px 16px 16px on phones.
- It takes the active state's own height at every width, and grows and shrinks with what it holds. When an answer from GitHub changes its height, the panel moves from the old height to the new one over 320ms on the standard curve, clipped below so the arriving state never spills past the border. Opening the file list or the build steps grows it at once, while what opened settles in. Without JavaScript only the static state shows.
- **Static / no JS:** "From GitHub Releases" with "Releases on GitHub" (primary) and "Build from source". Without JavaScript the line reads "Releases, their files and checksums are on GitHub.", which claims no release.
- **Loading:** the static state, its line reading "Checking GitHub for the latest release…".
- **Ready:** the download button, the github.com destination in mono 8px under it (after the GitHub mark and "From"), then, 6px lower, a label-size line for visitors who skip steps 1 and 2: "Needs OBS 32.2.x. knobs runs OBS's built-in audio filters, not VST filters or NVIDIA noise removal. Known limits ↗". Then the foot follows its content, after a Hairline 16px under the requirement line and 14px above the date: a "Pre-release" tag when it applies, the date and "Release notes", then a links row (16px apart): the portable zip with its size and the download icon (only when the release also has an installer), "Checksums" with a chevron, and "All releases". "Checksums" is a button (`aria-expanded`) that opens the file list under the links and closes it again; arriving at `#files` opens it too, and the page lands on it once GitHub answers, unless the visitor has already scrolled, clicked, tapped, pressed a key or followed another link. Its chevron's centre sits 0.29em above the baseline, the middle of a mostly lowercase label, rounded to a whole pixel, and it turns about that centre, at every width and pointer. Below 640px the date and release notes become the first row of a ruled list, and the links its other rows, label left and icon right; the open file list follows the last row.
- **Error:** the static state's action plus the retry: "Releases on GitHub" (primary) and "Try again" (secondary), with "Build from source" under them. Three reasons, each with its own words. GitHub unreachable: "Couldn't check for a release", "GitHub couldn't be reached. The releases page always has the files." Rate-limited: "GitHub limits how often this page can check, and the limit was reached. The releases page works now.", without "Try again", since asking again can't work until the limit resets; the page keeps that answer until then (between 30 seconds and 15 minutes) so a reload doesn't ask again. Nothing listed (an empty list, or no release behind a full page of pre-releases): "Couldn't find a release", "GitHub didn't list one." After a retry, focus moves to the new state's main action. A release is kept for 10 minutes in the tab (`knobs-release-v3`); other answers aren't kept.
- **Preview:** `?preview=ready`, `error` (the rate limit), `offline` or `loading`, on a local host only, with the preview strip.
- **Build steps:** "Build from source" opens them in place, under the buttons, after a Hairline 16px below them, with no box of their own: the requirements (Visual Studio 2022 or newer with the "Desktop development with C++" workload, CMake 3.25 or newer), the four commands in a code block with Copy, then "Then run `build\x64\Release\knobs.exe`. The README ↗ has the full instructions and the tests." Body Small in Graphite 2, capped at the measure, opening with the settle motion (160ms). Arriving at `#build` opens them, with or without JavaScript: the `#build` target is the steps' body inside the `<details>`, so the browser opens it to reveal the target, and a scroll margin keeps "Build from source" in view above them. With JavaScript the page lands there again once GitHub answers (on the panel when the answer is a release, which has no build steps), unless the visitor has moved on first. Nothing on the page opens a separate box.
- The arriving state (ready or error) settles in: it fades in as it drops 4px into place, over 320ms, while the panel moves to its height.
- **Not on Windows:** each state carries a quiet label-size note (Graphite 3, balanced lines, "Windows 64-bit PC." never split), before its first action and never moving it. In ready it sits directly under the download button, above the github.com line: "This is the installer for a Windows 64-bit PC. knobs doesn't run on phones or macOS." ("This is the portable zip" when the button gets the zip). Error: "The files there are for a Windows 64-bit PC. knobs doesn't run on phones or macOS." Static, loading and an error with no release listed: "knobs is for a Windows 64-bit PC. It doesn't run on phones or macOS." On the horizontal path (1024px and up) the note sits 12px under the panel instead; while the panel changes height it waits, then fades in under the new edge.

### Seam Clip (decoration)
- A drawn, synthetic speech clip, the way an audio editor draws a clip zoomed out. Every other pixel column is a 1px hairline from the lowest to the highest point in it, in Hairline Strong, with the louder core over it in Graphite 3 at 0.48 opacity, in phrases of joined syllables with pauses between them where the rule shows clean. The whole strip rests at 0.8 opacity. A seeded generator draws it (`.impeccable/wave/clip.py`), and it stands for no recording.
- Its zero line is the seam under the first screen, centred on the How it works rule, so the clip reads as that rule carrying a signal. It runs edge to edge, the full width of the window, in a 48px strip; its tallest column reaches 19.5px above the rule's centre.
- For visitors not on Windows, where the note hangs under the station on the narrower horizontal path, it is drawn lower in steps so its tallest column clears the note by 12px and is never cut off: 50% from 1024 to 1087px, 72% to 1151px and 95% to 1215px. The hairlines stay 1px.
- It loops without a join: one 2880px tile that starts and ends in a pause, drawn three times, so it covers a 5120px window plus one tile of travel.
- It drifts left at 30px a second, one tile in 96 seconds, in steps of exactly one device pixel at any pixel ratio (page.js sets `--wave-steps` to the tile times the ratio, and asks again when the ratio changes), so a hairline never lands between pixels while it moves. The movement is a CSS transform on its own layer, composited with no layout or paint.
- It lies flat on the rule until the release has settled (ready or error) and the whole strip is in view, then rises from the rule over 720ms after a 320ms wait. While the download is hovered or keyboard-focused the strip lifts to full strength over 320ms, as a meter lifts when the signal arrives. It pauses when it leaves the screen and while the tab is hidden. With reduced motion it stands still, already up. Without JavaScript it is up and drifts, never pausing.
- It lives in the band's bottom padding and the top of the next section, never behind the headline or the download. It is positioned out of the flow and clipped to its strip, so it never moves the download and never scrolls the page sideways. It is drawn at a fixed pixel scale: a narrower window shows less of it, never a denser clip.
- No fill, gradient or glow. Inline SVG, `aria-hidden`, its strokes the Hairline Strong and Graphite 3 tokens; hidden in forced colours.

**The One Decoration Rule.** The seam clip is the page's only decoration: a drawn, synthetic speech clip of 1px columns in Hairline Strong and Graphite 3, edge to edge at the seam under the first screen, drifting slowly. The share card may carry the same clip in its own place on its seam; the 404 page carries none. Never a second decoration, never a fill or glow, never anything behind the headline or the download, and never louder: no faster pace, no taller columns and no burst that stands out from the rest.

### File List (in the station)
- Opened by the station's "Checksums" and closed by it again; it fades in with the settle motion (160ms). It sits under the ready state's links, after a Hairline 14px below them, inside the station: no border, fill or lift of its own, so it never reads as a card in a card. Each file is a row, rows divided by Hairlines, 16px apart: the installer, the portable zip, any other files, then the checksums file.
- Each row: the file kind in 600 at UI Small, with a "Recommended" tag on the main file only when the release has another copy of knobs to choose from; then the file name in Plex Mono as a link to the file on github.com, with the download icon, and its size after a dot, in Plex Sans with tabular figures. The size keeps its dot when it wraps under a long name.
- **SHA-256:** a label row ("SHA-256" at Label size in Graphite 3, its Copy button at the right), then the hash in a Sunken well (Hairline border, 8px radius, 8px by 10px), Plex Mono at Label size, in even rows of 32 (16 where the list is narrower than 17.5em).
- **PowerShell check:** a label row ("Run this in PowerShell. It prints True if the file matches.", balanced, with its own Copy), then the command in the same well: `(Get-FileHash "$HOME\Downloads\<file>" -Algorithm SHA256).Hash -eq '<sha>'`, which prints True or False and ignores case. A wrap never splits an option from its dash, and the hash runs on from `-eq` as a terminal would wrap it.
- A file with no SHA-256 on GitHub keeps only the command, without the comparison, and the label asks the visitor to compare by hand (pointing to the checksums file when the release has one). The checksums file's row keeps only its kind, name and size.

### Section Head
- The title (Headline) in a flex row that wraps, on a 1px Hairline Strong rule the width of the content, 14px under the title's line box, the way a ruled table opens on its header rule. How it works puts "More in the README" at the far end of the row, on the title's baseline. 32px to 48px (fluid) separate the rule from the first row; in Measured the rule is the first measurement's top.

### Ruled Tables
- No outer border, no fills, no zebra. Cells sit on 10px vertical padding with 16px before the next column, rows ruled with Hairline and the header rule in Hairline Strong. Headers in Label size, weight 500, Graphite 3. Row headers in ink, 600 by default; in the Same sound readout they are 400 so the result carries the weight.
- **Stacked:** where the Same sound readout is narrower than 20em, each row becomes a block: the row header, then its value under it. A Hairline Strong rule opens the list and a Hairline closes each block. The header row stays for screen readers, visually hidden, and the table carries explicit table roles.
- **Ruled rows:** How it works' facts ("In the tray, from sign-in", "Read-only on OBS") and Measured's measurements sit on the section's grid, the term or claim in the 20rem column and its text or evidence beside it, 64px apart, each row between Hairlines. The facts open on a Hairline `clamp(56px, 6vw, 88px)` under the signal path; the last fact and the last measurement close on their own content, without a rule. Below 1024px each row stacks.

### Signal Path (signature)
- One 1px Graphite 3 wire through four stages, each marked by its icon on the wire: your mic (a mic), OBS's filters run by knobs (three sliders), the virtual cable (a plug) and your other apps (an app grid). The icons are inline SVG in the sprite's style, 1.5px strokes drawn 20px wide in an odd 21px box that grows with the text size and stays odd; Graphite 3, knobs's in ink, `aria-hidden`, so the stage names carry the meaning. Each stage's name (600) and note (UI Small, Graphite 3, 4px under it) sit under its icon, every stage's on the same line. Each stretch of wire starts 6px after an icon and ends in a 7px open arrowhead whose tip is 6px short of the next icon, all through the icons' centres (see the Centred Line Rule). Full content width, columns 1 : 1.6 : 1 : 1, 40px apart.
- **The knobs panel** is the one panel: Surface, a 1px ink border, 12px radius, the lift, padding 14px 20px 20px. The wire runs straight through knobs's icon, as through every other, and the panel hangs 10px under the icon, clear of the wire, reaching into the gaps by its padding so its icon, name and note stay on the column like every other stage's. A callout caret in its top edge points up at the icon: one 1px ink stroke along the edge for 4.5px each side, up 6px to a point on the icon's centre and back down, over a Surface fill that covers the border between its sides, so it reads as part of the border with no seam.
- **The chain:** inside the panel, four rows on a short wire, one per filter, in the order they run, each with a 5px ink dot and a setting drawn as a slider at its own value (`--v` of 0.64, 0.3, 0.82 and 0.48): a 1px Hairline Strong track, a 1px Graphite 3 stretch up to the value and a 9px handle (a Graphite 2 ring on Surface). No filter names. The list is Paper Subtle with a Hairline border, 8px radius and Hairline rows, each row as tall as a line of UI Small would make it (14px plus 1.4em), so it grows with the text. Screen readers get one image, "Your filters, in your order, each with your settings".
- **Below 900px** the path turns vertical, at most 30rem wide, 28px between stages: the wire runs unbroken down the left through every icon, each icon level with its stage name's first line at any text size, the arrowheads point down, and text indents by the icon plus 22px. The knobs panel sits right of the rail, its left edge 9px clear of the icon's box, padding 12px 18px 18px 12px, and its caret turns onto that left edge to point across at the icon's centre.
- **The one signal:** the first time the whole drawing is in view (or, for a drawing taller than the window, once its top is in the top 35%), one signal runs through it once. A 32px ink pulse runs along each wire at 0.5px a millisecond; the mic's icon flashes as it sets off; knobs's icon, Graphite 3 until then, lights to ink over 320ms and stays lit; the pulse runs down the chain at 0.28px a millisecond and each dot grows from 40% to full over 320ms as it passes; then the pulse leaves for the cable and the apps, whose icons each flash (to full at 22% of 900ms, then out). A lit icon is an ink copy laid over the icon for the run, so only opacity and transform change; the copies, pulses and timings are removed a second after the last flash. Only a drawing still below the fold when the page loads waits for it; with reduced motion, in forced colours, without IntersectionObserver or JavaScript, and in print, nothing waits and nothing moves.
- **Forced colours:** the icons, the chain's dots and the caret draw in system colours (CanvasText, the caret's fill Canvas).

### Measurement Charts
- Each measurement keeps a structure screen readers read as data, and CSS draws it: a table, or a list of terms. No hover layer: every value is printed beside its mark.
- **Exact-match readout (Same sound):** a ruled table with one row per input the claim covers (test signals, a chain of every audio filter in `obs-filters`, a recording of real voice), each reading "Bit-identical" in ink 600 after a 1em check stroke, right-aligned, under the headers "Input" and "knobs against OBS". It restates the measured result and draws no waveform, count or percentage.
- **Bars:** horizontal, on linear scales from zero. knobs is Ink and OBS Graphite 3, told apart by tone, never by hue, and always also by the legend or the row names, the fixed order (knobs first) and the value labels. Bars are 10px (12px for the delay), square at the baseline and 4px round at the data end, with the value 10px after the tip. Each bar's length is set inline as `--f`, its share of the scale, beside the printed value, and the scale leaves `5.25rem` at its end for the longest label, so a label never leaves the chart.
- **Same delay:** knobs's and OBS's bars on one 0 to 100 ms scale, so 88.1 and 87.7 ms land together. Hairline gridlines every 25 ms (the zero line Hairline Strong), Label-size tick labels, and the names in a 4.5rem column left of the bars (knobs in ink 600). A value label masks any gridline it crosses.
- **A fraction of the footprint:** the table itself, set as four small charts. Its header row is the legend (14 by 10px bar-stub swatches); each body row is a measure, its name in an 11.5rem column on the left (above on narrow charts) and knobs's bar over OBS's on a Hairline Strong baseline. Each measure has its own scale, from zero to OBS's value, and the caption says so. A range (threads, 7–9 and 90–98) draws its low end solid and the rest at 32% opacity. knobs's GPU, "None", is a bar of zero length, its label on the baseline.
- **Captions:** each chart's caption, at Label size under it, names the one PC: "Measured on a PC (Core Ultra 7 265K) with OBS 32.2.2, an Audient iD4 and VB-Cable." The footprint's opens with "Each measure has its own scale, from zero." and ends with "How it was measured ↗". Measured has no intro line; the head rule opens the first measurement.
- **The sweep:** the first time one of the two bar charts comes into view (its top past 85% of the window's height), one clip-path sweep draws its bars and their labels from zero in 720ms on the standard curve, at the same pace on every line. knobs's short bars are drawn almost at once while OBS's keep going, and the two delay bars land together; the scale, legend and names are there first. It runs once per chart and page view. Only charts still below the fold when the page loads wait for it; with reduced motion, without IntersectionObserver or JavaScript, and in print, the bars are simply there.
- **Forced colours:** knobs's bars take CanvasText and OBS's GrayText.

### Notes and Containers
- **Code block:** a Sunken well with a Hairline border, 8px radius, Label-size mono at line height 1.6. The copy button has a column of its own at the top right (under the commands, at the right, where the station is narrower than 30em), so no command ever runs under it. Each command is its own line and wraps only between its words and after a URL's slashes, never inside an option, continuing under a 2ch hanging indent. A word too long for the column scrolls inside it. Copy copies the plain commands, one per line. Without JavaScript there's no Copy button, and the commands take the whole well.
- **Copy button:** 30px tall (44px on touch), 6px radius, outlined, Graphite 2 text, the label at Label size 500. On success it turns Signal Green and swaps its icon to a check for 1.8 seconds; when the clipboard is blocked it selects the text, reads "Press Ctrl+C", and says so to screen readers. Each copy button in the file list names its file to screen readers ("Copy the SHA-256 of knobs-0.1.0-setup.exe").

### Navigation
- **Skip links:** "Skip to content" (`#main`) and "Skip to download" (`#step-3`, the station), the first two Tab stops, each shown at the top left only while focused (an ink tab with an 8px radius, 600). After "Skip to download", the next Tab reaches the active state's main action. The bracket's "Start from step 3" and the footer's "Download" go to the station too.
- **Lockup:** `site/brand/knobs-lockup-horizontal-light.svg`, the knobs repository's master, light text for the dark ground: the wordmark at 1.48 of its outlines, set 66 units past the knob, viewBox 687.5 by 152. It renders 163 by 36px in the header and 145 by 32px on phones and in the footer; the CSS sets only the height and lets the width follow. The app icon and favicon are the masters, unchanged. The files aren't under the GPL (`site/brand/LICENSE`).
- **Header:** 64px on Paper Subtle with a hairline under it; the lockup on the left; section links (How it works, Benchmarks; UI Small, Graphite 2, 6px-radius hover fill on Surface Sunken) and the "Source" link on the right. "Benchmarks" goes to `#measured`, whose heading stays "Measured against OBS". Below 640px the header is 56px. Below 520px the section links take a 44px row of their own under the lockup and "Source", so every section stays one tap away on a phone.
- **Footer:** Paper Subtle on a Hairline, padded 56px above and 40px below; the lockup with the headline under it in Graphite 3 ("Your OBS mic chain, in every app."), two link columns grouped by destination ("On GitHub", every link with the external arrow; "On this page": Download, How it works, Benchmarks), 72px apart and wrapping, then a hairline 48px lower and the license and independence lines at Label size.

### Preview Strip
- A thin full-width band above the header (Paper ground, hairline below, Label size) with an amber info icon: "Preview. This release data is made up. The version, files and checksums are not real.", and a link back to the live page. It appears only when made-up release data is shown, which the page allows only on a local development host. Nothing else on the page uses amber.

### Share Card
- `site/brand/card.png`, 1200 by 630, the image for every link preview (Open Graph and X `summary_large_image`), referenced by absolute URL from https://getknobs.app/. It is the first screen in miniature: a Paper Subtle band over a Paper strip, the light-text lockup at 64px tall (32px in a 600px preview, the logo's floor), the headline in two lines at Display size on a 24px card base (the page's sizes at 1.5 times, since previews show the card at half size or smaller), the page's seam clip unchanged on a Hairline seam, then the domain in Plex Mono in Graphite 2 and the independence line at Label size in Graphite 3. Content keeps 40px or more from every edge. No version, counts or screenshots, so it never goes stale.
- The preview description carries the independence line too ("It isn’t affiliated with or endorsed by the OBS Project."), since the card's own line can't be read at thumbnail size.
- It lives in `site/brand/` because it contains the logo, so `brand/LICENSE` covers it. It is rendered from an HTML template in headless Chromium and compressed losslessly (about 38KB); the template and the rejected options are kept outside the repository.

### 404 Page
- `site/404.html`, which GitHub Pages serves with a 404 status for any missing path. The download page's header, then "This page doesn’t exist." at Headline size and one primary button, "Go to the download page", on the first screen's Paper Subtle ground, then the footer with only the license and independence lines. No decoration. It reuses base.css and styles.css with root-relative URLs, so it works at any depth, and it is `noindex` with its own description.

### Touch Icon
- `site/brand/apple-touch-icon.png`, 180 by 180: the app icon unchanged, 136px wide, centred on a Paper Subtle square (neither the icon nor the favicon has a ground of its own).

## Do's and Don'ts

### Do:
- **Do** put the download inside the bordered station as step 3 of the path, with the destination on github.com shown under the button.
- **Do** open what a step needs in place, inside the station (the file list, the build steps), under a hairline and with no box of its own.
- **Do** use ink for every primary action and the surface-plus-hairline style for every secondary one.
- **Do** set anything copyable (versions in running text, file names, hashes, commands, paths) in Plex Mono, and line numbers up, file sizes among them, with Plex Sans's tabular figures.
- **Do** cap text with the `--measure` token (52ch), never in rem.
- **Do** mark every link that leaves the site with the 12px external arrow (the footer's GPL link is the owner's one exception).
- **Do** run every 1px line that meets a node or icon through its centre: odd-sized boxes, lines at `(size - 1px) / 2`.
- **Do** let the station take each state's own height, moving between heights over 320ms, and let state changes settle on `cubic-bezier(0.2, 0, 0, 1)`, fading in as they drop 4px into place: 160ms for feedback, 320ms for structure. Reduced motion makes every change instant: no animation or transition at all, never a 0.01ms duration, which would hold a newly shown state hidden (and unable to take focus) until the next frame.
- **Do** draw a measurement as bars on a linear scale from zero, knobs in ink and OBS in Graphite 3, with every value printed beside its bar and the one-PC note as the caption.
- **Do** say plainly that knobs isn't affiliated with or endorsed by the OBS Project, in the footer of any page.
- **Do** keep the lockup at 32px tall or more, the light-text master, with clear space at least the pointer's length.

### Don't:
- **Don't** use brand red outside the logo files.
- **Don't** add a light theme or a second value for a colour role; the page has one scheme.
- **Don't** add gradients, glass or blur to the page. The knob mark's own shading belongs to the logo and is not a pattern to reuse.
- **Don't** use any shadow larger than the one-pixel lift, and don't use hard offset shadows.
- **Don't** put icons in coloured tiles or circles; icons are bare stroked glyphs, 16px beside text and 20px on the signal path.
- **Don't** add imagery the project doesn't have: no invented screenshots, illustrations or stock art.
- **Don't** add decoration beyond the seam clip: no background patterns or textures, and no second clip or wave.
- **Don't** name any particular app; say "your other apps".
- **Don't** load anything from a third party. Fonts, icons and logos are served from the site; the GitHub releases API is the only outside request.
- **Don't** set any page text in Sora or ship its font file; Sora lives only in the outlined logo. Don't add uppercase tracked labels above headings.
- **Don't** animate anything on scroll beyond the bar charts' one-time sweep and the signal path's one pass, and don't add a second continuous motion: the seam clip is the only thing on the page that moves on its own.
- **Don't** tell knobs and OBS apart by hue in a chart; tone, order and labels do it.
- **Don't** show the name as anything but lowercase "knobs", even at the start of a sentence or in a heading.
