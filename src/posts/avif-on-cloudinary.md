---
title: What to know about AVIF on Cloudinary
description: Start using AVIF today with Cloudinary. Learn about your options, the tradeoffs, and how to overcome slow transformations.
date: 2021-07-21
tags: ['Images', 'WebPerf']
layout: layouts/post.njk
# tweetId: '1261340524201390081'
isSelect: true
featuredImage: girl_holding_camera_t08zv8.jpg
---

<figure>
  <img src="{% src 'girl_holding_camera_t08zv8.jpg' %}"
    srcset="{% srcset 'girl_holding_camera_t08zv8.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Possum overlayed on a keyboard"
    importance="high"
    width="3000" height="2072">
  <figcaption>Get ready for some A+ photography now that I have AVIF enabled. Photo by <a href="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kelly Sikkema</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> with added <a href="https://duotone.shapefactory.co/">duotone</a>.
  </figcaption>
</figure>

I just enabled AVIF on Cloudinary and... WOW. My image file sizes dropped by around 37-50% with equal quality.

Most of how to use AVIF on Cloudinary is covered by [How to Adopt AVIF for Images With Cloudinary](https://cloudinary.com/blog/how_to_adopt_avif_for_images_with_cloudinary) by Eric Portis. In this post, I want to cover some gotchas and things to know.

## What is AVIF?

Before we get started, let's get the back story.

<blockquote>
  <p>AVIF is a new image format derived from the keyframes of AV1 video.</p>
  <p class="blockquote-source">— Jake Archibald from <a href="https://jakearchibald.com/2020/avif-has-landed/">AVIF has landed</a></p>
</blockquote>

This is not a technical post about image codecs. If you want to nerd out on the technical stuff, I highly recommend [AVIF for Next-Generation Image Coding](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4?gi=c175c45e28a1) from the Netflix Technology Blog.

Instead, let's look at the difference between formats with equal quality (using [`q_auto`](https://cloudinary.com/documentation/image_optimization#automatic_quality_selection_q_auto)). Note that you will only see all these images on browsers that support both AVIF and WEBP...

<div class="text-center">
  <button class="button" onclick="openImg('AVIF')">AVIF</button>
  <button class="button" onclick="openImg('WEBP')">WEBP</button>
  <button class="button" onclick="openImg('JPEG')">JPEG</button>
</div>

<figure id="AVIF" class="imgFormat">
  <figcaption><strong>AVIF</strong>: 31.1 kB (desktop, 2x screen)</figcaption>
  <img src="https://res.cloudinary.com/siacodes/image/upload/q_auto,f_auto,w_680/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg" srcset="https://res.cloudinary.com/siacodes/image/upload/q_auto,f_auto,w_300/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 300w, https://res.cloudinary.com/siacodes/image/upload/q_auto,f_auto,w_600/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 600w, https://res.cloudinary.com/siacodes/image/upload/q_auto,f_auto,w_928/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 928w, https://res.cloudinary.com/siacodes/image/upload/q_auto,f_auto,w_1856/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 1856w" sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)" alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy">
</figure>
<figure id="WEBP" class="imgFormat" style="display:none">
  <figcaption><strong>WEBP</strong>: 80.2 kB (desktop, 2x screen)</figcaption>
  <img src="https://res.cloudinary.com/siacodes/image/upload/q_auto,f_webp,w_680/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg" srcset="https://res.cloudinary.com/siacodes/image/upload/q_auto,f_webp,w_300/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 300w, https://res.cloudinary.com/siacodes/image/upload/q_auto,f_webp,w_600/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 600w, https://res.cloudinary.com/siacodes/image/upload/q_auto,f_webp,w_928/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 928w, https://res.cloudinary.com/siacodes/image/upload/q_auto,f_webp,w_1856/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 1856w" sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)" alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy">
</figure>
<figure id="JPEG" class="imgFormat" style="display:none">
  <figcaption><strong>JPEG</strong>: 112 kB (desktop, 2x screen)</figcaption>
  <img src="https://res.cloudinary.com/siacodes/image/upload/q_auto,w_680/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg" srcset="https://res.cloudinary.com/siacodes/image/upload/q_auto,w_300/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 300w, https://res.cloudinary.com/siacodes/image/upload/q_auto,w_600/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 600w, https://res.cloudinary.com/siacodes/image/upload/q_auto,w_928/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 928w, https://res.cloudinary.com/siacodes/image/upload/q_auto,w_1856/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg 1856w" sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)" alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy">
</figure>

<script>
  function openImg(imgFormatName) {
  var i;
  var x = document.getElementsByClassName("imgFormat");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(imgFormatName).style.display = "block";
}
</script>

How low can we go? Now let's look at equal-ish file sizes with different quality (compression)...

<div class="text-center">
  <button class="button" onclick="openImg2('AVIF-2')">AVIF</button>
  <button class="button" onclick="openImg2('WEBP-2')">WEBP</button>
  <button class="button" onclick="openImg2('JPEG-2')">JPEG</button>
</div>

<figure id="AVIF-2" class="imgFormat2">
  <figcaption><strong>AVIF</strong>: 12.1 kB (auto quality, 928px wide)</figcaption>
  <img src="https://res.cloudinary.com/siacodes/image/upload/q_auto,f_auto,w_928/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg" alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy">
</figure>
<figure id="WEBP-2" class="imgFormat2" style="display:none">
  <figcaption><strong>WEBP</strong>: 13.3 kB (quality 55)</figcaption>
  <img src="https://res.cloudinary.com/siacodes/image/upload/q_55,f_webp,w_928/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg" alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy">
</figure>
<figure id="JPEG-2" class="imgFormat2" style="display:none">
  <figcaption><strong>JPEG</strong>: 11.9 kB (quality 35)</figcaption>
  <img src="https://res.cloudinary.com/siacodes/image/upload/q_35,w_928/v1607719366/sia.codes/karsten-winegeart-6Ja5I4hRLyc-unsplash_c287i6.jpg" alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy">
</figure>

<script>
  function openImg2(imgFormat2Name) {
  var i;
  var x = document.getElementsByClassName("imgFormat2");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(imgFormat2Name).style.display = "block";
}
</script>

<aside><strong>Note:</strong> Nearly every post on AVIF shows these side-by-side comparisons of AVIF, WEBP, and JPEG. I did not want to feel left out. Plus, it was fun.</aside>

## Which browsers support AVIF?

At the time of writing, AVIF is only supported on Chrome, Opera, Samsung Internet, and a few others. You can also enable it in Firefox. Check [caniuse for AVIF](https://caniuse.com/avif) for the latest numbers.

Currently, 61.27% of my blog's traffic supports AVIF (67.24% globally). Did you know that you can import your Google Analytics data into caniuse to see what percent of your traffic has support for a given feature? See [Google Analytics + caniuse = *MAGIC*](/posts/google-analytics-caniuse-magic/).

## How do you use AVIF on Cloudinary?

You can use AVIF on Cloudinary one of two ways:

- Use the [`f_avif`](https://cloudinary.com/documentation/image_transformations#image_format_support) format transformation
- Use the [`f_auto`](https://cloudinary.com/documentation/image_transformations#automatic_format_selection_f_auto) auto format transformation, but only after you [sign up for the beta](https://support.cloudinary.com/hc/en-us/requests/new)

I am lazy. I am not ashamed of this. I love the `f_auto` transformation because it means that instead of markup like this:

```html
<picture>
    <source
      srcset="[baseURL]/q_auto,f_avif,w_300/file.jpg 300w, [baseURL]/q_auto,f_avif,w_600/file.jpg 600w, [baseURL]/q_auto,f_avif,w_928/file.jpg 928w, [baseURL]/q_auto,f_avif,w_1856/file.jpg 1856w"
      sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)"
      type="image/avif"
      >
    <source
      srcset="[baseURL]/q_auto,f_webp,w_300/file.jpg 300w, [baseURL]/q_auto,f_webp,w_600/file.jpg 600w, [baseURL]/q_auto,f_webp,w_928/file.jpg 928w,[baseURL]/q_auto,f_webp,w_1856/file.jpg 1856w"
      sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)"
      type="image/webp"
      >
    <img
      src="[baseURL]/q_auto,w_680/file.jpg"
      sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)"
      alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy"
      >
</picture>
```

I can write much shorter markup and let Cloudinary do the work:

```html
<img
  src="[baseURL]/q_auto,f_auto,w_680/file.jpg"
  srcset="[baseURL]/q_auto,f_auto,w_300/file.jpg 300w, [baseURL]/q_auto,f_auto,w_600/file.jpg 600w, [baseURL]/q_auto,f_auto,w_928/file.jpg 928w, [baseURL]/q_auto,f_auto,w_1856/file.jpg 1856w"
  sizes="(min-width: 980px) 928px, calc(95.15vw + 15px)"
  alt="Large buffalo blocking the roadway" width="4001" height="2671" loading="lazy"
  >
```

With `f_auto`, Cloudinary will pick the best file format based on the user's browser.

<aside>I'm so lazy that I don't even write this markup. I created shortcodes in Eleventy to generate my src and srcsets for me. Read about it in <a href="/posts/eleventy-and-cloudinary-images/">Optimize Images in Eleventy Using Cloudinary</a>.</aside>

## What are the tradeoffs of using AVIF on Cloudinary?

Before you sprint to your code editor...

- AVIF transformations are slow
- AVIF transformations use up your credits faster

Let's talk about how to overcome those problems.

### Reduce delays for your users

Using AVIF increases your transformations usage because AVIF is intensive to encode. This also means that it takes longer for the transformation to occur. It's noticeable with delays of a few seconds.

For my blog, I overcome this obstacle by viewing new posts at different screens sizes before publishing. Then Cloudinary caches my AVIF images so they are ready for the next request.

This is not reasonable for larger projects. Instead, you can use [eager transformations](https://cloudinary.com/documentation/transformations_on_upload#eager_transformations) to transform on upload through the API.

### The credit usage details

At the time of writing (July 2021), Cloudinary counts AVIF transformations as follows:

- Images 2MP and below count as 1 transformation
- Each 1MP above 2MP will count as another 0.5 transformations

This seems high cost on the surface but is a good deal. I understood this once I saw how long AVIF transformations take compared to other formats. AVIF transforms are 70x-100x more CPU intensive than that of JPEG!

If you want to sign up for the `f_auto` beta, you can [contact Cloudinary](https://support.cloudinary.com/hc/en-us/requests/new).


<aside>If you found this article helpful, you can <a href="https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/oq6yrskcixnvxvj1ofc0">sign up for a free Cloudinary account</a> with this link, and I'll get a few extra Cloudinary credits per month.</aside>

## Results and next steps

The buffalo picture (from my recent post on [render-blocking resources](/posts/render-blocking-resources/)) went from 198 kB to 97 kB. The results around my site vary based on the image, and the savings increase on larger (width) images.

Nowadays, we have devices with 2x, 3x, and higher [DPR](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) (device pixel ratio) screens. Humans can't see much better than 2x. Also, we can't detect lower quality as well on higher DPR images.

So my next step is to manually DPR-cap to 2x sizes with higher compression (lower quality) on the 2x srcset. I've implemented this for one client and saw great results. Now it's time to apply it to my blog!

Jake Archibald wrote up how to do this in [Half the size of images by optimising for high density displays](https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/).

[Yoav Weiss](https://twitter.com/yoavweiss) wants to run an origin trial for [adding a max DPR value to srcsets](https://chromium-review.googlesource.com/c/chromium/src/+/2395619). That will be exciting if it happens!

Have you started using AVIF images on your sites yet? What method are you using?

Don't miss a post. <a href="#newsletter-signup">Sign up for my newsletter</a>!

<small>Pug photo credit: <a href="https://unsplash.com/@karsten116?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Karsten Winegeart</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.</small>

