import Standings from '../shared/Standings'

export default function AllTimeTeamStandings({ data, teamIdsNames, title }) {
  const standings = data.map(({ id, totalScore }, index) => ({
    id,
    name: teamIdsNames.find(({ id: _id }) => _id === id).name,
    rank: index + 1,
    score: totalScore,
    url: `/team/${id}`,
  }))

  return <Standings data={standings} title={title} />
}
