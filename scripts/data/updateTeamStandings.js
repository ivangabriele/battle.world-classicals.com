const fetchLichess = require('./helpers/fetchLichess')
const hasData = require('./helpers/hasData')
const writeData = require('./helpers/writeData')

module.exports = async function updateTeamStandings() {
  const tournamentIds = require('../../data/tournamentIds.json')

  let hasUpdated = false
  // eslint-disable-next-line no-restricted-syntax
  for (const tournamentId of tournamentIds) {
    const dataPath = `./lichess/teamStandings/${tournamentId}.json`
    if (hasData(dataPath)) {
      continue
    }

    console.info(`Updating Lichess Team Standings data for: ${tournamentId}…`)
    hasUpdated = true
    try {
      const teamStandings = await fetchLichess(`/tournament/${tournamentId}/teams`)

      await writeData(dataPath, teamStandings)
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }

  if (!hasUpdated) {
    console.info('Lichess Team Standings data is up to date.')
  }
}
