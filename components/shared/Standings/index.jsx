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
              <div className="row" role="row">
                <div className="col col-name" role="columnheader">
                  Name
                </div>
                <div className="col col-number" role="columnheader">
                  Rank
                </div>
                <div className="col col-number" role="columnheader">
                  Score
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

        .row {
          align-items: center;
          background-color: var(--background-lighter);
          border: solid 1px rgba(255, 255, 255, 0.05);
          height: 50px;
        }

        .col-name {
          display: flex;
          flex-grow: 1;
        }
        .col-number {
          flex-grow: 0;
          /*flex-shrink: 0;*/
          max-width: 87px;
          min-width: 87px;
          text-align: right;
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
