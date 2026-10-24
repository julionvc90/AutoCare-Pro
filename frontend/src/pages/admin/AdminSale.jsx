// AdminSale: registra una venta y genera la boleta.
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import { CUPONES, calcularResumen, crearOrden } from '../../utils/cart';
import { formatPrice } from '../../utils/format';
import { readJSON, writeJSON } from '../../utils/storage';

const CLIENTE_INICIAL = { nombre: '', correo: '', rut: '', telefono: '', direccion: '' };

export default function AdminSale() {
  const { products } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(CLIENTE_INICIAL);
  const [items, setItems] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('1');
  const [cupon, setCupon] = useState('');
  const [error, setError] = useState('');

  const codigoCupon = cupon.trim().toUpperCase();
  const resumen = useMemo(() => calcularResumen(items, codigoCupon), [items, codigoCupon]);

  const cambiarCliente = (campo, valor) => {
    setCliente((previo) => ({ ...previo, [campo]: valor }));
  };

  const stockDe = (id) => products.find((producto) => producto.id === id)?.stock ?? 10;

  const agregar = () => {
    const producto = products.find((item) => item.id === Number(productoId));
    if (!producto) {
      setError('Selecciona un producto.');
      return;
    }

    const cantidadNumero = Number(cantidad);
    if (!Number.isInteger(cantidadNumero) || cantidadNumero < 1) {
      setError('La cantidad debe ser un número entero mayor a 0.');
      return;
    }

    setError('');
    setItems((previos) => {
      const existente = previos.find((item) => item.id === producto.id);
      const actual = existente ? existente.cantidad : 0;
      const final = Math.min(actual + cantidadNumero, producto.stock);

      if (final <= actual) return previos;
      if (existente) {
        return previos.map((item) => (item.id === producto.id ? { ...item, cantidad: final } : item));
      }
      return [...previos, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: final }];
    });
    setCantidad('1');
  };

  const cambiarCantidad = (id, delta) => {
    setItems((previos) =>
      previos.map((item) => {
        if (item.id !== id) return item;
        const cantidadFinal = Math.max(1, Math.min(item.cantidad + delta, stockDe(id)));
        return { ...item, cantidad: cantidadFinal };
      }),
    );
  };

  const eliminar = (id) => {
    setItems((previos) => previos.filter((item) => item.id !== id));
  };

  const vender = () => {
    if (!cliente.nombre.trim()) {
      setError('Ingresa el nombre del cliente.');
      return;
    }
    if (items.length === 0) {
      setError('Agrega al menos un producto a la venta.');
      return;
    }
    if (codigoCupon && !CUPONES[codigoCupon]) {
      setError('El cupón no es válido.');
      return;
    }

    const orden = crearOrden(items, { ...cliente, vendedor: user.nombre }, codigoCupon || null, 'vendedor');
    const guardadas = readJSON('ordenes', []);
    writeJSON('ordenes', [...(Array.isArray(guardadas) ? guardadas : []), orden]);
    navigate(`/boleta/${orden.id}`);
  };

  return (
    <>
      <section className="admin-card">
        <h2 className="h5 mb-3">Datos del cliente</h2>
        <div className="venta-grid">
          <div>
            <label className="form-label" htmlFor="ventaNombre">Nombre*</label>
            <input
              id="ventaNombre"
              className="form-control"
              value={cliente.nombre}
              onChange={(evento) => cambiarCliente('nombre', evento.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="ventaCorreo">Correo</label>
            <input
              id="ventaCorreo"
              type="email"
              className="form-control"
              value={cliente.correo}
              onChange={(evento) => cambiarCliente('correo', evento.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="ventaRut">RUT</label>
            <input
              id="ventaRut"
              className="form-control"
              value={cliente.rut}
              onChange={(evento) => cambiarCliente('rut', evento.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="ventaTelefono">Teléfono</label>
            <input
              id="ventaTelefono"
              className="form-control"
              value={cliente.telefono}
              onChange={(evento) => cambiarCliente('telefono', evento.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="ventaDireccion">Dirección</label>
            <input
              id="ventaDireccion"
              className="form-control"
              value={cliente.direccion}
              onChange={(evento) => cambiarCliente('direccion', evento.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="admin-card">
        <h2 className="h5 mb-3">Productos de la venta</h2>

        <div className="venta-agregar">
          <select
            className="form-select"
            value={productoId}
            onChange={(evento) => setProductoId(evento.target.value)}
            aria-label="Producto"
          >
            <option value="">— Selecciona un producto —</option>
            {products.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre} ({formatPrice(producto.precio)})
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            className="form-control"
            value={cantidad}
            onChange={(evento) => setCantidad(evento.target.value)}
            aria-label="Cantidad"
          />
          <button type="button" className="btn btn-success" onClick={agregar}>Agregar</button>
        </div>

        {items.length === 0 ? (
          <p className="text-secondary">Aún no hay productos en la venta.</p>
        ) : (
          <ul className="venta-items">
            {items.map((item) => (
              <li className="venta-item" key={item.id}>
                <span>{item.nombre}</span>
                <div className="venta-cantidad">
                  <button type="button" onClick={() => cambiarCantidad(item.id, -1)} aria-label="Quitar una unidad">−</button>
                  <span>{item.cantidad}</span>
                  <button type="button" onClick={() => cambiarCantidad(item.id, 1)} aria-label="Agregar una unidad">+</button>
                </div>
                <span>{formatPrice(item.precio * item.cantidad)}</span>
                <button type="button" className="carrito-eliminar" onClick={() => eliminar(item.id)}>Quitar</button>
              </li>
            ))}
          </ul>
        )}

        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label" htmlFor="ventaCupon">Cupón (opcional)</label>
            <input
              id="ventaCupon"
              className="form-control"
              value={cupon}
              onChange={(evento) => setCupon(evento.target.value)}
              placeholder="AUTOCARE10 / DUOC15"
            />
          </div>
          <div className="col-12 col-md-8">
            <div className="venta-totales">
              <div>
                <span>Subtotal</span>
                <span>{formatPrice(resumen.subtotal)}</span>
              </div>
              <div>
                <span>Descuento</span>
                <span>-{formatPrice(resumen.descuento)}</span>
              </div>
              <div className="venta-total">
                <span>Total</span>
                <strong>{formatPrice(resumen.total)}</strong>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-warning mt-3">{error}</div>}

        <button type="button" className="btn btn-success mt-3" onClick={vender}>
          Registrar venta y ver boleta
        </button>
      </section>
    </>
  );
}
