---
title: An Informal Survey of Web Performance Tooling in 2021
description: What tools are web performance engineers using to measure site speed in 2021? Learn which are the most used tools as well as some new tools to try out.
shortDescription: What tools are web performance engineers using to measure site speed in 2021?
date: 2021-08-04
tags: ["WebPerf", "Tools", "Dev Tools"]
layout: layouts/post.njk
# tweetId: '1396940383590965254'
isSelect: true
featuredImage: gustavo-campos-B87zMorEZRo-unsplash_ylwcwa.jpg
---

<figure>
  <img src="{% src 'gustavo-campos-B87zMorEZRo-unsplash_ylwcwa.jpg' %}"
    srcset="{% srcset 'gustavo-campos-B87zMorEZRo-unsplash_ylwcwa.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Red Formula 1 race car in the pit with mechanics all around racing to change tires, etc. View from above."
    width="1830" height="986">
  <figcaption>Start your testing engines with some new performance tooling. Photo by <a href="https://unsplash.com/@gustavocpo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">gustavo Campos</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash.</a>
  </figcaption>
</figure>

Sometimes it's hard to discover all the great web performance measurement tools out there. What are performance engineers using in 2021? What tools do they want to use?

I set out to answer these questions by creating a survey. I shared this survey with the web performance engineering community. It's not statistically perfect (27 responses), but I still found it insightful. I also learned a lot for next year.

This post will cover:

- [Survey questions](#survey-questions)
- [Top web performance tools](#top-web-performance-tools)
- [Top tools people want to use](#top-performance-tools-people-want-to-use)
- [All results](#all-results) (data and chart)
  - [Great tools that were left out](#great-tools-that-were-left-out)
  - [Favorite tools](#favorite-web-performance-tools)
  - [Least favorite tools](#least-favorite-tools)
- [Lessons learned and conclusion](#lessons-learned-and-conclusion)

## Survey questions

The survey asked one question about a large list of tools, "Which tools do you know about and use?" Respondents chose one answer that described their experience with it:

<figure>
  <img src="{% src 'web_perf_tools_survey_preview_byxg98.jpg' %}"
    srcset="{% srcset 'web_perf_tools_survey_preview_byxg98.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Question: Which tools do you know about and use? Column headings: I use this tool regularly, I use this tool sometimes, I want to use this tool, I have no interest in this tool, I don't know this tool. Rows: WebPageTest, Lighthouse, Chrome Network & Performance Tabs, Chrome Coverage Tool, Lighthouse Treemap (Canary), Sitespeed.io, Boomerang, yellowlab.tools, Lighthouse Parade, pagespeed.compare, WebPageTest, Lighthouse, Chrome Network & Performance Tabs"
    loading="lazy"
    width="1832" height="1252">
  <figcaption>Respondents could choose only one answer for each tool</a>
  </figcaption>
</figure>

Find the full list of tools in the [results](#all-results) section below.

These three open-ended questions were also asked at the end:

- Please list any great tools that we left out, and tell us why it's a great tool for measuring web performance! Names and links help.
- What are your top 3 tools favorite tools right now and why?
- What are your least favorite tools from that list and why?

Now let's jump into the data!

## Top web performance tools

Combining the data from the first two columns ("I use this tool regularly" and "I use this tool sometimes") yields a list of the most used tools:

1. [WebPageTest](https://webpagetest.org/) and Chrome [Network](https://developer.chrome.com/docs/devtools/network/) &amp; [Performance](https://developer.chrome.com/docs/devtools/speed/get-started/) Tabs (tied for 1st)
2. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) and Running on a browser with JavaScript disabled (tied for 2nd)
3. [Chrome Coverage tool](https://developer.chrome.com/docs/devtools/coverage/)
4. [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/index.html)
5. [Cloudinary Image Analysis Tool](https://webspeedtest.cloudinary.com/)
6. [WebPageTest API](https://product.webpagetest.org/api) and [WebPageTest comparison URL generator](https://wpt-compare.app/) (tied for 6th)

We can see that WebPageTest and Chrome dominate the list of the top tools. Yet, Qualys' SSL server test and Cloudinary's image analysis tool fill important gaps.

I appreciate that one of the top tools is not a tool at all: turning JavaScript off in the browser settings and seeing what happens on page load.

<aside><strong>Testing without JavaScript</strong>: Going into your browser settings to turn JavaScript on and off can be tiring. My solution is a <a href="https://support.google.com/chrome/answer/2364824?hl=en&co=GENIE.Platform%3DDesktop">separate Chrome profile</a> where JavaScript is permanently turned off. It's buddies with my no-extensions Chrome profile that I use for performance testing. Browser extensions to toggle JavaScript also exist.</aside>

### Top regularly used performance tools

Digging deeper into the most used tools, the ones performance engineers reach for the most often are:

1. Chrome [Network](https://developer.chrome.com/docs/devtools/network/) &amp; [Performance](https://developer.chrome.com/docs/devtools/speed/get-started/) Tabs
2. [WebPageTest](https://webpagetest.org/)
3. [Lighthouse](https://developers.google.com/web/tools/lighthouse)
4. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
5. Running on a browser with JavaScript disabled
6. [Sitespeed.io](https://www.sitespeed.io/)

This category had clear leaders. Only these tools had 25% or more respondents say that they used them regularly.

### Top intermittently used performance tools

1. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Chrome Coverage tool](https://developer.chrome.com/docs/devtools/coverage/), and [Cloudinary Image Analysis Tool](https://webspeedtest.cloudinary.com/) (tied for 1st)
2. [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/index.html)
3. [WebPageTest API](https://product.webpagetest.org/api)
4. [Lighthouse](https://developers.google.com/web/tools/lighthouse)
5. Running on a browser with JavaScript disabled, [WebPageTest comparison URL generator](https://wpt-compare.app/), [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer), and [Yellow Lab Tools](https://yellowlab.tools/) (tied for 5th)

This category had a lot of ties and steadily declining distribution. This group represents those used sometimes by 33% or more respondents. Be sure to check [all results](#all-results) to see more tools.

## Top performance tools people want to use

1. [Boomerang](https://developer.akamai.com/tools/boomerang)
2. [Lighthouse Treemap](#how-can-i-access-lightouse-treemap%3F)
3. [Sitespeed.io](https://www.sitespeed.io/)
4. [WebPageTest API](https://product.webpagetest.org/api) and [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) (tied for 4th)
5. [FRUSTRATIONindex](https://www.frustrationindex.com/)
6. [PageSpeed Compare](https://pagespeed.compare/)

This is an interesting category. It's the set of people who do not already use this tool but would like to. This suggests to me that they see the potential value but something is stopping them. The hurdles could be:

- **Priority** - Do I have the time to try it?
- **Accessibility** - Do I need to install something special? Does it cost money? Does it have an elaborate set up?
- **Complexity** - Do I know how to use it? Can I easily learn?

I bet an opportunity exists for more documentation or learning resources for these tools. I wrote [Explore JavaScript Dependencies With Lighthouse Treemap](/posts/lighthouse-treemap/) because of this data!

## All results

The stacked bar chart below shows the full results. Also, you can find the raw data in this [Google spreadsheet](https://docs.google.com/spreadsheets/d/141cq1kpfewFr0Nx_66XbocyW_zqNSf1oXcn5s5z4K2A/edit?usp=sharing).

<figure id="all-results">
  <img src="/img/posts/performance_tools_survey_results.svg" loading="lazy"
    alt="Stacked bar chart of survey results - see spreadsheet for the data table"
    width="1345" height="1063">
  <figcaption>All responses for all tools</figcaption>
</figure>

### Great tools that were left out

One of the open-ended questions asked respondents which other tools they thought were great. I'll be sure to add these to the survey next year:

- [SpeedCurve](https://www.speedcurve.com/) (mentioned 3 times) - "combined both synthetic testing and real user monitoring to help get a more rounded view of user experience"
- [Calibre](https://calibreapp.com/) (mentioned 3 times) - "Nice and intuitive; I've used it a lot at my work to track both my own estate, and the competition."
- [Request Map](https://requestmap.webperf.tools/) (mentioned twice)
- [What Does My Site Cost?](https://whatdoesmysitecost.com/) - "Good for helping sell perf improvements on global sites."
- [Browsertime](https://github.com/sitespeedio/browsertime)
- [Firefox performance tab](https://developer.mozilla.org/en-US/docs/Tools/Performance)
- [Catchpoint](https://www.catchpoint.com/)
- Core Web Vitals in Search Console - "Real user data is immensely valuable for the many clients we have that can't afford to stand up RUM analytics tools of their own."
- CrUX API for origin RUM data- "We use the raw data from this extensively in our own custom dashboarding."
- [Fastly Historical Stats API](https://developer.fastly.com/reference/api/metrics-stats/historical-stats/)
- [Treo](https://treo.sh/) - "nice performance tracking, including CWV from CrUX for free with [Treo Site Speed](https://treo.sh/sitespeed/)"

Real-user monitoring seems to be a theme here. Some are paid tools with nice tracking and dashboards. Others are iterations of how to access the Chrome UX Report data for a particular site (Core Web Vitals).

{% include 'newsletter-aside.njk' %}

### Favorite web performance tools

The favorites data can be summarized with the following quote from the responses:

> WebPagetest, WebPagetest, WebPagetest. It's just an amazing tool, it does loads of stuff, and it's constantly improving.

WebPageTest was mentioned by 70% of the respondents. That number jumps up to 86% if you only include people who answered the question. No other tool came close, but here are the top 5:

1. [WebPageTest](https://webpagetest.org/)
2. Chrome [Network](https://developer.chrome.com/docs/devtools/network/) &amp; [Performance](https://developer.chrome.com/docs/devtools/speed/get-started/) Tabs (or "Dev Tools")
3. [Sitespeed.io](https://www.sitespeed.io/)
4. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
5. [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Least favorite tools

For this question, most people were happy with all tools. However, some concerns are valid though it's not always about the tool itself. Here are a few quotes:

> PageSpeed Insights - This tool is both a blessing and a curse. It's a blessing because for developers it has a lot of useful information if you know how to read it. But we have a lot of non-developers who just look at the score and judge by that.

Lighthouse is the engine behind the PageSpeed Insights scores and recommendations. I both love and semi-dislike Lighthouse for the same reason. Even developers can focus on the top score at the expense of everything else. Lighthouse is great for people newer to performance because so many learning resources are connected to each audit. But, we need to get past focusing on "Lighthouse 100".

> Lighthouse and WebPageTest: If you use Lighthouse you supports Chrome monopoly and the Googles surveillance capitalism. I really liked WebPageTest when it was Open Source. Now it's got a non Open Source license and backed by venture capitalists. Every issue you create, every move you make with that tool, you help those venture capitalists to make more money when they sell Catchpoint.

Another comment lamented the US-focus of PageSpeed Insights. We need to be mindful of a website's target audience. If it's a non-US country, then testing from the US is never going to yield results in line with real user experiences.

A few mentioned the Chrome Coverage tool.  Different user journeys could use different parts of the code. I always give a caveat with this tool because once you start interacting with the page, the JS and CSS usages increase.

## Lessons learned and conclusion

I think this was a great starting point for a survey of this type. In the future, I'd like to:

- Include more RUM tools
- Get suggestions for new tools to add before launching
- Ask questions about respondents' roles/jobs
- Get more of the performance community to respond to the survey

Are these results in line with what you expected? Was anything surprising? Do you have suggestions for next year? Let me know on Twitter or in the webmentions!
