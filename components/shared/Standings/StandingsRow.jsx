import { useRouter } from 'next/router'
import numeral from 'numeral'
import { Fragment } from 'react'

import Spinner from '../../elements/Spinner'
import StandingsRowScore from './StandingsRowScore'

export default function StandingsRow(props, index) {
  const router = useRouter()

  const goToPath = (event, url) => {
    event.preventDefault()

    router.push(url)
  }

  if (props === null) {
    return (
      <>
        <tr key={index}>
          <th className="align-middle text-end" scope="row" style={{ width: '2rem' }}>
            {index + 1}
          </th>
          <td className="align-middle">
            <Spinner />
          </td>
        </tr>

        <style jsx>{`
          tr > th {
            max-width: 4rem;
            min-width: 4rem;
            width: 4rem;
          }
          tr > td:last-child {
            max-width: 7rem;
            min-width: 7rem;
            width: 7rem;
          }
        `}</style>
      </>
    )
  }

  const { id, name, rank, score, url } = props
  const key = `${id}-${score}`
  const formattedRank = numeral(rank).format('0,0')
  const formattedScore = numeral(score).format('0,0')

  return (
    <Fragment key={key}>
      <tr onClick={event => goToPath(event, url)}>
        <th className="align-middle text-end" scope="row">
          <StandingsRowScore value={formattedRank} />
        </th>
        <td className="align-middle" style={{ paddingTop: '0.875rem' }}>
          <a href={url}>{name}</a>
        </td>
        <td className="align-middle text-end">
          <StandingsRowScore value={formattedScore} />
        </td>
      </tr>

      <style jsx>{`
        tr {
          cursor: pointer;
        }
        tr:hover * {
          color: yellow !important;
        }

        tr > th {
          max-width: 4rem;
          min-width: 4rem;
          width: 4rem;
        }
        tr > td:last-child {
          max-width: 7rem;
          min-width: 7rem;
          width: 7rem;
        }
      `}</style>
    </Fragment>
  )
}
