import { useRouter } from 'next/router'
import numeral from 'numeral'

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
          tr {
            font-size: 125%;
          }
        `}</style>
      </>
    )
  }

  const { id, name, rank, score, url } = props
  const key = `${id}-${score}`
  const formattedScore = numeral(score).format('0,0')

  return (
    <>
      <tr key={key} onClick={event => goToPath(event, url)}>
        <th className="align-middle text-end" scope="row" style={{ width: '2rem' }}>
          {rank}
        </th>
        <td className="align-middle">
          <a href={url}>{name}</a>
        </td>
        <td className="align-middle text-end" style={{ minWidth: '5rem' }}>
          <StandingsRowScore value={formattedScore} />
        </td>
      </tr>

      <style jsx>{`
        tr {
          cursor: pointer;
          font-size: 125%;
        }
        tr:hover * {
          color: yellow !important;
        }
      `}</style>
    </>
  )
}
