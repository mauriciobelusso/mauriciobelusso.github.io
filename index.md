---
layout: single
title: "Mauricio Belusso — Software Engineer"
description: "Systems that scale. Code that doesn’t break. Pragmatic, predictable, measurable engineering."
permalink: "/"
author_profile: false
classes: wide
share: false
toc: false
lang: en
last_modified_at: 2025-10-11
---

> Systems that scale. Code that doesn’t break.  
> Pragmatic, predictable, and measurable engineering.
{: .text-center}

---

## 🧩 **Engineering Principles**

- **Predictability over improvisation:** architecture is planning, not reaction.  
- **Sustainable performance:** optimization is not about speed — it’s about consistency.  
- **Functional simplicity:** fewer abstractions, more clarity.  
- **Complexity cost:** every *if* costs, every cache lies.  
- **Real scalability:** systems shouldn’t rely on luck, but on design.

---

## 🏢 **Professional Experience**

---

### 🔹 **Serasa (via Verx) — Judicial Systems and Anti-Fraud AI Engineering**

Senior consultant leading the **architectural and technical evolution** of the **judicial order processing system**, focused on performance, scalability, and operational intelligence.

**Key contributions:**
- **Complete redesign of the judicial annotation processing pipeline**, integrating with a **mainframe** and automating large-scale file reading;  
  - New flow processed **100k lines in under 15 minutes**, with automated validation and linking.  
- **Full digitalization of physical archives**, unifying multiple data sources and metadata standards.  
- **Authenticated WebSocket implementation (no SockJS)** for real-time communication between system modules.  
- **Resource optimization and autoscaling:** memory usage dropped from 2 GB to 300–400 MB; pods reduced from 12 to 2 while keeping heap under 1 GB.  
- **Database tuning with dynamic indexing** via **Mongock**, executed in background without blocking pod startup.  
- **Direct upload integration via signed URLs**, offloading the API layer.  
- **AI proof-of-concept** to interpret judicial orders, linking CPF and decisions while detecting potential fraud attempts.

**Stack:** Java · Spring Boot · WebSocket · MongoDB · Mongock · AWS S3 · Docker · Kubernetes · Microservices  

**Impact:**  
A lighter, faster, and predictable system.  
Automated high-volume processing with measurable stability — **cold, practical, and quantifiable engineering**.

---

### 🔹 **Softfocus — Structural Engineering and Banking Integrations**

Worked across multiple concurrent projects, evolving from hands-on developer to **architectural engineer**, focused on improving code quality, reducing systemic failures, and increasing delivery speed.

**Key contributions:**
- **Custom Dependency Injection framework** built over Struts, inspired by Spring, with annotation-based injection;  
  - Removed coupling and repetitive boilerplate.  
- **~70 % structural simplification**, merging redundant class hierarchies into a single typed core.  
- **Direct banking integration (Santander ↔ BACEN)**, replacing manual automation with API communication.  
- **Standardized, containerized environment** with predictable builds and fewer runtime errors.  
- **Reduced defects by over 60 %** and shortened delivery cycles.

**Stack:** Java · Struts · PostgreSQL · Docker · REST Integrations · Annotation-based DI  

**Impact:**  
Legacy modernization through structural clarity.  
**Cleaner, predictable, and scalable code** — a stable foundation for critical financial systems.

---

### 🔹 **Mirante Tecnologia — Digital Signature and Land Distribution System (INCRA)**

Served as **technical consultant for INCRA**, responsible for the **design, architecture, and development** of the **land distribution tender system**, combining digital signing, workflow automation, and municipal georeferencing.

**Key contributions:**
- **End-to-end system architecture:** generation, digital signing (A1), and publication of tenders; full registration and approval workflow.  
- **Secure digital signing module:** persistent hash validation, A1 certificate, and full auditability.  
- **Geographic API for neighboring cities**, with recursive caching for automatic regional tender generation.  
- **Automated deployment with GitLab CI**, transforming manual releases into reproducible pipelines — even under server constraints.  
- **Angular interfaces** aligned with business logic and user efficiency.

**Stack:** Java · Spring Boot · Angular · GitLab CI (on-prem) · PostgreSQL · SQL Server · A1 Certificates  

**Impact:**  
Digitized and automated formerly manual government processes.  
**Legally valid signatures, precise geospatial integration, and automated publication** — institutional-grade software engineering.

---

### 🔹 **OSF Digital / Porto Bank (Porto Seguro) — Observability and Microservices**

Engineering consultant collaborating with **Porto Bank**, a fintech subsidiary of Porto Seguro, in a large-scale **Java microservices** ecosystem.  
Focus on **observability, stability, and REST integration tracing**.

**Key contributions:**
- **Detailed REST logging via Spring interceptors**, tracing service-to-service calls for error, latency, and behavior tracking.  
  - Greatly improved diagnostic capability and incident visibility.  
- **Enhanced monitoring and reliability of distributed services:**  
  - Log audits, incident analysis, and small-scale corrective improvements;  
  - Dashboard and alert refinements for clearer operational insights.  
- **Deployment execution via Jenkins and Terraform:**  
  - Ran and validated 70+ microservices;  
  - Post-deployment checks ensuring REST communication integrity.

**Stack:** Java · Spring Boot · Jenkins · Terraform (execution) · Microservices · ELK Stack · Observability  

**Impact:**  
Expanded **operational visibility and traceability** in a distributed environment.  
Targeted, high-precision contributions — **practical and stable engineering under constraint.**

---

### 🔹 **Viasoft — Technical Leadership and Java Engineering Consolidation**

Joined as a **mid-level developer (Delphi)** and advanced to **technical and product lead**.  
Period of **transition into Java engineering**, taking ownership of architecture, team, and product direction.

**Key contributions:**
- **Full refactor of a REST system** initially built on *singletons*, migrating to a scalable, stateless design.  
- **Technical and product leadership:** code review standards, delivery prioritization, and Scrum Master role.  
- **Sales Platform (Java + Angular + Android)** — **primary product under my direct leadership:**  
  - Web admin module and Android field app;  
  - Stability and performance improvements across the stack;  
  - Continuous iteration based on reseller feedback.  
- Supported additional corporate systems: ERP, logistics router, marketplace hub, and reporting tools.  
- **Team training and process standardization**, ensuring stable builds and shared discipline.

**Stack:** Java · Spring Boot · Angular · Android · REST · Jenkins · PostgreSQL · Scrum  

**Impact:**  
Transformed unstable systems into predictable, scalable platforms.  
**Full leadership of the Sales Platform (web + Android)**.  
Turning point — migration from Delphi to Java, consolidating technical maturity and product vision.

---

## ⚙️ **Private Project — Visual Automation with AI**

Development of a proprietary **SaaS platform** focused on **visual process automation and optimization using artificial intelligence**.  
Responsible for architecture, infrastructure, and business logic — built entirely end-to-end.

**Key contributions:**
- **Scalable backend and automated parallel processing**, ensuring predictable cost and throughput.  
- **Intelligent visual automation flow**, linking modules with distributed execution control.  
- **Clean, responsive operational interface** designed for efficiency.  
- **Modular authentication and billing system**, supporting multiple usage flows and horizontal scaling.  
- **Distributed infrastructure and asynchronous pipelines** optimized for uptime and stability.

**Impact:**  
Complete product engineered for autonomous and scalable operation.  
A tangible expression of applied software engineering — **built independently, with full technical ownership.**

---

## 🟡 **Auri Manifesto — Value Without Noise**

Auri is a lightweight engineering framework focused on **predictable flow, measurable delivery, and zero theater**.  
It was born from real-world software delivery — stripping away ceremony to focus purely on value, evidence, and discipline.

> Framework: [The Auri Manifesto](https://auricore-labs.github.io/auri-manifesto)  
> Motto: *Flow, Value, and Clarity.*

---

## 📈 **Practical Conclusion**

Full-stack engineer focused on **scalable, predictable, and sustainable systems**.  
An approach that unites **structure, logic, and real delivery** — no improvisation.  
The goal isn’t to look complex. It’s to **be consistent**.
