import Head from 'next/head'

import Navbar from '../components/layouts/Navbar'
import PlayerHeader from '../components/sections/PlayerHeader'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>World Classical Team Battle ● The Lichess Tournament for Classical Chess Lovers</title>
        <meta
          content={
            `The Weekly World Classical Team Battle has become the biggest Classical Chess Team Battle ever on ` +
            `Lichess. Gathering more than 100 teams, we are working hard towards the next goals to make it even more ` +
            `fun and succesful.`
          }
          name="description"
        />
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <PlayerHeader />
      </main>
    </>
  )
}
