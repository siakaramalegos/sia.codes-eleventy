const fetch = require('node-fetch')

const API_URL = 'https://api.buttondown.email/v1/emails'
const TOKEN = process.env.BUTTONDOWN_API_TOKEN

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
    return data.results.map(post => {
      return {
        ...post,
        date: new Date(post.publish_date)
      }
    }).reverse()
  }

  console.warn(`>>> unable to fetch newsletter posts`)
  return null
}

module.exports = fetchNewsletterPosts
