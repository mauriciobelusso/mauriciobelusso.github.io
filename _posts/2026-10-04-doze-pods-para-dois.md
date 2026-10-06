---
layout: post
title: Doze pods para dois
date: 2026-10-04
tags:
  - Troubleshooting & Memory Leak
  - EKS
excerpt: Um endpoint na frente de robôs vazava heap até OOM. O profiling levou a API de 12 pods de 3 GB para 1 ou 2 pods de 1,5 GB. O compute no EKS caiu 85%.
---

Um endpoint da API transacional, exposto a robôs de automação, vazava heap até OutOfMemory. A resposta tinha sido capacidade: 12 pods de 3 GB. Réplica nova repete o objeto retido, então o vazamento cresce junto com o deployment.

O diagnóstico foi profiling do processo. Com o que o heap segurava corrigido, a mesma API passou a caber em 1 ou 2 pods de 1,5 GB. O OOM em produção parou.

| | Antes | Depois |
| --- | --- | --- |
| Pods | 12 | 1–2 |
| RAM por pod | 3 GB | 1,5 GB |
| RAM reservada | 36 GB | 1,5–3 GB |
| Compute no EKS | | −85% |

Os 85% são o custo de compute desse serviço no EKS, não a razão entre as RAMs. A reserva cai de 36 GB (12 × 3 GB) para 1,5–3 GB. Esse corte é maior que 85%. A conta ainda depende de como o pod cabe no node, do request de CPU e do que mais divide a máquina.

Subir réplica enquanto o heap cresce só repete o custo. O objeto retido é o mesmo em cada pod.
