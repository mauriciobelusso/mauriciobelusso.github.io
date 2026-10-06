---
layout: post
title: Doze pods para dois
date: 2026-10-04
tags:
  - Troubleshooting & Memory Leak
  - EKS
excerpt: Um endpoint exposto a robôs vazava memória até OutOfMemory. O profiling levou a API de 12 pods de 3 GB para 1 ou 2 pods de 1,5 GB. O compute no EKS caiu 85%.
---

Um endpoint da API transacional, exposto a robôs de automação, vazava memória até OutOfMemory. A resposta foi aumentar a capacidade: 12 pods, com 3 GB de RAM cada um. Cada réplica nova repetia o objeto que o processo não soltava. O vazamento crescia junto com a quantidade de pods.

O diagnóstico foi o profiling do processo, não outro autoscaler. Corrigido o que o heap segurava, a mesma API passou a caber em 1 ou 2 pods de 1,5 GB. O OutOfMemory em produção parou.

| | Antes | Depois |
| --- | --- | --- |
| Pods | 12 | 1–2 |
| RAM por pod | 3 GB | 1,5 GB |
| RAM reservada | 36 GB | 1,5–3 GB |
| Compute no EKS | | −85% |

Os 85% são a queda do custo de compute desse serviço no EKS, não a conta da RAM. A memória reservada cai de 36 GB, que são 12 vezes 3 GB, para 1,5 a 3 GB. Essa queda de reserva é maior que 85%. O número ainda depende de como o pod cabe no node, do request de CPU e do que mais divide a máquina.

Aumentar réplicas enquanto o heap cresce só repete o custo. O objeto retido é o mesmo em cada pod.

O profiling mostra um objeto que continua referenciado depois da resposta. O trecho abaixo é o formato, não a linha que estava no ar. Neste formato, cada pedido fica preso no processo. A réplica nova repete a coleção.

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
