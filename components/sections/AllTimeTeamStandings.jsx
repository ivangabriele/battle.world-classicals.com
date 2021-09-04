import Standings from '../shared/Standings'

export default function AllTimeTeamStandings({ data, title }) {
  const standings = data.map(({ id, name, totalScore }, index) => ({
    id,
    name,
    rank: index + 1,
    score: totalScore,
    url: `/team/${id}`,
  }))

  return <Standings data={standings} title={title} />
}
