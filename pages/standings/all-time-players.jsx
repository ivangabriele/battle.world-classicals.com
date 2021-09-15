import Head from 'next/head'

import Main from '../../components/layouts/Main'
import AllTimePlayerStandings from '../../components/sections/AllTimePlayerStandings'
import Header from '../../components/sections/Header'
import playerTotalScores from '../../data/playerTotalScores.json'

export default function StandingsAllTimePlayersPage() {
  return (
    <>
      <Head>
        <title>All-Time WCTB Players Standings</title>
      </Head>

      <Main>
        <Header segment="STANDINGS" title="All-Time Player Standings" />

        <main>
          <AllTimePlayerStandings data={playerTotalScores} />
        </main>
      </Main>
    </>
  )
}
