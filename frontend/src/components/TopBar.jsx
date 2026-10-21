import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function TopBar() {
  const { count, toggleCart, isOpen } = useCart();
  const { user, esPersonal, logout } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="top-bar-actions">
      <div className="container d-flex justify-content-end align-items-center gap-3">
        {user ? (
          <>
            <span className="btn-top-login">
              <i className="fa-solid fa-user" aria-hidden="true" /> <span className="top-label">{user.nombre}</span>
            </span>
            {esPersonal && (
              <Link className="btn-top-login" to="/admin/home">
                Panel
              </Link>
            )}
            <button type="button" className="btn-top-login" onClick={salir}>
              Salir
            </button>
          </>
        ) : (
          <Link className="btn-top-login" to="/login">
            <i className="fa-solid fa-user" aria-hidden="true" /> <span className="top-label">Iniciar Sesión</span>
          </Link>
        )}

        <button
          type="button"
          className="btn-top-cart"
          id="btnCarrito"
          aria-expanded={isOpen}
          aria-controls="panelCarrito"
          onClick={toggleCart}
        >
          <i className="fa-solid fa-cart-shopping" aria-hidden="true" /> <span className="top-label">Carrito</span>
          <span className="cart-badge" id="contadorCarrito">
            {count}
          </span>
        </button>
      </div>
    </div>
  );
}
