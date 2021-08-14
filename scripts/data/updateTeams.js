const R = require('ramda')

const lichessTeams = require('../../data/lichess/teams.json')
const teamsBlacklist = require('../../data/teamsBlacklist.json')
const fetchLichess = require('./helpers/fetchLichess')
const writeData = require('./helpers/writeData')

module.exports = async function updateTeams() {
  const teamIds = require('../../data/teamIds.json')

  const lichessTeamIds = R.map(R.prop('id'))(lichessTeams)
  const newTeamIds = R.pipe(R.difference(teamIds), R.difference(teamsBlacklist))(lichessTeamIds)

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
