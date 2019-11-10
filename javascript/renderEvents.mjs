import { talks } from '/javascript/talks.mjs'

function getTalk({ talk, more, date }) {
  const node = document.createElement('li')
  node.innerHTML = ` ${talk ? talks[talk].title : ''}${more ? more : ''}`

  const span = document.createElement('span')
  span.innerHTML = date
  node.prepend(span)

  return node
}

function getEventNode({ conference, conferenceUrl, location, talks }) {
  const article = document.createElement('article')
  article.classList = ['event-item']

  const link = document.createElement('a')
  link.href = conferenceUrl
  link.innerHTML = conference

  const heading = document.createElement('h3')
  heading.appendChild(link)

  const locationDiv = document.createElement('div')
  locationDiv.classList = 'event-location'
  locationDiv.innerHTML = location

  const mapIcon = document.createElement('img')
  mapIcon.src = '/img/map-marker-alt.svg'
  mapIcon.alt = 'map marker'
  locationDiv.prepend(mapIcon)

  const list = document.createElement('ul')
  talks.forEach(talk => {
    list.appendChild(getTalk(talk))
  })

  article.appendChild(heading)
  article.appendChild(locationDiv)
  article.appendChild(list)
  return article
}

export function renderEvents(events, target) {
  events.forEach(event => {
    target.appendChild(getEventNode(event))
  });
}
