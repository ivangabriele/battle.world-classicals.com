export default function Navbar() {
  return (
    <>
      <header className="header navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky">
        <div className="container px-0 px-xl-3">
          <button
            className="navbar-toggler ms-n2 me-2"
            data-bs-target="#primaryMenu"
            data-bs-toggle="offcanvas"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand flex-shrink-0 order-lg-1 mx-auto ms-lg-0 pe-lg-2 me-lg-4" href="index.html">
            WCTB
          </a>
          <div className="offcanvas offcanvas-collapse order-lg-2" id="primaryMenu">
            <div className="offcanvas-header navbar-shadow">
              <h5 className="mt-1 mb-0">Menu</h5>
              <button aria-label="Close" className="btn-close lead" data-bs-dismiss="offcanvas" type="button" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
