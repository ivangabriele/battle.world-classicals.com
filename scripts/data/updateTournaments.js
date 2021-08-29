const moment = require('moment')
const R = require('ramda')

const fetchLichess = require('./helpers/fetchLichess')
const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function updateTournaments() {
  const localLichessTournaments = await readData('./lichess/tournaments.json')

  const now = Number(moment().format('x'))
  const worldClassicalsTeamArenas = await fetchLichess(`/team/world-classicals/arena`)
  const remoteLichessTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt < now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))

  const localLichessTournamentIds = R.map(R.prop('id'))(localLichessTournaments)
  const remoteLichessTournamentIds = R.map(R.prop('id'))(remoteLichessTournaments)
  const newLichessTournamentIds = R.difference(remoteLichessTournamentIds, localLichessTournamentIds)

  if (newLichessTournamentIds.length === 0) {
    console.info('Lichess Tournaments data is up to date.')

    return
  }

  for (const tournamentId of newLichessTournamentIds) {
    console.info(`Updating Lichess Tournament data for: ${tournamentId}…`)
    const lichessTournament = await fetchLichess(`/tournament/${tournamentId}`)

    localLichessTournaments.push(lichessTournament)
  }

  await writeData('./lichess/tournaments.json', localLichessTournaments)
}
