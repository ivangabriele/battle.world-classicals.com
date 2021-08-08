const fs = require('fs')
const fetch = require('isomorphic-unfetch')
const moment = require('moment')
const path = require('path')

const localPastTournaments = require('../../data/pastTournaments.json')
const normalizeLichessTournamentsList = require('../../libs/helpers/normalizeLichessTournamentsList')

async function updateTournaments() {
  const now = Number(moment().format('x'))
  const res = await fetch(`https://lichess.org/api/team/world-classicals/arena`)
  const rawData = await res.text()
  const worldClassicalsTeamArenas = normalizeLichessTournamentsList(rawData)
  const remotePastTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt < now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))

  const localPastTournamentIds = localPastTournaments.map(({ id }) => id)

  let index = -1
  while (++index < remotePastTournaments.length) {
    const { fullName, id } = remotePastTournaments[index]
    if (localPastTournamentIds.includes(id)) {
      continue
    }

    console.info(`Updating data for the ${fullName}…`)
    const res = await fetch(`https://lichess.org/api/tournament/${id}`)
    const data = await res.json()
    localPastTournaments.push(data)
  }

  const filePath = path.resolve(__dirname, '../../data/pastTournaments.json')
  const fileSource = JSON.stringify(localPastTournaments, null, 2)
  fs.writeFileSync(filePath, fileSource)
}

updateTournaments()
