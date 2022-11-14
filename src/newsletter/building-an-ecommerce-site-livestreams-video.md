---
title: Building an ecommerce site livestreams, video posted for the architecture
date: 2022-02-16
layout: layouts/newsPost.njk
description: "sia.codes newsletter post for 16 Feb 2022. Don't miss a new post - sign up today!"
---
Hey folks! This week I have a few updates on the big e-commerce site livestream series...

## Livestream this Friday

I'm super excited to share that I'm doing a series of 3 livestreams with [Matthew Ling](https://twitter.com/mattling_dev) to show how to build a serverless e-commerce store for digital downloads!

The first stream is this Friday at 1pm Eastern on [Youtube](https://www.youtube.com/watch?v=N7qSVXyHlCA). The link lets you set a reminder too if you like.

It's an Eleventy site hosted on Netlify, uses Stripe checkout and receipts, then triggers the creation of a signed URL from AWS S3 for the pdf doc they bought. That is then emailed to the customer using Sendgrid.

The backbone is Netlify functions and Stripe webhooks.

My goal was to make this as free as possible - if someone started with a low volume of sales, the costs would only be for payments (which is a percent of sales plus a small fee but only on actual sales) and pennies  for the S3 bucket. Hosting is free until you reach higher volumes of sales and traffic.

If you want to see the architecture some more...

## Video posted for \"Architecting an Eleventy serverless e-commerce site\"

As a preview for the livestreams and to demonstrate how you can use Eleventy for more than just blogs, I gave this talk at the Eleventy Meetup last week. If you missed it, you can now catch the recording on [Youtube](https://www.youtube.com/watch?v=DWrWWhDNi4w).

## Interesting stuff from the interwebs

* Want to get a better understanding of how browsers work? This [tweet](https://twitter.com/addyosmani/status/1492398000500404227) by Addy Osmani links to some great content by Mariko Kosaka.
* [Reducing The Web’s Carbon Footprint: Optimizing Social Media Embeds](https://www.smashingmagazine.com/2022/02/reducing-web-carbon-footprint-optimizing-social-media-embeds/) by Michelle Barker had some great tips for keeping social media shares performant

## LEGO city update

My LEGO city now has a name! It's Brickerly Hills, home of the rich and shameless. Also, [I got a tram and powered it up](https://www.instagram.com/p/CZ2X1WPJv0K/)! Finally, I was reminded of my middle school days when Descript transcripted my last name as \"caramel legos\". :side_eye:

Until next time!
