import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuariosBase } from "../data/usuarios";
import { leerStorage } from "../utils/formato";
import { validarCorreo, validarPassword } from "../utils/validaciones";

// Junta los usuarios de prueba con los que se registraron
function todosLosUsuarios() {
  return usuariosBase.concat(leerStorage("usuariosRegistrados", []));
}

const MAX_INTENTOS = 5;

// Recibe onLogin: función de App que guarda el usuario activo
export default function Login({ onLogin }) {
  const navigate = useNavigate(); // permite cambiar de página desde el código

  // ----- Estado del login -----
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [intentos, setIntentos] = useState(0);

  // ----- Estado del registro -----
  const [reg, setReg] = useState({ nombre: "", correo: "", password: "" });
  const [mensajeReg, setMensajeReg] = useState({ texto: "", tipo: "" });

  function iniciarSesion(e) {
    e.preventDefault();

    if (intentos >= MAX_INTENTOS) {
      setMensaje({ texto: "Cuenta bloqueada temporalmente por superar los 5 intentos.", tipo: "error" });
      return;
    }
    if (correo.trim() === "") {
      setMensaje({ texto: "Debe ingresar su correo electrónico.", tipo: "error" });
      return;
    }
    if (!validarCorreo(correo.trim())) {
      setMensaje({ texto: "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.", tipo: "error" });
      return;
    }
    if (!validarPassword(password)) {
      setMensaje({ texto: "La contraseña debe tener entre 4 y 10 caracteres.", tipo: "error" });
      return;
    }

    // find busca el primer usuario que cumpla la condición
    const usuario = todosLosUsuarios().find(
      u => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password
    );

    if (usuario) {
      onLogin({ nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol });
      setMensaje({ texto: "Inicio de sesión correcto. Bienvenido " + usuario.nombre, tipo: "exito" });
      setTimeout(() => navigate(usuario.rol === "ADMINISTRADOR" ? "/admin" : "/"), 1000);
      return;
    }

    const nuevosIntentos = intentos + 1;
    setIntentos(nuevosIntentos);
    if (nuevosIntentos >= MAX_INTENTOS) {
      setMensaje({ texto: "Has superado los 5 intentos. La cuenta ha sido bloqueada.", tipo: "error" });
    } else {
      setMensaje({ texto: `Correo o contraseña incorrectos. Te quedan ${MAX_INTENTOS - nuevosIntentos} intento(s).`, tipo: "error" });
    }
  }

  function registrar(e) {
    e.preventDefault();
    const nombre = reg.nombre.trim();
    const correoReg = reg.correo.trim();

    if (nombre === "" || nombre.length > 100) {
      setMensajeReg({ texto: "El nombre es requerido (máximo 100 caracteres).", tipo: "error" });
      return;
    }
    if (!validarCorreo(correoReg)) {
      setMensajeReg({ texto: "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.", tipo: "error" });
      return;
    }
    if (todosLosUsuarios().some(u => u.correo.toLowerCase() === correoReg.toLowerCase())) {
      setMensajeReg({ texto: "Ese correo ya está registrado.", tipo: "error" });
      return;
    }
    if (!validarPassword(reg.password)) {
      setMensajeReg({ texto: "La contraseña debe tener entre 4 y 10 caracteres.", tipo: "error" });
      return;
    }

    const registrados = leerStorage("usuariosRegistrados", []);
    registrados.push({ nombre, correo: correoReg, password: reg.password, rol: "CLIENTE" });
    localStorage.setItem("usuariosRegistrados", JSON.stringify(registrados));

    setMensajeReg({ texto: "Cuenta creada correctamente. Ya puedes iniciar sesión.", tipo: "exito" });
    setReg({ nombre: "", correo: "", password: "" });
  }

  return (
    <div className="container">
      <br /><br />
      <div className="row justify-content-center g-4">

        {/* LOGIN */}
        <div className="col-12 col-md-5">
          <div className="text-center mb-3"><h1 className="h3"><i className="fas fa-user"></i> Iniciar Sesión</h1></div>
          <form id="loginForm" className="card p-4 shadow-sm" noValidate onSubmit={iniciarSesion}>
            <div className="mb-3 text-start">
              <label htmlFor="usuario" className="form-label fw-bold">Correo*</label>
              <input type="email" className="form-control" id="usuario" placeholder="tucorreo@duoc.cl"
                value={correo} onChange={e => setCorreo(e.target.value)} />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-bold">Contraseña*</label>
              <input type="password" className="form-control" id="password" placeholder="Entre 4 y 10 caracteres"
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <p id="loginMensaje" className={"mb-3 " + mensaje.tipo}>{mensaje.texto}</p>
            <button type="submit" className="btn btn-primary w-100 mt-2">Iniciar Sesión</button>
          </form>
        </div>

        {/* REGISTRO */}
        <div className="col-12 col-md-5">
          <div className="text-center mb-3"><h1 className="h3"><i className="fas fa-user-plus"></i> Registrarse</h1></div>
          <form id="registerForm" className="card p-4 shadow-sm" noValidate onSubmit={registrar}>
            <div className="mb-3 text-start">
              <label htmlFor="regNombre" className="form-label fw-bold">Nombre*</label>
              <input type="text" className="form-control" id="regNombre" placeholder="Ingrese su nombre"
                value={reg.nombre} onChange={e => setReg({ ...reg, nombre: e.target.value })} />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="regCorreo" className="form-label fw-bold">Correo*</label>
              <input type="email" className="form-control" id="regCorreo" placeholder="tucorreo@duoc.cl"
                value={reg.correo} onChange={e => setReg({ ...reg, correo: e.target.value })} />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="regPassword" className="form-label fw-bold">Contraseña*</label>
              <input type="password" className="form-control" id="regPassword" placeholder="Entre 4 y 10 caracteres"
                value={reg.password} onChange={e => setReg({ ...reg, password: e.target.value })} />
            </div>
            <p id="registerMensaje" className={"mb-3 " + mensajeReg.tipo}>{mensajeReg.texto}</p>
            <button type="submit" className="btn btn-primary w-100 mt-2">Registrar</button>
          </form>
        </div>

      </div>
    </div>
  );
}
