import Standings from '../shared/Standings'

export default function AllTimePlayerStandings({ data, title }) {
  const standings = data.map(({ totalScore, username }, index) => ({
    id: username,
    name: username,
    rank: index + 1,
    score: totalScore,
    url: `/player/${username}`,
  }))

  return <Standings data={standings} title={title} />
}
