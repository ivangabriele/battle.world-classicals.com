const fs = require('fs')
const fetch = require('isomorphic-unfetch')
const path = require('path')
const prettier = require('prettier')

async function updateTeamStandings() {
  const tournamentIds = require('../../data/tournamentIds.json')

  let hasUpdated = false
  // eslint-disable-next-line no-restricted-syntax
  for (const tournamentId of tournamentIds) {
    const filePath = path.resolve(__dirname, `../../data/lichess/teamStandings/${tournamentId}.json`)
    if (fs.existsSync(filePath)) {
      continue
    }

    hasUpdated = true

    console.info(`Updating team standings data for: ${tournamentId}…`)
    const res = await fetch(`https://lichess.org/api/tournament/${tournamentId}/teams`)
    const teamStandings = await res.json()

    const fileSource = JSON.stringify(teamStandings)
    const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })
    fs.writeFileSync(filePath, fileSourceFormatted)
  }

  if (!hasUpdated) {
    console.info('Team standings data is up to date.')
  }
}

module.exports = updateTeamStandings
