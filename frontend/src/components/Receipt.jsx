// Receipt: boleta con datos del cliente, productos y totales.
import { formatPrice } from '../utils/format';

export default function Receipt({ orden }) {
  if (!orden) return null;

  const fecha = orden.fecha ? new Date(orden.fecha).toLocaleString('es-CL') : '—';

  return (
    <article className="boleta">
      <header className="boleta-header">
        <div>
          <p className="boleta-marca">AUTOCARE PRO</p>
          <h1>Boleta de venta</h1>
        </div>
        <div className="boleta-folio">
          <span>N° {orden.id}</span>
          <span>{fecha}</span>
        </div>
      </header>

      <section className="boleta-cliente">
        <h2>Datos del cliente</h2>
        <p><strong>Nombre:</strong> {orden.cliente || '—'}</p>
        {orden.rut && <p><strong>RUT:</strong> {orden.rut}</p>}
        {orden.correo && <p><strong>Correo:</strong> {orden.correo}</p>}
        {orden.telefono && <p><strong>Teléfono:</strong> {orden.telefono}</p>}
        {orden.direccion && <p><strong>Dirección:</strong> {orden.direccion}</p>}
      </section>

      <table className="table boleta-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {(orden.items || []).map((item, indice) => (
            <tr key={`${item.nombre}-${indice}`}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>{formatPrice(item.precio)}</td>
              <td>{formatPrice(item.precio * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="boleta-totales">
        <div>
          <span>Subtotal</span>
          <span>{formatPrice(orden.subtotal)}</span>
        </div>
        {orden.cupon && (
          <div>
            <span>Cupón {orden.cupon}</span>
            <span>-{formatPrice(orden.descuento)}</span>
          </div>
        )}
        <div className="boleta-total">
          <span>Total</span>
          <strong>{formatPrice(orden.total)}</strong>
        </div>
      </div>

      <footer className="boleta-pie">
        <p>Gracias por su compra. Conserve esta boleta.</p>
        <p>
          {orden.origen === 'vendedor'
            ? `Venta registrada por ${orden.vendedor || 'vendedor'}`
            : 'Compra realizada en línea'}
        </p>
      </footer>

      <div className="boleta-acciones">
        <button type="button" className="btn btn-success" onClick={() => window.print()}>
          Imprimir boleta
        </button>
      </div>
    </article>
  );
}
