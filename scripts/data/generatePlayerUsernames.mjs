import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePlayerUsernames() {
  spinner.start(`Generating Player Usernames data…`)

  const tournamentIds = await readData('./tournamentIds.json')

  const playerUsernames = []
  for (const tournamentId of tournamentIds) {
    const lichessTeamStandings = await readData(`./lichess/playerStandings/${tournamentId}.json`)
    const lichessTeamStandingsPlayerUsernames = R.map(R.prop('username'))(lichessTeamStandings)

    playerUsernames.push(...lichessTeamStandingsPlayerUsernames)
  }
  const playerUsernamesSorted = R.pipe(R.uniq, R.sortBy(R.prop(0)))(playerUsernames)

  await writeData('./playerUsernames.json', playerUsernamesSorted)

  spinner.succeed(`Team Ids data generated.`)
}
