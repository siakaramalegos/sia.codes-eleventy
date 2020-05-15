---
title: Architecting data in Eleventy
description: Setting and using data in the static site generator Eleventy
date: 2020-05-13
tags: ['IndieWeb', 'Eleventy', 'JavaScript']
layout: layouts/post.njk
# tweetId: '1197670409543540738'
# isSelect: true
# featuredImagePrefix: /img/pixelbook/pixelbook
---

[Eleventy](https://www.11ty.dev/) is a static site generator that makes building static, performant websites a breeze. It uses JavaScript to build pages at build time, but does not require any JavaScript in the client to render them.

Eleventy's magic comes with powerful tools for data, but the data model can be a lot to conceptualize when you're new to Eleventy. In this post, I'll explain the hierarchy of the data that we can work with and how to access it. I'll use real-world examples for learners like me who understand concepts better when they see them applied in practice. Disclaimer: opinions ahead! I'm going to focus more on the concepts that will help you in decision making. Links are provided if you want to dive into the details of any one concept. I hope to make a second post in this series that talks about manipulating data, so stay tuned!

The examples here will use HTML, Markdown, JavaScript, JSON, and [Nunjucks](https://mozilla.github.io/nunjucks/templating.html). For reference, I'm using [Eleventy version 0.11.0](https://github.com/11ty/eleventy/releases/tag/v0.11.0) as it has a few cool new tools.

## Getting started
The [Eleventy docs](https://www.11ty.dev/docs/) are a key place to start understanding the different features. We're going to take these a few steps further to give you an over-arching understanding of how it all works together.

To follow along, you can find the code in my [eleventy-data-tutorial](https://github.com/siakaramalegos/eleventy-data-tutorial) repo. The master branch contains a bare-bones starting Eleventy app with an index.html and a single layout.

## How do I see my data??
As someone used to building apps with front-end frameworks or client-side JavaScript, I felt like a deer in the headlights when I first wanted to "see" my data. Eleventy is using JavaScript to build full HTML pages in Node, not render them in a browser. This means we don't have access to browser dev tools like the debugger or the browser console.

We do have access to the terminal/command line console and the rendered pages. New in version 0.11.0, we have access to a [`log`](https://www.11ty.dev/docs/filters/log/) "universal filter" which performs a `console.log()` accessible in our terminal (remember, we're in Node land!). [Filters](https://mozilla.github.io/nunjucks/templating.html#filters) are functions, and we write them in our templates by first listing the first parameter, then the filter name. If the filter accepts more than one parameter, we add them in parentheses:

{% raw %}
```html
<!-- _includes/layout.njk -->

<!-- console.log the page data -->
{{ page | log }}

<!-- run myCustomFilter on 2 params, the title data and anotherParam -->
{{ title | myCustomFilter(anotherParam) }}
```
{% endraw %}

I make heavy use of the `log` filter to debug my builds (since most of my bugs are from not handling the data correctly), and it's great to have this built in now. Another option is to output the data to the rendered page, but that doesn't work with complex objects.

Note that you can also run Eleventy in [debugging mode](https://www.11ty.dev/docs/debugging/) for other information. I'm still learning how to best use this tool.

## Page data
Every page has a [`page`](https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable-contents) object available in the template which includes data like input and output file paths, the file slug, and URL. See it in your command line by logging it:

{% raw %}
```html
<!-- _includes/layout.njk -->

<!-- console.log the page data -->
{{ page | log }}
```
{% endraw %}

And your output will look something like this:

```javascript
{
  date: 2020-05-13T19:31:02.218Z,
  inputPath: './src/index.html',
  fileSlug: '',
  filePathStem: '/index',
  url: '/',
  outputPath: '_site/index.html'
}
```

Note that the file slug is an empty string for the index file. If I add a new folder called `/posts` with a file called `my-first-post.md`, I get this page data:

```javascript
{
  date: 2020-05-13T20:12:20.649Z,
  inputPath: './src/posts/my-first-post.md',
  fileSlug: 'my-first-post',
  filePathStem: '/posts/my-first-post',
  url: '/posts/my-first-post/',
  outputPath: '_site/posts/my-first-post/index.html'
}
```

By default, Eleventy builds pages based on your file and directory structure. In the [`1-page-data` branch](https://github.com/siakaramalegos/eleventy-data-tutorial/tree/1-page-data) of the repo, you can see the pages logged to the console if you run `npm start`.

Before we move on to custom data, note that Eleventy also provides `pagination` data to a page. Pagination is a very specific use case, so I won't cover it here. Read more about [pagination in the docs](https://www.11ty.dev/docs/pagination/).

## Collection data
With [collections](https://www.11ty.dev/docs/collections/), we are upping the magicalness of Eleventy. Collections are groups of pages that are grouped by [tags](https://www.11ty.dev/docs/collections/#tag-syntax)*. To conceptualize this, think of a traditional blog with posts on multiple topics. One post might be tagged `JavaScript` while another might be tagged both `JavaScript` and `HTML`. If you like relational databases, think of tags and pages as having a many-to-many relationship.

Collections are useful for rendering lists of pages that include the ability to navigate to those pages. For example, an index page for your blog posts or a list of pages with the same content tag.

Collections are JavaScript objects, and each key is the tag name. The value for each key is an array of pages. Tags are set using the data hierarchy which I'll get to in a bit, and this is what the `collections` object looks like if we `log` it from our home page:

```javascript
{
  // By default, the `all` key is created and includes all pages.
  all: [
    {
      template: [Template],
      inputPath: './src/index.html',
      fileSlug: '',
      filePathStem: '/index',
      data: [Object],
      date: 2020-05-13T19:31:02.218Z,
      outputPath: '_site/index.html',
      url: '/',
      templateContent: [Getter/Setter]
    },
    // ...rest of all pages
  // Pages tagged as "posts"
  posts: [
    {
      template: [Template],
      inputPath: './src/posts/my-first-post.md',
      fileSlug: 'my-first-post',
      filePathStem: '/posts/my-first-post',
      data: [Object],
      date: 2020-05-13T20:12:20.649Z,
      outputPath: '_site/posts/my-first-post/index.html',
      url: '/posts/my-first-post/',
      templateContent: [Getter/Setter]
    },
    // ...rest of posts
  podcasts: [
    {
      template: [Template],
      inputPath: './src/podcasts/my-first-podcast.md',
      fileSlug: 'my-first-podcast',
      filePathStem: '/podcasts/my-first-podcast',
      data: [Object],
      date: 2020-05-13T20:23:43.665Z,
      outputPath: '_site/podcasts/my-first-podcast/index.html',
      url: '/podcasts/my-first-podcast/',
      templateContent: [Getter/Setter]
    }
  ],
  JavaScript: [
    {
      template: [Template],
      inputPath: './src/podcasts/my-first-podcast.md',
      fileSlug: 'my-first-podcast',
      filePathStem: '/podcasts/my-first-podcast',
      data: [Object],
      date: 2020-05-13T20:23:43.665Z,
      outputPath: '_site/podcasts/my-first-podcast/index.html',
      url: '/podcasts/my-first-podcast/',
      templateContent: [Getter/Setter]
    },
    {
      template: [Template],
      inputPath: './src/posts/my-second-post.md',
      fileSlug: 'my-second-post',
      filePathStem: '/posts/my-second-post',
      data: [Object],
      date: 2020-05-13T20:24:27.709Z,
      outputPath: '_site/posts/my-second-post/index.html',
      url: '/posts/my-second-post/',
      templateContent: [Getter/Setter]
    }
  ]
}
```

Note that:
- The collections object by default includes an `all` key which includes all pages.
- I have tagged by both content type (posts vs podcasts) which matches my routing, and by topic (JavaScript).

You are not limited by how you want to use tags and collections.

**The benefit collections give you is grouping pages by a string key which gives you access to all group members' urls and other data.**

A new feature in version 0.11.0 is a universal filter for giving you [previous and next items in a collection](https://www.11ty.dev/docs/filters/collection-items/). By default, these are [sorted](https://www.11ty.dev/docs/collections/#sorting) by file creation date which can be overridden.

In the [`2-collections` branch](https://github.com/siakaramalegos/eleventy-data-tutorial/tree/2-collections) of the repo, I created index pages for both the podcasts and posts, and added those index pages to the site's navbar, all using collections.

### * Custom collections
Tags are the most common way of creating collections, but you can actually create [custom collections](https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting) using JavaScript in your Eleventy config. [Phil Hawksworth](https://twitter.com/philhawksworth) uses this feature in [his blog](https://www.hawksworx.com/) to create a collection of the tags themselves as well as create a collection of all items in the blog folder, among other things:

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {

    // Assemble some collections
  eleventyConfig.addCollection("tagList", require("./src/site/_filters/getTagList.js"));
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });
  eleventyConfig.addCollection("cards", function(collection) {
    return collection.getAll().filter(function(item) {
      return "card" in item.data;
    });
  });

};
```

See Phil's [source code](https://github.com/philhawksworth/hawksworx.com/blob/fe1cfc2dfecea0b141b035f019cb315aaaeb02ef/.eleventy.js#L22-L31).

## Template data
So far, we've only been using the data supplied by Eleventy with only a few custom data elements that I snuck in while you weren't looking. 👀 Let's take a look at those now.

In `/src/posts/my-first-post.md`, I use [YAML](https://learnxinyminutes.com/docs/yaml/) front matter to set a few data attributes for my page - the `title`, which `layout` to use, and which `tags` should be applied to add this page to those collections:

```yaml
# /src/posts/my-first-post.md
---
title: My first blog post
layout: post.njk
tags: ['posts']
---

Bootcamp .NET npm branch Agile grep native senior. Database webpack
pairing build tool pull request imagemagick. AWS injection OOP
stack Dijkstra looks good to me Firefox bike-shedding scrum master.
```

We learned about `tags` already; `layout` is a similar special template data key in Eleventy which tells it which [layout file](https://www.11ty.dev/docs/layouts/) to use for your page (found in a `/_includes/` folder). Other [special template data keys for templates](https://www.11ty.dev/docs/data-configuration/) include `permalink`, `date`, and more.

## Custom data and the data hierarchy
Finally, we come to custom data. In the example above, I set a `title` attribute in my front matter. This is not data automatically supplied nor used by Eleventy. It is completely custom. In this case, I use it to populate both my webpage's `<title>` element and the primary heading, or `<h1>`. Custom data you set in this manner is available directly in a template using the name you gave it:

{% raw %}
```html
<!-- /src/_includes/post.njk -->
---
layout: layout.njk
---

<h1>{{ title }}</h1>
{{ content | safe }}
```
{% endraw %}

Eleventy uses a [data hierarchy](https://www.11ty.dev/docs/data/#sources-of-data) so that you can set defaults or inheritance and then override them:

1. Computed Data
2. Front Matter Data in a Template
3. Front Matter Data in Layouts
4. Template Data Files
5. Directory Data Files (and ascending Parent Directories)
6. Global Data Files

In my example, we're using #2 in the hierarchy... and also #3 - you have to go to my highest-level layout to find it:

{% raw %}
```html
<!-- /src/_includes/layout.njk -->
---
title: My default layout title
---
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }}</title>
  <!-- ...rest of html -->
```
{% endraw %}

The `title` set in `my-first-post.md` overrides the `title` set in the layout. If a `title` attribute is missing, then the default one set in `layout.njk` is used. Wicked smart!

Now that we know about this data hierarchy, we can clean up some of our front matter by using a directory data file. Here's where we get a little muddy in our explanation since you can use the data hierarchy for template data too, not just custom data. In my `/posts/` folder, I can create a file with the same name as the folder and with either a `.json`, `.11tydata.json` or `.11tydata.js` extension that applies that data to all the files (i.e., templates/pages) in that folder.

We can use this to set the `layout` file and the `posts` tag to all the files in the `/posts/` folder, then remove those from the individual post files' front matter:

```json
// /src/posts/posts.json
{
  "layout": "post.njk",
  "tags": [
    "posts"
  ]
}
```

```yaml
# /src/posts/my-first-post.md
---
title: My first blog post
---

Bootcamp .NET npm branch Agile grep native senior. Database webpack
pairing build tool pull request imagemagick. AWS injection OOP
stack Dijkstra looks good to me Firefox bike-shedding scrum master.
```

Great, we're DRYing up the files! There's only one problem - the merge messed up our content tags. Our second blog post added a `JavaScript` content tag. That overrode the `posts` tag. Luckily, we can use [data deep merge](https://www.11ty.dev/docs/data-deep-merge/) to instead merge data that is an object or array:

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
};
```

Now our posts index page, `/src/posts/index.njk`, is showing up in our posts collection list because it's inheriting the tag from the directory. We can fix this by renaming it `posts.njk` and moving it up to the `/src/` directory. This move preserves the original routing due to the magic of Eleventy's directory- and file-based build method.

You can find the code for this section in the [`3-data-hierarchy` branch](https://github.com/siakaramalegos/eleventy-data-tutorial/tree/3-data-hierarchy). This was just one example of using the data hierarchy - you should definitely check out the [data hierarchy docs](https://www.11ty.dev/docs/data/#sources-of-data) to learn about the other options too. I could spend loads of time explaining the hierarchy, but that would make it seem like the most important concept in all of Eleventy. Just know that it gives you the ability to inherit or scope data as you please. So if you need more precision on managing inheritance or scope, dive down on that concept more.

### What custom data is even available in a view?
You're trying to build a page, but you can't figure out "where" your new variable that you thought you set. I haven't found a way to log everything available in a page - something akin to `self` or `this`. I have found a way to hack this with collections. For each item in a collection, you can `log` the `item.data` which will show the special Eleventy data attributes as well as your own custom ones:

```javascript
{
  pkg: {
    // package.json data
  },
  layout: 'post.njk',
  tags: [ 'posts', 'JavaScript' ],
  // Look! It's our custom title attribute:
  title: 'My second blog post',
  page: {
    date: 2020-05-13T20:24:27.709Z,
    inputPath: './src/posts/my-second-post.md',
    fileSlug: 'my-second-post',
    filePathStem: '/posts/my-second-post',
    url: '/posts/my-second-post/',
    outputPath: '_site/posts/my-second-post/index.html'
  },
  collections: {
    all: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
    nav: [ [Object], [Object] ],
    podcasts: [ [Object] ],
    JavaScript: [ [Object], [Object] ],
    posts: [ [Object], [Object] ]
  }
}
```

If you know of a way to do this more easily, please share, and I'll update this post!

## Custom Data with a capital D
The data hierarchy and examples I gave above are great for providing smart defaults, inheritance, and merging basic page data. But what about what I like to call "Data with a capital D"? Do you need to render something that is dependent on a large data object or array? Do you need to fetch data from another URL before statically rendering it? Do you need to manipulate some data to make it easier to use?

The data hierarchy technically handles that too, but we usually use either global data files, or maybe directory- or file-specific data files. Three examples I have implemented in Eleventy include:

- Showing my upcoming and past speaking events on [sia.codes/speaking](https://sia.codes/speaking/) based on global data files `talks.js` and `events.js` (events can have many talks and talks can be repeated at different events).
- Fetching webmentions for all my blog posts on sia.codes to show them at the bottom of an article with re-builds triggered every 4 hours to pull in new ones ([example article with webmentions](https://sia.codes/posts/webmentions-eleventy-in-depth/) at the bottom).
- Organizing courses, modules, and lessons in a new Jamstack course management system. (I hope to release an open source version soon!)

I'll focus on the [global data file](https://www.11ty.dev/docs/data-global/) method here. Data in files located in a `/_data/` directory is globally accessible in all pages using the filename. Your files can either be JSON, or you can use `module.exports` from a JavaScript file (actually, it can handle [more data types](https://www.11ty.dev/docs/data-custom/) if you don't like JavaScript 😅). In our repo, [branch `4-big-d-data`](https://github.com/siakaramalegos/eleventy-data-tutorial/tree/4-big-d-data), I created a dogs data file:

```javascript
// /src/_data/dogs.js
module.exports = [
  {
    name: 'Harry',
    breed: 'Jack Russell terrier',
    favoritePasttime: 'finding hidey holes',
    stinkLevel: 3,
  },
  {
    name: 'Priscilla',
    breed: 'Australian shepherd',
    favoritePasttime: 'starting farty parties',
    stinkLevel: 1,
  }
]
```

If I then log `dogs` from any of my template/page files, I can see that exact data in my terminal. In this case, it is an array, so I can loop over it to render my dog info:

{% raw %}
```html
<!-- /src/dogs.njk -->
---
layout: layout.njk
title: Pup party
tags: ['nav']
---

<h1>My doggos</h1>
<p>Much floof. Much fart.</p>

<ul>
  {% for dog in dogs %}
  <li>
    {{ dog.name }} is a/an {{ dog.breed }} and likes {{ dog.favoritePasttime }}.
    {{ dog.name }}'s stink level from 1-5 is a {{ dog.stinkLevel }}.
  </li>
  {% endfor %}
</ul>

<!-- TODO: delete random logs -->
{{ dogs | log }}
```
{% endraw %}

If you needed to fetch data, you could use a JavaScript file and [return an async function](https://www.11ty.dev/docs/data-js/) for your `module.exports`. It's a bit complex, but my [webmentions code](https://github.com/siakaramalegos/sia.codes-eleventy/blob/master/_data/webmentions.js) is an example of this. If you're interested in the details, I wrote up a [full tutorial](https://sia.codes/posts/webmentions-eleventy-in-depth/) on adding webmentions to an Eleventy site.

If you want to manipulate data before using it, you could "just use JavaScript". For example, in my online course project, I import my course>module>lesson hierarchy data from `/_data/courses.js` into another `/_data/lessonPrevNext.js` file to manually set a previous and next lesson since the sort order is a bit more nuanced. I wanted one source of truth, but needed something easier to work with in my views.

## Summary
Eleventy is a powerful static site generator with a lot of flexibilty in how to handle data. It's so flexible that sometimes your options for architecting data can be overwhelming. The primary ways I use data in developing Eleventy apps are:

- **page data** - includes attributes like url and file slug
- **collections** - groups of pages/templates often to generate a list of links
- **template data using the data hierarchy** - special template data like layout, permalinks, tags, and dates as well as custom "small" data like titles and whether a page should be included in a nav bar
- **global "big" data (though scope can be narrowed)** - larger, more complex data that is easier to manage in a separate file and can also be fetched asynchronously (also technically still uses the data hieararchy)

To see your data, use the [`log`](https://www.11ty.dev/docs/filters/log/) universal filter.

Have you used data in a unique way in your Eleventy sites? If so, I'd love to see your examples!

## Thanks
Special thanks to [Chris Guzman](https://twitter.com/SpeakToChris), [Aaron Peters](https://twitter.com/aaronpeters), [David Rhoden](https://twitter.com/davidrhoden), and [Phil Hawksworth](https://twitter.com/philhawksworth) for giving me their time and feedback!
