---
layout: post
title: A integração com Kafka
date: 2026-10-05 21:40:00 -0300
tags:
  - Kafka
  - AWS
excerpt: As bibliotecas novas já vêm com o produtor idempotente. Ainda é preciso definir a permissão na AWS, o nível dela, e medir se Kafka vale a pena no processo.
---

Hoje integrei um processo com Kafka. As bibliotecas novas já vêm com o produtor idempotente. Ele evita que um reenvio do cliente grave a mesma mensagem duas vezes. Isso precisa estar na configuração que está no ar, não só no padrão da biblioteca.

Na nota do lote, a anotação tem de ser idempotente porque a fila entrega a mensagem de novo. Aqui a biblioteca cobre só o reenvio do produtor. O efeito dentro do processo continua sendo outra verificação.

O ponto de atenção é a permissão na AWS: quais permissões o processo recebe, e quão amplas elas são. A biblioteca não escolhe isso.

Também falta medir se Kafka vale a pena neste processo. A conta é se ele aguenta repetição sem duplicar efeito, com permissão limitada ao que o processo precisa fazer. Esse valor ainda não está medido.
