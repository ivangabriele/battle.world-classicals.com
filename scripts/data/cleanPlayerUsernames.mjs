import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function cleanPlayerUsernames() {
  spinner.start(`Cleaning Player Usernames data…`)

  const playerUsernames = await readData('./playerUsernames.json')

  let index = -1
  const playerUsernamesLength = playerUsernames.length
  const activePlayerUsernames = []
  for (const playerUsername of playerUsernames) {
    ++index
    spinner.progress(`Cleaning Player Usernames data for: ${playerUsername}…`, index / playerUsernamesLength)
    const dataPath = `./players/${playerUsername}.json`

    const player = await readData(dataPath)
    if (player.scores[0] === 0) {
      continue
    }

    activePlayerUsernames.push(playerUsername)
  }

  await writeData('./playerUsernames.json', activePlayerUsernames)

  spinner.succeed('Player Usernames data cleaned.')
}
