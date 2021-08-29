const R = require('ramda')

const fetchLichess = require('./helpers/fetchLichess')
const readData = require('./helpers/readData')
const writeData = require('./helpers/writeData')

module.exports = async function updateTeams() {
  const teamsBlacklist = await readData('./teamsBlacklist.json')
  const lichessTeams = await readData('./lichess/teams.json')
  const teamIds = await readData('./teamIds.json')

  const lichessTeamIds = R.map(R.prop('id'))(lichessTeams)
  const teamIdsWhiltelisted = R.difference(teamIds)(teamsBlacklist)
  const newTeamIds = R.difference(teamIdsWhiltelisted)(lichessTeamIds)

  if (newTeamIds.length === 0) {
    console.info('Lichess Teams data is up to date.')

    return
  }

  for (const newTeamId of newTeamIds) {
    console.info(`Updating Lichess Teams data for: ${newTeamId}…`)
    try {
      const lichessTeam = await fetchLichess(`/team/${newTeamId}`)

      lichessTeams.push(lichessTeam)
    } catch (err) {
      console.error(`Error: ${err}`)

      break
    }
  }
  const lichessTeamsSorted = R.sortBy(R.prop('id'))(lichessTeams)

  await writeData('./lichess/teams.json', lichessTeamsSorted)
}
