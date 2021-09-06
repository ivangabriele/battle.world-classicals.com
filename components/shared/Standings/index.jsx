import classnames from 'classnames'
import PropTypes from 'prop-types'

import Row from './Row'

function Standings({ data, title }) {
  const sectionClassName = classnames('bg-dark pb-md-3', title ? 'pt-5 pt-md-6' : null)

  return (
    <>
      <section className={sectionClassName}>
        <div className="container justify-content-center py-2 py-md-0">
          {title && <h2 className="text-center text-light mb-5">{title}</h2>}

          <div className="container-md" role="table">
            <div role="rowgroup">
              <div className="row visually-hidden" role="row">
                <div className="col" role="columnheader">
                  Rank
                </div>
                <div className="col" role="columnheader">
                  Name
                </div>
                <div className="col" role="columnheader">
                  Total Score
                </div>
              </div>
            </div>
            <div role="rowgroup">{data.map(Row)}</div>
          </div>
        </div>
      </section>

      <style jsx>{`
        h2 {
          font-weight: 500;
        }
      `}</style>
    </>
  )
}

Standings.defaultProps = {
  title: null,
}

Standings.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string,
}

export default Standings
