import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

const mean = R.pipe(R.reject(R.isNil), R.mean, Math.round)

export default async function generateTeamsStat() {
  spinner.start(`Generating Teams Stat data…`)

  const teamIds = await readData('./teamIds.json')
  const tournamentIds = await readData('./tournamentIds.json')

  let index = -1
  const teamIdsLength = teamIds.length
  for (const teamId of teamIds) {
    ++index
    spinner.progress(`Generating Teams Stat data for: ${teamId}…`, index / teamIdsLength)

    try {
      const teamDataPath = `./teams/${teamId}.json`
      const team = await readData(teamDataPath)

      const teamWithStat = {
        ...team,
        bersekRates: [0, []],
        gameCounts: [0, []],
        memberRatings: [0, []],
        winRates: [0, []],
      }
      const allMemberRatings = []
      let totalBerseckCount = 0
      let totalWinCount = 0
      let tournamentIndex = -1
      for (const tournamentId of tournamentIds) {
        tournamentIndex++

        if (teamWithStat.scores[1][tournamentIndex] === null) {
          teamWithStat.bersekRates[1].push(null)
          teamWithStat.gameCounts[1].push(null)
          teamWithStat.memberRatings[1].push(null)
          teamWithStat.winRates[1].push(null)

          continue
        }
        // Predicates
        const isCurrentTeamAsBlack = game => R.pathEq(['players', 'black', 'team'], teamId)(game)
        const isCurrentTeamAsWhite = game => R.pathEq(['players', 'white', 'team'], teamId)(game)
        const isCurrentTeam = game => isCurrentTeamAsBlack(game) || isCurrentTeamAsWhite(game)

        // Game Count
        const lichessTournamentGames = await readData(`./lichess/games/${tournamentId}.json`)
        const lichessTournamentGamesForCurrentTeam = R.filter(isCurrentTeam)(lichessTournamentGames)
        const gameCount = lichessTournamentGamesForCurrentTeam.length

        // Berseck Rate
        const lichessTournamentGamesAsBlackForCurrentTeam = R.filter(isCurrentTeamAsBlack)(
          lichessTournamentGamesForCurrentTeam,
        )
        const lichessTournamentGamesAsWhiteForCurrentTeam = R.filter(isCurrentTeamAsWhite)(
          lichessTournamentGamesForCurrentTeam,
        )
        const lichessTournamentGamesForCurrentTeamBerseksCountAsBlack = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'black', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsBlackForCurrentTeam)
        const lichessTournamentGamesForCurrentTeamBerseksCountAsWhite = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'white', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsWhiteForCurrentTeam)
        const lichessTournamentGamesForCurrentTeamBerseksCount =
          lichessTournamentGamesForCurrentTeamBerseksCountAsWhite +
          lichessTournamentGamesForCurrentTeamBerseksCountAsBlack
        const berseckRate = Math.round((100 * lichessTournamentGamesForCurrentTeamBerseksCount) / gameCount)

        // Total Berseck Count
        totalBerseckCount += lichessTournamentGamesForCurrentTeamBerseksCount

        // Members Rating
        const lichessTournamentGamesForCurrentTeamMemberRatingsAsBlack = R.map(R.path(['players', 'white', 'rating']))(
          lichessTournamentGamesAsBlackForCurrentTeam,
        )
        const lichessTournamentGamesForCurrentTeamMemberRatingsAsWhite = R.map(R.path(['players', 'black', 'rating']))(
          lichessTournamentGamesAsWhiteForCurrentTeam,
        )
        const lichessTournamentGamesForCurrentTeamMemberRatings = [
          ...lichessTournamentGamesForCurrentTeamMemberRatingsAsWhite,
          ...lichessTournamentGamesForCurrentTeamMemberRatingsAsBlack,
        ]
        const memberRatings = R.pipe(R.mean, Math.round)(lichessTournamentGamesForCurrentTeamMemberRatings)

        // All Member Ratings
        allMemberRatings.push(...lichessTournamentGamesForCurrentTeamMemberRatings)

        // Win Rate
        const lichessTournamentGamesWonByCurrentTeam = R.filter(
          game =>
            (isCurrentTeamAsBlack(game) && R.propEq('winner', 'black')(game)) ||
            (isCurrentTeamAsWhite(game) && R.propEq('winner', 'white')(game)),
        )(lichessTournamentGamesForCurrentTeam)
        const winRate = Math.round(
          (100 * lichessTournamentGamesWonByCurrentTeam.length) / lichessTournamentGamesForCurrentTeam.length,
        )

        // Total Win Count
        totalWinCount += lichessTournamentGamesWonByCurrentTeam.length

        teamWithStat.bersekRates[1].push(berseckRate)
        teamWithStat.gameCounts[1].push(gameCount)
        teamWithStat.memberRatings[1].push(memberRatings)
        teamWithStat.winRates[1].push(winRate)
      }

      const totalGameCount = R.sum(teamWithStat.gameCounts[1])
      const percentage = R.pipe(R.multiply(100), R.divide(R.__, totalGameCount), Math.round)

      teamWithStat.bersekRates[0] = percentage(totalBerseckCount)
      teamWithStat.gameCounts[0] = totalGameCount
      teamWithStat.memberRatings[0] = mean(allMemberRatings)
      teamWithStat.winRates[0] = percentage(totalWinCount)

      await writeData(teamDataPath, teamWithStat)
    } catch (err) {
      spinner.fail('Teams Stat data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  spinner.succeed(`Teams Stat data generated.`)
}
