---
title: Adding Prettier to a Project
description: Add Prettier with a pre-commit hook and dedicate one commit to a full reformat
date: 2021-04-19
tags: ['Tools', 'Dev Tools', 'JavaScript']
tweetId: '1384219354397507595'
layout: layouts/post.njk
---

While working at a smaller dev shop, our team hit the point at which the inconsistent code formats between and within projects was becoming a pain. Our needs included:

1. A consistent linter/formatter for all projects in a particular language
2. An autoformatter so developers didn't spend time "fixing" linter errors
3. A tool readily available in tools like VS Code which could apply changes on save

We decided to go with [Prettier](https://prettier.io/). We also added a pre-commit hook to ensure that all code changes complied with the new authoritarianism.

I initially published this as a [gist](https://gist.github.com/siakaramalegos/4a5cdab1f44ffb217a48d5260043f8ae) to help when setting up new projects at that company. Today, it was useful for a client I was working with, so I'm sharing it now in an article in case the same use case fits for you, and you'd like a handy reference.

## The Steps

Most of these steps can be found in the [docs](https://prettier.io/docs/en/install.html) and through other links in the docs.

<aside>A key step here is to run Prettier on all the files in a separate commit. You don't want to pollute all your future pull request diffs with formatting changes.</aside>

1. Install prettier:
  ```bash
  $ npm install --save-dev --save-exact prettier
  ```
2. Create an empty config file to let tools know you're using Prettier:
  ```bash
  $ echo {}> .prettierrc.json
  ```
3. Create a `.prettierignore` file to let tools know which files NOT to format. `node_modules` are ignored by default. Some suggestions:
  ```bash
  build
  coverage
  .package-lock.json
  *.min.*
  ```
4. Manually run Prettier to re-format all the files in the project:
  ```bash
  $ npx prettier --write .
  ```
5. Set up your code editor to auto-format on save for ease of use. See [instructions](https://prettier.io/docs/en/editors.html) for various editors.
6. Set up commit hooks with [pretty-quick](https://github.com/azz/pretty-quick) and [husky](https://github.com/typicode/husky). First, install them as dev dependencies:
  ```bash
  $ npm i --save-dev pretty-quick husky
  ```
7. Finally, add the pre-commit instructions to your `package.json` file:
  ```json
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  },
  ```

Now when you commit your changes, files in the commit will automatically be formatted!
