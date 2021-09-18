import moment from 'moment'
import { useEffect, useState } from 'react'

import getActiveTournamentBasicData from '../../libs/helpers/getActiveTournamentBasicData'

export async function getStaticProps() {
  const now = moment()
  const tournament = await getActiveTournamentBasicData()
  const hasStarted = tournament.startsAt <= Number(now.format('x'))

  return {
    props: {
      data: {
        hasStarted,
        tournament,
      },
    },
  }
}

function getLeftDHMS(eventDate) {
  const nowDate = moment()
  const timeLeft = eventDate.diff(nowDate) - (process.browser ? 0 : 750)

  if (timeLeft <= 0) {
    if (process.browser) {
      window.location.reload()
    }

    return [0, 0, 0, 0]
  }

  const leftDays = String(Number(moment.utc(timeLeft).format('D')) - 1).padStart(2, `0`)
  const leftHours = moment.utc(timeLeft).format('HH')
  const leftMinutes = moment.utc(timeLeft).format('mm')
  const leftSeconds = moment.utc(timeLeft).format('ss')

  return [leftDays, leftHours, leftMinutes, leftSeconds]
}

const countDown = (eventDate, setTimer) => {
  const leftDHMS = getLeftDHMS(eventDate)

  setTimer(leftDHMS)
}

export default function Countdown() {
  const [state, setState] = useState({
    eventDate: null,
    hasStarted: null,
    isLoading: true,
    nth: null,
  })

  const [[leftDays, leftHours, leftMinutes, leftSeconds], setTimer] = useState(['--', '--', '--', '--'])

  useEffect(() => {
    ;(async () => {
      const tournament = await getActiveTournamentBasicData()
      const { finishesAt, fullName, startsAt } = tournament
      const nth = fullName.match(/^\d+[a-z]+/)[0]

      const now = moment()
      const hasStarted = tournament.startsAt <= Number(now.format('x'))
      const eventDate = hasStarted ? moment(finishesAt) : moment(startsAt)

      countDown(eventDate, setTimer)

      setState({
        eventDate,
        hasStarted,
        isLoading: false,
        nth,
      })
    })()
  }, [])

  useEffect(() => {
    if (state.isLoading) {
      return () => undefined
    }

    const countDownIntervalId = setInterval(() => countDown(state.eventDate, setTimer), 1000)

    return () => clearInterval(countDownIntervalId)
  })

  return (
    <>
      <section className="bg-secondary py-5 py-md-6">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <div className="text-center">
              <h3 className="mb-4">
                {state.isLoading && <span>...</span>}
                {!state.isLoading && state.hasStarted && (
                  <>
                    <span>{`The ${state.nth} Battle`}</span>
                    <span>will end in:</span>
                  </>
                )}
                {!state.isLoading && !state.hasStarted && (
                  <>
                    <span>{`The ${state.nth} Battle`}</span>
                    <span>will start in:</span>
                  </>
                )}
              </h3>
            </div>
            <div className="countdown h2 display-1 justify-content-center">
              <div className="mb-0 me-0 px-3 border-end">
                <div className="countdown-value fw-normal px-3 d-flex">
                  <span className="countdown-value-digit">{leftDays[0]}</span>
                  <span className="countdown-value-digit">{leftDays[1]}</span>
                </div>
                <span className="countdown-label fs-lg text-body">Days</span>
              </div>
              <div className="mb-0 me-0 px-3 border-end">
                <div className="countdown-value fw-normal px-3 d-flex">
                  <span className="countdown-value-digit">{leftHours[0]}</span>
                  <span className="countdown-value-digit">{leftHours[1]}</span>
                </div>
                <span className="countdown-label fs-lg text-body">Hours</span>
              </div>
              <div className="mb-0 me-0 px-3 border-end">
                <div className="countdown-value fw-normal px-3 d-flex">
                  <span className="countdown-value-digit">{leftMinutes[0]}</span>
                  <span className="countdown-value-digit">{leftMinutes[1]}</span>
                </div>
                <span className="countdown-label fs-lg text-body">Mins</span>
              </div>
              <div className="mb-0 me-0 px-3">
                <div className="countdown-value fw-normal px-3 d-flex">
                  <span className="countdown-value-digit">{leftSeconds[0]}</span>
                  <span className="countdown-value-digit">{leftSeconds[1]}</span>
                </div>
                <span className="countdown-label fs-lg text-body">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          user-select: none;
        }

        h3 > span {
          display: inline-block;
        }

        .countdown-value-digit {
          min-width: 3rem;
        }
      `}</style>
    </>
  )
}
