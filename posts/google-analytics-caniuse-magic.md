---
title: Google Analytics + caniuse = *MAGIC*
description: Import your Google Analytics data into caniuse for detailed feature support for your users.
date: 2017-10-27
tags: ['Analytics']
layout: layouts/post.njk
tweetId: '1197888967561162761'
---

<figure>
    <img src="/img/caniuse-magic/levitation.jpg"
         alt="Woman in woods levitating">
    <figcaption>How I feel right now. Photo by <a href="https://unsplash.com/photos/GR2uZmp7mUo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rob Potter</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>


Today I learned that you can import your Google Analytics data into [caniuse](https://caniuse.com/) to determine how many of your users would be able to use a particular front-end technology in their browser of choice. Maybe the rest of you have been holding out on this and just didn’t tell me. Maybe I had my head in the sand. Well, today I learned about it, and it’s amazing.

At [Clio + Calliope](https://www.clioandcalliope.com/), we are really excited about trying out CSS grid layouts, but we know it won’t cover all users. Now we can make informed decisions for our clients to use tools that will work in their browsers or provide fallbacks when our first pick does not work. Here is the output of caniuse using a year’s worth of Google Analytics data from one client:

<figure>
    <img src="/img/caniuse-magic/caniuse-grid.png"
         alt="Screenshot of caniuse support for CSS Grid">
    <figcaption>Can I use CSS Grid with my website’s users? Clearly not without fallbacks.</figcaption>
</figure>

You can see in the top right-hand corner, that only 55.95% of our client’s users would be able to properly see a CSS grid layout (if also prefixed). So, clearly we cannot use grid without fallbacks that cover the rest of the browsers. Luckily, all I have to do to check for fallbacks like flexbox is to type “flexbox” in the *Can I use _______ ?* input box. Awesome sauce.

## How to invoke this incantation
Go to [caniuse](https://caniuse.com/), and in the red *Can I use _______ ?* area, click on the Settings link to the right:

<figure>
    <img src="/img/caniuse-magic/caniuse-zoom.png"
         alt="Close-up screenshot of main input with settings link to the right">
    <figcaption>Click on the gear/settings link to the right</figcaption>
</figure>

Then, the left menu sidebar will include a button to *Import...* from Google Analytics:

<figure>
    <img src="/img/caniuse-magic/caniuse-sidebar.png"
         alt="Close-up screenshot of sidebar with Import button for Google Analytics">
    <figcaption>Click on Import...</figcaption>
</figure>

Click on that, and follow the steps to give caniuse access permission to the Google account with your analytics information. Then, select a profile (website) that you want to import from and a date range.

After that, you should be ready to roll. Search for a particular technology, and you will see the stats for your website plus global usage in the top right.

## Give thanks where thanks is due
I have to send a special shout out to [Matt Shwery](https://medium.com/@mshwery) for telling me about this today! You’re the best!
