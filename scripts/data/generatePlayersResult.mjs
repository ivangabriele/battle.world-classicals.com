import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePlayersResult() {
  spinner.start(`Generating Players Result data…`)

  const playerUsernames = await readData('./playerUsernames.json')
  const tournamentIds = await readData('./tournamentIds.json')

  let index = -1
  const playerUsernamesLength = playerUsernames.length
  for (const playerUsername of playerUsernames) {
    ++index
    spinner.progress(`Generating Players Result data for: ${playerUsername}…`, index / playerUsernamesLength)

    try {
      const player = await readData(`./players/${playerUsername}.json`)

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

  spinner.succeed(`Players Result data generated.`)
}
