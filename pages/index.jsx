import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Head from 'next/head'

import Countdown from '../components/Countdown'
import Hero from '../components/Hero'
import normalizeLichessTournamentsList from '../libs/helpers/normalizeLichessTournamentsList'

export default function IndexPage({ data }) {
  return (
    <>
      <Head>
        <title>World Classical Team Battle - The Lichess Tournament for Classical Chess Lovers</title>
      </Head>

      <main className="page-wrapper">
        <header className="header navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky">
          <div className="container px-0 px-xl-3">
            <button
              className="navbar-toggler ms-n2 me-2"
              data-bs-target="#primaryMenu"
              data-bs-toggle="offcanvas"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <a className="navbar-brand flex-shrink-0 order-lg-1 mx-auto ms-lg-0 pe-lg-2 me-lg-4" href="index.html">
              WCTB
            </a>
            <div className="offcanvas offcanvas-collapse order-lg-2" id="primaryMenu">
              <div className="offcanvas-header navbar-shadow">
                <h5 className="mt-1 mb-0">Menu</h5>
                <button aria-label="Close" className="btn-close lead" data-bs-dismiss="offcanvas" type="button" />
              </div>
            </div>
          </div>
        </header>

        <Hero tournamentData={data.tournament} />
        <Countdown tournamentData={data.tournament} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const now = Number(moment().format('x'))
  const res = await fetch(`https://lichess.org/api/team/world-classicals/arena`)
  const body = await res.text()
  const worldClassicalsTeamArenas = normalizeLichessTournamentsList(body)
  const sortedActiveTournaments = worldClassicalsTeamArenas
    .filter(({ fullName }) => fullName.endsWith(`Weekly World Classicals Team Battle`))
    .filter(({ finishesAt }) => finishesAt >= now)
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.startsAt < b.startsAt ? -1 : b.startsAt > a.startsAt ? 1 : 0))
  const activeTournament = sortedActiveTournaments[0]

  return {
    props: {
      data: {
        tournament: activeTournament,
      },
    },
  }
}
