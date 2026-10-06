---
layout: default
title: Notas de produção
---

Notas sobre sistemas em produção. Cargos, números e stack estão no [currículo]({{ '/cv.html' | relative_url }}).

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
