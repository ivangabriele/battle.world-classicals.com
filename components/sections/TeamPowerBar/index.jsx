import Box from './Box'
import Separator from './Separator'

export default function TeamPowerBar() {
  return (
    <>
      <section className="bg-dark">
        <div className="container">
          <Box title="Awards" />
          <Separator />
          <Box title="Awards" />
          <Separator />
          <Box title="Stats" />
        </div>
      </section>

      <style jsx>{`
        section {
          background: linear-gradient(80deg, var(--background-mono-d) 0%, var(--background-mono-b) 100%);
          border-bottom: 2px solid var(--background-shade-d);
          border-top: 2px solid var(--background-shade-d);
          display: flex;
          height: fit-content;
          justify-content: center;
          width: 100%;
          z-index: 2;
        }

        div {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 20px 0px;
          position: relative;
          width: 100%;
          z-index: 3;
        }
        @media (min-width: 992px) {
          div {
            flex-direction: row;
          }
        }
      `}</style>
    </>
  )
}
