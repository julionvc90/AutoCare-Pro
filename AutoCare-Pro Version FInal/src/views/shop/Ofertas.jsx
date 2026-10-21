import React from 'react';

const Ofertas = ({ productos = [], agregarAlCarrito }) => {
  const productosEnOferta = productos.filter(p => p.enOferta || p.descuento > 0);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 text-danger">🔥 Productos en Oferta Exclusiva</h2>
      <div className="row">
        {productosEnOferta.map(prod => (
          <div key={prod.id} className="col-md-3 mb-4">
            <div className="card h-100 border-danger shadow-sm">
              <span className="badge bg-danger position-absolute top-0 end-0 m-2">Oferta</span>
              <img src={prod.imagen || 'https://via.placeholder.com/400x300'} className="card-img-top" alt={prod.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text text-danger fw-bold">${prod.precio?.toLocaleString()}</p>
                <button className="btn btn-outline-danger mt-auto" onClick={() => agregarAlCarrito(prod)}>
                  Aprovechar Oferta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ofertas;