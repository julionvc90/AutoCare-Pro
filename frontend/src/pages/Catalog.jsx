// Catalog: catalogo con buscador, filtros y grilla de productos.
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import SearchBox from '../components/SearchBox';

const ICONOS = {
  aceites: 'fa-oil-can',
  detailing: 'fa-spray-can-sparkles',
  electricidad: 'fa-bolt',
  accesorios: 'fa-screwdriver-wrench',
  motor: 'fa-gears',
  frenos: 'fa-circle-dot',
  carroceria: 'fa-car-side',
};

export default function Catalog() {
  const { products } = useProducts();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

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

  const enviarBusqueda = (texto) => {
    const siguientes = new URLSearchParams(params);
    const limpio = String(texto || '').trim();
    if (limpio) siguientes.set('q', limpio);
    else siguientes.delete('q');
    setParams(siguientes);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="buscador">
          <h2>Buscar Productos</h2>
          <SearchBox
            value={busqueda}
            onChange={setBusqueda}
            onSubmit={enviarBusqueda}
            onSelect={(producto) => navigate(`/producto/${producto.id}`)}
            products={products}
            categories={CATEGORIES}
            inputId="buscadorCatalogo"
            placeholder="Nombre del producto"
          />
        </div>
      </div>

      <section className="container mt-4">
        <div className="row g-4">
          {Object.entries(CATEGORIES).map(([clave, etiqueta]) => (
            <div className="col-12 col-sm-6" key={clave}>
              <button
                type="button"
                className="categoria-box"
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
