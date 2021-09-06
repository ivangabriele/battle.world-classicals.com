import R from 'ramda'

// import deleteData from './deleteData.mjs'
import readData from './readData.mjs'
import writeData from './writeData.mjs'

export default async function deletePlayer(player) {
  const {
    teams: [, playerTeams],
  } = player

  const playerUsernamesDataPath = './playerUsernames.json'
  const teamUsernames = await readData(playerUsernamesDataPath)

  const teamUsernamesWithoutPlayer = R.reject(R.equals(player.username))(teamUsernames)

  await writeData(playerUsernamesDataPath, teamUsernamesWithoutPlayer)

  const nonNullPlayerTeams = R.reject(R.isNil)(playerTeams)
  for (const { id: teamId } of nonNullPlayerTeams) {
    const teamsDataPath = `./teams/${teamId}.json`
    const team = await readData(teamsDataPath)

    team.players = R.reject(R.propEq('username', player.username))(team.players)

    await writeData(teamsDataPath, team)
  }

  // await deleteData(`./players/${player.username}.json`)
}
