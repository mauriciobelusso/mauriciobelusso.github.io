---
name: cv-vaga
description: Gera um currículo direcionado a uma vaga e publica um link que só abre com a chave no fragmento da URL. Use quando o usuário pedir currículo para uma vaga, CV direcionado, link exclusivo de currículo, cv-vaga, ou colar uma descrição de vaga para gerar uma página só de quem tem o link. Antes de selar, identifica o que a vaga pede e o currículo não tem, e pergunta em qual experiência adicionar cada habilidade e onde.
---

# Currículo por vaga

Gera uma variante cifrada do currículo e devolve o link `https://mauriciobelusso.dev/cv.html?v=<id>#<chave>`. Quem não tem o fragmento vê só "Link inválido ou incompleto." O repositório é público: a chave não entra em arquivo commitado, commit, PR nem README.

## Entrada

O texto da vaga é obrigatório. Sem ele, peça a descrição e pare.

Idioma: o que o usuário indicar. Se não indicar, use o idioma da vaga (`en`, `es`, `fr` ou `pt-BR`).

Empresa e cargo: extraia da vaga. Se não der para saber, pergunte antes de selar.

## Fonte da verdade

Leia `locales/<idioma>/resume.json`. Não invente empresa, cargo ocupado, período, formação, métrica, ferramenta ou resultado. Não complete com conhecimento externo da carreira. Não altere `locales/*/resume.json`. O que ele confirmar entra só no JSON direcionado.

Pode:

- reescrever `personal.title` e `personal.summary` para a vaga, só com fatos do JSON (o título é manchete, não um cargo antigo)
- reordenar `highlights` e omitir os que não ajudam
- reordenar ou omitir bullets de `experience`, e reescrever o texto sem mudar o fato
- reordenar ou omitir itens de `stack` e `skills` que já existam naquele currículo
- acrescentar a habilidade que ele confirmou, só na experiência e no lugar que ele indicar

Mantenha iguais: empresas, períodos, formação, contatos, idiomas, blocos `ui` e o restante de `personal` que não seja título ou resumo. Mantenha todos os empregos. Não apague um empregador para "caber" na vaga.

Copie `meta.lang` do arquivo de origem.

Ele é AuDHD, precisa trabalhar remoto e trabalha por retorno financeiro. Não escreva nenhum dos três no currículo, a menos que ele peça.

## Lacunas

Antes de selar, compare o que a vaga pede com o JSON. Lacuna é habilidade pedida que não está em `highlights`, `experience`, `skills` nem `education`. Preferência também entra. O que já está no JSON não é lacuna.

Se houver lacuna, pare e pergunte, uma habilidade por vez:

- em qual experiência ela entra (cite empresa e cargo do JSON)
- onde: achievement, stack ou os dois

Não sele até ele responder. Se ele disser para não adicionar, omita. Se ele indicar a experiência, escreva uma linha curta de uso nessa experiência, no lugar que ele escolheu, sem métrica nova. Não crie emprego. Não mova período. A habilidade só entra onde ele mandou.

## Selar

Grave o JSON direcionado em arquivo temporário fora do git (por exemplo `/tmp/cv-vaga-resume.json`). Rode, na raiz do repositório:

```bash
node scripts/seal-cv.mjs --in /tmp/cv-vaga-resume.json --company "Empresa" --role "Cargo"
```

O script grava `v/<id>.json` (só `v`, `iv`, `ct`) e acrescenta a chave em `v/index.private.json`, que está no `.gitignore`. Apague o JSON temporário em texto claro depois.

Antes de commitar, confira que a chave impressa pelo script não aparece em `git diff` nem em arquivo tracked. Se aparecer, não faça o commit.

Commitar só `v/<id>.json`, com mensagem no estilo `Adiciona currículo direcionado para <Empresa>`. Não cite a chave, o id completo nem o link na mensagem. Faça push para o GitHub Pages publicar o arquivo. Sem esse push o link ainda não abre em produção.

## Resposta ao usuário

Entregue o `url` que o script imprimiu, mais empresa, cargo e idioma. Avise que a cópia da chave está em `v/index.private.json` nesta máquina e que, sem esse arquivo ou o link, o currículo não abre de novo.

Não cole a chave em outro arquivo do repositório.
