export const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
export const MAX_INTENTOS = 5;

export const MAX_NOMBRE = 100;
export const MAX_CORREO = 100;
export const MAX_COMENTARIO = 500;

/** Quita puntos y guion del RUT y lo pasa a mayúsculas. */
export function normalizarRut(rut) {
  return String(rut || '')
    .replace(/\./g, '')
    .replace(/-/g, '')
    .toUpperCase();
}

/** Valida un RUT chileno con dígito verificador (módulo 11). */
export function validarRut(rut) {
  const limpio = normalizarRut(rut);
  if (!/^[0-9]+[0-9K]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
    suma += Number(cuerpo.charAt(i)) * multiplicador;
    multiplicador += 1;
    if (multiplicador > 7) multiplicador = 2;
  }

  const resto = 11 - (suma % 11);
  const dvCalculado = resto === 11 ? '0' : resto === 10 ? 'K' : resto.toString();
  return dv === dvCalculado;
}

/** Formato + dominio permitido (duoc.cl, profesor.duoc.cl, gmail.com). */
export function validarCorreo(correo) {
  if (!correo || correo.length > MAX_CORREO) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return false;

  const dominio = correo.split('@')[1].toLowerCase();
  return DOMINIOS_PERMITIDOS.includes(dominio);
}

/** Contraseña requerida, entre 4 y 10 caracteres. */
export function validarPassword(password) {
  return typeof password === 'string' && password.length >= 4 && password.length <= 10;
}

/* ------------------------- Contacto ------------------------- */

export function errorNombreContacto(valor) {
  if (valor === '') return 'El nombre es requerido.';
  if (valor.length > MAX_NOMBRE) {
    return `El nombre no puede superar los ${MAX_NOMBRE} caracteres (llevas ${valor.length}).`;
  }
  return '';
}

export function errorCorreoContacto(valor, requerido = false) {
  if (valor === '') return requerido ? 'El correo es requerido.' : '';
  if (valor.length > MAX_CORREO) {
    return `El correo no puede superar los ${MAX_CORREO} caracteres (llevas ${valor.length}).`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    return 'Escribe un correo con formato válido, por ejemplo nombre@gmail.com.';
  }

  const [local, dominio] = valor.split('@');
  if (!DOMINIOS_PERMITIDOS.includes(dominio.toLowerCase())) {
    const sugerido = sugerirDominio(dominio.toLowerCase());
    return sugerido
      ? `Dominio no permitido. ¿Quisiste decir ${local}@${sugerido}?`
      : 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  return '';
}

export function errorTelefonoContacto(valor) {
  if (valor === '') return '';
  const digitos = valor.replace(/[\s+\-()]/g, '');
  if (!/^[0-9]{8,12}$/.test(digitos)) {
    return 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.';
  }
  return '';
}

export function errorComentarioContacto(valor) {
  if (valor === '') return 'El comentario es requerido.';
  if (valor.length > MAX_COMENTARIO) {
    return `El comentario no puede superar los ${MAX_COMENTARIO} caracteres (te pasaste por ${valor.length - MAX_COMENTARIO}).`;
  }
  return '';
}

/** Distancia de Levenshtein entre dos cadenas. */
export function distanciaTexto(a, b) {
  const m = [];
  for (let i = 0; i <= a.length; i += 1) m[i] = [i];
  for (let j = 1; j <= b.length; j += 1) m[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      m[i][j] = Math.min(
        m[i - 1][j] + 1,
        m[i][j - 1] + 1,
        m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return m[a.length][b.length];
}

/** Devuelve el dominio permitido más parecido (<= 2 ediciones) o '' si no hay. */
export function sugerirDominio(dominio) {
  return DOMINIOS_PERMITIDOS.find((permitido) => distanciaTexto(dominio, permitido) <= 2) || '';
}

/* ------------------------- Login / registro ------------------------- */

export function errorLogin(correo, password, intentos) {
  if (correo === '') return 'Debe ingresar su correo electrónico.';
  if (!validarCorreo(correo)) {
    return 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  if (!validarPassword(password)) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  if (intentos >= MAX_INTENTOS) {
    return 'Cuenta bloqueada temporalmente por superar los 5 intentos.';
  }
  return '';
}

export function errorRegistro(nombre, correo, password, existeCorreo) {
  if (nombre === '' || nombre.length > MAX_NOMBRE) {
    return 'El nombre es requerido (máximo 100 caracteres).';
  }
  if (!validarCorreo(correo)) {
    return 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  if (existeCorreo) return 'Ese correo ya está registrado.';
  if (!validarPassword(password)) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  return '';
}
