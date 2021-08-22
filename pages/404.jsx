import Head from 'next/head'
import PropTypes from 'prop-types'

import Navbar from '../components/layouts/Navbar'

function NotFoundPage({ message }) {
  return (
    <>
      <Head>
        <title>Not Found ● World Classicals Team Battle</title>
        <meta
          content={
            `The Weekly World Classicals Team Battle has become the biggest Classical Chess Team Battle ever on ` +
            `Lichess. Gathering more than 100 teams, we are working hard towards the next goals to make it even more ` +
            `fun and succesful.`
          }
          name="description"
        />
      </Head>

      <main className="page-wrapper">
        <Navbar />

        <section className="bg-dark bg-size-cover overflow-hidden pt-5 pt-md-6 pt-lg-7 pb-5">
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="d-inline-flex display-5 mb-5 text-light">{message}</h1>
          </div>
        </section>

        <style jsx>{`
          section {
            /*background-image: url('/photos/hero.png');
            background-position: 0 10%;*/
          }

          h1 {
            /*text-shadow: 0 0 3rem yellow;*/
          }
        `}</style>
      </main>
    </>
  )
}

NotFoundPage.defaultProps = {
  message: 'Not Found',
}

NotFoundPage.propTypes = {
  message: PropTypes.string,
}

export default NotFoundPage
