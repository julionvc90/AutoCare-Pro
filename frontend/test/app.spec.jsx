import { act } from 'react';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { ProductsProvider } from '../src/context/ProductsContext';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext';

describe('Aplicación', () => {
  it('10. muestra la página de inicio', () => {
    const contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    const raiz = createRoot(contenedor);

    act(() => {
      raiz.render(
        <MemoryRouter initialEntries={['/']}>
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

    expect(contenedor.textContent).toContain('Todo para el cuidado de tu vehículo');

    act(() => raiz.unmount());
    contenedor.remove();
  });
});
