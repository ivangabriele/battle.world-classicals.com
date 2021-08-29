const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function cleanTeamIds() {
  console.info(`Cleaning Team Ids data…`)
  const teamTotalScores = await readData('./teamTotalScores.json')
  const activeTeamIds = R.map(R.prop('id'))(teamTotalScores)

  const activeTeamIdsNormalized = R.sortBy(R.prop(0))(activeTeamIds)

  await writeData('./teamIds.json', activeTeamIdsNormalized)
}
