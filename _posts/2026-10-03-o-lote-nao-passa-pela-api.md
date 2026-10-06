---
layout: post
title: O lote não passa pela API
date: 2026-10-03
tags:
  - Restrição de Crédito
  - SQS
excerpt: Anotação e conciliação de crédito, até 300 mil CPFs e CNPJs numa execução, seguem por SQS. A API que aceita o trabalho continua disponível.
---

Anotação e conciliação de crédito (PEFIN, REFIN e CONVEM) chegam a 300 mil CPFs e CNPJs numa execução. Esse volume não cabe num pedido HTTP. O tempo estoura o gateway, o retry do cliente reenvia o que já andou, e o pico aparece como tráfego da API.

A API aceita o trabalho e devolve. A mensagem vai para o SQS. O worker anota e concilia. O lote pode demorar, repetir e falhar. A thread do pedido não espera.

Três regras mantêm a fila honesta:

- A anotação é idempotente. A fila entrega outra vez.
- A visibilidade da mensagem cobre o pior processamento daquele item. Se a mensagem volta enquanto o worker ainda está no meio, dois workers disputam o mesmo documento.
- O que falha sempre sai da fila principal. Um item ruim não segura o lote.

No ar, são 300 mil registros numa execução, e a API continua disponível.
