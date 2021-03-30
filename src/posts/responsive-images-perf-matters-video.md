---
title: Responsive, Performant Images for the Web
description: Learn to optimize your images for the web in this video from PerfMatters Conf.
date: 2020-04-17
updated: 2020-12-17
tags: ['Images', 'WebPerf']
layout: layouts/post.njk
tweetId: '1251260214051045376'
isSelect: true
featuredImage: images-slide_c4ox2n.jpg
---

<figure>
  <img src="{% src 'images_slide_rmqvoj.jpg' %}"
    srcset="{% srcset 'images_slide_rmqvoj.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Title slide from talk"
    width="2432" height="1211">
</figure>

Want to learn how to make your images more responsive and more performant? Haven't gotten a chance to read that book/article/doc on web performance for images yet?

I spoke at my first virtual conference, PerfMatters Conf, and luckily they recorded it. This talk is a great intro into all things images for the web. Enjoy!

<aside>Images account for 50% of the bytes downloaded to load a website. How can you make sure that your users only download the smallest image necessary while preserving image quality?</aside>

In this talk, I focus on the underlying concepts in HTML and CSS for serving responsive images, which you can take with you no matter which tool you use. Which file formats suit which image types best? How can you use art direction in images to show the best image for a viewport layout?

{% set videoTitle = "Responsive Images for the Web" %}
{% set videoId = "XecoxR1ckbc" %}
{% include 'youtube.njk' %}
