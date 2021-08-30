import Coalesce from '@reactnimations/coalesce'
import { useRef } from 'react'
import css from 'styled-jsx/css'

import normalizeTeamName from '../../../libs/helpers/normalizeTeamName'
import EntityHeader from '../../shared/EntityHeader'

const CoalesceStyle = css.resolve`
  canvas {
    position: absolute;
  }
`

export default function TeamHeader({ name }) {
  const headerRef = useRef(null)

  const normalizedName = normalizeTeamName(name)

  return (
    <>
      <header ref={headerRef} className="bg-dark bg-size-cover overflow-hidden hero">
        <Coalesce
          baseRef={headerRef}
          className={CoalesceStyle.className}
          settings={{
            backgroundColor: '#121117',
            baseHue: 100,
            baseSpeed: 0.05,
            opacity: 0.3,
            rangeSpeed: 0.5,
          }}
        />

        <div className="container-fluid">
          <EntityHeader.Placeholder />
          <EntityHeader.Box>
            <EntityHeader.Segment>TEAM</EntityHeader.Segment>
            <EntityHeader.Title>{normalizedName}</EntityHeader.Title>
          </EntityHeader.Box>
        </div>
      </header>

      {CoalesceStyle.styles}
      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </>
  )
}
