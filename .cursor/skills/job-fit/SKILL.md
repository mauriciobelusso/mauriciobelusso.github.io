---
name: job-fit
description: >
  Responde, do ponto de vista de Mauricio Belusso, se ele conseguiria fazer
  o trabalho, se tem fit e se a vaga é interessante. Use quando ele colar uma
  JD, link de vaga, ou perguntar se conseguiria fazer, se tem fit, se daria
  conta ou se deve se candidatar. Inglês dele é B1 ou B2, ainda incerto. Lê
  locales/pt-BR/resume.json. A resposta é curta. Não usar para reescrever o currículo.
---

# Do ponto de vista dele

Responda três coisas, nesta ordem:

1. Ele conseguiria fazer o trabalho?
2. Ele tem fit com a vaga?
3. É interessante?

Interessante só se as duas primeiras forem sim. Salário maior não cria fit. Fit parcial não vira interessante.

Responda no idioma da mensagem dele. Curto. Sem tabela e sem lista longa.

## Fonte

1. Leia `locales/pt-BR/resume.json` antes de julgar. Use só fatos de `personal`, `highlights`, `experience`, `skills` e `education`.
2. `en`, `es` e `fr` são traduções.
3. Inglês: B1 ou B2, ele ainda não cravou. O "Proficiência Profissional" do JSON não vale para este julgamento.
4. Não invente salário atual. Se ele disser que a oferta paga mais, use essa comparação. Não complete o resto do currículo com memória nem com a web.
5. Não edite o currículo, não envie e-mail e não se candidate.

## Entrada

- Texto, arquivo ou URL. Em URL, leia a descrição e ignore menu e rodapé.
- Sem requisitos, diga que falta a descrição e pare.
- Várias vagas: uma resposta por vaga.

## O que a vaga exige

1. **Obrigatório** — requisitos, "what we look for" ou equivalente.
2. **Preferência** — "preferably", "desejável", "plus", "nice to have". Preferência ausente não impede o trabalho e não tira o fit.
3. **Dia a dia** — "what you'll do" e a stack da empresa. Só vira trava de capacidade se o obrigatório exigir essa ferramenta, sem aceitar outra.

Se o obrigatório diz "Go (preferably) and Java, Python or a similar language", Java cumpre o requisito. Go é a linguagem do código.

## Conseguiria fazer o trabalho?

- **Sim** — o miolo já está no currículo: backend, API, sistema distribuído, fila, nuvem, plataforma, mentoria técnica. O que falta é preferência ou ferramenta que o requisito aceita substituir.
- **Sim, aprendendo X** — o miolo é o mesmo, e o dia a dia usa uma ferramenta que não está no currículo. Diga só o nome.
- **Não** — o miolo é outro trabalho: UI como função principal, mobile como função principal, dados ou ML, outra área, ou uma linguagem exigida em produção sem alternativa.

Angular como tag não é especialidade de frontend. Miolo em tela: **Não**. Backend com React no dia a dia: **Sim, aprendendo React**. IA do currículo (Claude, Cursor, Copilot) cobre uso de LLM no trabalho, e não cobre vaga de ML. Não troque ferramenta de fila, CI, nuvem ou banco. Não invente métrica.

Diploma é filtro de papel. Uma frase. Não muda se ele conseguiria fazer o trabalho.

Cargo Senior, com o mesmo tipo de trabalho e salário maior, não é falta de capacidade. Não trate o título Staff do currículo como motivo para recusar.

## Tem fit?

- **Sim** — os obrigatórios batem, o trabalho é backend, plataforma ou arquitetura, e o inglês alcança o idioma em que a vaga opera.
- **Parcial** — ele faria o trabalho, e um obrigatório material não está no currículo, ou o inglês fica curto para o dia a dia da vaga.
- **Não** — a vaga pede outro perfil.

Inglês, quando a vaga opera em inglês (descrição, entrevista, produto, time):

- B2: dá para trabalhar, com esforço em entrevista e conversa com produto. Pode ser fit sim.
- B1: fica curto para o dia inteiro em inglês. Fit parcial.
- B1 ou B2, sem cravar: fit parcial. Diga a incerteza. Não use o nível do JSON.

Vaga em português: inglês não entra no fit.

## É interessante?

- **Sim** — conseguiria e tem fit. Se ele disse que paga mais do que ganha hoje, diga isso numa frase.
- **Ainda não** — fit parcial ou sem fit. Se o salário é maior, diga que o dinheiro interessaria se o fit fechasse, e diga o que falta.

## Resposta

Cinco frases no máximo.

1. **Conseguiria:** Sim, Sim aprendendo X, ou Não. O porquê numa frase.
2. **Fit:** Sim, Parcial ou Não. O porquê numa frase, com o inglês quando a vaga opera em inglês.
3. **Interessante:** Sim ou Ainda não. O salário só entra aqui, se ele tiver comparado com o que ganha hoje.
4. Filtro de papel, se houver.
