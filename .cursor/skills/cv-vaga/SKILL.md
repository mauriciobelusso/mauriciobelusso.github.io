---
name: cv-vaga
description: Gera um currículo direcionado a uma vaga e publica um link que só abre com a chave no fragmento da URL. Use quando o usuário pedir currículo para uma vaga, CV direcionado, link exclusivo de currículo, cv-vaga, ou colar uma descrição de vaga para gerar uma página só de quem tem o link.
---

# Currículo por vaga

Gera uma variante cifrada do currículo e devolve o link `https://mauriciobelusso.dev/cv.html?v=<id>#<chave>`. Quem não tem o fragmento vê só "Link inválido ou incompleto." O repositório é público: a chave não entra em arquivo commitado, commit, PR nem README.

## Entrada

O texto da vaga é obrigatório. Sem ele, peça a descrição e pare.

Idioma: o que o usuário indicar. Se não indicar, use o idioma da vaga (`en`, `es`, `fr` ou `pt-BR`).

Empresa e cargo: extraia da vaga. Se não der para saber, pergunte antes de selar.

## Fonte da verdade

Leia `locales/<idioma>/resume.json`. Não invente empresa, cargo ocupado, período, formação, métrica, ferramenta ou resultado. Se a vaga pede algo que não está nesse JSON, omita. Não complete com conhecimento externo da carreira.

Pode:

- reescrever `personal.title` e `personal.summary` para a vaga, só com fatos do JSON (o título é manchete, não um cargo antigo)
- reordenar `highlights` e omitir os que não ajudam
- reordenar ou omitir bullets de `experience`, e reescrever o texto sem mudar o fato
- reordenar ou omitir itens de `stack` e `skills` que já existam naquele currículo

Mantenha iguais: empresas, períodos, formação, contatos, idiomas, blocos `ui` e o restante de `personal` que não seja título ou resumo. Mantenha todos os empregos. Não apague um empregador para "caber" na vaga.

Copie `meta.lang` do arquivo de origem.

Ele é AuDHD e precisa trabalhar remoto. Não escreva nenhum dos dois no currículo, a menos que ele peça.

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
