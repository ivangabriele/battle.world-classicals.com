import { promises as fs } from 'fs'
import Head from 'next/head'
import numeral from 'numeral'
import path from 'path'

import Navbar from '../../components/layouts/Navbar'
import TeamHeader from '../../components/sections/TeamHeader'
import Results from '../../components/shared/Result'
import Standings from '../../components/shared/Standings'
import lichessTeams from '../../data/lichess/teams.json'
import lichessTournaments from '../../data/lichess/tournaments.json'
import teamIds from '../../data/teamIds.json'

const getMetaDescription = ({ team, teamLegacy }) => {
  const allTimeScore = numeral(team.scores[0]).format('0,0')
  const tournamentsCount = team.scores[1].filter(score => score !== 0).length

  return `${
    `${teamLegacy.name} has scored a total of ${allTimeScore} points ` +
    `during ${tournamentsCount} Weekly World Classicals Team Battles.`
  }`
}

export default function IndexPage({ data: { team, teamLegacy, tournamentResults } }) {
  const metaDescription = getMetaDescription({ team, teamLegacy })
  const playerStandings = team.players.map(({ scores: [totalScore], username }, index) => ({
    id: username,
    name: username,
    rank: index + 1,
    score: totalScore,
    url: `/player/${username}`,
  }))

  return (
    <>
      <Head>
        <title>{teamLegacy.name} ● World Classicals Team Battle</title>
        <meta content={metaDescription} name="description" />
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <TeamHeader name={teamLegacy.name} />
        <Results data={tournamentResults} emoji="⚔️" title="Tournaments Results" />
        <Standings data={playerStandings} emoji="⚔️" title="Players Standings" />
      </main>
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

  const teamLegacy = lichessTeams.find(({ id: _id }) => _id === id)

  const tournamentResults = team.scores[1]
    .map((_, index) => ({
      name: lichessTournaments[index].fullName,
      rank: team.ranks[1][index],
      score: team.scores[1][index],
    }))
    .reverse()

  return {
    props: {
      data: {
        team,
        teamLegacy,
        tournamentResults,
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
