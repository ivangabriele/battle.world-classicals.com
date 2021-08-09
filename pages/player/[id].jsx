import { promises as fs } from 'fs'
import Head from 'next/head'
import path from 'path'

import Navbar from '../../components/layouts/Navbar'
import TeamHeader from '../../components/sections/TeamHeader'
import Results from '../../components/shared/Result'
import lichessTournaments from '../../data/lichess/tournaments.json'
import playerResults from '../../data/playerResults.json'
import playerUsernames from '../../data/playerUsernames.json'

export default function IndexPage({ data: { player, results } }) {
  return (
    <>
      <Head>
        <title>{player.username} ● World Classical Team Battle</title>
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
