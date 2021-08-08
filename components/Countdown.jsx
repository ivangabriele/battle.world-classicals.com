import moment from 'moment'
import { useEffect, useState } from 'react'

function getLeftDHMS(eventDate) {
  const nowDate = moment()
  const timeLeft = eventDate.diff(nowDate)
  const leftDays = String(Number(moment.utc(timeLeft).format('D')) - 1).padStart(2, `0`)
  const leftHours = moment.utc(timeLeft).format('HH')
  const leftMinutes = moment.utc(timeLeft).format('mm')
  const leftSeconds = moment.utc(timeLeft).format('ss')

  return [leftDays, leftHours, leftMinutes, leftSeconds]
}

function countDown(eventDate, setTimer) {
  const leftDHMS = getLeftDHMS(eventDate)

  setTimer(leftDHMS)
}

export default function Countdown({ tournamentData }) {
  const { finishesAt, fullName, startsAt } = tournamentData
  const nth = fullName.match(/^\d+[a-z]+/)[0]
  const now = moment()
  const hasStarted = startsAt <= Number(now.format('x'))

  const eventDate = hasStarted ? moment(finishesAt) : moment(startsAt)

  const [[leftDays, leftHours, leftMinutes, leftSeconds], setTimer] = useState(getLeftDHMS(eventDate))

  useEffect(() => {
    const countDownIntervalId = setInterval(() => countDown(eventDate, setTimer), 1000)
    return () => clearInterval(countDownIntervalId)
  })

  return (
    <>
      <section className="bg-secondary py-5 py-md-6">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <div className="col-xl-4 text-center text-xl-start">
              <h3 className="mb-4 mb-xl-0">
                {hasStarted ? `${nth} Battle will end in:` : `${nth} Battle will start in:`}
              </h3>
            </div>
            <div className="col-xl-8">
              <div className="countdown h2 display-1 justify-content-center justify-content-xl-start">
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
        </div>
      </section>

      <style jsx>{`
        .countdown-value-digit {
          min-width: 3rem;
        }
      `}</style>
    </>
  )
}
