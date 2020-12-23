---
title: Wow look at this number input
description: Do you know HTML?
date: 2020-12-23
tags: ['HTML']
layout: layouts/post.njk
# tweetId: '1339307226243231749'
isSelect: false
# featuredImage: passports_zwgffj.jpg
---

So you know about the latest server-side hook context API for suspensfully rendering state machines in that JavaScript framework...

But can you successfully submit this form?

<form class="form" id="number-form">
  <label for="amount">Enter a number, any number *
    <input type="number" name="amount" required min="1" max="5" step="0.01">
    <small style="font-weight:400">Required, must be between 1.00 and 5.00 with increments no smaller than 0.01</small>
  </label>
  <button class="button button-default">Submit</button>
</form>

Here's all the fancy code you need to do this on your own website on-the-line:

```html
<input type="number" name="amount" required min="1" max="5" step="0.01">
```

<script>
  document.querySelector("#number-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const baseUrl = "https://twitter.com/intent/tweet/";
    const shareLink =
      "https://sia.codes/posts/wow-look-at-this-number-input/";
    const amount = document.querySelector("input").value;
    const text = `I owe @TheGreenGreek $${amount} for showing me how to HTML`;
    const url = `${baseUrl}?text=${encodeURI(text)}&url=${encodeURI(shareLink)}`;
    window.open(url, "_blank")
  });
</script>
