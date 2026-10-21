import { useState } from 'react';
import { act } from 'react';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { createRoot } from 'react-dom/client';
import SearchBox from './SearchBox';
import { CATALOG, CATEGORIES } from '../data/products';

function escribir(input, valor) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(input, valor);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function Harness({ onSelect }) {
  const [value, setValue] = useState('');
  return (
    <SearchBox
      value={value}
      onChange={setValue}
      onSubmit={() => {}}
      onSelect={onSelect}
      products={CATALOG}
      categories={CATEGORIES}
      inputId="buscadorTest"
    />
  );
}

describe('SearchBox', () => {
  let contenedor;
  let raiz;

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(() => {
    act(() => raiz.unmount());
    contenedor.remove();
  });

  const montar = (onSelect = () => {}) => {
    act(() => {
      raiz.render(<Harness onSelect={onSelect} />);
    });
    return contenedor.querySelector('#buscadorTest');
  };

  it('muestra sugerencias mientras se escribe', () => {
    const input = montar();
    act(() => escribir(input, 'aceite'));

    expect(contenedor.textContent).toContain('Aceite de Motor');
    expect(contenedor.querySelectorAll('.search-suggest-item').length).toBeGreaterThan(0);
  });

  it('ignora tildes al buscar', () => {
    const input = montar();
    act(() => escribir(input, 'correa'));

    expect(contenedor.textContent).toContain('Kit Correa de Distribución');
  });

  it('muestra un aviso cuando no hay coincidencias', () => {
    const input = montar();
    act(() => escribir(input, 'zzzz'));

    expect(contenedor.textContent).toContain('Sin coincidencias');
  });

  it('selecciona una sugerencia al hacer clic', () => {
    let seleccionado = null;
    const input = montar((producto) => {
      seleccionado = producto;
    });
    act(() => escribir(input, 'freno'));

    const boton = contenedor.querySelector('.search-suggest-item');
    act(() => {
      boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(seleccionado).not.toBeNull();
    expect(seleccionado.nombre.toLowerCase()).toContain('freno');
  });

  it('permite elegir con las flechas y Enter', () => {
    let seleccionado = null;
    const input = montar((producto) => {
      seleccionado = producto;
    });
    act(() => escribir(input, 'freno'));

    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    });
    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });

    expect(seleccionado).not.toBeNull();
  });
});
