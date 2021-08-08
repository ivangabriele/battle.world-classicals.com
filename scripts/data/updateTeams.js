const fs = require('fs')
const fetch = require('isomorphic-unfetch')
const path = require('path')
const prettier = require('prettier')
const R = require('ramda')

const localTeams = require('../../data/teams.json')

async function updateTeams() {
  const pastTournaments = require('../../data/pastTournaments.json')

  const localTeamIds = R.map(R.prop('id'))(localTeams)
  const remoteTeamIds = R.pipe(
    R.map(R.prop('teamStanding')),
    R.unnest,
    R.map(R.prop('id')),
    R.uniq,
    R.sortBy(R.prop(0)),
  )(pastTournaments)
  const newTeamIds = R.difference(remoteTeamIds, localTeamIds)

  if (newTeamIds.length === 0) {
    console.info('Teams data is up to date.')

    return
  }

  let index = -1
  while (++index < newTeamIds.length) {
    const id = newTeamIds[index]

    console.info(`Updating teams data for: ${id}…`)
    const res = await fetch(`https://lichess.org/api/team/${id}`)
    const data = await res.json()
    localTeams.push(data)
  }

  const filePath = path.resolve(__dirname, '../../data/teams.json')
  const fileSource = JSON.stringify(localTeams)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })
  fs.writeFileSync(filePath, fileSourceFormatted)
}

module.exports = updateTeams
