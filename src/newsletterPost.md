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
  description: "sia.codes newsletter post for {{ newsletterPost.publish_date | readableDateFromISO }}. Don't miss a new post - sign up today!"
  date: "{{ newsletterPost.publish_date | readableDateFromISO }}"
permalink: "newsletter/{{ newsletterPost.slug }}/index.html"
---

<section class="flow">
  <p class="lead">Newsletter published on {{ date }}</p>

  {{ newsletterPost.body | safe }}

  [← Newsletter Home](/newsletter)

<section class="flow">
