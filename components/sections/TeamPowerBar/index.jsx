import numeral from 'numeral'

import PowerBar from '../../shared/PowerBar'

export default function TeamPowerBar({ bersekRate, gameCount, memberRating, winRate }) {
  const formattedBerseckRate = `${bersekRate}%`
  const formattedMemberRating = numeral(memberRating).format('0,0')
  const formattedWinRate = `${winRate}%`

  return (
    <>
      <PowerBar>
        <PowerBar.Box title="Attributes">
          <PowerBar.Performance>
            <PowerBar.Level description="Feature coming soon!" label="Power" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Strength" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Solidarity" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Constancy" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Loyalty" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Influence" level={0} />
          </PowerBar.Performance>
        </PowerBar.Box>
        <PowerBar.Separator />
        <PowerBar.Box title="Statistics">
          <PowerBar.Data>
            <PowerBar.Figure icon="chessboard" label="Total Games Count" value={gameCount} />
            <PowerBar.Figure icon="trophy-cup" label="Average Win Rate" value={formattedWinRate} />
            <PowerBar.Figure icon="level-end-flag" label="Average Members Rating" value={formattedMemberRating} />
            <PowerBar.Figure icon="serrated-slash" label="Average Berseck Rate" value={formattedBerseckRate} />
          </PowerBar.Data>
        </PowerBar.Box>
      </PowerBar>
    </>
  )
}
