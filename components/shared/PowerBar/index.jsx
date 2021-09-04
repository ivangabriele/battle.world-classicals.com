import Box from './Box'
import Data from './Data'
import Figure from './Figure'
import Level from './Level'
import Performance from './Performance'
import Separator from './Separator'

function PowerBar({ children }) {
  return (
    <>
      <section>
        <div className="container">{children}</div>
      </section>

      <style jsx>{`
        * {
          user-select: none;
        }

        section {
          background-color: var(--background-light);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          height: fit-content;
          justify-content: center;
          width: 100%;
          z-index: 2;
        }

        @media (min-width: 992px) {
          .container {
            align-items: flex-end;
          }
        }

        div {
          align-items: center;
          display: flex;
          flex-direction: column-reverse;
          justify-content: space-evenly;
          padding: 1rem 0 2rem 0;
          position: relative;
          width: 100%;
          z-index: 3;
        }
        @media (min-width: 992px) {
          div {
            flex-direction: row;
            padding: 1.5rem 0 1.5rem 0;
          }
        }
      `}</style>
    </>
  )
}

export default Object.assign(PowerBar, {
  Box,
  Data,
  Figure,
  Level,
  Performance,
  Separator,
})
