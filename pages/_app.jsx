import Head from 'next/head'

import '../assets/around/css/theme.min.css'

export default function WwctbApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>

      <Component {...pageProps} />

      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');

        body {
          font-family: 'Cinzel Decorative', cursive;
        }

        .bg-dark {
          background-color: #121117 !important;
        }
      `}</style>
    </>
  )
}
