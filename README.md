# mauriciobelusso.github.io

Source code for my personal portfolio and CV, published at [mauriciobelusso.github.io](https://mauriciobelusso.github.io).

## 🚀 Arquitetura Resume-as-Code

Este repositório adota a abordagem **Resume-as-Code**, em que todos os dados do currículo são mantidos em uma única fonte de verdade (`resume.json`), permitindo geração automatizada de PDF via CI/CD e personalização sob medida por Inteligência Artificial.

### 1. Single Source of Truth (`resume.json`)
- Toda a estrutura do currículo (dados pessoais, destaques FinOps/escalabilidade, histórico profissional completo, stack e formação) está declarada e tipada em `resume.json` na raiz do projeto.
- Serve como API estática pública e entrada para automações e integrações.

### 2. Geração Automática de PDF (GitHub Actions + Playwright)
- O workflow `.github/workflows/generate-pdf.yml` é executado a cada push para a branch `main`.
- Inicia um container headless com Playwright (`mcr.microsoft.com/playwright`) para renderizar a página e exportar o arquivo `curriculo-mauricio-belusso.pdf`.
- O PDF gerado é automaticamente commitado de volta no repositório (`[skip ci]`).
- Para testar localmente:
  ```bash
  npm install
  npm run render-pdf
  ```

### 3. Backend para Personalização por IA (Vercel API Route)
- Rota Serverless em `api/generate-cv.js` (compatível com a plataforma Vercel).
- Recebe requisições `POST` com `{ "jobDescription": "<texto da vaga>" }`.
- Lê o `resume.json` base e utiliza a API da OpenAI (GPT) com respostas estruturadas em JSON (`response_format: { type: "json_object" }`) para reordenar, priorizar e adequar o currículo aos requisitos da vaga sem criar dados fictícios.
- **Variáveis de Ambiente Necessárias:**
  - `OPENAI_API_KEY`: Chave de API da OpenAI.
  - `OPENAI_MODEL` (opcional): Modelo OpenAI a ser utilizado (padrão: `gpt-4o-mini`).

### 4. Gerador de CV no Site (`index.html`)
- Botão discreto no rodapé ("⚡ Gerar CV sob medida (IA)") abre o modal Admin.
- Permite colar a Job Description, enviar para a API `/api/generate-cv`, visualizar o preview em JSON, baixar o JSON resultante e aplicar as alterações dinamicamente na interface para visualização e impressão.

## 📄 GitHub Pages

O site estático é servido via GitHub Pages a partir da raiz `/`. O arquivo `.nojekyll` garante a entrega direta do `index.html`.

## 📜 Licença & Contato

- **Licença:** Os textos e dados do currículo são de propriedade de Mauricio Belusso. Consulte [LICENSE](LICENSE).
- **GitHub:** [github.com/mauriciobelusso](https://github.com/mauriciobelusso)
- **LinkedIn:** [linkedin.com/in/mauriciobelusso](https://www.linkedin.com/in/mauriciobelusso)

