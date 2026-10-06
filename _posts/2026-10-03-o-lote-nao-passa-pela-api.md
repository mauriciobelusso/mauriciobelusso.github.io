---
layout: post
title: O lote não passa pela API
date: 2026-10-03
excerpt: Anotação e conciliação de crédito, até 300 mil CPFs e CNPJs numa execução, seguem por SQS. A API que aceita o trabalho continua disponível.
---

Restrição de crédito em lote, na anotação e na conciliação (PEFIN, REFIN e CONVEM), chega a 300 mil CPFs e CNPJs numa execução. Isso não cabe no ciclo de um HTTP. O tempo estoura o gateway, o retry do cliente reenvia o que já andou, e o pico aparece como tráfego da API transacional.

São duas vidas. A API aceita o trabalho e devolve. A mensagem vai para o SQS. O worker anota e concilia. A disponibilidade que importa é a da API: o lote pode demorar, repetir e falhar sem segurar a thread do pedido.

Três decisões aparecem assim que a fila existe. Não vou inventar o número que usei em produção:

- A anotação tem de ser idempotente. A fila entrega outra vez.
- A visibilidade da mensagem tem de cobrir o pior processamento honesto daquele item. Se o worker ainda está no meio e a mensagem volta, dois workers disputam o mesmo documento.
- Registro que falha sempre precisa sair da fila principal. Sem isso, um item ruim segura o lote.

O que ficou no ar é o resultado simples: 300 mil registros numa execução, sem derrubar a API. O worker acompanha a fila. A API acompanha o pedido.
