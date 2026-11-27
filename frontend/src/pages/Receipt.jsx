// ReceiptPage: busca una orden en el backend y muestra su boleta.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Receipt from '../components/Receipt';
import { api } from '../api/client';

export default function ReceiptPage() {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    api
      .obtenerOrden(id)
      .then((o) => {
        if (activo) setOrden(o);
      })
      .catch(() => {
        if (activo) setOrden(null);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <div className="container mt-5 text-center">
        <p>Cargando boleta…</p>
      </div>
    );
  }

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
