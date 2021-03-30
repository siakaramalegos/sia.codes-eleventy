---
title: Webmentions + Eleventy Talk
description: Slides and resources from my talk at JamStack Toronto.
date: 2020-11-10
updated: 2020-12-23
tags: ['IndieWeb', 'Eleventy']
layout: layouts/post.njk
tweetId: '1326601057179406338'
isSelect: true
featuredImage: webmentions-eleventy_kxnyud.jpg
---

<figure>
  <img src="{% src "webmentions-eleventy_kxnyud.jpg" %}"
    srcset="{% srcset "webmentions-eleventy_kxnyud.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="two heart-shaped balloons"
    width="3360" height="1972">
  <figcaption>Photo background by <a href="https://unsplash.com/@akshar_dave?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Akshar Dave</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

Webmentions are an exciting standard which help enable the IndieWeb. We can own our own content, hosted on our own domains, without sacrificing social connection and replies with other people!

In this talk, I discuss what webmentions are and how to implement them. The code is based on an Eleventy site, but the concepts should be applicable to any site.

{% set videoTitle = "Webmentions + Eleventy by Sia Karamalegos [ Jamstack Toronto ]" %}
{% set videoId = "zjHb4xtnTvU" %}
{% include 'youtube.njk' %}

## Slides

The latest slides can be accessed at [projects.sia.codes/webmentions-eleventy-talk/](https://projects.sia.codes/webmentions-eleventy-talk/#/). To advance the slides, use `n` for next and `p` for previous. The right arrow jumps to the next section (and left for previous section). Up and down to advance through slides within a section.

## Resources

Follow my [In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/) for a step-by-step guide to get started. It includes links to many great resources and prior art.

The [slides](https://projects.sia.codes/webmentions-eleventy-talk/#/) are built as a live website, so all resource links mentioned are directly clickable.

Are you here for possums and image manipulation? Links to my source images are on the last slide. You can duotone your own varmint photos using [Duotone by ShapeFactory](https://duotone.shapefactory.co/).
