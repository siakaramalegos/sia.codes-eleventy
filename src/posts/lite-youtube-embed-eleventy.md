---
title: Faster YouTube embeds in Eleventy
description: Use lite-youtube-embed in Eleventy for faster and more privacy-minded video
date: 2021-04-07
tags: ['Eleventy', 'Video', 'WebPerf']
layout: layouts/post.njk
# tweetId: '1337612682275459073'
isSelect: true
featuredImage: "after-lite-yt_boupli.jpg"
---

Video is great, but the default YouTube embed share is both bloated and not privacy-minded. I finally switched my YouTube embeds to [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) by [Paul Irish](https://twitter.com/paul_irish), and it's fantastic. It loads "faster than a sneeze" and uses the no-cookie version by default.

This post will explain how to set up a reusable lite-youtube-embed "component" using Nunjucks partials in an Eleventy project.

<figure>
  <img src="{% src 'before-lite-yt_ledsqn.jpg' %}"
    srcset="{% srcset 'before-lite-yt_ledsqn.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Screenshot of performance scores in Lighthouse (71)"
    width="1846" height="812">
  <figcaption>Lighthouse scores before implementing lite-youtube-embed</figcaption>
</figure>

<figure>
  <img src="{% src 'after-lite-yt_boupli.jpg' %}"
    srcset="{% srcset 'after-lite-yt_boupli.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Screenshot of performance scores in Lighthouse (97)"
    width="1846" height="812">
  <figcaption>Lighthouse scores after implementing lite-youtube-embed</figcaption>
</figure>

## Step 1: Get the source code

This step will vary depending on how you currently load JavaScript in your Eleventy application. I try to keep my blog as minimal as possible, so I have no significant client-side JS. Thus, I chose to download the JavaScript file instead of adding the npm package and a bundle step. If you already have a bundler set up, then add the npm package instead.

These steps describe how to add it to an Eleventy project with no JavaScript files yet:

1. Add the source code [JavaScript file](https://github.com/paulirish/lite-youtube-embed/blob/master/src/lite-yt-embed.js) to a /javascript/ folder in your project.
2. Update the Eleventy config to pass the /javascript/ folder through to our build:

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {

  // Copy all files in the JavaScript folder to our output directory.
  eleventyConfig.addPassthroughCopy("src/javascript");

  // more config stuff...
```

<aside>I choose to organize my source code in an <strong>/src/</strong> folder (my input directory). If your code is in the root of your project, then ignore mentions of <strong>/src/</strong>  in this post.</aside>

Additionally, we need to grab the [CSS from the source code](https://github.com/paulirish/lite-youtube-embed/blob/master/src/lite-yt-embed.css). For simplicity, I copied it into my existing CSS file since the content wasn't that long. If your video looks weird after implementing, your project's existing styles are probably impacting it. For example, I had some iframe styles that caused the video to shift down inside its container.

## YouTube partial

Now, we need to create a new template for a YouTube video. I'm using Nunjucks to create a video "component". In the **/_includes/** folder, create a youtube.njk file with the following content:

{% raw %}
```html
<!-- src/_includes/youtube.njk -->

<!-- Load the JS only when the component is needed -->
<script src="/javascript/lite-yt-embed.js"></script>

<!-- Web component for lite-youtube-embed -->
<lite-youtube videoid="{{ videoId }}" style="background-image: url('https://i.ytimg.com/vi/{{ videoId }}/hqdefault.jpg');" {% if params %} params="{{ params }}"{% endif %}>
  <button type="button" class="lty-playbtn">
    <span class="lyt-visually-hidden">Play Video: {{ videoTitle }}</span>
  </button>
</lite-youtube>
```
{% endraw %}

The web component will use up to 3 parameters:

- `videoId` - the id of the YouTube video which you can grab from its URL. For example, "XecoxR1ckbc" is the id of the video in this URL: https://www.youtube.com/embed/XecoxR1ckbc
- `videoTitle` - the video title
- `params` - optional params like `start` and `end` times

I chose to defer the YouTube script loading for progressive enhancement. Our tiny bit of JavaScript from lite-youtube-embed will always load. But, the larger code from YouTube will only load if a user clicks on the video to play it. See the [readme](https://github.com/paulirish/lite-youtube-embed/blob/master/readme.md) if you'd like to always load the YouTube scripts regardless.

## Using the new YouTube partial

Now that our set up is complete, we can use our new "component" in any file. First, we set the variables that pass through to the component, then we include the partial. This example also illustrates how to add a start and end time to the optional params:

{% raw %}
```html
<!-- In any other file (e.g., a blog post): -->
{% set videoTitle = "Vintage Bundles by Sia Karamalegos [ Magnolia JS ]" %}
{% set videoId = "Qkc8p4D6JM0" %}
{% set params = "start=10260&end=11280" %}
{% include 'youtube.njk' %}
```
{% endraw %}

You can see it in action with this video about webmentions! The live video:

{% set videoTitle = "Webmentions + Eleventy by Sia Karamalegos [ Jamstack Toronto ]" %}
{% set videoId = "zjHb4xtnTvU" %}
{% include 'youtube.njk' %}

What my source code looks like:

{% raw %}
```html
+{% set videoTitle = "Webmentions + Eleventy by Sia Karamalegos [ Jamstack Toronto ]" %}
+{% set videoId = "zjHb4xtnTvU" %}
+{% include 'youtube.njk' %}
```
{% endraw %}

What the compiled HTML looks like (Eleventy output):

```html
<div class="videoWrapper">
  <iframe loading="lazy" title="Webmentions + Eleventy by Sia Karamalegos [ Jamstack Toronto ]" width="560" height="315" src="https://www.youtube.com/embed/zjHb4xtnTvU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

## Conclusion

Switching to [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) can greatly improve our load performance. It also better protects the privacy of our users. We can use HTML templates in Eleventy to create a YouTube video component, making reuse a breeze.
