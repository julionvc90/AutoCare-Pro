import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Menú de navegación. NavLink es un Link que sabe si es la página actual
// (isActive) para pintar el enlace como "active".
export default function NavBar() {
  // abierto: controla el menú desplegable en celulares
  const [abierto, setAbierto] = useState(false);

  const claseEnlace = ({ isActive }) => "nav-link nav-link-custom" + (isActive ? " active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container">
        <Link className="brand-logo" to="/">
          <img src="/IMG/Logo.png" alt="AutoCare Pro" width="15%" />
          <span className="auto">AUTO</span>
          <span className="care">CARE</span>
          <span className="pro">Pro</span>
        </Link>

        <button className="navbar-toggler" type="button" aria-label="Abrir navegación" onClick={() => setAbierto(!abierto)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Si abierto es true se agrega la clase "show" y el menú aparece */}
        <div className={"collapse navbar-collapse" + (abierto ? " show" : "")}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end className={claseEnlace} to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className={claseEnlace} to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className={claseEnlace} to="/catalogo">Productos</NavLink></li>
            <li className="nav-item"><NavLink className={claseEnlace} to="/blogs">Blogs</NavLink></li>
            <li className="nav-item"><NavLink className={claseEnlace} to="/contacto">Contacto</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
