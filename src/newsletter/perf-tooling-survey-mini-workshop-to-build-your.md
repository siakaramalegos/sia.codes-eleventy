---
title: Perf tooling survey, mini workshop to build your blog, and color theme builder
date: 2021-08-08
tags: ['Newsletter']
layout: layouts/newsPost.njk
---
## New post: Web performance tooling
I was curious what tools other performance engineers were using to measure site speed, so I ran an informal survey.

Here are the results... [An Informal Survey of Web Performance Tooling in 2021
](https://sia.codes/posts/survey-web-performance-tooling/).

## New virtual talk: Let's build and deploy your blog already

For GDG New Orleans, I'll be doing a mini-workshop for folks who've been procrastinating building their blog. :) I'll use Eleventy and Netlify. It's a virtual event, so all are welcome to join! Check out the [event page](https://gdg.community.dev/events/details/google-gdg-new-orleans-presents-lets-build-and-deploy-your-blog-already/) to RSVP.

## Nerding out on color

I think my creative and tech sides combine when it comes to color. Dan Hollick's Twitter thread, [Have you ever wondered why the WCAG colour contrast ratio doesn't always seem to work?](https://twitter.com/DanHollick/status/1417895151003865090), was my latest inspiration.

So I've started a new side project to eventually help people create website color palettes. It's built on Preact as I needed it to be very dynamic. Right now, the functionality is similar to other tools, but I want to add these features:

- Add contrast numbers for WCAG AA and AAA but also a more realistic color difference number as mentioned in that thread (delta-E) - use white, black and a user-inputted text color
- Make the start and stop colors for grey scale customizable for more hue-shift options
- Adjust the number of steps
- Set up query params so palettes can be bookmarked and shared
- Preview some common web designs with the inputted numbers

Here's the [current site](https://web-palette-generator.netlify.app/). What do you think? What's missing from current tools that you'd like to have?
