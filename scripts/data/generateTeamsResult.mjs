import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeamsResult() {
  spinner.start(`Generating Teams Result data…`)
  const teamIds = await readData('./teamIds.json')
  const tournamentIds = await readData('./tournamentIds.json')

  // const teamTotalScores = []
  let index = -1
  const teamIdsLength = teamIds.length
  for (const teamId of teamIds) {
    ++index
    spinner.progress(`Generating Teams Result data for: ${teamId}…`, index / teamIdsLength)

    try {
      const team = await readData(`./teams/${teamId}.json`)

      const teamWithResult = {
        ...team,
        ranks: [null, []],
        scores: [0, []],
      }
      for (const tournamentId of tournamentIds) {
        const lichessTeamStandings = await readData(`./lichess/teamStandings/${tournamentId}.json`)
        const maybeLichessTeamStanding = R.find(R.propEq('id', teamId))(lichessTeamStandings.teams)
        if (maybeLichessTeamStanding === undefined) {
          teamWithResult.ranks[1].push(null)
          teamWithResult.scores[1].push(null)

          continue
        }

        teamWithResult.ranks[1].push(maybeLichessTeamStanding.rank)
        teamWithResult.scores[0] += maybeLichessTeamStanding.score
        teamWithResult.scores[1].push(maybeLichessTeamStanding.score)
      }

      // const teamTotalScore = teamWithResult.scores[0]

      await writeData(`./teams/${teamId}.json`, teamWithResult)

      // teamTotalScores.push({
      //   id: teamId,
      //   totalScore: teamTotalScore,
      // })
    } catch (err) {
      spinner.fail('Teams Result data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  // const teamTotalScoresFinal = R.sort(R.descend(R.prop('totalScore')))(teamTotalScores)

  // await writeData('./teamTotalScores.json', teamTotalScoresFinal)

  spinner.succeed(`Teams Result data generated.`)
}
