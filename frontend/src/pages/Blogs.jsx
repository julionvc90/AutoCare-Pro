// Blogs: listado de articulos del blog.
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function Blogs() {
  return (
    <>
      <PageHeader
        icono="fa-newspaper"
        titulo="Noticias importantes"
        subtitulo="Consejos de mantenimiento y detailing para tu vehículo."
      />

      <section className="container">
        <article className="blog-destacado" id="blog1">
          <div className="row g-0 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="blog-texto">
                <span className="blog-etiqueta">Mantenimiento</span>
                <h2>Cambio de aceite: cuándo y cada cuánto</h2>
                <p>
                  El aceite es la sangre del motor. Conocer los intervalos según el tipo de aceite te ayuda a
                  evitar desgastes prematuros y a mantener el rendimiento de tu vehículo.
                </p>
                <Link className="btn btn-success fw-bold" to="/blogs/cambio-de-aceite">Leer artículo</Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="blog-imagen">
                <img src="/IMG/aceite-5w30.jpg" alt="Cambio de aceite" />
              </div>
            </div>
          </div>
        </article>

        <article className="blog-destacado mt-5" id="blog2">
          <div className="row g-0 align-items-center flex-lg-row-reverse">
            <div className="col-12 col-lg-6">
              <div className="blog-texto">
                <span className="blog-etiqueta">Detailing</span>
                <h2>Lavado sin dañar la pintura</h2>
                <p>
                  Un lavado mal ejecutado deja micro-rayas que opacan la pintura. Te mostramos el paso a paso y
                  los errores más comunes para cuidar el brillo de tu auto.
                </p>
                <Link className="btn btn-success fw-bold" to="/blogs/lavado-sin-danar">Leer artículo</Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="blog-imagen blog-imagen-contain">
                <img src="/IMG/kit-limpieza.jpg" alt="Lavado de auto" />
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
