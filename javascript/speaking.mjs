import {talks} from '/javascript/talks.mjs'
import {upcomingEvents, pastEvents} from '/javascript/events.mjs'

function getTalk({talk, more, date}) {
  const node = document.createElement('li')
  node.innerHTML = ` ${talk ? talks[talk].title: ''}${more ? more : ''}`
  const span = document.createElement('span')
  span.innerHTML = date
  node.prepend(span)
  return node
}

function getEventNode({conference, conferenceUrl, talks}) {
  const article = document.createElement('article')
  article.classList = ['event-item']

  const link = document.createElement('a')
  link.href = conferenceUrl
  link.innerHTML = conference

  const heading = document.createElement('h3')
  heading.appendChild(link)

  const list = document.createElement('ul')
  talks.forEach(talk => {
    list.appendChild(getTalk(talk))
  })

  article.appendChild(heading)
  article.appendChild(list)
  return article
}

function renderEvents(events, target) {
  events.forEach(event => {
    target.appendChild(getEventNode(event))
  });
}

if (upcomingEvents.length >= 0) {
  const upcomingNode = document.getElementById('upcomingEvents')
  upcomingNode.innerHTML = ""
  renderEvents(upcomingEvents, upcomingNode)
}

const pastNode = document.getElementById('pastEvents')
renderEvents(pastEvents, pastNode)
