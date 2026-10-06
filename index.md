---
layout: default
title: Notas de produção
---

Engenheiro de backend. Escrevo o que já medi em JVM, fila e custo de pod. Os números são os do [currículo]({{ '/cv.html' | relative_url }}), com o mecanismo em volta.

<ul>
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    — {{ post.date | date: "%d.%m.%Y" }}
    {% if post.tags.size > 0 %}
    <br>
    {% for tag in post.tags %}{{ tag }}{% unless forloop.last %} · {% endunless %}{% endfor %}
    {% endif %}
    <br>
    {{ post.excerpt | strip_html }}
  </li>
  {% endfor %}
</ul>
