const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function normalizePlayerUsernames() {
  console.info(`Normalizing Player Usernames data…`)
  const tournamentIds = await readData('./tournamentIds.json')

  const playerUsernames = []
  for (const tournamentId of tournamentIds) {
    const lichessTeamStandings = await readData(`./lichess/playerStandings/${tournamentId}.json`)
    const lichessTeamStandingsPlayerUsernames = R.map(R.prop('username'))(lichessTeamStandings)

    playerUsernames.push(...lichessTeamStandingsPlayerUsernames)
  }
  const playerUsernamesSorted = R.pipe(R.uniq, R.sortBy(R.prop(0)))(playerUsernames)

  await writeData('./playerUsernames.json', playerUsernamesSorted)
}
