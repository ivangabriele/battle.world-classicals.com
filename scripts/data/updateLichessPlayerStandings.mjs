import fetchLichess from './helpers/fetchLichess.mjs'
import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function updateLichessPlayerStandings() {
  spinner.start(`Updating Lichess Player Standings data…`)
  const tournamentIds = await readData('./tournamentIds.json')

  let hasUpdated = false
  for (const tournamentId of tournamentIds) {
    const dataPath = `./lichess/playerStandings/${tournamentId}.json`
    if (hasData(dataPath)) {
      continue
    }

    spinner.update(`Updating Lichess Player Standings data for: ${tournamentId}…`)
    hasUpdated = true
    try {
      const playerStandings = await fetchLichess(`/tournament/${tournamentId}/results`)

      await writeData(dataPath, playerStandings)
    } catch (err) {
      spinner.fail('Lichess Player Standings data update failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Lichess Player Standings data up to date.')
  } else {
    spinner.succeed('Lichess Player Standings data updated.')
  }
}
