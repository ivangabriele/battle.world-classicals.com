const fs = require('fs')
const fetch = require('isomorphic-unfetch')
const path = require('path')
const prettier = require('prettier')
const R = require('ramda')

const lichessTeams = require('../../data/lichess/teams.json')
const waitFor = require('./helpers/waitFor')

async function updateTeams() {
  const teamIds = require('../../data/teamIds.json')

  const lichessTeamIds = R.map(R.prop('id'))(lichessTeams)
  const newTeamIds = R.difference(teamIds, lichessTeamIds)

  if (newTeamIds.length === 0) {
    console.info('Lichess Teams data is up to date.')

    return
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const newTeamId of newTeamIds) {
    console.info(`Updating Lichess Teams data for: ${newTeamId}…`)
    try {
      const res = await fetch(`https://lichess.org/api/team/${newTeamId}`)
      const lichessTeam = await res.json()

      lichessTeams.push(lichessTeam)

      await waitFor(1)
    } catch (err) {
      console.error(`Error: ${err}`)

      break
    }
  }
  const lichessTeamsSorted = R.sortBy(R.prop('id'))(lichessTeams)

  const filePath = path.resolve(__dirname, '../../data/lichess/teams.json')
  const fileSource = JSON.stringify(lichessTeamsSorted)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })
  fs.writeFileSync(filePath, fileSourceFormatted)
}

module.exports = updateTeams
