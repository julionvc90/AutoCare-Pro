import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

const ICONOS = {
  aceites: 'fa-oil-can',
  detailing: 'fa-spray-can-sparkles',
  electricidad: 'fa-bolt',
  accesorios: 'fa-screwdriver-wrench',
};

export default function Catalog() {
  const { products } = useProducts();
  const [params, setParams] = useSearchParams();

  const categoria = params.get('cat') || '';
  const consulta = params.get('q') || '';
  const [busqueda, setBusqueda] = useState(consulta);

  const filtrados = products.filter((producto) => {
    const coincideCategoria = !categoria || producto.categoria === categoria;
    const coincideTexto =
      !consulta || producto.nombre.toLowerCase().includes(consulta.toLowerCase());
    return coincideCategoria && coincideTexto;
  });

  const titulo = consulta
    ? `Resultados para "${consulta}"`
    : categoria && CATEGORIES[categoria]
      ? `Productos: ${CATEGORIES[categoria]}`
      : 'Productos';

  const cambiarCategoria = (clave) => {
    const siguientes = new URLSearchParams(params);
    if (clave) siguientes.set('cat', clave);
    else siguientes.delete('cat');
    setParams(siguientes);
  };

  const enviarBusqueda = (evento) => {
    evento.preventDefault();
    const siguientes = new URLSearchParams(params);
    const limpio = busqueda.trim();
    if (limpio) siguientes.set('q', limpio);
    else siguientes.delete('q');
    setParams(siguientes);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="buscador">
          <h2>Buscar Productos</h2>
          <form onSubmit={enviarBusqueda} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del producto"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              aria-label="Nombre del producto"
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>

      <section className="container mt-4">
        <div className="row g-4">
          {Object.entries(CATEGORIES).map(([clave, etiqueta]) => (
            <div className="col-6 col-md-3" key={clave}>
              <button
                type="button"
                className="categoria-box w-100 border-0"
                onClick={() => cambiarCategoria(categoria === clave ? '' : clave)}
                aria-pressed={categoria === clave}
              >
                <i className={`fa-solid ${ICONOS[clave]}`} aria-hidden="true" />
                <span>{etiqueta}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-5">
        <h2 id="titulo-productos" className="text-white fw-bold">{titulo}</h2>
        <div id="contenedorProductos" className="row g-4 justify-content-center">
          {filtrados.length === 0 ? (
            <p className="text-center">No se encontraron productos.</p>
          ) : (
            filtrados.map((producto) => <ProductCard key={producto.id} product={producto} />)
          )}
        </div>
      </section>
    </>
  );
}
