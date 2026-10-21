import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { NOMBRES_CATEGORIAS } from "../data/productos";
import { formatearPrecio } from "../utils/formato";

// Panel simple: solo el ADMINISTRADOR puede agregar y eliminar productos.
// Recibe la lista de productos y la función para cambiarla (viene de App).
export default function AdminProductos({ usuario, productos, onCambiarProductos }) {
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "", categoria: "" });
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState("");

  // useEffect con "limpieza": al entrar a esta página se agrega admin.css y,
  // al salir, se quita (el return es la limpieza). Así no afecta a las otras páginas.
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/admin.css";
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  // Protección: si no es administrador, lo mandamos al login
  if (!usuario || usuario.rol !== "ADMINISTRADOR") {
    return <Navigate to="/login" replace />;
  }

  function alEscribir(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Devuelve un objeto con los errores de cada campo (vacío = todo bien)
  function validar() {
    const e = {};
    if (form.nombre.trim() === "") e.nombre = "El nombre es requerido.";
    else if (form.nombre.length > 100) e.nombre = "Máximo 100 caracteres.";
    if (form.precio === "" || Number(form.precio) < 0) e.precio = "Ingresa un precio válido (0 o más).";
    if (!/^\d+$/.test(form.stock)) e.stock = "El stock debe ser un número entero (0 o más).";
    if (form.categoria === "") e.categoria = "Selecciona una categoría.";
    return e;
  }

  function agregar(e) {
    e.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    // El nuevo id es el mayor id actual + 1
    const nuevoId = productos.reduce((mayor, p) => Math.max(mayor, p.id), 0) + 1;
    const nuevo = {
      id: nuevoId,
      nombre: form.nombre.trim(),
      descripcion: "",
      categoria: form.categoria,
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagen: "/IMG/Logo.png"
    };
    onCambiarProductos([...productos, nuevo]);
    setForm({ nombre: "", precio: "", stock: "", categoria: "" });
    setAviso("Producto creado correctamente.");
  }

  function eliminar(producto) {
    if (!confirm(`¿Eliminar el producto "${producto.nombre}"?`)) return;
    onCambiarProductos(productos.filter(p => p.id !== producto.id));
    setAviso("Producto eliminado correctamente.");
  }

  return (
    <main className="container seccion-espaciada">
      <h1 className="titulo-seccion">Panel de productos</h1>

      {aviso && <div className="alert alert-success">{aviso}</div>}

      <section className="admin-card mb-4">
        <h2 className="h5 mb-3">Nuevo producto</h2>
        <form noValidate onSubmit={agregar}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="nombre">Nombre *</label>
              <input id="nombre" name="nombre" className={"form-control" + (errores.nombre ? " is-invalid" : "")} value={form.nombre} onChange={alEscribir} />
              <div className="invalid-feedback">{errores.nombre}</div>
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="precio">Precio *</label>
              <input id="precio" name="precio" type="number" className={"form-control" + (errores.precio ? " is-invalid" : "")} value={form.precio} onChange={alEscribir} />
              <div className="invalid-feedback">{errores.precio}</div>
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="stock">Stock *</label>
              <input id="stock" name="stock" type="number" className={"form-control" + (errores.stock ? " is-invalid" : "")} value={form.stock} onChange={alEscribir} />
              <div className="invalid-feedback">{errores.stock}</div>
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="categoria">Categoría *</label>
              <select id="categoria" name="categoria" className={"form-select" + (errores.categoria ? " is-invalid" : "")} value={form.categoria} onChange={alEscribir}>
                <option value="">-- Elegir --</option>
                {Object.keys(NOMBRES_CATEGORIAS).map(clave => (
                  <option key={clave} value={clave}>{NOMBRES_CATEGORIAS[clave]}</option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.categoria}</div>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-3">Guardar producto</button>
        </form>
      </section>

      <section className="admin-card">
        <h2 className="h5 mb-3">Productos ({productos.length})</h2>
        <div className="tabla-contenedor">
          <table className="table tabla-admin">
            <thead>
              <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td><img className="mini" src={p.imagen} alt="" /></td>
                  <td>{p.nombre}</td>
                  <td>{NOMBRES_CATEGORIAS[p.categoria]}</td>
                  <td>${formatearPrecio(p.precio)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-danger" aria-label="Eliminar" onClick={() => eliminar(p)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
