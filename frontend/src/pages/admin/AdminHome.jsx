import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import { ORDENES_DEMO, totalOrden } from '../../data/orders';
import { readJSON } from '../../utils/storage';
import { formatPrice } from '../../utils/format';

export default function AdminHome() {
  const { user, allUsers, esAdmin } = useAuth();
  const { products } = useProducts();

  const ordenesReales = readJSON('ordenes', []);
  const ordenes = [...ORDENES_DEMO, ...(Array.isArray(ordenesReales) ? ordenesReales : [])];

  const pendientes = ordenes.filter((o) => o.estado === 'Pendiente').length;
  const ventas = ordenes.filter((o) => o.estado !== 'Cancelada').reduce((suma, o) => suma + totalOrden(o), 0);

  const criticos = products.filter(
    (p) => p.stockCritico !== undefined && p.stockCritico !== null && p.stockCritico !== '' && Number(p.stock) <= Number(p.stockCritico),
  );

  return (
    <>
      <section className="admin-card">
        <h2 id="saludo" className="h4">¡HOLA {user.rol}!</h2>
        <p className="text-secondary">Resumen general del taller y la tienda.</p>
        <div id="accesos" className="d-flex flex-wrap gap-2">
          <Link className="btn btn-sm btn-outline-light" to="/admin/productos">Administrar productos</Link>
          <Link className="btn btn-sm btn-outline-light" to="/admin/ordenes">Ver órdenes</Link>
          {esAdmin && (
            <Link className="btn btn-sm btn-outline-light" to="/admin/usuarios">Administrar usuarios</Link>
          )}
        </div>
      </section>

      <section id="resumen" className="row g-3 my-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="admin-card kpi">
            <i className="fa-solid fa-box" aria-hidden="true" />
            <div>
              <div className="valor">{products.length}</div>
              <div className="etiqueta">Productos</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="admin-card kpi">
            <i className="fa-solid fa-receipt" aria-hidden="true" />
            <div>
              <div className="valor">{ordenes.length}</div>
              <div className="etiqueta">Órdenes</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="admin-card kpi">
            <i className="fa-solid fa-clock" aria-hidden="true" />
            <div>
              <div className="valor">{pendientes}</div>
              <div className="etiqueta">Órdenes pendientes</div>
            </div>
          </div>
        </div>
        {esAdmin && (
          <>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="admin-card kpi">
                <i className="fa-solid fa-users" aria-hidden="true" />
                <div>
                  <div className="valor">{allUsers.length}</div>
                  <div className="etiqueta">Usuarios</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="admin-card kpi">
                <i className="fa-solid fa-sack-dollar" aria-hidden="true" />
                <div>
                  <div className="valor">{formatPrice(ventas)}</div>
                  <div className="etiqueta">Ventas</div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="admin-card">
        <h2 id="tituloAlertas" className="h5">Alertas de stock crítico</h2>
        <ul id="alertasStock" className="list-group list-group-flush">
          {criticos.length === 0 ? (
            <li className="list-group-item bg-transparent">No hay productos con stock crítico.</li>
          ) : (
            criticos.map((p) => (
              <li key={p.id} className="list-group-item bg-transparent">
                <strong>{p.nombre}</strong> — Stock {p.stock} (crítico {p.stockCritico})
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
