import Standings from '../shared/Standings'

export default function AllTimeTeamStandings({ teamIdsNames, teamResults, title }) {
  const standings = teamResults.map(({ id, scores: [allTimeScore] }, index) => ({
    id,
    name: teamIdsNames.find(({ id: _id }) => _id === id).name,
    rank: index + 1,
    score: allTimeScore,
    url: `/team/${id}`,
  }))

  return <Standings standings={standings} title={title} />
}
