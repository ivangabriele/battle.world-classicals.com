const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function normalizePlayerResults() {
  console.info(`Normalizing Player Results data…`)
  const playerUsernames = require('../../data/playerUsernames.json')
  const tournamentIds = require('../../data/tournamentIds.json')

  const playerResults = []
  for (const playerUsername of playerUsernames) {
    const playerResult = { performances: [null, []], ranks: [null, []], scores: [0, []], username: playerUsername }
    for (const tournamentId of tournamentIds) {
      const lichessPlayerStandings = require(`../../data/lichess/playerStandings/${tournamentId}.json`)
      const maybeLichessPlayerStandingsPlayer = R.find(R.propEq('username', playerUsername))(lichessPlayerStandings)
      if (maybeLichessPlayerStandingsPlayer === undefined) {
        playerResult.performances[1].push(null)
        playerResult.ranks[1].push(null)
        playerResult.scores[1].push(null)

        continue
      }

      playerResult.performances[1].push(maybeLichessPlayerStandingsPlayer.performance)
      playerResult.ranks[1].push(maybeLichessPlayerStandingsPlayer.rank)
      playerResult.scores[0] += maybeLichessPlayerStandingsPlayer.score
      playerResult.scores[1].push(maybeLichessPlayerStandingsPlayer.score)
    }

    playerResults.push(playerResult)
  }
  const playerResultsNormalized = R.pipe(
    R.filter(R.complement(R.pathEq(['scores', 0], 0))),
    R.sort(R.descend(R.path(['scores', 0]))),
  )(playerResults)

  writeData('./playerResults.json', playerResultsNormalized)
}
