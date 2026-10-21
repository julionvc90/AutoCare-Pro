import { act } from 'react';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ProductsProvider } from '../context/ProductsContext';
import { CartProvider } from '../context/CartContext';

const PRODUCTO = {
  id: 1,
  categoria: 'aceites',
  nombre: 'Aceite Test',
  descripcion: 'Producto de prueba para el carrito.',
  precio: 34990,
  stock: 5,
  imagen: '/IMG/aceite-5w30.jpg',
};

describe('ProductCard', () => {
  let contenedor;
  let raiz;

  beforeEach(() => {
    localStorage.clear();
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(() => {
    act(() => raiz.unmount());
    contenedor.remove();
    localStorage.clear();
  });

  const montar = () => {
    act(() => {
      raiz.render(
        <MemoryRouter>
          <ProductsProvider>
            <CartProvider>
              <ProductCard product={PRODUCTO} />
            </CartProvider>
          </ProductsProvider>
        </MemoryRouter>,
      );
    });
  };

  it('muestra el nombre y el precio formateado del producto', () => {
    montar();
    expect(contenedor.textContent).toContain('Aceite Test');
    expect(contenedor.textContent).toContain('$34.990');
  });

  it('agrega el producto al carrito al hacer clic en Comprar', () => {
    montar();
    const boton = contenedor.querySelector('button');

    act(() => {
      boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const carrito = JSON.parse(localStorage.getItem('carritoAutoCare') || '[]');
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Aceite Test');
    expect(carrito[0].cantidad).toBe(1);
  });

  it('persiste el carrito en localStorage (espia de Jasmine)', () => {
    montar();
    const espia = spyOn(localStorage, 'setItem').and.callThrough();
    const boton = contenedor.querySelector('button');

    act(() => {
      boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(espia).toHaveBeenCalledWith('carritoAutoCare', jasmine.any(String));
  });
});
