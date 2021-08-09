const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function cleanTeamIds() {
  console.info(`Cleaning Team Ids data…`)
  const teamResults = require('../../data/teamResults.json')
  const activeTeamIds = R.map(R.prop('id'))(teamResults)

  const activeTeamIdsNormalized = R.sortBy(R.prop(0))(activeTeamIds)

  writeData('./teamIds.json', activeTeamIdsNormalized)
}
