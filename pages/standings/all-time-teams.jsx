import Head from 'next/head'

import Navbar from '../../components/layouts/Navbar'
import AllTimeTeamsStandings from '../../components/sections/AllTimeTeamsStandings'
import teamIdsNames from '../../data/teamIdsNames.json'
import teamResults from '../../data/teamResults.json'

export default function IndexPage() {
  const teamResultsWithTeamName = teamResults.map(teamResult => ({
    ...teamResult,
    name: teamIdsNames.find(({ id }) => id === teamResult.id).name,
  }))

  return (
    <>
      <Head>
        <title>All-Time WCTB Team Standings ● World Classical Team Battle</title>
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <AllTimeTeamsStandings data={teamResultsWithTeamName} />
      </main>
    </>
  )
}
