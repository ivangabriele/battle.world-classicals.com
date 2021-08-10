const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function normalizePublicInactiveTeamIds() {
  console.info(`Generating public Inactive Team Ids data…`)
  const teamIds = require('../../data/teamIds.json')
  const teamResults = require('../../data/teamResults.json')
  const activeTeamIds = R.map(R.prop('id'))(teamResults)
  const inactiveTeamIds = R.difference(teamIds, activeTeamIds)

  const inactiveTeamIdsNormalized = R.sortBy(R.prop(0))(inactiveTeamIds)

  writeData('./inactive-team-ids.json', inactiveTeamIdsNormalized, true)
}
