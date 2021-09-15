import { MatomoProvider, createInstance, useMatomo } from '@datapunt/matomo-tracker-react'
import { useEffect } from 'react'

function TrackedComponent({ Component, ...pageProps }) {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView()
  })

  return <Component {...pageProps} />
}

export default function withMatomo(Component) {
  const instance = createInstance({
    configurations: {
      disableCookies: true,
      enableLinkTracking: true,
      setRequestMethod: 'POST',
      setSecureCookie: true,
    },
    disabled: false,
    heartBeat: {
      active: true,
      seconds: 5,
    },
    linkTracking: true,
    siteId: 1,
    urlBase: 'https://matomo.world-classicals.com',
  })

  return pageProps => (
    <MatomoProvider value={instance}>
      <TrackedComponent Component={Component} {...pageProps} />
    </MatomoProvider>
  )
}
