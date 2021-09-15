import Head from 'next/head'

import Main from '../../components/layouts/Main'
import AllTimeTeamStandings from '../../components/sections/AllTimeTeamStandings'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import teamTotalScores from '../../data/teamTotalScores.json'

export default function IndexPage() {
  const metaImage = 'https://battle.world-classicals.com/headers/all-time-players.jpg'

  const backgroundImagePath = '/headers/all-time-teams.jpg'

  const attribution = {
    name: 'Hasan Almasi',
    username: 'hasanalmasi',
  }

  return (
    <>
      <Head>
        <title>All-Time WCTB Teams Standings</title>
        <meta content={metaImage} property="og:image" />
        <meta content={metaImage} property="twitter:image" />
      </Head>

      <Main>
        <Header backgroundImagePath={backgroundImagePath} segment="STANDINGS" title="All-Time Team Standings" />

        <main>
          <AllTimeTeamStandings data={teamTotalScores} />
        </main>
      </Main>

      <Footer attribution={attribution} />
    </>
  )
}
