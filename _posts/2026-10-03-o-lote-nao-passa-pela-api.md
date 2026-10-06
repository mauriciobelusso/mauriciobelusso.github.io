---
layout: post
title: O lote não passa pela API
date: 2026-10-03
tags:
  - Restrição de Crédito
  - SQS
excerpt: Anotações de crédito, até 300 mil CPFs e CNPJs numa execução, vão para o SQS. A API aceita o trabalho e continua disponível.
---

Anotações de crédito chegam a 300 mil CPFs e CNPJs numa execução. Esse volume não cabe num pedido HTTP. O pedido passa do tempo do gateway, o cliente tenta de novo e reenvia o que já tinha andado. O pico aparece como tráfego da API.

Por isso a API só aceita o trabalho e responde. A mensagem vai para o SQS. O worker faz a anotação. O lote pode demorar, repetir ou falhar. A thread do pedido não espera.

Três regras evitam que a fila duplique trabalho ou pare:

- A anotação é idempotente. A fila pode entregar a mesma mensagem outra vez, e o efeito não pode dobrar.
- O tempo de visibilidade da mensagem cobre o pior processamento daquele item. Se a mensagem volta enquanto o worker ainda trabalha, dois workers pegam o mesmo documento.
- O que falha sempre sai da fila principal. Um item ruim não pode segurar o lote.

No ar, são 300 mil registros numa execução, e a API continua disponível.
