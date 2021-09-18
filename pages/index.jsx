import Head from 'next/head'

import Main from '../components/layouts/Main'
import AllTimePlayerStandings from '../components/sections/AllTimePlayerStandings'
import AllTimeTeamStandings from '../components/sections/AllTimeTeamStandings'
import Countdown from '../components/sections/Countdown'
import Footer from '../components/sections/Footer'
import Hero from '../components/sections/Hero'
import playerTotalScores from '../data/playerTotalScores.json'
import teamTotalScores from '../data/teamTotalScores.json'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>World Classicals Team Battle</title>
        <meta
          content={
            `The biggest Classical Chess Team Battle on Lichess, gathering more than 150 teams and 700 players from` +
            `all over the world, each Saturday at 12pm UTC.`
          }
          name="description"
        />
        <link as="image" crossOrigin="anonymous" href="/logos/lichess.svg" rel="preload" />
      </Head>

      <Main>
        <Hero />
        <Countdown />

        <main>
          <AllTimeTeamStandings data={teamTotalScores.slice(0, 10)} title="Top 10 All-Time Teams" />
          <AllTimePlayerStandings data={playerTotalScores.slice(0, 10)} title="Top 10 All-Time Players" />
        </main>

        <Footer />
      </Main>
    </>
  )
}
