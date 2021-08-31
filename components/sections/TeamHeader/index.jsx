import Pipeline from '@reactnimations/pipeline'
import { useRef } from 'react'
import css from 'styled-jsx/css'

import generateKey from '../../../libs/helpers/generateKey'
import normalizeTeamName from '../../../libs/helpers/normalizeTeamName'
import EntityHeader from '../../shared/EntityHeader'
import { AWARD_TYPE } from '../../shared/EntityHeader/Award'

const PipelineStyle = css.resolve`
  canvas {
    opacity: 0.1;
    position: absolute;
  }
`

export default function TeamHeader({ data, name }) {
  const awards = [
    { count: data.filter(({ rank }) => rank === 1).length, type: AWARD_TYPE.FIRST },
    { count: data.filter(({ rank }) => rank === 2).length, type: AWARD_TYPE.SECOND },
    { count: data.filter(({ rank }) => rank === 3).length, type: AWARD_TYPE.THIRD },
  ]

  const headerRef = useRef(null)

  const normalizedName = normalizeTeamName(name)

  return (
    <>
      <header key={generateKey()} ref={headerRef} className="bg-dark bg-size-cover overflow-hidden hero">
        <Pipeline
          baseRef={headerRef}
          className={PipelineStyle.className}
          settings={{
            backgroundColor: '#121117',
            baseHue: 180,
            baseSpeed: 2,
            baseWidth: 400,
            rangeHue: 100,
            rangeSpeed: 8,
            rangeWidth: 200,
            turnChanceRange: 100,
          }}
        />

        <div className="container-fluid">
          <EntityHeader.Placeholder />
          <EntityHeader.Box>
            <EntityHeader.Segment>TEAM</EntityHeader.Segment>
            <EntityHeader.Title>{normalizedName}</EntityHeader.Title>
            <EntityHeader.Awards>
              {awards[0].count !== 0 && <EntityHeader.Award count={awards[0].count} type={AWARD_TYPE.FIRST} />}
              {awards[1].count !== 0 && <EntityHeader.Award count={awards[1].count} type={AWARD_TYPE.SECOND} />}
              {awards[2].count !== 0 && <EntityHeader.Award count={awards[2].count} type={AWARD_TYPE.THIRD} />}
            </EntityHeader.Awards>
          </EntityHeader.Box>
        </div>
      </header>

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
