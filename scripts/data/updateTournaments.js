const moment = require('moment')
const R = require('ramda')

const localTournaments = require('../../data/lichess/tournaments.json')
const fetchLichess = require('./helpers/fetchLichess')
const writeData = require('./helpers/writeData')

module.exports = async function updateTournaments() {
  const now = Number(moment().format('x'))
  const worldClassicalsTeamArenas = await fetchLichess(`/team/world-classicals/arena`)
  const remoteTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt < now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))

  const localTournamentIds = R.map(R.prop('id'))(localTournaments)
  const remoteTournamentIds = R.map(R.prop('id'))(remoteTournaments)
  const newTournamentIds = R.difference(remoteTournamentIds, localTournamentIds)

  if (newTournamentIds.length === 0) {
    console.info('Lichess Tournaments data is up to date.')

    return
  }

  let index = -1
  while (++index < newTournamentIds.length) {
    const id = newTournamentIds[index]

    console.info(`Updating Lichess Tournament data for: ${id}…`)
    const lichessTournament = await fetchLichess(`/tournament/${id}`)
    localTournaments.push(lichessTournament)
  }

  await writeData('./lichess/tournaments.json', localTournaments)
}
