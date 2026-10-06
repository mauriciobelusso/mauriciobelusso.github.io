---
layout: post
title: O layout saiu do deploy
date: 2026-10-02
excerpt: Documentos de notificação passaram por um motor de variáveis. A operação publica o layout. O que levava semanas de código sai na hora.
---

Notificação tinha um problema de fila de engenharia, não de impressão. Cada layout novo era código, revisão e deploy. Entre o texto mudar e o documento sair, iam semanas.

O motor trata o layout como dado. A operação publica o modelo, o renderer substitui as variáveis e o documento sai. Não há commit para trocar um parágrafo. O código que fica é o que lê o modelo, preenche e gera o arquivo. Esse código muda pouco. O texto muda sempre.

O prazo medido foi de semanas para a publicação na hora. Não é um gerador de qualquer arquivo da empresa. É o documento de notificação, que era o que a operação precisava alterar sem esperar uma release.
