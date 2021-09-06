import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeamsResult() {
  spinner.start(`Generating Teams Result data…`)
  const teamIds = await readData('./teamIds.json')
  const tournamentIds = await readData('./tournamentIds.json')
  const teamCouples = await readData('./teamCouples.json')

  let hasUpdated = false
  let index = -1
  const teamIdsLength = teamIds.length
  const tournamentIdsLength = tournamentIds.length
  for (const teamId of teamIds) {
    ++index
    const team = await readData(`./teams/${teamId}.json`)
    if (Array.isArray(team.scores) && team.scores[1].length === tournamentIdsLength) {
      continue
    }

    spinner.progress(`Generating Teams Result data for: ${teamId}…`, index / teamIdsLength)
    hasUpdated = true

    try {
      const isCoupled = teamCouples[teamId] !== undefined
      const teamIds = [teamId]
      if (isCoupled) {
        const formerTeamIds = teamCouples[teamId].wasKnownAs.map(({ id }) => id)
        teamIds.push(...formerTeamIds)
      }
      const teamIdPredicate = !isCoupled ? _teamId => _teamId === teamId : _teamId => teamIds.includes(_teamId)

      const teamWithResult = {
        ...team,
        ranks: [null, []],
        scores: [0, []],
      }
      for (const tournamentId of tournamentIds) {
        const lichessTeamStandings = await readData(`./lichess/teamStandings/${tournamentId}.json`)
        const maybeLichessTeamStanding = R.find(R.propSatisfies(teamIdPredicate, 'id'))(lichessTeamStandings.teams)
        if (maybeLichessTeamStanding === undefined) {
          teamWithResult.ranks[1].push(null)
          teamWithResult.scores[1].push(null)

          continue
        }

        teamWithResult.ranks[1].push(maybeLichessTeamStanding.rank)
        teamWithResult.scores[0] += maybeLichessTeamStanding.score
        teamWithResult.scores[1].push(maybeLichessTeamStanding.score)
      }

      await writeData(`./teams/${teamId}.json`, teamWithResult)
    } catch (err) {
      spinner.fail('Teams Result data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Teams Result data up to date.')
  } else {
    spinner.succeed(`Teams Result data generated.`)
  }
}
