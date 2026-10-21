import { act } from 'react';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

let raiz;

function renderEn(ruta) {
  const contenedor = document.createElement('div');
  document.body.appendChild(contenedor);
  raiz = createRoot(contenedor);

  act(() => {
    raiz.render(
      <MemoryRouter initialEntries={[ruta]}>
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </CartProvider>
        </ProductsProvider>
      </MemoryRouter>,
    );
  });

  return contenedor;
}

function iniciarSesionAdmin() {
  localStorage.setItem(
    'usuarioActivo',
    JSON.stringify({ nombre: 'Admin', correo: 'admin@duoc.cl', rol: 'ADMINISTRADOR' }),
  );
}

describe('App (montaje de rutas)', () => {
  afterEach(() => {
    if (raiz) {
      act(() => raiz.unmount());
      raiz = null;
    }
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('monta la portada', () => {
    const contenedor = renderEn('/');
    expect(contenedor.textContent).toContain('Todo para el cuidado de tu vehículo');
  });

  it('monta el catálogo', () => {
    const contenedor = renderEn('/catalogo');
    expect(contenedor.textContent).toContain('Productos');
  });

  it('monta el detalle de un producto existente', () => {
    const contenedor = renderEn('/producto/1');
    expect(contenedor.textContent).toContain('Aceite de Motor');
  });

  it('monta el carrito vacío', () => {
    const contenedor = renderEn('/carrito');
    expect(contenedor.textContent).toContain('Tu carrito está vacío');
  });

  it('monta el formulario de contacto', () => {
    const contenedor = renderEn('/contacto');
    expect(contenedor.textContent).toContain('Envíanos un mensaje');
  });

  it('monta el panel admin con sesión de administrador', () => {
    localStorage.setItem(
      'usuarioActivo',
      JSON.stringify({ nombre: 'Admin', correo: 'admin@duoc.cl', rol: 'ADMINISTRADOR' }),
    );
    const contenedor = renderEn('/admin/home');
    expect(contenedor.textContent).toContain('ADMINISTRADOR');
  });

  it('redirige a login cuando no hay sesión en /admin', () => {
    const contenedor = renderEn('/admin/home');
    expect(contenedor.textContent).toContain('Iniciar Sesión');
  });

  it('monta el listado de productos del admin', () => {
    iniciarSesionAdmin();
    const contenedor = renderEn('/admin/productos');
    expect(contenedor.textContent).toContain('Nuevo producto');
  });

  it('monta el listado de órdenes del admin', () => {
    iniciarSesionAdmin();
    const contenedor = renderEn('/admin/ordenes');
    expect(contenedor.textContent).toContain('N° orden');
  });

  it('monta el listado de usuarios del admin', () => {
    iniciarSesionAdmin();
    const contenedor = renderEn('/admin/usuarios');
    expect(contenedor.textContent).toContain('Nuevo usuario');
  });

  it('monta el formulario de nuevo producto', () => {
    iniciarSesionAdmin();
    const contenedor = renderEn('/admin/productos/nuevo');
    expect(contenedor.textContent).toContain('Código');
  });

  it('monta el formulario de nuevo usuario', () => {
    iniciarSesionAdmin();
    const contenedor = renderEn('/admin/usuarios/nuevo');
    expect(contenedor.textContent).toContain('RUN');
  });
});
