---
layout: post
title: A integração com Kafka
date: 2026-10-05 21:40:00 -0300
tags:
  - Kafka
  - AWS
excerpt: As bibliotecas novas já trazem o produtor idempotente. Falta cravar a permissão na AWS, o nível dela, e medir se Kafka vale a pena no processo.
---

Hoje integrei um processo com Kafka. As bibliotecas novas já vêm com o produtor idempotente. Isso vale para o reenvio do cliente. Confirma-se na configuração que ficou no ar, não só no padrão da biblioteca.

O que pede atenção é a permissão na AWS. Quais permissões se concedem, e quão amplas elas são. A biblioteca não escolhe isso.

O outro ponto é medir se Kafka vale a pena neste processo. O que importa é o processo aguentar repetição sem duplicar efeito, com permissão no tamanho do que ele faz. Esse valor ainda não está medido.
