export default function Placeholder() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pb-6 pt-6">
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
