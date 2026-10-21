import { Link } from 'react-router-dom';
import ProductosMencionados from '../components/ProductosMencionados';

export default function BlogDetail2() {
  return (
    <>
      <article className="articulo container mt-4">
        <span className="blog-etiqueta">Detailing</span>
        <h1>Lavado sin dañar la pintura</h1>
        <p className="articulo-meta">
          <time dateTime="2026-09-17">17 de septiembre de 2026</time> · 5 min de lectura
        </p>

        <figure className="articulo-portada articulo-portada-contain">
          <img src="/IMG/kit-limpieza.jpg" alt="Kit de limpieza para auto" />
        </figure>

        <p className="articulo-intro">
          Lavar el auto parece simple, pero una mala técnica deja micro-rayas que con el tiempo opacan la
          pintura. Con los productos correctos y un poco de método puedes mantener el brillo por años.
        </p>

        <h2>Paso a paso</h2>
        <ol>
          <li>Trabaja a la sombra y con la carrocería fría.</li>
          <li>Enjuaga con abundante agua para retirar polvo y arena.</li>
          <li>Usa un shampoo de pH neutro con cera incorporada.</li>
          <li>Lava de arriba hacia abajo y por secciones.</li>
          <li>No reutilices el mismo paño para la carrocería y las llantas.</li>
          <li>Enjuaga por completo antes de que el shampoo se seque.</li>
          <li>Seca con paños de microfibra, sin frotar con fuerza.</li>
          <li>Aplica el limpiador de llantas aparte y enjuaga al final.</li>
        </ol>

        <h2>Errores comunes que dañan la pintura</h2>
        <ul>
          <li>Usar esponjas viejas o paños que arrastran arena.</li>
          <li>Lavar bajo el sol directo con la pintura caliente.</li>
          <li>Dejar secar el shampoo sobre la carrocería.</li>
          <li>Frotar en círculos con fuerza sobre la suciedad.</li>
        </ul>

        <p className="articulo-nota">
          Consejo AutoCare: invierte en paños de microfibra y en un shampoo con cera. Rinden muchas
          aplicaciones y protegen la pintura.
        </p>

        <nav className="articulo-navegacion">
          <Link to="/blogs/cambio-de-aceite">Anterior: Cambio de aceite</Link>
          <Link to="/blogs">Volver a Blogs</Link>
        </nav>
      </article>

      <ProductosMencionados ids={[4, 5, 6]} />
    </>
  );
}
