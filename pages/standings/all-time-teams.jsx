import Head from 'next/head'

import Navbar from '../../components/layouts/Navbar'
import AllTimeTeamStandings from '../../components/sections/AllTimeTeamStandings'
import teamIdsNames from '../../data/teamIdsNames.json'
import teamTotalScores from '../../data/teamTotalScores.json'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>All-Time WCTB Team Standings ● World Classicals Team Battle</title>
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <AllTimeTeamStandings data={teamTotalScores} teamIdsNames={teamIdsNames} title="All-Time WCTB Team Standings" />
      </main>
    </>
  )
}
