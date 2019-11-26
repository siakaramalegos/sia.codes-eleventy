---
title: Show conditional Twitter intents with Eleventy
description: Encourage users to retweet or share a post based on whether a Tweet already exists for your blog post.
date: 2019-11-26
tags: ['IndieWeb', 'Eleventy']
layout: layouts/post.njk
---

![Mobile phone laying on table with blue screen and Twitter logo showing](/img/twitter-phone.jpg)

In today's episode of Making Sia's Blog Better™️, I wanted to better encourage readers to engage in the conversation about my blog posts. I used [Eleventy](https://www.11ty.io/) to build my blog and recently added [Webmentions](https://indieweb.org/Webmention), which are a really cool way of making self-hosted blogs a bit more engaging without implementing comments. You can check them out at the bottom of this page.

Currently, most of the interaction associated with my posts are through Twitter or syndicated copies on [Dev.to](https://dev.to/thegreengreek) with a canonical link. Unfortunately, we don't have a way to integrate Dev.to with webmentions yet, so my primary focus was increasing engagement through Twitter that will actually help populate the article's webmentions.

## Twitter web intents

[Web intents](https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview) are the simplest way to add Twitter interactions on a website. You can build a link to compose, retweet, like, find, and more without the annoyance of added JavaScript or user tracking. Twitter wants you to use JavaScript, but the links work without it as well:

```html
<a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456">Reply</a>
<a href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
<a href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a>
```

## Webmentions

If you aren't already familiar with webmentions, the connection between them and Twitter through [Bridgy](https://brid.gy/) only scans your own Twitter account. Readers might not be familiar with this, so if they want a comment to actually show up on the blog, they need to reply to one of my tweets that contains a link to the post. I'll call this a "target tweet"

But what if I don't always have a tweet for that post? 🤔

## Conditional share component

Luckily with Eleventy and Nunjucks (or whatever templating format you use), we can set up a Twitter sharing box that uses different intents based on whether a target tweet has been specified.

Let's define what the box options should be...

If a target Tweet doesn't exist, then we want a box that looks like this where "share it" is for a fresh share and "find the conversation" searches Twitter for tweets with the post's URL:

<div class="share-well" style="margin-bottom:40px">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"><path fill="#55acee"
      d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>
  <p>If you liked this article and think others should read it, please <a href="#" target="_blank" rel="noopener">share it</a>. Or, <a href="#">find the conversation</a> on Twitter.</p>
</div>


If a target Tweet does exist, then we want a box that looks like this where "Join the conversation" replies to the target tweet, and "retweet", well, retweets the target tweet:

<div class="share-well" style="margin-bottom:40px">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"><path fill="#55acee" d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>
  <p><a href="#">Join the conversation</a> on Twitter. Or, if you liked this article and think others should read it, please <a
        href="#" target="_blank" rel="noopener">retweet it</a>.</p>
</div>

## Code

First, if a post has a target tweet, add the tweet's ID to the post's front matter:

```yaml
title: My adventures in turning a Pixelbook into a developer machine
description: If you use Google Fonts, a few additional steps can lead to much faster load times.
date: 2018-12-07
tags: ['Tools']
layout: layouts/post.njk
tweetId: '1197670409543540738'
```

Next, we need a few helper filters (functions) to generate the more complex web intent URLs. I choose to define these in a separate filter file and then load them into my `.eleventy.js` - read more about how in my [post about implementing webmentions](https://sia.codes/posts/webmentions-eleventy-in-depth/#filters-for-build).

```javascript
// _11ty/filters.js
const rootUrl = require('../_data/metadata.json').url

module.exports = {
  generateShareLink: (url, text) => {
    const shareText = `${text} by @TheGreenGreek`
    const postUrl = `${rootUrl}${url}`
    return `https://twitter.com/intent/tweet/?text=${encodeURI(shareText)}&amp;url=${encodeURI(postUrl)}`
  },
  generateFindLink: (url) => {
    const postUrl = `${rootUrl}${url}`
    return `https://twitter.com/search?f=tweets&src=typd&q=${encodeURI(postUrl)}`
  },
```

Finally, in our post template, we can write a [Nunjucks conditional](https://mozilla.github.io/nunjucks/templating.html#if) that generates different content based on whether a target tweet exists:

{% raw %}
```html
<!-- _includes/layouts/post.njk -->
<div class="share-well">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"><path fill="#55acee" d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>

  <p>
    {% if tweetId %}
      <a href="https://twitter.com/intent/tweet?in_reply_to={{ tweetId }}">
        Join the conversation</a> on Twitter. Or, if you liked this article
        and think others should read it, please
        <a href="https://twitter.com/intent/retweet?tweet_id={{ tweetId }}">
          retweet it</a>.
    {% else %}
        If you liked this article and think others should read it, please
        <a href="{{ page.url | generateShareLink(description) }}">share it</a>.
        Or, <a href="{{ page.url | generateDiscussionLink }}">
          find the conversation</a> on Twitter.
    {% endif %}
  </p>
</div>
```
{% endraw %}

Voilà! Conditional Twitter intent links that fit the situation best. What kind of engagement strategies do you use on your website? Please share in the comments or on Twitter! 😉

<small>Cover photo by [Sara Kurfeß](https://unsplash.com/@stereophototyp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/twitter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)</small>
