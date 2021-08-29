const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function generateTeamPlayersResults() {
  console.info(`Generating Team Players Results data…`)
  const teamIds = await readData('./teamIds.json')
  const tournamentIds = await readData('./tournamentIds.json')

  for (const teamId of teamIds) {
    const team = await readData(`./teams/${teamId}.json`)

    const teamPlayerResults = []
    let tournamentIndex = -1
    for (const tournamentId of tournamentIds) {
      tournamentIndex++
      const lichessPlayerStandings = await readData(`./lichess/playerStandings/${tournamentId}.json`)
      const lichessPlayerStandingsTeamPlayers = R.filter(R.propEq('team', teamId))(lichessPlayerStandings)

      for (const lichessPlayerStandingsTeamPlayer of lichessPlayerStandingsTeamPlayers) {
        const teamPlayerResultIndex = R.findIndex(R.propEq('username', lichessPlayerStandingsTeamPlayer.username))(
          teamPlayerResults,
        )

        if (teamPlayerResultIndex === -1) {
          const teamPlayerResult = {
            scores: [
              lichessPlayerStandingsTeamPlayer.score,
              [...new Array(tournamentIndex).fill(null), lichessPlayerStandingsTeamPlayer.score],
            ],
            username: lichessPlayerStandingsTeamPlayer.username,
          }

          teamPlayerResults.push(teamPlayerResult)

          continue
        }

        teamPlayerResults[teamPlayerResultIndex].scores[0] += lichessPlayerStandingsTeamPlayer.score
        teamPlayerResults[teamPlayerResultIndex].scores[1].push(lichessPlayerStandingsTeamPlayer.score)
      }
    }

    const teamPlayerResultsNormalized = R.pipe(
      R.map(playerResult => {
        if (playerResult.scores.length !== tournamentIndex) {
          // eslint-disable-next-line no-param-reassign
          playerResult.scores[1] = [
            ...playerResult.scores[1],
            ...new Array(tournamentIndex + 1 - playerResult.scores[1].length).fill(null),
          ]
        }

        return playerResult
      }),
      R.sort(R.descend(R.path(['scores', 0]))),
    )(teamPlayerResults)
    team.players = teamPlayerResultsNormalized

    await writeData(`./teams/${teamId}.json`, team)
  }
}
