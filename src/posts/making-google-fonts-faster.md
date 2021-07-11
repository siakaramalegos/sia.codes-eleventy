---
title: Making Google Fonts Faster
shortDescription: If you use Google Fonts, a few additional steps can lead to much faster load times.
description: If you use Google Fonts, a few additional steps can lead to much faster load times. Learn about preconnect, optimal placement, font display, preload, and more in this post.
date: 2019-02-06
updated: 2021-07-08
tags: ["WebPerf", "Fonts", "Popular"]
layout: layouts/post.njk
isSelect: true
featuredImage: typewriter_keys_qgtruq.jpg
tweetId: "1346569499332501506"
---

<figure>
  <img src="{% src 'typewriter_keys_qgtruq.jpg' %}"
    srcset="{% srcset 'typewriter_keys_qgtruq.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Close-up of typewriter keys"
    width="4000" height="1835">
  <figcaption>Photo by <a href="https://unsplash.com/photos/tFdt_ztePy4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bob Newman</a> on <a href="https://unsplash.com/collections/3603769/font?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

In this article, I will show you how to:

1. Choose the best way to import your Google Fonts
2. Skip over some of the latency time for downloading fonts
3. Fix flash-of-invisible text (FOIT)
4. Self-host your fonts for faster speed and greater control

## Anatomy of a Google Fonts request

Let’s take a step back and look at what is happening when you request from Google Fonts using a standard `<link>` copied from their website:

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400" rel="stylesheet"/>
```

Did you notice that the link is for a stylesheet and not a font file? If we load the link’s [href](https://fonts.googleapis.com/css?family=Muli:300,400,700|Oswald:500) into our browser, we see that Google Fonts loads a stylesheet of `@font-face` declarations for all the font styles that we requested in every character set that is available. Not all of these are used by default, thankfully.

Then, each `@font-face` declaration tells the browser to use a local version of the font, if available, before attempting to download the file from `fonts.gstatic.com`:

```css
/* latin */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  src: local("Open Sans Regular"), local("OpenSans-Regular"), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Understanding this architecture will help us understand why certain strategies work better for making our site faster.

## Should I use `<link>` or `@import`?

Sometimes it's easier for us to get our custom fonts into our projects by importing them in the CSS:

```css
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");
```

Unfortunately, this makes our site load slower because we've increased the [critical request depth](https://web.dev/critical-request-chains/) for no benefit. In the network waterfall below, we can see that each request is chained - the HTML is loaded on line 1, which triggers a call to style.css. Only after style.css is loaded and the [CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) is created will the CSS from Google fonts then be triggered for download. And as we learned in the previous section, that file must also be downloaded and read before the fonts themselves will be downloaded (the final 2 rows):

<figure>
  <img src="{% src 'webfonts_css_iygufk.jpg' %}"
    srcset="{% srcset 'webfonts_css_iygufk.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Webpagetest network waterfall showing wasted time due to using @import to load our Google font from the CSS"
    loading="lazy"
    width="1876" height="364">
  <figcaption>Loading Google fonts via @import in CSS increases the critical request depth and slows page load</figcaption>
</figure>

By moving our font request to the `<head>` of our HTML instead, we can make our load faster because we've reduced the number of links in the chain for getting our font files:

<figure>
  <img src="{% src 'fonts-html_trnepj.jpg' %}"
    srcset="{% srcset 'fonts-html_trnepj.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Webpagetest network waterfall showing faster load by moving our Google font load to the HTML via a link tag in the head"
    loading="lazy"
    width="1876" height="364">
  <figcaption>Loading Google fonts in the HTML reduces the critical request depth and speeds up page load</figcaption>
</figure>

<aside>Always import your fonts from HTML, not CSS.</aside>

## Warm up that connection faster with preconnect

Look closely at that last waterfall, and you might spy another inefficiency. Go ahead and try to find it before you keep reading...

We have a minimum of 2 separate requests to 2 different hosts — first for the stylesheet at `fonts.googleapis.com`, and then to a unique URL for each font hosted at `fonts.gstatic.com`.

You may be asking yourself, "Why can’t I just use the direct link to the font?" Google Fonts are updated often so you might find yourself trying to load a font from a link that no longer exists pretty quickly. 🤦🏾

We can make one quick performance improvement by warming up the DNS lookup, TCP handshake, and TLS negotiation to the `fonts.gstatic.com` domain with [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/):

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" />
<link href="https://fonts.googleapis.com/css?family=Muli:400" rel="stylesheet"/>
```

Why? If you don’t warm up the connection, the browser will wait until it sees the CSS call font files before it begins DNS/TCP/TLS:

<figure>
  <img src="{% src 'fonts-no-preconnect_fseenl.jpg' %}"
    srcset="{% srcset 'fonts-no-preconnect_fseenl.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="WebPageTest waterfall showing wasted time connecting to fonts.gstatic.com (DNS/TCP/TLS)"
    loading="lazy"
    width="1360" height="242">
  <figcaption>Loading Google Fonts without preconnect</figcaption>
</figure>

This is wasted time because we KNOW that we will definitely need to request resources from `fonts.gstatic.com`. By adding the preconnect, we can perform DNS/TCP/TLS before the socket is needed, thereby moving forward that branch of the waterfall:

<figure>
  <img src="{% src 'fonts-preconnect_qleijg.jpg' %}"
    srcset="{% srcset 'fonts-preconnect_qleijg.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="WebPageTest waterfall showing connection happening earlier and not blocking Google font download"
    width="1360" height="241">
  <figcaption>Loading Google Fonts with preconnect to fonts.gstatic.com</figcaption>
</figure>

What's really cool is that I noticed that Google Fonts recently added the preconnect line in the HTML snippet they create for you. Now you no longer need to remember to add it when grabbing new fonts. To update legacy projects, just copy and paste this line before the `<link>` calling your font in your HTML:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" />
```

<figure>
  <img src="/img/fonts/preconnect-snippet.png" width="620" height="796" class="portrait-image" style="max-width:620px" alt="Screenshot of Google Font's embed link generator">
  <figcaption>Google Fonts now supplies the preconnect statement in the HTML snippet automatically</figcaption>
</figure>

<aside>Preconnect to fonts.gstatic.com when using Google Fonts hosted fonts.</aside>

## Flash of Invisible text and the font-display property

We used to have no control over flash-of-invisible-text (FOIT) and flash-of-unstyled-text (FOUT) while fonts are loading:

<figure>
  <img src="{% src 'foit-emr_t0jvkk.jpg' %}"
    srcset="{% srcset 'foit-emr_t0jvkk.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Dev Tools network tab, screenshot partially through load showing invisible text"
    loading="lazy"
    width="1360" height="748">
  <figcaption>FOIT in action — note the missing navbar text in the filmstrip screenshot (throttled to slow 3G)</figcaption>
</figure>

Setting the [`font-display`](https://font-display.glitch.me/) property in the `@font-face` declaration in our CSS gives us that control. Different people have different opinions on FOIT (flash of invisible text) and FOUT (flash of unstyled text). For the most part, we prefer to show text as fast as possible even if that means a pesky transition to our preferred font once it loads. For strongly branded content, you may want to keep a FOIT over showing off-brand fonts.

If you’re okay with FOUT, or flash of unstyled text, then we can fix FOIT by adding `font-display: swap;` to your `@font-face` declarations. [Monica Dinculescu](https://meowni.ca/) created a [fun Glitch playground](https://font-display.glitch.me/) to demonstrate all of the `font-display` options. Last time I checked, the link was broken, but this handy diagram from her post helps us understand those options:

<figure>
  <img src="{% src 'font-display-options_vadanf' %}"
    srcset="{% srcset 'font-display-options_vadanf' %}"
    sizes="{% defaultSizes %}"
    alt="font-display options of block, swap, fallback, and optional visualized on a timeline of invisible, fallback, and webfont"
    loading="lazy"
    width="2672" height="1502">
  <figcaption>font-display options, image by Monica Dinculescu</figcaption>
</figure>

We don't have control over the `@font-face` declarations in the Google Fonts stylesheet, but luckily they added an [API for modifying `font-display`](https://developers.google.com/fonts/docs/css2#use_font-display). It's now included in the default snippet:

```html/3/2
<!-- Default HTML embed snippet from Google Fonts -->
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Redressed" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet">
```

If you want to change the font display on a legacy project, add `&display=swap` to the tail of your link's href. Be sure to check out other useful [font-display options](https://font-display.glitch.me/) like `optional` and `fallback`.

## Self-host your web fonts for full control

Google Fonts is hosted on a pretty fast and reliable content delivery network (CDN), so why might we consider hosting on our own CDN?

Remember how we have a minimum of 2 separate requests to 2 different hosts? This makes it impossible to take advantage of [HTTP/2 multiplexing](https://developers.google.com/web/fundamentals/performance/http2/#request_and_response_multiplexing) or [resource hints](https://twitter.com/addyosmani/status/743571393174872064?lang=en).

Second, while rare, if Google Fonts is down, we won’t get our fonts. If our own CDN is down, then at least we are consistently delivering nothing to our users, right? 🤷🏻️

To have full control over our font files, loading, and CSS properties, we can self-host our Google Fonts. Luckily, [Mario Ranftl](http://mranftl.com/) created [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) which helps us do exactly that! It is an amazing tool for giving us font files and font-face declarations based on the fonts, charsets, styles, and browser support you select.

{% include 'newsletter-aside.njk' %}

### Use google-webfonts-helper to download our fonts and provide basic CSS font-face declarations

First, select the Google font you need from the left sidebar. Type in the search box for a filtered list (red arrow), then click on your font (blue arrow):

<figure>
  <img src="{% src 'fonts-step-1_qzbp53.jpg' %}"
    srcset="{% srcset 'fonts-step-1_qzbp53.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="google-webfonts-helper search for font in top left and select"
    loading="lazy"
    width="1360" height="666">
  <figcaption>Step 1: Select a font.</figcaption>
</figure>

Next, select your character sets and styles. Remember that more styles mean more for the client to download:

<figure>
  <img src="{% src 'fonts-select-sets_f4t6aq.jpg' %}"
    srcset="{% srcset 'fonts-select-sets_f4t6aq.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="google-webfonts-helper select character sets and styles from the main section"
    loading="lazy"
    width="1360" height="668">
  <figcaption>Select your character sets and styles (weight and style).</figcaption>
</figure>

<aside>A sometimes overlooked but easy way to make your sites load and render faster is to user fewer fonts. This applies to both different typefaces and styles (weight and italicized, etc.).</aside>

Different fonts have different levels of character support and style options. For example, Open Sans supports many more charsets than Muli:

<figure>
  <img src="{% src 'fonts-open-sans_il3mdh.jpg' %}"
    srcset="{% srcset 'fonts-open-sans_il3mdh.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Open Sans charsets include cyrillic, cyrillic-ext, greek, greek-ext, latin, latin-ext, and vietnamese"
    loading="lazy"
    width="1360" height="474">
  <figcaption>Open Sans supports many more character sets including Cyrillic, Greek, Vietnamese, and extended sets.</figcaption>
</figure>

Your final choice is which browsers you want to support. “Modern Browsers” will give you WOFF and WOFF2 formats while “Best Support” will also give you TTF, EOT, and SVG. For our use case, we chose to only host WOFF ([caniuse](https://caniuse.com/woff)) and WOFF2 ([caniuse](https://caniuse.com/woff2)) while selecting system fonts as fallbacks for browsers older than IE9. Work with your design team to decide the best option for you.

<figure>
  <img src="{% src 'fonts-support_q32mh2.jpg' %}"
    srcset="{% srcset 'fonts-support_q32mh2.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="From Section 3, after selecting the file format option, you can copy the auto-generated CSS"
    loading="lazy"
    width="1360" height="669">
  <figcaption>Select “Best Support” for all file formats or “Modern Browsers” for only WOFF and WOFF2.</figcaption>
</figure>

After selecting a browser support option, copy the provided CSS into your stylesheet near the beginning of your stylesheets before you call any of those font families. We choose to put this at the top of our variables partial when using SCSS. You can customize the font file location — the default assumes `../fonts/`. Don't forget to set your `font-display` property manually in the CSS to control FOIT.

Finally, download your files. Unzip them, and place them in your project in the appropriate location.

## Loading optimization: preload and other options

So far, we have only moved where we are hosting files from Google’s servers to ours. This is nice, but we might be able to do more. In this section, I'll outline two options for further loading optimization - preload and inlining CSS.

### How to use preload to load fonts faster

We can make our font files start download right away, before the browser knows whether it will need the font or not. By default, the browser only downloads a font after the HTML and CSS are parsed and the CSSOM is created.

The browser won't load font files that aren't needed. If warning bells are going off in your head, then you're right to worry. **We only want to hijack this process if we know for sure that a font will be used on that page**.

Once we know we definitely need a particular font on a page, we can preload it with the [`preload`](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) resource hint:

<blockquote>
  <p>Preload is a declarative fetch, allowing you to force the browser to make a request for a resource without blocking the document’s onload event.</p>
  <p class="blockquote-source">—<a href="https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf">from “Preload, Prefetch And Priorities in Chrome”</a> by Addy Osmani</p>
</blockquote>

<aside><strong>Warning</strong>: Before we go any further, make sure you understand that `preload` will load a resource whether you use it or not. Only preload resources that are needed on a particular page, and limit how many resources you preload.</aside>

How do we choose which file type to preload? Resource hints are not available in every browser, but all the [browsers that support preload](https://caniuse.com/#search=preload) also [support WOFF2](https://caniuse.com/#search=woff2) so we can safely choose only WOFF2.

In your HTML file, add resource hints for the WOFF2 font files you need for the current page:

```html
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href="./fonts/muli-v12-latin-regular.woff2"
    crossorigin
  />
```

Let’s break down our preload `<link>` element:

- `rel="preload"` tells the browser to declaratively fetch the resource but not “execute” it (our CSS will queue usage).
- `as="font"` tells the browser what it will be downloading so that it can set an appropriate priority. Without it, the browser would set a default low priority.
- `type="font/woff2` tells the browser the file type so that it only downloads the resource if it supports that file type.
- `crossorigin` is required because fonts are fetched using anonymous mode CORS.

So how did we do? Let’s take a look at the performance before and after. Using webpagetest.org in easy mode (Moto G4, Chrome, slow 3G), our speed index was 4.147s using only preconnect, and 3.388s using self-hosting plus preload. The waterfalls for each show how we are saving time by playing with latency:

<figure>
  <img src="{% src 'fonts-self_aot28d' %}"
    srcset="{% srcset 'fonts-self_aot28d' %}"
    sizes="{% defaultSizes %}"
    alt="WebPageTest waterfall showing blocked font download"
    loading="lazy"
    width="1360" height="319">
  <figcaption>Loading from Google with preconnect to fonts.gstatic.com</figcaption>
</figure>

<figure>
  <img src="{% src 'fonts-preload_jmjnng' %}"
    srcset="{% srcset 'fonts-preload_jmjnng' %}"
    sizes="{% defaultSizes %}"
    alt="WebPageTest waterfall showing css and fonts being downloaded at the same time"
    loading="lazy"
    width="1360" height="288">
  <figcaption>Self-hosting fonts and using preload</figcaption>
</figure>

### Oh no, preload made my page's initial render slower!

Yes, this can happen. Unfortunately, the `preload` hint can throw a wrench into prioritization schemes for loading files to the browser. Preloaded files are currently loaded before other, more important files needed for initial render. On the plus side, sometimes it loads the font fast enough that the page doesn't need to render the fallback font first and then re-render and shift when the desired font comes in.

Your best strategy is to minimize how many resources you preload and TEST, TEST, TEST with [webpagetest.org](https://webpagetest.org/), which is similar to the browser's dev tools network tab. You can configure a test to do 9 runs at a time to get a better idea of the median performance, then compare before and after preloading.

Generally speaking, keep your preloads under 4-5, and preferably even lower. You could choose to only preload your most used styles and character sets (e.g., 400 weight and Latin for most websites written in English), and then let the browser handle the logic for the rest by having [subsets](#subfont) with no preload. The `unicode-range` property in the font face declaration tells the browser which characters are included in a particular file or subset:

```css
/* this unicode range is only for latin characters: */
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  src: local("Open Sans Regular"), local("OpenSans-Regular"), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

### What are my options if I don't preload?

The core problem we have is that the browser does not discover that it needs a font until later, causing loading to be delayed until that discovery is made. So we reach for `preload` when another option is to make that discovery occur sooner. Another problem with `preload` is that it requires us to remember to remove a preload when a font is no longer used.

One way we can move up discovery is to inline our critical CSS into the `<head>` of our HTML. Then our font face declarations and font styles are available as soon as the html is downloaded which also contains the characters used, so the browser can make a better decision about whether to load the font file or not.

I do not recommend doing this manually. Check out [Extract critical CSS](https://web.dev/extract-critical-css/) by Milica Mihajlija for an overview of the technique and different tools available.

Once again, this may not be the best solution for your website. The only way to know for sure is to test before and after.

## Use subfont to automate some steps

So what if you don’t want to go through all of these steps? The [subfont](https://github.com/Munter/subfont) npm package will do many of these steps in addition to dynamically subsetting your fonts at build. It takes some more set-up time, but it’s definitely worth a try.

Are you a fan of [Gatsby](https://www.gatsbyjs.org/)? There’s even a [subfont plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-subfont/) for it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🚀 Day 3 of <a href="https://twitter.com/hashtag/devAdvent?src=hash&amp;ref_src=twsrc%5Etfw">#devAdvent</a>: SubFont, by <a href="https://twitter.com/_munter_?ref_src=twsrc%5Etfw">@_munter_</a>!<br><br>There are best practices for font loading performance that can shave second of load time. With Subfont, Peter automated the whole process. I used to do a lot of this by hand, now it&#39;s quick as an npm i!<a href="https://t.co/yukja6AqsX">https://t.co/yukja6AqsX</a> <a href="https://t.co/hgjLWa6cn9">pic.twitter.com/hgjLWa6cn9</a></p>&mdash; Sarah Drasner (@sarah_edo) <a href="https://twitter.com/sarah_edo/status/1069628705163681792?ref_src=twsrc%5Etfw">December 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Additional Considerations

### Host static assets on a CDN

One thing Google Fonts does offer is a fast and reliable content delivery network (CDN). You should also host your static assets on a CDN for faster delivery to users in different regions. We use AWS S3 plus Cloudfront, the CDN service offered by Amazon, and Netlify which uses AWS and Google Cloud Platform behind the scenes in the same way, but many options exist.

### Size and Popular Fonts

In some of my tests for our company website, I noticed smaller font file sizes for otherwise equal character sets for some fonts hosted by Google. My theory is this is due to Google’s variants for optimization:

<blockquote>
  <p>Google Fonts maintains 30+ optimized variants for each font and automatically detects and delivers the optimal variant for each platform and browser.</p>
  <p class="blockquote-source">—from <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#reducing_font_size_with_compression">Web Font Optimization</a> by Ilya Grigorik</p>
</blockquote>

We used to say that very popular fonts like Open Sans and Roboto are likely to exist in your users’ cache. Sadly, shared cache is gone on all major browsers (and had been gone for a while in Safari) due to security. It was debatable how much benefit we actually got from it in the first place.

So, before you commit to a path of self-hosting, compare the tradeoffs of byte sizes and speed/control.

Want to see all the sample code and performance results? [Here is the repo](https://github.com/siakaramalegos/google-fonts-self-hosting).

## Resources you should checkout

- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) by Addi Osmani
- [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization) by Ilya Grigorik
- [Font-display](https://font-display.glitch.me/) by Monica Dinculescu
