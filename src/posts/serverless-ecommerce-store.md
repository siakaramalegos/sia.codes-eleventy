---
title: "Building a Serverless E-commerce Store with Stripe, Netlify, & 11ty"
description: A lot of e-commerce solutions exist, but many of them charge a monthly fee. How could we build a site with the lowest hosting costs possible?
shortDescription: Building the lowest-cost e-commerce solution with static site generation and serverless functions
date: 2022-05-16
tags: ["Jamstack", "Eleventy", "JavaScript", "IndieWeb"]
layout: layouts/post.njk
tweetId: '1526272498735763457'
isSelect: true
featuredImage: ecommerce_v5tosj.jpg
---

<figure>
  <img src="{% src 'ecommerce_v5tosj.jpg' %}"
    srcset="{% srcset 'ecommerce_v5tosj.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Livestream promo image with headshots of Sia and Matt Link and the title of the livestream 'Building a Jamstack store with Netlify and Stripe'"
    importance="high"
    width="1280" height="720">
  <!-- <figcaption></figcaption> -->
</figure>

A lot of e-commerce solutions exist, but many of them charge a monthly fee. Creators may or may not be able to afford those fees depending on their sales volume. How could we build a site with the lowest hosting costs possible?

[Matthew Ling](https://twitter.com/mattling_dev) from Stripe and I brainstormed how to do this and then built it in a series of livestreams. This article is a collection of all the resources we created:

- Architecting the ecommerce site (the meetup talk and slides)
- Building the website (the livestream videos)
- Concepts (the companion articles)

We built this live on [sia.studio](https://sia.studio/), the beginning of my creative website. This series shows how we added the shop with products to sell as digital downloads. The files are emailed to the customer upon successful payment.

This first step is understanding how all the pieces fit together...

## Architecting a serverless e-commerce site

Sometimes the biggest challenge is coming up with an architecture that will work. In my talk for [THE Eleventy Meetup](https://11tymeetup.dev/events/ep-6-async-shortcodes-and-serverless-e-commerce/), I showed how I weaved in all the moving parts to make it work, using:

- **11ty** - static site generator
- **Github** - origin repo
- **Netlify** - static site hosting and serverless functions (and more!)
- **Stripe** - products, checkout, email payment receipts (and more!)
- **AWS** - S3 signed URLs for unique expiring download links
- **Sendgrid** - email download links

Here are the [slides](https://docs.google.com/presentation/d/13ICudJnSRmUrBwlo6CcGevPQgOfnsfPGLa0OXl9_ixI/edit?usp=sharing) from the meetup, and the recording is below:

{% set videoTitle = "Architecting an Eleventy serverless e-commerce site" %}
{% set videoId = "DWrWWhDNi4w" %}
{% include 'youtube.njk' %}

## Creating and rendering a product catalog

In our first livestream, we demonstrated how to model a product catalog in Stripe using Products and Prices and how to query and render them using Stripe-node and 11ty:

{% set videoTitle = "Ep 1: Building a Jamstack store with Netlify and Stripe" %}
{% set videoId = "N7qSVXyHlCA" %}
{% include 'youtube.njk' %}

The source code for sia.studio is all public, and you can see both the [current live version](https://github.com/siakaramalegos/sia.studio) and the [livestream branch](https://github.com/siakaramalegos/sia.studio/tree/livestream) for posterity.

Matt wrote a companion article which you can find here: [Building an eCommerce Store 1/3: Managing Products & Prices (with examples in Ruby)](https://dev.to/stripe/building-an-ecommerce-store-13-managing-products-prices-with-examples-in-ruby-iba?signin=true).

{% include 'newsletter-aside.njk' %}

## Using serverless functions for checkout

In the second episide, we leveraged Netlify serverless functions to create Checkout Sessions using the Stripe API and collect payments from our customers.

{% set videoTitle = "Ep 2: Building a Jamstack store with Netlify and Stripe" %}
{% set videoId = "rxSm3THX748" %}
{% include 'youtube.njk' %}

Matt's companion article is [Building an eCommerce Store 2/3: Checkout flows](https://dev.to/stripe/building-an-ecommerce-store-23-checkout-flows-35k7).

## Stripe webhooks for order fulfillment

In the last episode, we used Netlify serverless function to build a webhook endpoint to listen and react to payment events such as a Checkout Session completing to fulfill our orders. We used AWS to create a "signed URL" for an expiring download link. Then, we email that link to the customer using Sendgrid.

{% set videoTitle = "Ep 3: Building a Jamstack store with Netlify and Stripe" %}
{% set videoId = "9g8UTYR5dH0" %}
{% include 'youtube.njk' %}

Matt's final article goes in depth on Stripe's webhook endpoints: [Building an eCommerce Store 3/3: Webhook endpoints and fulfillment](https://dev.to/stripe/building-an-ecommerce-store-33-webhook-endpoints-and-fulfillment-260j)

## Conclusion and next steps

This was a fun build. In the future, I'd love to build out a full shopping cart functionality that also allows for multiple copies of the same item. I'd also like to explore a way to offer physical goods that doesn't rely on large inventory since Stripe does not support drop shipping.

What would you like to see next? We're considering adding on to this series and would love to hear your thoughts!
