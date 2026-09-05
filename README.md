# mauriciobelusso.github.io

Source code for my personal website and CV, published at
**[mauriciobelusso.github.io](https://mauriciobelusso.github.io)**.

The site is a single-page profile built with [Jekyll](https://jekyllrb.com/)
and the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
theme, and is served for free through [GitHub Pages](https://pages.github.com/).

## Content

- `index.md` — the homepage content (professional summary and experience).
- `_config.yml` — site metadata, author/social links, and theme settings.
- `_data/navigation.yml` — links shown in the site navigation.

## Local development

Requirements: Ruby and [Bundler](https://bundler.io/).

```bash
make install   # bundle install
make serve     # bundle exec jekyll serve --livereload (http://127.0.0.1:4000)
make build     # bundle exec jekyll build -> ./_site
make clean     # remove build/cache artifacts
```

See the `Makefile` for the full list of available commands.

## License

The site content (résumé text and personal information) belongs to
Mauricio Belusso. The underlying theme code is distributed under the MIT
License — see [LICENSE](LICENSE) for details.

## Contact

- [GitHub](https://github.com/mauriciobelusso)
- [LinkedIn](https://www.linkedin.com/in/mauriciobelusso)
