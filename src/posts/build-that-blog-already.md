---
title: Build that blog already
description: What's holding you back from starting your blog? Sort through the real issues from the noise and start today.
date: 2021-08-20
tags: ["Web", "Tools"]
layout: layouts/post.njk
# tweetId: '1414934155750690836'
isSelect: false
featuredImage: build_a_blog_workshop_bxvuo9.jpg
---

<figure>
  <img src="{% src 'build_a_blog_workshop_bxvuo9.jpg' %}"
    srcset="{% srcset 'build_a_blog_workshop_bxvuo9.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Build a bear workshop logo with the bear overlayed with an RSS icon and the word bear overwritten with 'blog' by hand"
    width="600" height="400">
  <figcaption>This lovely promo image is courtesy of <a href="https://twitter.com/eleven_ty/status/1427657012184223752">Zach Leatherman</a></figcaption>
</figure>

This week I held a mini-workshop called [Let's build and deploy your blog already](https://gdg.community.dev/events/details/google-gdg-new-orleans-presents-lets-build-and-deploy-your-blog-already/). It was unexpectedly popular. I suspect this is because as humans, we all tend to procrastinate, and workshops are a great opportunity to finally get that to-do checked off.

I am a freelance developer and performance engineer. I now get more new clients from conversions on my blog than through word of mouth. It took a long time to get here, but you'll never arrive if you never start.

So what's holding you back from starting that tech blog? Don't know where to start? Feel like everything needs to be perfect first? In this post, I'll give you a few tips for making those brave first steps.

## So many tools are out there, what if I pick the wrong one?

Popular tools come and go like the wind. My advice is to pick the one that will be the easiest for you to consistently blog. Secondarily, if you like tinkering, consider how you like interacting and customizing that tool.

Don't worry about whether it's the hottest new framework. You won't get a job based on which framework you used to build your blog. You'll get a job because you're actually writing interesting content on your blog. Content is king, not the framework.

Some things to consider when selecting tools:

- Make sure it's in a language you like. Don't pick a Ruby-based tool if you prefer JavaScript.
- Consider how easy it is to build and deploy.
- Consider user experience, including performance. If you're loading a giant JavaScript bundle for your framework that means a longer load time for your readers.

For me, [Eleventy](https://www.11ty.dev/) paired with [Netlify](https://netlify.com/) checks all the right boxes. It's JavaScript-based but sends no client-side JavaScript to the browser. I can write HTML, Markdown, Nunjucks, and many other templating languages. Build times are fast, and deploying with Netlify only requires a `git push` to GitHub. That's me though - find the tool that will work best for you.

<aside>Want to get a flavor of Eleventy? Check out my post <a href="/posts/itsiest-bitsiest-eleventy-tutorial/">Itsiest, Bitsiest Eleventy Tutorial</a>. If you like it, check out some of the <a href="https://www.11ty.dev/docs/starter/">starter projects</a>. I forked the eleventy-base-blog on into my <a href="https://github.com/siakaramalegos/11ty-sia-blog">own starter</a>. With one click, you can <a href="https://app.netlify.com/start/deploy?repository=https://github.com/siakaramalegos/11ty-sia-blog">deploy to Netlify</a> or Vercel while generating a GitHub repo.</aside>

## No one will read my posts unless they're on [insert platform here], right?

Yes and no. You might not have a lot of readers in the beginning. That's totally fine. The numbers will come in time. The good news is you don't have to pick hosting your own blog over posting on Dev.to or other platforms. You can do both. This is called **syndication**.

Sometimes platforms die, and if you only have your content hosted there, you can lose it all.

To properly syndicate without an SEO penalty, you need to set the canonical URL both on your original post and on syndicated copies. If you inspect the `<head>` tag on any page on my blog, you'll see its corresponding canonical URL meta tag:

```html
<link rel="canonical" href="https://sia.codes/posts/itsiest-bitsiest-eleventy-tutorial/">
```

In Eleventy, I can programmatically set this in my base layout like so:

{% raw %}
```html
<link rel="canonical" href="https://sia.codes{{ page.url }}">
```
{% endraw %}

Other tools should have similar capabilities.

You also need to set the canonical URL on other publishers when you copy your posts there. Each one is different, but I'll highlight [Dev.to](https://dev.to/) here. Dev is very canonical-URL friendly.

<figure>
  <img src="{% src 'dev_canonical_link_sia_karamalegos_okusux.jpg' %}"
    srcset="{% srcset 'dev_canonical_link_sia_karamalegos_okusux.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="Post on Dev.to with linked 'Originally published at sia.codes' text that goes to the my original post"
    width="1818" height="1592">
  <figcaption>Unlike many publishers, Dev.to will highlight where the article is originally published</figcaption>
</figure>

To set the canonical URL, when you're editing the post, you'll see a small hexagonal button next to the "Save changes" button. Click the hexagon to get to the canonical URL settings.

<figure>
  <img src="{% src 'dev_canonical_settings_sia_karamalegos_b2zhsc.jpg' %}"
    srcset="{% srcset 'dev_canonical_settings_sia_karamalegos_b2zhsc.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="Save changes button followed by a hexagonal icon and then a Revert changes link."
    width="1950" height="430">
  <figcaption>Click the hexagonal icon to add the canonical URL.</figcaption>
</figure>

Eventually, learn more about SEO and optimize the timing on when you syndicate. In the beginning, you don't need to worry about it.

## But I want dark mode, social share images, a great design, etc.

Feature wishlist creep can hold you back from accomplishing anything. I know because [I've been there](/posts/how-to-build-a-website/).

Just build and deploy a minimally-viable-blog (MVB). Like right now. Today. If you don't, you'll never be motivated enough to improve it. Let the shame work to your advantage.

### Forms

Many of us want a way for people to be able to contact us through our website. As a woman in tech, I don't necessarily want to share my email address so openly. In the old days, we would need a server or a third-party widget to handle contact forms.

Today, Netlify includes form handling for up to 100 submissions per month for free! Implementing it is mostly setting a `netlify` attribute on the form then setting up notifications in Netlify:

```html
<form name="contact" method="POST" netlify>
```

Netlify automatically filters out most spam, and you can add a honeypot field to help filter out bots. Check out the [docs](https://docs.netlify.com/forms/setup/) for more info.

## Conclusion

Your blog isn't the goddess Athena. It's not going to [pop fully formed and all grown up out of your head](https://www.greekmythology.com/Myths/The_Myths/Birth_of_Athena/birth_of_athena.html). You aren't Zeus.

Stop procrastinating, and build your minimally-viable-blog today. Yes, today! Deploy it! Yes, right now! Before you close that tab!
