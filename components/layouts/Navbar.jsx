export default function Navbar() {
  return (
    <>
      <header className="header navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky navbar-shadow">
        <div className="container px-0 px-xl-3">
          <button className="navbar-toggler ms-n2 me-2" type="button">
            <span className="navbar-toggler-icon" />
          </button>

          <a className="navbar-brand order-lg-1 me-0 pe-lg-2 me-lg-4" href="/">
            WCTB
          </a>

          {/* <div className="d-flex align-items-center order-lg-3">
            <a className="btn btn-primary d-none d-sm-inline-block ms-3" href="/register-my-team">
              Register my Team
            </a>
          </div> */}

          <div className="collapse navbar-collapse order-lg-2" id="navbarCollapse1">
            <ul className="navbar-nav me-auto">
              {/* <li className="nav-item">
                <a className="nav-link" href="/podium">
                  Podium
                </a>
              </li> */}
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">Standings</span>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/standings/all-time-teams">
                      All Time Teams
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/standings/all-time-players">
                      All Time Players
                    </a>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="/standings/by-tournament">
                      By Tournament
                    </a>
                  </li> */}
                </ul>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/teams">
                  Teams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/players">
                  Players
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </header>

      <style jsx>{`
        .dropdown-toggle {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
