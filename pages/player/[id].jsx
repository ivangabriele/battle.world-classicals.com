import { promises as fs } from 'fs'
import Head from 'next/head'
import numeral from 'numeral'
import path from 'path'
import * as R from 'ramda'

import Navbar from '../../components/layouts/Navbar'
import TeamHeader from '../../components/sections/TeamHeader'
import Results from '../../components/shared/Result'
import lichessTournaments from '../../data/lichess/tournaments.json'
import playerResults from '../../data/playerResults.json'
import playerUsernames from '../../data/playerUsernames.json'

const getMetaDescription = ({ fullResults, player }) => {
  const allTimeScore = numeral(fullResults.scores[0]).format('0,0')
  const tournamentsCount = fullResults.scores[1].filter(score => score !== 0).length
  const medianPerformance = numeral(R.median(fullResults.performances[1])).format('0,0')

  return `${
    `${player.title} ${player.username} has scored a total of ${allTimeScore} points ` +
    `during ${tournamentsCount} Weekly World Classical Team Battles, `
  }${`with a median performance of ${medianPerformance}.`.trim()}`
}

export default function IndexPage({ data: { fullResults, player, results } }) {
  const metaDescription = getMetaDescription({ fullResults, player })

  return (
    <>
      <Head>
        <title>{player.username} ● World Classical Team Battle</title>
        <meta content={metaDescription} name="description" />
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <TeamHeader name={player.username} />
        <Results emoji="⚔️" results={results} title="Tournaments Results" />
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context

  const playerDataPath = path.join(process.cwd(), `data/lichess/players/${id}.json`)
  const playerDataSource = await fs.readFile(playerDataPath, 'utf-8')
  const playerData = JSON.parse(playerDataSource)

  const playerResult = playerResults.find(({ username: _username }) => _username === id)
  const resultsData = playerResult.scores[1].map((_, index) => ({
    name: lichessTournaments[index].fullName,
    performance: playerResult.performances[1][index],
    rank: playerResult.ranks[1][index],
    score: playerResult.scores[1][index],
  }))

  return {
    props: {
      data: {
        fullResults: playerResult,
        player: playerData,
        results: resultsData,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = playerUsernames.map(username => ({
    params: { id: username },
  }))

  return { fallback: 'blocking', paths }
}
