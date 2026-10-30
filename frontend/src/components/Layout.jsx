import { NavLink, Outlet, ScrollRestoration } from 'react-router'
import Cursor from './Cursor.jsx'
import './Layout.css'

function Layout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="Inika Talati home">
          IT
        </NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div>
          <span className="eyebrow">PERSONAL PORTFOLIO</span>
          <strong>INIKA TALATI © {new Date().getFullYear()}</strong>
        </div>
        <a href="#main">Back to top ↑</a>
      </footer>
      <ScrollRestoration />
      <Cursor />
    </div>
  )
}

export default Layout
