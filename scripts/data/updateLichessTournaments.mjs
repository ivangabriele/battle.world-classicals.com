import moment from 'moment'
import R from 'ramda'

import fetchLichess from './helpers/fetchLichess.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function updateLichessTournaments() {
  spinner.start(`Updating Lichess Tournaments data…`)
  const localLichessTournamentIds = await readData('./tournamentIds.json')

  const now = Number(moment().format('x'))
  const worldClassicalsTeamArenas = await fetchLichess(`/team/world-classicals/arena`)
  const remoteLichessTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt < now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))

  const remoteLichessTournamentIds = R.map(R.prop('id'))(remoteLichessTournaments)
  const newLichessTournamentIds = R.difference(remoteLichessTournamentIds, localLichessTournamentIds)

  if (newLichessTournamentIds.length === 0) {
    spinner.succeed('Lichess Tournaments data up to date.')

    return
  }

  for (const tournamentId of newLichessTournamentIds) {
    spinner.update(`Updating Lichess Tournament data for: ${tournamentId}…`)
    try {
      const lichessTournament = await fetchLichess(`/tournament/${tournamentId}`)

      await writeData(`./lichess/tournaments/${tournamentId}.json`, lichessTournament)
      localLichessTournamentIds.push(tournamentId)
    } catch (err) {
      spinner.fail('Lichess Tournament data update failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  await writeData('./tournamentIds.json', localLichessTournamentIds)

  spinner.succeed('Lichess Tournaments data updated.')
}
