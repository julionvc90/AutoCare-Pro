import { useState } from "react";
import { Link } from "react-router-dom";
import { CUPONES } from "../data/usuarios";
import { formatearPrecio, leerStorage } from "../utils/formato";

// Página del carrito. Todo lo que recibe viene de App por props.
export default function Carrito({ carrito, usuario, onCambiarCantidad, onQuitar, onVaciar }) {
  const [codigo, setCodigo] = useState("");
  const [cupon, setCupon] = useState(null);          // { codigo, porcentaje } o null
  const [mensajeCupon, setMensajeCupon] = useState("");
  const [mensaje, setMensaje] = useState(null);      // mensaje general (pago)

  // ----- Totales -----
  const subtotal = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const descuento = cupon ? Math.round(subtotal * cupon.porcentaje / 100) : 0;
  const total = subtotal - descuento;

  function aplicarCupon() {
    const texto = codigo.trim().toUpperCase();
    if (CUPONES[texto]) {
      setCupon({ codigo: texto, porcentaje: CUPONES[texto] });
      setMensajeCupon(`Cupón aplicado: ${CUPONES[texto]}% de descuento.`);
      setCodigo("");
    } else {
      setMensajeCupon("El cupón no es válido.");
    }
  }

  function pagar() {
    // Para pagar hay que haber iniciado sesión
    if (!usuario) {
      setMensaje({ tipo: "error", texto: <>Debes iniciar sesión para pagar. <Link to="/login">Ir a iniciar sesión</Link></> });
      return;
    }

    // Guardamos la orden en localStorage
    const orden = { id: "OC-" + Date.now(), cliente: usuario.correo, items: carrito, total, estado: "Pendiente" };
    const ordenes = leerStorage("ordenes", []);
    ordenes.push(orden);
    localStorage.setItem("ordenes", JSON.stringify(ordenes));

    onVaciar();
    setCupon(null);
    setMensajeCupon("");
    setMensaje({ tipo: "exito", texto: `¡Compra realizada! Tu número de orden es ${orden.id}. Total pagado: $${formatearPrecio(total)}.` });
  }

  return (
    <main className="container seccion-espaciada">
      <h1 className="titulo-seccion">Mi carrito de compras</h1>

      {mensaje && <p className={"mb-3 " + mensaje.tipo}>{mensaje.texto}</p>}

      {/* Condicional: carrito vacío o carrito con productos */}
      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <i className="fa-solid fa-cart-shopping fa-3x mb-3"></i>
          <h2 className="h4">Tu carrito está vacío</h2>
          <p>Agrega productos desde el catálogo para verlos aquí.</p>
          <Link to="/catalogo" className="btn btn-success">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="row g-4">
          <section className="col-12 col-lg-8">
            {carrito.map(item => (
              <article className="carrito-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <div className="carrito-item-info">
                  <h2 className="h6 mb-1">{item.nombre}</h2>
                  <small>${formatearPrecio(item.precio)} c/u</small>
                </div>
                <div className="carrito-cantidad">
                  {/* disabled: el botón se bloquea en el mínimo (1) y en el máximo (stock) */}
                  <button type="button" disabled={item.cantidad <= 1} onClick={() => onCambiarCantidad(item.id, item.cantidad - 1)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{item.cantidad}</span>
                  <button type="button" disabled={item.cantidad >= item.stock} onClick={() => onCambiarCantidad(item.id, item.cantidad + 1)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <strong className="carrito-subtotal">${formatearPrecio(item.precio * item.cantidad)}</strong>
                <button type="button" className="carrito-eliminar" onClick={() => onQuitar(item.id)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </article>
            ))}
            <button type="button" className="btn btn-link carrito-vaciar" onClick={() => confirm("¿Quieres vaciar el carrito?") && onVaciar()}>
              <i className="fa-solid fa-trash"></i> Vaciar carrito
            </button>
          </section>

          <aside className="col-12 col-lg-4">
            <div className="carrito-resumen">
              <div className="carrito-fila"><span>Subtotal</span><span>${formatearPrecio(subtotal)}</span></div>
              {cupon && (
                <div className="carrito-fila carrito-descuento">
                  <span>Cupón {cupon.codigo} (-{cupon.porcentaje}%)</span>
                  <span>-${formatearPrecio(descuento)}</span>
                </div>
              )}
              <div className="carrito-fila carrito-total"><span>TOTAL:</span><strong>${formatearPrecio(total)}</strong></div>

              <label htmlFor="cupon" className="form-label mt-4 mb-1 small">Ingrese el cupón de descuento</label>
              <div className="input-group">
                <input type="text" id="cupon" className="form-control" placeholder="Ej: AUTOCARE10"
                  value={codigo} onChange={e => setCodigo(e.target.value)} />
                <button type="button" className="btn btn-outline-light" onClick={aplicarCupon}>APLICAR</button>
              </div>
              <p className="small mt-2 mb-0">{mensajeCupon}</p>

              <button type="button" className="btn btn-success w-100 fw-bold mt-4" onClick={pagar}>PAGAR</button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
