// Contact: formulario de contacto con validaciones.
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  MAX_COMENTARIO,
  errorComentarioContacto,
  errorCorreoContacto,
  errorNombreContacto,
  errorTelefonoContacto,
} from '../utils/validation';
import { readJSON, writeJSON } from '../utils/storage';

const VALIDADORES = {
  nombre: errorNombreContacto,
  correo: (valor) => errorCorreoContacto(valor, false),
  telefono: errorTelefonoContacto,
  mensaje: errorComentarioContacto,
};

const VACIO = { nombre: '', correo: '', telefono: '', mensaje: '' };

export default function Contact() {
  const [valores, setValores] = useState(VACIO);
  const [tocados, setTocados] = useState({});
  const [resultado, setResultado] = useState({ texto: '', tipo: '' });

  const errores = {};
  Object.keys(VALIDADORES).forEach((campo) => {
    errores[campo] = VALIDADORES[campo](valores[campo]);
  });

  const cambiar = (campo, valor) => setValores((previos) => ({ ...previos, [campo]: valor }));
  const marcar = (campo) => setTocados((previos) => ({ ...previos, [campo]: true }));

  const claseCampo = (campo) => {
    if (!tocados[campo]) return '';
    if (errores[campo]) return 'campo-invalido';
    return valores[campo] ? 'campo-valido' : '';
  };

  const enviar = (evento) => {
    evento.preventDefault();
    setTocados({ nombre: true, correo: true, telefono: true, mensaje: true });

    const hayError = Object.keys(VALIDADORES).some((campo) => VALIDADORES[campo](valores[campo]));
    if (hayError) {
      setResultado({ texto: 'Revisa los campos marcados antes de enviar.', tipo: 'error' });
      return;
    }

    const mensajes = readJSON('mensajesContacto', []);
    writeJSON('mensajesContacto', [
      ...(Array.isArray(mensajes) ? mensajes : []),
      {
        id: 'MSG-' + Date.now(),
        fecha: new Date().toISOString(),
        nombre: valores.nombre.trim(),
        correo: valores.correo.trim(),
        telefono: valores.telefono.trim(),
        comentario: valores.mensaje.trim(),
      },
    ]);

    setValores(VACIO);
    setTocados({});
    setResultado({ texto: '¡Mensaje enviado! Te responderemos a la brevedad.', tipo: 'exito' });
  };

  const largoMensaje = valores.mensaje.trim().length;

  return (
    <>
      <PageHeader
        icono="fa-headset"
        titulo="Contáctanos"
        subtitulo="Estamos disponibles para ayudarte con tu vehículo."
      />

      <div className="container">
        <div className="row g-4">
          <section className="col-12 col-lg-5">
            <div className="contacto-card h-100">
              <h2>Habla con nosotros</h2>
              <ul className="contacto-lista">
                <li>
                  <a className="contacto-item" href="tel:+56957606659">
                    <span className="contacto-icono"><i className="fa-solid fa-phone" aria-hidden="true" /></span>
                    <span><strong>Teléfono</strong><small>+56 9 5760 6659</small></span>
                  </a>
                </li>
                <li>
                  <a className="contacto-item" href="https://wa.me/56949033215" target="_blank" rel="noopener noreferrer">
                    <span className="contacto-icono"><i className="fa-brands fa-whatsapp" aria-hidden="true" /></span>
                    <span><strong>WhatsApp</strong><small>+56 9 4903 3215</small></span>
                  </a>
                </li>
                <li>
                  <a className="contacto-item" href="mailto:contacto@autocarepro.cl">
                    <span className="contacto-icono"><i className="fa-solid fa-envelope" aria-hidden="true" /></span>
                    <span><strong>Correo</strong><small>contacto@autocarepro.cl</small></span>
                  </a>
                </li>
                <li>
                  <div className="contacto-item">
                    <span className="contacto-icono"><i className="fa-solid fa-location-dot" aria-hidden="true" /></span>
                    <span><strong>Ubicación</strong><small>Santiago, Chile</small></span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="col-12 col-lg-7">
            <div className="contacto-card">
              <h2>Envíanos un mensaje</h2>
              <form id="formContacto" noValidate onSubmit={enviar}>
                <div className="form-grupo">
                  <label htmlFor="nombre">Nombre*</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className={claseCampo('nombre')}
                    value={valores.nombre}
                    onChange={(evento) => cambiar('nombre', evento.target.value)}
                    onBlur={() => marcar('nombre')}
                    aria-invalid={Boolean(tocados.nombre && errores.nombre)}
                  />
                  {tocados.nombre && errores.nombre && <p className="campo-error" role="alert">{errores.nombre}</p>}
                </div>

                <div className="form-grupo">
                  <label htmlFor="correo">Correo</label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    className={claseCampo('correo')}
                    value={valores.correo}
                    onChange={(evento) => cambiar('correo', evento.target.value)}
                    onBlur={() => marcar('correo')}
                    aria-invalid={Boolean(tocados.correo && errores.correo)}
                  />
                  {tocados.correo && errores.correo && <p className="campo-error" role="alert">{errores.correo}</p>}
                  <p className="campo-ayuda">Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.</p>
                </div>

                <div className="form-grupo">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    className={claseCampo('telefono')}
                    value={valores.telefono}
                    onChange={(evento) => cambiar('telefono', evento.target.value)}
                    onBlur={() => marcar('telefono')}
                    aria-invalid={Boolean(tocados.telefono && errores.telefono)}
                  />
                  {tocados.telefono && errores.telefono && <p className="campo-error" role="alert">{errores.telefono}</p>}
                </div>

                <div className="form-grupo">
                  <label htmlFor="mensaje">Comentario*</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    className={claseCampo('mensaje')}
                    value={valores.mensaje}
                    onChange={(evento) => cambiar('mensaje', evento.target.value)}
                    onBlur={() => marcar('mensaje')}
                    aria-invalid={Boolean(tocados.mensaje && errores.mensaje)}
                  />
                  <div className="campo-pie">
                    {tocados.mensaje && errores.mensaje && <p className="campo-error" role="alert">{errores.mensaje}</p>}
                    <span className={`contador${largoMensaje > MAX_COMENTARIO ? ' excedido' : ''}`}>
                      {largoMensaje}/{MAX_COMENTARIO}
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100">Enviar mensaje</button>
                <p id="contactoResultado" className={`contacto-resultado ${resultado.tipo}`}>{resultado.texto}</p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
