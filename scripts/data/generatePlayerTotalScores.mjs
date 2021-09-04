import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generatePlayerTotalScores() {
  spinner.start(`Generating Player Total Scores data…`)

  try {
    const playerUsernames = await readData('./playerUsernames.json')

    const playerTotalScores = []
    for (const playerUsername of playerUsernames) {
      const {
        scores: [totalScore],
      } = await readData(`./players/${playerUsername}.json`)

      playerTotalScores.push({
        totalScore,
        username: playerUsername,
      })
    }

    const playerTotalScoresSorted = R.sort(R.descend(R.prop('totalScore')))(playerTotalScores)

    await writeData('./playerTotalScores.json', playerTotalScoresSorted)

    spinner.succeed(`Player Total Scores data generated.`)
  } catch (err) {
    spinner.fail('Player Total Scores data generation failed.')
    console.error(`Error: ${err}`)

    process.exit()
  }
}
