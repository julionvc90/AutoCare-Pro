// Reglas de validación. Las funciones "error..." devuelven "" si está bien
// o el mensaje de error si está mal.

export const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

// Errores de tipeo típicos y su corrección (para dar sugerencias)
const ERRORES_COMUNES = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.cl": "gmail.com",
  "duoc.com": "duoc.cl",
  "doc.cl": "duoc.cl"
};

export function validarCorreo(correo) {
  const formatoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // algo@algo.algo
  if (!formatoOk || correo.length > 100) return false;
  const dominio = correo.split("@")[1].toLowerCase();
  return DOMINIOS_PERMITIDOS.includes(dominio);
}

export function validarPassword(password) {
  return password.length >= 4 && password.length <= 10;
}

// ----- Formulario de contacto -----
export function errorNombre(valor) {
  if (valor === "") return "El nombre es requerido.";
  if (valor.length > 100) return "El nombre no puede superar los 100 caracteres.";
  return "";
}

export function errorCorreo(valor) {
  if (valor === "") return "El correo es requerido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Escribe un correo con formato válido, por ejemplo nombre@gmail.com.";
  const [usuario, dominio] = valor.split("@");
  if (!DOMINIOS_PERMITIDOS.includes(dominio.toLowerCase())) {
    const sugerido = ERRORES_COMUNES[dominio.toLowerCase()];
    if (sugerido) return `Dominio no permitido. ¿Quisiste decir ${usuario}@${sugerido}?`;
    return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  return "";
}

// Teléfono opcional: si se escribe, debe tener entre 8 y 12 dígitos
export function errorTelefono(valor) {
  if (valor === "") return "";
  const digitos = valor.replace(/[\s+\-()]/g, "");
  return /^[0-9]{8,12}$/.test(digitos) ? "" : "Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.";
}

export function errorComentario(valor) {
  if (valor === "") return "El comentario es requerido.";
  if (valor.length > 500) return "El comentario no puede superar los 500 caracteres.";
  return "";
}
