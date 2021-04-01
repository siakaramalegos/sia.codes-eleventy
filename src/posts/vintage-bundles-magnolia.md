---
title: Vintage Bundles talk at Magnolia JS
description: What are some strategies for serving modern JavaScript to modern browsers?
date: 2020-04-21
tags: ['JavaScript', 'WebPerf']
layout: layouts/post.njk
tweetId: '1252703197904408577'
isSelect: false
featuredImage: vintage-bundles_anqbiu.jpg
---

<figure>
  <img src="{% src 'vintage-bundles_anqbiu.jpg' %}"
    srcset="{% srcset 'vintage-bundles_anqbiu.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Title slide from talk"
    width="2400" height="1600">
</figure>

More developers are starting to understand that web performance matters. From higher mobile search rankings to bottom-line revenue impacts, performance can make or break your web app. However, fixing performance can feel like a quagmire of expert-level nuanced understanding on so many topics. What would you think if I told you you could cut your JavaScript bundle size up to 50% by doing one thing only? Nearly 90% of worldwide web traffic runs on modern browsers, but we're transpiling all of our JavaScript down to ES5. That transpilation has a cost.

In this talk, we'll learn about differential serving, or serving modern bundles to modern browsers and legacy, transpiled bundles to older browsers. We'll talk about strategies, what to watch out for, and how to implement it using webpack. This talk is framework agnostic, and it's best if you have at least a basic understand of JavaScript.

[Magnolia JS](https://magnoliajs.com/) was my second virtual conference, and I had a blast participating. This video is the full day 1 video, but the embed should play only my talk by default. Check out the other talks that day too! Enjoy!

{% set videoTitle = "Vintage Bundles by Sia Karamalegos [ Magnolia JS ]" %}
{% set videoId = "Qkc8p4D6JM0" %}
{% set params = "start=10260&end=11280" %}
{% include 'youtube.njk' %}
