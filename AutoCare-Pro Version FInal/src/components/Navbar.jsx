import React from 'react';

const Navbar = ({ totalCarrito = 0, cambiarVista }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <button 
          className="navbar-brand btn btn-link text-decoration-none fw-bold fs-4 text-warning"
          onClick={() => cambiarVista('categorias')}
        >
      
        </button>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => cambiarVista('categorias')}
              >
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-danger fw-bold" 
                onClick={() => cambiarVista('ofertas')}
              >
                
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-warning position-relative"
              onClick={() => cambiarVista('checkout')}
            >
              
              {totalCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalCarrito}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;