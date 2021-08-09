import Standings from '../shared/Standings'

export default function AllTimePlayerStandings({ playerResults, title }) {
  const standings = playerResults.map(({ username, scores: [allTimeScore] }, index) => ({
    id: username,
    name: username,
    rank: index + 1,
    score: allTimeScore,
    url: `/player/${username}`,
  }))

  return <Standings standings={standings} title={title} />
}
