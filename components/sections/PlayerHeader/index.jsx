import Pipeline from '@reactnimations/pipeline'
import { useRef } from 'react'
import css from 'styled-jsx/css'

import EntityHeader from '../../shared/EntityHeader'

const PipelineStyle = css.resolve`
  canvas {
    opacity: 0.1;
    position: absolute;
  }
`

export default function PlayerHeader({ name }) {
  const headerRef = useRef(null)

  return (
    <>
      <section ref={headerRef} className="bg-dark bg-size-cover overflow-hidden hero">
        <Pipeline
          baseRef={headerRef}
          className={PipelineStyle.className}
          settings={{
            backgroundColor: '#121117',
            baseHue: 0,
            baseSpeed: 2,
            baseWidth: 400,
            rangeHue: 50,
            rangeSpeed: 8,
            rangeWidth: 200,
            turnChanceRange: 100,
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

      {PipelineStyle.styles}
      <style jsx>{`
        * {
          user-select: none;
        }

        div {
          position: relative;
        }
      `}</style>
    </>
  )
}
