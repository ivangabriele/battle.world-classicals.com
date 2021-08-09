import PropTypes from 'prop-types'

import generateKey from '../../../libs/helpers/generateKey'
import StandingsRow from './StandingsRow'

function Standings({ data }) {
  if (data.length === 0) {
    const data = new Array(10)
    data.fill(null, 0, 10)

    return (
      <div key={generateKey()} className="table-responsive">
        <table className="table table-dark">
          <tbody>{data.map(StandingsRow)}</tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>{data.map(StandingsRow)}</tbody>
        </table>
      </div>
    </>
  )
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
}

export default Standings
