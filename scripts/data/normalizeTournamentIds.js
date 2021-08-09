const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function normalizeTournamentIds() {
  console.info(`Normalizing Tournament Ids data…`)
  const lichessTournaments = require('../../data/lichess/tournaments.json')
  const tournamentIds = R.map(R.prop('id'))(lichessTournaments)

  writeData('./tournamentIds.json', tournamentIds)
}
