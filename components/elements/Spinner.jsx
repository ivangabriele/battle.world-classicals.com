export default function Spinner() {
  return (
    <>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <style jsx>{`
        .spinner-border {
          height: 1rem;
          width: 1rem;
        }
      `}</style>
    </>
  )
}
