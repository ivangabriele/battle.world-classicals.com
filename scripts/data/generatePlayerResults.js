const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function generatePlayerResults() {
  console.info(`Generating Player Results data…`)
  const playerUsernames = await readData('./playerUsernames.json')
  const tournamentIds = await readData('./tournamentIds.json')

  const playerTotalScores = []
  for (const playerUsername of playerUsernames) {
    const playerResult = {
      performances: [null, []],
      ranks: [null, []],
      ratings: [null, []],
      scores: [0, []],
      username: playerUsername,
    }
    for (const tournamentId of tournamentIds) {
      /** @type {Lichess.PlayerStandings}  */
      const lichessPlayerStandings = await readData(`./lichess/playerStandings/${tournamentId}.json`)
      /** @type {Lichess.PlayerStanding | undefined}  */
      const maybeLichessPlayerStandingsPlayer = R.find(R.propEq('username', playerUsername))(lichessPlayerStandings)
      if (maybeLichessPlayerStandingsPlayer === undefined) {
        playerResult.performances[1].push(null)
        playerResult.ranks[1].push(null)
        playerResult.ratings[1].push(null)
        playerResult.scores[1].push(null)

        continue
      }

      playerResult.performances[1].push(maybeLichessPlayerStandingsPlayer.performance || null)
      playerResult.ranks[1].push(maybeLichessPlayerStandingsPlayer.rank)
      playerResult.ratings[1].push(maybeLichessPlayerStandingsPlayer.rating)
      playerResult.scores[0] += maybeLichessPlayerStandingsPlayer.score
      playerResult.scores[1].push(maybeLichessPlayerStandingsPlayer.score)
    }

    const playerTotalScore = playerResult.scores[0]

    if (playerTotalScore !== 0) {
      await writeData(`./players/${playerUsername}.json`, playerResult)

      playerTotalScores.push({
        totalScore: playerTotalScore,
        username: playerUsername,
      })
    }
  }

  const playerTotalScoresFinal = R.sort(R.descend(R.prop('totalScore')))(playerTotalScores)

  await writeData('./playerTotalScores.json', playerTotalScoresFinal)
}
