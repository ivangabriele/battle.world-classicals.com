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
          min-width: 250px;
          padding: 0px 20px;
          width: 90%;
        }
        @media (min-width: 992px) {
          div {
            flex-direction: column;
            width: 30%;
          }
        }

        h4 {
          color: var(--background-mono-e);
          font-size: 90%;
          letter-spacing: 2px;
          margin-bottom: 12px;
          margin-top: 5px;
          text-shadow: 0 0 2px #000;
          text-transform: uppercase;
        }
        @media (min-width: 992px) {
          h4 {
            margin-bottom: 0;
            margin-top: 12px;
          }
        }
      `}</style>
    </>
  )
}
