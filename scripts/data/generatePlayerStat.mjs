import R from 'ramda'

import deletePlayer from './helpers/deletePlayer.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

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

        // Game Count
        const lichessTournamentGames = await readData(`./lichess/games/${tournamentId}.json`)
        const lichessTournamentGamesForCurrentPlayer = R.filter(
          R.or(
            R.pathEq(['players', 'white', 'user', 'name'], playerUsername),
            R.pathEq(['players', 'black', 'user', 'name'], playerUsername),
          ),
        )(lichessTournamentGames)
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
        const lichessTournamentGamesAsWhiteForCurrentPlayer = R.filter(
          R.pathEq(['players', 'white', 'user', 'name'], playerUsername),
        )(lichessTournamentGamesForCurrentPlayer)
        const lichessTournamentGamesAsBlackForCurrentPlayer = R.filter(
          R.pathEq(['players', 'black', 'user', 'name'], playerUsername),
        )(lichessTournamentGamesForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerBerseksCountAsWhite = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'white', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsWhiteForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerBerseksCountAsBlack = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'black', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsBlackForCurrentPlayer)
        const berseckRate = Math.round(
          (100 *
            (lichessTournamentGamesForCurrentPlayerBerseksCountAsWhite +
              lichessTournamentGamesForCurrentPlayerBerseksCountAsBlack)) /
            gameCount,
        )

        // Opponent Rating
        const lichessTournamentGamesForCurrentPlayerOpponentRatingsAsWhite = R.map(
          R.path(['players', 'black', 'rating']),
        )(lichessTournamentGamesAsWhiteForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerOpponentRatingsAsBlack = R.map(
          R.path(['players', 'white', 'rating']),
        )(lichessTournamentGamesAsBlackForCurrentPlayer)
        const lichessTournamentGamesForCurrentPlayerOpponentRatings = [
          ...lichessTournamentGamesForCurrentPlayerOpponentRatingsAsWhite,
          ...lichessTournamentGamesForCurrentPlayerOpponentRatingsAsBlack,
        ]
        const opponentRating = R.pipe(R.mean, Math.round)(lichessTournamentGamesForCurrentPlayerOpponentRatings)

        // Win Rate
        const lichessTournamentGamesWonByCurrentPlayer = R.filter(
          R.or(
            R.and(R.pathEq(['players', 'white', 'user', 'name'], playerUsername), R.propEq('winner', 'white')),
            R.and(R.pathEq(['players', 'black', 'user', 'name'], playerUsername), R.propEq('winner', 'black')),
          ),
        )(lichessTournamentGamesForCurrentPlayer)
        const winRate = Math.round(
          (100 * lichessTournamentGamesWonByCurrentPlayer.length) / lichessTournamentGamesForCurrentPlayer.length,
        )

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

      playerWithStat.bersekRates[0] = R.pipe(R.reject(R.isNil), R.mean, Math.round)(playerWithStat.bersekRates[1])
      playerWithStat.gameCounts[0] = R.sum(playerWithStat.gameCounts[1])
      playerWithStat.opponentRatings[0] = R.pipe(
        R.reject(R.isNil),
        R.mean,
        Math.round,
      )(playerWithStat.opponentRatings[1])
      playerWithStat.winRates[0] = R.pipe(R.reject(R.isNil), R.mean, Math.round)(playerWithStat.winRates[1])

      await writeData(`./players/${playerUsername}.json`, playerWithStat)
    } catch (err) {
      spinner.fail('Players Stat data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  spinner.succeed(`Players Stat data generated.`)
}
