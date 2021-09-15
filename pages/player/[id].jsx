import { promises as fs } from 'fs'
import Head from 'next/head'
import numeral from 'numeral'
import path from 'path'
import * as R from 'ramda'

import Main from '../../components/layouts/Main'
import PlayerHeader from '../../components/sections/PlayerHeader'
import PlayerPowerBar from '../../components/sections/PlayerPowerBar'
import Results from '../../components/shared/Result'
import playerUsernames from '../../data/playerUsernames.json'

const getMetaDescription = player => {
  const allTimeScore = numeral(player.scores[0]).format('0,0')
  const tournamentsCount = player.scores[1].filter(score => score > 0).length
  const medianPerformance = numeral(R.median(player.performances[1])).format('0,0')

  return (
    `${player.title} ${player.username} has scored a total of ${allTimeScore} points ` +
    `in ${tournamentsCount} Weekly World Classicals Team Battles, ` +
    `with a median performance of ${medianPerformance}.`
  ).trim()
}

export default function PlayerPage({ data: { player } }) {
  const metaDescription = getMetaDescription(player)

  return (
    <>
      <Head>
        <title>WCTB Player: {player.username}</title>
        <meta content={metaDescription} name="description" />
      </Head>

      <Main>
        <PlayerHeader name={player.username} />

        <main>
          <PlayerPowerBar
            bersekRate={player.bersekRates[0]}
            gameCount={player.gameCounts[0]}
            opponentRating={player.opponentRatings[0]}
            winRate={player.winRates[0]}
          />

          <Results ranks={player.ranks[1]} scores={player.scores[1]} title="Team Battle Results" />
        </main>
      </Main>
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

  return {
    props: {
      data: {
        player,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = playerUsernames.map(username => ({
    params: { id: username },
  }))

  return { fallback: false, paths }
}
