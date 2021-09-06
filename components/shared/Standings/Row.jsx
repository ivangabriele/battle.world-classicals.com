import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import Number from './Number'

export default function Row(props) {
  const router = useRouter()

  const { id, name, rank, score, url } = props

  const goToPath = event => {
    event.preventDefault()

    router.replace(url)
  }

  const key = `${id}-${score}`

  return (
    <Fragment key={key}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */}
      <div className="row" onClick={goToPath} role="row">
        <div className="col">
          <Number value={rank} />
        </div>
        <div className="col">
          <Link href={url}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>{name}</a>
          </Link>
        </div>
        <div className="col">
          <Number value={score} />
        </div>
      </div>

      <style jsx>{`
        .row {
          align-items: center;
          color: white;
          cursor: pointer;
          font-size: 120%;
          height: 3rem;
          min-width: 0;
        }
        .row:hover * {
          color: yellow !important;
        }

        .row > .col {
          display: flex;
          flex-grow: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .row > .col:first-child,
        .row > .col:last-child {
          flex-grow: 0;
          /*flex-shrink: 0;*/
          text-overflow: clip;
          overflow: visible;
        }
      `}</style>
    </Fragment>
  )
}
