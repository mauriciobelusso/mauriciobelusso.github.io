---
layout: post
title: O carrier preso no synchronized
date: 2026-10-05
tags:
  - Virtual Threads (Loom)
  - Java 25
excerpt: A ida ao Java 25 LTS tirou o pinning de dentro do synchronized. A CPU média caiu de 100 para 30 mcores, e a memória de 1,3 GB para 900 MB, sob carga.
---

A migração levou os microsserviços do Java 8 ao Java 25 LTS. O trabalho que bloqueia passou para virtual threads. A CPU média caiu de 100 para 30 mcores. A memória caiu de 1,3 GB para 900 MB. Esse patamar se manteve com a carga alta.

A queda só se sustenta se a virtual thread soltar o carrier quando bloqueia. O carrier é a thread de plataforma em que a virtual thread está montada. No Java 21, entrar num bloco `synchronized` prendia a virtual thread a esse carrier. Se, dentro do bloco, ela espera rede ou outra thread, o carrier não volta ao escalonador. Sobra virtual thread parada e thread de plataforma ocupada. A latência não cai o quanto o modelo promete.

O Java 25 LTS inclui a correção do [JEP 491](https://openjdk.org/jeps/491), entregue no JDK 24. A virtual thread adquire e solta o monitor sem prender o carrier. `Object.wait()` dentro do `synchronized` também solta o carrier. Não foi preciso trocar o monitor por `ReentrantLock`. O que ainda prende o carrier é chamada nativa, ou uma função de fora da JVM que volta para o Java e bloqueia.

O código continua este. Veio do Java 8: um monitor em volta de uma chamada que bloqueia. No Java 21, `chamar()` segura o carrier. No Java 25, o carrier fica livre enquanto a chamada espera. A troca de versão é o que permitiu a queda de CPU.

```java
synchronized (lock) {
    cliente.chamar();
}
```

No Java 21, esta flag imprimia a pilha do ponto em que o carrier ficava preso. Ela saiu no Java 24.

```text
-Djdk.tracePinnedThreads
```

No Java 25, o evento JFR abaixo vem ligado por padrão, com limite de 20 ms. Ele aponta o que ainda prende: código nativo, não o `synchronized`.

```text
jdk.VirtualThreadPinned
```

A memória foi de 1,3 GB para 900 MB e ficou nesse patamar com carga. A diferença de 400 MB não se explica só pelo fim desse travamento. A medição, feita depois da migração, olhou heap e CPU juntos. Aumentar o pool de threads de plataforma teria dado concorrência com mais pilha. No Java 25, a virtual thread devolve o carrier quando o bloqueio acaba.
