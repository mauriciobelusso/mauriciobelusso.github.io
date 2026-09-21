---
name: job-fit
description: >
  Responde, do ponto de vista de Mauricio Belusso, se ele conseguiria fazer
  o trabalho, se tem fit e se a vaga é interessante. Use quando ele colar uma
  JD, link de vaga, ou perguntar se conseguiria fazer, se tem fit, se daria
  conta ou se deve se candidatar. Inglês dele é B1 ou B2, ainda incerto. Lê
  locales/pt-BR/resume.json. A resposta é curta. Se for interessante, sugira
  /cv-vaga com a descrição completa. Não gere o currículo nesta skill.
---

# Do ponto de vista dele

Responda três coisas, nesta ordem:

1. Ele conseguiria fazer o trabalho?
2. Ele tem fit com a vaga?
3. É interessante?

O trabalho é para pagar as contas. Ele avalia salário acima de desafio, cultura de engenharia e crescimento profissional. Salário maior não cria fit técnico. Desafio, cultura e crescimento não vetam e não são motivo para não avançar.

Entrega sênior de features em startup, CRUD ou ausência de desafio fora do comum não bloqueiam. Se o miolo técnico encosta e a vaga é remota, ela segue.

Responda no idioma da mensagem dele. Curto. Sem tabela e sem lista longa.

## Fonte

1. Leia `locales/pt-BR/resume.json` antes de julgar. Use só fatos de `personal`, `highlights`, `experience`, `skills` e `education`.
2. `en`, `es` e `fr` são traduções.
3. Inglês: B1 ou B2, ele ainda não cravou. O "Proficiência Profissional" do JSON não vale para este julgamento.
4. Não invente salário atual. Se ele disser que a oferta paga mais, use essa comparação. Não complete o resto do currículo com memória nem com a web.
5. Não edite o currículo, não envie e-mail e não se candidate. O currículo direcionado é outra skill, `/cv-vaga`.
6. Duas restrições dele, fora do JSON. Não diga que estão ausentes no currículo. Não escreva as duas no currículo.

- Ele é AuDHD. Não é lacuna técnica e não vira conclusão de cota ou de PcD. Mencione só se a vaga for afirmativa para PcD ou neurodivergência.
- Ele precisa trabalhar remoto. Presencial, híbrido ou modelo não declarado: fit **Não** e interessante **Ainda não**. Isso não muda se ele conseguiria fazer o trabalho.

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

Cargo Senior, com o mesmo tipo de trabalho e salário maior, não é falta de capacidade. Não trate o título Staff do currículo como motivo para recusar. Não recuse entrega sênior de features por falta de desafio incomum ou de cultura de engenharia.

## Tem fit?

- **Sim** — os obrigatórios batem, o trabalho é backend, plataforma ou arquitetura, e o inglês alcança o idioma em que a vaga opera.
- **Parcial** — ele faria o trabalho, e um obrigatório material não está no currículo, ou o inglês fica curto para o dia a dia da vaga.
- **Não** — a vaga pede outro perfil, ou não é remota.

Inglês, quando a vaga opera em inglês (descrição, entrevista, produto, time):

- B2: dá para trabalhar, com esforço em entrevista e conversa com produto. Pode ser fit sim.
- B1: fica curto para o dia inteiro em inglês. Fit parcial.
- B1 ou B2, sem cravar: fit parcial. Diga a incerteza. Não use o nível do JSON.

Vaga em português: inglês não entra no fit.

## É interessante?

- **Sim** — ele conseguiria (Sim ou Sim, aprendendo), a vaga é remota e o nível não é estágio nem júnior. Fit parcial não impede: diga o que falta. Se a vaga declara faixa, ou se ele disse que paga mais do que ganha hoje, cite isso. Sem número, diga que a decisão é o salário. Não invente pretensão.
- **Ainda não** — ele não conseguiria, não é remota, ou a remuneração declarada é de estágio, júnior ou não remunerada.

Não use desafio incomum, cultura de engenharia nem crescimento profissional nesta resposta. Não escreva "não avançar" porque a vaga é entrega de features.

## Currículo direcionado

`/cv-vaga` gera um currículo novo a partir da descrição da vaga e devolve um link cifrado. Esta skill não gera esse currículo.

Sugira `/cv-vaga` só quando **Interessante** for sim. Diga para invocar com a descrição completa da vaga. Não resuma a vaga no lugar dela.

Se **Interessante** for ainda não, não sugira. Fit parcial não impede a sugestão.

## Resposta

Cinco frases no máximo.

1. **Conseguiria:** Sim, Sim aprendendo X, ou Não. O porquê numa frase.
2. **Fit:** Sim, Parcial ou Não. O porquê numa frase, com o inglês quando a vaga opera em inglês.
3. **Interessante:** Sim ou Ainda não, numa frase. Com fit parcial, inclua o que falta. Inclua a faixa se a vaga declarar, ou a comparação se ele tiver feito. Sem número, diga que a decisão é o salário.
4. Filtro de papel, se houver.
5. Se for interessante, uma frase: invocar `/cv-vaga` com a descrição completa da vaga.
