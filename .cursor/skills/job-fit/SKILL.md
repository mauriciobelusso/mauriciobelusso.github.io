---
name: job-fit
description: >
  Responde se Mauricio Belusso conseguiria fazer o trabalho de uma vaga e se
  tem fit com ela. Use quando ele colar uma descrição de vaga, JD, job
  description, link de vaga, ou perguntar se conseguiria fazer, se daria
  conta, se tem fit, match ou se deve se candidatar. Lê
  locales/pt-BR/resume.json. A resposta é curta. Não usar para reescrever
  o currículo.
---

# Conseguiria fazer, e tem fit?

Responda duas perguntas, nesta ordem:

1. Ele conseguiria fazer o trabalho?
2. O perfil dele tem fit com a vaga?

Responda no idioma da mensagem dele. Curto. Sem tabela e sem lista longa.

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
2. **Preferência** — "preferably", "desejável", "plus", "nice to have". Preferência ausente não impede o trabalho e não tira o fit.
3. **Dia a dia** — "what you'll do" e a stack da empresa. Isso diz em que código ele vai mexer. Só vira trava de capacidade se o obrigatório exigir essa ferramenta, sem aceitar outra. Entra no fit quando é a linguagem em que o trabalho acontece.

Se o obrigatório diz "Go (preferably) and Java, Python or a similar language", Java cumpre o requisito. Go fica como a linguagem do código.

## Conseguiria fazer o trabalho?

Olhe o trabalho, não o cargo.

- **Sim** — o miolo é o que o currículo já mostra: backend, API, sistema distribuído, fila, nuvem, plataforma, mentoria técnica. O que falta é preferência ou ferramenta que o requisito aceita substituir.
- **Sim, aprendendo X** — o miolo é o mesmo, e o dia a dia usa uma ferramenta que não está no currículo. Diga só o nome. Isso não vira "não".
- **Não** — o miolo é outro trabalho: UI como função principal, mobile como função principal, dados ou ML, outra área, ou uma linguagem exigida em produção sem alternativa.

Angular como tag não é especialidade de frontend. Miolo em tela: **Não**. Backend com React no dia a dia: **Sim, aprendendo React**. IA do currículo (Claude, Cursor, Copilot) cobre uso de LLM no trabalho, e não cobre vaga de ML. Não troque ferramenta de fila, CI, nuvem ou banco. Não invente métrica.

Diploma, visto e salário são filtro de papel. Uma frase no fit. Não mudam se ele conseguiria fazer o trabalho.

## Tem fit?

Compare o perfil do currículo com o que a vaga é.

- **Sim** — os obrigatórios batem, o dia a dia é backend, plataforma ou arquitetura, e o nível é Senior, Staff, Principal ou Arquiteto.
- **Parcial** — ele faria o trabalho, e um destes acontece: o nível está um degrau fora, a linguagem do dia a dia não é a do currículo, ou um obrigatório material não está no JSON.
- **Não** — a vaga pede outro perfil.

Staff ou Principal no currículo não vira fit automático com vaga Pleno. Senior com o mesmo tipo de trabalho é fit parcial por causa do nível, não falta de capacidade.

## Resposta

Quatro frases no máximo.

1. **Conseguiria:** Sim, Sim aprendendo X, ou Não. O porquê numa frase.
2. **Fit:** Sim, Parcial ou Não. O porquê numa frase.
3. Filtro de papel, se houver. Se não houver, omita.
