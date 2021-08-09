const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const R = require('ramda')

async function normalizeTournaments() {
  const tournaments = require('../../data/lichess/tournaments.json')

  console.info(`Generating tournamentIds data…`)
  const tournamentIds = R.map(R.prop('id'))(tournaments)

  const filePath = path.resolve(__dirname, '../../data/tournamentIds.json')
  const fileSource = JSON.stringify(tournamentIds)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })
  fs.writeFileSync(filePath, fileSourceFormatted)
}

module.exports = normalizeTournaments
