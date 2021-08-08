import generateKey from '../libs/helpers/generateKey'
import Spinner from './elements/Spinner'

function StandingsRow(standing) {
  const { id, name, rank, score } = standing
  const key = `${id}-${score}`

  return (
    <tr key={key}>
      <th className="text-end" scope="row" style={{ width: '2rem' }}>
        {rank}
      </th>
      <td>{name}</td>
      <td className="text-end" style={{ width: '2rem' }}>
        {score}
      </td>
    </tr>
  )
}

export default function Standings({ data }) {
  if (data.length === 0) {
    const loadingData = new Array(10)
    loadingData.fill(
      {
        id: generateKey(),
        name: <Spinner />,
        score: '-',
      },
      0,
      10,
    )

    return (
      <div key={generateKey()} className="table-responsive">
        <table className="table table-dark">
          <tbody>{loadingData.map((dataRow, index) => ({ ...dataRow, rank: index + 1 })).map(StandingsRow)}</tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <tbody>{data.map(StandingsRow)}</tbody>
      </table>
    </div>
  )
}
