import Head from 'next/head'

import Main from '../../components/layouts/Main'
import AllTimeTeamStandings from '../../components/sections/AllTimeTeamStandings'
import teamTotalScores from '../../data/teamTotalScores.json'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>All-Time WCTB Team Standings ● World Classicals Team Battle</title>
      </Head>

      <Main>
        <main>
          <AllTimeTeamStandings data={teamTotalScores} title="All-Time WCTB Team Standings" />
        </main>
      </Main>
    </>
  )
}
