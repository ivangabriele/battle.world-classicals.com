const normalizeTournamentIds = require('./normalizeTournamentIds')
const updateTeams = require('./updateTeams')
const updateTeamStandings = require('./updateTeamStandings')
const updateTournaments = require('./updateTournaments')

async function update() {
  await updateTournaments()
  await normalizeTournamentIds()

  await updateTeamStandings()
  await updateTeams()
}

update()
