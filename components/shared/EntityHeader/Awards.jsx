export default function Awards({ children }) {
  return (
    <>
      <div>{children}</div>

      <style jsx>{`
        div {
          display: none;
        }
        @media (min-width: 992px) {
          div {
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;
            margin-bottom: -0.5rem;
          }
        }
      `}</style>
    </>
  )
}
