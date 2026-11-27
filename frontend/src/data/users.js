export const ROLES = {
  ADMIN: 'ADMINISTRADOR',
  SELLER: 'VENDEDOR',
  CLIENT: 'CLIENTE',
};

export const ROLE_LABELS = {
  ADMINISTRADOR: 'Administrador',
  VENDEDOR: 'Vendedor',
  CLIENTE: 'Cliente',
};

export const SEED_USERS = [
  {
    rut: '12.345.678-5',
    correo: 'cliente@duoc.cl',
    celular: '+56912345678',
    password: 'Auto123',
    nombre: 'Cliente AutoCare',
    rol: 'CLIENTE',
  },
  {
    rut: '11.111.111-1',
    correo: 'vendedor@profesor.duoc.cl',
    celular: '+56998765432',
    password: 'Venta123',
    nombre: 'Vendedor AutoCare',
    rol: 'VENDEDOR',
  },
  {
    rut: '9.999.999-9',
    correo: 'admin@duoc.cl',
    celular: '+56987654321',
    password: 'Admin123',
    nombre: 'Administrador',
    rol: 'ADMINISTRADOR',
  },
];
