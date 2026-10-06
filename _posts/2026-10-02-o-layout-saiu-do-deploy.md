---
layout: post
title: O layout saiu do deploy
date: 2026-10-02
tags:
  - Autonomia Operacional
excerpt: Documentos de notificação levavam semanas porque cada layout era código e deploy. A operação passou a publicar o modelo, e o motor substitui as variáveis.
---

Documentos de notificação levavam semanas para mudar. Cada layout novo era código, passava por revisão e só saía num deploy.

O motor passou a tratar o layout como dado. A operação publica o modelo. O motor lê esse modelo, substitui as variáveis e gera o arquivo. Trocar um parágrafo não exige commit. O código que permanece muda pouco. O texto muda sempre.

O modelo publicado tem marcadores no lugar do texto que muda:

{% raw %}
```text
Prezado {{nome}},
sua notificação vence em {{vencimento}}.
```
{% endraw %}

O motor troca cada marcador pelo valor e gera o arquivo. O código que faz isso permanece. O modelo, não.

{% raw %}
```java
String texto = modelo
    .replace("{{nome}}", nome)
    .replace("{{vencimento}}", vencimento);
gerarArquivo(texto);
```
{% endraw %}

O prazo medido foi de semanas para a publicação na hora. Isso vale para o documento de notificação, não para qualquer arquivo da empresa.
