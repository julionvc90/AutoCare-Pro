import { useState } from "react";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formato";

// Barra superior. Recibe 3 props desde App:
//   usuario  -> quién inició sesión (o null)
//   carrito  -> lista de productos del carrito
//   onSalir  -> función para cerrar sesión
export default function TopBar({ usuario, carrito, onSalir }) {
  const [panelAbierto, setPanelAbierto] = useState(false);

  // reduce suma todos los elementos de la lista
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <div className="top-bar-actions">
      <div className="container d-flex justify-content-end align-items-center gap-3">
        {/* Condicional: si hay usuario muestra su nombre; si no, el botón de login */}
        {usuario ? (
          <>
            <span className="btn-top-login">
              <i className="fa-solid fa-user"></i> <span>{usuario.nombre}</span>
            </span>
            {usuario.rol === "ADMINISTRADOR" && (
              <Link to="/admin" className="btn-top-login"><i className="fa-solid fa-gauge"></i> <span>Panel</span></Link>
            )}
            <Link to="/" className="btn-top-login" onClick={onSalir}>
              <i className="fa-solid fa-right-from-bracket"></i> <span>Salir</span>
            </Link>
          </>
        ) : (
          <Link to="/login" className="btn-top-login">
            <i className="fa-solid fa-user"></i> <span>Iniciar Sesión</span>
          </Link>
        )}

        <button className="btn-top-cart" type="button" onClick={() => setPanelAbierto(!panelAbierto)}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Carrito</span>
          <span className="cart-badge">{cantidadTotal}</span>
        </button>

        <div className="cart-panel" hidden={!panelAbierto}>
          <div className="cart-panel-header">
            <h2 className="h6 mb-0">Productos en tu carrito</h2>
            <button type="button" className="cart-close" onClick={() => setPanelAbierto(false)}>&times;</button>
          </div>

          <div className="cart-list">
            {carrito.length === 0 && <p className="cart-empty mb-0">El carrito está vacío.</p>}

            {/* map: dibuja una fila por cada producto. "key" identifica cada fila. */}
            {carrito.map(item => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.nombre}</strong>
                  <small>{item.cantidad} x ${formatearPrecio(item.precio)}</small>
                </div>
                <span>${formatearPrecio(item.precio * item.cantidad)}</span>
              </div>
            ))}
          </div>

          <div className="cart-panel-footer">
            <span>Total:</span>
            <strong>${formatearPrecio(total)}</strong>
          </div>

          <Link to="/carrito" className="btn btn-success btn-sm w-100 mt-3" onClick={() => setPanelAbierto(false)}>
            Ver carrito completo
          </Link>
        </div>
      </div>
    </div>
  );
}
