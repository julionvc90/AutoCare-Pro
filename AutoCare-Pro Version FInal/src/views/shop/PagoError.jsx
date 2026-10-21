import React from 'react';

const PagoError = ({ reintentarPago }) => {
  return (
    <div className="container my-5 text-center">
      <div className="alert alert-danger p-4 shadow-sm">
        <h2 className="alert-heading">☒ No se pudo realizar el pago</h2>
        <p className="fs-5">Número de Intento: <strong>#20240705</strong></p>
        <p>Ocurrió un problema con la tarjeta o saldo insuficiente.</p>
      </div>

      <button onClick={reintentarPago} className="btn btn-warning btn-lg my-3">
        VOLVER A REALIZAR EL PAGO
      </button>
    </div>
  );
};

export default PagoError;