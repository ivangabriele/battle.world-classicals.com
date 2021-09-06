import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeamsPlayers() {
  spinner.start(`Generating Teams Players data…`)

  const teamIds = await readData('./teamIds.json')
  const tournamentIds = await readData('./tournamentIds.json')
  const teamCouples = await readData('./teamCouples.json')

  let index = -1
  const teamIdsLength = teamIds.length
  for (const teamId of teamIds) {
    ++index
    spinner.progress(`Generating Teams Players data for: ${teamId}…`, index / teamIdsLength)

    const team = await readData(`./teams/${teamId}.json`)

    const isCoupled = teamCouples[teamId] !== undefined
    const teamIds = [teamId]
    if (isCoupled) {
      const formerTeamIds = teamCouples[teamId].wasKnownAs.map(({ id }) => id)
      teamIds.push(...formerTeamIds)
    }
    const teamIdPredicate = !isCoupled ? _teamId => _teamId === teamId : _teamId => teamIds.includes(_teamId)

    const teamPlayers = []
    let tournamentIndex = -1
    for (const tournamentId of tournamentIds) {
      tournamentIndex++
      const lichessPlayerStandings = await readData(`./lichess/playerStandings/${tournamentId}.json`)
      const lichessPlayerStandingsForCurrentTeam = R.filter(R.propSatisfies(teamIdPredicate, 'team'))(
        lichessPlayerStandings,
      )

      for (const lichessPlayerStanding of lichessPlayerStandingsForCurrentTeam) {
        const teamPlayerResultIndex = R.findIndex(R.propEq('username', lichessPlayerStanding.username))(teamPlayers)

        if (teamPlayerResultIndex === -1) {
          const teamPlayer = {
            scores: [
              lichessPlayerStanding.score,
              [...new Array(tournamentIndex).fill(null), lichessPlayerStanding.score],
            ],
            username: lichessPlayerStanding.username,
          }

          teamPlayers.push(teamPlayer)

          continue
        }

        teamPlayers[teamPlayerResultIndex].scores[0] += lichessPlayerStanding.score
        teamPlayers[teamPlayerResultIndex].scores[1] = [
          ...teamPlayers[teamPlayerResultIndex].scores[1],
          ...new Array(tournamentIndex - teamPlayers[teamPlayerResultIndex].scores[1].length).fill(null),
          lichessPlayerStanding.score,
        ]
      }
    }

    const teamPlayersNormalized = R.pipe(
      R.filter(R.pathSatisfies(R.flip(R.gt)(0), ['scores', 0])),
      R.map(teamPlayer => {
        if (teamPlayer.scores.length !== tournamentIndex) {
          // eslint-disable-next-line no-param-reassign
          teamPlayer.scores[1] = [
            ...teamPlayer.scores[1],
            ...new Array(tournamentIndex + 1 - teamPlayer.scores[1].length).fill(null),
          ]
        }

        return teamPlayer
      }),
      R.sort(R.descend(R.path(['scores', 0]))),
    )(teamPlayers)

    team.players = teamPlayersNormalized

    await writeData(`./teams/${teamId}.json`, team)
  }

  spinner.succeed(`Teams Players data generated.`)
}
