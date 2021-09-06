import hasData from './helpers/hasData.mjs'
import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePlayers() {
  spinner.start(`Generating Players data…`)

  const playerUsernames = await readData('./playerUsernames.json')

  let hasUpdated = false
  let index = -1
  const playerUsernamesLength = playerUsernames.length
  for (const playerUsername of playerUsernames) {
    ++index
    const playerPath = `./players/${playerUsername}.json`
    if (hasData(playerPath)) {
      continue
    }

    spinner.progress(`Generating Players data for: ${playerUsername}…`, index / playerUsernamesLength)
    hasUpdated = true

    try {
      const { id, title, username } = await readData(`./lichess/players/${playerUsername}.json`)

      const player = {
        id,
        title: title || null,
        username,
      }

      await writeData(playerPath, player)
    } catch (err) {
      spinner.fail('Players data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  if (!hasUpdated) {
    spinner.succeed('Players data up to date.')
  } else {
    spinner.succeed(`Players data generated.`)
  }
}
