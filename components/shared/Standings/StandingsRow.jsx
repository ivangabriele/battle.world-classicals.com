import numeral from 'numeral'

import Spinner from '../../elements/Spinner'
import StandingsRowScore from './StandingsRowScore'

export default function StandingsRow(props, index) {
  if (props === null) {
    return (
      <tr key={index}>
        <th className="text-end" scope="row" style={{ width: '2rem' }}>
          {index + 1}
        </th>
        <td>
          <Spinner />
        </td>
      </tr>
    )
  }

  const { id, name, rank, score, url } = props
  const key = `${id}-${score}`
  const formattedScore = numeral(score).format('0,0')

  return (
    <tr key={key}>
      <th className="text-end" scope="row" style={{ width: '2rem' }}>
        {rank}
      </th>
      <td>
        <a href={url}>{name}</a>
      </td>
      <td className="text-end" style={{ minWidth: '5rem' }}>
        <StandingsRowScore value={formattedScore} />
      </td>
    </tr>
  )
}
