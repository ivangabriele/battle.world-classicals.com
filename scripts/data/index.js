const normalizePlayerUsernames = require('./normalizePlayerUsernames')
const normalizeTeamIds = require('./normalizeTeamIds')
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

  await updatePlayerStandings()
  await normalizePlayerUsernames()
  await updatePlayers()
}

update()
