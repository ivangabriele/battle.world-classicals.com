const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function generateTeamResults() {
  console.info(`Generating Team Results data…`)
  const teamIds = await readData('./teamIds.json')
  const tournamentIds = await readData('./tournamentIds.json')

  const teamTotalScores = []
  for (const teamId of teamIds) {
    const teamResult = { id: teamId, ranks: [null, []], scores: [0, []] }
    for (const tournamentId of tournamentIds) {
      const lichessTeamStandings = await readData(`./lichess/teamStandings/${tournamentId}.json`)
      const maybeLichessTeamStandingsTeam = R.find(R.propEq('id', teamId))(lichessTeamStandings.teams)
      if (maybeLichessTeamStandingsTeam === undefined) {
        teamResult.ranks[1].push(null)
        teamResult.scores[1].push(null)

        continue
      }

      teamResult.ranks[1].push(maybeLichessTeamStandingsTeam.rank)
      teamResult.scores[0] += maybeLichessTeamStandingsTeam.score
      teamResult.scores[1].push(maybeLichessTeamStandingsTeam.score)
    }

    const teamTotalScore = teamResult.scores[0]

    if (teamTotalScore !== 0) {
      await writeData(`./teams/${teamId}.json`, teamResult)

      teamTotalScores.push({
        id: teamId,
        totalScore: teamTotalScore,
      })
    }
  }

  const teamTotalScoresFinal = R.sort(R.descend(R.prop('totalScore')))(teamTotalScores)

  await writeData('./teamTotalScores.json', teamTotalScoresFinal)
}
