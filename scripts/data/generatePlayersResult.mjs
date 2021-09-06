import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePlayersResult() {
  spinner.start(`Generating Players Result data…`)

  const playerUsernames = await readData('./playerUsernames.json')
  const tournamentIds = await readData('./tournamentIds.json')

  let hasUpdated = false
  let index = -1
  const playerUsernamesLength = playerUsernames.length
  const tournamentIdsLength = tournamentIds.length
  for (const playerUsername of playerUsernames) {
    ++index
    const player = await readData(`./players/${playerUsername}.json`)
    if (Array.isArray(player.scores) && player.scores[1].length === tournamentIdsLength) {
      continue
    }

    spinner.progress(`Generating Players Result data for: ${playerUsername}…`, index / playerUsernamesLength)
    hasUpdated = true

    try {
      const playerWithResult = {
        ...player,
        performances: [null, []],
        ranks: [null, []],
        ratings: [null, []],
        scores: [0, []],
        teams: [null, []],
      }
      for (const tournamentId of tournamentIds) {
        const lichessPlayerStandings = await readData(`./lichess/playerStandings/${tournamentId}.json`)
        const maybeLichessPlayerStanding = R.find(R.propEq('username', playerUsername))(lichessPlayerStandings)

        if (maybeLichessPlayerStanding === undefined) {
          playerWithResult.performances[1].push(null)
          playerWithResult.ranks[1].push(null)
          playerWithResult.ratings[1].push(null)
          playerWithResult.scores[1].push(null)
          playerWithResult.teams[1].push(null)

          continue
        }

        const { id: teamId, name: teamName } = await readData(`./teams/${maybeLichessPlayerStanding.team}.json`)

        playerWithResult.performances[1].push(maybeLichessPlayerStanding.performance || null)
        playerWithResult.ranks[1].push(maybeLichessPlayerStanding.rank)
        playerWithResult.ratings[1].push(maybeLichessPlayerStanding.rating)
        playerWithResult.scores[0] += maybeLichessPlayerStanding.score
        playerWithResult.scores[1].push(maybeLichessPlayerStanding.score)
        playerWithResult.teams[1].push({
          id: teamId,
          name: teamName,
        })
      }

      await writeData(`./players/${playerUsername}.json`, playerWithResult)
    } catch (err) {
      spinner.fail('Players Result data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Players Result data up to date.')
  } else {
    spinner.succeed(`Players Result data generated.`)
  }
}
