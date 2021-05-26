---
title: An In-Depth Tutorial of Webmentions + Eleventy
description: Add Webmentions to your Eleventy static site with this step-by-step tutorial.
date: 2019-11-22
updated: 2021-05-26
tags: ['IndieWeb', 'Eleventy']
layout: layouts/post.njk
tweetId: '1198282993678376961'
isSelect: true
translations:
  - language: français
    link: https://jamstatic.fr/2019/12/27/webmentions-eleventy/
featuredImage: hands-laptop_rdfolj.jpg
---

<figure>
  <img src="{% src "hands-laptop_rdfolj.jpg" %}"
    srcset="{% srcset "hands-laptop_rdfolj.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="hands on a laptop keyboard"
    width="1360" height="808">
  <figcaption>Photo by <a href="https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">NeONBRAND</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

I am a huge fan of the static site generator [Eleventy](https://www.11ty.io/) so far, and I was super excited to try out [Webmentions](https://indieweb.org/Webmention) with them.

<blockquote>
  <p>Webmention is a web standard for mentions and conversations across the web, a powerful building block that is used for a growing federated network of comments, likes, reposts, and other rich interactions across the decentralized social web.</p>
  <p class="blockquote-source">—from <a href="https://indieweb.org/Webmention">IndieWeb.org</a></p>
</blockquote>

They are a cool tool for enabling social interactions when you host your own content. Max Böck wrote an excellent post, [Static Indieweb pt2: Using Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/), which walks through his implementation. He also created an Eleventy starter, [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions), which is a basic starter template with webmentions support.

So why am I writing this post? Sadly, I started with the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog), and didn't notice the [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions) starter until after I had already built my site. I also struggled to fully build out the functionality, partly because I'm still an Eleventy n00b. So I wanted to share the detailed steps I used in the hopes that it will help more of you join the Indie Web.

<aside><strong>Prefer to learn by video?</strong> I gave <a href="/posts/webmentions-eleventy-talk/">talks</a> at Jamstack Toronto and Magnolia JS about the concepts behind Webmentions and adding them to an Eleveny project. Check out <a href="/posts/webmentions-eleventy-talk/">the recording</a>.</aside>

The perspective of this post is adding webmentions to an Eleventy site after the fact. The files, folders, and config architecture match the `eleventy-base-blog`, but you can likely use this as a starting point for any Eleventy site. Make sure you watch out for spots where your analogous architecture may be different.

The code in this post is a mash up of Max Böck's original post and [personal site](https://github.com/maxboeck/mxb), the [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions) starter, Zach Leatherman's [personal site](https://github.com/zachleat/zachleat.com), and the edits I made during my implementation. I am hugely grateful for their work, as I never would have gotten this far without it.

## The serverless deployment architecture

Before we get started, let's outline the setup. My setup uses Eleventy paired with Github and Netlify.

<figure>
  <img src="{% src "devops1_zpdojl.jpg" %}"
    srcset="{% srcset "devops1_zpdojl.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="Three entities: a laptop, Github, and Netlify"
    width="2048" height="1536">
  <figcaption>The three entities used in my "dev ops"</figcaption>
</figure>

If you're familiar with most Netlify setups, when I push my code to Github, that triggers a build a deploy on Netlify because the content of the `main` branch has been updated. We're going to add a [cache folder plugin](https://github.com/siakaramalegos/netlify-plugin-cache-folder) that will stay in our build between deploys. This is where we will save our webmentions so that we only need to import new ones on build.

<figure>
  <img src="{% src "devops2_zp9pji.jpg" %}"
    srcset="{% srcset "devops2_zp9pji.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="Arrow from laptop to Github for git push, then arrow from Github to Netlify to build and deploy"
    width="2048" height="1536">
  <figcaption>New commits trigger new deploys, and the _cache folder is preserved between builds</figcaption>
</figure>

Another cool tool we will use is [Github actions](https://github.com/features/actions) to fake a cron job to trigger deploys on a recurring schedule. This is so we can import new webmentions every X hours.

<figure>
  <img src="{% src "devops3_st2bd2.jpg" %}"
    srcset="{% srcset "devops3_st2bd2.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="New arrow from Github to Netlify showing new builds every 4 hours"
    width="2048" height="1536">
  <figcaption>Github actions sends a POST request to Netlify to trigger builds every 4 hours</figcaption>
</figure>

Finally, we need to save a secret API token for pulling our webmentions. We want to save that securely in our [Netlify environment variables](https://docs.netlify.com/configure-builds/environment-variables/). Then, we can use [`netlify-cli`](https://docs.netlify.com/cli/get-started/) to use that secret when running in our local environment.

<figure>
  <img src="{% src "devops4_ljulpj.jpg" %}"
    srcset="{% srcset "devops4_ljulpj.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="Arrow from laptop to Github for git push, then arrow from Github to Netlify to build and deploy"
    width="2048" height="1536">
  <figcaption>New commits trigger new deploys, and the _cache folder is preserved between builds</figcaption>
</figure>

## Step 1: Sign up for webmentions

First, we need to sign up with webmention.io, the third-party service that lets us use the power of webmentions on static sites.

1. Set up IndieAuth so that webmention will know that you control your domain. Follow the setup instructions [on their site](https://indieauth.com/setup).
2. Go to [webmention.io/](https://webmention.io/).
3. Enter your website's URL in the "Web Sign-In" input, and click "Sign in".

If your sign in was successful, you should be directed to the webmentions dashboard where you will be given two `<link>` tags. You should put these in the `<head>` of your website:

```html
<!-- _includes/layouts/base.njk -->
<link rel="webmention" href="https://webmention.io/sia.codes/webmention" />
<link rel="pingback" href="https://webmention.io/sia.codes/xmlrpc" />
```

You'll also be given an API key. We want to safely store that `WEBMENTION_IO_TOKEN` in our [Netlify environment variables](https://docs.netlify.com/configure-builds/environment-variables/).

<figure>
  <img src="{% src "env_netlify_k4m8k8.jpg" %}"
    srcset="{% srcset "env_netlify_k4m8k8.jpg" %}"
    sizes="{% defaultSizes %}"
    alt="Screenshot of Netlify site settings showing the WEBMENTION_IO_TOKEN variable"
    width="2554" height="794">
  <figcaption>In your Netlify dashboard, go to <strong>Site Settings > Build & Deploy > Environment</strong> to add WEBMENTION_IO_TOKEN and its value</figcaption>
</figure>

To use the environment variable locally while developing on your machine, install the [`netlify-cli`](https://docs.netlify.com/cli/get-started/):

```
npm install netlify-cli -g
```

And change your development server script to use `netlify dev`. It will use your build script save in Netlify and hydrate all environment variables. If your previous script set input and output directories in the command itself, you will need to [move those settings](https://www.11ty.dev/docs/config/) to your **.eleventy.js** config instead.

<aside>The original version of this article recommended using <a href="https://www.npmjs.com/package/dotenv">dotenv</a> for managing env variables. I've found that using <a href="https://docs.netlify.com/cli/get-started/">Netlify CLI</a> is easier for me and requires no extra scripts. If you prefer the dotenv method, see this <a href="https://gist.github.com/siakaramalegos/ad2ef00cf9eb53cdeb651cd9f751b89c">gist</a>.</aside>

You probably want some content in your webmentions. If you use Twitter, [Bridgy](https://brid.gy/) is a great way to bring in mentions from Twitter. First make sure your website is listed in your profile, then link it.

## How it's all going to work

When we run a build with `NODE_ENV=production`, we are going to fetch new webmentions from the last time we fetched. These will be saved in `_cache/webmentions.json`. These mentions come from the [webmention.io API](https://github.com/aaronpk/webmention.io#api).

When we do any build, for each page:

- From the webmentions cache in `_cache/webmentions.json`, only keep webmentions that match the URL of the page (for me, this is each blog post).
- Use a `webmentionsByType` function to filter for one type (e.g., likes or replies)
- Use a `size` function to calculate the count of those mentions by type
- Render the count with mention type as a heading (e.g., "7 Replies")
- Render a list of the mentions of that type (e.g., linked Twitter profile pictures representing each like)

## Fetching webmentions

First, we need to set up our domain as another property in our `_data/metadata.json`. Let's also add our root URL for use later:

```json
// _data/metadata.json
{
  //...other metadata
  "domain": "sia.codes",
  "url": "https://sia.codes"
}
```

Next, we'll add a few more dependencies:

```bash
$ npm install -D lodash node-fetch netlify-plugin-cache-folder
```

We will only request new webmentions in production builds. Thus, we need to update our `build` script to set the `NODE_ENV` in our `package.json`. This is the script that should be set as your Build Command in Netlify. To build locally, we'll need that environment variable locally. So add another script called `build:local`. For this to work, you main need to push these updates to Github so that Netlify has the new scripts:

```json
// package.json
{
  // ... more config
  "scripts": {
    "build": "NODE_ENV=production npx @11ty/eleventy",
    "build:local": "NODE_ENV=production netlify build",
    "start": "netlify dev",
    // more scripts...
}
```

To finish setting up our [cache folder plugin](https://github.com/siakaramalegos/netlify-plugin-cache-folder), we also need to create a **netlify.toml** file in the root of our project with the following contents:

```toml
[build]
  command   = "npm run build"

[[plugins]]
  package = "netlify-plugin-cache-folder"
```

Now we can focus on the fetch code. Okay, okay, I know this next file is beaucoup long, but I thought it was more difficult to understand out of context. Here are the general steps happening in the code:

1. Read any mentions from the file cache at `_cache/webmentions.json`.
2. If our environment is "production", fetch new webmentions since the last time we fetched. Merge them with the cached ones and save to the cache file. Return the merged set of mentions.
3. If our environment is not "production", return the cached mentions from the file

```javascript
// _data/webmentions.js
const fs = require('fs')
const fetch = require('node-fetch')
const unionBy = require('lodash/unionBy')
const domain = require('./metadata.json').domain

// Load .env variables with dotenv
require('dotenv').config()

// Define Cache Location and API Endpoint
const CACHE_FILE_PATH = '_cache/webmentions.json'
const API = 'https://webmention.io/api'
const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function fetchWebmentions(since, perPage = 10000) {
  // If we dont have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn('>>> unable to fetch webmentions: missing domain or token')
    return false
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`
  if (since) url += `&since=${since}` // only fetch new mentions

  const response = await fetch(url)
  if (response.ok) {
    const feed = await response.json()
    console.log(`>>> ${feed.children.length} new webmentions fetched from ${API}`)
    return feed
  }

  return null
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, 'wm-id')
}

// save combined webmentions in cache file
function writeToCache(data) {
  const dir = '_cache'
  const fileContent = JSON.stringify(data, null, 2)
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  // write data to cache json file
  fs.writeFile(CACHE_FILE_PATH, fileContent, err => {
    if (err) throw err
    console.log(`>>> webmentions cached to ${CACHE_FILE_PATH}`)
  })
}

// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH)
    return JSON.parse(cacheFile)
  }

  // no cache found.
  return {
    lastFetched: null,
    children: []
  }
}

module.exports = async function () {
  console.log('>>> Reading webmentions from cache...');

  const cache = readFromCache()

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`)
  }

  // Only fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    console.log('>>> Checking for new webmentions...');
    const feed = await fetchWebmentions(cache.lastFetched)
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed)
      }

      writeToCache(webmentions)
      return webmentions
    }
  }

  return cache
}
```

## Filters for build

Now that we've populated our webmentions cache, we need to use it. First we have to generate the functions, or "filters" that Eleventy will use to build our templates.

First, I like keeping some filters separated from the main Eleventy config so that it doesn't get too bogged down. The separate filters file will define each of our filters in an object. The keys are the filter names and the values are the filter functions. In `_11ty/filters.js`, add each of our new filter functions:

```javascript
// _11ty/filters.js
const { DateTime } = require("luxon"); // Already in eleventy-base-blog

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children.filter(entry => entry['wm-target'] === url)
  },
  size: (mentions) => {
    return !mentions ? 0 : mentions.length
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType])
  },
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  }
}
```

Now to use these new filters, in our `.eleventy.js`, we need to loop through the keys of that filters object to add each filter to our Eleventy config:

```javascript
// .eleventy.js
// ...Other imports
const filters = require('./_11ty/filters')

module.exports = function(eleventyConfig) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Other configs...
```

I do not have a sanitize HTML filter because I noticed the content data has a `text` field that is already sanitized. Maybe this is new or not true for all webmentions. I'll update this post if I add it in.

## Rendering mentions

Now we're ready to put it all together and render our webmentions. I put them at the bottom of each blog post, so in my `_includes/layouts/post.njk`, I add a new section for the webmentions. Here, we are setting a variable called `webmentionUrl` to the page's full URL, and passing it into the partial for the `webmentions.njk` template:

{% raw %}
```html
<!-- _includes/layouts/post.njk -->
<section>
  <h2>Webmentions</h3>
  {% set webmentionUrl %}{{ page.url | url | absoluteUrl(site.url) }}{% endset %}
  {% include 'webmentions.njk' %}
</section>
```
{% endraw %}

Now we can write the webmentions template. In this example, I will show links, retweets, and replies. First, I set all of the variables I will need for rendering in a bit:

{% raw %}
```html
<!-- _includes/webmentions.njk -->
  <!-- Filter the cached mentions to only include ones matching the post's url -->
  {% set mentions = webmentions | getWebmentionsForUrl(metadata.url + webmentionUrl) %}
  <!-- Set reposts as mentions that are `repost-of`  -->
  {% set reposts = mentions | webmentionsByType('repost-of') %}
  <!-- Count the total reposts -->
  {% set repostsSize = reposts | size %}
  <!-- Set likes as mentions that are `like-of`  -->
  {% set likes = mentions | webmentionsByType('like-of') %}
  <!-- Count the total likes -->
  {% set likesSize = likes | size %}
  <!-- Set replies as mentions that are `in-reply-to`  -->
  {% set replies = mentions | webmentionsByType('in-reply-to')  %}
  <!-- Count the total replies -->
  {% set repliesSize = replies | size  %}
```
{% endraw %}

With our variables set, we can now use that data for rendering. Here I'll walk through only "replies", but feel free to see a snapshot of how I handled the remaining sets in [this gist](https://gist.github.com/siakaramalegos/b1f7ded21f9ecddaee91e3f6d88e2e48).

Since replies are more complex than just rendering a photo and link, I call another template to render the individual webmention. Here we render the count of replies and conditionally plural-ify the word "Reply". Then we loop through the reply webmentions to render them with a new nunjucks partial:

{% raw %}
```html
<!-- _includes/webmentions.njk -->
<!-- ...setting variables and other markup -->
{% if repliesSize > 0 %}
<div class="webmention-replies">
  <h3>{{ repliesSize }} {% if repliesSize == "1" %}Reply{% else %}Replies{% endif %}</h3>

  {% for webmention in replies %}
    {% include 'webmention.njk' %}
  {% endfor %}
</div>
{% endif %}
```
{% endraw %}

Finally, we can render our replies using that new partial for a single reply webmention. Here, if the author has a photo, we show it, otherwise we show an avatar. We also conditionally show their name if it exists, otherwise we show "Anonymous". We use our `readableDateFromISO` filter to show a human-friendly published date, and finally render the text of the webmention:

{% raw %}
```html
<!-- _includes/webmention.njk -->
<article class="webmention" id="webmention-{{ webmention['wm-id'] }}">
  <div class="webmention__meta">
    {% if webmention.author %}
      {% if webmention.author.photo %}
      <img src="{{ webmention.author.photo }}" alt="{{ webmention.author.name }}" width="48" height="48" loading="lazy">
      {% else %}
      <img src="{{ '/img/avatar.svg' | url }}" alt="" width="48" height="48">
      {% endif %}
      <span>
        <a class="h-card u-url" {% if webmention.url %}href="{{ webmention.url }}" {% endif %} target="_blank" rel="noopener noreferrer"><strong class="p-name">{{ webmention.author.name }}</strong></a>
      </span>
    {% else %}
      <span>
        <strong>Anonymous</strong>
      </span>
    {% endif %}

    {% if webmention.published %}
        <time class="postlist-date" datetime="{{ webmention.published }}">
            {{ webmention.published | readableDateFromISO }}
        </time>
    {% endif %}
  </div>
  <div>
      {{ webmention.content.text }}
  </div>
</article>
```
{% endraw %}

## Bravely jumping into the black hole...
Does it work?!?! We can finally test it out. First run `npm run build:local` to generate an initial list of webmentions that is saved to the `_cache/webmentions.json` file. Then run your local development server and see if the rendering worked! Of course, you'll need to have at least one webmention associated with a page to see anything. 😁

You can see the result of my own implementation below. Good luck! Let me know how it turns out or if you find in bugs or errors in this post!

## Continue your journey by using Microformats

Keith Grant has a great write-up in his article [Adding Webmention Support to a Static Site](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/). Check out the "Enhancing with Microformats" section for an explanation and examples.

## Additional resources

- [Usando Webmentions en Eleventy](https://antonio.laguna.es/posts/usando-webmentions-en-eleventy/) by Antonio Laguna en español
- You can find the full code for my site on [Github](https://github.com/siakaramalegos/sia.codes-eleventy). It will evolve in the future, I'm sure, so you can focus on [this commit](https://github.com/siakaramalegos/sia.codes-eleventy/commit/d7318565917b1342b38d6b3bff4e3e548276afca) which has the bulk of my changes for adding webmentions.
- How I set up a "cron" job through Github actions to periodically rebuild my site on Netlify (to grab and post new webmentions) is covered in [Scheduling Netlify deploys with GitHub Actions](https://www.voorhoede.nl/en/blog/scheduling-netlify-deploys-with-github-actions/).
