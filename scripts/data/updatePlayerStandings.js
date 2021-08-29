const fetchLichess = require('./helpers/fetchLichess')
const hasData = require('./helpers/hasData')
const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function updatePlayerStandings() {
  const tournamentIds = await readData('./tournamentIds.json')

  let hasUpdated = false
  for (const tournamentId of tournamentIds) {
    const dataPath = `./lichess/playerStandings/${tournamentId}.json`
    if (hasData(dataPath)) {
      continue
    }

    console.info(`Updating Lichess Player Standings data for: ${tournamentId}…`)
    hasUpdated = true
    try {
      const playerStandings = await fetchLichess(`/tournament/${tournamentId}/results`)

      await writeData(dataPath, playerStandings)
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }

  if (!hasUpdated) {
    console.info('Lichess Player Standings data is up to date.')
  }
}
