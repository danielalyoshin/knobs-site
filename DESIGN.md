---
name: knobs
description: The download page for knobs, set as the open-source download-page standard, played straight.
colors:
  ink: "#17181b"
  ink-hover: "#2b2d32"
  on-ink: "#ffffff"
  paper: "#ffffff"
  paper-subtle: "#f5f6f8"
  surface: "#ffffff"
  surface-sunken: "#f0f1f4"
  hairline: "#e2e4e8"
  hairline-strong: "#cdd0d6"
  graphite-2: "#464950"
  graphite-3: "#686c75"
  signal-ok: "#1d7a4c"
  signal-warn: "#9a5a00"
  brand-red: "#d63c42"
  ink-dark: "#e8eaee"
  ink-hover-dark: "#ffffff"
  on-ink-dark: "#17181b"
  paper-dark: "#0f1012"
  paper-subtle-dark: "#141518"
  surface-dark: "#17181b"
  surface-sunken-dark: "#121316"
  hairline-dark: "#26282d"
  hairline-strong-dark: "#363940"
  graphite-2-dark: "#b0b4bc"
  graphite-3-dark: "#8b8f98"
  signal-ok-dark: "#4cc38a"
  signal-warn-dark: "#f0a33c"
  brand-red-dark: "#e5484d"
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
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.006em"
  chart-value:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.5
    fontFeature: "tnum"
  numeral:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  lede:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Fallback, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
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
  node: "32px"
  signal-gap: "40px"
  signal-dot: "11px"
  chart-bar: "10px"
  chart-room: "5.25rem"
  section-y: "clamp(72px, 9vw, 128px)"
  station-pad: "24px"
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
    size: "32px"
  step-node-inked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.numeral}"
    rounded: "{rounded.round}"
    size: "32px"
  station:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 24px 24px"
  signal-stage-knobs:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "22px 20px 20px"
  signal-chain:
    backgroundColor: "{colors.paper-subtle}"
    textColor: "{colors.ink}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.md}"
    padding: "7px 12px 7px 32px"
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
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite-2}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  disclosure:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "13px 16px"
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
---

# Design System: knobs

## Overview

**Creative North Star: "The Setup Path, Set Straight"**

The knobs site is the open-source download page done the way the best projects do it: white or graphite ground, cool greys taken from the knob, black ink for the one thing to press, and nothing on top. There is no concept and no theme, and the one decoration, a voice traced along the foot of the first screen, never competes with the file. The finish bar is the download pages of Zed and Audacity: exact spacing, hairline structure, honest states, and every link visibly going where it says.

The page reads as a path. Setup is the four numbered steps on the first screen, joined by a hairline rail, and the download is step 3, held in the one bordered panel on the page. What a step needs beyond its few lines opens in place rather than in a section further down: the release's files and checksums inside the panel, the OBS guide and the build steps under the path. Everything else is open typography on hairline rules: ruled tables and ruled fact grids. Density is moderate and calm; sections breathe on large vertical padding, and inside a section the type does the work.

Motion settles and never performs. Feedback answers in 160ms, structure settles in 320ms, both on one curve, with opacity and a 4px rise only. Nothing moves on scroll except each measurement chart's one-time sweep (see Measurement Charts).

**Key Characteristics:**
- Restrained palette: cool graphite neutrals, ink as the only action colour, brand red only inside the logo.
- IBM Plex Sans for every word on the page, from the pitch to the footnotes; IBM Plex Mono for anything copyable; Sora only inside the outlined logo.
- 1px hairlines carry structure; one tight lift is the only shadow.
- A step rail with round numbered nodes, and a single "station" panel for the download.
- Light and dark follow the visitor's system setting, with a token pair for every role.
- One decoration: a static 1px trace of a spoken phrase along the seam under the first screen.
- Self-contained: the fonts, logo and icons are served from the site; the only outside request is the GitHub releases API.

## Colors

A cool, near-monochrome palette drawn from the knob's graphite, with black ink as the single voice of action. Every role has a light value and a `-dark` counterpart, switched by `prefers-color-scheme`.

### Primary
- **Brand Ink** (`ink`, `ink-dark`): body text, headings, and the fill of every primary action: the primary button, the download button, step 3's inked node, focus rings and text selection. In dark mode ink inverts to the light logo ink and primary buttons become light with dark text (`on-ink-dark`).
- **Ink Lifted** (`ink-hover`, `ink-hover-dark`): the hover fill of ink buttons; one step lighter on light ground, pure white on dark.
- **On Ink** (`on-ink`, `on-ink-dark`): text and icons on an ink fill.

### Neutral
- **Paper** (`paper`, `paper-dark`): the page ground for the content sections.
- **Paper Subtle** (`paper-subtle`, `paper-subtle-dark`): the header, the first screen with the path, the footer, and hover fills on summaries.
- **Surface** (`surface`, `surface-dark`): bordered containers: the station, disclosures, the knobs stage in the signal path, secondary buttons, copy buttons.
- **Surface Sunken** (`surface-sunken`, `surface-sunken-dark`): code blocks, the hash and command wells in the file list, and the nav-link hover.
- **Hairline** (`hairline`, `hairline-dark`): row dividers, section rules, table body rules.
- **Hairline Strong** (`hairline-strong`, `hairline-strong-dark`): container borders, the step rail, idle node rings, table header rules, link underlines at rest, and the voice trace.
- **Graphite 2** (`graphite-2`, `graphite-2-dark`): secondary prose: the lede, step descriptions, section intros, nav links.
- **Graphite 3** (`graphite-3`, `graphite-3-dark`): tertiary text: hints, footnotes, file metadata, table headers, separators, the chevron. Also the signal path's wire and OBS's bars in the measurement charts.

### Status
- **Signal Green** (`signal-ok`, `signal-ok-dark`): only the "Copied" confirmation on copy buttons.
- **Signal Amber** (`signal-warn`, `signal-warn-dark`): only the preview strip's icon, which marks made-up release data.

### Brand
- **Logo Red** (`brand-red` on light, `brand-red-dark` on dark): lives inside the logo files only, on the knob's pointer and "obs" in the wordmark. The stylesheet does not use it.

### Named Rules
**The One Ink Rule.** Ink is the only action colour. A primary action is an ink fill; a secondary action is a surface fill with a strong hairline. No other hue ever marks something to press.

**The Red Stays in the Logo Rule.** Brand red appears in the lockup and app icon and nowhere else: not as a link colour, a button, a marker, a badge or a background.

**The Logo Is Not Ours to Recolour Rule.** Use the site's lockup files (dark text on light, light text on dark, swapped by colour scheme). They are a site variant of the masters in the knobs repository: the same knob, with the wordmark larger and further from it (see Lockup under Navigation). Never recolour, rotate or stretch the knob, never show it under 32px tall, and keep clear space at least the length of the pointer around it.

## Typography

**Display Font:** IBM Plex Sans at 600, self-hosted
**Body Font:** IBM Plex Sans at 400 and 500, the same family
**Label/Mono Font:** IBM Plex Mono at 400 and 500, self-hosted, falling back to the system monospace (Cascadia Mono on Windows)

**Character:** Plex Sans is plain and engineered, with the slightly squared, open forms of a well-made technical manual, which suits a page whose job is to be trusted. One family sets every role, so the hierarchy comes from size, weight and tone, never from a change of voice. Plex Mono is its companion on the same vertical metrics, so a version or a checksum sits on the line beside the prose without a jump. Sora stays in the wordmark alone, which keeps the lockup reading as the logo rather than as one more heading.

**Files.** The Latin subsets exactly as the official IBM Plex release ships them (`@ibm/plex-sans` 1.1.0, `@ibm/plex-mono` 2.5.0, github.com/IBM/plex), five woff2 files in `site/fonts/` with the release's own unicode ranges and its SIL Open Font License beside them (`OFL-IBM-Plex.txt`). The page preloads only the three Plex Sans weights the first screen uses; Plex Mono loads when a mono line renders. Every face uses `font-display: swap`, and until Plex arrives the text sets in "IBM Plex Sans Fallback": Arial scaled to Plex's width and line metrics on this page's own text (400: size 100.14%; 600: Arial Bold at 96.6%), so the swap barely moves a line.

### Hierarchy
- **Display** (600, fluid 2rem to 4rem, line height 1.06, tracking -0.025em): the single h1 pitch on the first screen, "Your OBS mic chain, outside of OBS.", in two lines that break at the comma. Each half is an inline block, so it stays on one line where it fits and wraps inside itself only when it can't (very large text), never running off the page. Where the whole sentence fits one line (on the vertical path from about 750px to 1023px) it takes one.
- **Headline** (600, fluid 1.75rem to 2.375rem, tracking -0.018em): section titles, set in the left head column.
- **Title** (600, 1.1875rem, line height 1.3, tracking -0.008em): path step titles, fact terms, measurement titles.
- **Title Small** (600, 1.125rem, tracking -0.006em): the release state head inside the station.
- **Chart Value** (Body Small, tabular): the value at the tip of each bar, knobs's in ink 600 and OBS's in Graphite 2 400; the delay values' numbers at 1.0625rem 600.
- **Numeral** (600, 0.875rem, tabular): step node numbers.
- **Lede** (400, 1.0625rem, line height 1.55, Graphite 2): the pitch description and section intros, capped at the measure.
- **Body** (400, 1rem, line height 1.55).
- **Body Small** (0.9375rem, line height 1.5): the workhorse for step text, tables, disclosures and links rows.
- **UI Small** (0.875rem): nav, link rows, file metadata.
- **Label** (0.8125rem, line height 1.45, Graphite 3): hints, destinations, footnotes, table headers, hashes. Sentence case, no tracking.
- **Mono** (Plex Mono, 0.875em of its context, ligatures off): versions, file names, file sizes in the file list, hashes, commands, hosts, the github.com destination.

### Named Rules
**The Wordmark Face Rule.** Sora is the wordmark's face and lives only in the logo files, as outlined paths. The page never loads it and never sets text in it. Every heading, numeral, figure, line of prose, button and label is IBM Plex Sans; everything copyable is IBM Plex Mono.

**The Copyable Is Mono Rule.** If a visitor could compare it, paste it or type it (a version, a file name, a file size, a checksum, a command, a host), it is set in Plex Mono with ligatures off. Numbers that line up use tabular figures: Plex Sans's default figures are already tabular (every digit is 0.6em wide), and `tabular-nums` stays declared for the fallback faces. A SHA-256 wraps in even rows of 32 characters (16 where the file list is narrower than 17.5em, as on phones), so it can be compared in chunks.

**The Measure Rule.** Every text cap is the `--measure` token, 52ch: section intros, the stacked lede, fact and measurement text, the station's state text, and the text in the panels under the path. In Plex Sans 1ch is the width of "0" (0.6em) while an average character is about 0.45em, so 52ch sets lines of about 66 to 72 characters at any text size. Never cap text in rem, and never read "68ch" as 68 characters.

**The No Small Caps Rule.** Labels and table headers are small sentence-case text in Graphite 3. There are no uppercase tracked labels above headings.

## Layout

Content sits on a 72rem column with a fluid gutter (16px to 40px). The first screen sets the pitch on a 12-column grid: the h1 in the left eight columns, the lede bottom-aligned in the right four. From 1024px to 1279px, where four columns would set the lede in six lines of under 40 characters, the h1 takes seven columns and the lede five; the h1's longer line needs only about 470px. Below it, the path band spans the full content width with four columns weighted 1 : 1 : 2 : 1, a 32px gap (40px at 1600px and wider), so step 3's station gets the room for the download.

Content sections use a two-column head: a 20rem head column and the body, 64px apart. Section titles live in the head column. Sections are separated by a hairline and padded fluidly (72px to 128px vertically); the first screen, header and footer sit on Paper Subtle, the content sections on Paper.

Spacing is a loose 4px rhythm: 4 and 8 for tight inline gaps, 12 to 16 between related lines, 20 to 24 inside panels, 40 to 72 between blocks.

**Responsive behaviour.**
- **1024px and up:** the path is horizontal, with the bracket ("Start from step 3") over steps 1 and 2 above the rail, from node 1 to node 3, and the non-Windows note in two balanced lines just under the station. The panels under the path take the columns of steps 2 and 3.
- **Below 1024px:** the pitch stacks, with the lede at the measure; the path turns vertical, one rail down the left of the nodes, capped at 40rem; the station indents to the step text and its node sits on the rail, and so do the panels under the path; the bracket becomes a plain line above the steps. Section heads stack; facts and measurements stack, the claim over its text or chart.
- **Below 900px:** the signal path turns vertical: the wire runs down the left, the arrowheads point down and the knobs panel indents to the stage text (see Signal Path).
- **Below 720px:** the section links leave the header row for a row of their own under it, 44px tall and flush with the gutter (both fit at 320px).
- **Below 640px:** the header's top row drops to 56px and the lockup to 32px tall (128px wide); the first screen's top padding drops to 28px and path step descriptions hide, so the download stays inside the first screen; the station takes the active state's own height; the ready state's links, "Checksums" among them, become a ruled list of 44px rows, and the open file list continues it.
- **Below 480px:** the download button's size moves to its own line, without its dot. It does the same wherever the station is narrower than 19.5em (a container query), which is the horizontal path's narrowest widths, from 1024px to about 1100px.
- **Below 360px:** "Build from source" may wrap. Nothing scrolls sideways at 320px (400% zoom on a 1280px window).
- **Narrow charts** (container queries, in the chart's own em, so they follow the text size): below 34em each footprint measure's name goes over its bars (every phone); below 22em the delay scale labels only 0, 50 and 100 ms; below 20em each Same sound result goes under its input, and below 18em the delay's names go over its bars (a phone with the browser's text at 150% or more). See Measurement Charts.

**The Text Size Rule.** Breakpoints are set in em, so the widths above are at the browser's default 16px text. A visitor who raises the browser's text size gets the layout of a narrower window, never squeezed columns: at 200% text a 1440px window takes the 720px layout. Controls that hold text grow with it (min-height, never a fixed height), and the path's nodes are `max(32px, 2rem)`.

**The Download in the First Screen Rule.** At every width, step 3's primary action is visible without scrolling. When space runs short, cut the descriptions of the other steps, never the station. At 390x844 the download button ends at 679px and every other state's primary action by 806px.

- **Short desktop windows** (1024px wide or more and 680px tall or less, such as a 1080p laptop at 150% scaling, about 1280x610): the first screen's top padding and the path's top margin drop to 40px, so every state's primary action ends by 544px.
- **Shorter still** (560px tall or less, such as a 1366x768 laptop at 125%, about 1093x520): they drop to 28px, and each state shows its buttons right under its head, then its explanation (owner, 2026-10-06). Only the order on screen changes; the reading and tab order stay the page's. From 1024 to 1099px wide every state's primary action ends by 466px (485px with a 17px Windows scrollbar), so it holds down to about 490px tall.
- **The vertical path in a short window** (below 1024px wide and 850px tall or less, such as 1000x800): the other steps' descriptions hide, as on phones, and their titles and links stay. At 1000x800 every state's primary action ends by 741px, or 780px with the non-Windows note.

**The Thumb Rule.** On a touch screen (`pointer: coarse`) every target is at least 44px tall: buttons, copy buttons and the label rows that hold them, nav links, the "Checksums" toggle, footer links and every link that stands on its own line. Those grow in the flow, with negative margins that keep their text where it was. A link inside a sentence keeps its line and gets a 44px invisible hit area instead. Mouse layouts keep their density.

## Elevation & Depth

The system is flat. Depth comes from tone (Paper Subtle bands, Surface panels, Sunken wells) and 1px hairlines, not from shadow. One shadow exists: a tight lift of a single pixel, used to separate the containers that hold the download and the file list from the page.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 1px 2px rgb(23 24 27 / 0.07)`; dark: `0 1px 2px rgb(0 0 0 / 0.5)`): the station panel and the knobs stage in the signal path. Nothing else.

### Named Rules
**The One Lift Rule.** A shadow is never larger than the lift. If a container needs more presence, give it a stronger hairline or the ink border, not a deeper shadow.

## Shapes

Gently rounded rectangles on hairline borders. Containers that hold content (the station, disclosures, the knobs stage in the signal path) use the 12px radius; buttons, code blocks and the hash and command wells use 8px; the copy button and nav links 6px; the focus ring 4px. Step nodes are true circles; tags are pills. The external, download, copy, check, chevron, arrow, info and GitHub icons are 16px stroke glyphs (1.5px stroke, round caps), drawn inline from one sprite at 16px, or 12px beside link text.

**The Hairline Structure Rule.** Structure is drawn with 1px lines: rails, row dividers, table rules, section rules, the bracket. A line never grows past 1px. The voice trace is the one 1px line that isn't structure.

## Components

### Buttons
- **Shape:** gently rounded (8px), 40px tall, 16px side padding, Plex Sans 500 at 15px, an optional 16px icon 8px from the label.
- **Leading icon:** says where the button goes: the GitHub mark for a page on GitHub ("Watch for releases", "Releases on GitHub"), the down arrow for a panel on this page ("Build from source"), the download icon for a file.
- **Primary:** ink fill, on-ink text. Hover lightens to Ink Lifted.
- **Secondary:** surface fill, strong hairline border, ink text. Hover darkens the border to Graphite 3 and fills Paper Subtle.
- **Download (signature):** a full-width primary button, 60px tall, with a 20px download icon and two lines: "Download knobs" (600, 16px) and a sub-line at the label size, 78% opacity, with tabular figures ("Installer for Windows x64 · 4.5 MB").
- **Build from source:** a secondary button with the 16px down arrow and two lines: "Build from source", then "(Visual Studio 2022 and CMake)" at the label size in Graphite 2, so the cost is read before the click. Every one of them opens the "Build it from source" panel under the path (`#build`) and jumps to it.
- **Active:** every button presses down 1px. Transitions run 160ms on the standard curve.
- **Focus:** a 2px ink outline, 2px offset, 4px radius, everywhere on the page.

### Links
- Underlined at 1px with a 0.22em offset; the underline sits in Hairline Strong at rest and takes the text colour on hover.
- Links that leave the site carry the 12px external arrow after the text; in-page jumps use the down arrow, and "Checksums", which opens in place, the chevron. A visitor can tell from the icon where a link goes.
- The header "Source" link is a small outlined button with the GitHub mark, 34px tall.
- **README links:** where the knobs README says more than the page, the page links it rather than copying it, and states only what a visitor needs to decide. How it works ends with one standalone link in ink at Body Small, "How it works in the README" with the external arrow. Where room is tight the label is shorter and " in the README" is for screen readers only: "Known limits" in the station's OBS line, and "Turn off the app’s own processing" under step 4, which reaches the README's step 4 and its tip about apps that process the mic again (Discord's noise suppression, echo cancellation and gain control). Known limits has no section: the two that change a decision (VST filters, NVIDIA noise removal) sit in the station's OBS line.

### Step Rail and Nodes (signature)
- **Path (first screen):** four round nodes (32px, Plex Sans 600 numerals) on a 1px Hairline Strong rail. Idle nodes are hollow with Graphite 2 numerals. Step 3's node is inked. The path is the page's whole setup: each step is a title, a line (hidden on phones and short vertical layouts) and its links, and step 3 is the station.
- **Bracket:** a 1px open bracket over steps 1 and 2 that runs from node 1 to node 3, 12px above the nodes, its ticks running down to the path. Each tick starts at its node's centre (node 1's, and node 3's on the station's top border), so the node covers its end and the tick lands on the node's top. Its label-size line, 8px above it, reads "Already have OBS `32.2.x`, a tuned mic and a cable? Start from step 3.", with the version in mono and "Start from step 3" linking to the station. It is centred between the ticks and stays on one line from 1024px up (about 9px clear of each tick at 1024px); where it can't fit, it breaks after the question. On the vertical path it is a plain line of text above the steps.
- **Forced colours:** the rail is drawn as borders, so it survives, and step 3's inked node fills with the visitor's own text colour (`CanvasText`, numeral in `Canvas`).

### Station (signature)
- The one bordered panel on the first screen: Surface fill, Hairline Strong border, 12px radius, the lift, 24px padding. Its node breaks the top border.
- It lays out every release state in one grid cell and shows only the active one, so the panel keeps the height of the tallest state (today the none state) and never changes size between states. While the file list is open the ready state is the tallest, so the panel grows with it and returns when it closes. Without JavaScript only the static state takes room. Phones (below 640px) are the exception: there the panel takes the active state's own height, since a rate-limited answer otherwise left 130 to 200px of blank panel above step 4.
- **Static / no JS:** "From GitHub Releases", with "Releases on GitHub" (primary) and "Build from source" (secondary). Without JavaScript the line reads "Releases, their files and checksums are on GitHub.", which claims no release.
- **Loading:** the static text reads "Checking GitHub for the latest release…", at the same panel height as every answer.
- **Ready:** the download button, the github.com destination in mono under it, then a label-size line for visitors who skip steps 1 and 2: "Needs OBS 32.2.x. knobs runs OBS’s built-in audio filters, not VST filters or NVIDIA noise removal. Known limits ↗". The period after the version keeps the two sentences apart for screen readers. Then the date with a "Pre-release" tag when it applies, release notes, then a links row: the portable zip with its size and the download icon, "Checksums" with a chevron, all releases. "Checksums" is a button (`aria-expanded`) that opens the file list under the links and closes it again (see File List); arriving at `#files` opens it too. Below 640px the date and release notes become the first row of a ruled list, and the three links its other rows, label left and icon right; the open file list follows the last row.
- **None:** "No release yet", "Watch for releases" (primary) and "Build from source" (secondary), then a label-size hint: "With a GitHub account: Watch › Custom › Releases. Without one, add the releases feed to a feed reader.", the feed linking to `releases.atom`.
- **Error:** "Couldn't check for a release", the reason, "Releases on GitHub" (primary) and "Try again" (secondary). When GitHub's rate limit was hit, "Try again" is left out, since asking again can't work until the limit resets, and the page keeps that answer until then (between 30 seconds and 15 minutes) so a reload doesn’t ask again.
- The arriving state settles in (opacity and a 4px rise, 320ms).
- **Not on Windows:** each state carries a quiet label-size note (Graphite 3, balanced lines, "Windows 64-bit PC." never split), before its first action and never moving it. In ready it sits directly under the download button, above the github.com line: "This is the installer for a Windows 64-bit PC. knobs doesn’t run on phones or macOS." ("the portable zip" or "Its files are" when the button gets something else). None: "Both will be for a Windows 64-bit PC." Error: "The files there are for a Windows 64-bit PC." Loading: "knobs is for a Windows 64-bit PC. It doesn’t run on phones or macOS." On the horizontal path (1024px and up) the note sits just under the panel instead.

### Voice Trace (decoration)
- One spoken phrase, drawn as a single 1px line in Hairline Strong through the peak and trough of each 4px slice of the recording, 14px from the zero line at the loudest peak. It is the recording's own outline, generated from the WAV, never drawn by hand.
- Its zero line is the seam under the first screen, centred on the next section's rule, so the trace reads as that rule picking up a voice. Quiet stretches aren't drawn, and the rule shows through them. It starts at the content's left edge.
- It lives in the band's bottom padding and the top of the next section, never behind the headline or the download. At its tightest (1024px wide, with the non-Windows note under the panel) it clears the nearest text by about 12px. It is positioned out of the flow, so it never moves the download.
- One unit is one pixel and it is never squeezed. A narrower column shows the start of the phrase, and a stretch of sound that would cross the column's edge isn't drawn (each path carries its right edge as `--end`, and its stroke width drops to 0 when the column is narrower), so the line always stops in a pause, never mid-word. Phones show the first three words.
- No fill, gradient, glow or motion. Inline SVG, `aria-hidden`, its stroke the Hairline Strong token so dark mode follows; hidden in forced colours.
- **Placeholder recording.** The current trace is macOS `say` reading the headline. The voice recording from knobs's bit-identical tests replaces it; that recording needs real pauses (quiet below the floor, 0.6px at this scale), or the phrase draws as one stretch and narrow columns show none of it.

**The One Decoration Rule.** The voice trace is the page's only decoration: a real recording's outline at 1px in Hairline Strong, static, at the seam under the first screen. Never a drawn, repeating or animated wave, never a second decoration, and never anything behind the headline or the download.

### File List (in the station)
- Opened by the station's "Checksums" and closed by it again. It sits under the ready state's links, after a Hairline, inside the station: no border, fill or lift of its own, so it never reads as a card in a card. Each file is a row, rows divided by Hairlines, 16px apart.
- Each row: the file kind in 600 at UI Small, with a "Recommended" tag on the main file (the installer, or the portable zip when there's no installer) only when the release has another copy of knobs to choose from; then the file name in Plex Mono as a link to the file on github.com, with the download icon, and its size after a dot. The size keeps its dot when it wraps under a long name.
- **SHA-256:** a label row ("SHA-256" at Label size in Graphite 3, its Copy button at the right), then the hash in a Sunken well (Hairline border, 8px radius, 8px by 10px), Plex Mono at Label size, in even rows of 32 (16 where the list is narrower than 17.5em, a container query).
- **PowerShell check:** a label row ("Run this in PowerShell. It prints True if the file matches.", balanced, with its own Copy), then the command in the same well: `(Get-FileHash "$HOME\Downloads\<file>" -Algorithm SHA256).Hash -eq '<sha>'`, which prints True or False and ignores case. A wrap never splits an option from its dash, and the hash runs on from `-eq` as a terminal would wrap it.
- A file with no SHA-256 on GitHub keeps only the command, without the comparison, and the label asks the visitor to compare by hand (pointing to the checksums file when the release has one). The checksums file's row keeps only its kind and name. A release with only a portable zip lists the zip, untagged, and the checksums file.

### Panels under the path
- "New to OBS?" in step 2 opens "New to OBS? Set up the mic in six steps" (`#new-to-obs`), and every "Build from source" opens "Build it from source" (`#build`). Both are disclosures that sit under the four steps, inside the first screen's band, in the columns of steps 2 and 3 on the horizontal path and indented to the step text on the vertical one. Their text is capped at the measure.
- A closed panel takes no room. The opener opens its panel and jumps to it, and works again on a second click; arriving at `#build` or `#new-to-obs` opens the panel and scrolls to it. Closing a panel from its own summary hides it and returns focus to the link or button that opens it. Without JavaScript both show as closed rows, which open on their own.
- "Build it from source" hides once a release exists. On the horizontal path, for visitors not on Windows, the first open panel starts below the note that hangs under the station.

### Ruled Tables
- No outer border, no fills, no zebra. Rows ruled with Hairline; the header rule in Hairline Strong. Headers in Label size, weight 500, Graphite 3. Row headers in ink 600. Numbers right-aligned in tabular figures.
- **Stacked:** where a table's column is too narrow for its columns (the Same sound readout below a 20em column), each row becomes a block: the row header, then its value under it. A Hairline Strong rule opens the list and a Hairline closes each block. The header row stays for screen readers, visually hidden. The table carries explicit table roles, so it stays a table to screen readers once its display changes.
- **Ruled rows:** How it works' facts and Measured's measurements sit on the section's own grid, the term or claim in the 20rem head column and its text or evidence in the body, 64px apart, each row between Hairlines (one above the first). Below 1024px each row stacks.

### Signal Path
- One 1px wire in Graphite 3 through the four stages: your mic, OBS's filters run by knobs, the virtual cable, and the apps. Each stage has an 11px node on the wire (a Graphite 3 ring on Paper) with its name (600) and its note (UI Small, Graphite 3) under it, and each stretch of wire ends in a 7px open arrowhead at the next stage. Full content width, columns 1 : 1.6 : 1 : 1, 40px apart.
- **The knobs stage** is the one panel: Surface, an ink border, 12px radius, the lift, 22px 20px 20px padding. The wire meets its top border, which its inked node breaks 20px in, as the rail meets the station on the first screen.
- **The chain:** inside it, the four-filter chain from the measurements (3-Band Equalizer, Expander, Compressor, Limiter, in the order the measurement names them), in a Paper Subtle list with a Hairline border, 8px radius and Hairline rows, UI Small in ink. A 1px Graphite 3 wire runs down its left with a 5px ink dot for each filter. The caption says it is the measured chain: "The signal path, shown with the four-filter chain measured below."
- **Below 900px** the path turns vertical, at most 30rem wide: the wire runs down the left, each node level with its stage name's first line at any text size (0.7rem down), the arrowheads point down, and the knobs panel indents 28px to the stage text with its node on the wire, like the station on the vertical path.
- No motion. In forced colours the inked node and the chain's dots take CanvasText.

### Measurement Charts
- Each measurement keeps a structure screen readers read as data, and CSS draws it: a table, or a list of terms. No hover layer: every value is printed beside its mark.
- **Exact-match readout (Same sound):** a ruled table with one row per input the claim covers (test signals, a chain of every audio filter in `obs-filters`, a recording of real voice), each reading "Bit-identical" in ink 600 after a 1em check stroke, right-aligned, under the headers "Input" and "knobs against OBS". It restates the measured result and draws no waveform, count or percentage.
- **Bars:** horizontal, on linear scales from zero. knobs is Ink and OBS Graphite 3, told apart by tone, never by hue, and always also by the legend or the row names, the fixed order (knobs first) and the value labels. Bars are 10px (12px for the delay), square at the baseline and 4px round at the data end, with the value 10px after the tip. Each bar's length is set inline as `--f`, its share of the scale, beside the printed value, and the scale leaves `5.25rem` at its end for the longest label, so a label never leaves the chart.
- **Same delay:** knobs's and OBS's bars on one 0 to 100 ms scale, so 88.1 and 87.7 ms land together. Hairline gridlines every 25 ms (the zero line Hairline Strong), Label-size tick labels, and the names left of the bars (knobs in ink 600). A value label masks any gridline it crosses.
- **A fraction of the footprint:** the table itself, set as four small charts. Its header row is the legend (14 by 10px bar-stub swatches); each body row is a measure, its name left (above on narrow charts) and knobs's bar over OBS's on a Hairline Strong baseline. Each measure has its own scale, from zero to OBS's value, and the caption says so. A range (threads, 7–9 and 90–98) draws its low end solid and the rest at 32% opacity. knobs's GPU, "None", is a bar of zero length, its label on the baseline.
- **The one-PC note** is each chart's caption, at Label size under it, wherever the numbers appear.
- **Validated:** the dataviz palette check passes Ink against Graphite 3 on separation (worst ΔE 32 light, 28.6 dark) and contrast (3:1 or more in both modes). Its lightness-band and chroma checks fail by design, because identity here is tone plus labels, not hue.
- **The sweep (the only motion in these sections):** the first time a chart comes into view (its top past 85% of the window's height), one clip-path sweep draws its bars and their labels from zero in 720ms on the standard curve, at the same pace on every line. knobs's short bars are drawn almost at once while OBS's keep going, and the two delay bars land together; the scale, legend and names are there first. It runs once per chart and page view. Only charts still below the fold when the page loads wait for it; with reduced motion, without IntersectionObserver or JavaScript, and in print, the bars are simply there.
- **Forced colours:** knobs's bars take CanvasText and OBS's GrayText.

### Notes and Containers
- **Disclosure:** a Surface box with a strong hairline and 12px radius; the summary row is 600 with a chevron, hover fills Paper Subtle, and the body opens with the settle motion (160ms).
- **Code block:** a Sunken well with a Hairline border, 8px radius, Label-size mono at line height 1.6. The copy button has a column of its own at the top right (under the commands, at the right, on phones), so no command ever runs under it. Each command is its own line and wraps only between its words and after a URL's slashes, never inside an option, continuing under a 2ch hanging indent. A word too long for the column scrolls inside it. Copy copies the plain commands, one per line.
- **Copy button:** 30px tall (44px on touch), 6px radius, outlined, Graphite 2 text. On success it turns Signal Green and swaps its icon to a check for 1.8 seconds; when the clipboard is blocked it selects the text, reads "Press Ctrl+C", and says so to screen readers. Each copy button in the file list names its file to screen readers ("Copy the SHA-256 of knobs-0.1.0-setup-x64.exe").

### Navigation
- **Skip links:** "Skip to content" (`#main`) and "Skip to download" (`#step-3`, the station), the first two Tab stops, each shown at the top left only while focused (an ink pill, 600). After "Skip to download", the next Tab reaches the active state's main action. The bracket's "Start from step 3" and the footer's "Download" go to the station too.
- **Lockup:** `site/brand/knobs-lockup-horizontal-dark.svg` and `-light.svg`, a site variant of the masters in the knobs repository's `assets/`, changed together. The knob is untouched. The outlined wordmark is scaled uniformly to 1.27 times the master's size, with its x-height still centred on the knob (y 76.7 of the 152-unit height), and its first stem starts 46.9 units past the knob's widest point (the skirt) instead of 33. The viewBox is 608 by 152, so the lockup is exactly 144 by 36px in the header and 128 by 32px on phones and in the footer. The app icon and favicon are the masters, unchanged.
- **Header:** 64px on Paper Subtle with a hairline under it; the lockup at 36px tall (144px wide) on the left; section links (How it works, Measured; UI Small, Graphite 2, 6px-radius hover fill on Surface Sunken) and the "Source" link on the right. Below 720px the section links take a 44px row of their own under the lockup and "Source", so every section stays one tap away on a phone.
- **Footer:** Paper Subtle; the lockup at 32px tall (128px wide) with a one-line description (the headline, "Your OBS mic chain, outside of OBS."), two link columns grouped by destination ("On GitHub", every link with the external arrow; "On this page", the in-page jumps: Download, How it works, Measured), then a hairline and the license and independence lines at Label size.

### Preview Strip
- A thin full-width band above the header (Paper ground, hairline below, Label size) with an amber info icon: "Preview. This release data is made up." It appears only when made-up release data is shown, which the page allows only on a local development host. Nothing else on the page uses amber.

## Do's and Don'ts

### Do:
- **Do** put the download inside the bordered station as step 3 of the path, with the destination on github.com shown under the button.
- **Do** use ink for every primary action and the surface-plus-hairline style for every secondary one.
- **Do** set anything copyable or comparable (versions, file names, file sizes, hashes, commands) in Plex Mono, and line numbers up with tabular figures.
- **Do** cap text with the `--measure` token (52ch), never in rem.
- **Do** mark every link that leaves the site with the 12px external arrow.
- **Do** keep every release state the same size (phones excepted, where the panel takes each state's own height, and the open file list, which grows the panel until it closes), and let state changes settle with opacity and a 4px rise on `cubic-bezier(0.2, 0, 0, 1)`: 160ms for feedback, 320ms for structure. Reduced motion makes every change instant: no animation or transition at all, never a 0.01ms duration, which would hold a newly shown state hidden (and unable to take focus) until the next frame.
- **Do** give every new colour role both a light and a `-dark` value.
- **Do** say plainly that knobs isn't affiliated with or endorsed by the OBS Project, in the footer of any page.
- **Do** keep the lockup at 32px tall or more, swapped by colour scheme, with clear space at least the pointer's length.

### Don't:
- **Don't** use brand red outside the logo files.
- **Don't** add gradients, glass or blur to the page. The knob mark's own shading belongs to the logo and is not a pattern to reuse.
- **Don't** use any shadow larger than the one-pixel lift, and don't use hard offset shadows.
- **Don't** put icons in coloured tiles or circles; icons are bare 16px strokes beside text.
- **Don't** add imagery the project doesn’t have: no invented screenshots, illustrations or stock art.
- **Don't** add decoration beyond the voice trace: no background waves, patterns or textures, and no second trace.
- **Don't** load anything from a third party. Fonts, icons and logos are served from the site; the GitHub releases API is the only outside request.
- **Don't** set any page text in Sora or ship its font file; Sora lives only in the outlined logo. Don't add uppercase tracked labels above headings.
- **Don't** animate anything on scroll beyond the measurement charts' one-time sweep.
- **Don't** show the name as anything but lowercase "knobs", even at the start of a sentence or in a heading.
