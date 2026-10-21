import { Link } from "react-router-dom";

// Página informativa: solo HTML (JSX), no necesita estado ni props.
export default function Nosotros() {
  return (
    <>
      <header className="page-header container mt-5">
        <div className="page-header-content text-center">
          <i className="fa-solid fa-building-circle-check page-header-icon"></i>
          <h1 className="titulo-seccion mb-0">Conoce AutoCare Pro</h1>
          <p className="page-header-subtitle">Tu aliado para el cuidado y mantenimiento de tu vehículo</p>
        </div>
      </header>

      <main className="container mt-5">
        <section className="info-company-card">
          <div className="info-company-icon"><i className="fa-solid fa-car-side"></i></div>
          <div>
            <h2>¿Quiénes somos?</h2>
            <p>
              AutoCare Pro es una empresa dedicada a la comercialización de repuestos básicos,
              lubricantes, productos de limpieza automotriz y accesorios de seguridad para vehículos.
              Buscamos facilitar el acceso a productos confiables para conductores y mecánicos independientes.
            </p>
          </div>
        </section>

        <section className="row g-4 mt-4">
          <div className="col-md-6">
            <article className="company-value-card h-100">
              <i className="fa-solid fa-bullseye company-value-icon"></i>
              <h3>Misión</h3>
              <p>Proporcionar repuestos, productos de mantenimiento y accesorios automotrices de manera simple y accesible.</p>
            </article>
          </div>
          <div className="col-md-6">
            <article className="company-value-card h-100">
              <i className="fa-solid fa-eye company-value-icon"></i>
              <h3>Visión</h3>
              <p>Ser una tienda automotriz reconocida por su variedad de productos y su atención cercana.</p>
            </article>
          </div>
        </section>

        <section className="company-categories-card mt-4 mb-5 text-center">
          <h2 className="mb-4">Nuestros productos</h2>
          <Link to="/catalogo" className="btn btn-success fw-bold">Ver catálogo</Link>
        </section>
      </main>
    </>
  );
}
