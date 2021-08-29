const R = require('ramda')

const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function cleanPlayerUsernames() {
  console.info(`Cleaning Player Usernames data…`)
  const playerTotalScores = await readData('./playerTotalScores.json')
  const activePlayerUsernames = R.map(R.prop('username'))(playerTotalScores)

  const activePlayerUsernamesNormalized = R.sortBy(R.prop(0))(activePlayerUsernames)

  await writeData('./playerUsernames.json', activePlayerUsernamesNormalized)
}
