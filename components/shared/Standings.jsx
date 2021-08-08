import generateKey from '../../libs/helpers/generateKey'
import Spinner from '../elements/Spinner'

function StandingsRow({ data, index, isLoading }) {
  if (isLoading) {
    return (
      <tr key={generateKey()}>
        <th className="text-end" scope="row" style={{ width: '2rem' }}>
          {index + 1}
        </th>
        <td>
          <Spinner />
        </td>
      </tr>
    )
  }

  const { id, name, rank, score, url } = data
  const key = `${id}-${score}`

  return (
    <tr key={key}>
      <th className="text-end" scope="row" style={{ width: '2rem' }}>
        {rank}
      </th>
      <td>
        <a href={url} rel="noreferrer" target="_blank">
          {name}
        </a>
      </td>
      <td className="text-end" style={{ width: '2rem' }}>
        {score}
      </td>
    </tr>
  )
}

export default function Standings({ data }) {
  if (data.length === 0) {
    const data = new Array(10)
    data.fill(0, 0, 10)

    return (
      <div key={generateKey()} className="table-responsive">
        <table className="table table-dark">
          <tbody>
            {data.map((_, index) => (
              <StandingsRow index={index} isLoading />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            {data.map(dataRow => (
              <StandingsRow data={dataRow} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
