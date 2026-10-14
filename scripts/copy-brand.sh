#!/bin/sh
# Copies the brand files the site uses from the knobs-brand submodule into
# site/: the design tokens, the fonts and their licences, the lockups and
# the icons. The deploy runs it before it publishes site/, and so does a
# local preview. The copies aren't committed (.gitignore): the submodule is
# their only source, and moving it to a newer commit updates the site.
#
#   git submodule update --init   # once, after a plain clone
#   sh scripts/copy-brand.sh
#
# It lists the files the pages link, and no more. Add a file here when a
# page starts to use it.
set -eu

cd "$(dirname "$0")/.."
brand=knobs-brand

if [ ! -f "$brand/dist/tokens.css" ]; then
  echo "The knobs-brand submodule is empty. Run: git submodule update --init" >&2
  exit 1
fi

mkdir -p site/brand site/fonts

cp "$brand/dist/tokens.css" site/tokens.css

cp "$brand/fonts/RadioCanada-Regular-Latin1.woff2" \
   "$brand/fonts/RadioCanada-Medium-Latin1.woff2" \
   "$brand/fonts/RadioCanada-SemiBold-Latin1.woff2" \
   "$brand/fonts/RadioCanadaCondensed-Bold-Latin1.woff2" \
   "$brand/fonts/SourceCodePro-Regular.ttf.woff2" \
   "$brand/fonts/OFL-Radio-Canada.txt" \
   "$brand/fonts/OFL-Source-Code-Pro.txt" \
   site/fonts/

cp "$brand/logo/svg/knobs-lockup-horizontal-light.svg" \
   "$brand/logo/svg/knobs-lockup-horizontal-dark.svg" \
   "$brand/logo/svg/knobs-lockup-horizontal-white.svg" \
   "$brand/logo/svg/knobs-lockup-horizontal-black.svg" \
   "$brand/web/favicon.svg" \
   "$brand/web/favicon.ico" \
   "$brand/web/apple-touch-icon.png" \
   "$brand/web/card.png" \
   site/brand/
