import PropTypes from 'prop-types'

const ATTRIBUTION_URL_QUERY_STRING = new URLSearchParams([
  ['utm_source', 'battle.world-classicals.com'],
  ['utm_medium', 'referral'],
]).toString()
const UNSPLASH_URL = `https://unsplash.com/?${ATTRIBUTION_URL_QUERY_STRING}`

const getAttributionUrl = username => `https://unsplash.com/@${username}?${ATTRIBUTION_URL_QUERY_STRING}`

function Footer({ attribution }) {
  const hasAttribution = attribution !== null

  return (
    <>
      <footer>
        <div>
          <p>
            All World Classicals Team Battle website content is licensed under a{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution-ShareAlike 4.0 International License
            </a>
            . Our source code — available on{' '}
            <a href="https://github.com/ivangabriele/battle.world-classicals.com">Github</a> — is licensed under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">AGPL v3.0 or later</a>. We <strong>only</strong>{' '}
            collect anonymous statistics within <a href="https://matomo.org">Matomo</a>. We <strong>only</strong> use
            functionnality cookies, as per <a href="https://gdpr.eu/cookies/">European Union GDPR definition</a>.
          </p>
        </div>
        <div>
          {hasAttribution && (
            <p>
              Header photography by <a href={getAttributionUrl(attribution.username)}>{attribution.name}</a> on{' '}
              <a href={UNSPLASH_URL}>Unsplash</a>.
            </p>
          )}
        </div>
      </footer>

      <style jsx>{`
        footer {
          background-color: black;
          display: flex;
          flex-direction: column-reverse;
          font-family: var(--font-content);
          padding: 2rem;
        }
        @media (min-width: 768px) {
          footer {
            flex-direction: row;
          }
        }

        @media (min-width: 768px) {
          div {
            max-width: 50%;
            min-width: 50%;
          }
        }

        p {
          font-size: 13px;
          margin: 0;
          line-height: 1.5;
        }
        footer > div:last-child > p {
          margin: 0 0 1rem 0;
        }
        @media (min-width: 768px) {
          footer > div:last-child > p {
            padding: 0 0 0 0;
            text-align: right;
          }
        }
      `}</style>
    </>
  )
}

Footer.defaultProps = {
  attribution: null,
}

Footer.propTypes = {
  attribution: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
  }),
}

export default Footer
