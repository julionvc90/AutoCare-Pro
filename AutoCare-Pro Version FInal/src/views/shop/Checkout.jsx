import React, { useState } from 'react';

const Checkout = ({ carrito = [], total = 0, procesarPago }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (procesarPago) {
      procesarPago(form);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Carrito de Compra - Finalizar Pago</h2>
      
      <div className="row">
        {/* Resumen del Pedido */}
        <div className="col-md-12 mb-4">
          <div className="card p-3 shadow-sm">
            <h4>Detalle del Pedido</h4>
            <ul className="list-group list-group-flush mb-3">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.nombre} (x{item.cantidad})
                  <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-end text-success">Total a pagar: ${total.toLocaleString()}</h4>
          </div>
        </div>

        {/* Formulario de Pago y Despacho */}
        <div className="col-md-12">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <h4 className="mb-3">Información del Cliente</h4>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre *</label>
                <input type="text" name="nombre" className="form-control" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos *</label>
                <input type="text" name="apellidos" className="form-control" required onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label className="form-label">Correo electrónico *</label>
                <input type="email" name="correo" className="form-control" required onChange={handleChange} />
              </div>
            </div>

            <h4 className="mb-3">Dirección de Entrega</h4>
            <div className="row g-3 mb-3">
              <div className="col-md-8">
                <label className="form-label">Calle y Número *</label>
                <input type="text" name="calle" className="form-control" required onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Depto / Casa (Opcional)</label>
                <input type="text" name="depto" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Región *</label>
                <select name="region" className="form-select" onChange={handleChange} value={form.region}>
                  <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Comuna *</label>
                <select name="comuna" className="form-select" onChange={handleChange} value={form.comuna}>
                  <option value="Cerrillos">Cerrillos</option>
                  <option value="Maipú">Maipú</option>
                  <option value="Santiago">Santiago</option>
                  <option value="La Florida">La Florida</option>
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Indicaciones de entrega</label>
                <textarea name="indicaciones" className="form-control" rows="2" onChange={handleChange}></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100">
              Pagar ahora ${total.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;