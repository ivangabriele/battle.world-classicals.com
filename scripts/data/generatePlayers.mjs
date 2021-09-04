import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePlayers() {
  spinner.start(`Generating Players data…`)

  const playerUsernames = await readData('./playerUsernames.json')

  let index = -1
  const playerUsernamesLength = playerUsernames.length
  for (const playerUsername of playerUsernames) {
    ++index
    spinner.progress(`Generating Players data for: ${playerUsername}…`, index / playerUsernamesLength)

    try {
      const { id, title, username } = await readData(`./lichess/players/${playerUsername}.json`)

      const player = {
        id,
        title: title || null,
        username,
      }

      await writeData(`./players/${playerUsername}.json`, player)
    } catch (err) {
      spinner.fail('Players data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  spinner.succeed(`Players data generated.`)
}
