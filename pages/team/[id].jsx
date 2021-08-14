import Head from 'next/head'
import numeral from 'numeral'

import Navbar from '../../components/layouts/Navbar'
import TeamHeader from '../../components/sections/TeamHeader'
import Results from '../../components/shared/Result'
import lichessTeams from '../../data/lichess/teams.json'
import lichessTournaments from '../../data/lichess/tournaments.json'
import teamIds from '../../data/teamIds.json'
import teamResults from '../../data/teamResults.json'

const getMetaDescription = ({ fullResults, team }) => {
  const allTimeScore = numeral(fullResults.scores[0]).format('0,0')
  const tournamentsCount = fullResults.scores[1].filter(score => score !== 0).length

  return `${
    `${team.name} has scored a total of ${allTimeScore} points ` +
    `during ${tournamentsCount} Weekly World Classical Team Battles.`
  }`
}

export default function IndexPage({ data: { fullResults, results, team } }) {
  const metaDescription = getMetaDescription({ fullResults, team })

  return (
    <>
      <Head>
        <title>{team.name} ● World Classical Team Battle</title>
        <meta content={metaDescription} name="description" />
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
  const descendingResultsData = resultsData.reverse()

  return {
    props: {
      data: {
        fullResults: teamResult,
        results: descendingResultsData,
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
