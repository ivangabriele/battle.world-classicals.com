import Head from 'next/head'

import '../assets/around/css/theme.min.css'

export default function WwctbApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-decorative-400.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-decorative-700.woff2" rel="preload" />
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>

      <Component {...pageProps} />

      <style global jsx>{`
        @font-face {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(/fonts/cinzel-decorative-400.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
            U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(/fonts/cinzel-decorative-700.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
            U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Cinzel Decorative';
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src: url(/fonts/cinzel-decorative-900.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
            U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        body {
          background-color: #121117 !important;
          font-family: 'Cinzel Decorative', cursive;
        }

        .bg-dark {
          background-color: #121117 !important;
        }
        .table-dark {
          --bs-table-bg: #121117;
        }
      `}</style>
    </>
  )
}
