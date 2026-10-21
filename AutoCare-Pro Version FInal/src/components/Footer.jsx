import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-5 pt-4 border-top border-warning">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase text-warning">AutoCar Repuestos</h5>
            <p>
              La mejor tienda de accesoiros y repuestos para tu vehiculo.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-warning">Enlaces Rápidos</h5>
            <ul className="list-unstyled mb-0">
              <li><span className="text-white-50">Categorías</span></li>
              <li><span className="text-white-50">Ofertas Especiales</span></li>
              <li><span className="text-white-50">Términos y Condiciones</span></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-warning">Contacto</h5>
            <p className="mb-1"> Av. Vicuña Mackenna 1234, Santiago</p>
            <p className="mb-1">contacto@autocar.cl</p>
            <p>+56 9 1234 5678</p>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-secondary bg-opacity-25">
         2026 AutoCar - Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;