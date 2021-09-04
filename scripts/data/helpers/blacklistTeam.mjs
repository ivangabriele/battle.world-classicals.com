import R from 'ramda'

import deleteData from './deleteData.mjs'
import hasData from './hasData.mjs'
import readData from './readData.mjs'
import writeData from './writeData.mjs'

export default async function blacklistTeam(teamId) {
  console.info(`Blacklisting team: ${teamId}…`)

  const lichessTeamDataPath = `./lichess/teams/${teamId}.json`
  if (hasData(lichessTeamDataPath)) {
    await deleteData(lichessTeamDataPath)
  }

  const blacklistedTeamIdsDataPath = './blacklistedTeamIds.json'

  const blacklistedTeamIds = await readData(blacklistedTeamIdsDataPath)
  blacklistedTeamIds.push(teamId)

  const blacklistedTeamIdsSorted = R.pipe(R.sortBy(R.prop(0)))(blacklistedTeamIds)
  await writeData(blacklistedTeamIdsDataPath, blacklistedTeamIdsSorted)
}
