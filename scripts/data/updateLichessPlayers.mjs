import fetchLichess from './helpers/fetchLichess.mjs'
import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function updateLichessPlayers() {
  spinner.start(`Updating Players Teams data…`)
  const playerUsernames = await readData('./playerUsernames.json')

  let hasUpdated = false
  for (const playerUsername of playerUsernames) {
    const dataPath = `./lichess/players/${playerUsername}.json`
    if (hasData(dataPath)) {
      continue
    }

    spinner.update(`Updating Lichess Players data for: ${playerUsername}…`)
    hasUpdated = true
    try {
      const lichessPlayer = await fetchLichess(`/user/${playerUsername}`)

      await writeData(dataPath, lichessPlayer)
    } catch (err) {
      spinner.fail('Lichess Player data update failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Lichess Players data up to date.')
  } else {
    spinner.succeed('Lichess Players data updated.')
  }
}
