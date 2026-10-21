import { useProducts } from '../context/ProductsContext';
import ProductCard from './ProductCard';

export default function ProductosMencionados({ ids, titulo = 'Productos mencionados' }) {
  const { products } = useProducts();
  const lista = ids.map((id) => products.find((producto) => producto.id === id)).filter(Boolean);

  if (lista.length === 0) return null;

  return (
    <section className="seccion-espaciada container mt-5">
      <h2 id="titulo-productos-blog" className="titulo-seccion">{titulo}</h2>
      <div id="productosBlog" className="row g-4" data-productos={ids.join(',')}>
        {lista.map((producto) => (
          <ProductCard key={producto.id} product={producto} />
        ))}
      </div>
    </section>
  );
}
