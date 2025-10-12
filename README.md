---
layout: single
title: "Mauricio Belusso — Engenheiro de Software"
description: "Sistemas que escalam. Código que não quebra. Engenharia pragmática, previsível e mensurável."
author_profile: false
classes: wide
---

# **Mauricio Belusso — Engenheiro de Software**

> Sistemas que escalam. Código que não quebra.  
> Engenharia pragmática, previsível e mensurável.

---

## 🧩 **Princípios de Engenharia**

- **Previsibilidade sobre improviso:** arquitetura é planejamento, não reação.  
- **Performance sustentável:** otimizar não é acelerar — é manter.  
- **Simplicidade funcional:** menos abstração, mais clareza.  
- **Custo de complexidade:** todo if custa, todo cache mente.  
- **Escala real:** sistemas não devem depender de sorte, mas de design.

---

## 🏢 **Experiência Profissional**

---

### 🔹 **Serasa (via Verx) — Engenharia de Produto Judicial e IA Antifraude**

Atuação como **consultor sênior**, responsável pela **evolução arquitetural e técnica** do sistema de **atendimento e processamento de ordens judiciais**.  
Concepção e implementação de soluções de performance, escalabilidade e inteligência operacional.

**Principais entregas:**
- **Reestruturação completa do processamento de anotações judiciais**, incluindo integração com **mainframe** e automação de leitura de arquivos volumosos;  
  - Novo design processou **100 mil linhas em menos de 15 minutos**, com validação e linkagem automatizadas.  
- **Digitalização total do arquivo físico**, integrando múltiplas fontes de dados e padronizando metadados.  
- **Implantação de WebSocket autenticado (sem SockJS)** para envio de **notificações em tempo real** entre módulos.  
- **Redução de consumo e autoscaling:** heap de 2 GB para 300–400 MB, queda de pods de 12 para 2, mantendo uso de memória abaixo de 1 GB.  
- **Otimização de banco e consultas**, com índices dinâmicos via **Mongock** executados em background, sem travar a subida dos pods.  
- **Integração com storage via links assinados**, permitindo upload direto e removendo sobrecarga da API.  
- **Prova de conceito (POC) de IA** para leitura e interpretação de ordens judiciais, vinculando CPF e decisões com detecção antifraude.

**Stack:** Java · Spring Boot · WebSocket · MongoDB · Mongock · AWS S3 · Docker · Kubernetes · Microservices  

**Impacto:**  
Sistema mais leve, rápido e previsível.  
Processamento automatizado de alta volumetria e estabilidade operacional — **engenharia prática, fria e mensurável.**

---

### 🔹 **Softfocus — Engenharia de Estrutura e Integração Bancária**

Atuação em múltiplos projetos simultâneos, inicialmente como executor, evoluindo para papel de **engenheiro estruturante**, responsável por elevar padrões de código, reduzir falhas sistêmicas e aumentar produtividade.

**Principais entregas:**
- **Criação de um mecanismo de Injeção de Dependências (DI) customizado**, inspirado no Spring, sobre Struts, com injeção via anotações;  
  - Eliminou acoplamentos e duplicação de código.  
- **Redução de ~70 % da complexidade estrutural**, consolidando múltiplas classes redundantes em uma arquitetura centralizada e tipada.  
- **Integração bancária direta (Santander ↔ BACEN)**, substituindo automação manual por integração via API.  
- **Padronização e containerização de ambiente**, com builds previsíveis e menos falhas.  
- **Redução de bugs em mais de 60 %**, e ciclos de entrega mais curtos e consistentes.

**Stack:** Java · Struts · PostgreSQL · Docker · Integrações REST · DI via @Annotation  

**Impacto:**  
Modernização estrutural de sistemas legados.  
**Código mais limpo, previsível e escalável.** Base sólida para entregas bancárias críticas com estabilidade e segurança.

---

### 🔹 **Mirante Tecnologia — Sistema de Editais e Assinatura Digital (INCRA)**

Atuação como **consultor técnico direto do INCRA**, responsável por **projeto, arquitetura e desenvolvimento** do sistema de **editais de distribuição de terras**, integrando autenticação digital, automação de fluxos e georreferenciamento entre municípios.

**Principais entregas:**
- **Arquitetura completa do sistema:** geração, assinatura digital (A1) e publicação de editais; workflow de inscrição e aprovação de beneficiários.  
- **Módulo de assinatura digital seguro:** assinatura via certificado A1, hash persistente validável e rastreabilidade jurídica.  
- **API geográfica de cidades limítrofes**, com cache e vinculação recursiva de fronteiras para geração automática de editais regionais.  
- **Automação de deploy via GitLab CI**, transformando processos manuais em pipelines reprodutíveis mesmo em servidores limitados.  
- **Interfaces Angular** desenvolvidas com coerência entre regras de negócio e usabilidade.

**Stack:** Java · Spring Boot · Angular · GitLab CI (on-prem) · PostgreSQL · SQL Server · Certificados Digitais A1  

**Impacto:**  
Digitalização e automação de processos públicos antes manuais.  
**Assinaturas juridicamente válidas, integração geográfica precisa e publicação automatizada** — entregas de engenharia com valor institucional.

---

### 🔹 **OSF Digital / Porto Bank (Porto Seguro) — Observabilidade e Microsserviços**

Atuação como **consultor de engenharia**, colaborando com equipes da **Porto Bank**, fintech da Porto Seguro, em um ambiente composto por dezenas de microsserviços Java.  
Foco em **observabilidade, estabilidade e rastreabilidade de integrações REST**.

**Principais entregas:**
- **Implantação de logs detalhados de integrações REST via Spring**, utilizando interceptors e *injectors* para rastrear chamadas entre serviços;  
  - Permitiu **monitorar falhas, latência e comportamento das APIs** com precisão;  
  - Aumentou significativamente a capacidade de diagnóstico e análise de incidentes.  
- **Ajustes de monitoramento e apoio à manutenção de microsserviços:**  
  - Revisão de logs, correções pontuais e aprimoramentos em aplicações distribuídas;  
  - Melhoria de dashboards e alertas de erro para maior visibilidade operacional.  
- **Execução de processos de deploy via Jenkins e Terraform:**  
  - Execução e validação de dezenas de microsserviços no ambiente da Porto Bank;  
  - Análise pós-deploy para confirmar estabilidade e integridade das comunicações REST.

**Stack:** Java · Spring Boot · Jenkins · Terraform (execução) · Microsserviços · ELK · Observabilidade  

**Impacto:**  
Ampliação da **visibilidade operacional e rastreabilidade das integrações REST** em um ambiente extenso e distribuído.  
Atuação técnica pontual, porém precisa — **engenharia prática e estável mesmo sob restrição.**

---

### 🔹 **Viasoft — Liderança Técnica e Consolidação como Engenheiro Java**

Entrada como **desenvolvedor pleno** (Delphi) e ascensão a **líder técnico e de produto**.  
Período em que **me reestruturei como engenheiro Java**, assumindo arquitetura, time e produto.

**Principais entregas:**
- **Reestruturação completa de sistema REST** originalmente feito com *singletons*, migrando para arquitetura escalável e *stateless*.  
- **Liderança técnica e de produto:** definição de padrões, revisão de código, priorização de entregas e atuação como Scrum Master.  
- **Plataforma de Vendas (Java + Angular + Android)** — **principal produto sob minha liderança direta**:  
  - Módulo web administrativo e app Android de campo;  
  - Estabilização completa, correção de falhas e melhoria de performance;  
  - Evolução contínua baseada em feedback de usuários e revendedores.  
- Apoio técnico a outros sistemas corporativos: ERP Viasoft, Roteirizador Logístico, Hub de Marketplaces e Relatórios Gerenciais.  
- **Treinamento e padronização do time**, consolidando práticas e estabilidade de builds.

**Stack:** Java · Spring Boot · Angular · Android · REST · Jenkins · PostgreSQL · Scrum  

**Impacto:**  
Transformação de sistemas instáveis em plataformas previsíveis e escaláveis.  
**Liderança completa da Plataforma de Vendas (web + Android)**.  
Marco de virada — transição definitiva de Delphi para Java, consolidando maturidade técnica e visão de produto.

---

## ⚙️ **Projeto Proprietário — Automação Visual com IA**

Desenvolvimento de uma **plataforma SaaS própria** voltada à **automação e otimização de processos visuais com suporte de inteligência artificial**.  
Criação completa da arquitetura, infraestrutura e lógica de negócio — de ponta a ponta.

**Principais entregas:**
- **Backend escalável e processamento paralelo automatizado**, garantindo previsibilidade e custo controlado;  
- **Fluxo inteligente de automação visual**, com integração entre módulos e controle de execução distribuída;  
- **Interface de operação limpa e responsiva**, projetada para máxima eficiência técnica;  
- **Sistema de autenticação e billing modular**, com suporte a múltiplos fluxos de uso e crescimento horizontal;  
- **Infraestrutura distribuída e pipelines assíncronos**, otimizados para disponibilidade e estabilidade.  

**Impacto:**  
Concepção e entrega de um produto completo, projetado para operar de forma autônoma e escalável.  
Expressão prática da engenharia de software aplicada a produto real, **sem dependência de terceiros e com domínio técnico integral.**

---

## 📈 **Conclusão Prática**

Engenheiro full stack com foco em **sistemas escaláveis, previsíveis e sustentáveis**.  
Atuação que une **estrutura, raciocínio e entrega real** — sem improviso.  
O objetivo não é parecer complexo, é **ser consistente**.
