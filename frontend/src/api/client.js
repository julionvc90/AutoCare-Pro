// Cliente HTTP de la API REST (Spring Boot). URL configurable vía Vite.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';

const TOKEN_KEY = 'tokenAutocare';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* noop */
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error || `Error ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export const api = {
  // Auth
  login: (correo, password) => request('/auth/login', { method: 'POST', body: { correo, password }, auth: false }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload, auth: false }),

  // Productos
  listarProductos: () => request('/productos', { auth: false }),
  crearProducto: (producto) => request('/productos', { method: 'POST', body: producto }),
  actualizarProducto: (id, producto) => request(`/productos/${id}`, { method: 'PUT', body: producto }),
  eliminarProducto: (id) => request(`/productos/${id}`, { method: 'DELETE' }),

  // Usuarios
  listarUsuarios: () => request('/usuarios'),
  crearUsuario: (usuario) => request('/usuarios', { method: 'POST', body: usuario }),
  actualizarUsuario: (id, usuario) => request(`/usuarios/${id}`, { method: 'PUT', body: usuario }),
  eliminarUsuario: (id) => request(`/usuarios/${id}`, { method: 'DELETE' }),

  // Ordenes
  listarOrdenes: () => request('/ordenes'),
  obtenerOrden: (id) => request(`/ordenes/${id}`),
  crearOrden: (orden) => request('/ordenes', { method: 'POST', body: orden }),
  actualizarEstadoOrden: (id, estado) => request(`/ordenes/${id}/estado`, { method: 'PUT', body: { estado } }),
  eliminarOrden: (id) => request(`/ordenes/${id}`, { method: 'DELETE' }),
};

export default api;
