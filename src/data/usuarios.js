// Usuarios de prueba. Los que se registren se guardan aparte en localStorage.
export const usuariosBase = [
  { nombre: "Cliente AutoCare", correo: "cliente@duoc.cl", password: "Auto123", rol: "CLIENTE" },
  { nombre: "Vendedor AutoCare", correo: "vendedor@profesor.duoc.cl", password: "Venta123", rol: "VENDEDOR" },
  { nombre: "Administrador", correo: "admin@duoc.cl", password: "Admin123", rol: "ADMINISTRADOR" }
];

// Cupones: código -> % de descuento
export const CUPONES = { AUTOCARE10: 10, DUOC15: 15 };
