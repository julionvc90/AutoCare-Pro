import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

const FALLBACK = '/IMG/placeholder.svg';

export default function ProductCard({ product, alAgregar }) {
  const { addProduct } = useCart();

  const agregar = () => {
    if (alAgregar) {
      alAgregar(product);
      return;
    }
    addProduct(product, 1);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <article className="card card-producto h-100">
        <div className="card-producto-img">
          <Link to={`/producto/${product.id}`}>
            <img
              src={product.imagen || FALLBACK}
              alt={product.nombre}
              onError={(evento) => {
                evento.currentTarget.onerror = null;
                evento.currentTarget.src = FALLBACK;
              }}
            />
          </Link>
        </div>
        <div className="card-body">
          <h3 className="card-title h5">
            <Link to={`/producto/${product.id}`} className="text-decoration-none text-reset">
              {product.nombre}
            </Link>
          </h3>
          <p className="card-text small">{product.descripcion}</p>
          <p className="precio">{formatPrice(product.precio)}</p>
          <button type="button" className="btn btn-sm btn-outline-success" onClick={agregar}>
            Comprar
          </button>
        </div>
      </article>
    </div>
  );
}
