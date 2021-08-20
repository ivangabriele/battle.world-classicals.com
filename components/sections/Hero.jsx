import moment from 'moment'
import { useEffect, useRef, useState } from 'react'

import HeroAnimation from '../animations/HeroAnimation'

export default function Hero({ tournamentData }) {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const todayAt1000 = moment().startOf('day').add(12, 'hours')
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    const $canvas = canvasRef.current
    const $section = sectionRef.current

    if (!process.browser || hasRendered || $canvas === null || $section === null) {
      return
    }

    setTimeout(() => {
      // eslint-disable-next-line no-new
      new HeroAnimation(window, $canvas, $section)
    }, 250)
    // const heroAnimation = new HeroAnimation(window, $canvas, $section)
    // window.addEventListener('resize', heroAnimation.init.bind(heroAnimation))

    setHasRendered(true)
  }, [hasRendered])

  return (
    <>
      <section ref={sectionRef} className="bg-dark bg-size-cover overflow-hidden hero">
        <canvas ref={canvasRef} />
        <div className="pt-5 pt-md-6 pt-lg-7 pb-5">
          <div className="container position-relative zindex-5 pt-2 pb-4 pb-md-2">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-7 col-md-8 text-center">
                <h1 className="display-4 text-light mb-1">World Classicals</h1>
                <h1 className="display-5 text-light mb-5">Team Battle</h1>
                <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                  <span className="text-light">{`Each Saturday at ${todayAt1000.format(
                    'ha',
                  )} (10am UTC), on Lichess.`}</span>
                </div>
                <div className="pt-2">
                  <a
                    className="btn btn-outline-light button-join"
                    href={`https://lichess.org/tournament/${tournamentData.id}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="icon-lichess me-3" />
                    Join the Battle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        canvas {
          position: absolute;
        }

        .button-join {
          animation: none !important;
          display: inline-flex;
          padding-top: 0.7rem;
          transition: none;
        }
        .button-join:active > .icon-lichess,
        .button-join:focus > .icon-lichess,
        .button-join:hover > .icon-lichess {
          background-image: url('/logos/lichess.svg');
        }

        .icon-lichess {
          background-image: url('/logos/lichess-white.svg');
          background-repeat: no-repeat;
          display: inline-block;
          height: 1.5rem;
          width: 1.5rem;
        }
      `}</style>
    </>
  )
}
