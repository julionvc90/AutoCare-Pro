// AdminProducts: listado, busqueda y acciones de productos.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import Modal from '../../components/Modal';
import { formatPrice } from '../../utils/format';

const POR_PAGINA = 8;
const FALLBACK = '/IMG/placeholder.svg';

export default function AdminProducts() {
  const { products, categories, deleteProduct } = useProducts();
  const { esAdmin } = useAuth();
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const [detalle, setDetalle] = useState(null);

  const codigoDe = (producto) => producto.codigo || `PRD${String(producto.id).padStart(3, '0')}`;
  const categoriaDe = (producto) => categories[producto.categoria] || producto.categoria || '—';
  const enAlerta = (producto) =>
    producto.stockCritico !== undefined &&
    producto.stockCritico !== null &&
    producto.stockCritico !== '' &&
    Number(producto.stock) <= Number(producto.stockCritico);

  const termino = filtro.trim().toLowerCase();
  const filtrados = products.filter((p) =>
    !termino
      ? true
      : `${codigoDe(p)} ${p.nombre} ${categoriaDe(p)}`.toLowerCase().includes(termino),
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const eliminar = (producto) => {
    if (window.confirm(`¿Eliminar el producto "${producto.nombre}"?`)) {
      deleteProduct(producto.id);
    }
  };

  return (
    <>
      <section className="admin-card">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <div className="input-group flex-grow-1" style={{ maxWidth: 420 }}>
            <label className="visually-hidden" htmlFor="filtro">Buscar producto</label>
            <input
              id="filtro"
              type="search"
              className="form-control"
              placeholder="Buscar por código, nombre o categoría"
              value={filtro}
              onChange={(evento) => {
                setFiltro(evento.target.value);
                setPagina(1);
              }}
            />
          </div>
          {esAdmin && (
            <Link className="btn btn-success solo-admin" to="/admin/productos/nuevo">
              <i className="fa-solid fa-plus" aria-hidden="true" /> Nuevo producto
            </Link>
          )}
        </div>

        <div className="tabla-contenedor">
          <table className="table tabla-admin">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="cuerpoProductos">
              {visibles.length === 0 ? (
                <tr>
                  <td colSpan={7}>No hay resultados.</td>
                </tr>
              ) : (
                visibles.map((producto) => (
                  <tr key={producto.id} className={enAlerta(producto) ? 'fila-alerta' : ''}>
                    <td>
                      <img
                        className="mini"
                        src={producto.imagen || FALLBACK}
                        alt={producto.nombre}
                        onError={(evento) => {
                          evento.currentTarget.onerror = null;
                          evento.currentTarget.src = FALLBACK;
                        }}
                      />
                    </td>
                    <td>{codigoDe(producto)}</td>
                    <td>{producto.nombre}</td>
                    <td>{categoriaDe(producto)}</td>
                    <td>{formatPrice(producto.precio)}</td>
                    <td>
                      {producto.stock}
                      {enAlerta(producto) && <span className="badge text-bg-danger ms-2">Stock crítico</span>}
                    </td>
                    <td className="d-flex gap-1">
                      <button type="button" className="btn btn-sm btn-outline-light" onClick={() => setDetalle(producto)}>
                        Ver
                      </button>
                      {esAdmin && (
                        <>
                          <Link className="btn btn-sm btn-outline-light" to={`/admin/productos/${producto.id}/editar`}>
                            Editar
                          </Link>
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(producto)}>
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

        {totalPaginas > 1 && (
          <nav>
            <ul className="pagination pagination-sm mt-3" id="paginacion">
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

      <Modal abierto={Boolean(detalle)} titulo={detalle ? detalle.nombre : ''} onCerrar={() => setDetalle(null)}>
        {detalle && (
          <div>
            <img
              src={detalle.imagen || FALLBACK}
              alt={detalle.nombre}
              className="img-fluid mb-3"
              style={{ maxHeight: 220 }}
              onError={(evento) => {
                evento.currentTarget.onerror = null;
                evento.currentTarget.src = FALLBACK;
              }}
            />
            <p className="mb-1"><strong>Código:</strong> {codigoDe(detalle)}</p>
            <p className="mb-1"><strong>Categoría:</strong> {categoriaDe(detalle)}</p>
            <p className="mb-1"><strong>Precio:</strong> {formatPrice(detalle.precio)}</p>
            <p className="mb-1"><strong>Stock:</strong> {detalle.stock}</p>
            <p className="mb-0"><strong>Descripción:</strong> {detalle.descripcion || 'Sin descripción.'}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
