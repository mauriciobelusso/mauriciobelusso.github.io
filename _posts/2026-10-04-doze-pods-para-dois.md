---
layout: post
title: Doze pods para dois
date: 2026-10-04
tags:
  - Profiling
  - EKS
excerpt: Não dava para ver qual operação derrubava o pod. O profiling no Java mostrou alguns problemas; o do Datadog apontou o endpoint. Um F5 carregava a collection inteira para filtrar em memória. Coube em 1 pod; ficaram 2, porque é produção.
---

A API transacional estava em 12 pods, com 3 GB de RAM cada um. O pod caía, e a resposta tinha sido aumentar a capacidade. Não dava para medir como ele caía, porque não se sabia qual operação derrubava.

O profiling no Java já mostrou certos problemas. Não bastou para apontar a operação. O profiling no Datadog deu esse direcionamento: o endpoint que gerava a maior carga contra a API.

Esse endpoint era a tela do gerente. Bastava um F5. A tela carregava a collection inteira em memória para filtrar.

O filtro estava em memória, no lugar da query que vai ao banco. Quando a collection voltava, já tinha sobrecarregado o banco. O pod então tentava deserializar tudo e morria.

O formato abaixo não é a linha que estava no ar. É o filtro correndo depois que o banco já devolveu a collection:

```java
List<Registro> todos = repositorio.buscarTodos();
return todos.stream()
    .filter(registro -> registro.aceita(filtro))
    .toList();
```

O mesmo filtro, colocado na query, não traz essa collection para o pod:

```java
return repositorio.buscar(filtro);
```

Localmente não havia massa para simular esse volume. Em produção, o F5 bastava, e o estrago era enorme para um filtro fora da query. Com o filtro na query, a API passou a caber em 1 pod de 1,5 GB. Ficaram 2, porque é produção. O OutOfMemory parou.

| | Antes | Depois |
| --- | --- | --- |
| Pods | 12 | 2 |
| RAM por pod | 3 GB | 1,5 GB |
| RAM reservada | 36 GB | 3 GB |
| Compute no EKS | | −85% |

A tabela é o que ficou no ar: 2 pods, não o 1 em que já cabia. Os 85% são a queda do custo de compute desse serviço no EKS, não a conta da RAM. A memória reservada cai de 36 GB, que são 12 vezes 3 GB, para 3 GB, que são 2 vezes 1,5 GB. Essa queda de reserva é maior que 85%. O número ainda depende de como o pod cabe no node, do request de CPU e do que mais divide a máquina.
