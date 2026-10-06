# mauriciobelusso.github.io

Blog de notas de produção, publicado em [mauriciobelusso.dev](https://mauriciobelusso.dev).
O GitHub Pages gera o site com Jekyll e o tema `jekyll-theme-minimal`.

O currículo A4 continua em [`cv.html`](cv.html), lendo o JSON em [`locales/`](locales/).

## Local

```bash
bundle install
bundle exec jekyll serve
```

- Notas: http://localhost:4000/
- Sobre: http://localhost:4000/sobre/
- Currículo: http://localhost:4000/cv.html

O currículo busca JSON no browser. `file://` não serve.

## O que é página

- [`_posts/`](_posts/) — notas
- [`sobre.md`](sobre.md)
- [`index.md`](index.md) — lista
- [`cv.html`](cv.html) e [`locales/`](locales/) — currículo, fora do layout do blog
