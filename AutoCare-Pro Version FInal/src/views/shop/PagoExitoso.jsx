import React from 'react';

const PagoExitoso = ({ orden, volverInicio }) => {
  return (
    <div className="container my-5 text-center">
      <div className="alert alert-success p-4 shadow-sm">
        <h2 className="alert-heading">✓ ¡Se ha realizado la compra exitosamente!</h2>
        <p className="fs-5">Número de Orden: <strong>#{orden?.numeroOrden || '20240705'}</strong></p>
      </div>

      <div className="card text-start p-4 mb-4 shadow-sm">
        <h4>Resumen de la Transacción</h4>
        <p><strong>Cliente:</strong> {orden?.nombre} {orden?.apellidos}</p>
        <p><strong>Correo:</strong> {orden?.correo}</p>
        <p><strong>Dirección:</strong> {orden?.calle}, {orden?.comuna}</p>
        <hr />
        <h5>Total Pagado: ${orden?.total?.toLocaleString()}</h5>
      </div>

      <button onClick={volverInicio} className="btn btn-primary btn-lg">
        Volver a la Tienda
      </button>
    </div>
  );
};

export default PagoExitoso;