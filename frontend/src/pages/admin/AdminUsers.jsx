// AdminUsers: listado de usuarios y roles.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/users';

const POR_PAGINA = 8;

export default function AdminUsers() {
  const { allUsers, user, deleteUser } = useAuth();
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);

  const nombreCompleto = (usuario) => `${usuario.nombre || ''} ${usuario.apellidos || ''}`.trim();
  const ubicacion = (usuario) => {
    const texto = [usuario.comuna, usuario.region].filter(Boolean).join(', ');
    return texto || '—';
  };
  const badgeRol = (rol) => (rol === 'ADMINISTRADOR' ? 'danger' : rol === 'VENDEDOR' ? 'primary' : 'secondary');

  const termino = filtro.trim().toLowerCase();
  const filtrados = allUsers.filter((usuario) => {
    if (!termino) return true;
    const texto = `${usuario.rut || ''} ${nombreCompleto(usuario)} ${usuario.correo} ${ROLE_LABELS[usuario.rol] || usuario.rol}`.toLowerCase();
    return texto.includes(termino);
  });

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const eliminar = (usuario) => {
    if (usuario.correo.toLowerCase() === user.correo.toLowerCase()) {
      window.alert('No puedes eliminar tu propia cuenta.');
      return;
    }
    if (window.confirm(`¿Eliminar al usuario "${nombreCompleto(usuario)}"?`)) {
      deleteUser(usuario.correo);
    }
  };

  return (
    <section className="admin-card">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <div className="input-group flex-grow-1" style={{ maxWidth: 460 }}>
          <label className="visually-hidden" htmlFor="filtro">Buscar usuario</label>
          <input
            id="filtro"
            type="search"
            className="form-control"
            placeholder="Buscar por RUN, nombre, correo o tipo"
            value={filtro}
            onChange={(evento) => {
              setFiltro(evento.target.value);
              setPagina(1);
            }}
          />
        </div>
        <Link className="btn btn-success" to="/admin/usuarios/nuevo">
          <i className="fa-solid fa-user-plus" aria-hidden="true" /> Nuevo usuario
        </Link>
      </div>

      <div className="tabla-contenedor">
        <table className="table tabla-admin">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="cuerpoUsuarios">
            {visibles.length === 0 ? (
              <tr>
                <td colSpan={6}>No hay resultados.</td>
              </tr>
            ) : (
              visibles.map((usuario) => (
                <tr key={usuario.correo}>
                  <td>{usuario.rut || '—'}</td>
                  <td>{nombreCompleto(usuario)}</td>
                  <td>{usuario.correo}</td>
                  <td>
                    <span className={`badge text-bg-${badgeRol(usuario.rol)}`}>
                      {ROLE_LABELS[usuario.rol] || usuario.rol}
                    </span>
                  </td>
                  <td>{ubicacion(usuario)}</td>
                  <td className="d-flex gap-1">
                    {usuario.base ? (
                      <span className="text-secondary small">Cuenta base</span>
                    ) : (
                      <>
                        <Link className="btn btn-sm btn-outline-light" to={`/admin/usuarios/${encodeURIComponent(usuario.correo)}/editar`}>
                          Editar
                        </Link>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(usuario)}>
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="form-text mt-2">Las cuentas base del sistema están protegidas y no se pueden editar ni eliminar.</p>

      {totalPaginas > 1 && (
        <nav>
          <ul className="pagination pagination-sm" id="paginacion">
            {Array.from({ length: totalPaginas }, (_, indice) => indice + 1).map((numero) => (
              <li key={numero} className={`page-item${numero === paginaActual ? ' active' : ''}`}>
                <button type="button" className="page-link" onClick={() => setPagina(numero)}>
                  {numero}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}
