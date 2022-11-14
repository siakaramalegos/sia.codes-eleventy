---
title: New Eleventy starter, initial thoughts on Astro, website fun, and 11ty meetup
date: 2021-08-13
layout: layouts/newsPost.njk
---
## New Eleventy Blog Starter

In my last newsletter, I mentioned that I'm giving a mini workshop on building and deploying an Eleventy blog. I forked the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog), which was my original starting point, and made some opinionated changes:

- Uses a /src/ directory
- Moves most filters to a separate file to clean up the config file
- Adds more filters commonly used by me
- Inlines and minifies CSS by default
- Uses a more accessible color scheme for code blocks, and uses CSS variables so it's easier to switch it up.
- Adds RSS link to navigation
- Uses a responsive font size and flow system that is more readable, partially based on [Improve the readability of the content on your website](https://piccalil.li/tutorial/improve-the-readability-of-the-content-on-your-website/) by Andy Bell
- Adds a footer at the bottom of the viewport
- Centers post article column, with wider image and code blocks, similar to the [Hylia](https://hylia.website/) starter

Like the sound of that? You can [preview a build](https://11ty-sia-blog.netlify.app/) and [checkout out the GitHub repo](https://github.com/siakaramalegos/11ty-sia-blog). The event is on Tuesday if you still want to [join](https://gdg.community.dev/events/details/google-gdg-new-orleans-presents-lets-build-and-deploy-your-blog-already/).

## Initial Thoughts on Astro

I have a legacy webpack project that is mostly HTML pages with vanilla JS and one page that is a full React app. I've been wanting to add HTML templating for all the regular HTML pages. Eleventy would be great, but I still have that one page that is mostly a React app.

[Slinkity](https://slinkity.dev/) is a promising-looking Eleventy plugin, but still very early stage. So I started trying out [Astro](https://astro.build/). It's pretty slick. Here are my pros and cons so far:

- Pro: Easy to create a new project using the CLI
- Pro: Can use most JS frameworks (React, Preact, Vue, Angular, Svelte) and regular HTML templates with the `.astro` file type.
- Pro: Porting over my SCSS *just worked*
- Con: Vanilla JS is still tricky. There is no bundling, transpiling, etc. available yet. So you have to inline it all in your HTML (if you're not using a framework component). They are working on this.
- Con: It's built on Snowpack but they hijack and use their own server, so all the Snowpack dev server config stuff isn't available yet. I need to proxy an API web server (a Rails backend), but this isn't possible yet.

I'm still excited about it. I think it's a big step in the right direction. I'm not sure why Webpack chose JavaScript to be the only entry point for a bundler as the web uses HTML. So it was always tricky to set up configs to work with a mixture of HTML and frameworks.

Sometimes I wish they went with a more established templating language link Nunjucks, but then Astro files can use straight up JavaScript which makes some things easier. However, you can't dump in content inside `<script>` tags. This point might become moot if they get a Script component working which will also transpile and bundle vanilla JS.

What cool new tools have you tried out lately? Drop me a line on [Twitter](https://twitter.com/TheGreenGreek)!

## Building websites is fun

I don't have any new blog posts for this episode, but if you want a fun tongue-in-cheek read for this Friday, check out [How to build a website in 2021](https://sia.codes/posts/how-to-build-a-website/).

## 11ty Meetup Episode 2!

Our second Eleventy meetup is next week! We're learning about 11ty image and the creator economy. Check out all the deets on [11tymeetup.dev](https://11tymeetup.dev/).

Cheerio and Happy Friday!
