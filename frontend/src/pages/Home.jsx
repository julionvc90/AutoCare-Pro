import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

const ICONOS = {
  aceites: 'fa-oil-can',
  detailing: 'fa-spray-can-sparkles',
  electricidad: 'fa-bolt',
  accesorios: 'fa-screwdriver-wrench',
};

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [termino, setTermino] = useState('');

  const destacados = products.slice(0, 4);

  const buscar = (evento) => {
    evento.preventDefault();
    const limpio = termino.trim();
    navigate(limpio ? `/catalogo?q=${encodeURIComponent(limpio)}` : '/catalogo');
  };

  return (
    <>
      <header className="header-banner">
        <img src="/IMG/banner-mecanico.jpg" alt="Taller mecánico AutoCare Pro" />
        <div className="banner-overlay" />
      </header>

      <section className="container mt-5">
        <div className="hero-search text-center">
          <h1>Todo para el cuidado de tu vehículo</h1>
          <p>Repuestos, lubricantes, productos de detailing y accesorios de seguridad</p>
          <form onSubmit={buscar}>
            <div className="input-group">
              <label className="visually-hidden" htmlFor="buscador">Buscar productos</label>
              <input
                id="buscador"
                type="search"
                className="form-control form-control-lg"
                placeholder="Buscar productos..."
                value={termino}
                onChange={(evento) => setTermino(evento.target.value)}
              />
              <button className="btn btn-success" type="submit">Buscar</button>
            </div>
          </form>
        </div>
      </section>

      <section className="container mt-5" aria-label="Promociones destacadas">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <article className="banner-kit banner-kit-con-imagen">
              <div className="banner-kit-texto">
                <h2 className="h4">Kit Detailing Completo</h2>
                <p>Shampoo con cera, microfibra y limpiador de llantas en un solo pack.</p>
                <p className="fw-bold">$19.990</p>
                <Link className="btn btn-sm btn-success" to="/catalogo?cat=detailing">Ver kit</Link>
              </div>
              <div className="banner-kit-imagen">
                <img src="/IMG/kit-limpieza.jpg" alt="Kit de detailing" />
              </div>
            </article>
          </div>
          <div className="col-12 col-md-6">
            <article className="banner-kit banner-kit-con-imagen alt">
              <div className="banner-kit-texto">
                <h2 className="h4">Kit Mantenimiento Preventivo</h2>
                <p>Aceite, filtro de aceite y filtro de aire para tu próxima mantención.</p>
                <p className="fw-bold">$34.990</p>
                <Link className="btn btn-sm btn-success" to="/catalogo?cat=aceites">Ver kit</Link>
              </div>
              <div className="banner-kit-imagen">
                <img src="/IMG/kit-mantenimiento.jpg" alt="Kit de mantenimiento" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h2 id="titulo-categorias" className="titulo-seccion">Categorías</h2>
        <div className="row g-4">
          {Object.entries(CATEGORIES).map(([clave, etiqueta]) => (
            <div className="col-6 col-md-3" key={clave}>
              <Link className="categoria-box" to={`/catalogo?cat=${clave}`}>
                <i className={`fa-solid ${ICONOS[clave]}`} aria-hidden="true" />
                <span>{etiqueta}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-5">
        <h2 id="titulo-productos" className="titulo-seccion">Productos para mantenimiento preventivo</h2>
        <div id="contenedorProductos" className="row g-4">
          {destacados.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      </section>

      <section className="container mt-5">
        <h2 id="titulo-blog" className="titulo-seccion">Blog / Noticias</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <article className="card blog-card h-100">
              <div className="card-body">
                <span className="blog-etiqueta">Mantenimiento</span>
                <h3 className="card-title h5">Cambio de aceite: cuándo y cada cuánto</h3>
                <p className="card-text small">Aprende a identificar el momento ideal para cambiar el aceite de tu motor.</p>
                <Link className="btn btn-sm btn-outline-light" to="/blogs/cambio-de-aceite">Leer más</Link>
              </div>
            </article>
          </div>
          <div className="col-12 col-md-6">
            <article className="card blog-card h-100">
              <div className="card-body">
                <span className="blog-etiqueta">Detailing</span>
                <h3 className="card-title h5">Lavado sin dañar la pintura</h3>
                <p className="card-text small">Técnicas y productos para lavar tu auto sin dejar micro-rayas.</p>
                <Link className="btn btn-sm btn-outline-light" to="/blogs/lavado-sin-danar">Leer más</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="container text-center mt-4">
        <Link to="/nosotros">
          <img src="/IMG/SobreNosotros.png" alt="Conoce AutoCare Pro" style={{ width: '50%' }} />
        </Link>
      </div>
    </>
  );
}
