# knobs-site

The source of [getknobs.app](https://getknobs.app/), the download page for [knobs](https://github.com/danielalyoshin/knobs): a Windows tray app that runs the mic filter chain you tuned in OBS Studio and sends it to a virtual audio cable.

knobs is an independent project. It isn't affiliated with or endorsed by the OBS Project.

## How the site works

- It's one page of plain HTML, CSS and JavaScript in `site/`, with no build step and no dependencies.
- The page reads the latest release from GitHub's public REST API in the visitor's browser, and links every download to the file on the knobs repository's [GitHub Releases](https://github.com/danielalyoshin/knobs/releases), with its SHA-256. The site hosts no binaries and makes no other outside request.
- A GitHub Actions workflow (`.github/workflows/pages.yml`) publishes only `site/` to GitHub Pages on every push to `main` that changes it.

## Run it locally

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory site
```

Then open http://127.0.0.1:8000/. On a local host, add `?preview=ready`, `?preview=error`, `?preview=offline` or `?preview=loading` to see each release state with made-up data; the page says so in a strip at the top. Preview never works on the real domain.

## Design and product notes

- [PRODUCT.md](PRODUCT.md): who the site is for, what it must say, and the decisions behind it.
- [DESIGN.md](DESIGN.md): the design system the page is built on, from colours and type to every component.

## License

The site is licensed under [GPL-2.0-or-later](LICENSE), the same as knobs. Two folders are not:

- `site/fonts/`: IBM Plex, under the SIL Open Font License (`site/fonts/OFL-IBM-Plex.txt`).
- `site/brand/`: the knobs logo files, all rights reserved apart from the knobs repository's [TRADEMARKS.md](https://github.com/danielalyoshin/knobs/blob/main/TRADEMARKS.md) (`site/brand/LICENSE`).

## Contributing

Issues and pull requests are welcome. Issues about knobs itself belong in the [knobs repository](https://github.com/danielalyoshin/knobs/issues). Commits follow [Conventional Commits](https://www.conventionalcommits.org/).
