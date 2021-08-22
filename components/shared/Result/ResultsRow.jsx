import numeral from 'numeral'
import { Fragment } from 'react'

import ResultsRowNumber from './ResultsRowNumber'

export default function ResultsRow({ name, performance, rank, score }, index) {
  const withPerformance = performance !== undefined
  const key = `${index}-${score}`
  const formattedRank = rank !== null ? numeral(rank).format('0,0') : '-'
  // eslint-disable-next-line no-nested-ternary
  const formattedPerformance = withPerformance ? (performance !== null ? numeral(performance).format('0,0') : '-') : '-'
  const formattedScore = score !== null ? numeral(score).format('0,0') : '-'

  return (
    <Fragment key={key}>
      <tr>
        <td className="align-middle">{name}</td>
        <td className="align-middle text-end">
          <ResultsRowNumber value={formattedRank} />
        </td>
        {withPerformance && (
          <td className="align-middle text-end">
            <ResultsRowNumber value={formattedPerformance} />
          </td>
        )}
        <td className="align-middle text-end">
          <ResultsRowNumber value={formattedScore} />
        </td>
      </tr>
    </Fragment>
  )
}
