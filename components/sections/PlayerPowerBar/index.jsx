import numeral from 'numeral'

import PowerBar from '../../shared/PowerBar'

export default function PlayerPowerBar({ bersekRate, gameCount, opponentRating, winRate }) {
  const formattedBerseckRate = `${bersekRate}%`
  const formattedGameCount = numeral(gameCount).format('0,0')
  const formattedOpponentRating = numeral(opponentRating).format('0,0')
  const formattedWinRate = `${winRate}%`

  return (
    <>
      <PowerBar>
        <PowerBar.Box title="Performance">
          <PowerBar.Performance>
            <PowerBar.Level description="Feature coming soon!" label="Skill" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Fairplay" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Endurance" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Patience" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Balance" level={0} />
            <PowerBar.Level description="Feature coming soon!" label="Resilience" level={0} />
          </PowerBar.Performance>
        </PowerBar.Box>
        <PowerBar.Separator />
        <PowerBar.Box title="Statistics">
          <PowerBar.Data>
            <PowerBar.Figure icon="chessboard" label="Total Games Count" value={formattedGameCount} />
            <PowerBar.Figure icon="trophy-cup" label="Average Win Rate" value={formattedWinRate} />
            <PowerBar.Figure icon="level-four" label="Average Opponents Rating" value={formattedOpponentRating} />
            <PowerBar.Figure icon="serrated-slash" label="Average Berseck Rate" value={formattedBerseckRate} />
          </PowerBar.Data>
        </PowerBar.Box>
      </PowerBar>
    </>
  )
}
