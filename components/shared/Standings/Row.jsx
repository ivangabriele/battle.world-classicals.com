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
      <div className="row row-custom" onClick={goToPath} role="row">
        <div className="col col-name">
          <div className="name-border">
            <div className="name">
              <Link href={url}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>{name}</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col col-number">
          <Number value={rank} />
        </div>
        <div className="col col-number">
          <Number value={score} />
        </div>
      </div>

      <style jsx>{`
        .row-custom {
          align-items: center;
          background-color: var(--background-lighter);
          border-bottom: solid 1px rgba(255, 255, 255, 0.05);
          border-left: solid 1px rgba(255, 255, 255, 0.05);
          border-right: solid 1px rgba(255, 255, 255, 0.05);
          color: white;
          cursor: pointer;
          font-size: 120%;
          min-width: 0;
        }
        .row-custom:hover {
          border-left: solid 5px yellow;
          color: yellow;
        }

        .col-name {
          display: flex;
          flex-grow: 1;
          padding: 0.25rem;
        }
        .col-number {
          flex-grow: 0;
          /*flex-shrink: 0;*/
        }

        .name-border {
          background-color: var(--background-light);
          clip-path: polygon(0 0, 100% 0, 480px 100%, 0 100%);
          height: 50px;
          position: relative;
          width: 500px;
        }
        .name {
          background-color: #0d1d31;
          /*background-image: url('/photos/andy-holmes-rCbdp8VCYhQ-unsplash.jpg');*/
          background-position: top center;
          background-size: cover;
          clip-path: polygon(0 0, 100% 0, 478px 100%, 0 100%);
          height: 48px;
          left: 1px;
          overflow: hidden;
          padding: 0.55rem 0.75rem 0.5rem 0.75rem;
          position: absolute;
          width: 498px;
          text-overflow: ellipsis;
          top: 1px;
          white-space: nowrap;
        }
        .row-custom:hover .name {
          background: radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%);
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </Fragment>
  )
}
