// Navbar: navegacion principal y menu movil.
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const ENLACES = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/catalogo', label: 'Productos' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container">
        <Link className="brand-logo" to="/">
          <span className="brand-mark" aria-hidden="true" />
          <span className="auto">AUTO</span>
          <span className="care">CARE</span>
          <span className="pro">PRO</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navTienda"
          aria-expanded={abierto}
          aria-label="Alternar navegación"
          onClick={() => setAbierto((valor) => !valor)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="navTienda" className={`collapse navbar-collapse${abierto ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.to}>
                <NavLink
                  to={enlace.to}
                  end={enlace.end}
                  onClick={() => setAbierto(false)}
                  className={({ isActive }) => `nav-link nav-link-custom${isActive ? ' active' : ''}`}
                >
                  {enlace.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
