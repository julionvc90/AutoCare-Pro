import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formato";

// Una tarjeta de producto. Se reutiliza en el inicio, el catálogo y los relacionados.
// Props:
//   producto  -> el objeto con nombre, precio, imagen...
//   onComprar -> función que se ejecuta al presionar "Comprar"
export default function TarjetaProducto({ producto, onComprar }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 border-0 bg-white text-dark shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <Link
          to={"/producto/" + producto.id}
          className="p-3 d-flex align-items-center justify-content-center"
          style={{ height: "160px", backgroundColor: "#f8f9fa" }}
        >
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid" style={{ maxHeight: "100%", objectFit: "contain" }} />
        </Link>
        <div className="card-body d-flex flex-column justify-content-between">
          <h3 className="card-title h5 fw-bold mb-1" style={{ fontSize: "16px" }}>
            <Link to={"/producto/" + producto.id} className="text-dark text-decoration-none">{producto.nombre}</Link>
          </h3>
          <div>
            <p className="fw-bold text-primary h5 mb-2">${formatearPrecio(producto.precio)}</p>
            <button className="btn btn-sm btn-success w-100 fw-bold" type="button" onClick={() => onComprar(producto)}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
