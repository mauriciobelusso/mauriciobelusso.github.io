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

Três regras evitam que a fila duplique trabalho ou pare.

A anotação é idempotente. A fila pode entregar a mesma mensagem outra vez, e o efeito não pode dobrar. O worker só apaga a mensagem depois de gravar.

```java
void anotar(String id, Mensagem mensagem) {
    if (jaAnotado(id)) {
        mensagem.apagar();
        return;
    }
    gravarAnotacao(id);
    marcarAnotado(id);
    mensagem.apagar();
}
```

O tempo de visibilidade cobre o pior processamento daquele item. Se a mensagem volta enquanto o worker ainda trabalha, dois workers pegam o mesmo documento. O número desse tempo é o medido para o item, não um padrão copiado.

O que falha sempre sai da fila principal. Um item ruim não pode segurar o lote. Depois das tentativas, a mensagem vai para uma fila morta:

```json
{
  "deadLetterTargetArn": "arn:aws:sqs:REGIAO:CONTA:anotacao-dlq",
  "maxReceiveCount": "TENTATIVAS"
}
```

No lugar de `TENTATIVAS` entra o número inteiro medido para aquele item: quantas falhas ele pode ter antes de sair da fila principal.

No ar, são 300 mil registros numa execução, e a API continua disponível.
