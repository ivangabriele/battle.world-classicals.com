import R from 'ramda'

import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTeamTotalScores() {
  spinner.start(`Generating Team Total Scores data…`)

  try {
    const teamIds = await readData('./teamIds.json')

    const teamTotalScores = []
    for (const teamId of teamIds) {
      const {
        id,
        name,
        scores: [totalScore],
      } = await readData(`./teams/${teamId}.json`)

      teamTotalScores.push({
        id,
        name,
        totalScore,
      })
    }

    const teamTotalScoresSorted = R.sort(R.descend(R.prop('totalScore')))(teamTotalScores)

    await writeData('./teamTotalScores.json', teamTotalScoresSorted)

    spinner.succeed(`Team Total Scores data generated.`)
  } catch (err) {
    spinner.fail('Team Total Scores data generation failed.')
    console.error(`Error: ${err}`)

    process.exit()
  }
}
