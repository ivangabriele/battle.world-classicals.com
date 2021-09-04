import readData from './helpers/readData.mjs'
import spinner from './helpers/spinner.mjs'
import writeData from './helpers/writeData.mjs'

export default async function generateTournaments() {
  spinner.start(`Generating Tournaments data…`)

  const tournamentIds = await readData('./tournamentIds.json')

  let index = -1
  const tournamentIdsLength = tournamentIds.length
  for (const tournamentId of tournamentIds) {
    ++index
    spinner.progress(`Generating Tournaments data for: ${tournamentId}…`, index / tournamentIdsLength)

    try {
      const { fullName, id } = await readData(`./lichess/tournaments/${tournamentId}.json`)

      const tournament = {
        id,
        name: fullName,
      }

      await writeData(`./tournaments/${tournamentId}.json`, tournament)
    } catch (err) {
      spinner.fail('Tournaments data generation failed.')
      console.error(`Error: ${err}`)

      process.exit()
    }
  }

  spinner.succeed(`Tournaments data generated.`)
}
