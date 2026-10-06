---
layout: post
title: O lote não passa pela API
date: 2026-10-03
tags:
  - Restrição de Crédito
  - SQS
excerpt: Anotações de crédito, até 300 mil CPFs e CNPJs numa execução, saem por outbox para o SQS. O worker usa inbox, e a API continua disponível.
---

Anotações de crédito chegam a 300 mil CPFs e CNPJs numa execução. Esse volume não cabe num pedido HTTP: o pedido passa do tempo do gateway, o cliente tenta de novo e reenvia o que já tinha andado, e o pico aparece como tráfego da API.

Por isso a API só aceita o trabalho e responde. O lote pode demorar, repetir ou falhar, e a thread do pedido não espera por isso.

Quem aceita e responde ainda precisa gravar o trabalho e publicar a mensagem sem que esses dois passos se separem. Na mensageria, o par que cobre isso é outbox na saída e inbox na entrada.

O outbox coloca os dois na mesma transação. Se ela confirma, a linha do outbox está lá. Se ela falha, nenhum dos dois fica.

```java
@Transactional
void aceitar(String id) {
    salvarTrabalho(id);
    outbox.inserir(id);
}
```

A transação garante a linha, não o envio. Outro processo lê o que ainda não foi enviado, publica no SQS e marca a linha. Se ele morre depois de publicar e antes de marcar, publica de novo. A entrada precisa de inbox para essa repetição.

O inbox guarda o id da mensagem já tratada, na mesma transação da anotação. A fila pode entregar outra vez, e o efeito não dobra. A mensagem só sai da fila depois que essa transação confirma.

```java
@Transactional
boolean anotar(String id) {
    if (!inbox.registrar(id)) {
        return false;
    }
    gravarAnotacao(id);
    return true;
}

void consumir(String id, Mensagem mensagem) {
    anotar(id);
    mensagem.apagar();
}
```

`registrar` grava o id. Se ele já existe, a anotação não roda de novo. O id é único: se dois workers chegam juntos, um confirma e o outro falha nessa gravação. Se o processo morre depois da confirmação e antes de apagar, a fila entrega de novo e o inbox segura a repetição.

Essa segunda entrega também acontece quando a mensagem volta antes de o worker terminar. O tempo de visibilidade cobre o pior processamento daquele item. Se a mensagem volta enquanto o worker ainda trabalha, dois workers pegam o mesmo documento. O número desse tempo é o medido para o item, não um padrão copiado.

O que falha sempre, mesmo com esse tempo, sai da fila principal. Um item ruim não pode segurar o lote. Depois das tentativas, a mensagem vai para uma fila morta:

```json
{
  "deadLetterTargetArn": "arn:aws:sqs:REGIAO:CONTA:anotacao-dlq",
  "maxReceiveCount": "TENTATIVAS"
}
```

No lugar de `TENTATIVAS` entra o número inteiro medido para aquele item: quantas falhas ele pode ter antes de sair da fila principal.

Com a API só aceitando o trabalho e o lote andando nessa fila, são 300 mil registros numa execução, e a API continua disponível.
