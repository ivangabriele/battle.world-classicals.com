const fs = require('fs')
const fetch = require('isomorphic-unfetch')
const moment = require('moment')
const path = require('path')
const prettier = require('prettier')
const R = require('ramda')

const localPastTournaments = require('../../data/lichess/pastTournaments.json')
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

  const localPastTournamentIds = R.map(R.prop('id'))(localPastTournaments)
  const remotePastTournamentIds = R.map(R.prop('id'))(remotePastTournaments)
  const newPastTournamentIds = R.difference(remotePastTournamentIds, localPastTournamentIds)

  if (newPastTournamentIds.length === 0) {
    console.info('Tournaments data is up to date.')

    return
  }

  let index = -1
  while (++index < newPastTournamentIds.length) {
    const id = newPastTournamentIds[index]

    console.info(`Updating tournament data for: ${id}…`)
    const res = await fetch(`https://lichess.org/api/tournament/${id}`)
    const data = await res.json()
    localPastTournaments.push(data)
  }

  const filePath = path.resolve(__dirname, '../../data/lichess/pastTournaments.json')
  const fileSource = JSON.stringify(localPastTournaments)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })
  fs.writeFileSync(filePath, fileSourceFormatted)
}

module.exports = updateTournaments
