import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeamIds() {
  spinner.start(`Generating Team Ids data…`)
  const tournamentIds = await readData('./tournamentIds.json')

  const teamIds = []
  for (const tournamentId of tournamentIds) {
    const lichessTeamStandings = await readData(`./lichess/teamStandings/${tournamentId}.json`)
    const lichessTeamStandingsTeamIds = R.map(R.prop('id'))(lichessTeamStandings.teams)

    teamIds.push(...lichessTeamStandingsTeamIds)
  }
  const teamIdsSorted = R.pipe(R.uniq, R.sortBy(R.prop(0)))(teamIds)

  await writeData('./teamIds.json', teamIdsSorted)

  spinner.succeed(`Team Ids data generated.`)
}
