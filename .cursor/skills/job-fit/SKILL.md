---
name: job-fit
description: >
  Avalia se Mauricio Belusso tem fit com uma vaga. Use quando o usuário
  colar uma descrição de vaga, JD, job description, link de vaga, ou
  perguntar se tem fit, match, aderência, alinhamento, ou se vale se
  candidatar. Compara a vaga com locales/pt-BR/resume.json e devolve
  veredito, evidências e lacunas. Não usar para reescrever o currículo.
---

# Fit com a vaga

Avalie duas coisas, separadas:

1. **Aderência técnica** — a vaga pede o que o currículo prova.
2. **Aderência à barra** — a vaga justifica o posicionamento em `personal.contactBody` e `personal.availability`.

Responda no idioma da mensagem do usuário. Cite trechos da vaga no idioma original.

## Fonte da verdade

1. Leia `locales/pt-BR/resume.json` inteiro antes de julgar. É o currículo canônico.
2. Use só fatos de `personal`, `highlights`, `experience`, `skills` e `education`.
3. `locales/en`, `locales/es` e `locales/fr` são traduções. A existência deles não é fluência. Idiomas falados estão só em `personal.languages`.
4. Não complete lacuna com memória, LinkedIn, GitHub ou busca na web. Se não está no JSON, está ausente.
5. Não edite o currículo nesta skill. Não envie e-mail e não se candidate.

## Entrada

- Aceite texto, arquivo ou URL. Se for URL, busque a página e avalie a descrição. Ignore menu, rodapé e anúncio.
- Se não houver requisitos (só empresa ou título), diga que falta a descrição e pare.
- Várias vagas: uma avaliação por vaga, na ordem recebida.

## Como ler a vaga

Extraia só o que a vaga diz:

- Título e senioridade
- Obrigatórios e desejáveis. Sem essa separação, trate como obrigatório o que está em requisitos, responsabilidades centrais ou "você vai". Trate como desejável o que está em plus, diferencial ou nice to have.
- Stack, domínio, escopo (IC, liderança técnica, gestão de pessoas), local, remoto e idioma

Desejável ausente não rebaixa um veredito **Forte**.

## Evidência

Classifique cada obrigatório:

- **prova** — explícito em achievement, highlight, stack da experiência ou item de skill, com um fato de uso. Cite empresa, cargo e um trecho curto do JSON.
- **parcial** — família próxima com outra ferramenta, ou a tecnologia só como tag de stack, sem achievement. Diga a distância.
- **ausente** — não está no JSON.

Calibre assim:

- Tag de stack sem achievement é parcial, não prova.
- Angular no stack não torna frontend a especialidade. Vaga cujo núcleo é UI é fraca.
- Ferramentas de IA do currículo são engenharia assistida. Não são ML, ciência de dados nem produto de LLM.
- Não troque uma ferramenta por outra da mesma prateleira. Fila, orquestração, CI, cloud e banco só contam como a ferramenta que o JSON nomeia. Diga a família e a distância.
- Métrica só a que o JSON traz. Não arredonde, não some e não invente percentual.
- Não assuma mudança de país, visto ou pretensão salarial.

## Veredito

Escolha um, nesta ordem:

1. **Fraco** — a família do cargo ou a stack principal é outra, mesmo com uma ferramenta em comum. Exemplos: UI como núcleo, mobile como núcleo, dados ou ML, outra linguagem principal, ou gestão de pessoas sem arquitetura.
2. **Fora da barra** — a leitura técnica seria Forte ou Parcial, mas a vaga é ordinária: CRUD ou feature factory, escopo pleno ou júnior, sem desafio técnico incomum e sem sinal de cultura de engenharia séria. A barra está em `personal.contactBody`: comprometimento exclusivo não se desloca por uma vaga comum.
3. **Forte** — a maior parte dos obrigatórios é prova, o restante relevante é parcial, a senioridade é Staff, Principal, Arquiteto, Especialista ou Sênior com escopo de arquitetura ou plataforma, e o problema é incomum (escala, custo, concorrência, legado crítico, plataforma ou regulatório).
4. **Parcial** — o núcleo backend, plataforma ou Java se sobrepõe, mas um obrigatório material está ausente, ou a senioridade está um degrau fora.

Staff/Principal no currículo não cobre vaga pleno. Isso é desencontro. Se o escopo for ordinário, o veredito é **Fora da barra**. Se o problema técnico for real e o nível estiver um degrau abaixo, o veredito é **Parcial**.

## Resposta

Comece pelo veredito.

### Veredito

Uma linha com **Forte**, **Parcial**, **Fraco** ou **Fora da barra**, e a razão numa frase. Em **Fora da barra**, a frase seguinte diz a leitura técnica (Forte ou Parcial).

### Obrigatórios

Tabela: requisito, classificação (prova, parcial ou ausente), evidência (empresa e trecho) ou o que falta.

### Onde o fit é real

Até quatro fatos do JSON que a vaga pede.

### Lacunas

Só lacunas reais. Separe "não está no currículo" de qualquer conclusão sobre capacidade. Desejável ausente entra aqui, marcado como desejável.

### Barra

Duas ou três frases: o problema é incomum, há sinal de cultura de engenharia séria, e o nível conversa com Staff/Principal.

### Se for responder

Só em **Forte**, ou em **Parcial** com problema técnico que vale a conversa. Três bullets utilizáveis, cada um amarrado a um fato do JSON, sem métrica nova.

Em **Fraco** ou **Fora da barra**, uma frase para não avançar, com o motivo. Não escreva mensagem de candidatura.
