export default function Box({ children }) {
  return (
    <>
      <div>{children}</div>

      <style jsx>{`
        div {
          align-items: center;
          justify-content: center;
          display: flex;
          height: 100%;
          padding: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
        @media (min-width: 992px) {
          div {
            align-items: flex-end;
            justify-content: flex-start;
            padding: 1rem 5rem 1.5rem 1.425rem;
          }
        }
        @media (min-width: 1280px) {
          div {
            padding: 1rem 5rem 1.5rem 0.5rem;
          }
        }
      `}</style>
    </>
  )
}
