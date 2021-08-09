const normalizeTournaments = require('./normalizeTournaments')
const updateTeams = require('./updateTeams')
const updateTeamStandings = require('./updateTeamStandings')
const updateTournaments = require('./updateTournaments')

async function update() {
  await updateTournaments()
  await normalizeTournaments()

  await updateTeamStandings()
  await updateTeams()
}

update()
