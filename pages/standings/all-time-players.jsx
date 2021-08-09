import Head from 'next/head'

import Navbar from '../../components/layouts/Navbar'
import AllTimePlayerStandings from '../../components/sections/AllTimePlayerStandings'
import playerResults from '../../data/playerResults.json'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>All-Time WCTB Player Standings ● World Classical Team Battle</title>
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <AllTimePlayerStandings data={playerResults} />
      </main>
    </>
  )
}
