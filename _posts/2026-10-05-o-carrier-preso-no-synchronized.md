---
layout: post
title: O carrier preso no synchronized
date: 2026-10-05
excerpt: A ida ao Java 25 LTS tirou o pinning de dentro do synchronized. A CPU média caiu de 100 para 30 mcores, e a memória de 1,3 GB para 900 MB, sob carga.
---

Levei microsserviços do Java 8 ao Java 25 LTS e passei o trabalho bloqueante para virtual threads. O que ficou medido: CPU média de 100 para 30 mcores, memória de 1,3 GB para 900 MB, e esse patamar se manteve com a carga alta.

O modelo só entrega isso se a virtual thread puder soltar o carrier quando bloqueia. O carrier é a platform thread em que a virtual thread está montada. No Java 21, entrar num bloco `synchronized` prendia a virtual thread a esse carrier. Se dentro do monitor ela espera I/O ou outra thread, o carrier não volta para o scheduler. Sobra virtual thread parada e platform thread ocupada. A latência não cai no tamanho que o modelo promete.

O [JEP 491](https://openjdk.org/jeps/491) entregou a correção no JDK 24. O Java 25, que é LTS, já inclui: a virtual thread adquire e solta o monitor sem prender o carrier. `Object.wait()` dentro do `synchronized` também desmonta. Não foi preciso trocar o monitor por `ReentrantLock` para o runtime deixar de pinar. O que ainda pina é chamada nativa ou função estrangeira que volta para Java e bloqueia.

No Java 21, a flag `-Djdk.tracePinnedThreads` imprimia esse stack. No Java 24 ela saiu. No 25, o registro é o evento JFR `jdk.VirtualThreadPinned`, ligado por padrão com limiar de 20 ms. Ele aponta o que resta: nativo, não o `synchronized`.

```java
synchronized (lock) {
    cliente.chamar();
}
```

Esse é o formato que vinha do Java 8: monitor em volta de chamada que bloqueia. No 21, `chamar()` segura o carrier. No 25, o carrier solta enquanto a chamada espera. A troca de versão foi o que destravou o corte de CPU.

A memória desceu junto, de 1,3 GB para 900 MB, e ficou aí com carga. Não atribuo os 400 MB só ao fim do pinning. Medi o processo depois da migração, heap e CPU ao mesmo tempo. Subir pool de platform thread teria comprado concorrência com mais stack. A virtual thread no 25 devolve o carrier quando o bloqueio acaba.
