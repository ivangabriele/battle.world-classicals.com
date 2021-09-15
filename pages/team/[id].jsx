import { promises as fs } from 'fs'
import Head from 'next/head'
import numeral from 'numeral'
import path from 'path'

import Main from '../../components/layouts/Main'
import TeamHeader from '../../components/sections/TeamHeader'
import TeamPowerBar from '../../components/sections/TeamPowerBar'
import Results from '../../components/shared/Result'
import Standings from '../../components/shared/Standings'
import teamIds from '../../data/teamIds.json'

const getMetaDescription = team => {
  const allTimeScore = numeral(team.scores[0]).format('0,0')
  const tournamentsCount = team.scores[1].filter(score => score > 0).length

  return `${
    `${team.name} has scored a total of ${allTimeScore} points ` +
    `in ${tournamentsCount} Weekly World Classicals Team Battles.`
  }`
}

export default function TeamPage({ data: { team } }) {
  const metaDescription = getMetaDescription(team)
  const memberStandings = team.players.map(({ scores: [totalScore], username }, index) => ({
    id: username,
    name: username,
    rank: index + 1,
    score: totalScore,
    url: `/player/${username}`,
  }))

  return (
    <>
      <Head>
        <title>WCTB Team: {team.name}</title>
        <meta content={metaDescription} name="description" />
      </Head>

      <Main>
        <TeamHeader name={team.name} ranks={team.ranks[1]} />

        <main>
          <TeamPowerBar
            bersekRate={team.bersekRates[0]}
            gameCount={team.gameCounts[0]}
            memberRating={team.memberRatings[0]}
            winRate={team.winRates[0]}
          />

          <Results ranks={team.ranks[1]} scores={team.scores[1]} title="Team Battle Results" />
          <Standings data={memberStandings} title="Member Standings" />
        </main>
      </Main>
    </>
  )
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context

  const teamPath = path.join(process.cwd(), `data/teams/${id}.json`)
  const teamSource = await fs.readFile(teamPath, 'utf-8')
  const team = JSON.parse(teamSource)

  return {
    props: {
      data: {
        team,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = teamIds.map(id => ({
    params: { id },
  }))

  return { fallback: false, paths }
}
