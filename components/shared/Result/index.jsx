import PropTypes from 'prop-types'

import ResultsRow from './ResultsRow'

function Results({ data, title }) {
  const withPerformance = data.length > 0 && data[0].performance !== undefined

  return (
    <>
      <section className="bg-dark pt-5 pt-md-6 pb-md-3">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <h2 className="text-center text-light mb-5">{title}</h2>

            <div className="table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    {withPerformance && <th>Perf</th>}
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>{data.map(ResultsRow)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        h2 {
          font-weight: 500;
        }

        tr > th:not(:first-child) {
          max-width: 7rem;
          min-width: 7rem;
          width: 7rem;
        }
      `}</style>
    </>
  )
}

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      performance: PropTypes.number,
      rank: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
  emoji: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Results
