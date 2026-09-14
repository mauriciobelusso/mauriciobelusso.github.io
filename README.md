# mauriciobelusso.github.io

Source code for my personal portfolio and CV, published at
[mauriciobelusso.github.io](https://mauriciobelusso.github.io).

## Resume-as-Code

Curriculum data lives in a single source of truth: [`resume.json`](resume.json).

The static page (`index.html`) loads that file in the browser and renders every
section (hero, highlights, experience, skills, education, languages). Edit
`resume.json` and refresh — no build step.

[`cv.html`](cv.html) is the A4 / print view of the same JSON (Imprimir → Salvar
como PDF). The portfolio hero links to `cv.html?print=1` to open the native
print dialog.

Schema outline:

- `personal` — name, title, summary, availability, restricted contact copy, contacts, languages
- `highlights` — measurable impact cards
- `experience` — roles, achievements, stack tags
- `skills` — skill groups
- `education` — academic background

## Local preview

Because the page fetches `resume.json`, open it over HTTP (not `file://`):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## GitHub Pages

Configure GitHub Pages to deploy from the **branch** containing this repository
and the repository **root** (`/`) as the folder. The root `index.html` is served
directly; `.nojekyll` prevents Jekyll processing. `resume.json` is served as a
static asset next to the page.

## License

The site content (résumé text and personal information) belongs to Mauricio
Belusso. See [LICENSE](LICENSE) for licensing details.

## Contact

- [GitHub](https://github.com/mauriciobelusso)
- [LinkedIn](https://www.linkedin.com/in/mauriciobelusso)
