---
layout: post
title: O layout saiu do deploy
date: 2026-10-02
tags:
  - Autonomia Operacional
excerpt: Documentos de notificação levavam semanas porque cada layout era código e deploy. A operação passou a publicar o modelo, e o motor substitui as variáveis.
---

Documentos de notificação levavam semanas para mudar, porque cada layout novo era código: passava por revisão e só saía num deploy.

Para tirar o texto desse caminho, o motor passou a tratar o layout como dado. A operação publica o modelo. O motor lê esse modelo, substitui as variáveis e gera o arquivo. Trocar um parágrafo deixa de exigir commit, porque o código que permanece muda pouco e o texto muda sempre.

Esse modelo publicado guarda marcadores no lugar do texto que muda:

{% raw %}
```text
Prezado {{nome}},
sua notificação vence em {{vencimento}}.
```
{% endraw %}

O motor percorre esses marcadores, troca cada um pelo valor e gera o arquivo. O que fica no código é essa troca. O modelo, não.

{% raw %}
```java
String texto = modelo
    .replace("{{nome}}", nome)
    .replace("{{vencimento}}", vencimento);
gerarArquivo(texto);
```
{% endraw %}

Com o texto fora do deploy, o prazo medido foi de semanas para a publicação na hora. Isso vale para o documento de notificação, não para qualquer arquivo da empresa.
