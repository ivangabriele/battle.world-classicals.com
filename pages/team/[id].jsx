import Head from 'next/head'

import Navbar from '../../components/layouts/Navbar'
import TeamHeader from '../../components/sections/TeamHeader'
import Results from '../../components/shared/Result'
import lichessTeams from '../../data/lichess/teams.json'
import lichessTournaments from '../../data/lichess/tournaments.json'
import teamIds from '../../data/teamIds.json'
import teamResults from '../../data/teamResults.json'

export default function IndexPage({ data: { results, team } }) {
  return (
    <>
      <Head>
        <title>{team.name} ● World Classical Team Battle</title>
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <TeamHeader name={team.name} />
        <Results emoji="⚔️" results={results} title="Tournaments Results" />
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context

  const teamData = lichessTeams.find(({ id: _id }) => _id === id)
  const teamResult = teamResults.find(({ id: _id }) => _id === id)
  const resultsData = teamResult.scores[1].map((_, index) => ({
    name: lichessTournaments[index].fullName,
    rank: teamResult.ranks[1][index],
    score: teamResult.scores[1][index],
  }))

  return {
    props: {
      data: {
        results: resultsData,
        team: teamData,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = teamIds.map(id => ({
    params: { id },
  }))

  return { fallback: 'blocking', paths }
}
