const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function normalizePlayerUsernames() {
  console.info(`Normalizing Player Usernames data…`)
  const tournamentIds = require('../../data/tournamentIds.json')

  const playerUsernames = []
  for (const tournamentId of tournamentIds) {
    const lichessTeamStandings = require(`../../data/lichess/playerStandings/${tournamentId}.json`)
    const lichessTeamStandingsPlayerUsernames = R.map(R.prop('username'))(lichessTeamStandings)

    playerUsernames.push(...lichessTeamStandingsPlayerUsernames)
  }
  const playerUsernamesSorted = R.pipe(R.uniq, R.sortBy(R.prop(0)))(playerUsernames)

  writeData('./playerUsernames.json', playerUsernamesSorted)
}
