import cleanPlayerUsernames from './cleanPlayerUsernames.mjs'
import cleanTeamIds from './cleanTeamIds.mjs'
import generatePlayers from './generatePlayers.mjs'
import generatePlayersResult from './generatePlayersResult.mjs'
import generatePlayerStat from './generatePlayerStat.mjs'
import generatePlayerTotalScores from './generatePlayerTotalScores.mjs'
import generatePlayerUsernames from './generatePlayerUsernames.mjs'
// import generatePublicInactiveTeamIds from './generatePublicInactiveTeamIds.mjs'
import generateTeamIds from './generateTeamIds.mjs'
import generateTeams from './generateTeams.mjs'
import generateTeamsPlayers from './generateTeamsPlayers.mjs'
import generateTeamsResult from './generateTeamsResult.mjs'
import generateTeamsStat from './generateTeamsStat.mjs'
import generateTeamTotalScores from './generateTeamTotalScores.mjs'
import generateTournaments from './generateTournaments.mjs'
import updateLichessGames from './updateLichessGames.mjs'
import updateLichessPlayers from './updateLichessPlayers.mjs'
import updateLichessPlayerStandings from './updateLichessPlayerStandings.mjs'
import updateLichessTeams from './updateLichessTeams.mjs'
import updateLichessTeamStandings from './updateLichessTeamStandings.mjs'
import updateLichessTournaments from './updateLichessTournaments.mjs'

async function update() {
  await updateLichessTournaments()
  await updateLichessGames()

  // We use team standings to know which teams joined
  await updateLichessTeamStandings()
  await generateTeamIds()

  // We can know update teams raw data
  await updateLichessTeams()

  // We use player standings to know which players joined
  await updateLichessPlayerStandings()
  await generatePlayerUsernames()

  // We can know update players raw data
  await updateLichessPlayers()

  // Tournament: { id, name }
  await generateTournaments()

  // We need teams to generate players data
  // Team: { id, name, rawName }
  await generateTeams()
  // Player: { id, title, username }
  await generatePlayers()

  // We need players result to clean inactive ones
  // Player: { performances, ranks, ratings, scores, teamIds }
  await generatePlayersResult()
  await cleanPlayerUsernames()

  // We need teams result to clean inactive ones
  // Team: { ranks, scores }
  await generateTeamsResult()
  // We use teams result to clean inactive ones
  await cleanTeamIds()

  // Team:{ players }
  await generateTeamsPlayers()

  // Player: { bersekRates, gameCounts, opponentRatings, winRates }
  await generatePlayerStat()

  // Team: { bersekRates, gameCounts, memberRatings, winRates }
  await generateTeamsStat()

  await generatePlayerTotalScores()
  await generateTeamTotalScores()

  // await generatePublicInactiveTeamIds()
}

update()
