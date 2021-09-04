import fetchLichess from './helpers/fetchLichess.mjs'
import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function updateLichessTeamStandings() {
  spinner.start(`Updating Lichess Team Standings data…`)
  const tournamentIds = await readData('./tournamentIds.json')

  let hasUpdated = false
  // eslint-disable-next-line no-restricted-syntax
  for (const tournamentId of tournamentIds) {
    const dataPath = `./lichess/teamStandings/${tournamentId}.json`
    if (hasData(dataPath)) {
      continue
    }

    spinner.update(`Updating Lichess Team Standings data for: ${tournamentId}…`)
    hasUpdated = true
    try {
      const lichessTournamentTeamStandings = await fetchLichess(`/tournament/${tournamentId}/teams`)

      await writeData(dataPath, lichessTournamentTeamStandings)
    } catch (err) {
      spinner.fail('Lichess Team Standings data update failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Lichess Team Standings data up to date.')
  } else {
    spinner.succeed('Lichess Team Standings data updated.')
  }
}
