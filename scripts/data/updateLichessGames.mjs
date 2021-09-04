import fetchLichess from './helpers/fetchLichess.mjs'
import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function updateLichessGames() {
  spinner.start(`Updating Lichess Games data…`)
  const tournamentIds = await readData('./tournamentIds.json')

  let hasUpdated = false
  for (const tournamentId of tournamentIds) {
    const dataPath = `./lichess/games/${tournamentId}.json`
    if (hasData(dataPath)) {
      continue
    }

    spinner.update(`Updating Lichess Games data for: ${tournamentId}…`)
    hasUpdated = true
    try {
      // https://lichess.org/api#operation/gamesByTournament
      const lichesTournamentGames = await fetchLichess(`/tournament/${tournamentId}/games`, {
        isNdjson: true,
        params: {
          clocks: true,
          evals: false,
          moves: true,
          opening: false,
          pgnInJson: true,
          tags: true,
        },
      })

      await writeData(dataPath, lichesTournamentGames)
    } catch (err) {
      spinner.fail('Lichess Games data update failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Lichess Games data up to date.')
  } else {
    spinner.succeed('Lichess Games data updated.')
  }
}
