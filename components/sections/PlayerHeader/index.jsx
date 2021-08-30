import Coalesce from '@reactnimations/coalesce'
import { useRef } from 'react'
import css from 'styled-jsx/css'

import EntityHeader from '../../shared/EntityHeader'

const CoalesceStyle = css.resolve`
  canvas {
    position: absolute;
  }
`

export default function PlayerHeader({ name }) {
  const sectionRef = useRef(null)

  return (
    <>
      <section ref={sectionRef} className="bg-dark bg-size-cover overflow-hidden hero">
        <Coalesce
          baseRef={sectionRef}
          className={CoalesceStyle.className}
          settings={{
            backgroundColor: '#121117',
            baseHue: 255,
            baseSpeed: 0.05,
            opacity: 0.3,
          }}
        />

        <div className="container-fluid">
          <EntityHeader.Placeholder />
          <EntityHeader.Box>
            <EntityHeader.Segment>PLAYER</EntityHeader.Segment>
            <EntityHeader.Title>{name}</EntityHeader.Title>
          </EntityHeader.Box>
        </div>
      </section>

      {CoalesceStyle.styles}
      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </>
  )
}
