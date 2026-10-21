import { useState } from "react";
import { errorNombre, errorCorreo, errorTelefono, errorComentario } from "../utils/validaciones";
import { leerStorage } from "../utils/formato";

// Cada campo del formulario se asocia a su regla de validación
const REGLAS = {
  nombre: errorNombre,
  correo: errorCorreo,
  telefono: errorTelefono,
  comentario: errorComentario
};

const VACIO = { nombre: "", correo: "", telefono: "", comentario: "" };

export default function Contacto() {
  // valores: lo que el usuario ha escrito en cada campo
  const [valores, setValores] = useState(VACIO);
  // errores: mensaje de error de cada campo. Si un campo no aparece aquí,
  // significa que todavía no se ha validado (no se pinta ni verde ni rojo).
  const [errores, setErrores] = useState({});
  const [resultado, setResultado] = useState({ texto: "", exito: false });

  // Se ejecuta cada vez que se escribe en un campo
  function alEscribir(e) {
    const { name, value } = e.target;       // name: "nombre", "correo"...
    setValores({ ...valores, [name]: value }); // copia los valores y cambia solo ese campo
    setResultado({ texto: "", exito: false });

    // Si el campo ya fue validado antes, se revalida mientras escribe
    if (errores[name] !== undefined) {
      setErrores({ ...errores, [name]: REGLAS[name](value.trim()) });
    }
  }

  // Se ejecuta al salir de un campo (onBlur): se valida por primera vez
  function alSalir(e) {
    const { name, value } = e.target;
    setErrores({ ...errores, [name]: REGLAS[name](value.trim()) });
  }

  // Clase CSS del campo: rojo si hay error, verde si está bien
  function claseCampo(campo) {
    if (errores[campo] === undefined) return "";
    if (errores[campo] !== "") return "campo-invalido";
    return valores[campo].trim() !== "" ? "campo-valido" : "";
  }

  function enviar(e) {
    e.preventDefault(); // evita que el navegador recargue la página

    // Validamos TODOS los campos de una vez
    const nuevosErrores = {};
    Object.keys(REGLAS).forEach(campo => {
      nuevosErrores[campo] = REGLAS[campo](valores[campo].trim());
    });
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some(mensaje => mensaje !== "");
    if (hayErrores) {
      setResultado({ texto: "Revisa los campos marcados antes de enviar.", exito: false });
      return;
    }

    // Todo bien: guardamos el mensaje en localStorage y limpiamos el formulario
    const mensajes = leerStorage("mensajesContacto", []);
    mensajes.push({ ...valores, fecha: new Date().toISOString() });
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

    setValores(VACIO);
    setErrores({});
    setResultado({ texto: "¡Mensaje enviado! Te responderemos a la brevedad.", exito: true });
  }

  const largoComentario = valores.comentario.trim().length;

  return (
    <main className="container seccion-espaciada">
      <header className="page-header mb-5">
        <div className="page-header-content">
          <i className="fa-solid fa-headset page-header-icon"></i>
          <h1 className="titulo-seccion mb-0">Contáctanos</h1>
          <p className="page-header-subtitle">¿Dudas sobre un repuesto o tu pedido? Escríbenos y te ayudamos.</p>
        </div>
      </header>

      <div className="row g-4">
        <section className="col-12 col-lg-5">
          <div className="contacto-card h-100">
            <h2 className="h4 fw-bold mb-4">Habla con nosotros</h2>
            <ul className="contacto-lista">
              <li>
                <a href="tel:+56957606659" className="contacto-item">
                  <span className="contacto-icono"><i className="fa-solid fa-phone"></i></span>
                  <span><strong>Teléfono</strong><small>+569 5760 6659</small></span>
                </a>
              </li>
              <li>
                <a href="mailto:contacto@autocarepro.cl" className="contacto-item">
                  <span className="contacto-icono"><i className="fa-solid fa-envelope"></i></span>
                  <span><strong>Correo electrónico</strong><small>contacto@autocarepro.cl</small></span>
                </a>
              </li>
              <li>
                <div className="contacto-item">
                  <span className="contacto-icono"><i className="fa-solid fa-location-dot"></i></span>
                  <span><strong>Ubicación</strong><small>Santiago, Chile</small></span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="col-12 col-lg-7">
          <div className="contacto-card">
            <h2 className="h4 fw-bold mb-4">Envíanos un mensaje</h2>

            {/* noValidate: desactiva la validación del navegador; validamos nosotros */}
            <form noValidate onSubmit={enviar}>
              <div className="form-grupo">
                <label htmlFor="nombre">Nombre*</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre"
                  className={claseCampo("nombre")} value={valores.nombre} onChange={alEscribir} onBlur={alSalir} />
                <p className="campo-error" id="errorNombre">{errores.nombre}</p>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6 form-grupo">
                  <label htmlFor="correo">Correo electrónico*</label>
                  <input type="email" id="correo" name="correo" placeholder="ejemplo@gmail.com"
                    className={claseCampo("correo")} value={valores.correo} onChange={alEscribir} onBlur={alSalir} />
                  <p className="campo-ayuda">Solo @duoc.cl, @profesor.duoc.cl o @gmail.com</p>
                  <p className="campo-error" id="errorCorreo">{errores.correo}</p>
                </div>

                <div className="col-12 col-md-6 form-grupo">
                  <label htmlFor="telefono">Teléfono (opcional)</label>
                  <input type="tel" id="telefono" name="telefono" placeholder="+56 9 XXXX XXXX"
                    className={claseCampo("telefono")} value={valores.telefono} onChange={alEscribir} onBlur={alSalir} />
                  <p className="campo-error" id="errorTelefono">{errores.telefono}</p>
                </div>
              </div>

              <div className="form-grupo">
                <label htmlFor="comentario">Comentario*</label>
                <textarea id="comentario" name="comentario" rows="5" placeholder="Cuéntanos en qué podemos ayudarte..."
                  className={claseCampo("comentario")} value={valores.comentario} onChange={alEscribir} onBlur={alSalir}></textarea>
                <div className="campo-pie">
                  <p className="campo-error" id="errorComentario">{errores.comentario}</p>
                  <small className={"contador" + (largoComentario > 500 ? " excedido" : "")} id="contadorComentario">
                    {largoComentario}/500
                  </small>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold">
                <i className="fa-solid fa-paper-plane"></i> Enviar mensaje
              </button>
              <p id="resultado" className={"contacto-resultado" + (resultado.exito ? " exito" : "")}>{resultado.texto}</p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
