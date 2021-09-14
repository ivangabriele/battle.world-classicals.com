function Author({ children }) {
  return (
    <>
      <p>
        <i>—</i> {children}
      </p>

      <style jsx>{`
        p {
          font-style: italic;
          margin: -24px 0 42px 0;
          padding: 0 0 4px 50px;
        }

        i {
          padding-right: 1rem;
        }
      `}</style>
    </>
  )
}

function Blockquote({ children }) {
  return (
    <>
      <blockquote>{children}</blockquote>

      <style jsx>{`
        blockquote {
          font-size: 26px;
          font-style: italic;
          line-height: 1.48;
          opacity: 0.68;
          padding: 0 0 0 50px;
        }
      `}</style>
    </>
  )
}

export default Object.assign(Blockquote, {
  Author,
})
