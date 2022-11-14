---
title: Cloudinary AVIF, caching fonts on Netlify, and Google Analytics 4
date: 2021-07-25
---
## New post on AVIF in Cloudinary

As promised, here's my quick post giving you some extra details about using AVIF with Cloudinary. It includes demos of course as well as details on the transformation costs: [What to know about AVIF on Cloudinary](https://sia.codes/posts/avif-on-cloudinary/).

## Caching fonts on Netlify

In case you missed it, last week I realized that Netlify doesn't automatically cache font files. I had assumed it, and you know what assuming does... 🍑👯

Luckily, there is an easy fix - in your netlify.toml file, set the max-age:

```toml
[[headers]]
  for = \"/fonts/*\"
    [headers.values]
    Cache-Control = \"public, max-age=31536000\"
```

## Combing Google Analytics and Google Analytics 4

I'm still learning what's new in Google Analytics 4. I have both tags on my site. I finally started exploring the GA4 dashboard, and I'm impressed.

I'll be happy to remove the legacy GA tag from my site after:

- Google Search Console Insights start working with GA4
- I get the [fancy web vitals dashboard working](https://events.google.com/io/session/0deaa89f-f331-48ae-a8d7-e2f0aedddf82?lng=en)

In the meantime, I learned that you can [load just one analytics JS library and initialize both tags in the same snippet](https://developers.google.com/analytics/devguides/collection/ga4/basic-tag?technology=gtagjs).

Fare thee well my frens.
