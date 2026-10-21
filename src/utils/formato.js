// 24990 -> "24.990"
export function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL").format(valor);
}

// Lee un JSON de localStorage (o devuelve un valor por defecto si no hay nada)
export function leerStorage(clave, porDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : porDefecto;
  } catch (error) {
    return porDefecto;
  }
}
