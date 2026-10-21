import { useState } from "react";

// Datos de los artículos (un arreglo de objetos)
const ARTICULOS = [
  {
    id: 1,
    etiqueta: "Mantenimiento",
    titulo: "¿Cada cuántos kilómetros debes cambiar el aceite del motor?",
    resumen: "Te explicamos los intervalos recomendados según el tipo de aceite y uso del vehículo.",
    imagen: "/IMG/kit-mantenimiento.jpg",
    contenido: [
      "El aceite lubrica, enfría y limpia las piezas internas del motor. Con el tiempo pierde sus propiedades.",
      "Aceite mineral: cada 3.000 a 5.000 km. Semisintético: cada 5.000 a 7.500 km. Sintético: cada 7.500 a 10.000 km.",
      "Cada cambio de aceite debe ir con un filtro de aceite nuevo. El manual del fabricante siempre tiene la última palabra."
    ]
  },
  {
    id: 2,
    etiqueta: "Detailing",
    titulo: "Cómo lavar tu auto sin dañar la pintura: Guía paso a paso",
    resumen: "Consejos de detailing profesional para un lavado seguro y efectivo.",
    imagen: "/IMG/kit-limpieza.jpg",
    contenido: [
      "Lava a la sombra y con la carrocería fría. Prelava con agua para retirar el polvo suelto.",
      "Limpia primero las llantas, usa el método de dos baldes y lava de arriba hacia abajo con movimientos rectos.",
      "Seca con microfibra y aplica cera cada dos o tres meses para proteger la pintura."
    ]
  }
];

export default function Blogs() {
  // abierto guarda el id del artículo que se está leyendo (o null si ninguno)
  const [abierto, setAbierto] = useState(null);

  function alternar(id) {
    // si ya estaba abierto lo cerramos; si no, lo abrimos
    setAbierto(abierto === id ? null : id);
  }

  return (
    <main className="container seccion-espaciada">
      <header className="page-header mb-5">
        <div className="page-header-content">
          <i className="fa-solid fa-newspaper page-header-icon"></i>
          <h1 className="titulo-seccion mb-0">Noticias importantes</h1>
          <p className="page-header-subtitle">Consejos y datos útiles para mantener tu vehículo en óptimo estado</p>
        </div>
      </header>

      {ARTICULOS.map(articulo => (
        <article className="blog-destacado" key={articulo.id}>
          <div className="row g-0">
            <div className="col-12 col-lg-6 blog-texto">
              <span className="blog-etiqueta">{articulo.etiqueta}</span>
              <h2>{articulo.titulo}</h2>
              <p>{articulo.resumen}</p>

              {/* && : solo muestra el contenido si este artículo está abierto */}
              {abierto === articulo.id && articulo.contenido.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}

              <button type="button" className="btn btn-success fw-bold" onClick={() => alternar(articulo.id)}>
                {abierto === articulo.id ? "Cerrar artículo" : "Leer artículo"}
              </button>
            </div>
            <div className="col-12 col-lg-6 blog-imagen">
              <img src={articulo.imagen} alt={articulo.titulo} />
            </div>
          </div>
        </article>
      ))}
    </main>
  );
}
