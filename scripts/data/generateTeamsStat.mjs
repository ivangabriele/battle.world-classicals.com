import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

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

        // Game Count
        const lichessTournamentGames = await readData(`./lichess/games/${tournamentId}.json`)
        const lichessTournamentGamesForCurrentTeam = R.filter(
          R.or(R.pathEq(['players', 'white', 'team'], teamId), R.pathEq(['players', 'black', 'team'], teamId)),
        )(lichessTournamentGames)
        const gameCount = lichessTournamentGamesForCurrentTeam.length

        // Berseck Rate
        const lichessTournamentGamesAsWhiteForCurrentTeam = R.filter(R.pathEq(['players', 'white', 'team'], teamId))(
          lichessTournamentGamesForCurrentTeam,
        )
        const lichessTournamentGamesAsBlackForCurrentTeam = R.filter(R.pathEq(['players', 'black', 'team'], teamId))(
          lichessTournamentGamesForCurrentTeam,
        )
        const lichessTournamentGamesForCurrentTeamBerseksCountAsWhite = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'white', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsWhiteForCurrentTeam)
        const lichessTournamentGamesForCurrentTeamBerseksCountAsBlack = R.pipe(
          R.filter(R.pathSatisfies(R.equals(true), ['players', 'black', 'berserk'])),
          R.length,
        )(lichessTournamentGamesAsBlackForCurrentTeam)
        const berseckRate = Math.round(
          (100 *
            (lichessTournamentGamesForCurrentTeamBerseksCountAsWhite +
              lichessTournamentGamesForCurrentTeamBerseksCountAsBlack)) /
            gameCount,
        )

        // Members Rating
        const lichessTournamentGamesForCurrentTeamMemberRatingsAsWhite = R.map(R.path(['players', 'black', 'rating']))(
          lichessTournamentGamesAsWhiteForCurrentTeam,
        )
        const lichessTournamentGamesForCurrentTeamMemberRatingsAsBlack = R.map(R.path(['players', 'white', 'rating']))(
          lichessTournamentGamesAsBlackForCurrentTeam,
        )
        const lichessTournamentGamesForCurrentTeamMemberRatings = [
          ...lichessTournamentGamesForCurrentTeamMemberRatingsAsWhite,
          ...lichessTournamentGamesForCurrentTeamMemberRatingsAsBlack,
        ]
        const memberRatings = R.pipe(R.mean, Math.round)(lichessTournamentGamesForCurrentTeamMemberRatings)

        // Win Rate
        const lichessTournamentGamesWonByCurrentTeam = R.filter(
          R.or(
            R.and(R.pathEq(['players', 'white', 'team'], teamId), R.propEq('winner', 'white')),
            R.and(R.pathEq(['players', 'black', 'team'], teamId), R.propEq('winner', 'black')),
          ),
        )(lichessTournamentGamesForCurrentTeam)
        const winRate = Math.round(
          (100 * lichessTournamentGamesWonByCurrentTeam.length) / lichessTournamentGamesForCurrentTeam.length,
        )

        teamWithStat.bersekRates[1].push(berseckRate)
        teamWithStat.gameCounts[1].push(gameCount)
        teamWithStat.memberRatings[1].push(memberRatings)
        teamWithStat.winRates[1].push(winRate)
      }

      teamWithStat.bersekRates[0] = R.pipe(R.reject(R.isNil), R.mean, Math.round)(teamWithStat.bersekRates[1])
      teamWithStat.gameCounts[0] = R.sum(teamWithStat.gameCounts[1])
      teamWithStat.memberRatings[0] = R.pipe(R.reject(R.isNil), R.mean, Math.round)(teamWithStat.memberRatings[1])
      teamWithStat.winRates[0] = R.pipe(R.reject(R.isNil), R.mean, Math.round)(teamWithStat.winRates[1])

      await writeData(teamDataPath, teamWithStat)
    } catch (err) {
      spinner.fail('Teams Stat data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  spinner.succeed(`Teams Stat data generated.`)
}
