const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function generatePublicInactiveTeamIds() {
  console.info(`Generating public Inactive Team Ids data…`)
  const teamIds = await readData('./teamIds.json')
  const teamTotalScores = await readData('./teamTotalScores.json')
  const activeTeamIds = R.map(R.prop('id'))(teamTotalScores)
  const inactiveTeamIds = R.difference(teamIds, activeTeamIds)

  const inactiveTeamIdsNormalized = R.sortBy(R.prop(0))(inactiveTeamIds)

  await writeData('./inactive-team-ids.json', inactiveTeamIdsNormalized, true)
}
