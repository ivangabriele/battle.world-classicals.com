const updateTeams = require('./updateTeams')
const updateTournaments = require('./updateTournaments')

async function update() {
  await updateTournaments()
  await updateTeams()
}

update()
