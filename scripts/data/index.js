const cleanPlayerUsernames = require('./cleanPlayerUsernames')
const cleanTeamIds = require('./cleanTeamIds')
const generatePlayerResults = require('./generatePlayerResults')
const generatePublicInactiveTeamIds = require('./generatePublicInactiveTeamIds')
const generateTeamPlayersResults = require('./generateTeamPlayersResults')
const generateTeamResults = require('./generateTeamResults')
const normalizePlayerUsernames = require('./normalizePlayerUsernames')
const normalizeTeamIds = require('./normalizeTeamIds')
const normalizeTeamIdsNames = require('./normalizeTeamIdsNames')
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

  await generateTeamResults()
  await generatePlayerResults()

  await generatePublicInactiveTeamIds()

  await cleanTeamIds()
  await cleanPlayerUsernames()

  await generateTeamPlayersResults()
}

update()
