import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Head from 'next/head'

import Navbar from '../components/layouts/Navbar'
import AllTimePlayerStandings from '../components/sections/AllTimePlayerStandings'
import AllTimeTeamStandings from '../components/sections/AllTimeTeamStandings'
import Countdown from '../components/sections/Countdown'
import Hero from '../components/sections/Hero'
import LiveTeamsStandings from '../components/sections/LiveTeamStandings'
import playerTotalScores from '../data/playerTotalScores.json'
import teamIdsNames from '../data/teamIdsNames.json'
import teamTotalScores from '../data/teamTotalScores.json'
import normalizeLichessTournamentsList from '../libs/helpers/normalizeLichessTournamentsList'

export default function IndexPage({ data }) {
  return (
    <>
      <Head>
        <title>World Classicals Team Battle</title>
        <meta
          content={
            `The World Classicals Team Battle is the biggest classical chess Team Battle on Lichess, ` +
            `gathering more than 100 teams and 700 players from all over the world, each Saturday at 12pm UTC.`
          }
          name="description"
        />
        <link as="image" crossOrigin href="/logos/lichess.svg" rel="preload" />
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <Hero tournamentData={data.tournament} />
        <Countdown hasStarted={data.hasStarted} tournamentData={data.tournament} />

        {data.hasStarted && <LiveTeamsStandings tournamentId={data.tournament.id} />}

        <AllTimeTeamStandings
          data={teamTotalScores.slice(0, 10)}
          teamIdsNames={teamIdsNames}
          title="Top 10 All-Time Teams"
        />
        <AllTimePlayerStandings data={playerTotalScores.slice(0, 10)} title="Top 10 All-Time Players" />
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
