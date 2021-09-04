export default function Performance({ children }) {
  return (
    <>
      <div className="Performance">{children}</div>

      <style jsx>{`
        div.Performance {
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  )
}
