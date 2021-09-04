import R from 'ramda'

import cleanTeamName from './helpers/cleanTeamName.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeams() {
  spinner.start(`Generating Teams data…`)

  const teamIds = await readData('./teamIds.json')
  const blacklistedTeamIds = await readData('./blacklistedTeamIds.json')
  const blacklistedTeams = await readData('./blacklistedTeams.json')

  let index = -1
  const teamIdsLength = teamIds.length
  for (const teamId of teamIds) {
    ++index
    spinner.progress(`Generating Teams data for: ${teamId}…`, index / teamIdsLength)

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

    await writeData(`./teams/${teamId}.json`, team)
  }

  spinner.succeed(`Teams data generated.`)
}
