export default function Data({ children }) {
  return (
    <>
      <div className="Data">{children}</div>

      <style jsx>{`
        div.Data {
          display: flex;
          justify-content: space-evenly;
          height: 100%;
          padding-bottom: 0.5rem;
          width: 100%;
        }
      `}</style>
    </>
  )
}
