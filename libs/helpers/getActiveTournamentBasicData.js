import fetch from 'isomorphic-unfetch'
import moment from 'moment'

import normalizeLichessTournamentsList from './normalizeLichessTournamentsList'

export default async function getActiveTournamentBasicData() {
  const now = Number(moment().format('x'))
  const res = await fetch(`https://lichess.org/api/team/world-classicals/arena`)
  const rawData = await res.text()
  const worldClassicalsTeamArenas = normalizeLichessTournamentsList(rawData)
  const sortedActiveTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt >= now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))
  const activeTournament = sortedActiveTournaments[0]

  return activeTournament
}
