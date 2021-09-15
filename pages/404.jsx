import Head from 'next/head'
import PropTypes from 'prop-types'

import Main from '../components/layouts/Main'
import Header from '../components/sections/Header'

function NotFoundPage({ message, title }) {
  const metaTitle = `${title} • World Classicals Team Battle`

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta content={message} name="description" />
      </Head>

      <Main>
        <Header segment="ERROR" title={title} />
      </Main>
    </>
  )
}

NotFoundPage.defaultProps = {
  message: `Sorry but this page doesn't exist (anymore).`,
  title: 'Page Not Found',
}

NotFoundPage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
}

export default NotFoundPage
