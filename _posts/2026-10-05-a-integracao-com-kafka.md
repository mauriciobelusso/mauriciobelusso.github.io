---
layout: post
title: A integração com Kafka
date: 2026-10-05 21:40:00 -0300
tags:
  - Kafka
  - AWS
excerpt: As bibliotecas novas já vêm com o produtor idempotente. Ainda é preciso definir a permissão na AWS, o nível dela, e medir se Kafka vale a pena no processo.
---

Hoje integrei um processo com Kafka. As bibliotecas novas já vêm com o produtor idempotente. Ele evita que um reenvio do cliente grave a mesma mensagem duas vezes. A configuração que está no ar precisa ser esta, não só o padrão da biblioteca:

```properties
enable.idempotence=true
acks=all
max.in.flight.requests.per.connection=5
```

`acks=all` é exigência do produtor idempotente. Mais de cinco pedidos em voo também quebra esse modo.

Na nota do lote, a anotação tem de ser idempotente porque a fila entrega a mensagem de novo. Aqui a biblioteca cobre só o reenvio do produtor. O efeito dentro do processo continua sendo outra verificação.

O ponto de atenção é a permissão na AWS, quando o cluster é MSK e o cliente usa IAM. A biblioteca não escolhe essa policy. `WriteData` no tópico não basta: a partir do Kafka 2.8, a escrita idempotente pede `kafka-cluster:WriteDataIdempotently` no cluster. Essa ação não funciona se estiver só no tópico. O `transactional-id` também entra, mesmo sem uma transação de negócio.

Quem só publica fica neste nível. Sem `kafka-cluster:*`, sem criar tópico e sem ler.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "kafka-cluster:Connect",
        "kafka-cluster:WriteDataIdempotently"
      ],
      "Resource": "arn:aws:kafka:REGIAO:CONTA:cluster/NOME/UUID"
    },
    {
      "Effect": "Allow",
      "Action": [
        "kafka-cluster:DescribeTopic",
        "kafka-cluster:WriteData"
      ],
      "Resource": "arn:aws:kafka:REGIAO:CONTA:topic/NOME/UUID/TOPICO"
    },
    {
      "Effect": "Allow",
      "Action": [
        "kafka-cluster:DescribeTransactionalId",
        "kafka-cluster:AlterTransactionalId"
      ],
      "Resource": "arn:aws:kafka:REGIAO:CONTA:transactional-id/NOME/UUID/ID"
    }
  ]
}
```

Quem só consome não recebe escrita. Recebe leitura no tópico e o grupo dele:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "kafka-cluster:Connect",
      "Resource": "arn:aws:kafka:REGIAO:CONTA:cluster/NOME/UUID"
    },
    {
      "Effect": "Allow",
      "Action": [
        "kafka-cluster:DescribeTopic",
        "kafka-cluster:ReadData"
      ],
      "Resource": "arn:aws:kafka:REGIAO:CONTA:topic/NOME/UUID/TOPICO"
    },
    {
      "Effect": "Allow",
      "Action": [
        "kafka-cluster:DescribeGroup",
        "kafka-cluster:AlterGroup"
      ],
      "Resource": "arn:aws:kafka:REGIAO:CONTA:group/NOME/UUID/GRUPO"
    }
  ]
}
```

Também falta medir se Kafka vale a pena neste processo. A conta é se ele aguenta repetição sem duplicar efeito, com essa permissão e não com acesso ao cluster inteiro. Esse valor ainda não está medido.
