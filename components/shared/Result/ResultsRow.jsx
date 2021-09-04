import numeral from 'numeral'
import ordinal from 'ordinal'
import { Fragment } from 'react'

import ResultsRowNumber from './ResultsRowNumber'

export default function ResultsRow({ rank, score }, index) {
  const key = `${index}-${score}`
  const name = `${ordinal(index + 1)} Weekly World Classical Team Battle`
  const formattedRank = rank !== null ? numeral(rank).format('0,0') : '-'
  const formattedScore = score !== null ? numeral(score).format('0,0') : '-'

  return (
    <Fragment key={key}>
      <tr>
        <td className="align-middle">{name}</td>
        <td className="align-middle text-end">
          <ResultsRowNumber value={formattedRank} />
        </td>
        <td className="align-middle text-end">
          <ResultsRowNumber value={formattedScore} />
        </td>
      </tr>
    </Fragment>
  )
}
