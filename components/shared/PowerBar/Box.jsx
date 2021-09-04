export default function Box({ children, title }) {
  return (
    <>
      <div>
        {children}
        <h4>{title}</h4>
      </div>

      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          flex-direction: column-reverse;
          flex-grow: 1;
          padding: 0 1rem;
          width: 100%;
        }
        @media (min-width: 992px) {
          div {
            flex-direction: column;
            width: 30%;
          }
        }

        h4 {
          color: rgba(255, 255, 255, 0.75);
          font-size: 90%;
          letter-spacing: 2px;
          margin: 1rem 0 1rem 0;
          text-transform: uppercase;
        }
        @media (min-width: 992px) {
          h4 {
            margin: 1.5rem 0 0.5rem 0;
          }
        }
      `}</style>
    </>
  )
}
