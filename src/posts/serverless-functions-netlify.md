---
title: "Going Intergalactic with Serverless Functions on Netlify"
description: Get started going serverless with Netlify functions and Netlify-CLI for keeping secrets secret
date: 2021-06-14
tags: ['JavaScript', 'Tools', 'Jamstack']
layout: layouts/post.njk
tweetId: '1405998820396261377'
isSelect: false
featuredImage: mwcenter_spitzer_s002ha.jpg
---

<figure>
  <img src="{% src 'mwcenter_spitzer_s002ha.jpg' %}"
    srcset="{% srcset 'mwcenter_spitzer_s002ha.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Nebula with red, purple, and navy colors dominant in the nebula clouds with stars clustered in the middle"
    importance="high"
    width="900" height="600">
  <figcaption><a href="https://apod.nasa.gov/apod/ap090614.html">"Stars at the Galactic Center"</a> APOD from June 14, 2009</figcaption>
</figure>

This post is a companion to the talk I give on buidling serverless functions with Netlify ([slides](https://projects.sia.codes/serverless-netlify-talk/)). I usually give it to groups newer to web development such as bootcampers.

My goal here is to give a step-by-step tutorial for those wanting to duplicate my demo, or anyone interested in an intro tutorial on the topic! This post will walk through:

1. Setting up your first Netlify deploy through GitHub
2. Installing and using the Netlify-CLI
3. Setting up and securely using environment variable secrets
4. Writing a serverless function to securely request NASA's Astronomy Picture of the Day

To get the most out of this tutorial, it's best if you're already familiar with HTML, JavaScript, npm, and the command line.

## What are we building?

We are going to build the first feature of my [AstroBirthday](https://astrobirthday.netlify.app/) site. Namely, when a user selects a date and clicks the button, we will fetch NASA's [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html) (APOD for short) for that date. This app will use the [free API](https://api.nasa.gov/) from NASA (rate-limited). We will generate an API key, store it securely, make the API request, and send the data to our front end to render.

<figure>
  <img src="{% src 'PIA19363_1024_bhff9v.jpg' %}"
    srcset="{% srcset 'PIA19363_1024_bhff9v.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="This close-up from the Mars Reconnaissance Orbiter's HiRISE camera shows weathered craters and windblown deposits in southern Acidalia Planitia. A striking shade of blue in standard HiRISE image colors, to the human eye the area would probably look grey or a little reddish."
    width="900" height="600">
  <figcaption><a href="https://apod.nasa.gov/apod/ap190622.html">"Ares 3 Landing Site: The Martian Revisited"</a> APOD from June 22, 2019</figcaption>
</figure>

## What is serverless architecture?

Before we dive into the how, let's learn the what. In serverless applications (from [Serverless Architecture](https://www.twilio.com/docs/glossary/what-is-serverless-architecture)):

- Applications are broken up into individual functions
- Hosted by a 3rd party service
- Can be invoked and scaled individually
- No need for server management by the developer

That last point is a big one for me. I love developing web apps, but thinking about managing a server makes my head hurt.

## What is Jamstack?

Jamstack is...

<blockquote>
  <p>A modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup</p>
  <p class="blockquote-source">—Mathias Biilmann (CEO & Co-founder of Netlify), from <a href="https://jamstack.wtf/">jamstack.wtf/</a></p>
</blockquote>

The following figure from the Netlify site shows us how all the pieces fit together. First, we have a standard front end built with HTML, CSS, JavaScript and other assets like images. A provider like Netlify can handle automatic builds and deploys among other CI/CD things. Finally, instead of a full-featured backend, we use API's like a set of services to get the features we want. Those APIs can be external like [Stripe](https://stripe.com/) for payments, [Sanity.io](https://www.sanity.io/) for CMS, and [Hasura Cloud](https://hasura.io/) for databases.

<figure>
  <img src="/img/posts/how-it-works.svg"
    alt="Screenshot of how Jamstack works"
    loading="lazy"
    width="928" height="477">
  <figcaption>From <a href="https://www.netlify.com/jamstack/">www.netlify.com/jamstack/</a></figcaption>
</figure>

Our frontends can be vanilla HTML, CSS, and JavaScript, but we can also use many different frameworks which are capable of building static pages. Prebuilding pages at build time instead of at request time makes our site faster.

<figure>
  <img src="{% src 'static-generators_jwwows.jpg' %}"
    srcset="{% srcset 'static-generators_jwwows.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="11ty, Next.js, Jekyll, NuxtJS, Gatsby, Hugo"
    width="1884" height="1031">
  <figcaption>Choose your own flavor of static-site generator</figcaption>
</figure>

<aside>In this demo, I use <a href="https://www.11ty.dev/">Eleventy</a> since it's very close to vanilla HTML and requires no front-end JavaScript by default. I want the web to be faster for users, so I minimize my client-side JavaScript. If you're interested in a short tutorial on Eleventy to see if you like it, check out my <a href="https://sia.codes/posts/itsiest-bitsiest-eleventy-tutorial/">Itsiest, Bitsiest Eleventy Tutorial</a>.</aside>

## Why I ♥️ Netlify

I first came to love Netlify because deploying static sites was so much easier than some of the other methods I was using. You'll get to see how in the next sections. No more manual builds and file uploading nor complex continual integration setups! My deployment steps consist of just one step now - `git push`.

Other features that got me to love Netlify even more are:

- Automatic deploy previews on pull requests
- Automatic reverting to previous version if a build fails
- Generous free tier for forms (no backends or widgets!)
- Automatic HTTPS/SSL certificates
- CDN/edge deployments (depending on DNS setup)
- Automatic Brotli compression

This is all before I started using it for serverless functions. Are you a fan of Netlify? Tell me your favorite features in my [webmentions](#webmentions)!

## Hello, Netlify

Enough of the chit-chat, let's get started. If you've already deployed to Netlify, you can skip this step. Otherwise, here is the most basic way to deploy a site to Netlify. You create a GitHub repo, connect to it inside Netlify, and voilà, it's live!

1. Make a repo on GitHub with an [index.html](https://gist.github.com/siakaramalegos/31197c13dd1110b34e715706232e392b) file containing `<h1>Hello, Netlify</h1>`.
2. Create a [Netlify](https://www.netlify.com/) account. It's free!
3. In your dashboard, select "New site from Git"
4. Link your Netlify account to GitHub, find the repo you just created, and select it.
5. Notice the other questions it asks you like branch, build script, and build directory. We don't need them here, but you can customize all these things in more complex projects.
6. Click to deploy your first website. You'll get an auto-generated random URL like `https://elastic-puppy-7a396e.netlify.app/`

Now whenever you update the `main` branch (or whichever branch you pointed Netlify to) on GitHub, the site will automatically deploy. You can also use GitLab or BitBucket instead of GitHub.

Now we're going to put it on steroids to make it even more powerful.

<figure>
  <img src="{% src 'carina2_hst_1080_shnrcd.jpg' %}"
    srcset="{% srcset 'carina2_hst_1080_shnrcd.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="How do violent stars affect their surroundings? To help find out, astronomers created a 48-frame high-resolution, controlled-color panorama of the center of the Carina Nebula, one of the largest star forming regions on the night sky. The featured image, taken in 2007, was the most detailed image of the Carina Nebula yet taken. Cataloged as NGC 3372, the Carina Nebula is home to streams of hot gas, pools of cool gas, knots of dark globules, and pillars of dense dusty interstellar matter. The Keyhole Nebula, visible left of center, houses several of the most massive stars known. These large and violent stars likely formed in dark globules and continually reshape the nebula with their energetic light, outflowing stellar winds, and ultimately by ending their lives in supernova explosions. Visible to the unaided eye, the entire Carina Nebula spans over 450 light years and lies about 8,500 light-years away toward the constellation of Ship's Keel (Carina)."
    width="1080" height="523">
  <figcaption><a href="https://apod.nasa.gov/apod/ap190623.html">"Carina Nebula Panorama from Hubble"</a> APOD from June 23, 2019</figcaption>
</figure>

## Netlify CLI

Netlify CLI lets us more easily build serverless functions in a dev environment and then port them to production. We can also do other things like manage secrets between both environments.

To get started, install it on the command line and login:

```text
$ npm install netlify-cli -g
$ netlify
$ netlify login
```

Your install message will look something like this:

```text
Success! Netlify CLI has been installed!

Your device is now configured to use Netlify CLI to deploy and manage
your Netlify sites.

Next steps:

  netlify init     Connect or create a Netlify site from current
                   directory
  netlify deploy   Deploy the latest changes to your Netlify site

For more information on the CLI run netlify help
Or visit the docs at https://cli.netlify.com
```

I don't usually use `netlify deploy` since I usually commit my code and push to GitHub to trigger deploys instead. However, `netlify init` is a handy way to create a new Netlify site with a repo. If you type `netlify` and hit enter, you'll see all the command options. Here are a few I use:

```text
COMMANDS
  dev         Local dev server
  init        Configure continuous deployment for a new or existing site
  login       Login to your Netlify account
  open        Open settings for the site linked to the current folder
```

To learn more, check out [Get started with Netlify CLI](https://docs.netlify.com/cli/get-started/).

## Hello, Netlify CLI!

Let's get started with Netlify CLI by adding it to our demo project! Fork, clone, and install dependencies. Then, run `netlify init`:

1. **Fork** [the demo](https://github.com/siakaramalegos/serverless-netlify-demo) (don't clone!)
2. Clone **your** repo.
3. `cd serverless-netlify-demo`
4. `npm install`
5. Run `netlify init` and answer the questions. For this project, the build command is `npm run build` and the deploy directory is `_site`. Answer "yes" when it asks to generate a **netlify.toml** file.
6. Run `netlify open` to have a browser window opening to your site's page on the Netlify dashboard. You'll also be able to see the URL generated for your site. Note that adding a custom domain is free on Netlify.

Now we can really get started!

<figure>
  <img src="{% src 'PIA22486CuriositySelf2018dustStorm1024_dumijh.jpg' %}"
    srcset="{% srcset 'PIA22486CuriositySelf2018dustStorm1024_dumijh.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="Winds on Mars can't actually blow spacecraft over. But in the low gravity, martian winds can loft fine dust particles in planet-wide storms, like the dust storm now raging on the Red Planet. From the martian surface on sol 2082 (June 15), this self-portrait from the Curiosity rover shows the effects of the dust storm, reducing sunlight and visibility at the rover's location in Gale crater. "
    width="1024" height="785">
  <figcaption><a href="https://apod.nasa.gov/apod/ap180623.html">"Curiosity's Dusty Self"</a> APOD from June 23, 2018</figcaption>
</figure>

## Environment Variables: Keeping secrets secret 🕵🏻‍♀️

Before we build our serverless function to request the Astronomy Picture of the Day, we need to get an API key and store it securely.

1. Get an API key at [api.nasa.gov/](https://api.nasa.gov/)
2. Run `netlify open` to go to the Netlify UI
3. Save as `NASA_API_KEY` in **Build & Deploy** > **Environment**
4. Run `netlify dev` to confirm it gets injected for local dev

It's a good idea to update your `start` script in your **package.json** file to use `netlify dev`.

<figure>
  <img src="{% src 'env-netlify-dev_xvgdqo.jpg' %}"
    srcset="{% srcset 'env-netlify-dev_xvgdqo.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="Netlify Dev: Injected build setting env var: NASA_API_KEY"
    width="1576" height="1048">
  <figcaption>Our environment variable is injected when we run Netlify Dev</figcaption>
</figure>

<aside><strong>Note:</strong> You can set some env vars in your netlify.toml, but don't put secret ones there as that file must be checked into git.</aside>


## Netlify Functions

Let's talk about Netlify's flavor of serverless functions which they simply call [functions](https://docs.netlify.com/functions/overview/):

- Uses AWS serverless Lambda under the hood
- Version-controlled, built, and deployed with your site
- Automatic service discovery (for deploy previews and rollbacks)
- JavaScript, TypeScript, and Go supported

At the time of writing, the free tier included:

- 125K function endpoint requests per month
- 100 hours of function run time per month

Make sure to check Netlify's current [pricing](https://www.netlify.com/pricing/).

### netlify.toml

To get started, let's check our **netlify.toml** file generated when we ran `netlify init`. This file sets up the [configuration](https://docs.netlify.com/configure-builds/file-based-configuration/) for our Netlify builds. I think the default folder for functions is **netlify/functions**, but I simplified mine to only **functions**:

```toml
[build]
  command = "npm run build"
  publish = "_site"
  functions = "functions"
```

This tells Netlify where to look for our functions. It will sync with our settings and point to where the functions can be found in our project. Now we can:

- Write functions in **/functions/hello.js**
- Access functions via fetch calls to **/.netlify/functions/hello**

### functions/hello.js

In the tradition of our people, let's write our first Hello World function. Create a new file in the **/functions/** folder callled **hello.js**:

```javascript
// functions/hello.js

// Functions must export a handler with this syntax:
exports.handler = async function(event, context) {
  // Log our parameters so we can check them out later
  console.log({event, context})

  // At a minimum, you must return an object with an HTTP status code to prevent timeouts:
  return {
    statusCode: 200,
    body: JSON.stringify({message: "Hello World"})
  };
}
```

We'll talk about what's in the event and context objects in a bit. To learn more about functions, read [Build serverless functions with JavaScript](https://docs.netlify.com/functions/build-with-javascript/) in the docs.

### src/index.html

Now that we have our function endpoint, we can use it in our front end. In **src/index.html**, add this script to the bottom of the file:

```html
<!-- src/index.html -->

<!-- At bottom of file: -->
<script>
  // Fetch our serverless function endpoint via GET
  fetch('/.netlify/functions/hello')
    .then(response => response.json())
    .then(json => console.log({json}))
</script>
```

You may need to restart your server (`netlify dev`), then check the browser console for the value of `{json}`. If your code isn't working, compare it against the [`2-hello-functions` branch](https://github.com/siakaramalegos/serverless-netlify-demo/tree/2-hello-functions/) of the demo.

### event and context

What about those `console.log` statements in our **hello.js** function? Well, those are technically on the server side so you will not see them in the browser console. We can find them in our command line/terminal console.

The `event` parameter gives us important data from the request like the path, headers, any query string parameters, and the body:

```js
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": { /* Incoming request headers */ }
    "queryStringParameters": { /* query string parameters */ }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": /* A boolean flag to indicate if the applicable request payload is Base64-encode */
}
```

The `context` parameter includes information about the context in which the serverless function was called, like certain Identity user information, for example.

<aside>Once we push to Netlify, we can no longer find our server side logs in our terminal. We access them in the Netlify UI. Go to the <strong>Functions</strong> tab, then select the function you want to see the logs for.</aside>

What can we return from our serverless functions? We've seen status code and body, but we can also send headers among other things:

```javascript
{
    "isBase64Encoded": /* true|false */,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "multiValueHeaders": { "headerName": ["headerValue", "headerValue2", ...], ... },
    "body": "..."
}
```

<figure>
  <img src="{% src 'moonshorty_apollo17_960_fqb6tl.jpg' %}"
    srcset="{% srcset 'moonshorty_apollo17_960_fqb6tl.jpg' %}"
    sizes="{% defaultSizes %}"
    loading="lazy"
    alt="In December of 1972, Apollo 17 astronauts Eugene Cernan and Harrison Schmitt spent about 75 hours on the Moon in the Taurus-Littrow valley, while colleague Ronald Evans orbited overhead. This sharp image was taken by Cernan as he and Schmitt roamed the valley floor. The image shows Schmitt on the left with the lunar rover at the edge of Shorty Crater, near the spot where geologist Schmitt discovered orange lunar soil. The Apollo 17 crew returned with 110 kilograms of rock and soil samples, more than was returned from any of the other lunar landing sites. Now forty years later, Cernan and Schmitt are still the last to walk on the Moon."
    width="960" height="637">
  <figcaption><a href="https://apod.nasa.gov/apod/ap120624.html">"Apollo 17 at Shorty Crater"</a> APOD from June 24, 2012</figcaption>
</figure>

## Bringing it all together

Finally, we can build our feature to fetch the Astronomy Picture of the Day.

### Front end request

First, in **src/index.html**, add an async function to handle the form submission which will fetch from our serverless function endpoint. For now, we'll just log the response to the console. Don't forget to add the event listener.

```javascript
// index.html, inside a <script> tag
async function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const date = formData.get("date")

  // Pass the date into the request body
  fetch('/.netlify/functions/apod', {
    method: "POST",
    body: JSON.stringify({date})
  })
    .then(response => {
      // Bad network responses do not automatically throw errors
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(json => {console.log(json)})
    .catch(error => {console.error(error)})
}

// Event listener
document.querySelector("#birthday-form").addEventListener("submit", handleSubmit)
```

<aside>Learn more about <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful">Checking that fetch is successful</a>.</aside>

### "Backend" serverless function

Now let's build out the "backend" function. Node does not have fetch available in its api so we need to install it in our project:

```text
$ npm install node-fetch --save
```

Then, we can use fetch in our serverless function. First we'll grab the date from the event's body then use it plus our API key stored in Netlify to fetch the APOD for that date.

```javascript
// functions/apod.js
const fetch = require("node-fetch")

exports.handler = async function(event, context) {
  const BASE_URL = "https://api.nasa.gov/planetary/apod"
  // Get the date from the event body
  const {date} = JSON.parse(event.body)

  // Access the environment variables using process.env and request the APOD
  return fetch(`${BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${date}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => {
      // Return OK status and the data from the response
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    })
    .catch(error => {
      // Return a network error and the text of the error
      return {
        statusCode: 500,
        body: JSON.stringify({error})
      }
    })
}
```

Save everything, run `npm start`, select a date in the form, and hit submit. If everything works, you'll have the data logged to the browser console!

### Rendering the results

Let's finish up this feature by rendering our data so users can see those pretty pictures. [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) tags are really handy in vanilla JS. They let us clone an HTML template and then simply fill in the missing attributes like image `src` rather than creating all the markup in JavaScript:

```javascript
// index.html, inside the <script>

// Don't allow selecting the future
document.querySelector("#date-input").max = new Date().toLocaleDateString('en-CA')

function render(data) {
  // The target is where we will "dump" our APOD component onto the page
  const target = document.querySelector("#apods");
  // Clear it out (in case this is not the first time one was requested)
  target.innerHTML = ""
  // Grab the template for the APOD component
  const template = document.querySelector(".apod-template");

  // Clone the template and fill in the key data with our APOD response data
  const clone = template.content.cloneNode(true);
  clone.querySelector("img").src = data.url
  clone.querySelector("h2").innerText = data.title
  clone.querySelector(".explanation").innerText = data.explanation

  // Support the original photographers by showing copyrights if applicable
  if (data.copyright) {
    clone.querySelector(".copyright").innerText = data.copyright
    clone.querySelector("small").classList.remove("hidden")
  }

  // Dump our APOD component into the target
  target.appendChild(clone);
}

// ... rest of code including handleSubmit function
```

Now, we can replace the `console.log(json)` of our data with a call to `render(json.data)` inside the `handleSubmit` function. Save, refresh, and test it out! If your code isn't working, compare it against the [`3-apod-function` branch](https://github.com/siakaramalegos/serverless-netlify-demo/tree/3-apod-function/) of the demo.
## Next Steps

Hopefully this post gave you a better understanding of how serverless functions work, especially on Netlify.

If you'd like a more in-depth workshop that also covers authentication and CRUD operations using a cloud-based GraphQL database, I highly recommend [Jason Lengtstorf's](https://twitter.com/jlengstorf) course [Introduction to Serverless Functions](https://frontendmasters.com/workshops/serverless-functions/) on Frontend Masters. The [LearnWithJason](https://www.learnwithjason.dev/) livestream also frequently covers serverless topics like [Sell Products on the Jamstack](https://www.learnwithjason.dev/sell-products-on-the-jamstack).
