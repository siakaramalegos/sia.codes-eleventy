---
title:  "How to Eliminate Render-Blocking Resources: a Deep Dive"
description: Is Lighthouse telling you to eliminate render-blocking resources? Learn what this means, why it's important, and how to fix it in your HTML, CSS, and JavaScript.
shortDescription: Is Lighthouse telling you to eliminate render-blocking resources? Learn what it means and how to fix it.
date: 2021-07-13
tags: ['WebPerf', 'JavaScript', 'Popular']
layout: layouts/post.njk
tweetId: '1414934155750690836'
isSelect: true
featuredImage: buffalo-blocking-road-tim-wilson_mpq4nt.jpg
---

<figure>
  <img src="{% src 'buffalo-blocking-road-tim-wilson_mpq4nt.jpg' %}"
    srcset="{% srcset 'buffalo-blocking-road-tim-wilson_mpq4nt.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Large buffalo blocking the roadway"
    width="4001" height="2671">
  <figcaption>Don't let render-blocking resources block you on the road to good performance. Photo by <a href="https://unsplash.com/@timwilson7?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Wilson</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

You might be here because Lighthouse told you to "eliminate render-blocking resources". Render-blocking resources are a common hurdle to rendering your page faster. They impact your Web Vitals which now impact your SEO. Slow render times also frustrate your users and can cause them to abandon your page.

I worked with one client to reduce their render-blocking resources and improved their site loading speed. We went from 13% to 80% of page visits experiencing First Contentful Paint (FCP) in less than 1.8 seconds. And we're not done yet!

<aside><strong>Why is 1.8 seconds significant for First Contentful Paint?</strong> <a href="https://httparchive.org/reports/loading-speed#fcp">HTTP Archive</a> collects data from the top ~7 million URLs. Lighthouse <a href="https://web.dev/performance-scoring/#metric-scores">uses this data</a> to determine the top performing sites. Then the "green" level is set at the point where increased performance improvements have diminishing returns.</aside>

Understanding render-blocking resources will enable you to fix this common web performance issue. In this post, you will learn:

- [What the critical rendering path is](#what-is-the-critical-rendering-path%3F)
- [What render-blocking resources are](#what-are-render-blocking-resources%3F)
- [Why they are important to performance](#why-is-it-so-important-to-eliminate-render-blocking-resources%3F)
- [How to test and measure your website](#how-do-i-test-my-website-for-render-blocking-resources%3F)
- [How to fix this issue](#how-do-i-remove-render-blocking-resources%3F)

Before we continue, we need to take a step back and understand what the critical rendering path is.

## What is the critical rendering path?

We write HTML, CSS, and JavaScript in files and then deliver those files to the browser. The browser converts those files into the page you see through the **critical rendering path**. The steps are:

1. Download the **HTML**
2. Read the HTML, and concurrently:
    - Construct the **Document Object Model** (DOM)
    - Notice a `<link>` tag for a stylesheet and download the **CSS**
3. Read the CSS and construct the **CSS Object Model** (CSSOM)
4. Combine the DOM and the CSSOM into a **render tree**
5. Using the render tree, compute the **layout** (size and position of each element)
6. **Paint**, or render, the pixels on the page

<figure id="critical-render-path">
  <img src="/img/critical_render_path_sia_karamalegos.svg" loading="lazy"
    alt="Steps of the critical render path visualized in a diagram"
    width="595" height="707">
  <figcaption>The critical render path (<a href="#critical-render-path">link</a>)</figcaption>
</figure>

We want this process to go as fast as possible. Can you guess what makes it go slower?

{% include 'newsletter-aside.njk' %}

## What are render-blocking resources?

Render-blocking resources are files that "press pause" on the critical rendering path. They interrupt one or more of the steps.

HTML is technically render blocking because you need it to create the DOM. Without the HTML we would not even have a page to render.

However, HTML is not usually the cause of our problems...

**CSS is render blocking**. The browser needs it before it can create the CSSOM, which blocks all later steps. As soon as the browser encounters a stylesheet `<link>` or `<style>` tag, it must download and parse the contents. Then it must create the CSSOM before the rest of the render can continue. You can see this represented at the triangle point in the [diagram](#critical-render-path). The render tree cannot continue until both the CSSOM and DOM are created.

**JavaScript CAN be render blocking**. When the browser encounters a script meant to run synchronously, it will stop DOM creation until the script is finished running:

<figure id="critical-render-path-js">
  <img src="/img/critical_render_path_JS_karamalegos.svg" loading="lazy"
    alt="HTML encounters a synchronous script in the head which stops the parser"
    width="794" height="858">
  <figcaption>Synchronous JavaScript (no async or defer) will block the HTML parser during both download and execution of the JavaScript (<a href="#critical-render-path-js">link</a>)</figcaption>
</figure>

Additionally, if CSS appears before a script, the script will not be executed until the CSSOM is created. This is because JavaScript can also interact with the CSSOM, and we would not want a race condition between them.

<figure id="critical-render-path-css-js">
  <img src="/img/critical_render_path_CSS_JS_karamalegos_2.svg" loading="lazy"
    alt="HTML encounters CSS first, then a synchronous script in the head which stops the parser"
    width="595" height="862">
  <figcaption>JavaScript execution is blocked until the CSSOM is created (<a href="#critical-render-path-css-js">link</a>)</figcaption>
</figure>

CSS blocks script execution, and JavaScript blocks construction of the DOM! Sounds like a giant mess, right? Stay tuned to [learn how we can clean it up](#how-do-i-remove-render-blocking-resources%3F)!

<aside><strong>Note:</strong> Images and fonts are not render-blocking. They might be rendering slowly due to render-blocking resources or other performance issues. Read <a href="/posts/making-google-fonts-faster/">Making Google Fonts Faster</a> for tips on fonts. Watch my introductory talk on <a href="/posts/responsive-images-perf-matters-video/">Responsive Images</a> to learn more about optimizing images.</aside>

## Why is it so important to eliminate render-blocking resources?

Render-blocking resources can trigger a cascade of failures for web performance. First paint gets slowed down which causes Largest Contentful Paint (LCP) to be slower. LCP is one of the Core Web Vitals which are now [used to calculate your search engine rankings](https://developers.google.com/search/docs/advanced/experience/page-experience).

SEO is important for discovery of your website. Performance is critical for keeping a visitor on your page. Page abandonment increases significantly if the page doesn't load within 3 seconds. Many companies have seen significant increases in conversions after improving performance.

<blockquote>
  <p>Vodafone improved their LCP by 31%, resulting in an 8% increase in sales, a 15% increase in their lead to visit rate, and an 11% increase in their cart to visit rate.</p>
  <p class="blockquote-source">—<a href="https://wpostats.com/2021/03/18/vodafone-lcp-sales.html">WPO stats</a></p>
</blockquote>

[WPO stats](https://wpostats.com/) lists many cases where improving performance resulted in real business impacts.

## How do I test my website for render-blocking resources?

If you failed this metric in Lighthouse, then you've already discovered one way to test for this. If you're new to Lighthouse, then check out the official [Lighthouse](https://developers.google.com/web/tools/lighthouse) page to get started.

We all have render-blocking resources on our sites (all the CSS!). The problem comes in when it significantly impacts our performance. When this occurs, Lighthouse flags it, and we should do something about it.

Lighthouse candidates for render-blocking resources include both scripts and styles:

- `<script>` tags in the `<head>` which do not have at least one of the following attributes: `async`, `defer`, `module`
- Stylesheet `<link>` tags in the `<head>` without a `disabled` attribute or a media query which does not match (e.g., `print`)

If you fail this metric, your Lighthouse results will look something like this:

<figure>
  <img src="{% src 'eliminate_render_blocking_resources_lighthouse_ujbxsj.jpg' %}"
    srcset="{% srcset 'eliminate_render_blocking_resources_lighthouse_ujbxsj.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="Eliminate render-blocking resources: Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. The table shows these two resources listed: /css?family=…(fonts.googleapis.com) and /scripts/jquery-3.4.1.js(lh-perf-failures.glitch.me)"
    width="1774" height="626">
  <figcaption>Once you expand the metric name, you will see a list of resources that blocked render</figcaption>
</figure>

Lighthouse lists the Google Fonts stylesheet followed by a JQuery script. Let's dig in some more. Let's inspect the `<head>` on that [sample failure site](https://lh-perf-failures.glitch.me/). It shows us 3 stylesheets followed by 3 scripts, then 2 more stylesheets:

```html
<head>
  <title>Lighthouse performance audit failures</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="styles/bootstrap-grid.css">
  <link rel="stylesheet" href="styles/bootstrap-reboot.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">

  <script src="scripts/jquery-3.4.1.js"></script>
  <script src="scripts/bootstrap.js"></script>
  <script src="scripts/bootstrap.bundle.js"></script>

  <link href="styles/main.css" type="text/css" rel="stylesheet" media="screen,print">
  <link href="styles/bootstrap.css" type="text/css" rel="stylesheet" media="screen,print">
</head>
```

Lighthouse could have flagged any one of those 3 initial stylesheets. The root cause of this failure is:

- The first 3 stylesheets block the 3 synchronous scripts from running. The browser must first download the stylesheet and create  the CSSOM.
- The browser cannot construct the rest of the DOM  until it downloads, parses, and executes the 3 scripts.

We're digging a deep hole here.

Another way to test for render-blocking resources is to use [WebPageTest](https://webpagetest.org/easy). WebPageTest is the next step up in performance profiling. If you enter a URL, it will run a performance test on a real mobile device. Once the test finishes, click on the waterfall for the median run. Then you can check each request row:

<figure>
  <img src="{% src 'WebPageTest_show_render_blocking_grw3n7.jpg' %}"
    srcset="{% srcset 'WebPageTest_show_render_blocking_grw3n7.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="WebPageTest waterfall pointing to a request row, and then the request details where the render-blocking status shows up"
    width="2430" height="1368">
  <figcaption>The WebPageTest request details tab will show render-blocking status for each request</figcaption>
</figure>

Check out the official [WebPageTest docs](https://docs.webpagetest.org/getting-started/) for more detailed information to get started.

## How do I remove render-blocking resources?

It's time to fill in that hole and fix our website. Let's dive deep into both CSS and JavaScript. Our goal is not to eliminate all render-blocking resources but to lower their impact on performance. The Lighthouse metric is good for determining when you reach that point.

### Deep-dive: optimizing CSS for the critical rendering path

For our CSS, we want to

1. **Minimize** the size of our styles
2. Deliver them to the client **quickly** and **effectively**

That [sample failure site](https://lh-perf-failures.glitch.me/) is great. I need to buy whoever built it a beer. It's so juicy with performance problems. Let's take a step back and observe all the stylesheet tags. We can see that this website is using Bootstrap and a lot of Bootstrap dependencies as well as 12 Google fonts. It also has screen and print styles combined into single CSS files.

The first question I would ask is:

> Do I need all those dependencies?

Don't skip that first question. The easiest way to minimize total size for any asset is to annihilate it. Raze it to the ground. For example, 12 Google fonts seems excessive. I try to keep my web fonts down to 3-4 style sets max.

<aside>If you use <strong>Wordpress</strong>, be very careful how many and which plugins you use. Many of them were naively built without performance in mind. Look at alternatives with better performance.</aside>

The next easiest way to minimize total CSS is to, well, minimize it. Minification is the process by which a build tool removes unused white space. Fewer characters = smaller size = faster download. If you're using a CSS package, make sure you use the minified version of it. The next step up is to use a build tool to automatically minimize all your CSS. Example tools include Gulp, Grunt, webpack, and Parcel. [Snowpack](https://www.snowpack.dev/) and [Vite](https://vitejs.dev/) are interesting newer tools.

Next, I would try to break up my CSS into smaller chunks. Ideally, we only want to deliver the CSS that we will actually use. You can see how much of your CSS (and JavaScript) is actually used with the [Coverage drawer](https://developer.chrome.com/docs/devtools/coverage/) in Chrome Dev Tools.

1. Open Dev Tools
2. Press Cmd + Shift + P to open the quick menu
3. Type "Coverage" and then select "Show Coverage"

The drawer will open up for you, and you can click the reload button to start a new coverage analysis. Here is an example from the New York Times website:

<figure>
  <img src="{% src 'coverage_analysis_css_njif6w.jpg' %}"
    srcset="{% srcset 'coverage_analysis_css_njif6w.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="Chrome Dev Tools Coverage tab showing table of URLs, total bytes, and unused bytes with a bar chart representing used/unused bytes"
    width="2152" height="696">
  <figcaption>The Coverage tool gives us data for used versus unused bytes</figcaption>
</figure>

If your total CSS bytes are small, then the unused percentage becomes less important. For example, my home page is around 57% unused. Because my total CSS is small, my Lighthouse scores are still around 97-100.

Note that it's only accurate for the styles (or scripts) used thus far. As you interact or resize the page, those numbers will go up.

Your goal is not necessarily 0% unused. However, if you see big red bars and high unused bytes, it's time to reduce the CSS needed for initial render. Remove dependencies, use code splitting, or inline critical CSS and defer the rest. For those last two options, you definitely want to use a build tool. Check out [Extract critical CSS](https://web.dev/extract-critical-css/) for more details including popular tools.

If you have a lot of non-screen styles, consider extracting them to their own stylesheet. Then use a media query on the `<link>` tag. For example:

```html
  <link href="styles/main.css" type="text/css" rel="stylesheet" media="screen">
  <!-- Only downloaded for print: -->
  <link href="styles/main_print.css" type="text/css" rel="stylesheet" media="print">
```

Finally, do not use `@import` in your stylesheets to load more stylesheets. The browser won't discover it until later. It's best to load them with `<link>` tags in your HTML.

### Deep-dive: optimizing JavaScript for the critical rendering path

As I mentioned earlier, JavaScript is parser-blocking. This means that it blocks DOM construction until it is finished executing. Like CSS, we want to:

1. **Minimize** the size of our scripts
2. Deliver them to the client **quickly** and **effectively**

The Coverage drawer also analyzes your scripts. You can filter the results between CSS and JavaScript. Again, the first question to ask yourself is:

> Do I need all those dependencies?

JavaScript is our most expensive asset and prone to bloat. Trim out unused dependencies. Additionally, use [code-splitting](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting), [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), and/or [lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) features as needed. Your build tool is your friend for all these strategies.

Let's talk about delivering our JavaScript effectively. The best diagram I've seen for understanding async vs defer vs module is from the [HTML spec](https://html.spec.whatwg.org/multipage/scripting.html):

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 200"><style><![CDATA[.svg-label,.svg-tag{dominant-baseline:central}.svg-tag{font-weight:700;font-family:monospace;font-size:13px}.svg-label{font-family:sans-serif;font-size:10px}.parser{stroke:#6eae00;fill:#6eae00}.fetch{stroke:#0035ff;fill:#0035ff}.execution{stroke:red;fill:red}.progress{stroke-width:2}.progress.parser:not(.first){marker-start:url(#parser-marker)}.progress.parser:not(.last){marker-end:url(#parser-marker)}.progress.fetch:not(.first){marker-start:url(#fetch-marker)}.progress.fetch:not(.last){marker-end:url(#fetch-marker)}.progress.execution:not(.first){marker-start:url(#execution-marker)}.progress.execution:not(.last){marker-end:url(#execution-marker)}marker>circle{stroke-width:0}.connector{stroke:#cecece;stroke-width:1}]]></style><path d="M0 33.5h820M0 66.5h820M0 99.5h820m-820 33h820M245.5 1v28m0 9v24m0 6v27m0 9v24m0 9v28" stroke="#6a9400" stroke-dasharray="1,1"/><defs><marker id="parser-marker" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5"><circle cx="1.5" cy="1.5" r="1.5" class="parser"/></marker><marker id="fetch-marker" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5"><circle cx="1.5" cy="1.5" r="1.5" class="fetch"/></marker><marker id="execution-marker" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5"><circle cx="1.5" cy="1.5" r="1.5" class="execution"/></marker></defs><text x="12" y="16.75" class="svg-tag">&lt;script&gt;</text><text y="9" class="svg-label" transform="translate(252)">Scripting:</text><text y="24" class="svg-label" transform="translate(252)">HTML Parser:</text><path class="connector" d="M509 9v15M656 9v15"/><path class="parser progress first" d="M358 24h151"/><path class="fetch progress" d="M509 9h97"/><path class="execution progress" d="M606 9h50"/><path class="parser progress last" d="M656 24h128"/><text x="12" y="16.75" class="svg-tag" transform="translate(0 33)">&lt;script defer&gt;</text><text y="9" class="svg-label" transform="translate(252 33)">Scripting:</text><text y="24" class="svg-label" transform="translate(252 33)">HTML Parser:</text><path class="connector" d="M736 42v15"/><path class="parser progress first" d="M358 57h378"/><path class="fetch progress" d="M509 42h97"/><path class="execution progress last" d="M736 42h48"/><g><text x="12" y="16.75" class="svg-tag" transform="translate(0 66)">&lt;script async&gt;</text><text y="9" class="svg-label" transform="translate(252 66)">Scripting:</text><text y="24" class="svg-label" transform="translate(252 66)">HTML Parser:</text><path class="connector" d="M606 75v15m50-15v15"/><path class="parser progress first" d="M358 90h248"/><path class="fetch progress" d="M509 75h97"/><path class="execution progress" d="M606 75h50"/><path class="parser progress last" d="M656 90h128"/></g><g><text x="12" y="16.75" class="svg-tag" transform="translate(0 99)">&lt;script type=&quot;module&quot;&gt;</text><text y="9" class="svg-label" transform="translate(252 99)">Scripting:</text><text y="24" class="svg-label" transform="translate(252 99)">HTML Parser:</text><path class="connector" d="M736 108v15"/><path class="parser progress first" d="M358 123h378"/><path class="fetch progress" d="M509 108h97m0 0h20m-20 0l20 7.5m0 0h20m0 0h20m-20 0l20-7.5"/><path class="execution progress last" d="M736 108h48"/></g><g><text x="12" y="16.75" class="svg-tag" transform="translate(0 132)">&lt;script type=&quot;module&quot; async&gt;</text><text y="9" class="svg-label" transform="translate(252 132)">Scripting:</text><text y="24" class="svg-label" transform="translate(252 132)">HTML Parser:</text><path class="connector" d="M666 141v15m50-15v15"/><path class="parser progress first" d="M358 156h308"/><path class="fetch progress" d="M509 141h97m0 0h20m-20 0l20 7.5m0 0h20m0 0h20m-20 0l20-7.5"/><path class="execution progress" d="M666 141h50"/><path class="parser progress last" d="M716 156h68"/></g><g class="legend" transform="translate(357.5 172)"><circle cx="3" cy="3" r="3" class="parser"/><text x="9" y="3" class="svg-label">parser</text><circle cx="50" cy="3" r="3" class="fetch"/><text x="56" y="3" class="svg-label">fetch</text><circle cx="90" cy="3" r="3" class="execution"/><text x="96" y="3" class="svg-label">execution</text></g><text x="782" y="175" text-anchor="end" class="svg-label">runtime →</text></svg>

- **no attributes**: The HTML parser is blocked during script download and execution.
- **defer**: The HTML parser is not blocked. The browser downloads scripts as it identifies them. It only executes the scripts once it finishes creating the DOM.
- **async**:  The HTML parser is blocked during script execution. The browser downloads scripts as it identifies them. After download, the scripts block the HTML parser until execution finishes.
- **module**: Behaves like defer but can manage ES6 module imports.

Choose wisely. In most cases you will want either `defer` or `async` to optimize the critical rendering path. If you have an inline script which must run synchronously, test moving it above your styles in your HTML.

## Conclusion

Render-blocking resources can kick off a cascade of performance issues. Those performance issues result in unhappy users who abandon your page faster.

Lighthouse and the Coverage tool can help you identify this issue and evaluate what your best options are. We learned to:

- reduce our CSS and JavaScript bytes,
- lazy-load non-critical CSS and JavaScript, and
- use the `defer`, `async`, or `module` attribute on our scripts.

I'd love to hear what worked for you! [Tweet at me](https://mobile.twitter.com/TheGreenGreek) with your replies.

Fixing web performance issues can be overwhelming. If you need more help, I'm available for performance consulting projects. [Contact me](/contact) today!

Special thanks to [Barry Pollard](https://twitter.com/tunetheweb) and [Anthony Ricaud](https://ricaud.me/) for their help with proofreading and editing!
