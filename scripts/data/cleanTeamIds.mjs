import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function cleanTeamIds() {
  spinner.start(`Cleaning Team Ids data…`)

  const teamIds = await readData('./teamIds.json')

  let index = -1
  const teamIdsLength = teamIds.length
  const activeTeamIds = []
  for (const teamId of teamIds) {
    ++index
    spinner.progress(`Cleaning Team Ids data for: ${teamId}…`, index / teamIdsLength)
    const dataPath = `./teams/${teamId}.json`

    const team = await readData(dataPath)
    if (team.scores[0] === 0) {
      continue
    }

    activeTeamIds.push(teamId)
  }

  await writeData('./teamIds.json', activeTeamIds)

  spinner.succeed('Team Ids data cleaned.')
}
