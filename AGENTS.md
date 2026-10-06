# AGENTS.md

## Project overview

Blog for Mauricio Belusso, served at https://blog.mauriciobelusso.dev. GitHub Pages builds it with Jekyll and `jekyll-theme-minimal`.

The résumé stays at https://mauriciobelusso.dev. This repository does not render it. Do not add `cv.html`, `locales/`, or a career timeline to the blog.

There is no `.nojekyll`. Adding that file turns Jekyll off and the blog disappears.

Do not invent an employer, date, metric, tool, or credential. A post may explain a mechanism that is already in the posts. It may not add a number, an employer, or a tool that the existing posts do not contain.

| Path | Role |
| --- | --- |
| `_config.yml` | Site title, description, `url`, and `theme: jekyll-theme-minimal`. |
| `index.md` | Blog index. Lists `site.posts`. |
| `_posts/` | Articles. Portuguese. Front matter `title`, `date`, `tags`, `excerpt`. |
| `_layouts/post.html` | Post chrome: back link, date, title, tags. Uses the theme `default` layout. |
| `sobre.md` | About page. No résumé. One link to https://mauriciobelusso.dev. |

`CNAME` is `blog.mauriciobelusso.dev`.

## Setup

```bash
bundle install
bundle exec jekyll serve
```

- Blog: http://localhost:4000/
- About: http://localhost:4000/sobre/
- A post: http://localhost:4000/o-layout-saiu-do-deploy/

## Development workflow

Copy is Markdown in `_posts/`, `index.md`, and `sobre.md`. The chrome comes from `jekyll-theme-minimal`. Do not add a local `_layouts/default.html` unless the change is a copy of the theme layout, as the GitHub Pages theme guide describes.

Posts are articles. Each paragraph continues the previous one. Do not label the site as production notes.

`404.html` has front matter and a permalink. It is a Jekyll page, not a static file.

## Testing

```bash
bundle exec jekyll build
```

After a change, open `/`, `/sobre/`, and one post. Confirm `/cv.html` is absent.

## Build and deployment

GitHub Pages runs Jekyll on the published branch. Plugins in `_config.yml` are limited to the GitHub Pages allowlist: `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`. A push updates https://blog.mauriciobelusso.dev.

`robots.txt` points at `https://blog.mauriciobelusso.dev/sitemap.xml`, which `jekyll-sitemap` generates. `googleb1d6e622437281e5.html` is a Search Console verification file; leave it in place.
