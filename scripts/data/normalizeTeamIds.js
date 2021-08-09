const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const R = require('ramda')

const localTeamIds = require('../../data/teamIds.json')

async function normalizeTeamIds() {
  console.info(`Normalizing Team Ids data…`)
  const tournamentIds = require('../../data/tournamentIds.json')

  // eslint-disable-next-line no-restricted-syntax
  for (const tournamentId of tournamentIds) {
    const teamStandings = require(`../../data/lichess/teamStandings/${tournamentId}.json`)
    const teamStandingsTeamIds = R.map(R.prop('id'))(teamStandings.teams)

    localTeamIds.push(...teamStandingsTeamIds)
  }
  const teamIds = R.pipe(R.uniq, R.sortBy(R.prop(0)))(localTeamIds)

  const filePath = path.resolve(__dirname, '../../data/teamIds.json')
  const fileSource = JSON.stringify(teamIds)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })
  fs.writeFileSync(filePath, fileSourceFormatted)
}

module.exports = normalizeTeamIds
