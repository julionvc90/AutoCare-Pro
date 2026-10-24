// ReceiptPage: busca una orden y muestra su boleta.
import { Link, useParams } from 'react-router-dom';
import Receipt from '../components/Receipt';
import { readJSON } from '../utils/storage';

export default function ReceiptPage() {
  const { id } = useParams();
  const ordenes = readJSON('ordenes', []);
  const orden = (Array.isArray(ordenes) ? ordenes : []).find((item) => item.id === id);

  if (!orden) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="titulo-seccion">Boleta no encontrada</h1>
        <p>No encontramos la venta {id}.</p>
        <Link className="btn btn-success" to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Receipt orden={orden} />
    </div>
  );
}
