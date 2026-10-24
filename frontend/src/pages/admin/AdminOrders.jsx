// AdminOrders: listado de ordenes con detalle.
import { useState } from 'react';
import { COLOR_ESTADO, ORDENES_DEMO, totalOrden } from '../../data/orders';
import { readJSON } from '../../utils/storage';
import { formatPrice } from '../../utils/format';
import Modal from '../../components/Modal';

const POR_PAGINA = 8;

export default function AdminOrders() {
  const guardadas = readJSON('ordenes', []);
  const ordenes = [...ORDENES_DEMO, ...(Array.isArray(guardadas) ? guardadas : [])];

  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const [detalle, setDetalle] = useState(null);

  const numeroDe = (orden, indice) => orden.numero || orden.id || `ORD-${1000 + indice + 1}`;

  const termino = filtro.trim().toLowerCase();
  const filtradas = ordenes.filter((orden, indice) => {
    if (!termino) return true;
    const texto = `${numeroDe(orden, indice)} ${orden.cliente} ${orden.estado}`.toLowerCase();
    return texto.includes(termino);
  });

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtradas.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  return (
    <>
      <section className="admin-card">
        <div className="input-group mb-3" style={{ maxWidth: 420 }}>
          <label className="visually-hidden" htmlFor="filtro">Buscar orden</label>
          <input
            id="filtro"
            type="search"
            className="form-control"
            placeholder="Buscar por número, cliente o estado"
            value={filtro}
            onChange={(evento) => {
              setFiltro(evento.target.value);
              setPagina(1);
            }}
          />
        </div>

        <div className="tabla-contenedor">
          <table className="table tabla-admin">
            <thead>
              <tr>
                <th>N° orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody id="cuerpoOrdenes">
              {visibles.length === 0 ? (
                <tr>
                  <td colSpan={6}>No hay órdenes registradas.</td>
                </tr>
              ) : (
                visibles.map((orden, indice) => (
                  <tr key={numeroDe(orden, indice)}>
                    <td>{numeroDe(orden, indice)}</td>
                    <td>{orden.fecha ? new Date(orden.fecha).toLocaleDateString('es-CL') : '—'}</td>
                    <td>{orden.cliente}</td>
                    <td>
                      <span className={`badge text-bg-${COLOR_ESTADO[orden.estado] || 'secondary'}`}>{orden.estado}</span>
                    </td>
                    <td>{formatPrice(totalOrden(orden))}</td>
                    <td>
                      <button type="button" className="btn btn-sm btn-outline-light" onClick={() => setDetalle(orden)}>
                        Ver
                      </button>
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

      <Modal abierto={Boolean(detalle)} titulo={detalle ? `Orden ${detalle.numero || detalle.id}` : ''} onCerrar={() => setDetalle(null)}>
        {detalle && (
          <div>
            <p className="mb-1"><strong>Fecha:</strong> {detalle.fecha ? new Date(detalle.fecha).toLocaleDateString('es-CL') : '—'}</p>
            <p className="mb-1"><strong>Cliente:</strong> {detalle.cliente}</p>
            {detalle.correo && <p className="mb-1"><strong>Correo:</strong> {detalle.correo}</p>}
            {detalle.direccion && <p className="mb-1"><strong>Dirección:</strong> {detalle.direccion}</p>}
            <p className="mb-1">
              <strong>Estado:</strong>{' '}
              <span className={`badge text-bg-${COLOR_ESTADO[detalle.estado] || 'secondary'}`}>{detalle.estado}</span>
            </p>
            <table className="table tabla-admin">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {(detalle.items || []).map((item, indice) => (
                  <tr key={`${item.nombre}-${indice}`}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatPrice(item.precio)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-0 text-end"><strong>Total: {formatPrice(totalOrden(detalle))}</strong></p>
          </div>
        )}
      </Modal>
    </>
  );
}
