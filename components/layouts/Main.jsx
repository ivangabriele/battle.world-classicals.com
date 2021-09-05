import Navbar from '../sections/Navbar'

export default function Main({ children }) {
  return (
    <>
      <div className="page-wrapper">
        <Navbar />

        {children}
      </div>
    </>
  )
}
