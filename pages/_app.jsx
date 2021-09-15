import Head from 'next/head'

import withMatomo from '../components/withMatomo'

import '../assets/around/css/theme.min.css'
import '../styles/fonts.css'
import '../styles/variables.css'
import '../styles/global.css'

const { NODE_ENV } = process.env

export default function WwctbApp({ Component, pageProps }) {
  const WrappedComponent = NODE_ENV === 'production' ? withMatomo(Component) : Component

  return (
    <>
      <Head>
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-400.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-500.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-700.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-decorative-400.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-decorative-700.woff2" rel="preload" />

        <meta content="initial-scale=1.0, width=device-width" name="viewport" />

        <meta content="World Classicals Team Battle" property="og:site_name" />

        <meta content="World Classicals Team Battle" property="twitter:site" />
      </Head>

      <WrappedComponent {...pageProps} />
    </>
  )
}
