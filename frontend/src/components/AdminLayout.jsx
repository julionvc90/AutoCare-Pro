import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MENU = [
  { to: '/admin/home', label: 'Dashboard', icono: 'fa-gauge', roles: ['ADMINISTRADOR', 'VENDEDOR'] },
  { to: '/admin/productos', label: 'Productos', icono: 'fa-box', roles: ['ADMINISTRADOR', 'VENDEDOR'] },
  { to: '/admin/ordenes', label: 'Órdenes', icono: 'fa-receipt', roles: ['ADMINISTRADOR', 'VENDEDOR'] },
  { to: '/admin/usuarios', label: 'Usuarios', icono: 'fa-users', roles: ['ADMINISTRADOR'] },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar${abierto ? ' abierto' : ''}`} id="menuLateral">
        <Link className="admin-marca" to="/admin/home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="auto">AUTO</span>
          <span className="care">CARE</span>
          <span className="pro">PRO</span>
        </Link>

        <nav className="admin-nav">
          {MENU.filter((item) => item.roles.includes(user.rol)).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-link${isActive ? ' activo' : ''}`}
              onClick={() => setAbierto(false)}
            >
              <i className={`fa-solid ${item.icono}`} aria-hidden="true" /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-nav-pie">
          <Link className="admin-link" to="/" onClick={() => setAbierto(false)}>
            <i className="fa-solid fa-store" aria-hidden="true" /> Ver tienda
          </Link>
          <button type="button" className="admin-link" onClick={cerrarSesion}>
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true" /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="admin-contenido">
        <header className="admin-topbar">
          <button
            type="button"
            className="btn btn-sm btn-outline-light d-lg-none"
            id="btnMenu"
            aria-label="Abrir menú"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <i className="fa-solid fa-bars" aria-hidden="true" />
          </button>
          <h1 className="admin-titulo">Panel de administración</h1>
          <div className="admin-usuario" id="infoUsuario">
            <i className="fa-solid fa-user" aria-hidden="true" /> {user.nombre}
            <span className="badge text-bg-success">{user.rol}</span>
          </div>
        </header>

        <div className="admin-cuerpo">
          <div id="zonaAvisos" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
