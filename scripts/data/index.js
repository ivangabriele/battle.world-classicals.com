const normalizeTournaments = require('./normalizeTournaments')
const updateTeams = require('./updateTeams')
const updateTournaments = require('./updateTournaments')

async function update() {
  await updateTournaments()
  await normalizeTournaments()

  await updateTeams()
}

update()
