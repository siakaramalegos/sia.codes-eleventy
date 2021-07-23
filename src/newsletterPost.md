---
layout: layouts/newsPost.njk
tags:
  - newsletter
pagination:
  alias: newsletterPost
  data: newsletterPosts
  size: 1
  addAllPagesToCollections: true
eleventyComputed:
  title: "{{ newsletterPost.subject }}"
  description: "sia.codes newsletter post for {{ newsletterPost.date | readableDate}}. Don't miss a new post - sign up today!"
permalink: "newsletter/{{ newsletterPost.slug }}/index.html"
---

<section class="flow">

{{ newsletterPost.body | safe }}

[← Newsletter Home](/newsletter)

<section class="flow">
