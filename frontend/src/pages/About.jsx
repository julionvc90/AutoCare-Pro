// About: informacion de la empresa, mision y vision.
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function About() {
  return (
    <>
      <PageHeader
        icono="fa-building-circle-check"
        titulo="Conoce AutoCare Pro"
        subtitulo="Repuestos automotrices y taller mecánico en Santiago de Chile."
      />

      <section className="container mt-4">
        <div className="info-company-card">
          <span className="info-company-icon">
            <i className="fa-solid fa-circle-info" aria-hidden="true" />
          </span>
          <h2>¿Quiénes somos?</h2>
          <p>
            AutoCare Pro nace de la necesidad de crear una plataforma web completa para una tienda de
            repuestos automotrices y taller mecánico. Nuestro objetivo es entregar una experiencia fluida
            tanto para el cliente que compra o se informa, como para el administrador que gestiona el negocio.
          </p>
          <p>
            Reunimos lubricantes, filtros, productos de detailing y accesorios de seguridad, junto con
            contenido de mantenimiento preventivo para que tu vehículo rinda mejor.
          </p>
        </div>
      </section>

      <section className="container mt-4">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <article className="company-value-card h-100">
              <span className="company-value-icon"><i className="fa-solid fa-bullseye" aria-hidden="true" /></span>
              <h3>Misión</h3>
              <p>Facilitar el cuidado de cada vehículo ofreciendo repuestos confiables y asesoría clara.</p>
            </article>
          </div>
          <div className="col-12 col-md-6">
            <article className="company-value-card h-100">
              <span className="company-value-icon"><i className="fa-solid fa-eye" aria-hidden="true" /></span>
              <h3>Visión</h3>
              <p>Ser la tienda de repuestos y taller de referencia para los conductores de la Región Metropolitana.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container mt-4">
        <div className="company-focus-card">
          <h2>¿A quiénes ayudamos?</h2>
          <div className="row g-4 mt-1">
            <div className="col-12 col-md-4">
              <div className="focus-item">
                <i className="fa-solid fa-car" aria-hidden="true" />
                <h4>Conductores particulares</h4>
                <p>Que quieren mantener su auto al día sin complicaciones.</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="focus-item">
                <i className="fa-solid fa-wrench" aria-hidden="true" />
                <h4>Mecánicos independientes</h4>
                <p>Que necesitan repuestos disponibles y precios claros.</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="focus-item">
                <i className="fa-solid fa-spray-can-sparkles" aria-hidden="true" />
                <h4>Entusiastas del detailing</h4>
                <p>Que buscan productos para dejar su vehículo impecable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-4">
        <div className="company-categories-card">
          <h2>Nuestros productos</h2>
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <Link to="/catalogo?cat=aceites" className="mini-category"><i className="fa-solid fa-oil-can" aria-hidden="true" /><span>Aceites y filtros</span></Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/catalogo?cat=detailing" className="mini-category"><i className="fa-solid fa-spray-can-sparkles" aria-hidden="true" /><span>Detailing y limpieza</span></Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/catalogo?cat=electricidad" className="mini-category"><i className="fa-solid fa-bolt" aria-hidden="true" /><span>Electricidad</span></Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/catalogo?cat=accesorios" className="mini-category"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true" /><span>Accesorios de seguridad</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
