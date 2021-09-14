import Entry from './Entry'

export default function Journal({ articles }) {
  return (
    <>
      <section className="container-md">{articles.map(Entry)}</section>

      <style jsx>{`
        section {
          display: flex;
          flex-wrap: wrap;
          font-family: var(--font-content);
          font-size: 14px;
          font-weight: 500;
          padding: 0 1rem 0 1rem;
        }
        @media (min-width: 768px) {
          section {
            padding: 1rem 1rem 0 1rem;
          }
        }
      `}</style>
    </>
  )
}
