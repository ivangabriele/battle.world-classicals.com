export default function Box({ children, className }) {
  return (
    <>
      <div className={className}>{children}</div>

      <style jsx>{`
        div {
          align-items: center;
          justify-content: center;
          display: flex;
          height: 100%;
          left: 0;
          padding: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
        @media (min-width: 992px) {
          div {
            align-items: flex-end;
            justify-content: flex-start;
            padding: 1rem 2rem 1.5rem 2.4rem;
          }
        }
      `}</style>
    </>
  )
}
