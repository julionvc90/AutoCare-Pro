import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="titulo-seccion">Página no encontrada</h1>
      <p>La dirección que buscas no existe o fue movida.</p>
      <Link className="btn btn-success" to="/">Volver al inicio</Link>
    </div>
  );
}
