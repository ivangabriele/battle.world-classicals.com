import Head from 'next/head'

import Main from '../../components/layouts/Main'
import AllTimeTeamStandings from '../../components/sections/AllTimeTeamStandings'
import Header from '../../components/sections/Header'
import teamTotalScores from '../../data/teamTotalScores.json'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>All-Time WCTB Teams Standings</title>
      </Head>

      <Main>
        <Header segment="STANDINGS" title="All-Time Team Standings" />

        <main>
          <AllTimeTeamStandings data={teamTotalScores} />
        </main>
      </Main>
    </>
  )
}
