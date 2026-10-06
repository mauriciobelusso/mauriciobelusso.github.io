---
layout: post
title: O layout saiu do deploy
date: 2026-10-02
tags:
  - Autonomia Operacional
excerpt: Documentos de notificação passaram de semanas de código para publicação na hora. A operação publica o layout. O motor substitui as variáveis.
---

Documentos de notificação levavam semanas para mudar. Cada layout novo era código, revisão e deploy.

O motor trata o layout como dado. A operação publica o modelo, o renderer substitui as variáveis e o documento sai. Não há commit para trocar um parágrafo. O código que fica lê o modelo, preenche e gera o arquivo. Esse código muda pouco. O texto muda sempre.

O prazo medido foi de semanas para a publicação na hora. O escopo é o documento de notificação, não um gerador de qualquer arquivo da empresa.
