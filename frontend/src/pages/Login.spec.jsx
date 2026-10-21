import { act } from 'react';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

function escribir(input, valor) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(input, valor);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

describe('Login (formulario)', () => {
  let contenedor;
  let raiz;

  beforeEach(() => {
    localStorage.clear();
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
    act(() => {
      raiz.render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>,
      );
    });
  });

  afterEach(() => {
    act(() => raiz.unmount());
    contenedor.remove();
    localStorage.clear();
  });

  const enviarLogin = () => {
    const formulario = contenedor.querySelector('#loginForm');
    act(() => {
      formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  };

  it('muestra un mensaje de error cuando el correo esta vacio', () => {
    enviarLogin();
    expect(contenedor.querySelector('#loginMensaje').textContent).toContain('Debe ingresar su correo');
  });

  it('rechaza un correo con dominio no permitido', () => {
    escribir(contenedor.querySelector('#usuario'), 'persona@hotmail.com');
    escribir(contenedor.querySelector('#password'), 'Auto123');
    enviarLogin();
    expect(contenedor.querySelector('#loginMensaje').textContent).toContain('@duoc.cl');
  });
});
