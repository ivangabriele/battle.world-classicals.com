import PropTypes from 'prop-types'

import generateKey from '../../../libs/helpers/generateKey'
import StandingsRow from './StandingsRow'

function Standings({ standings, title }) {
  if (standings.length === 0) {
    const placeholderData = new Array(10)
    placeholderData.fill(null, 0, 10)

    return (
      <div key={generateKey()} className="table-responsive">
        <table className="table table-dark">
          <tbody>{placeholderData.map(StandingsRow)}</tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <section className="bg-dark pt-5 pt-md-6 pb-md-3">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <h2 className="text-center text-light mb-5">{title}</h2>

            <div className="table-responsive">
              <table className="table table-dark">
                <tbody>{standings.map(StandingsRow)}</tbody>
              </table>
            </div>
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

Standings.propTypes = {
  standings: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default Standings
