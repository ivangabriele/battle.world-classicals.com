import R from 'ramda'

import readData from './helpers/readData.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePublicInactiveTeamIds() {
  console.info(`Generating public Inactive Team Ids data…`)
  const teamIds = await readData('./teamIds.json')
  const teamTotalScores = await readData('./teamTotalScores.json')
  const activeTeamIds = R.map(R.prop('id'))(teamTotalScores)
  const inactiveTeamIds = R.difference(teamIds, activeTeamIds)

  const inactiveTeamIdsNormalized = R.sortBy(R.prop(0))(inactiveTeamIds)

  await writeData('./inactive-team-ids.json', inactiveTeamIdsNormalized, true)
}
