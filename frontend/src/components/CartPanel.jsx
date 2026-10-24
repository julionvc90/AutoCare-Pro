// CartPanel: panel desplegable con los productos del carrito.
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export default function CartPanel() {
  const { items, summary, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-panel" id="panelCarrito">
      <div className="cart-panel-header">
        <h2 className="h6">Productos en tu carrito</h2>
        <button type="button" className="cart-close" id="cerrarCarrito" aria-label="Cerrar carrito" onClick={closeCart}>
          ×
        </button>
      </div>

      <div className="cart-list" id="listaCarrito">
        {items.length === 0 ? (
          <p className="cart-empty">El carrito está vacío.</p>
        ) : (
          items.map((item) => (
            <div className="cart-item" key={item.nombre}>
              <div>
                <strong>{item.nombre}</strong>
                <small>
                  {item.cantidad} x {formatPrice(item.precio)}
                </small>
              </div>
              <span>{formatPrice(item.precio * item.cantidad)}</span>
            </div>
          ))
        )}
      </div>

      <div className="cart-panel-footer">
        Total: <strong id="totalCarrito">{formatPrice(summary.total)}</strong>
      </div>

      <Link className="btn btn-success btn-sm w-100 mt-3" to="/carrito" onClick={closeCart}>
        Ver carrito completo
      </Link>
    </div>
  );
}
