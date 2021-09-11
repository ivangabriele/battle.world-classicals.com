export default function Number({ length, value }) {
  const padLength = length - String(value).length
  const padValue = '0'.repeat(padLength)

  return (
    <>
      <span className="pad">{padValue}</span>
      <span>{value}</span>

      <style jsx>{`
        span {
          font-family: var(--font-number);
          font-size: 115%;
          letter-spacing: 0.125rem;
          padding: 0 0 0.125rem 0;
        }

        span.pad {
          visibility: hidden;
          padding: 0 0.125rem 0.125rem 0;
        }
      `}</style>
    </>
  )
}

Number.defaultProps = {
  length: 4,
}
