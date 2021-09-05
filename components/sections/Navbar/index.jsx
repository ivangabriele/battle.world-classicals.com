import classnames from 'classnames'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import css from 'styled-jsx/css'

const NavbarBrandStyle = css.resolve`
  a {
    font-family: var(--font-title);
  }
`

const noop = () => undefined

export default function CustomNavbar() {
  const navbarBrandClassName = classnames('me-0 pe-lg-2 me-lg-4', NavbarBrandStyle.className)

  return (
    <>
      <Navbar bg="dark" className="navbar-dark order-lg-1" expand="lg" sticky="top">
        <Navbar.Toggle aria-controls="navbar" />

        <Navbar.Brand className={navbarBrandClassName} href="/">
          WCTB
        </Navbar.Brand>

        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <NavDropdown id="nav-dropdown-standings" onToggle={noop} show title="Standings">
              <NavDropdown.Item href="/standings/all-time-teams">All Time Teams</NavDropdown.Item>
              <NavDropdown.Item href="/standings/all-time-players">All Time Players</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {NavbarBrandStyle.styles}
      <style global jsx>{`
        nav {
          user-select: none;
        }

        .dropdown-toggle::after {
          content: '';
        }
      `}</style>
    </>
  )
}
