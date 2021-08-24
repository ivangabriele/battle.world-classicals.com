import Coalesce from '@reactnimations/coalesce'
import { useRef } from 'react'
import css from 'styled-jsx/css'

const CoalesceStyle = css.resolve`
  canvas {
    position: absolute;
  }
`

export default function TeamHeader({ name }) {
  const sectionRef = useRef(null)

  return (
    <>
      <section ref={sectionRef} className="bg-dark bg-size-cover overflow-hidden hero">
        <Coalesce
          baseRef={sectionRef}
          className={CoalesceStyle.className}
          settings={{
            backgroundColor: '#121117',
            baseHue: 100,
            baseSpeed: 0.05,
            opacity: 0.3,
            rangeSpeed: 0.5,
          }}
        />

        <div className="container position-relative zindex-5">
          <div className="d-flex justify-content-center align-items-center pb-6 pt-6">
            <span aria-hidden="true">&nbsp;</span>
          </div>
          <div className="position-absolute d-flex justify-content-center align-items-center test">
            <h1>{name.replace(/H/gi, 'H')}</h1>
          </div>
        </div>
      </section>

      {CoalesceStyle.styles}
      <style jsx>{`
        .test {
          height: 100%;
          top: 0;
          width: 100%;
        }
        span {
          display: block;
          font-size: 300%;
        }
        h1 {
          /*animation: h1 2s ease-out 0s;*/
          color: white;
          font-weight: 400;
          font-size: 250%;
          letter-spacing: 0.25rem;
          margin-bottom: 0;
          max-width: 80%;
          opacity: 1;
          text-align: center;
          text-transform: uppercase;
        }

        @keyframes h1 {
          0% {
            filter: blur(0.125rem);
            font-size: 200%;
          }
          100% {
            filter: blur(0);
            font-size: 300%;
          }
        }
      `}</style>
    </>
  )
}
