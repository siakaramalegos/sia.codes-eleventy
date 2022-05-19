---
title: Explore JavaScript Dependencies With Lighthouse Treemap
description: Discover all JavaScript downloaded and used/unused for a site in a handy data visualization with Lighthouse Treemap.
shortDescription: Discover all JavaScript downloaded for a site and used vs unused in a handy data visualization.
date: 2021-08-02
updated: 2022-01-21
tags: ["WebPerf", "Tools", "Dev Tools"]
layout: layouts/post.njk
tweetId: "1422222213164457990"
isSelect: true
featuredImage: raphael-schaller-D6uxeDSylxo-unsplash_hpbbnp.jpg
---

<figure>
  <img src="{% src 'raphael-schaller-D6uxeDSylxo-unsplash_hpbbnp.jpg' %}"
    srcset="{% srcset 'raphael-schaller-D6uxeDSylxo-unsplash_hpbbnp.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="View of a roundabout from above surrounded by trees"
    importance="high"
    width="2000" height="1123">
  <figcaption>Find your way with Lighthouse Treemap. Photo by <a href="https://unsplash.com/@raphaelphotoch?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Raphael Schaller</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </a>
  </figcaption>
</figure>

Lighthouse Treemap is a new tool that helps us evaluate the efficiency of the JavaScript on our websites. It shows us:

- The bytes of JavaScript by file
- If sourcemaps are enabled, the bytes of JavaScript by module
- Bytes of JavaScript used versus unused (execution) for page load

JavaScript is often the biggest culprit when it comes to poor web performance. This tool can help us find our biggest dependencies and opportunities for improvement.

In this post, I'll cover:

- [What is Lighthouse Treemap?](#what-is-lighthouse-treemap%3F)
- [Existing similar tools](#existing-similar-tools)
- [The gap Lighthouse Treemap fills](#the-gap-lighthouse-treemap-fills)
- [Limitations](#the-limitations-of-lighthouse-treemap)
- [How do I access Lighthouse Treemap?](#how-do-i-access-lighthouse-treemap%3F)

## What is Lighthouse Treemap?

First, lets understand what a **treemap** is:

<blockquote>
  <p>Treemaps display hierarchical (tree-structured) data as a set of nested rectangles. Each branch of the tree is given a rectangle, which is then tiled with smaller rectangles representing sub-branches. A leaf node's rectangle has an area proportional to a specified dimension of the data.</p>
  <p class="blockquote-source">- from <a href="https://en.wikipedia.org/wiki/Treemapping">Treemapping</a> on Wikipedia</p>
</blockquote>

Below is an example Lighthouse Treemap from github.com. It contains 2 sections:

- The upper, larger part is the JavaScript treemap
- The bottom part is the JavaScript code coverage table

In the treemap section, the size of each rectangle represents the number of bytes for that script. The treemap also shows the actual number of bytes and percent of total bytes. White gaps in the grid separate each file. Rectangles inside the files represent the individual modules in those scripts:

<figure>
  <img src="{% src 'lighthouse-treemap-visual_opw8ua.jpg' %}"
    srcset="{% srcset 'lighthouse-treemap-visual_opw8ua.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Grid of rectangles on top of report, and table with single stacked bar charts on the bottom for each JavaScript file"
    loading="lazy"
    width="3356" height="1718">
  <figcaption>The Lighthouse Treemap is two reports: the treemap itself and a code coverage report.</a>
  </figcaption>
</figure>

To see module-level data, sourcemaps need to be enabled. This report from trello.com shows what the Lighthouse Treemap looks like without sourcemaps:

<figure>
  <img src="{% src 'lighthouse-treemap-no-sourcemaps_rvxmqj.jpg' %}"
    srcset="{% srcset 'lighthouse-treemap-no-sourcemaps_rvxmqj.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="The grid of rectangles on top only shows the outer/file rectangle but no module rectangles"
    loading="lazy"
    width="3360" height="1720">
  <figcaption>When sourcemaps are not found, only the file-level rectangles will show</a>
  </figcaption>
</figure>

In my experience, I've found reports often are a mixture of the two levels of data. Most third-party scripts will not show modules, and many first-party ones will.

Clicking "Toggle Table" will hide the coverage report and make the treemap larger, revealing more rectangles. We can click on a rectangle to zoom in on it and see its dependencies better. To return, click on the title above the rectangle. Here's a short video demonstrating these actions (and more!):

{% set videoTitle = "Lighthouse Treemap: Toggle table and dive deeper in the tree" %}
{% set videoId = "oigOsQkhyVc" %}
{% include 'youtube.njk' %}

The Chrome team went one step farther by adding the code coverage report. Underneath the treemap, we can see how much of our JavaScript was actually used on page load, for each file. You can also click "Unused Bytes" in the top right corner of the treemap to see unused bytes on the treemap:

<figure>
  <img src="{% src 'lighthouse-treemap-unused-bytes_c9i8ee.jpg' %}"
    srcset="{% srcset 'lighthouse-treemap-unused-bytes_c9i8ee.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="The grid of rectangles on top only shows the outer/file rectangle but no module rectangles"
    loading="lazy"
    width="3358" height="1714">
  <figcaption>When sourcemaps are not found, only the file-level rectangles will show</a>
  </figcaption>
</figure>

This is pretty slick as deep-diving on the treemap will show unused bytes for each module too.

{% include 'newsletter-aside.njk' %}

## Existing similar tools

The Lighthouse Treemap functionality is similar to two existing toolsets. First, the Coverage tool in Chrome is almost the same tool as the bottom part of the treemap. Second, the treemap itself is very similar to bundle analyzers.

### Chrome's Coverage tool

The [Coverage tool](https://developer.chrome.com/docs/devtools/coverage/) already exists in Chrome Dev Tools. The original tool also lists CSS files and used vs unused CSS bytes. You can interact with the page to see the percent used bytes increase.

To access and use it:

1. Open Dev Tools
2. Type _Cmd + Shift + p_ to open the search tool
3. Type "coverage" and click on the Show Coverage drawer
4. You might need to drag the drawer higher to see it
5. Click the reload button to start a new report
6. Interact with the page and see how the JavaScript and CSS usage goes up

{% set videoTitle = "Coverage tool in Chrome Dev Tools" %}
{% set videoId = "WH3pCYZgEEA" %}
{% include 'youtube.njk' %}

### Bundle analyzers

The treemap itself is very similar to bundle analyzers. [Webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) is one of my favorites. These tools help you understand the size of all the bundles (and modules) that your application code generates.

I deployed the output in this [webpack-bundle-analyzer example](https://projects.sia.codes/webpack-bundle-analyzer-example/) so you can interact with it live. Or, you can watch this quick demonstration:

{% set videoTitle = "webpack-bundle-analyzer demo" %}
{% set videoId = "LlmI5M-TK2k" %}
{% include 'youtube.njk' %}

You might have noticed a key difference in what bundle analyzers show you versus Lighthouse Treemap...

## The gap Lighthouse Treemap fills

Bundle analyzers are great, but they do not show which bundles are loaded and used on your site. The closest tool I've seen that shows this is the [Next.js](https://nextjs.org/) build script output:

<figure>
  <img src="{% src 'next-js-bundle-size-output_dhke6c.jpg' %}"
    srcset="{% srcset 'next-js-bundle-size-output_dhke6c.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Terminal output listing pages and chunks as well as their sizes and how much is used for first load"
    loading="lazy"
    width="1802" height="1040">
  <figcaption>Next.js build output will list page/route and chunk sizes</a>
  </figcaption>
</figure>

I love how Next.js differentiates the chunks and bytes used for the initial load. This output would be great to pass through a budget tool to prevent commits/PRs from exceeding a target amount of JavaScript.

It is a handy tool, but it doesn't give me much introspection into which modules are the heaviest. I need this knowledge so I can improve or replace large dependencies. Finally, this and other bundle analyzers don't show me any third-party scripts loaded from outside the application code.

## The Limitations of Lighthouse Treemap

Lighthouse Treemap is not a Swiss army knife. You wouldn't want to prepare a gourmet dinner only using the tiny knife tool. Nor open a bottle of wine with the tiny corkscrew if you had a corkscrew dedicated to that job.

Lighthouse Treemap is great for evaluating the JavaScript chunks/files and modules needed for initial load. It visualizes relative sizes so you can quickly see the largest ones. And, you can apply a used/unused filter to find the most inefficient pieces of code.

Now we need to understand a few of its limitations:

- Sourcemaps are needed to show finer-grained details.
- The Coverage report is only for initial load.
- It doesn't show dependencies loaded later.

While sourcemaps are needed to get the most benefit, even without them I can see which chunks are largest. I can also see how many are core features versus third-party tracking scripts. You can run the dedicated Coverage tool to explore usage as you interact with the page. Your goal isn't 0% unused. Finally, for scripts loaded later, use the Network tab and bundle analyzers.

## How do I access Lighthouse Treemap?

Now that you know all about Lighthouse Treemap, how do you access it? It's now fully released in Lighthouse in Chrome! You can access it through many routes:

1. [Lighthouse](https://developers.google.com/web/tools/lighthouse) in Chrome Dev Tools
2. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
3. Running Lighthouse, downloading the JSON, and uploading it [here](https://googlechrome.github.io/lighthouse/treemap/?gzip=1)
4. Through the [Lighthouse Node CLI](https://github.com/GoogleChrome/lighthouse#using-the-node-cli)

Once you have a Lighthouse report (1, 2, or 4 from above), then you'll find the View Treemap button below the metrics:

<figure>
  <img src="{% src 'lighthouse-treemap-button_sdxkjh' %}"
    srcset="{% srcset 'lighthouse-treemap-button_sdxkjh' %}"
    sizes="{% defaultSizes %}"
    alt="Dev Tools with a Lighthouse report open showing the button between the metrics and screenshots sections"
    loading="lazy"
    width="3358" height="1718">
  <figcaption>Click on "View Treemap" to open a new tab with the Lighthouse Treemap</a>
  </figcaption>
</figure>

## Conclusion

Lighthouse Treemap is a welcome new tool in the web performance arsenal. It fills a much-needed gap in evaluating the JavaScript downloaded for initial page load. We can see which chunks are the largest, and which modules within those chunks are contributing most to our bundles. Finally, it visualizes how much JavaScript is unused so we can quickly find the worst offenders and take action.

Finally, Lighthouse Treemap helps me evaluate any website from the outside without having to add dependencies like bundle analyzers.

Have you tried out Lighthouse Treemap yet? Has it made measuring performance for your site easier? Let me know in the webmentions!

Don't miss a post. <a href="#inform">Sign up for my newsletter</a>!
