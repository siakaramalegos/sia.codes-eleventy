const { DateTime } = require("luxon");
const rootUrl = require('../_data/metadata.json').url
const events = require('../_data/events.js')
const talks = require('../_data/talks.js')

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children.filter(entry => entry['wm-target'] === url)
  },
  isOwnWebmention: (webmention) => {
    const urls = [
      'https://sia.codes',
      'https://twitter.com/thegreengreek'
    ]
    const authorUrl = webmention.author ? webmention.author.url : false
    // check if a given URL is part of this site.
    return authorUrl && urls.includes(authorUrl)
  },
  size: (mentions) => {
    return !mentions ? 0 : mentions.length
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType])
  },
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  },
  generateShareLink: (url, text) => {
    const shareText = `${text} by @TheGreenGreek`
    const shareUrl = `${rootUrl}${url}`
    return `https://twitter.com/intent/tweet/?text=${encodeURI(shareText)}&amp;url=${encodeURI(shareUrl)}`
  },
  generateDiscussionLink: (url) => {
    const postUrl = `${rootUrl}${url}`
    return `https://twitter.com/search?f=tweets&src=typd&q=${encodeURI(postUrl)}`
  },
  getEvents: timing =>  events[timing],
  getTalkForEvent: id => talks[id],
  getSelect: posts => posts.filter(post => post.data.isSelect),
  truncate: text => text.length > 300 ? `${text.substring(0, 300)}...` : text,
}
