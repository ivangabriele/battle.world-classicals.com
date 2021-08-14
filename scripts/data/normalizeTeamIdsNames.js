const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function normalizeTeamIdsNames() {
  console.info(`Normalizing Team Ids-Names data…`)
  const lichessTeams = require('../../data/lichess/teams.json')

  const teamIdsNames = R.map(({ id, name }) => ({ id, name }))(lichessTeams)

  await writeData('./teamIdsNames.json', teamIdsNames)
}
