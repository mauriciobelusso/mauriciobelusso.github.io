---
layout: post
title: O carrier preso no synchronized
date: 2026-10-05
tags:
  - Virtual Threads (Loom)
  - Java 25
excerpt: A ida ao Java 25 LTS tirou o pinning de dentro do synchronized. A CPU média caiu de 100 para 30 mcores, e a memória de 1,3 GB para 900 MB, sob carga.
---

A migração dos microsserviços, do Java 8 ao Java 25 LTS, passou o trabalho bloqueante para virtual threads. O que ficou medido: CPU média de 100 para 30 mcores, memória de 1,3 GB para 900 MB, e esse patamar se manteve com a carga alta.

Isso só se sustenta se a virtual thread soltar o carrier quando bloqueia. O carrier é a platform thread em que ela está montada. No Java 21, um bloco `synchronized` prendia a virtual thread nesse carrier. Se dentro do monitor ela espera I/O ou outra thread, o carrier não volta ao scheduler. A latência não cai no tamanho que o modelo promete.

O Java 25 inclui a correção do [JEP 491](https://openjdk.org/jeps/491), entregue no JDK 24. A virtual thread adquire e solta o monitor sem prender o carrier. `Object.wait()` dentro do `synchronized` também desmonta. Não foi preciso trocar o monitor por `ReentrantLock`. O que ainda pina é chamada nativa ou função estrangeira que volta para Java e bloqueia.

```java
synchronized (lock) {
    cliente.chamar();
}
```

Esse formato vinha do Java 8: monitor em volta de chamada que bloqueia. No 21, `chamar()` segura o carrier. No 25, o carrier solta enquanto a chamada espera. A troca de versão destravou o corte de CPU.

No Java 21, a flag `-Djdk.tracePinnedThreads` imprimia esse stack. Ela saiu no Java 24. No 25, o evento JFR `jdk.VirtualThreadPinned` vem ligado por padrão, com limiar de 20 ms, e aponta o que resta: nativo, não o `synchronized`.

A memória foi de 1,3 GB para 900 MB e ficou nesse patamar com carga. Os 400 MB não são só o fim do pinning. Medi heap e CPU juntos, depois da migração. Um pool maior de platform thread teria comprado concorrência com mais stack. No 25, a virtual thread devolve o carrier quando o bloqueio acaba.
