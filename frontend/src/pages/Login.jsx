import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({ usuario: '', password: '' });
  const [formRegistro, setFormRegistro] = useState({ nombre: '', correo: '', password: '' });
  const [mensajeLogin, setMensajeLogin] = useState({ texto: '', tipo: '' });
  const [mensajeRegistro, setMensajeRegistro] = useState({ texto: '', tipo: '' });

  const enviarLogin = (evento) => {
    evento.preventDefault();
    const resultado = login(formLogin.usuario, formLogin.password);
    setMensajeLogin({ texto: resultado.message, tipo: resultado.ok ? 'exito' : 'error' });

    if (resultado.ok) {
      const destino = resultado.rol === 'ADMINISTRADOR' || resultado.rol === 'VENDEDOR' ? '/admin/home' : '/';
      window.setTimeout(() => navigate(destino), 800);
    }
  };

  const enviarRegistro = (evento) => {
    evento.preventDefault();
    const resultado = register(formRegistro);
    setMensajeRegistro({ texto: resultado.message, tipo: resultado.ok ? 'exito' : 'error' });
    if (resultado.ok) setFormRegistro({ nombre: '', correo: '', password: '' });
  };

  return (
    <div className="container mt-4">
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-5">
          <form id="loginForm" className="card p-4 shadow-sm" noValidate onSubmit={enviarLogin}>
            <h1 className="h3 mb-3">Iniciar Sesión</h1>

            <label htmlFor="usuario" className="form-label">Correo*</label>
            <input
              id="usuario"
              type="email"
              required
              className="form-control mb-3"
              value={formLogin.usuario}
              onChange={(evento) => setFormLogin({ ...formLogin, usuario: evento.target.value })}
            />

            <label htmlFor="password" className="form-label">Contraseña*</label>
            <input
              id="password"
              type="password"
              required
              className="form-control mb-3"
              value={formLogin.password}
              onChange={(evento) => setFormLogin({ ...formLogin, password: evento.target.value })}
            />

            <p id="loginMensaje" className={mensajeLogin.tipo}>{mensajeLogin.texto}</p>

            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            <p className="form-text mt-3 mb-0">
              Cuentas de prueba: admin@duoc.cl / Admin123 · cliente@duoc.cl / Auto123
            </p>
          </form>
        </div>

        <div className="col-12 col-md-5">
          <form id="registerForm" className="card p-4 shadow-sm" noValidate onSubmit={enviarRegistro}>
            <h1 className="h3 mb-3">Registrarse</h1>

            <label htmlFor="regNombre" className="form-label">Nombre*</label>
            <input
              id="regNombre"
              type="text"
              required
              className="form-control mb-3"
              value={formRegistro.nombre}
              onChange={(evento) => setFormRegistro({ ...formRegistro, nombre: evento.target.value })}
            />

            <label htmlFor="regCorreo" className="form-label">Correo*</label>
            <input
              id="regCorreo"
              type="email"
              required
              className="form-control mb-3"
              value={formRegistro.correo}
              onChange={(evento) => setFormRegistro({ ...formRegistro, correo: evento.target.value })}
            />

            <label htmlFor="regPassword" className="form-label">Contraseña*</label>
            <input
              id="regPassword"
              type="password"
              required
              className="form-control mb-3"
              value={formRegistro.password}
              onChange={(evento) => setFormRegistro({ ...formRegistro, password: evento.target.value })}
            />

            <p id="registerMensaje" className={mensajeRegistro.tipo}>{mensajeRegistro.texto}</p>

            <button type="submit" className="btn btn-primary w-100">Registrar</button>
            <p className="form-text mt-3 mb-0">Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
