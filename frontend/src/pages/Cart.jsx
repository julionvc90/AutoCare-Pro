// Cart: carrito con cantidades, cupon, total y pago.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { formatPrice } from '../utils/format';

const FALLBACK = '/IMG/placeholder.svg';

export default function CartPage() {
  const {
    items,
    summary,
    coupon,
    updateQty,
    removeProduct,
    clearCart,
    applyCoupon,
    limitFor,
    checkout,
  } = useCart();
  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();

  const imagenDe = (nombre) => products.find((producto) => producto.nombre === nombre)?.imagen || FALLBACK;

  const [mensaje, setMensaje] = useState('');
  const [tipo, setTipo] = useState('');
  const [cuponTexto, setCuponTexto] = useState('');

  const aplicar = () => {
    const resultado = applyCoupon(cuponTexto);
    setMensaje(resultado.message);
    setTipo(resultado.ok ? 'exito' : 'error');
    if (resultado.ok) setCuponTexto('');
  };

  const pagar = () => {
    const resultado = checkout(user);
    if (resultado.ok) {
      navigate(`/boleta/${resultado.orden.id}`);
      return;
    }
    setMensaje(resultado.message);
    setTipo('error');
  };

  const vaciar = () => {
    if (window.confirm('¿Quieres vaciar el carrito?')) {
      clearCart();
      setMensaje('');
      setTipo('');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="titulo-seccion">Mi carrito de compras</h1>
      <p id="carritoMensaje" role="status" className={tipo}>
        {mensaje}
        {!user && tipo === 'error' && mensaje.includes('iniciar sesión') && (
          <>
            {' '}
            <Link to="/login">Ir a iniciar sesión</Link>
          </>
        )}
      </p>

      {items.length === 0 ? (
        <div id="carritoVacio" className="carrito-vacio text-center">
          <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
          <h2 className="h4">Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra.</p>
          <Link className="btn btn-success" to="/catalogo">Ir al catálogo</Link>
        </div>
      ) : (
        <div id="carritoContenido" className="row g-4">
          <section className="col-12 col-lg-8">
            <div id="carritoItems">
              {items.map((item) => {
                const limite = limitFor(item.nombre);
                return (
                  <div className="carrito-item" key={item.nombre}>
                    <img
                      src={imagenDe(item.nombre)}
                      alt={item.nombre}
                      onError={(evento) => {
                        evento.currentTarget.onerror = null;
                        evento.currentTarget.src = FALLBACK;
                      }}
                    />
                    <div className="carrito-item-info">
                      <h2>{item.nombre}</h2>
                      <small>{formatPrice(item.precio)} c/u</small>
                      {item.cantidad >= limite && <span className="carrito-aviso">Máximo disponible</span>}
                    </div>
                    <div className="carrito-cantidad">
                      <button
                        type="button"
                        disabled={item.cantidad <= 1}
                        onClick={() => updateQty(item.nombre, item.cantidad - 1)}
                        aria-label={`Quitar una unidad de ${item.nombre}`}
                      >
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        type="button"
                        disabled={item.cantidad >= limite}
                        onClick={() => updateQty(item.nombre, item.cantidad + 1)}
                        aria-label={`Agregar una unidad de ${item.nombre}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="carrito-subtotal">{formatPrice(item.precio * item.cantidad)}</div>
                    <button
                      type="button"
                      className="carrito-eliminar"
                      onClick={() => removeProduct(item.nombre)}
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>
            <button type="button" className="btn btn-link carrito-vaciar" id="btnVaciarCarrito" onClick={vaciar}>
              Vaciar carrito
            </button>
          </section>

          <aside className="col-12 col-lg-4">
            <div className="carrito-resumen">
              <div className="carrito-fila">
                <span>Subtotal</span>
                <strong id="resumenSubtotal">{formatPrice(summary.subtotal)}</strong>
              </div>

              {summary.cupon && (
                <div className="carrito-fila carrito-descuento" id="filaDescuento">
                  <span id="etiquetaDescuento">Cupón {summary.cupon} (-{summary.porcentaje}%)</span>
                  <strong id="resumenDescuento">-{formatPrice(summary.descuento)}</strong>
                </div>
              )}

              <div className="carrito-fila carrito-total">
                <span>TOTAL</span>
                <strong id="resumenTotal">{formatPrice(summary.total)}</strong>
              </div>

              <label htmlFor="cuponInput">Cupón de descuento</label>
              <div className="input-group">
                <input
                  id="cuponInput"
                  maxLength={20}
                  className="form-control"
                  placeholder="AUTOCARE10 / DUOC15"
                  value={cuponTexto}
                  onChange={(evento) => setCuponTexto(evento.target.value)}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter') aplicar();
                  }}
                />
                <button type="button" className="btn btn-outline-light" id="btnAplicarCupon" onClick={aplicar}>
                  APLICAR
                </button>
              </div>
              <p id="cuponMensaje" role="status" className={coupon ? 'text-success small' : 'small'}>
                {coupon ? `Cupón activo: ${coupon}` : ''}
              </p>

              <button type="button" className="btn btn-success w-100" id="btnPagar" onClick={pagar}>
                PAGAR
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
