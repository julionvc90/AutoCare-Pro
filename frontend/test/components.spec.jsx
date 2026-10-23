import { act, useState } from 'react';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../src/components/ProductCard';
import SearchBox from '../src/components/SearchBox';
import { ProductsProvider } from '../src/context/ProductsContext';
import { CartProvider } from '../src/context/CartContext';
import { CATALOG, CATEGORIES } from '../src/data/products';

const producto = {
  id: 1,
  categoria: 'aceites',
  nombre: 'Aceite de Prueba',
  descripcion: 'Producto de prueba.',
  precio: 10000,
  stock: 5,
  imagen: '/IMG/placeholder.svg',
};

function ConProviders({ children }) {
  return (
    <MemoryRouter>
      <ProductsProvider>
        <CartProvider>{children}</CartProvider>
      </ProductsProvider>
    </MemoryRouter>
  );
}

function montar(elemento) {
  const contenedor = document.createElement('div');
  document.body.appendChild(contenedor);
  const raiz = createRoot(contenedor);
  act(() => raiz.render(elemento));
  return { contenedor, raiz };
}

describe('Componentes de la tienda', () => {
  it('7. ProductCard muestra el nombre y el precio', () => {
    const { contenedor, raiz } = montar(
      <ConProviders>
        <ProductCard product={producto} />
      </ConProviders>,
    );

    expect(contenedor.textContent).toContain('Aceite de Prueba');
    expect(contenedor.textContent).toContain('$10.000');

    act(() => raiz.unmount());
    contenedor.remove();
  });

  it('8. ProductCard agrega el producto al carrito', () => {
    localStorage.clear();
    const { contenedor, raiz } = montar(
      <ConProviders>
        <ProductCard product={producto} />
      </ConProviders>,
    );

    const boton = contenedor.querySelector('button');
    act(() => boton.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    const carrito = JSON.parse(localStorage.getItem('carritoAutoCare'));
    expect(carrito[0].nombre).toBe('Aceite de Prueba');

    act(() => raiz.unmount());
    contenedor.remove();
    localStorage.clear();
  });

  it('9. SearchBox muestra sugerencias al escribir', () => {
    function Ejemplo() {
      const [texto, setTexto] = useState('');
      return (
        <SearchBox
          value={texto}
          onChange={setTexto}
          onSubmit={() => {}}
          onSelect={() => {}}
          products={CATALOG}
          categories={CATEGORIES}
          inputId="buscador-test"
        />
      );
    }

    const { contenedor, raiz } = montar(<Ejemplo />);
    const input = contenedor.querySelector('#buscador-test');
    const definirValor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

    act(() => {
      definirValor.call(input, 'freno');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(contenedor.textContent).toContain('Pastillas de Freno');

    act(() => raiz.unmount());
    contenedor.remove();
  });
});
