import classnames from 'classnames'

export default function Placeholder({ className }) {
  const boxClassName = classnames('d-flex justify-content-center align-items-center pb-6 pt-6', className)

  return (
    <>
      <div className={boxClassName}>
        <span aria-hidden="true">&nbsp;</span>
      </div>

      <style jsx>{`
        span {
          display: block;
          font-size: 300%;
        }
      `}</style>
    </>
  )
}
