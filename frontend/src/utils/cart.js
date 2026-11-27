export const CLAVE_CARRITO = 'carritoAutoCare';
export const CLAVE_CUPON = 'cuponCarrito';
export const CLAVE_ORDENES = 'ordenes';
export const CANTIDAD_MAXIMA_POR_PRODUCTO = 10;

/** Código de cupón -> porcentaje de descuento. */
export const CUPONES = {
  AUTOCARE10: 10,
  DUOC15: 15,
};

/** Tope de unidades para un producto: su stock, o 10 si no se encuentra. */
export function limiteProducto(nombre, productos) {
  const producto = (productos || []).find((p) => p.nombre === nombre);
  return producto ? producto.stock : CANTIDAD_MAXIMA_POR_PRODUCTO;
}

/**
 * Agrega unidades al carrito respetando el tope.
 * Devuelve el carrito nuevo y cuántas unidades se agregaron realmente.
 */
export function agregarItem(carrito, producto, cantidad = 1, limite) {
  const tope = limite === undefined ? (producto.stock ?? CANTIDAD_MAXIMA_POR_PRODUCTO) : limite;
  const existente = carrito.find((i) => i.nombre === producto.nombre);
  const actual = existente ? existente.cantidad : 0;
  const final = Math.min(actual + cantidad, tope);
  const agregadas = final - actual;

  if (agregadas <= 0) {
    return { carrito, agregadas: 0, limite: tope };
  }

  const carritoNuevo = existente
    ? carrito.map((i) => (i.nombre === producto.nombre ? { ...i, cantidad: final } : i))
    : [...carrito, { nombre: producto.nombre, precio: producto.precio, cantidad: final }];

  return { carrito: carritoNuevo, agregadas, limite: tope };
}

/** Cambia la cantidad de una línea entre 1 y el tope. */
export function cambiarCantidad(carrito, nombre, nuevaCantidad, limite) {
  const item = carrito.find((i) => i.nombre === nombre);
  if (!item) return { carrito, cantidad: 0 };

  const valor = Number(nuevaCantidad) || 0;
  const cantidad = Math.max(1, Math.min(valor, limite));
  return {
    carrito: carrito.map((i) => (i.nombre === nombre ? { ...i, cantidad } : i)),
    cantidad,
  };
}

export function eliminarItem(carrito, nombre) {
  return carrito.filter((i) => i.nombre !== nombre);
}

/** Suma de cantidades del carrito. */
export function contarItems(carrito) {
  return (carrito || []).reduce((total, i) => total + Number(i.cantidad || 0), 0);
}

/** Calcula subtotal, descuento por cupón y total. */
export function calcularResumen(carrito, cupon) {
  const subtotal = (carrito || []).reduce((total, i) => total + i.precio * i.cantidad, 0);
  const porcentaje = cupon && CUPONES[cupon] ? CUPONES[cupon] : 0;
  const descuento = Math.round((subtotal * porcentaje) / 100);

  return {
    subtotal,
    cupon: porcentaje ? cupon : null,
    porcentaje,
    descuento,
    total: subtotal - descuento,
  };
}

/** Construye el objeto de orden que se guarda al pagar. */
export function crearOrden(carrito, cliente, cupon, origen = 'cliente') {
  const resumen = calcularResumen(carrito, cupon);
  return {
    id: 'OC-' + Date.now(),
    fecha: new Date().toISOString(),
    cliente: cliente.nombre || cliente.correo || 'Cliente',
    correo: cliente.correo || '',
    rut: cliente.rut || '',
    telefono: cliente.telefono || '',
    direccion: cliente.direccion || '',
    items: carrito,
    subtotal: resumen.subtotal,
    cupon: resumen.cupon,
    descuento: resumen.descuento,
    total: resumen.total,
    estado: 'Pendiente',
    origen,
    vendedor: cliente.vendedor || '',
  };
}
