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

## Local dev with Cloudflare functions

First run `npm run build` before running `npm run wrangler`. 11ty will not run in watch mode though. Alternatively, run `npm run watch` in one terminal window, then in another run `npm run wrangler`.

## Buttondown newsletter

I use [Buttondown](https://buttondown.email/emails) for my newsletter service. I write my newsletters in Markdown, much like my blog posts. They have an API, but for now, I just copy-paste the newsletter post into my newsletters folder since both use markdown. I also update the canonical URL in Buttondown to point back to my self-hosted version from their archive.

## Copy-pasta

### Sign up for newsletter aside

Paste somewhere in a blog post after somethink useful has been shared.

```njk
{% include 'newsletter-aside.njk' %}
```

### Bookshop.org affiliate links

*This newsletter is reader-supported. If you buy a book from one of the links above, I'll earn some coffee money. You don't pay a higher price, and Bookshop.org supports independent booksellers.*

### Syndication footers

This is a note to self for the markdown to copy-paste when I syndicate a post to another publication (like Dev).

```markdown

---

This article was originally published on [sia.codes](https://sia.codes/posts/how-to-add-prettier-to-a-project/). Head over there if you like this post and want to read others like it, or sign up for my [newsletter](https://buttondown.email/sia.codes) to be notified of new posts!
```

## Demos

* [Netlify](https://eleventy-base-blog.netlify.com/)
* [Get your own Eleventy web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)—seriously, just click OK a few times and it’s live—Netlify is amazing.

## License
For all sia.codes enhancements: [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

For the eleventy-base-blog: MIT

Content is all &copy; Sia Karamalegos

<!--
Google calendar
http://www.google.com/calendar/event?location=Hi-Wire+Brewing+Durham+-+800+Taylor+St+%239-150+-+Durham%2C+NC%2C+us&action=TEMPLATE&sprop=name%3ADurham+Social+Hack+Night&sprop=website%3Ahttps%3A%2F%2Fwww.meetup.com%2Fdurham-social-hack-night%2Fevents%2F300873921&details=For+full+details%2C+including+the+address%2C+and+to+RSVP+see%3A+https%3A%2F%2Fwww.meetup.com%2Fdurham-social-hack-night%2Fevents%2F300873921%0A%0A&text=Durham+Social+Hack+Night&dates=20240812T220000Z%2F20240813T000000Z

iCal, Outlook
https://www.meetup.com/durham-social-hack-night/events/300873921/ical/Durham+Social+Hack+Night.ics

http://calendar.yahoo.com/?in_loc=Hi-Wire+Brewing+Durham+-+800+Taylor+St+%239-150+-+Durham%2C+NC%2C+us&v=60&VIEW=d&TYPE=20&TITLE=Durham+Social+Hack+Night&ST=20240812T220000Z&DUR=0200&URL=https%3A%2F%2Fwww.meetup.com%2Fdurham-social-hack-night%2Fevents%2F300873921&DESC=For+full+details%2C+including+the+address%2C+and+to+RSVP+see%3A+https%3A%2F%2Fwww.meetup.com%2Fdurham-social-hack-night%2Fevents%2F300873921%0A%0A
-->
