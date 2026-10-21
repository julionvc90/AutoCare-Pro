import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/format';

const FALLBACK = '/IMG/placeholder.svg';
const MAXIMO_COMPRA = 10;

export default function ProductDetail() {
  const { id } = useParams();
  const { products, getById } = useProducts();
  const { addProduct } = useCart();
  const producto = getById(id);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  if (!producto) {
    return (
      <div className="container mt-5">
        <div className="detalle-vacio text-center">
          <h1>Producto no encontrado</h1>
          <Link className="btn btn-success" to="/catalogo">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const maximo = Math.max(1, Math.min(Number(producto.stock) || 0, MAXIMO_COMPRA));
  const relacionados = products
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  const agregar = () => {
    const resultado = addProduct(producto, cantidad);
    if (resultado.agregadas > 0) {
      setMensaje(`${resultado.agregadas} x "${producto.nombre}" fue añadido al carrito.`);
    } else {
      setMensaje(`Ya tienes en el carrito todas las unidades disponibles de "${producto.nombre}" (${resultado.limite}).`);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <nav className="detalle-breadcrumb" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true"> › </span>
          <Link to={`/catalogo?cat=${producto.categoria}`}>{CATEGORIES[producto.categoria]}</Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">{producto.nombre}</span>
        </nav>
      </div>

      <section id="detalleProducto" className="container mt-3" aria-live="polite">
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="detalle-imagen">
              <img
                src={producto.imagen || FALLBACK}
                alt={producto.nombre}
                onError={(evento) => {
                  evento.currentTarget.onerror = null;
                  evento.currentTarget.src = FALLBACK;
                }}
              />
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="detalle-info">
              <span className="detalle-categoria">{CATEGORIES[producto.categoria]}</span>
              <h1>{producto.nombre}</h1>
              <p className="detalle-precio">{formatPrice(producto.precio)}</p>
              <p className="detalle-descripcion">{producto.descripcion}</p>
              <p className={`detalle-stock${producto.stock <= 0 ? ' sin-stock' : ''}`}>
                {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}
              </p>

              <div className="detalle-cantidad">
                <label htmlFor="cantidadProducto">Cantidad</label>
                <select
                  id="cantidadProducto"
                  className="form-select"
                  value={cantidad}
                  disabled={maximo <= 0}
                  onChange={(evento) => setCantidad(Number(evento.target.value))}
                >
                  {Array.from({ length: maximo }, (_, indice) => indice + 1).map((numero) => (
                    <option key={numero} value={numero}>{numero}</option>
                  ))}
                </select>
              </div>

              <button
                id="btnAgregarDetalle"
                type="button"
                className="btn btn-success w-100 mt-3"
                disabled={producto.stock <= 0}
                onClick={agregar}
              >
                Agregar al carrito
              </button>
              <Link className="btn btn-outline-light w-100 mt-2" to="/catalogo">Seguir comprando</Link>

              {mensaje && <p className="mt-3 mb-0 text-success">{mensaje}</p>}
            </div>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section id="seccionRelacionados" className="container mt-5">
          <h2 id="titulo-relacionados" className="titulo-seccion">Productos relacionados</h2>
          <div id="productosRelacionados" className="row g-4">
            {relacionados.map((relacionado) => (
              <ProductCard key={relacionado.id} product={relacionado} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
