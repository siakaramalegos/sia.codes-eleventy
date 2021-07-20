# sia.codes blog

This blog started with the [Eleventy](https://github.com/11ty/eleventy) 11ty blog starter.

## Design inspiration

General
- https://hankchizljaw.com/
- https://mxb.dev/
- https://www.zachleat.com/

Cards
- https://paulrobertlloyd.com/articles/
- https://inclusive-components.design/cards/

## Syndication footers

This is a note to self for the markdown to copy-paste when I syndicate a post to another publication (like Dev).

```markdown

---

This article was originally published on [sia.codes](https://sia.codes/posts/how-to-add-prettier-to-a-project/). Head over there if you like this post and want to read others like it, or sign up for my [newsletter](https://buttondown.email/sia.codes) to be notified of new posts!
```

## Demos

* [Netlify](https://eleventy-base-blog.netlify.com/)
* [Get your own Eleventy web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)—seriously, just click OK a few times and it’s live—Netlify is amazing.
* [GitHub Pages](https://11ty.github.io/eleventy-base-blog/)

## Getting Started

Note that the [default branch is `main`](https://www.hanselman.com/blog/EasilyRenameYourGitDefaultBranchFromMasterToMain.aspx).

### 1. Clone this repository:

```
git clone https://github.com/11ty/eleventy-base-blog.git my-blog-name
```


### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

```
npx eleventy
```

Or build and host locally for local development on localhost:8080:
```
npx eleventy --serve
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

### Implementation Notes

* `about/index.md` shows how to add a content page.
* `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
* Add the `nav` tag to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
* Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
	* Because `css` and `png` are listed in `templateFormats` but are not supported template types, any files with these extensions will be copied without modification to the output (while keeping the same directory structure).
* The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
* This example uses three layouts:
  * `_includes/layouts/base.njk`: the top level HTML structure
  * `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  * `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
* `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.

## License
For all sia.codes enhancements: [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

For the eleventy-base-blog: MIT

Content is all &copy; Sia Karamalegos
