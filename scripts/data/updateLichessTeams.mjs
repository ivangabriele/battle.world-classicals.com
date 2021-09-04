import R from 'ramda'

import blacklistTeam from './helpers/blacklistTeam.mjs'
import fetchLichess from './helpers/fetchLichess.mjs'
import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function updateLichessTeams() {
  spinner.start(`Updating Lichess Teams data…`)
  const blacklistedTeamIds = await readData('./blacklistedTeamIds.json')
  const teamIds = await readData('./teamIds.json')

  const teamIdsWhitelisted = R.difference(teamIds)(blacklistedTeamIds)

  let hasUpdated = false
  for (const teamId of teamIdsWhitelisted) {
    const dataPath = `./lichess/teams/${teamId}.json`
    if (hasData(dataPath)) {
      continue
    }

    spinner.update(`Updating Lichess Teams data for: ${teamId}…`)
    hasUpdated = true
    try {
      const lichessTeam = await fetchLichess(`/team/${teamId}`)

      await writeData(dataPath, lichessTeam)
    } catch (err) {
      if (err.name === 'HTTPError' && err.response.statusCode === 404) {
        await blacklistTeam(teamId)

        continue
      }

      spinner.fail('Lichess Teams data update failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Lichess Teams data up to date.')
  } else {
    spinner.succeed('Lichess Teams data updated.')
  }
}
