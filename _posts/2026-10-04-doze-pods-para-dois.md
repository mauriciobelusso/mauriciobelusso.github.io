---
layout: post
title: Doze pods para dois
date: 2026-10-04
tags:
  - Troubleshooting & Memory Leak
  - EKS
excerpt: Um endpoint exposto a robôs vazava memória até OutOfMemory. O profiling levou a API de 12 pods de 3 GB para 1 ou 2 pods de 1,5 GB. O compute no EKS caiu 85%.
---

Um endpoint da API transacional, exposto a robôs de automação, vazava memória até OutOfMemory. A resposta foi aumentar a capacidade: 12 pods, com 3 GB de RAM cada um. Cada réplica nova repetia o objeto que o processo não soltava, então o vazamento crescia junto com a quantidade de pods.

O profiling mostrou um objeto que continua referenciado depois da resposta. Neste formato, cada pedido fica preso no processo, e a réplica nova repete a coleção. O trecho abaixo é o formato, não a linha que estava no ar.

```java
void atender(Pedido pedido) {
    vistos.put(pedido.id(), pedido);
    responder(pedido);
}
```

Sem essa referência, o coletor pode liberar o pedido quando a resposta termina.

```java
void atender(Pedido pedido) {
    responder(pedido);
}
```

Corrigido o que o heap segurava, a mesma API passou a caber em 1 ou 2 pods de 1,5 GB. O OutOfMemory em produção parou.

| | Antes | Depois |
| --- | --- | --- |
| Pods | 12 | 1–2 |
| RAM por pod | 3 GB | 1,5 GB |
| RAM reservada | 36 GB | 1,5–3 GB |
| Compute no EKS | | −85% |

A tabela separa o que mudou de pod e de memória do que mudou de custo. Os 85% são a queda do custo de compute desse serviço no EKS, não a conta da RAM. A memória reservada cai de 36 GB, que são 12 vezes 3 GB, para 1,5 a 3 GB. Essa queda de reserva é maior que 85%. O número ainda depende de como o pod cabe no node, do request de CPU e do que mais divide a máquina.
