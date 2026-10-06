---
layout: post
title: Doze pods para dois
date: 2026-10-04
excerpt: Um endpoint na frente de robôs vazava heap até OOM. O profiling levou a API de 12 pods de 3 GB para 1 ou 2 pods de 1,5 GB. O compute no EKS caiu 85%.
---

A API transacional tinha um endpoint exposto a robôs de automação. O processo vazava, o pod caía em OutOfMemory, e a resposta tinha sido capacidade: 12 pods, 3 GB de RAM cada. Réplica nova repete o objeto retido. O vazamento escala junto com o deployment.

O diagnóstico foi profiling do processo, não outro autoscaler. Com o que o heap realmente segurava corrigido, a mesma API passou a caber em 1 ou 2 pods de 1,5 GB. O OOM em produção parou.

A reserva de memória e a fatura não são o mesmo percentual.

| | Antes | Depois |
| --- | --- | --- |
| Pods | 12 | 1–2 |
| RAM por pod | 3 GB | 1,5 GB |
| RAM reservada | 36 GB | 1,5–3 GB |
| Compute no EKS | | −85% |

Doze vezes 3 GB são 36 GB reservados. Dois pods de 1,5 GB são 3 GB. O corte de reserva é maior que 85%. Os 85% são o custo de compute daquele serviço no EKS, não a razão entre os heaps. A conta ainda depende de como o pod cabe no node, do request de CPU e do que mais divide a máquina. Quem multiplicar só a RAM e cobrar 85% exato está medindo outra coisa. Os dois números descrevem objetos diferentes: um é a capacidade do deployment, o outro é a fatura.

Subir réplica enquanto o heap cresce compra horas e repete o custo. O objeto retido é o mesmo em cada pod. Profiling primeiro.
