---
title: How I converted speaking content to written with AI
description: Extend your content by using ChatGPT to generate blog posts from speaking transcripts
date: 2024-02-08
tags: ['AI', 'Tools']
layout: layouts/post.njk
featuredImage: "robot_typing_nzijkt.jpg"
---

If you've ever approached a blank page with an idea for a long blog post, you'll understand me when I say that it can be daunting. I can't count how many times I've though to myself "maybe I should go get a snack" while staring at that blank page. We'll do anything to procrastinate that step.

This time, I decided to try something new. I recently published a massive blog post about the [common causes of poor performance for Shopify sites](https://performance.shopify.com/blogs/blog/debugging-common-causes-for-slow-loading-in-shopify-liquid-storefronts). I used it as a learning experience for using ChatGPT to make that first, painful blank page step "easier" ("easy" being in the eyes of the beholder).

This post is more of a story about that learning experience. It doesn't include a lot of technical how-to steps but more the thinking and concepts around the approach. I hope it is helpful or at a minimum slightly entertaining.

## How I personally feel about AI

Before we get started, let me state that I'm currently not a fan of LLM and image generation AI tools. For one, I think the creators whose content they were trained off of should have been asked permission first. Secondly, it's created a massive wave of bad content and sometimes misinformation. If you haven't noticed yet, internet search results have gotten pretty shitty, first with SEO farmed content and now with the AI tools to do this at a scale never seen before.

All that being said, I can't just stick my head in the sand and ignore what is going on. For one, my company's leadership is a huge proponent of AI, and I still need an income. For another, I need to better understand how it works and where it works better/worse so that I can engage in the community with more informed views. AI is not going away. And, I do believe it is possible to make it a better tool in the future.

## The human intelligence (HI not AI) learning process

This all began begrudgingly in an internal, very informal training for ChatGPT. It started out with learning the basics of prompts. I'm not going to lie, these first prompts gave me some fun output: 

1. Tell me about lego
2. How do I build a LEGO city?
3. Can you recommend a good first building for my lego city? I like reading, movies, and dogs.

However, my [LEGO city hobby](https://www.instagram.com/siabuildsbricks/) was not going to get me very far in a practical use case of ChatGPT.

For the second part, we saw examples of how other people at my company have been using ChatGPT. Some of those examples were intriguing but most were not relevant to my own work activities. I'm a web performance expert so I help merchants make their websites faster. Part of this is creating content to help teach them to do it.

When it came to applying my learning, I first thought about getting it to help write a web perf blog post. That was... terrible. The training data on technical concepts, especially a niche area of web dev, is very poor and the outputs essentially sound like the worst SEO farmed version of a web performance blog regurgitating the same dated strategies that aren't usually the primary culprits for bad performance.

Remember when I said that some of the examples from fellow employees were intriguing? I noticed a pattern of more people using it to process meeting transcripts or folders worth of text content into summarized points. So, not asking it to create "original" content but to process existing content into another format. This makes sense when you think about the nature of LLMs. They were trained on what word should come after another word or patterns of how we put words together.

<aside>While asking GPT to summarize existing content had fewer errors or hallucinations, still be on your guard. My last employee review included a GPT summary of peer employee feedback which miscategorized one of my strengths as one of my weaknesses. In other words, the sentiment analysis was incorrect. Luckily, I have a manager who read through the original content and caught this error.</aside>

Thus, I finally had an idea with promise... I recorded a web performance workshop session and wanted to convert part of it into a blog post. First, in true developer style, I had to [bike shed](https://en.wiktionary.org/wiki/bikeshedding)/[yak shave](https://en.wiktionary.org/wiki/yak_shaving) a little and create a [bookmarklet to copy the meeting transcript from Gong](https://projects.sia.codes/gong-transcript/), but that's a story for another day.

## Creating the article draft: trial and error

You may be wondering, "Sia, why not just use the transcript directly?" May I present to you, Exhibit A:

> Sia: You start interacting so you can.
> Sia: Wait until after interaction, I make it feels a little bit like a hack but also it's a.
> Sia: When all these things pop up like I came to your site to see what you are serving. And now you're telling me to spin a wheel for.
> Sia: I haven't even yet.
> Sia: Looked at your product.
> Sia: Like I feel like they're strategic decisions that should.
> Sia: Change anyways, but you can also argue for performance reasons.
> Sia: And…
> Sia: Delay them at least until.

That is a hot mess.

So how did I convert this hot mess into a reasonable first draft? First, I tried to get it to write the article for me with one prompt:

> Can you rewrite this transcript as a blog article?

My first obstacle was that I found myself in an endless do loop where GPT asked me for the transcript, I gave it the transcript, then it asked me what I wanted to do with it starting the cycle again. I was using GPT-4 which apparently couldn't parse the quantity of data I gave it - about 30-40 minutes of lecture-style speaking.

When I switched to GPT-4-32K, it was able to handle the volume of "data" from the transcript. Then I hit my second obstacle. The intro paragraph was dumb GPT speak, I got a few paragraphs of decent summary of the beginning of my talk, then it went way off script and started giving me GPT-style "original" content for web perf optimization. Not what I wanted. 

Then I asked GPT, "What did I say about x?" for each of the sub-topics I wanted more detail on and it did pretty good at that! It kept cutting off the output mid-sentence, and later I learned that I should tell it to "continue". 🤦🏻‍♀️ Regardless, I finally had something workable.

## Conclusion

Finally, I had a decent first draft of a conversion from my transcript to an article. Did it save time? Probably not due to all the experimentation. However, I might use it in the future when I have another transcript I want to convert to written content. Just to get through that initial mental block of an empty page.
