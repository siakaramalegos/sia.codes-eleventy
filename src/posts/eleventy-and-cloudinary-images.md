---
title: Eleventy and Cloudinary images
description: Setting up responsive images in Eleventy using Cloudinary
date: 2020-12-11
updated: 2021-03-30
tags: ['Eleventy', 'Images', 'WebPerf', 'Jamstack']
layout: layouts/post.njk
tweetId: '1337612682275459073'
isSelect: true
featuredImage: "A_possum_and_a_movie_camera_1943_f4yflt.jpg"
---

<figure>
  <img src="{% src 'A_possum_and_a_movie_camera_1943_f4yflt.jpg' %}"
    srcset="{% srcset 'A_possum_and_a_movie_camera_1943_f4yflt.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="An Australian possum climbing a movie camera"
    width="2953" height="2178">
  <figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:A_possum_and_a_movie_camera_1943.jpg">Wikimedia Commons</a> </figcaption>
</figure>

Responsive images can be challenging to set up, from writing markup to generating the images. We can make this job much easier by using Cloudinary and Eleventy. [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/oq6yrskcixnvxvj1ofc0) can host and transform our images, making generation of many file formats and sizes a matter of adding a param to a URL. [Eleventy](https://www.11ty.dev/) is a hot JavaScript-based static site generator. It requires no client-side JavaScript, making it performant by default.

Originally, I did not set up Cloudinary on my Eleventy blog because I had a handful of images. I would create srcsets and formats [using ImageMagick and cwebp](https://github.com/siakaramalegos/images-on-the-command-line). But then, I got excited about using [structured data](https://developers.google.com/search/docs/guides/search-gallery) for SEO. The image generation job got a LOT more complicated with more sizes and cropping.

In this post, first I'll go over how to serve responsive, performant images. Then, I'll show you how I implemented Cloudinary image hosting in Eleventy using [Eleventy shortcodes](https://www.11ty.dev/docs/shortcodes/).

## What's in an `<img>`?
Let's take a look at a "fully-loaded" image tag in HTML:

```html
  <img src="pug_life.jpg"
    srcset="pug_life_600.jpg 600w, pug_life_300.jpg 300w,"
    sizes="(min-width: 760px) 600px, 300px"
    alt="Pug wearing a striped shirt"
    width="600"
    height="400"
    loading="lazy"
  >
```

Why did I include all those attributes? Let's take a look at each...

- **`src`** - the image to display (required!)
- **`srcset`** - for modern browsers, a set of candidate images and their widths in pixels
- **`sizes`** - for modern browsers, how wide the image will be displayed at various screen widths
- **`alt`** - description of the image
- **`width`** - the image width
- **`height`** - the image height
- **`loading`** - whether to lazy-load images and iframes (check for support with [caniuse](https://caniuse.com/loading-lazy-attr))

## `srcset` and `sizes`

`srcset` and `sizes` give modern browsers a set of images and instructions for how wide they will be displayed. The browser will make the best decision on which image to load based on the user's screen width and [device pixel ratio (DPR)](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio). For example, those nice Retina screens (DPR of 2) need images twice as wide as the slot we're putting them in if we want them to look good. Stated another way, if your CSS says to display an image at 100px wide, we need to supply an image that is 200px wide.

The `sizes` attribute can be tricky to write by hand. My favorite way (a.k.a, the lazy way) is to first give the image a `srcset`, then run the page through [RespImageLint](https://ausi.github.io/respimagelint/). RespImageLint is a nifty bookmarklet that analyzes the images on a webpage. It will tell you  how far off your images are in their size, and will also give suggestions for the `sizes` attribute:

<figure>
  <img src="{% src 'respimagelint_bnumrs.jpg' %}"
    srcset="{% srcset 'respimagelint_bnumrs.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Feedback, code, and image preview in a RespImageLint result"
    loading="lazy"
    width="2408" height="1360" loading="lazy">
  <figcaption>RespImageLint will suggest a sizes attribute if you provide a srcset</figcaption>
</figure>

## Layout Shift

To prevent layout shift once the image loads, we need to provide the browser with an aspect ratio. Currently, the way to do that is to set a height and width on the image in HTML. Use the original image's dimensions since the actual size doesn't matter. The aspect ratio is what is important. Your CSS will control the actual height and width.

To prevent weird stretching, set an auto height in your CSS:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Jen Simmons recorded a great [short video](https://www.youtube.com/watch?v=4-d_SoCHeWE&feature=youtu.be) on this trick.

## Lazy loading

We now have [partial support](https://caniuse.com/loading-lazy-attr) for lazy loading images and iframes! If you set the `loading` attribute to `lazy`, the browser will use the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if a user scrolls near the image or iframe and only load it at that time.

At the time of writing, 78% of my blog's visitors use browsers that support native lazy loading. Thus, I'm implementing it now. [Import your Google Analytics data into caniuse](https://sia.codes/posts/google-analytics-caniuse-magic/) to see how many of your visitors have support for any given web feature.

Note that you should not lazy-load images that are in the viewport on initial load ("above the fold"). This can lower your [performance scores](https://web.dev/vitals/).

## Eleventy Shortcodes and Filters

What are [Eleventy shortcodes](https://www.11ty.dev/docs/shortcodes/)? Shortcodes are like to [filters](https://www.11ty.dev/docs/filters/) in that they allow us to reuse code. Nunjucks, Liquid, and Handlebars templates all support both shortcodes and filters. For simplicity, the rest of this post will use Nunjucks.

{% raw %}

```html
<!-- FILTER using Nunjucks -->
<!-- The filter, or function, is makeUppercase, and the first and only parameter is name. -->
<h1>{{ name | makeUppercase }}</h1>

<!-- SHORTCODE using Nunjucks -->
<!-- The shortcode is user, and the parameters are firstName and lastName. -->
{% user firstName, lastName %}
```
{% endraw %}

For this use case, we could use either. I chose shortcodes since most of the other solutions use them, and I wanted to try them out for the first time.

## The code

Now that you know how I make images responsive, I can explain the rationale behind my solution.

The existing solutions used shortcodes that provided the full image tag based on the filename, alt, and a few other attributes. I wanted the ability to also provide all the attributes previously mentioned (loading, sizes, etc.) plus others like `class`.

The shortcode became unwieldy with this many parameters. Then I realized that the HTML itself was only marginally longer. Why not  use HTML? The onerous part of writing the markup is setting the image urls and generating the srcsets.

> Why not use HTML?

Hence, I created shortcodes that do only that - generate the `src` and `srcset`. Everything else can be set as needed in the HTML:

{% raw %}
```html
  <img src="{% src 'possum_film_director.jpg' %}"
    srcset="{% srcset 'possum_film_director.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Possum directing a movie"
    width="2953"
    height="2178"
    loading="lazy"
    class="super-great-style-class"
  >
```
{% endraw %}

I don't need a `<picture>` tag. Cloudinary can serve the best image format based on the user's browser through the [f_auto transformation](https://cloudinary.com/documentation/image_transformations#automatic_format_selection_f_auto).

<aside>If you found this article helpful, you can <a href="https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/oq6yrskcixnvxvj1ofc0">sign up for a free Cloudinary account</a> with this link, and I'll get a few extra Cloudinary credits per month.</aside>

### Shortcodes

I gave the shortcodes smart default widths based on the styles for my site, but I allow an optional parameter to set them when I invoke the shortcode. The first step is to set our constants:

```javascript
// _11ty/shortcodes.js

// Set constants for the Cloudinary URL and fallback widths for images when not supplied by the shorcode params
const CLOUDNAME = "[your Cloudinary cloud name]"
const FOLDER = "[optional asset folder in Cloudinary]"
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`;
const FALLBACK_WIDTHS = [ 300, 600, 680, 1360 ];
const FALLBACK_WIDTH = 680;

// ...
```

Then, we can define the shortcodes to create a `src` and reuse that function to create a `srcset`. These use the given widths or our fallback widths from the constants previously set:

```javascript
// _11ty/shortcodes.js
// ...

// Generate srcset attribute using the fallback widths or a supplied array of widths
function getSrcset(file, widths) {
  const widthSet = widths ? widths : FALLBACK_WIDTHS
  return widthSet.map(width => {
    return `${getSrc(file, width)} ${width}w`;
  }).join(", ")
}

// Generate the src attribute using the fallback width or a width supplied by the shortcode params
function getSrc(file, width) {
  return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
}

// ...
```

The final step in our shortcodes file is to export the two shortcodes to access them in our Eleventy config:

```javascript
// _11ty/shortcodes.js
// ...

// Export the two shortcodes to be able to access them in our Eleventy config
module.exports = {
  srcset: (file, widths) => getSrcset(file, widths),
  src: (file, width) => getSrc(file, width),
}
```

Now we can add the shortcodes to our Eleventy config:

```javascript
// .eleventy.js
const { srcset, src } = require("./_11ty/shortcodes");

eleventyConfig.addShortcode('src', src);
eleventyConfig.addShortcode('srcset', srcset);
```

Voilà!

## Conclusion
Eleventy shortcodes help us make the onerous process of generating source sets for our images easier.  We can use the flexibility of HTML to customize all the other behavior we want (e.g., lazy loading, classes, etc.).

Check out the full demo on [CodeSandbox](https://codesandbox.io/s/eleventy-image-shortcodes-with-cloudinary-ycq4r?from-embed=&file=/src/_11ty/shortcodes.js):

<iframe src="https://codesandbox.io/embed/eleventy-image-shortcodes-with-cloudinary-ycq4r?fontsize=14&hidenavigation=1&module=%2Fsrc%2F_11ty%2Fshortcodes.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Eleventy image shortcodes with Cloudinary"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

How do you use Eleventy with Cloudinary? I haven't turned this into a plugin yet. Should I? [Ping me on Twitter](https://twitter.com/TheGreenGreek) with your thoughts!

More resources:
- [Eleventy shortcodes](https://www.11ty.dev/docs/shortcodes/)
- [Responsive, Performant Images for the Web](https://sia.codes/posts/responsive-images-perf-matters-video/)
- [Eleventy](https://www.11ty.dev/)

Cover image from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A_possum_and_a_movie_camera_1943.jpg)
