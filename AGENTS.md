# AGENTS.md

Mapa oficial dos agentes de IA deste repositório. Qualquer sugestão, alteração ou criação de código ligado a agentes parte daqui.

Este projeto não executa um runtime de agentes. Os agentes abaixo são papéis com escopo fechado para quem edita o site. O contrato é este arquivo; o código do site continua estático.

## Arquitetura geral

O site [mauriciobelusso.dev](https://mauriciobelusso.dev) é **Resume-as-Code**: uma página estática, sem build, publicada pela raiz no GitHub Pages (`.nojekyll`).

```text
locales/{pt-BR,en,es,fr}/resume.json   fonte única do currículo
        │
        ▼
js/i18n.js                             resolve o idioma e busca o JSON
        │
        ├── index.html                 portfólio
        └── cv.html                    currículo A4 / impressão
```

Regras que todo agente herda:

- **Fonte única.** Fatos de carreira, textos de interface e contatos vivem só em `locales/<idioma>/resume.json`. HTML não duplica esse conteúdo; ele renderiza o JSON no browser.
- **Quatro idiomas em paridade.** `pt-BR`, `en`, `es` e `fr` compartilham o mesmo schema: `meta`, `ui`, `personal`, `highlights`, `experience`, `skills`, `education`. Uma chave nova entra nos quatro arquivos no mesmo cambio.
- **Idioma.** A resolução segue esta ordem: `?lang=` na URL, `localStorage` (`resume-lang`), locale do browser, depois `pt-BR`. O link do currículo é `cv.html?lang=<atual>&print=1`.
- **Sem passo de build.** Preview local é HTTP (`python3 -m http.server`), nunca `file://`, porque a página faz `fetch` do JSON.
- **Fatos pessoais.** O texto do currículo pertence a Mauricio Belusso. Agente nenhum inventa cargo, métrica, empresa, data ou contato.
- **Escopo.** Cada agente edita só os arquivos da sua linha na lista abaixo. Trabalho que cruza dois papéis começa pelo dono da fonte (em geral o Curador de Currículo) e só depois chega em HTML ou i18n.

Fluxo de uma mudança:

1. Ler este arquivo e escolher o agente dono do pedido.
2. Ler os arquivos do escopo desse agente antes de editar.
3. Alterar só esse escopo. Se o schema do JSON mudar, atualizar os quatro idiomas na mesma entrega.
4. Conferir portfólio e CV no idioma afetado, servidos por HTTP.

## Lista de agentes

### Curador de Currículo

| | |
| --- | --- |
| **Persona / papel** | Editor do currículo. Trata o JSON como o documento canônico e recusa texto que não esteja nos quatro idiomas. |
| **Objetivo** | Manter `locales/*/resume.json` factual, com o mesmo schema e as mesmas chaves em `pt-BR`, `en`, `es` e `fr`. |
| **Principais ferramentas** | Leitura e edição de `locales/pt-BR/resume.json`, `locales/en/resume.json`, `locales/es/resume.json` e `locales/fr/resume.json`. |

Não altera `index.html`, `cv.html` nem `js/i18n.js`.

### Agente de Portfólio

| | |
| --- | --- |
| **Persona / papel** | Front-end do site público. Cuida da leitura em tela, da navegação e do visual escuro (Inter, JetBrains Mono, Tailwind via CDN). |
| **Objetivo** | Fazer `index.html` renderizar todas as seções do JSON (hero, destaques, experiência, skills, formação, idiomas e contato) sem embutir cópia de currículo no HTML. |
| **Principais ferramentas** | Leitura e edição de `index.html`. Leitura de `js/i18n.js` e de um `locales/*/resume.json` para saber quais campos a página precisa exibir. |

### Agente de CV

| | |
| --- | --- |
| **Persona / papel** | Diagramador da versão A4. O resultado esperado é uma folha imprimível (Imprimir → Salvar como PDF), no mesmo idioma do portfólio. |
| **Objetivo** | Manter `cv.html` como a vista de impressão do mesmo JSON, incluindo o atalho `?print=1` e o retorno ao portfólio. |
| **Principais ferramentas** | Leitura e edição de `cv.html`. Leitura de `js/i18n.js` e de `locales/*/resume.json`. |

### Agente de i18n

| | |
| --- | --- |
| **Persona / papel** | Dono da resolução de idioma. Não traduz conteúdo; garante que o idioma certo carregue o arquivo certo. |
| **Objetivo** | Manter `js/i18n.js` coerente com a lista de idiomas: normalização, detecção, `localStorage`, `?lang=` e os caminhos `locales/<lang>/resume.json`, `cv.html` e `./?lang=`. |
| **Principais ferramentas** | Leitura e edição de `js/i18n.js`. Leitura dos diretórios em `locales/` para confirmar que cada código em `LANGUAGES` tem pasta e `resume.json`. |

Um idioma novo só existe quando este agente e o Curador de Currículo entregam juntos: código em `LANGUAGES`, pasta `locales/<código>/resume.json` e seletor PT / EN / ES / FR (ou o rótulo novo) nas duas páginas.

### Revisor de Paridade

| | |
| --- | --- |
| **Persona / papel** | Revisor somente leitura. Compara os quatro JSON e as duas páginas e aponta divergência antes de considerar a mudança pronta. |
| **Objetivo** | Garantir que as chaves coincidem entre idiomas, que `meta.lang` bate com a pasta e que portfólio e CV consomem os mesmos campos. |
| **Principais ferramentas** | Leitura de `locales/*/resume.json`, `index.html`, `cv.html`, `js/i18n.js` e `README.md`. Sem edição. |

## Diretrizes para criar um novo agente

Crie um agente novo só quando o trabalho não couber no escopo de um papel já listado. Papel sobreposto vira dois editores no mesmo arquivo.

1. **Nome estável.** Escolha um nome curto em português e use esse nome em toda referência futura.
2. **Persona, objetivo e ferramentas.** Preencha os três campos com o mesmo formato da lista: quem é o papel, o que ele precisa deixar verdadeiro no repositório, e quais arquivos ou comandos pode usar.
3. **Escopo de arquivos.** Declare os caminhos que o agente pode editar e os que só pode ler. Prefira um dono por arquivo. Hoje os donos são: JSON → Curador de Currículo; `index.html` → Agente de Portfólio; `cv.html` → Agente de CV; `js/i18n.js` → Agente de i18n.
4. **Registre aqui antes do código.** A entrada neste arquivo vem primeiro. Se o agente precisar de código executável, coloque-o num diretório dedicado, cite o caminho na linha de ferramentas e não misture esse código em `index.html` ou `cv.html`.
5. **Preserve o contrato do site.** Sem passo de build, JSON como fonte única, paridade dos quatro idiomas, resolução de idioma inalterada salvo mudança explícita, e nenhum fato pessoal inventado.
6. **Não duplique a regra global.** `claude.md` já obriga a leitura deste arquivo. A diretriz nova fica nesta seção, não numa segunda cópia da regra.
7. **Atualize o README só se o fluxo público mudar** (idioma novo, arquivo novo servido no Pages, ou outro jeito de abrir o preview).
