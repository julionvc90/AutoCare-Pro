import { useState } from "react";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";

// Página de inicio. Recibe la lista de productos y la función de comprar desde App.
export default function Home({ productos, onComprar }) {
  // Input controlado: lo que se escribe se guarda en "busqueda"
  const [busqueda, setBusqueda] = useState("");

  function buscar() {
    if (busqueda.trim() === "") {
      alert("Por favor ingrese un término de búsqueda.");
      return;
    }
    alert(`Buscando productos relacionados con: "${busqueda.trim()}".`);
  }

  return (
    <>
      <header className="header-banner">
        <img src="/IMG/banner-mecanico.jpg" alt="Mecánico revisando un vehículo" />
        <div className="banner-overlay"></div>
      </header>

      <section className="container mt-5">
        <div className="hero-search text-center">
          <h1 className="fw-bold">Todo para el cuidado de tu vehículo</h1>
          <p className="mb-4">Repuestos, lubricantes, productos de detailing y accesorios de seguridad</p>

          <form className="d-flex justify-content-center" onSubmit={e => e.preventDefault()}>
            <div className="input-group" style={{ maxWidth: "600px" }}>
              <input
                type="search"
                className="form-control form-control-lg"
                placeholder="Buscar repuestos, aceites, accesorios..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <button className="btn btn-success" type="button" onClick={buscar}>
                <i className="fa-solid fa-magnifying-glass"></i> Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="container seccion-espaciada">
        <h2 className="titulo-seccion">Categorías</h2>
        <div className="row g-4">
          <div className="col-6 col-md-3">
            <Link to="/catalogo?cat=aceites" className="categoria-box">
              <i className="fa-solid fa-oil-can fa-2x mb-3"></i><span>Aceites &amp; Filtros</span>
            </Link>
          </div>
          <div className="col-6 col-md-3">
            <Link to="/catalogo?cat=detailing" className="categoria-box">
              <i className="fa-solid fa-soap fa-2x mb-3"></i><span>Detailing &amp; Limpieza</span>
            </Link>
          </div>
          <div className="col-6 col-md-3">
            <Link to="/catalogo?cat=electricidad" className="categoria-box">
              <i className="fa-solid fa-bolt fa-2x mb-3"></i><span>Ampolletas &amp; Electricidad</span>
            </Link>
          </div>
          <div className="col-6 col-md-3">
            <Link to="/catalogo?cat=accesorios" className="categoria-box">
              <i className="fa-solid fa-car-side fa-2x mb-3"></i><span>Accesorios</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="container seccion-espaciada">
        <h2 className="titulo-seccion">Productos destacados</h2>
        <div className="row g-4 justify-content-center">
          {/* slice(0, 4) toma solo los 4 primeros productos de la lista */}
          {productos.slice(0, 4).map(producto => (
            <TarjetaProducto key={producto.id} producto={producto} onComprar={onComprar} />
          ))}
        </div>
      </section>

      <section className="container seccion-espaciada mb-5">
        <h2 className="titulo-seccion">Blog / Noticias</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <article className="card blog-card h-100">
              <div className="card-body">
                <h3 className="card-title h5">¿Cada cuántos kilómetros debes cambiar el aceite del motor?</h3>
                <p className="card-text small mb-3">Te explicamos los intervalos recomendados según el tipo de aceite y uso del vehículo.</p>
                <Link to="/blogs" className="btn btn-sm btn-outline-light">Leer más</Link>
              </div>
            </article>
          </div>
          <div className="col-md-6">
            <article className="card blog-card h-100">
              <div className="card-body">
                <h3 className="card-title h5">Cómo lavar tu auto sin dañar la pintura</h3>
                <p className="card-text small mb-3">Consejos de detailing profesional para un lavado seguro y efectivo.</p>
                <Link to="/blogs" className="btn btn-sm btn-outline-light">Leer más</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
