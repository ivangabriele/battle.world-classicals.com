import R from 'ramda'

import cleanTeamName from './helpers/cleanTeamName.mjs'
import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeams() {
  spinner.start(`Generating Teams data…`)

  const teamIds = await readData('./teamIds.json')
  const blacklistedTeamIds = await readData('./blacklistedTeamIds.json')
  const blacklistedTeams = await readData('./blacklistedTeams.json')

  let hasUpdated = false
  let index = -1
  const teamIdsLength = teamIds.length
  for (const teamId of teamIds) {
    ++index
    const teamPath = `./teams/${teamId}.json`
    if (hasData(teamPath)) {
      continue
    }

    spinner.progress(`Generating Teams data for: ${teamId}…`, index / teamIdsLength)
    hasUpdated = true

    try {
      const team = { id: teamId }

      if (!blacklistedTeamIds.includes(teamId)) {
        const lichessTeam = await readData(`./lichess/teams/${teamId}.json`)

        team.rawName = lichessTeam.name
      } else {
        const blacklistedTeam = R.find(R.propEq('id', teamId))(blacklistedTeams)

        if (blacklistedTeam === undefined) {
          spinner.fail(`Teams data generation failed.`)
          console.error(`generateTeams(): ${teamId} can't be found in blacklistedTeams.json.`)

          process.exit()
        }

        team.rawName = blacklistedTeam.rawName
      }

      team.name = cleanTeamName(team.rawName)

      await writeData(teamPath, team)
    } catch (err) {
      spinner.fail('Teams data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Teams data up to date.')
  } else {
    spinner.succeed(`Teams data generated.`)
  }
}
