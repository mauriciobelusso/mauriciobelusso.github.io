# mauriciobelusso.github.io

Source code for my personal portfolio and CV, published at
[mauriciobelusso.dev](https://mauriciobelusso.dev).

## Resume-as-Code

Curriculum data lives in one JSON file per language, under [`locales/`](locales/):

- [`locales/pt-BR/resume.json`](locales/pt-BR/resume.json)
- [`locales/en/resume.json`](locales/en/resume.json)
- [`locales/es/resume.json`](locales/es/resume.json)
- [`locales/fr/resume.json`](locales/fr/resume.json)

The static page (`index.html`) loads the matching file in the browser and renders
every section (hero, highlights, experience, skills, education, languages) plus
chrome copy (`ui`). Switch languages with the PT / EN / ES / FR selector — no
build step.

[`cv.html`](cv.html) is the A4 / print view of the same JSON (Imprimir → Salvar
como PDF). The portfolio hero links to `cv.html?lang=<current>&print=1` so the
downloaded résumé matches the page language.

Language is resolved in this order: `?lang=` in the URL, then `localStorage`,
then the browser locale, then `pt-BR`.

Schema outline:

- `meta` — language code
- `ui` — navigation, section titles, CTAs, and CV labels
- `personal` — name, title, summary, availability, restricted contact copy, contacts, languages
- `highlights` — measurable impact cards
- `experience` — roles, achievements, stack tags
- `skills` — skill groups
- `education` — academic background

## Local preview

Because the page fetches JSON from `locales/`, open it over HTTP (not `file://`):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
# or http://localhost:8080/?lang=en
```

## GitHub Pages

Configure GitHub Pages to deploy from the **branch** containing this repository
and the repository **root** (`/`) as the folder. The root `index.html` is served
directly; `.nojekyll` prevents Jekyll processing. Locale files under `locales/`
are served as static assets next to the page.

## License

The site content (résumé text and personal information) belongs to Mauricio
Belusso. See [LICENSE](LICENSE) for licensing details.

## Contact

- [GitHub](https://github.com/mauriciobelusso)
- [LinkedIn](https://www.linkedin.com/in/mauriciobelusso)
