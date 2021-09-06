export default function Pararaph({ children }) {
  return (
    <>
      <p>{children}</p>

      <style jsx>{`
        p {
          line-height: 1.58;
          margin: 0 0 42px 0;
        }
      `}</style>
    </>
  )
}
