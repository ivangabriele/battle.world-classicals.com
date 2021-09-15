import { SSRProvider } from '@restart/ui/ssr'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const noop = () => undefined

export default function CustomNavbar() {
  return (
    // https://github.com/react-bootstrap/react-bootstrap/issues/6026#issuecomment-917044627
    <SSRProvider>
      <Navbar bg="dark" className="navbar-dark" expand="lg">
        <Navbar.Toggle aria-controls="navbar" />

        <Navbar.Brand className="me-0 pe-lg-2 me-lg-4" href="/">
          WCTB
        </Navbar.Brand>

        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <NavDropdown id="nav-dropdown-standings" onToggle={noop} show title="Standings">
              <NavDropdown.Item href="/standings/all-time-teams">All Time Teams</NavDropdown.Item>
              <NavDropdown.Item href="/standings/all-time-players">All Time Players</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/journal">Journal</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <style global jsx>{`
        nav {
          padding: 1rem 1rem !important;
          user-select: none;
        }

        nav > button {
          padding: 0 !important;
        }
        nav > button > span {
          height: 2rem !important;
          width: 2rem !important;
        }

        nav > a.navbar-brand {
          font-family: var(--font-title);
        }

        .dropdown-toggle::after {
          content: '';
        }
      `}</style>
    </SSRProvider>
  )
}
