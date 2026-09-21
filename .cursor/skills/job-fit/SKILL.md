---
name: job-fit
description: >
  Responde se Mauricio Belusso conseguiria fazer o trabalho de uma vaga.
  Use quando ele colar uma descrição de vaga, JD, job description, link de
  vaga, ou perguntar se conseguiria fazer, se daria conta, se tem fit, match
  ou se deve se candidatar. Lê locales/pt-BR/resume.json. A resposta é curta.
  Não usar para reescrever o currículo nem para julgar se a vaga está à altura dele.
---

# Conseguiria fazer o trabalho?

A pergunta é uma só: ele conseguiria fazer o trabalho dessa vaga?

Responda no idioma da mensagem dele. Curto. Sem tabela, sem lista longa e sem juízo sobre senioridade, cultura ou se a vaga "vale". Isso só entra se ele perguntar.

## Fonte

1. Leia `locales/pt-BR/resume.json` antes de julgar.
2. Use só fatos de `personal`, `highlights`, `experience`, `skills` e `education`.
3. `en`, `es` e `fr` são traduções. Idioma falado está só em `personal.languages`.
4. Não complete o currículo com memória nem com a web. Não edite o currículo, não envie e-mail e não se candidate.

## Entrada

- Texto, arquivo ou URL. Em URL, leia a descrição e ignore menu e rodapé.
- Sem requisitos, diga que falta a descrição e pare.
- Várias vagas: uma resposta por vaga.

## O que a vaga exige

Separe três coisas e não misture:

1. **Obrigatório** — o que está em requisitos, "what we look for" ou equivalente.
2. **Preferência** — "preferably", "desejável", "plus", "nice to have". Preferência ausente no currículo não impede o trabalho.
3. **Dia a dia** — "what you'll do" e a stack da empresa. Isso diz em que código ele vai mexer. Só vira trava se o requisito obrigatório exigir essa ferramenta, sem aceitar outra.

Se o obrigatório diz "Go (preferably) and Java, Python or a similar language", Java cumpre o requisito. Go fica como a linguagem do código, não como mandatório.

## Como julgar

Olhe o trabalho, não o cargo.

- **Sim** — o miolo do trabalho é o que o currículo já mostra (backend, API, sistema distribuído, fila, nuvem, plataforma, mentoria técnica), e o que falta é preferência ou ferramenta que o requisito aceita substituir.
- **Sim, aprendendo X** — o miolo é o mesmo, e o dia a dia usa uma ferramenta que não está no currículo. Diga só o nome do que ele aprenderia. Não transforme isso em "não".
- **Não** — o miolo é outro trabalho: UI como função principal, mobile como função principal, dados ou ML, outra área, ou uma linguagem que o requisito exige em produção e não aceita alternativa.

Regras:

- Ferramenta ausente no JSON não significa que ele não consegue fazer um trabalho da mesma família.
- Angular como tag não é especialidade de frontend. Se o miolo for tela, o veredito é **Não**. Se for backend e React aparecer no dia a dia, é **Sim, aprendendo React**.
- IA do currículo (Claude, Cursor, Copilot) cobre requisito de usar LLM no trabalho. Não cobre vaga de ML.
- Não troque ferramenta de fila, CI, nuvem ou banco. Diga a que está no JSON e a que a vaga pede.
- Diploma, visto e salário são filtro de papel. Uma frase, separada. Não mudam o veredito sobre o trabalho.
- Não invente métrica.

## Resposta

Duas ou três frases.

1. **Sim**, **Sim, aprendendo X** ou **Não**, e o porquê numa frase.
2. O que ele já faz que é o trabalho.
3. Se houver filtro de papel (diploma, idioma, local), uma frase. Se não houver, omita.
