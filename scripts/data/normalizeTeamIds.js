const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function normalizeTeamIds() {
  console.info(`Normalizing Team Ids data…`)
  const tournamentIds = await readData('./tournamentIds.json')

  const teamIds = []
  for (const tournamentId of tournamentIds) {
    const lichessTeamStandings = await readData(`./lichess/teamStandings/${tournamentId}.json`)
    const lichessTeamStandingsTeamIds = R.map(R.prop('id'))(lichessTeamStandings.teams)

    teamIds.push(...lichessTeamStandingsTeamIds)
  }
  const teamIdsSorted = R.pipe(R.uniq, R.sortBy(R.prop(0)))(teamIds)

  await writeData('./teamIds.json', teamIdsSorted)
}
