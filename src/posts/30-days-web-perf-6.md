---
title: "Day 6 of #30DaysOfWebPerf: Self-hosted fonts"
description: Google Fonts is great, but how do we avoid the performance pitfalls?
date: 2019-11-08
tags: ['WebPerf', 'Fonts', 'Latency']
layout: layouts/post.njk
---

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Day 6 of⚡️ <a href="https://twitter.com/hashtag/30DaysOfWebPerf?src=hash&amp;ref_src=twsrc%5Etfw">#30DaysOfWebPerf</a> ⚡️<br><br>Happy Friday, y&#39;all! <br><br>Did you think I forgot about self-hosted fonts? We can make those faster too! <br><br>Normally, we add them to our CSS like so: <a href="https://t.co/YNqvD8ZQEa">pic.twitter.com/YNqvD8ZQEa</a></p>&mdash; Sia Karamalegos (@TheGreenGreek) <a href="https://twitter.com/TheGreenGreek/status/1192817334559354880?ref_src=twsrc%5Etfw">November 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">But we&#39;re still getting a latency penalty because the browser doesn&#39;t know it needs to download those fonts until it...<br><br>1) first downloads the HTML, <br>2) then the CSS, <br>3) then creates the CSSOM at which point it knows it needs the files. <a href="https://t.co/MM8SySThdF">pic.twitter.com/MM8SySThdF</a></p>&mdash; Sia Karamalegos (@TheGreenGreek) <a href="https://twitter.com/TheGreenGreek/status/1192817342507626496?ref_src=twsrc%5Etfw">November 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Luckily, there is another resource hint we can take advantage of in situations where we know we DEFINITELY need a resource. We can preload it!<br><br>Preload tells the browser that a resource can be loaded right away even though the signal for it&#39;s use hasn&#39;t been read yet. <a href="https://t.co/MD7hCm4OSb">pic.twitter.com/MD7hCm4OSb</a></p>&mdash; Sia Karamalegos (@TheGreenGreek) <a href="https://twitter.com/TheGreenGreek/status/1192817348547403776?ref_src=twsrc%5Etfw">November 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Don&#39;t do this unless you definitely need a resource for a particular page. You&#39;ll waste the user&#39;s data and bandwidth. Luckily, in Chrome you&#39;ll get a warning in the console if it doesn&#39;t see you using the resource within a few seconds.<br><br>So how did we do? Pretty awesome! <a href="https://t.co/OjYrF8J0zv">pic.twitter.com/OjYrF8J0zv</a></p>&mdash; Sia Karamalegos (@TheGreenGreek) <a href="https://twitter.com/TheGreenGreek/status/1192817355371491330?ref_src=twsrc%5Etfw">November 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
