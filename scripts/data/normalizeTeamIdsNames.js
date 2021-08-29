const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function normalizeTeamIdsNames() {
  console.info(`Normalizing Team Ids-Names data…`)
  const lichessTeams = await readData('./lichess/teams.json')

  const teamIdsNames = R.map(({ id, name }) => ({ id, name }))(lichessTeams)

  await writeData('./teamIdsNames.json', teamIdsNames)
}
