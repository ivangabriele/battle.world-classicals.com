import Head from 'next/head'

import Main from '../../components/layouts/Main'
import AllTimePlayerStandings from '../../components/sections/AllTimePlayerStandings'
import playerTotalScores from '../../data/playerTotalScores.json'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>All-Time WCTB Player Standings ● World Classicals Team Battle</title>
      </Head>

      <Main>
        <AllTimePlayerStandings data={playerTotalScores} title="All-Time WCTB Player Standings" />
      </Main>
    </>
  )
}
