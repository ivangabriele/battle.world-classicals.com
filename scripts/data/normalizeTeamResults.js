const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function normalizeTeamResults() {
  console.info(`Normalizing Team Results data…`)
  const teamIds = require('../../data/teamIds.json')
  const tournamentIds = require('../../data/tournamentIds.json')

  const teamResults = []
  for (const teamId of teamIds) {
    const teamResult = { id: teamId, ranks: [null, []], scores: [0, []] }
    for (const tournamentId of tournamentIds) {
      const lichessTeamStandings = require(`../../data/lichess/teamStandings/${tournamentId}.json`)
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

    teamResults.push(teamResult)
  }
  const teamResultsNormalized = R.pipe(
    R.filter(R.complement(R.pathEq(['scores', 0], 0))),
    R.sort(R.descend(R.path(['scores', 0]))),
  )(teamResults)

  await writeData('./teamResults.json', teamResultsNormalized)
}
