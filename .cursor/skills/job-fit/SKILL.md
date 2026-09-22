---
name: job-fit
description: >
  Responde se Mauricio Belusso está dentro de uma vaga. Use quando ele colar
  uma JD, link de vaga, ou perguntar se conseguiria fazer, se tem fit, se
  daria conta ou se deve se candidatar. Ele está dentro quando consegue
  entregar, a vaga é remota e o salário atinge. Inglês dele é B1 ou B2,
  ainda incerto. Lê locales/pt-BR/resume.json. A resposta indica o que ele
  atende e o que falta. Não use "fora da barra". Se estiver dentro e faltar
  habilidade, pergunte na mesma conversa em qual experiência ela entra e onde.
  Não gere o currículo nesta skill.
---

# Dentro da vaga

Ele está **dentro** quando as três são verdade:

1. Consegue entregar o trabalho.
2. A vaga é remota.
3. O salário atinge.

Salário e remoto decidem se a vaga serve. Entrega sênior de features, CRUD, problema comum, ausência de desafio fora do comum e cultura de engenharia não tiram ele de dentro. Se o miolo for outro tipo de trabalho, aí ele não entrega.

Não use "fora da barra", "não avançar" nem `personal.contactBody` ou `personal.availability` como motivo. Esses textos do site não entram no julgamento.

Se ele atende, diga que atende. Se falta algo, indique o que falta. Sem tabela e sem lista longa.

Responda no idioma da mensagem dele.

## Fonte

1. Leia `locales/pt-BR/resume.json` antes de julgar. Use só fatos de `personal`, `highlights`, `experience`, `skills` e `education`.
2. `en`, `es` e `fr` são traduções.
3. Inglês: B1 ou B2, ele ainda não cravou. O "Proficiência Profissional" do JSON não vale para este julgamento.
4. Não invente salário atual nem o valor da oferta. Se a vaga que ele enviou não declara salário, o salário possivelmente é maior do que o de hoje. Se ele disser que a oferta paga mais ou menos, use essa comparação. Não complete o resto do currículo com memória nem com a web.
5. Não edite o currículo, não envie e-mail e não se candidate. O currículo direcionado é outra skill, `/cv-vaga`.
6. Duas restrições dele, fora do JSON. Não diga que estão ausentes no currículo. Não escreva as duas no currículo.

- Ele é AuDHD. Não é lacuna técnica e não vira conclusão de cota ou de PcD. Mencione só se a vaga for afirmativa para PcD ou neurodivergência.
- Ele precisa trabalhar remoto. Presencial, híbrido ou modelo não declarado: ele não está dentro. Isso não muda se ele conseguiria entregar.

## Entrada

- Texto, arquivo ou URL. Em URL, leia a descrição e ignore menu e rodapé.
- Sem requisitos, diga que falta a descrição e pare.
- Várias vagas: uma resposta por vaga.

## O que a vaga exige

1. **Obrigatório** — requisitos, "what we look for" ou equivalente.
2. **Preferência** — "preferably", "desejável", "plus", "nice to have". Preferência ausente não impede a entrega e não tira ele de dentro. Indique.
3. **Dia a dia** — "what you'll do" e a stack da empresa. Só vira trava de entrega se o obrigatório exigir essa ferramenta, sem aceitar outra.

Se o obrigatório diz "Go (preferably) and Java, Python or a similar language", Java cumpre o requisito. Go é a linguagem do código.

## Consegue entregar?

- **Sim** — o miolo já está no currículo: backend, API, sistema distribuído, fila, nuvem, plataforma, mentoria técnica. O que falta é preferência ou ferramenta que o requisito aceita substituir.
- **Sim, falta X** — o miolo é o mesmo, e o dia a dia usa uma ferramenta que não está no currículo. Diga só o nome.
- **Não** — o miolo é outro trabalho: UI como função principal, mobile como função principal, dados ou ML, outra área, ou uma linguagem exigida em produção sem alternativa.

Angular como tag não é especialidade de frontend. Miolo em tela: **Não**. Backend com React no dia a dia: **Sim, falta React**. IA do currículo (Claude, Cursor, Copilot) cobre uso de LLM no trabalho, e não cobre vaga de ML. Não troque ferramenta de fila, CI, nuvem ou banco. Não invente métrica.

Diploma é filtro de papel. Uma frase. Não muda se ele conseguiria entregar.

Cargo Senior, com o mesmo tipo de trabalho, não é falta de capacidade. Não trate o título Staff do currículo como motivo para ficar de fora. Não recuse entrega sênior de features por falta de desafio incomum ou de cultura de engenharia.

## Remoto

Presencial, híbrido ou modelo não declarado: ele não está dentro. Diga o modelo que a vaga declara.

## Salário

- **Atinge** — a vaga declara faixa, bônus ou participação que não é de estágio, júnior ou não remunerada. Cite o que a vaga declarar. Não invente número.
- **Atinge, sem número** — a vaga que ele enviou não declara salário. Trate como possivelmente maior do que o de hoje. Não deixe a decisão em aberto. Não invente o valor.
- **Não atinge** — a remuneração declarada é de estágio, júnior ou não remunerada. Se ele disser que a oferta paga menos do que ganha hoje, use essa comparação.

Salário maior não cria capacidade. Sem entrega, ele não está dentro.

## Inglês

Vaga em português: inglês não entra.

Vaga que opera em inglês (descrição, entrevista, produto, time): indique que o inglês está em B1 ou B2, ainda incerto. Não use o nível do JSON. A incerteza não tira ele de dentro.

## Currículo direcionado

`/cv-vaga` gera um currículo novo a partir da descrição da vaga e devolve um link cifrado. Esta skill não gera esse currículo.

Se ele estiver **dentro** e faltar habilidade pedida pela vaga, pergunte na mesma conversa, antes de sugerir o comando. Uma pergunta por habilidade: em qual experiência ela entra, e onde (achievement, stack ou os dois). Não invente a experiência. Preferência ausente entra na pergunta do mesmo jeito. Se não falta nada, uma frase: invocar `/cv-vaga` com a descrição completa da vaga.

Se ele não estiver dentro, não pergunte e não sugira.

## Resposta

Cinco frases no máximo, e depois as perguntas.

1. **Dentro** ou **Não**. A frase diz entrega, remoto e salário.
2. O que ele atende, numa frase, com fato do currículo.
3. O que falta, se faltar. Preferência ausente não tira ele de dentro.
4. Filtro de papel, se houver.
5. Se estiver dentro e faltar habilidade, as perguntas de experiência e de lugar. Se não faltar nada, uma frase para invocar `/cv-vaga` com a descrição completa da vaga.
