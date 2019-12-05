---
title: Making Google Fonts Faster⚡
description: If you use Google Fonts, a few additional steps can lead to much faster load times.
date: 2019-02-06
tags: ['WebPerf', 'Fonts']
layout: layouts/post.njk
isSelect: true
featuredImagePrefix: /img/fonts/typewriter_keys
---

<figure>
  <img src="/img/fonts/typewriter_keys.jpg"
        alt="Close-up of typewriter keys">
  <figcaption>Photo by <a href="https://unsplash.com/photos/tFdt_ztePy4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bob Newman</a> on <a href="https://unsplash.com/collections/3603769/font?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

In this article, I will show you how to:

1. Skip over some of the latency time for downloading fonts from Google Fonts
2. Self-host your fonts for faster speed and greater control over FOIT and FOUT
3. Do the same as #2 but more quickly with a cool tool

## But Why?
Google Fonts is hosted on a pretty fast and reliable content delivery network (CDN), so why might we consider hosting on our own CDN?

Let’s take a step back and look at what is happening when you request from Google Fonts using a standard `<link>` copied from their website:

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400" rel="stylesheet">
```

Did you notice that the link is for a stylesheet and not a font file? If we load the link’s [href](https://fonts.googleapis.com/css?family=Muli:300,400,700|Oswald:500) into our browser, we see that Google Fonts loads a stylesheet of `@font-face` declarations for all the font styles that we requested in every character set that is available. Not all of these are used by default, thankfully.

Then, each `@font-face` declaration tells the browser to use a local version of the font, if available, before attempting to download the file from `fonts.gstatic.com`:

```css
/* latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

So what’s the problem?

First, we have a minimum of 2 separate requests to different hosts — first for the stylesheet at `fonts.googleapis.com`, and then to a unique URL for each font hosted at `fonts.gstatic.com`. This makes it impossible to take advantage of [HTTP/2 multiplexing](https://developers.google.com/web/fundamentals/performance/http2/#request_and_response_multiplexing) or [resource hints](https://twitter.com/addyosmani/status/743571393174872064?lang=en).

You may be asking yourself, “Why can’t I just use the direct link to the font?” Google Fonts are updated often so you might find yourself trying to load a font from a link that no longer exists pretty quickly. 🤦🏾

The second problem we encounter with Google Fonts is that we have no control over flash-of-invisible-text (FOIT) and flash-of-unstyled-text (FOUT) while fonts are loading. Setting the [`font-display`](https://font-display.glitch.me/) property in the @font-face would give us that control, but it’s defined in the Google Fonts stylesheet.

<figure>
    <img src="/img/fonts/foit-emr.jpg"
         alt="FOIT in action — note the missing navbar text in the filmstrip screenshot (throttled to slow 3G)">
    <figcaption>FOIT in action — note the missing navbar text in the filmstrip screenshot (throttled to slow 3G)</figcaption>
</figure>


Finally, while rare, if Google Fonts is down, we won’t get our fonts. If our own CDN is down, then at least we are consistently delivering nothing to our users, right? 🤷🏻️

## If you do nothing else, at least preconnect…
The only basic performance improvement we can do with Google Fonts hosting is warming up the DNS lookup, TCP handshake, and TLS negotiation to the `fonts.gstatic.com` domain with [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/):

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Muli:400" rel="stylesheet">
```

Why? If you don’t warm up the connection, the browser will wait until it sees the CSS call font files before it begins DNS/TCP/TLS:

<figure>
    <img src="/img/fonts/fonts-no-preconnect.jpg"
         alt="Loading Google Fonts without preconnect">
    <figcaption>Loading Google Fonts without preconnect</figcaption>
</figure>

This is wasted time because we KNOW that we will definitely need to request resources from `fonts.gstatic.com`. By adding the preconnect, we can perform DNS/TCP/TLS before the socket is needed, thereby moving forward that branch of the waterfall:

<figure>
    <img src="/img/fonts/fonts-preconnect.jpg"
         alt="Loading Google Fonts with preconnect to fonts.gstatic.com">
    <figcaption>Loading Google Fonts with preconnect to fonts.gstatic.com</figcaption>
</figure>

## Even better: self-host for full control
It would be even better if we had full control over our font files, loading, and CSS properties. Luckily, [Mario Ranftl](http://mranftl.com/) created [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) which helps us do exactly that! It is an amazing tool for giving us font files and font-face declarations based on the fonts, charsets, styles, and browser support you select.

### Step 1: Use google-webfonts-helper to download our fonts and provide basic CSS font-face declarations
First, select the Google font you need from the left sidebar. Type in the search box for a filtered list (red arrow), then click on your font (blue arrow):

<figure>
    <img src="/img/fonts/fonts-step-1.jpg"
         alt="Step 1: Select a font.">
    <figcaption>Step 1: Select a font.</figcaption>
</figure>

Next, select your character sets and styles. Remember that more styles mean more for the client to download:

<figure>
    <img src="/img/fonts/fonts-select-sets.jpg"
         alt="Select your character sets and styles (weight and style).">
    <figcaption>Select your character sets and styles (weight and style).</figcaption>
</figure>

Different fonts have different levels of character support and style options. For example, Open Sans supports many more charsets than Muli:

<figure>
    <img src="/img/fonts/fonts-open-sans.jpg"
         alt="Open Sans supports many more character sets including Cyrillic, Greek, Vietnamese, and extended sets.">
    <figcaption>Open Sans supports many more character sets including Cyrillic, Greek, Vietnamese, and extended sets.</figcaption>
</figure>

Your final choice is which browsers you want to support. “Modern Browsers” will give you WOFF and WOFF2 formats while “Best Support” will also give you TTF, EOT, and SVG. For our use case, we chose to only host WOFF and WOFF2 while selecting system fonts as fallbacks for older browsers. Work with your design team to decide the best option for you.

<figure>
    <img src="/img/fonts/fonts-support.jpg"
         alt="Select “Best Support” for all file formats or “Modern Browsers” for only WOFF and WOFF2.">
    <figcaption>Select “Best Support” for all file formats or “Modern Browsers” for only WOFF and WOFF2.</figcaption>
</figure>

After selecting a browser support option, copy the provided CSS into your stylesheet near the beginning of your stylesheets before you call any of those font families. We choose to put this at the top of our variables partial when using SCSS. You can customize the font file location — the default assumes `../fonts/`.

Finally, download your files. Unzip them, and place them in your project in the appropriate location.

### Step 2: Loading Optimization
So far, we have only moved where we are hosting files from Google’s servers to ours. This is nice, but not good enough. We want our font files to start downloading right away, not after the CSS is parsed and the CSSOM is created.

We can do this with the [`preload`](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) resource hint:

> Preload is a declarative fetch, allowing you to force the browser to make a request for a resource without blocking the document’s onload event.
> —[from “Preload, Prefetch And Priorities in Chrome”](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) by Addy Osmani

**Warning**: Before we go any further, make sure you understand that `preload` will load a resource whether you use it or not. Only preload resources that are needed on a particular page.

How do we choose which file type to preload? Resource hints are not available in every browser, but all the [browsers that support preload](https://caniuse.com/#search=preload) also [support WOFF2](https://caniuse.com/#search=woff2) so we can safely choose only WOFF2.

In your HTML file, add resource hints for all WOFF2 font files you need for the current page:

```html
  <link rel="preload" as="font" type="font/woff2"
    href="./fonts/muli-v12-latin-regular.woff2" crossorigin>

  <link rel="preload" as="font" type="font/woff2"
    href="./fonts/muli-v12-latin-700.woff2" crossorigin>
```

Let’s break down our preload `<link>` element:

- `rel="preload"` tells the browser to declaratively fetch the resource but not “execute” it (our CSS will queue usage).
- `as="font"` tells the browser what it will be downloading so that it can set an appropriate priority. Withou
t it, the browser would set a default low priority.
- `type="font/woff2` tells the browser the file type so that it only downloads the resource if it supports tha
t file type.
- `crossorigin` is required because fonts are fetched using anonymous mode CORS.

So how did we do? Let’s take a look at the performance before and after. Using webpagetest.org in easy mode (Moto G4, Chrome, slow 3G), our speed index was 4.147s using only preconnect, and 3.388s using self-hosting plus preload. The waterfalls for each show how we are saving time by playing with latency:

<figure>
  <img src="/img/fonts/fonts-self.jpg"
        alt="Loading from Google with preconnect to fonts.gstatic.com">
  <figcaption>Loading from Google with preconnect to fonts.gstatic.com</figcaption>
</figure>

<figure>
  <img src="/img/fonts/fonts-preload.jpg"
        alt="Self-hosting fonts and using preload">
  <figcaption>Self-hosting fonts and using preload</figcaption>
</figure>

### Step 3: Fix FOIT and FOUT (optional)
Different people have different opinions on FOIT (flash of invisible text) and FOUT (flash of unstyled text). For the most part, we prefer to show text as fast as possible even if that means a pesky transition to our preferred font once it loads. For strongly branded content, you may want to keep a FOIT over showing off-brand fonts.

If you’re okay with FOUT, or flash of unstyled text, then we can fix FOIT by adding `font-display: swap;` to our `@font-face` declarations.

Check out all your `font-display` options in this [fun Glitch playground](https://font-display.glitch.me/) by Monica Dinculescu.

## subfont
So what if you don’t want to go through all of these steps? The [subfont](https://github.com/Munter/subfont) npm package will do this in addition to dynamically subsetting your fonts at build. It takes some more set-up time, but it’s definitely worth a try.

Are you a fan of [Gatsby](https://www.gatsbyjs.org/)? There’s even a [subfont plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-subfont/) for it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🚀 Day 3 of <a href="https://twitter.com/hashtag/devAdvent?src=hash&amp;ref_src=twsrc%5Etfw">#devAdvent</a>: SubFont, by <a href="https://twitter.com/_munter_?ref_src=twsrc%5Etfw">@_munter_</a>!<br><br>There are best practices for font loading performance that can shave second of load time. With Subfont, Peter automated the whole process. I used to do a lot of this by hand, now it&#39;s quick as an npm i!<a href="https://t.co/yukja6AqsX">https://t.co/yukja6AqsX</a> <a href="https://t.co/hgjLWa6cn9">pic.twitter.com/hgjLWa6cn9</a></p>&mdash; Sarah Drasner (@sarah_edo) <a href="https://twitter.com/sarah_edo/status/1069628705163681792?ref_src=twsrc%5Etfw">December 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Additional Considerations

### Host static assets on a CDN
One thing Google Fonts does offer is a fast and reliable content delivery network (CDN). You should also host your static assets on a CDN for faster delivery to users in different regions. We use AWS S3 plus Cloudfront, the CDN service offered by Amazon, but many options exist.

### Size and Popular Fonts
In some of my tests for our company website, I noticed smaller font file sizes for some fonts hosted by Google. My theory is this is due to Google’s variants for optimization:

> Google Fonts maintains 30+ optimized variants for each font and automatically detects and delivers the optimal variant for each platform and browser.
> —from [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#reducing_font_size_with_compression) by Ilya Grigorik

In addition, very popular fonts like Open Sans and Roboto are likely to exist in your users’ cache. Hopefully, in a future post I can explore HTTPArchive data and give you an idea for which fonts are the most popular.

So, before you commit to a path of self-hosting, compare the tradeoffs of byte sizes and speed/control.

Want to see all the sample code and performance results? [Here is the repo](https://github.com/siakaramalegos/google-fonts-self-hosting).

## Resources you should checkout

- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) by Addi Osmani
- [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization) by Ilya Grigorik
- [Font-display](https://font-display.glitch.me/) by Monica Dinculescu
