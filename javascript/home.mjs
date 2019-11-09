import { upcomingEvents } from '/javascript/events.mjs'
import { renderEvents } from '/javascript/renderEvents.mjs'

if (upcomingEvents.length > 0) {
  const upcomingNode = document.getElementById('upcomingEvents')
  upcomingNode.innerHTML = ""
  renderEvents(upcomingEvents, upcomingNode)
}

