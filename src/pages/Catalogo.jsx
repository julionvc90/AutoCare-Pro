import { Link, useSearchParams } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import { NOMBRES_CATEGORIAS } from "../data/productos";

// Catálogo de productos, con filtro opcional por categoría.
export default function Catalogo({ productos, onComprar }) {
  // Lee lo que viene después del "?" de la URL. Ej: /catalogo?cat=aceites
  const [params] = useSearchParams();
  const categoria = params.get("cat");

  // Si hay categoría filtramos; si no, mostramos todos los productos
  const lista = categoria ? productos.filter(p => p.categoria === categoria) : productos;

  const titulo = NOMBRES_CATEGORIAS[categoria]
    ? "Productos: " + NOMBRES_CATEGORIAS[categoria]
    : "Productos para mantenimiento preventivo";

  return (
    <>
      <section className="container seccion-espaciada">
        <h2 className="titulo-seccion">Categorías</h2>
        <div className="row g-4">
          {/* Object.keys devuelve ["aceites", "detailing", ...] y map dibuja cada categoría */}
          {Object.keys(NOMBRES_CATEGORIAS).map(clave => (
            <div className="col-6 col-md-3" key={clave}>
              <Link to={"/catalogo?cat=" + clave} className="categoria-box">
                <span>{NOMBRES_CATEGORIAS[clave]}</span>
              </Link>
            </div>
          ))}
        </div>
        {categoria && (
          <div className="text-center mt-3">
            <Link to="/catalogo" className="btn btn-outline-light btn-sm">Ver todos</Link>
          </div>
        )}
      </section>

      <section className="container mt-5">
        <h2 className="text-white fw-bold mb-4 text-center">{titulo}</h2>
        <div className="row g-4 justify-content-center">
          {lista.map(producto => (
            <TarjetaProducto key={producto.id} producto={producto} onComprar={onComprar} />
          ))}
        </div>
      </section>
    </>
  );
}
