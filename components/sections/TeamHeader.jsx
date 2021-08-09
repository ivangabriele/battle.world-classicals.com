export default function TeamHeader({ name }) {
  return (
    <>
      <section className="bg-dark bg-size-cover overflow-hidden pt-5 pt-md-6 pt-lg-7 pb-5">
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="d-inline-flex display-5 mb-5 text-light">{name}</h1>
        </div>
      </section>

      <style jsx>{`
        section {
          background-image: url('/photos/hero.png');
          background-position: 0 10%;
        }

        h1 {
          text-shadow: 0 0 3rem yellow;
        }
      `}</style>
    </>
  )
}
