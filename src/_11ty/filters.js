const { DateTime } = require("luxon");
const CleanCSS = require('clean-css');
const rootUrl = require('../_data/metadata.json').url
const events = require('../_data/events.js')
const talks = require('../_data/talks.js')

function getRelevance(postTags, matchingPost) {
  const commonTopics = matchingPost.data.tags.filter(element => postTags.includes(element))
  const discount = matchingPost.url.includes('30-days') ? 0.5 : 0
  return commonTopics.length - discount
}

function unique(array) {
  return [...new Set(array)]
}

function readableDate(dateObj) {
  return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
}

function mergeExternalTaggedPosts(taggedPosts, externalPosts, tag) {
  const taggedExternal = externalPosts.filter(post => post.tags.includes(tag))

  return mergeExternalPosts(taggedPosts, taggedExternal)
}

function mergeExternalPosts(posts = [], externalPosts = []) {
  const postData = posts.map(post => {
    const {data, date, url} = post
    const {title, description, tags, featuredImage} = data

    return {
      date,
      readableDate: readableDate(date),
      url,
      data: {
        title,
        description,
        tags,
        featuredImage,
      }
    }
  })
  const externalPostData = externalPosts.map(post => {
    const {title, date, url, description, tags, publicationName, featuredImage} = post

    return {
      date,
      readableDate: readableDate(post.date),
      url,
      data: {
        title,
        description,
        tags,
        publicationName,
        featuredImage,
        external: true,
      }
    }
  })

  return [...postData, ...externalPostData].sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    // a must be equal to b
    return 0;
  })
}

module.exports = {
  cssmin: code => {
    return new CleanCSS({}).minify(code).styles;
  },
  generateDiscussionLink: (url) => {
    const postUrl = `${rootUrl}${url}`
    return `https://twitter.com/search?f=tweets&src=typd&q=${encodeURI(postUrl)}`
  },
  generateShareLink: (url, text) => {
    const shareText = `${text} by @TheGreenGreek`
    const shareUrl = `${rootUrl}${url}`
    return `https://twitter.com/intent/tweet/?text=${encodeURI(shareText)}&url=${encodeURI(shareUrl)}`
  },
  getEvents: timing =>  events[timing],
  getSelect: posts => posts.filter(post => post.data.isSelect),
  getTalkForEvent: id => talks[id],
  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children.filter(entry => entry['wm-target'] === url)
  },
  // Get the first `n` elements of a collection.
  head: (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },
  // Get the last `n` elements of a collection.
  tail: (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(-n);
  },
  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
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
  mergeExternalPosts,
  mergeExternalTaggedPosts,
  readableDate,
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  },
  readableDateTimeFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  },
  similarItems: (itemPath, tags, collections) => {
    const topicTags = tags.filter(tag => !["posts", "Popular"].includes(tag))

    let matches = []
    topicTags.forEach(tag => {
      matches = [...matches, ...collections[tag]]
    })

    let uniqueMatches = unique(matches).filter(match => match.url !== itemPath) // remove self
    if (uniqueMatches.length < 3) {
      uniqueMatches = unique([...uniqueMatches, ...collections["Popular"]])
    }
    const matchesByRelevance = uniqueMatches
      .filter(match => match.url !== itemPath) // remove self
      .map(match => {
        return {...match, relevance: getRelevance(topicTags, match)}
      })
      .sort((a, b) => {
        if (a.relevance > b.relevance) {
          return -1;
        }
        if (a.relevance < b.relevance) {
          return 1;
        }
        return 0;
      })
    const size = 3
    return matchesByRelevance.slice(0, size);
  },
  size: (mentions) => {
    return !mentions ? 0 : mentions.length
  },
  sortWebmentions: (mentions) => {
    return mentions.sort((a, b) => {
      if (a["published"] < b["published"]) {
        return -1;
      }
      if (a["published"] > b["published"]) {
        return 1;
      }
      // a must be equal to b
      return 0;
    })
  },
  truncate: (text, limit=300) => text.length > limit ? `${text.substring(0, limit)}...` : text,
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType])
  },
}
