import Navbar from '../sections/Navbar'

export default function Main({ children }) {
  return (
    <>
      <div>
        <Navbar />

        {children}
      </div>

      <style global jsx>{`
        main {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 2rem;
        }
      `}</style>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
      `}</style>
    </>
  )
}
