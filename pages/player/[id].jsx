import { promises as fs } from 'fs'
import Head from 'next/head'
import numeral from 'numeral'
import path from 'path'
import * as R from 'ramda'

import Navbar from '../../components/layouts/Navbar'
import PlayerHeader from '../../components/sections/PlayerHeader'
import Results from '../../components/shared/Result'
import lichessTournaments from '../../data/lichess/tournaments.json'
import playerUsernames from '../../data/playerUsernames.json'

const getMetaDescription = ({ player, playerLegacy }) => {
  const allTimeScore = numeral(player.scores[0]).format('0,0')
  const tournamentsCount = player.scores[1].filter(score => score !== 0).length
  const medianPerformance = numeral(R.median(player.performances[1])).format('0,0')

  return `${
    `${playerLegacy.title} ${playerLegacy.username} has scored a total of ${allTimeScore} points ` +
    `during ${tournamentsCount} Weekly World Classicals Team Battles, `
  }${`with a median performance of ${medianPerformance}.`.trim()}`
}

export default function IndexPage({ data: { player, playerLegacy, tournamentResults } }) {
  const metaDescription = getMetaDescription({ player, playerLegacy })

  return (
    <>
      <Head>
        <title>Player: {playerLegacy.username} ● World Classicals Team Battle</title>
        <meta content={metaDescription} name="description" />
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <PlayerHeader name={playerLegacy.username} />
        <Results data={tournamentResults} emoji="⚔️" title="Tournaments Results" />
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context

  const playerPath = path.join(process.cwd(), `data/players/${id}.json`)
  const playerSource = await fs.readFile(playerPath, 'utf-8')
  const player = JSON.parse(playerSource)

  const playerLegacyPath = path.join(process.cwd(), `data/lichess/players/${id}.json`)
  const playerLegacySource = await fs.readFile(playerLegacyPath, 'utf-8')
  const playerLegacy = JSON.parse(playerLegacySource)

  const tournamentResults = player.scores[1]
    .map((_, index) => ({
      name: lichessTournaments[index].fullName,
      performance: player.performances[1][index],
      rank: player.ranks[1][index],
      score: player.scores[1][index],
    }))
    .reverse()

  return {
    props: {
      data: {
        player,
        playerLegacy,
        tournamentResults,
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
