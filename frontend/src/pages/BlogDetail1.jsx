// BlogDetail1: articulo sobre el cambio de aceite.
import { Link } from 'react-router-dom';
import ProductosMencionados from '../components/ProductosMencionados';

export default function BlogDetail1() {
  return (
    <>
      <article className="articulo container mt-4">
        <span className="blog-etiqueta">Mantenimiento</span>
        <h1>Cambio de aceite: cuándo y cada cuánto</h1>
        <p className="articulo-meta">
          <time dateTime="2026-09-10">10 de septiembre de 2026</time> · 4 min de lectura
        </p>

        <figure className="articulo-portada">
          <img src="/IMG/aceite-5w30.jpg" alt="Aceite de motor" />
        </figure>

        <p className="articulo-intro">
          El aceite lubrica, limpia y enfría el motor. Cuando se degrada, pierde esas propiedades y el motor
          empieza a sufrir. La frecuencia del cambio depende del tipo de aceite y del uso del vehículo.
        </p>

        <h2>Los intervalos según el tipo de aceite</h2>
        <p>
          Como referencia general, estos son los rangos que suelen recomendar los fabricantes para un uso
          mixto en ciudad y carretera:
        </p>
        <table className="table table-dark table-bordered align-middle articulo-tabla">
          <thead>
            <tr>
              <th>Tipo de aceite</th>
              <th>Intervalo recomendado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mineral</td>
              <td>3.000 – 5.000 km</td>
            </tr>
            <tr>
              <td>Semisintético</td>
              <td>5.000 – 7.500 km</td>
            </tr>
            <tr>
              <td>Sintético</td>
              <td>7.500 – 10.000 km</td>
            </tr>
          </tbody>
        </table>

        <h2>Cuándo conviene cambiarlo antes</h2>
        <p>
          Si haces trayectos cortos frecuentes, manejas en tacos o el clima es muy frío, el aceite se degrada
          más rápido. En esos casos conviene adelantar el cambio aunque no hayas llegado al kilometraje.
        </p>

        <h2>Cómo revisar el nivel de aceite</h2>
        <ol>
          <li>Estaciona el vehículo en una superficie plana y con el motor frío.</li>
          <li>Retira la varilla y límpiala con un paño que no deje pelusas.</li>
          <li>Vuelve a introducirla hasta el fondo y retírala.</li>
          <li>El nivel debe estar entre las marcas mínima y máxima.</li>
        </ol>

        <h2>No olvides el filtro</h2>
        <p>
          El filtro de aceite retiene partículas que dañarían el motor. Cámbialo junto con el aceite: es una
          pieza económica y marcará la diferencia en la vida útil del motor.
        </p>

        <p className="articulo-nota">
          Consejo AutoCare: revisa el manual del propietario. Los intervalos varían según el fabricante, el
          motor y el tipo de conducción.
        </p>

        <nav className="articulo-navegacion">
          <Link to="/blogs">Volver a Blogs</Link>
          <Link to="/blogs/lavado-sin-danar">Siguiente: Lavado sin dañar la pintura</Link>
        </nav>
      </article>

      <ProductosMencionados ids={[1, 2, 3]} />
    </>
  );
}
