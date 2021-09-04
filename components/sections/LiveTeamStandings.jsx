import fetch from 'isomorphic-unfetch'
import { useEffect, useState } from 'react'

import cache from '../../libs/cache'
import Standings from '../shared/Standings'

async function getTeamName(teamId) {
  const res = await fetch(`https://lichess.org/api/team/${teamId}`)
  const data = await res.json()

  return data.name
}

async function getCurrentTeamsStandings(tournamentId) {
  const res = await fetch(`https://lichess.org/api/tournament/${tournamentId}`)
  const data = await res.json()
  const teamsStandings = data.teamStanding.map(({ id, name, rank, score }) => ({ id, name, rank, score }))

  let index = -1
  while (++index < 10) {
    const { id } = teamsStandings[index]

    teamsStandings[index].url = `/team/${id}`

    const teamsIdName = cache.get('teamIdToName')
    if (teamsIdName[id] !== undefined) {
      teamsStandings[index].name = teamsIdName[id]

      continue
    }

    const name = await getTeamName(teamsStandings[index].id)
    teamsStandings[index].name = name
    cache.set('teamIdToName', { ...teamsIdName, [id]: name })
  }

  return teamsStandings
}

export default function LiveTeamStandings({ tournamentId }) {
  if (process.browser && cache.get('teamIdToName') === undefined) {
    cache.set('teamIdToName', {})
  }

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [teamsStandings, setTeamsStandings] = useState([])

  useEffect(() => {
    async function updateTeamsStandings() {
      const teamsStanding = await getCurrentTeamsStandings(tournamentId)

      setTeamsStandings(teamsStanding)
    }

    setTimeout(updateTeamsStandings, !isFirstLoad ? 15000 : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId, teamsStandings])

  useEffect(() => {
    setIsFirstLoad(false)
  }, [])

  return <Standings data={teamsStandings} title="Live WCTB Teams Standings" />
}
