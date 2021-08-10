const cleanPlayerUsernames = require('./cleanPlayerUsernames')
const cleanTeamIds = require('./cleanTeamIds')
const normalizePlayerResults = require('./normalizePlayerResults')
const normalizePlayerUsernames = require('./normalizePlayerUsernames')
const normalizePublicInactiveTeamIds = require('./normalizePublicInactiveTeamIds')
const normalizeTeamIds = require('./normalizeTeamIds')
const normalizeTeamIdsNames = require('./normalizeTeamIdsNames')
const normalizeTeamResults = require('./normalizeTeamResults')
const normalizeTournamentIds = require('./normalizeTournamentIds')
const updatePlayers = require('./updatePlayers')
const updatePlayerStandings = require('./updatePlayerStandings')
const updateTeams = require('./updateTeams')
const updateTeamStandings = require('./updateTeamStandings')
const updateTournaments = require('./updateTournaments')

async function update() {
  await updateTournaments()
  await normalizeTournamentIds()

  await updateTeamStandings()
  await normalizeTeamIds()
  await updateTeams()
  await normalizeTeamIdsNames()

  await updatePlayerStandings()
  await normalizePlayerUsernames()
  await updatePlayers()

  await normalizeTeamResults()
  await normalizePlayerResults()

  await normalizePublicInactiveTeamIds()

  await cleanTeamIds()
  await cleanPlayerUsernames()
}

update()
