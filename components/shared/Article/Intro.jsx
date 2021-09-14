export default function Intro({ children }) {
  return (
    <>
      <p>{children}</p>

      <style jsx>{`
        p {
          opacity: 0.5;
          font-size: 24px;
          font-style: italic;
          font-weight: 300;
          line-height: 1.52;
          margin: 0 0 42px 0;
        }
      `}</style>
    </>
  )
}
