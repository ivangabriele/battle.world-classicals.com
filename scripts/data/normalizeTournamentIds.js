const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function normalizeTournamentIds() {
  console.info(`Normalizing Tournament Ids data…`)
  const lichessTournaments = await readData('./lichess/tournaments.json')
  const tournamentIds = R.map(R.prop('id'))(lichessTournaments)

  await writeData('./tournamentIds.json', tournamentIds)
}
