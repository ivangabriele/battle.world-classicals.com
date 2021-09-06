import R from 'ramda'

import deletePlayer from './helpers/deletePlayer.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

const mean = R.pipe(R.reject(R.isNil), R.mean, Math.round)

export default async function generatePlayerStat() {
  spinner.start(`Generating Players Stat data…`)

  const playerUsernames = await readData('./playerUsernames.json')
  const tournamentIds = await readData('./tournamentIds.json')

  let index = -1
  const playerUsernamesLength = playerUsernames.length
  for (const playerUsername of playerUsernames) {
    ++index
    spinner.progress(`Generating Players Stat data for: ${playerUsername}…`, index / playerUsernamesLength)

    try {
      const player = await readData(`./players/${playerUsername}.json`)

      const playerWithStat = {
        ...player,
        bersekRates: [0, []],
        gameCounts: [0, []],
        opponentRatings: [0, []],
        winRates: [0, []],
      }
      const allOpponentRatings = []
      let totalBerseckCount = 0
      let totalWinCount = 0
      let tournamentIndex = -1
      for (const tournamentId of tournamentIds) {
        tournamentIndex++

        if (playerWithStat.scores[1][tournamentIndex] === null) {
          playerWithStat.bersekRates[1].push(null)
          playerWithStat.gameCounts[1].push(null)
          playerWithStat.opponentRatings[1].push(null)
          playerWithStat.winRates[1].push(null)

          continue
        }

        // Predicates
        const isCurrentPlayerAsBlack = game => R.pathEq(['players', 'black', 'user', 'name'], playerUsername)(game)
        const isCurrentPlayerAsWhite = game => R.pathEq(['players', 'white', 'user', 'name'], playerUsername)(game)
        const isCurrentPlayer = game => isCurrentPlayerAsBlack(game) || isCurrentPlayerAsWhite(game)

        // Game Count
        const lichessTournamentGames = await readData(`./lichess/games/${tournamentId}.json`)
        const lichessTournamentGamesForCurrentPlayer = R.filter(isCurrentPlayer)(lichessTournamentGames)
        const gameCount = lichessTournamentGamesForCurrentPlayer.length

        // Fix a strange Lichess bug giving a score of 0 to a player who didn't play any game at all
        if (lichessTournamentGamesForCurrentPlayer.length === 0) {
          playerWithStat.scores[1][tournamentIndex] = null

          playerWithStat.bersekRates[1].push(null)
          playerWithStat.gameCounts[1].push(null)
          playerWithStat.opponentRatings[1].push(null)
          playerWithStat.winRates[1].push(null)

          continue
        }

        // Berseck Rate
        const lichessTournamentGamesAsBlackForCurrentPlayer = R.filter(isCurrentPlayerAsBlack)(
          lichessTournamentGamesForCurrentPlayer,
        )
        const lichessTournamentGamesAsWhiteForCurrentPlayer = R.filter(isCurrentPlayerAsWhite)(
          lichessTournamentGamesForCurrentPlayer,
        )
        const lichessTournamentGamesForCurrentPlayerBerseksCountAsBlack = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'black', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsBlackForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerBerseksCountAsWhite = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'white', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsWhiteForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerBerseksCount =
          lichessTournamentGamesForCurrentPlayerBerseksCountAsWhite +
          lichessTournamentGamesForCurrentPlayerBerseksCountAsBlack
        const berseckRate = Math.round((100 * lichessTournamentGamesForCurrentPlayerBerseksCount) / gameCount)

        // Total Berseck Count
        totalBerseckCount += lichessTournamentGamesForCurrentPlayerBerseksCount

        // Opponent Rating
        const lichessTournamentGamesForCurrentPlayerOpponentRatingsAsBlack = R.map(
          R.path(['players', 'white', 'rating']),
        )(lichessTournamentGamesAsBlackForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerOpponentRatingsAsWhite = R.map(
          R.path(['players', 'black', 'rating']),
        )(lichessTournamentGamesAsWhiteForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerOpponentRatings = [
          ...lichessTournamentGamesForCurrentPlayerOpponentRatingsAsWhite,
          ...lichessTournamentGamesForCurrentPlayerOpponentRatingsAsBlack,
        ]
        const opponentRating = R.pipe(R.mean, Math.round)(lichessTournamentGamesForCurrentPlayerOpponentRatings)

        // All Opponent Ratings
        allOpponentRatings.push(...lichessTournamentGamesForCurrentPlayerOpponentRatings)

        // Win Rate
        const lichessTournamentGamesWonByCurrentPlayer = R.filter(
          game =>
            (isCurrentPlayerAsBlack(game) && R.propEq('winner', 'black')(game)) ||
            (isCurrentPlayerAsWhite(game) && R.propEq('winner', 'white')(game)),
        )(lichessTournamentGamesForCurrentPlayer)
        const winRate = Math.round(
          (100 * lichessTournamentGamesWonByCurrentPlayer.length) / lichessTournamentGamesForCurrentPlayer.length,
        )

        // Total Win Count
        totalWinCount += lichessTournamentGamesWonByCurrentPlayer.length

        playerWithStat.bersekRates[1].push(berseckRate)
        playerWithStat.gameCounts[1].push(gameCount)
        playerWithStat.opponentRatings[1].push(opponentRating)
        playerWithStat.winRates[1].push(winRate)
      }

      // Fix another strange Lichess bug calculating a total score of 0 or more to some players who never played
      if (R.reject(R.isNil)(playerWithStat.winRates[1]).length === 0) {
        await deletePlayer(player)

        continue
      }

      const totalGameCount = R.sum(playerWithStat.gameCounts[1])
      const percentage = R.pipe(R.multiply(100), R.divide(R.__, totalGameCount), Math.round)

      playerWithStat.bersekRates[0] = percentage(totalBerseckCount)
      playerWithStat.gameCounts[0] = totalGameCount
      playerWithStat.opponentRatings[0] = mean(allOpponentRatings)
      playerWithStat.winRates[0] = percentage(totalWinCount)

      await writeData(`./players/${playerUsername}.json`, playerWithStat)
    } catch (err) {
      spinner.fail('Players Stat data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  spinner.succeed(`Players Stat data generated.`)
}
