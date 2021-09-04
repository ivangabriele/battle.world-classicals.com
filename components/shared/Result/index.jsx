import PropTypes from 'prop-types'

import ResultsRow from './ResultsRow'

const conciliateData = ({ ranks, scores }) =>
  scores.map((score, index) => ({
    rank: ranks[index],
    score,
  }))

function Results({ ranks, scores, title }) {
  const data = conciliateData({ ranks, scores })

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
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>{data.map(ResultsRow).reverse()}</tbody>
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
  ranks: PropTypes.arrayOf(PropTypes.number).isRequired,
  scores: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
}

export default Results
