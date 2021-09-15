import Head from 'next/head'

import Main from '../../components/layouts/Main'
import AllTimePlayerStandings from '../../components/sections/AllTimePlayerStandings'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import playerTotalScores from '../../data/playerTotalScores.json'
import headerBackgroundImage from '../../public/headers/all-time-players.jpg'

export default function StandingsAllTimePlayersPage() {
  const metaImage = 'https://battle.world-classicals.com/headers/all-time-players.jpg'

  const attribution = {
    name: 'Irham Bahtiar',
    username: 'bahtiarirham',
  }

  return (
    <>
      <Head>
        <title>All-Time WCTB Players Standings</title>
        <meta content={metaImage} property="og:image" />
        <meta content={metaImage} property="twitter:image" />
      </Head>

      <Main>
        <Header backgroundImage={headerBackgroundImage} segment="STANDINGS" title="All-Time Player Standings" />

        <main>
          <AllTimePlayerStandings data={playerTotalScores} />
        </main>
      </Main>

      <Footer attribution={attribution} />
    </>
  )
}
