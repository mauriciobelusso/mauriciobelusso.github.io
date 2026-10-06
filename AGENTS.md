# AGENTS.md

## Project overview

Public site for Mauricio Belusso at https://mauriciobelusso.dev. GitHub Pages builds it with Jekyll. The homepage is a production-notes blog. The printable résumé stays at `cv.html` and reads `locales/<lang>/resume.json`.

There is no `.nojekyll`. Adding that file turns Jekyll off and the blog disappears.

Career facts live in `locales/pt-BR/resume.json`. `en`, `es`, and `fr` are translations and must keep the same keys, array lengths, and nesting. Do not invent an employer, date, metric, tool, or credential that is not already in that JSON. A post may explain a public mechanism behind a fact the résumé already states. It may not add a number, an employer, or a tool the JSON does not contain.

| Path | Role |
| --- | --- |
| `_config.yml` | `theme: jekyll-theme-minimal`, the supported GitHub Pages theme. |
| `index.md` | Blog index. Lists `site.posts`. |
| `_posts/` | Notes. Portuguese. Front matter `title`, `date`, `excerpt`. Layout `post`, which the theme provides. |
| `sobre.md` | About page. Layout `default`. |
| `cv.html` | A4 / print résumé. Static file, no Jekyll front matter. |
| `js/i18n.js` | Language, fetch, switcher, CV links for `cv.html`. |
| `js/diagrams.js` | SVG diagrams on the résumé only. |
| `locales/<lang>/resume.json` | Résumé copy and facts. |
| `scripts/seal-cv.mjs` | Encrypts a job-specific résumé into `v/<id>.json`. Not part of the blog. |

`CNAME` is `mauriciobelusso.dev`.

## Setup

```bash
bundle install
bundle exec jekyll serve
```

- Notes: http://localhost:4000/
- About: http://localhost:4000/sobre/
- Résumé: http://localhost:4000/cv.html

Node.js is required only for `scripts/seal-cv.mjs` and its test. There is no `package.json`.

## Development workflow

Blog copy is Markdown in `_posts/` and `sobre.md`. The chrome comes from `jekyll-theme-minimal`. Do not add a local `_layouts/default.html` unless the change is a copy of the theme layout, as the GitHub Pages theme guide describes. Do not put résumé facts in a layout.

A new visible résumé field still needs the four locale files (same shape) and the renderer in `cv.html`. The blog does not render `resume.json`.

`cv.html` has no YAML front matter. Jekyll must copy it unchanged. Do not add `---` at the top.

The résumé back link points at `/`. Its label is `ui.cvBack` in each locale.

Language resolution for the résumé, in `js/i18n.js`: `?lang=` in the URL, then `localStorage` key `resume-lang`, then `navigator.languages`, then `pt-BR`.

## Testing

```bash
bundle exec jekyll build
node --test scripts/seal-cv.test.mjs
```

After a blog change, open `/`, one post, and `/sobre/`. After a résumé change, open `cv.html` and `cv.html?lang=pt-BR&print=1`. A sealed link without the fragment shows `Link inválido ou incompleto.` and does not render the public résumé.

## Targeted résumé

A job-specific résumé is ciphertext. Generate it with `scripts/seal-cv.mjs`.

Public file `v/<id>.json` is `{ "v": 1, "iv", "ct" }`. The key stays in the URL fragment and in gitignored `v/index.private.json`. Commit only `v/<id>.json`. The key must not appear in the file, the diff, the commit message, or the PR.

## Build and deployment

GitHub Pages runs Jekyll on the published branch. Plugins in `_config.yml` are limited to the GitHub Pages allowlist: `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`. A push updates https://mauriciobelusso.dev, including `locales/` and `v/<id>.json`.

`robots.txt` points at `https://mauriciobelusso.dev/sitemap.xml`, which `jekyll-sitemap` generates. `googleb1d6e622437281e5.html` is a Search Console verification file.
