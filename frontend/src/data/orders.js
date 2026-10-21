export const ESTADOS_ORDEN = ['Pendiente', 'En preparación', 'Enviada', 'Entregada', 'Cancelada'];

export const COLOR_ESTADO = {
  Pendiente: 'warning',
  'En preparación': 'info',
  Enviada: 'primary',
  Entregada: 'success',
  Cancelada: 'danger',
};

/** Órdenes de ejemplo (las que trae el panel original). */
export const ORDENES_DEMO = [
  {
    numero: 'ORD-1001',
    fecha: '2026-09-02',
    cliente: 'María González',
    correo: 'maria.gonzalez@duoc.cl',
    direccion: 'Av. Providencia 1234, Santiago',
    estado: 'Pendiente',
    items: [
      { nombre: 'Aceite de Motor Castrol Edge 5W-30 4L', cantidad: 1, precio: 34990 },
      { nombre: 'Filtro de Aceite Blindado Premium', cantidad: 2, precio: 8500 },
    ],
  },
  {
    numero: 'ORD-1002',
    fecha: '2026-09-04',
    cliente: 'Pedro Ramírez',
    correo: 'pedro.ramirez@gmail.com',
    direccion: 'Los Aromos 456, Maipú',
    estado: 'En preparación',
    items: [{ nombre: 'Batería de Auto 12V 60AH Libre Mantención', cantidad: 1, precio: 68990 }],
  },
  {
    numero: 'ORD-1003',
    fecha: '2026-09-07',
    cliente: 'Camila Torres',
    correo: 'camila.torres@duoc.cl',
    direccion: 'Calle Nueva 789, Ñuñoa',
    estado: 'Enviada',
    items: [
      { nombre: 'Paños de Microfibra Ultra Absorbente (3u)', cantidad: 3, precio: 5490 },
      { nombre: 'Shampoo Autolavado con Cera Concentrada', cantidad: 1, precio: 12990 },
    ],
  },
  {
    numero: 'ORD-1004',
    fecha: '2026-09-10',
    cliente: 'Diego Muñoz',
    correo: 'diego.munoz@profesor.duoc.cl',
    direccion: 'Pasaje Sol 321, La Florida',
    estado: 'Entregada',
    items: [{ nombre: 'Ampolletas LED H7 de Alta Potencia', cantidad: 1, precio: 21990 }],
  },
  {
    numero: 'ORD-1005',
    fecha: '2026-09-12',
    cliente: 'Valentina Rojas',
    correo: 'valentina.rojas@gmail.com',
    direccion: 'Av. Central 654, San Bernardo',
    estado: 'Cancelada',
    items: [{ nombre: 'Gata Hidráulica de Caimán 2 Toneladas', cantidad: 1, precio: 38000 }],
  },
  {
    numero: 'ORD-1006',
    fecha: '2026-09-15',
    cliente: 'Sebastián Pérez',
    correo: 'sebastian.perez@duoc.cl',
    direccion: 'Calle Sur 987, Puente Alto',
    estado: 'Pendiente',
    items: [
      { nombre: 'Compresor de Aire Portátil 12V Digital', cantidad: 1, precio: 24990 },
      { nombre: 'Cables Pasa Corriente Reforzados 3 Metros', cantidad: 2, precio: 11990 },
    ],
  },
];

export function totalOrden(orden) {
  if (orden.total !== undefined) return Number(orden.total) || 0;
  return (orden.items || []).reduce((total, item) => total + Number(item.precio) * Number(item.cantidad), 0);
}
