const fetch = require('node-fetch')
const { readFromCache, writeToCache } = require('../_11ty/helpers')

const API_URL = 'https://api.buttondown.email/v1/emails'
const TOKEN = process.env.BUTTONDOWN_API_TOKEN
const CACHE_FILE_PATH = '_cache/newsletter.json'

async function fetchNewsletterPosts() {
  // If we dont have a token, abort
  if (!TOKEN) {
    console.warn('>>> unable to fetch newsletter posts: missing token')
    return false
  }

  console.log(`>>> Fetching newsletter posts...`)
  const response = await fetch(API_URL, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: { 'Authorization': `Token ${TOKEN}` }
  })

  if (response.ok) {
    const data = await response.json()
    console.log(`>>> ${data.count} newsletter posts fetched from ${API_URL}`)
    return data.results.reverse()
  }

  console.warn(`>>> unable to fetch newsletter posts`)
  return null
}

function fetchFromCache() {
  console.log('>>> Reading newsletter posts from cache...');
  const {lastFetched, children} = readFromCache(CACHE_FILE_PATH)

  if (children.length) {
    console.log(`>>> Read ${children.length} newsletter posts from cache last fetched ${lastFetched}`);
  }
  return children
}

async function getNewsletterPosts() {
  // Load from cache if not in prod
  if (process.env.NODE_ENV !== 'production') {
    return fetchFromCache()
  }

  // Fetch from API
  const freshPosts = await fetchNewsletterPosts()

  if (freshPosts) {
    const newCache = {
      lastFetched: new Date().toISOString(),
      children: freshPosts
    }

    writeToCache(newCache, CACHE_FILE_PATH, 'newsletter posts')
    return freshPosts
  } else {
    return fetchFromCache()
  }
}

module.exports = getNewsletterPosts
