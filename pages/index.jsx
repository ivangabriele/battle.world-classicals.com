import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Head from 'next/head'

import Navbar from '../components/layouts/Navbar'
import Countdown from '../components/sections/Countdown'
import Hero from '../components/sections/Hero'
import LiveTeamsStandings from '../components/sections/LiveTeamStandings'
import normalizeLichessTournamentsList from '../libs/helpers/normalizeLichessTournamentsList'

export default function IndexPage({ data }) {
  return (
    <>
      <Head>
        <link as="image" crossOrigin href="/logos/lichess.svg" rel="preload" />
        <title>World Classical Team Battle ♞ The Lichess Tournament for Classical Chess Lovers</title>
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <Hero tournamentData={data.tournament} />
        <Countdown hasStarted={data.hasStarted} tournamentData={data.tournament} />

        {data.hasStarted ? <LiveTeamsStandings tournamentId={data.tournament.id} /> : undefined}
      </main>
    </>
  )
}

async function getActiveTournamentBasicData() {
  const now = Number(moment().format('x'))
  const res = await fetch(`https://lichess.org/api/team/world-classicals/arena`)
  const rawData = await res.text()
  const worldClassicalsTeamArenas = normalizeLichessTournamentsList(rawData)
  const sortedActiveTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt >= now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))
  const activeTournament = sortedActiveTournaments[0]

  return activeTournament
}

export async function getServerSideProps() {
  const now = moment()
  const tournament = await getActiveTournamentBasicData()
  const hasStarted = tournament.startsAt <= Number(now.format('x'))

  return {
    props: {
      data: {
        hasStarted,
        tournament,
      },
    },
  }
}
