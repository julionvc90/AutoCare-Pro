import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import { NOMBRES_CATEGORIAS } from "../data/productos";
import { formatearPrecio } from "../utils/formato";

// Detalle de un producto. El id viene de la URL: /producto/3
export default function DetalleProducto({ productos, onComprar }) {
  const { id } = useParams();          // lee el :id de la URL (llega como texto)
  const [cantidad, setCantidad] = useState(1);

  const producto = productos.find(p => p.id === Number(id));

  // Si el producto no existe, mostramos un mensaje y salimos
  if (!producto) {
    return (
      <main className="container">
        <div className="detalle-vacio">
          <h1 className="h3">Producto no encontrado</h1>
          <Link to="/catalogo" className="btn btn-success">Volver al catálogo</Link>
        </div>
      </main>
    );
  }

  // Productos de la misma categoría, sin contar el actual (máximo 4)
  const relacionados = productos
    .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  // Opciones del select: de 1 hasta el stock (máximo 10)
  const opciones = [];
  for (let i = 1; i <= Math.min(producto.stock, 10); i++) {
    opciones.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <main className="container">
      <nav className="detalle-breadcrumb">
        <Link to="/">Inicio</Link> &rsaquo;{" "}
        <Link to={"/catalogo?cat=" + producto.categoria}>{NOMBRES_CATEGORIAS[producto.categoria]}</Link> &rsaquo;{" "}
        <span>{producto.nombre}</span>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="detalle-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="detalle-info">
            <span className="detalle-categoria">{NOMBRES_CATEGORIAS[producto.categoria]}</span>
            <h1>{producto.nombre}</h1>
            <p className="detalle-precio">${formatearPrecio(producto.precio)}</p>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <p className="detalle-stock">{producto.stock} unidades disponibles</p>

            <div className="detalle-cantidad">
              <label htmlFor="cantidad" className="form-label fw-bold mb-0">Cantidad</label>
              <select id="cantidad" className="form-select" value={cantidad} onChange={e => setCantidad(Number(e.target.value))}>
                {opciones}
              </select>
            </div>

            <button type="button" className="btn btn-success w-100 fw-bold mt-3" onClick={() => onComprar(producto, cantidad)}>
              <i className="fa-solid fa-cart-plus"></i> Añadir al carrito
            </button>
            <Link to="/catalogo" className="btn btn-outline-light w-100 mt-2">Seguir comprando</Link>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="seccion-espaciada">
          <h2 className="titulo-seccion">Productos relacionados</h2>
          <div className="row g-4 justify-content-center">
            {relacionados.map(p => <TarjetaProducto key={p.id} producto={p} onComprar={onComprar} />)}
          </div>
        </section>
      )}
    </main>
  );
}
