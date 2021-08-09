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
  const teamsStandings = data.teamStanding

  let index = -1
  while (++index < 10) {
    const { id } = teamsStandings[index]

    teamsStandings[index].url = `https://lichess.org/team/${id}`

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

  return (
    <>
      <section className="bg-dark py-5 py-md-6">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <h2 className="text-center text-light mb-5">Live WCTB Teams Standings</h2>

            <Standings data={teamsStandings} />
          </div>
        </div>
      </section>
    </>
  )
}
