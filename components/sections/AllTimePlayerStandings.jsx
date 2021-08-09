import Standings from '../shared/Standings'

export default function AllTimePlayerStandings({ data }) {
  const standingsData = data.map(({ username, result: [allTimeScore] }, index) => ({
    id: username,
    name: username,
    rank: index + 1,
    score: allTimeScore,
    url: `/player/${username}`,
  }))

  return (
    <>
      <section className="bg-dark py-5 py-md-6">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <h2 className="text-center text-light mb-5">All-Time WCTB Player Standings</h2>

            <Standings data={standingsData} />
          </div>
        </div>
      </section>
    </>
  )
}
