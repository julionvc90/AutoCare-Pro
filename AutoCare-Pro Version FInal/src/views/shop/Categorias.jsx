import React, { useState } from 'react';

const Categorias = ({ productos = [], agregarAlCarrito }) => {
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const categorias = ['Todas', 'Lubricantes', 'Fluidos', 'Accesorios', 'Repuestos'];

  const productosFiltrados = categoriaSel === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaSel);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Categorías de Productos</h2>
      
      {/* Botones de Filtro de Categoría */}
      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        {categorias.map(cat => (
          <button 
            key={cat} 
            className={`btn ${categoriaSel === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSel(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listado de Productos Filtrados */}
      <div className="row">
        {productosFiltrados.map(prod => (
          <div key={prod.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={prod.imagen || 'https://via.placeholder.com/400x300'} className="card-img-top" alt={prod.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text text-muted">${prod.precio?.toLocaleString()}</p>
                <button className="btn btn-dark mt-auto" onClick={() => agregarAlCarrito(prod)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;