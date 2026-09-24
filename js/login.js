const STORAGE_KEY = "usuariosAutoCare";
const ACTIVE_USER_KEY = "usuarioActivo";

function getUsuarios() {
  try {
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (error) {
    console.error("Error al leer usuarios:", error);
    return [];
  }
}

function setUsuarios(usuarios) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

function mostrarMensaje(id, texto, tipo) {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  elemento.textContent = texto;
  elemento.className = `auth-message ${tipo}`;
}

function crearUsuariosDemo() {
  const usuariosExistentes = getUsuarios();
  if (usuariosExistentes.length > 0) return;

  const usuariosDemo = [
    {
      nombre: "Administrador",
      usuario: "admin",
      email: "admin@autocarepro.cl",
      password: "admin123",
      rol: "ADMINISTRADOR"
    },
    {
      nombre: "Cliente Demo",
      usuario: "cliente",
      email: "cliente@autocarepro.cl",
      password: "cliente123",
      rol: "CLIENTE"
    }
  ];

  setUsuarios(usuariosDemo);
}

function logeo(event) {
  if (event) event.preventDefault();

  const usuarioInput = document.getElementById("loginUsuario");
  const passwordInput = document.getElementById("loginPassword");

  if (!usuarioInput || !passwordInput) return;

  const usuario = usuarioInput.value.trim();
  const password = passwordInput.value.trim();

  if (!usuario || !password) {
    mostrarMensaje("loginMensaje", "Debes completar todos los campos.", "error");
    return;
  }

  const usuarios = getUsuarios();
  const usuarioEncontrado = usuarios.find(item => {
    const coincideUsuario = item.usuario && item.usuario.toLowerCase() === usuario.toLowerCase();
    const coincideEmail = item.email && item.email.toLowerCase() === usuario.toLowerCase();
    return (coincideUsuario || coincideEmail) && item.password === password;
  });

  if (!usuarioEncontrado) {
    mostrarMensaje("loginMensaje", "Usuario o contraseña incorrectos.", "error");
    return;
  }

  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({
    nombre: usuarioEncontrado.nombre,
    usuario: usuarioEncontrado.usuario,
    email: usuarioEncontrado.email,
    rol: usuarioEncontrado.rol || "CLIENTE"
  }));

  mostrarMensaje("loginMensaje", "Inicio de sesión correcto.", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 600);
}

function registrar(event) {
  if (event) event.preventDefault();

  const nombreInput = document.getElementById("registerNombre");
  const usuarioInput = document.getElementById("registerUsuario");
  const emailInput = document.getElementById("registerEmail");
  const passwordInput = document.getElementById("registerPassword");

  if (!nombreInput || !usuarioInput || !emailInput || !passwordInput) return;

  const nombre = nombreInput.value.trim();
  const usuario = usuarioInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!nombre || !usuario || !email || !password) {
    mostrarMensaje("registerMensaje", "Completa todos los campos para registrarte.", "error");
    return;
  }

  const usuarios = getUsuarios();
  const yaExiste = usuarios.some(item =>
    item.usuario.toLowerCase() === usuario.toLowerCase() ||
    item.email.toLowerCase() === email.toLowerCase()
  );

  if (yaExiste) {
    mostrarMensaje("registerMensaje", "Ese usuario o correo ya está registrado.", "error");
    return;
  }

  usuarios.push({
    nombre,
    usuario,
    email,
    password,
    rol: "CLIENTE"
  });

  setUsuarios(usuarios);
  mostrarMensaje("registerMensaje", "Cuenta creada correctamente. Ya puedes iniciar sesión.", "success");

  document.getElementById("registerForm").reset();
}

window.logeo = logeo;
window.registrar = registrar;

document.addEventListener("DOMContentLoaded", () => {
  crearUsuariosDemo();

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", logeo);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", registrar);
  }
});
