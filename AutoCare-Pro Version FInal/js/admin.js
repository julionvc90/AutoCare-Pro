/* ============================================================
   AUTOCARE PRO - PANEL (administrador y vendedor)
   Requiere cargar antes: funciones.js y regiones.js
   Roles (Anexo 1):
     ADMINISTRADOR: acceso total.
     VENDEDOR: solo ve productos (lista y detalle) y órdenes (lista y detalle).
     CLIENTE: solo la tienda (si entra al panel se le redirige a index.html).
   OJO: la protección es solo del lado del cliente (sirve para esta entrega
   sin backend); en una versión real la validación debe hacerse en el servidor.
   ============================================================ */

const ROL_ADMIN = "ADMINISTRADOR";
const ROL_VENDEDOR = "VENDEDOR";
const ROL_CLIENTE = "CLIENTE";
const CLAVE_PRODUCTOS_ADMIN = "productosAdmin";
const NOMBRES_ROLES = { ADMINISTRADOR: "Administrador", VENDEDOR: "Vendedor", CLIENTE: "Cliente" };

const MENU_PANEL = [
  { menu: "home", texto: "Dashboard", icono: "fa-gauge", href: "admin-home.html", roles: [ROL_ADMIN, ROL_VENDEDOR] },
  { menu: "productos", texto: "Productos", icono: "fa-box", href: "admin-productos.html", roles: [ROL_ADMIN, ROL_VENDEDOR] },
  { menu: "ordenes", texto: "Órdenes", icono: "fa-receipt", href: "admin-ordenes.html", roles: [ROL_ADMIN, ROL_VENDEDOR] },
  { menu: "usuarios", texto: "Usuarios", icono: "fa-users", href: "admin-usuarios.html", roles: [ROL_ADMIN] }
];

/* Órdenes de ejemplo (aún no hay backend que las genere). */
const ORDENES = [
  { numero: "ORD-1001", fecha: "2026-09-15", cliente: "Camila Rojas", correo: "camila.rojas@duoc.cl", estado: "Entregada", direccion: "Av. Providencia 1234, Providencia",
    items: [{ nombre: "Aceite de Motor Castrol Edge 5W-30 4L", cantidad: 1, precio: 34990 }, { nombre: "Filtro de Aceite Blindado Premium", cantidad: 1, precio: 8500 }] },
  { numero: "ORD-1002", fecha: "2026-09-17", cliente: "Diego Fuentes", correo: "diego.fuentes@gmail.com", estado: "Enviada", direccion: "Los Aromos 456, Maipú",
    items: [{ nombre: "Batería de Auto 12V 60AH Libre Mantención", cantidad: 1, precio: 68990 }] },
  { numero: "ORD-1003", fecha: "2026-09-18", cliente: "Valentina Soto", correo: "vale.soto@profesor.duoc.cl", estado: "En preparación", direccion: "Pasaje Los Olmos 88, La Florida",
    items: [{ nombre: "Shampoo Autolavado con Cera Concentrada", cantidad: 2, precio: 12990 }, { nombre: "Paños de Microfibra Ultra Absorbente (3u)", cantidad: 1, precio: 5490 }] },
  { numero: "ORD-1004", fecha: "2026-09-20", cliente: "Matías Pérez", correo: "matias.perez@gmail.com", estado: "Pendiente", direccion: "Calle Larga 321, Concepción",
    items: [{ nombre: "Compresor de Aire Portátil 12V Digital", cantidad: 1, precio: 24990 }, { nombre: "Cables Pasa Corriente Reforzados 3 Metros", cantidad: 1, precio: 11990 }] },
  { numero: "ORD-1005", fecha: "2026-09-21", cliente: "Javiera Muñoz", correo: "javiera.munoz@duoc.cl", estado: "Cancelada", direccion: "Av. Alemania 900, Temuco",
    items: [{ nombre: "Gata Hidráulica de Caimán 2 Toneladas", cantidad: 1, precio: 38000 }] },
  { numero: "ORD-1006", fecha: "2026-09-23", cliente: "Camila Rojas", correo: "camila.rojas@duoc.cl", estado: "Pendiente", direccion: "Av. Providencia 1234, Providencia",
    items: [{ nombre: "Ampolletas LED H7 de Alta Potencia", cantidad: 1, precio: 21990 }, { nombre: "Set de Fusibles Automotrices Surtidos", cantidad: 3, precio: 4500 }] }
];

const COLOR_ESTADO = { "Pendiente": "warning", "En preparación": "info", "Enviada": "primary", "Entregada": "success", "Cancelada": "danger" };

/* ---------- Utilidades ---------- */
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function formatoPrecio(valor) {
  return "$" + new Intl.NumberFormat("es-CL", { maximumFractionDigits: 2 }).format(Number(valor) || 0);
}

function totalOrden(orden) {
  return orden.items.reduce((suma, i) => suma + i.cantidad * i.precio, 0);
}

function obtenerSesionPanel() {
  try {
    return JSON.parse(localStorage.getItem("usuarioActivo"));
  } catch (error) {
    return null;
  }
}

function cerrarSesionPanel() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "Login.html";
}

function mostrarAviso(texto, tipo = "success") {
  const zona = document.getElementById("zonaAvisos");
  if (!zona) return;
  zona.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">${esc(texto)}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button></div>`;
}

/* Muestra el aviso que dejó un formulario (?msg=...) al volver al listado. */
function mostrarAvisoDesdeUrl() {
  const mensajes = { creado: "Registro creado correctamente.", editado: "Cambios guardados correctamente.", eliminado: "Registro eliminado correctamente." };
  const clave = new URLSearchParams(window.location.search).get("msg");
  if (mensajes[clave]) mostrarAviso(mensajes[clave]);
}

/* ---------- Sesión, rol y menú ---------- */
function protegerPagina() {
  const sesion = obtenerSesionPanel();

  if (!sesion) {
    window.location.replace("Login.html");
    return null;
  }
  if (sesion.rol !== ROL_ADMIN && sesion.rol !== ROL_VENDEDOR) {
    window.location.replace("index.html");
    return null;
  }
  const permitidos = (document.body.dataset.roles || "").split(",");
  if (!permitidos.includes(sesion.rol)) {
    window.location.replace("admin-home.html");
    return null;
  }

  document.body.classList.add("autorizado");
  return sesion;
}

function dibujarMenu(sesion) {
  const menu = document.getElementById("menuLateral");
  if (!menu) return;

  const enlaces = MENU_PANEL
    .filter(item => item.roles.includes(sesion.rol))
    .map(item => `<a class="admin-link ${item.menu === document.body.dataset.menu ? "activo" : ""}" href="${item.href}"><i class="fa-solid ${item.icono}" aria-hidden="true"></i><span>${item.texto}</span></a>`)
    .join("");

  menu.innerHTML = `
    <a class="admin-marca" href="admin-home.html"><img src="IMG/Logo.png" alt="AutoCare Pro"><span><span class="auto">AUTO</span><span class="care">CARE</span><span class="pro">Pro</span></span></a>
    <nav class="admin-nav" aria-label="Menú principal">${enlaces}</nav>
    <div class="admin-nav-pie">
      <a class="admin-link" href="index.html"><i class="fa-solid fa-store" aria-hidden="true"></i><span>Ver tienda</span></a>
      <button type="button" class="admin-link" id="btnSalir"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i><span>Cerrar sesión</span></button>
    </div>`;

  document.getElementById("btnSalir").addEventListener("click", cerrarSesionPanel);
  document.getElementById("btnMenu")?.addEventListener("click", () => menu.classList.toggle("abierto"));

  const info = document.getElementById("infoUsuario");
  if (info) {
    info.innerHTML = `<i class="fa-solid fa-circle-user fa-lg" aria-hidden="true"></i><span>${esc(sesion.nombre)}</span><span class="badge text-bg-success">${NOMBRES_ROLES[sesion.rol]}</span>`;
  }
}

/* ---------- Productos (datos) ---------- */
function guardarProductos() {
  localStorage.setItem(CLAVE_PRODUCTOS_ADMIN, JSON.stringify(listaProductos));
}

function codigoDe(producto) {
  return producto.codigo || "PRD" + String(producto.id).padStart(3, "0");
}

function enAlertaStock(producto) {
  return producto.stockCritico !== undefined && producto.stockCritico !== null && producto.stockCritico !== ""
    && Number(producto.stock) <= Number(producto.stockCritico);
}

function nombreCategoria(clave) {
  return NOMBRES_CATEGORIAS[clave] || clave;
}

/* ---------- Listado reutilizable (búsqueda + paginación) ---------- */
function crearListado({ cuerpoId, paginacionId, filtroId, obtenerDatos, filaHtml, textoBusqueda, columnas, porPagina = 8 }) {
  const cuerpo = document.getElementById(cuerpoId);
  const paginacion = document.getElementById(paginacionId);
  const filtro = document.getElementById(filtroId);
  let pagina = 1;

  function dibujar() {
    const termino = (filtro ? filtro.value : "").trim().toLowerCase();
    const datos = obtenerDatos().filter(d => !termino || textoBusqueda(d).toLowerCase().includes(termino));
    const totalPaginas = Math.max(1, Math.ceil(datos.length / porPagina));
    pagina = Math.min(pagina, totalPaginas);

    const visibles = datos.slice((pagina - 1) * porPagina, pagina * porPagina);
    cuerpo.innerHTML = visibles.length
      ? visibles.map(filaHtml).join("")
      : `<tr><td colspan="${columnas}" class="text-center py-4">No hay resultados.</td></tr>`;

    let botones = "";
    for (let i = 1; i <= totalPaginas; i++) {
      botones += `<li class="page-item ${i === pagina ? "active" : ""}"><button type="button" class="page-link" data-pag="${i}">${i}</button></li>`;
    }
    paginacion.innerHTML = totalPaginas > 1 ? botones : "";
  }

  paginacion.addEventListener("click", e => {
    const boton = e.target.closest("[data-pag]");
    if (boton) { pagina = Number(boton.dataset.pag); dibujar(); }
  });
  if (filtro) filtro.addEventListener("input", () => { pagina = 1; dibujar(); });

  dibujar();
  return { dibujar };
}

/* ---------- Validación en tiempo real (formularios) ---------- */
function marcarCampo(input, mensaje) {
  input.classList.toggle("is-invalid", Boolean(mensaje));
  input.classList.toggle("is-valid", !mensaje && input.value !== "");
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  if (feedback) feedback.textContent = mensaje || "";
  return !mensaje;
}

/* campos: { idDelInput: (valor, input) => "mensaje de error" o "" }
   Devuelve una función que valida todo y dice si el formulario es válido. */
function conectarValidacion(campos) {
  const revisar = id => {
    const input = document.getElementById(id);
    return marcarCampo(input, campos[id](input.value, input));
  };

  Object.keys(campos).forEach(id => {
    const input = document.getElementById(id);
    const evento = input.tagName === "SELECT" || input.type === "file" ? "change" : "input";
    input.addEventListener(evento, () => revisar(id));
    input.addEventListener("blur", () => revisar(id));
  });

  return () => Object.keys(campos).map(revisar).every(Boolean);
}

/* Contador dinámico de caracteres: <textarea data-max="500"> + <small class="contador">. */
function activarContadores() {
  document.querySelectorAll("[data-max]").forEach(campo => {
    const contador = campo.parentElement.querySelector(".contador");
    if (!contador) return;
    const actualizar = () => { contador.textContent = `${campo.value.length}/${campo.dataset.max}`; };
    campo.addEventListener("input", actualizar);
    actualizar();
  });
}

/* ---------- Página: Dashboard ---------- */
function iniciarHome(sesion) {
  const esAdmin = sesion.rol === ROL_ADMIN;
  document.getElementById("saludo").textContent = `¡HOLA ${NOMBRES_ROLES[sesion.rol]}!`;

  const pendientes = ORDENES.filter(o => o.estado === "Pendiente").length;
  const ventas = ORDENES.filter(o => o.estado !== "Cancelada").reduce((s, o) => s + totalOrden(o), 0);
  const kpis = [
    { icono: "fa-box", valor: listaProductos.length, etiqueta: "Productos" },
    { icono: "fa-receipt", valor: ORDENES.length, etiqueta: "Órdenes" },
    { icono: "fa-hourglass-half", valor: pendientes, etiqueta: "Órdenes pendientes" }
  ];
  if (esAdmin) {
    kpis.push({ icono: "fa-users", valor: obtenerTodosLosUsuarios().length, etiqueta: "Usuarios" });
    kpis.push({ icono: "fa-sack-dollar", valor: formatoPrecio(ventas), etiqueta: "Ventas (sin canceladas)" });
  }

  document.getElementById("resumen").innerHTML = kpis.map(k => `
    <div class="col-sm-6 col-xl-4"><div class="admin-card kpi"><i class="fa-solid ${k.icono}" aria-hidden="true"></i>
    <div><div class="valor">${esc(k.valor)}</div><div class="etiqueta">${k.etiqueta}</div></div></div></div>`).join("");

  const criticos = listaProductos.filter(enAlertaStock);
  document.getElementById("alertasStock").innerHTML = criticos.length
    ? criticos.map(p => `<li class="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between"><span><i class="fa-solid fa-triangle-exclamation text-warning me-2" aria-hidden="true"></i>${esc(p.nombre)}</span><span class="badge text-bg-danger">Stock ${p.stock} (crítico ${p.stockCritico})</span></li>`).join("")
    : '<li class="list-group-item bg-transparent text-white border-secondary">No hay productos con stock crítico.</li>';

  const accesos = [
    `<a class="btn btn-success" href="admin-productos.html"><i class="fa-solid fa-box me-2" aria-hidden="true"></i>${esAdmin ? "Administrar productos" : "Ver productos"}</a>`,
    `<a class="btn btn-outline-light" href="admin-ordenes.html"><i class="fa-solid fa-receipt me-2" aria-hidden="true"></i>Ver órdenes</a>`
  ];
  if (esAdmin) accesos.push(`<a class="btn btn-outline-light" href="admin-usuarios.html"><i class="fa-solid fa-users me-2" aria-hidden="true"></i>Administrar usuarios</a>`);
  document.getElementById("accesos").innerHTML = accesos.join("");
}

/* ---------- Página: listado de productos ---------- */
function iniciarProductos(sesion) {
  const esAdmin = sesion.rol === ROL_ADMIN;
  mostrarAvisoDesdeUrl();
  if (!esAdmin) document.querySelectorAll(".solo-admin").forEach(el => el.remove());

  const listado = crearListado({
    cuerpoId: "cuerpoProductos", paginacionId: "paginacion", filtroId: "filtro", columnas: 7,
    obtenerDatos: () => listaProductos,
    textoBusqueda: p => `${codigoDe(p)} ${p.nombre} ${nombreCategoria(p.categoria)}`,
    filaHtml: p => `
      <tr class="${enAlertaStock(p) ? "fila-alerta" : ""}">
        <td><img class="mini" src="${esc(p.imagen || IMAGEN_POR_DEFECTO)}" alt="" onerror="this.onerror=null;this.src='${IMAGEN_POR_DEFECTO}'"></td>
        <td>${esc(codigoDe(p))}</td>
        <td>${esc(p.nombre)}</td>
        <td>${esc(nombreCategoria(p.categoria))}</td>
        <td>${formatoPrecio(p.precio)}</td>
        <td>${p.stock}${enAlertaStock(p) ? ' <span class="badge text-bg-danger" title="Stock igual o inferior al crítico">Stock crítico</span>' : ""}</td>
        <td class="text-nowrap">
          <button type="button" class="btn btn-sm btn-outline-light" data-accion="ver" data-id="${p.id}" aria-label="Ver detalle"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
          ${esAdmin ? `<a class="btn btn-sm btn-outline-success" href="admin-producto-form.html?id=${p.id}" aria-label="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i></a>
          <button type="button" class="btn btn-sm btn-outline-danger" data-accion="eliminar" data-id="${p.id}" aria-label="Eliminar"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>` : ""}
        </td>
      </tr>`
  });

  document.getElementById("cuerpoProductos").addEventListener("click", e => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;
    const producto = listaProductos.find(p => p.id === Number(boton.dataset.id));
    if (!producto) return;

    if (boton.dataset.accion === "ver") {
      document.getElementById("detalleTitulo").textContent = producto.nombre;
      document.getElementById("detalleCuerpo").innerHTML = `
        <div class="row g-3">
          <div class="col-md-4"><img class="img-fluid rounded bg-white" src="${esc(producto.imagen || IMAGEN_POR_DEFECTO)}" alt="${esc(producto.nombre)}" onerror="this.onerror=null;this.src='${IMAGEN_POR_DEFECTO}'"></div>
          <div class="col-md-8">
            <p class="mb-1"><strong>Código:</strong> ${esc(codigoDe(producto))}</p>
            <p class="mb-1"><strong>Categoría:</strong> ${esc(nombreCategoria(producto.categoria))}</p>
            <p class="mb-1"><strong>Precio:</strong> ${formatoPrecio(producto.precio)}</p>
            <p class="mb-1"><strong>Stock:</strong> ${producto.stock}${producto.stockCritico !== undefined && producto.stockCritico !== "" ? ` (crítico: ${producto.stockCritico})` : ""}</p>
            <p class="mb-0"><strong>Descripción:</strong> ${esc(producto.descripcion) || "Sin descripción."}</p>
          </div>
        </div>`;
      new bootstrap.Modal(document.getElementById("modalDetalle")).show();
    }

    if (boton.dataset.accion === "eliminar" && esAdmin) {
      if (!confirm(`¿Eliminar el producto "${producto.nombre}"?`)) return;
      listaProductos.splice(listaProductos.indexOf(producto), 1);
      guardarProductos();
      listado.dibujar();
      mostrarAviso("Producto eliminado correctamente.");
    }
  });
}

/* ---------- Página: nuevo / editar producto ---------- */
function iniciarProductoForm() {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const existente = id ? listaProductos.find(p => p.id === id) : null;
  if (id && !existente) { window.location.replace("admin-productos.html"); return; }

  document.getElementById("tituloForm").textContent = existente ? "Editar producto" : "Nuevo producto";
  document.getElementById("categoria").innerHTML = '<option value="">-- Seleccione la categoría --</option>' +
    Object.keys(NOMBRES_CATEGORIAS).map(c => `<option value="${c}">${NOMBRES_CATEGORIAS[c]}</option>`).join("");

  let imagenNueva = null;
  const campoImagen = document.getElementById("imagen");
  const vistaPrevia = document.getElementById("vistaPrevia");

  if (existente) {
    document.getElementById("codigo").value = codigoDe(existente);
    document.getElementById("nombre").value = existente.nombre;
    document.getElementById("descripcion").value = existente.descripcion || "";
    document.getElementById("precio").value = existente.precio;
    document.getElementById("stock").value = existente.stock;
    document.getElementById("stockCritico").value = existente.stockCritico ?? "";
    document.getElementById("categoria").value = existente.categoria;
    if (existente.imagen) { vistaPrevia.src = existente.imagen; vistaPrevia.hidden = false; }
  }

  campoImagen.addEventListener("change", () => {
    const archivo = campoImagen.files[0];
    if (!archivo || archivo.size > 300 * 1024 || !archivo.type.startsWith("image/")) return;
    const lector = new FileReader();
    lector.onload = () => { imagenNueva = lector.result; vistaPrevia.src = imagenNueva; vistaPrevia.hidden = false; };
    lector.readAsDataURL(archivo);
  });

  const esEntero = v => /^\d+$/.test(v.trim());

  function avisoStock() {
    const stock = document.getElementById("stock").value.trim();
    const critico = document.getElementById("stockCritico").value.trim();
    const alerta = document.getElementById("alertaStock");
    alerta.hidden = !(esEntero(stock) && esEntero(critico) && Number(stock) <= Number(critico));
  }
  ["stock", "stockCritico"].forEach(i => document.getElementById(i).addEventListener("input", avisoStock));
  avisoStock();

  const validarTodo = conectarValidacion({
    codigo: v => {
      const codigo = v.trim();
      if (!codigo) return "El código es requerido.";
      if (codigo.length < 3) return "El código debe tener al menos 3 caracteres.";
      const repetido = listaProductos.some(p => codigoDe(p).toLowerCase() === codigo.toLowerCase() && (!existente || p.id !== existente.id));
      return repetido ? "Ya existe un producto con ese código." : "";
    },
    nombre: v => !v.trim() ? "El nombre es requerido." : v.length > 100 ? "El nombre admite máximo 100 caracteres." : "",
    descripcion: v => v.length > 500 ? "La descripción admite máximo 500 caracteres." : "",
    precio: v => {
      if (v.trim() === "") return "El precio es requerido.";
      const n = Number(v);
      if (Number.isNaN(n)) return "Ingresa un número válido (puede tener decimales).";
      return n < 0 ? "El precio no puede ser negativo (0 se considera producto FREE)." : "";
    },
    stock: v => v.trim() === "" ? "El stock es requerido." : !esEntero(v) ? "El stock debe ser un número entero mayor o igual a 0." : "",
    stockCritico: v => v.trim() === "" || esEntero(v) ? "" : "El stock crítico debe ser un número entero mayor o igual a 0.",
    categoria: v => v ? "" : "Selecciona una categoría.",
    imagen: (v, input) => {
      const archivo = input.files[0];
      if (!archivo) return "";
      if (!archivo.type.startsWith("image/")) return "El archivo debe ser una imagen.";
      return archivo.size > 300 * 1024 ? "La imagen no puede pesar más de 300 KB." : "";
    }
  });
  activarContadores();

  document.getElementById("formProducto").addEventListener("submit", e => {
    e.preventDefault();
    if (!validarTodo()) return;

    const criticoTexto = document.getElementById("stockCritico").value.trim();
    const datos = {
      codigo: document.getElementById("codigo").value.trim(),
      nombre: document.getElementById("nombre").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      precio: Number(document.getElementById("precio").value),
      stock: Number(document.getElementById("stock").value),
      stockCritico: criticoTexto === "" ? "" : Number(criticoTexto),
      categoria: document.getElementById("categoria").value
    };

    if (existente) {
      Object.assign(existente, datos);
      if (imagenNueva) existente.imagen = imagenNueva;
    } else {
      const nuevoId = listaProductos.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      listaProductos.push({ id: nuevoId, ...datos, imagen: imagenNueva || IMAGEN_POR_DEFECTO });
    }

    guardarProductos();
    window.location.href = `admin-productos.html?msg=${existente ? "editado" : "creado"}`;
  });
}

/* ---------- Página: órdenes ---------- */
function iniciarOrdenes() {
  crearListado({
    cuerpoId: "cuerpoOrdenes", paginacionId: "paginacion", filtroId: "filtro", columnas: 6,
    obtenerDatos: () => ORDENES,
    textoBusqueda: o => `${o.numero} ${o.cliente} ${o.estado}`,
    filaHtml: o => `
      <tr>
        <td>${o.numero}</td><td>${o.fecha}</td><td>${esc(o.cliente)}</td>
        <td><span class="badge text-bg-${COLOR_ESTADO[o.estado]}">${o.estado}</span></td>
        <td>${formatoPrecio(totalOrden(o))}</td>
        <td><button type="button" class="btn btn-sm btn-outline-light" data-numero="${o.numero}" aria-label="Ver detalle de la orden"><i class="fa-solid fa-eye" aria-hidden="true"></i></button></td>
      </tr>`
  });

  document.getElementById("cuerpoOrdenes").addEventListener("click", e => {
    const boton = e.target.closest("[data-numero]");
    if (!boton) return;
    const orden = ORDENES.find(o => o.numero === boton.dataset.numero);
    document.getElementById("detalleTitulo").textContent = `Orden ${orden.numero}`;
    document.getElementById("detalleCuerpo").innerHTML = `
      <p class="mb-1"><strong>Fecha:</strong> ${orden.fecha}</p>
      <p class="mb-1"><strong>Cliente:</strong> ${esc(orden.cliente)} (${esc(orden.correo)})</p>
      <p class="mb-1"><strong>Dirección de envío:</strong> ${esc(orden.direccion)}</p>
      <p class="mb-3"><strong>Estado:</strong> <span class="badge text-bg-${COLOR_ESTADO[orden.estado]}">${orden.estado}</span></p>
      <div class="tabla-contenedor"><table class="table tabla-admin">
        <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead>
        <tbody>${orden.items.map(i => `<tr><td>${esc(i.nombre)}</td><td>${i.cantidad}</td><td>${formatoPrecio(i.precio)}</td><td>${formatoPrecio(i.cantidad * i.precio)}</td></tr>`).join("")}</tbody>
        <tfoot><tr><th colspan="3" class="text-end">Total</th><th>${formatoPrecio(totalOrden(orden))}</th></tr></tfoot>
      </table></div>`;
    new bootstrap.Modal(document.getElementById("modalDetalle")).show();
  });
}

/* ---------- Usuarios (datos) ---------- */
function guardarUsuariosRegistrados(lista) {
  localStorage.setItem(CLAVE_USUARIOS_REGISTRADOS, JSON.stringify(lista));
}

function esUsuarioBase(usuario) {
  return usuarios.some(u => u.correo.toLowerCase() === usuario.correo.toLowerCase());
}

function nombreCompleto(u) {
  return `${u.nombre || ""} ${u.apellidos || ""}`.trim();
}

/* ---------- Página: listado de usuarios ---------- */
function iniciarUsuarios(sesion) {
  mostrarAvisoDesdeUrl();

  const listado = crearListado({
    cuerpoId: "cuerpoUsuarios", paginacionId: "paginacion", filtroId: "filtro", columnas: 6,
    obtenerDatos: obtenerTodosLosUsuarios,
    textoBusqueda: u => `${u.rut || ""} ${nombreCompleto(u)} ${u.correo} ${NOMBRES_ROLES[u.rol] || ""}`,
    filaHtml: u => {
      const base = esUsuarioBase(u);
      const esYo = u.correo.toLowerCase() === sesion.correo.toLowerCase();
      return `
      <tr>
        <td>${esc(u.rut || "-")}</td>
        <td>${esc(nombreCompleto(u))}</td>
        <td>${esc(u.correo)}</td>
        <td><span class="badge text-bg-${u.rol === ROL_ADMIN ? "danger" : u.rol === ROL_VENDEDOR ? "primary" : "secondary"}">${NOMBRES_ROLES[u.rol] || u.rol}</span></td>
        <td>${esc([u.comuna, u.region].filter(Boolean).join(", ") || "-")}</td>
        <td class="text-nowrap">${base
          ? '<span class="badge text-bg-dark border">Cuenta base</span>'
          : `<a class="btn btn-sm btn-outline-success" href="admin-usuario-form.html?correo=${encodeURIComponent(u.correo)}" aria-label="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i></a>
             ${esYo ? "" : `<button type="button" class="btn btn-sm btn-outline-danger" data-correo="${esc(u.correo)}" aria-label="Eliminar"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>`}`}
        </td>
      </tr>`;
    }
  });

  document.getElementById("cuerpoUsuarios").addEventListener("click", e => {
    const boton = e.target.closest("[data-correo]");
    if (!boton) return;
    if (!confirm(`¿Eliminar al usuario ${boton.dataset.correo}?`)) return;
    guardarUsuariosRegistrados(obtenerUsuariosRegistrados().filter(u => u.correo.toLowerCase() !== boton.dataset.correo.toLowerCase()));
    listado.dibujar();
    mostrarAviso("Usuario eliminado correctamente.");
  });
}

/* ---------- Página: nuevo / editar usuario ---------- */
function iniciarUsuarioForm(sesion) {
  const correoOriginal = new URLSearchParams(window.location.search).get("correo");
  const existente = correoOriginal
    ? obtenerUsuariosRegistrados().find(u => u.correo.toLowerCase() === correoOriginal.toLowerCase())
    : null;
  if (correoOriginal && !existente) { window.location.replace("admin-usuarios.html"); return; }

  document.getElementById("tituloForm").textContent = existente ? "Editar usuario" : "Nuevo usuario";

  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");
  cargarRegiones(selectRegion);
  cargarComunas(selectComuna, "");
  selectRegion.addEventListener("change", () => cargarComunas(selectComuna, selectRegion.value));

  if (existente) {
    document.getElementById("run").value = existente.rut || "";
    document.getElementById("nombre").value = existente.nombre || "";
    document.getElementById("apellidos").value = existente.apellidos || "";
    document.getElementById("correo").value = existente.correo;
    document.getElementById("telefono").value = existente.celular || "";
    document.getElementById("fechaNacimiento").value = existente.fechaNacimiento || "";
    document.getElementById("tipoUsuario").value = existente.rol;
    selectRegion.value = existente.region || "";
    cargarComunas(selectComuna, selectRegion.value);
    selectComuna.value = existente.comuna || "";
    document.getElementById("direccion").value = existente.direccion || "";
    document.getElementById("ayudaPassword").textContent = "Déjala en blanco para mantener la contraseña actual.";
  }

  const passwordVacioPermitido = () => Boolean(existente);

  const validarTodo = conectarValidacion({
    run: v => {
      const run = v.trim();
      if (!run) return "El RUN es requerido.";
      if (/[.\-]/.test(run)) return "Escríbelo sin puntos ni guion (ej: 123456785).";
      if (!/^[0-9]+[0-9Kk]$/.test(run)) return "Solo números y, al final, un dígito verificador (0-9 o K).";
      if (run.length < 7 || run.length > 9) return "El RUN debe tener entre 7 y 9 caracteres.";
      return validarRut(run) ? "" : "El RUN no es válido (revisa el dígito verificador).";
    },
    nombre: v => !v.trim() ? "El nombre es requerido." : v.length > 50 ? "El nombre admite máximo 50 caracteres." : "",
    apellidos: v => !v.trim() ? "Los apellidos son requeridos." : v.length > 100 ? "Los apellidos admiten máximo 100 caracteres." : "",
    correo: v => {
      const correo = v.trim();
      if (!correo) return "El correo es requerido.";
      if (correo.length > 100) return "El correo admite máximo 100 caracteres.";
      if (!validarCorreo(correo)) return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      const otro = buscarUsuarioPorCorreo(correo);
      const mismo = existente && otro && otro.correo.toLowerCase() === existente.correo.toLowerCase();
      return otro && !mismo ? "Ese correo ya está registrado." : "";
    },
    password: v => {
      if (!v && passwordVacioPermitido()) return "";
      if (!v) return "La contraseña es requerida.";
      return validarPassword(v) ? "" : "La contraseña debe tener entre 4 y 10 caracteres.";
    },
    confirmarPassword: v => {
      const password = document.getElementById("password").value;
      if (!password && passwordVacioPermitido()) return "";
      return v === password ? "" : "Las contraseñas no coinciden.";
    },
    telefono: v => !v.trim() || /^\+?\d{8,11}$/.test(v.trim()) ? "" : "Teléfono inválido (solo números, ej: 912345678).",
    fechaNacimiento: v => {
      if (!v) return "";
      const fecha = new Date(v);
      if (Number.isNaN(fecha.getTime()) || fecha > new Date() || fecha.getFullYear() < 1900) return "Ingresa una fecha de nacimiento válida.";
      return "";
    },
    tipoUsuario: v => v ? "" : "Selecciona el tipo de usuario.",
    region: v => v ? "" : "Selecciona la región.",
    comuna: v => v ? "" : "Selecciona la comuna.",
    direccion: v => !v.trim() ? "La dirección es requerida." : v.length > 300 ? "La dirección admite máximo 300 caracteres." : ""
  });
  activarContadores();

  // Si cambian la contraseña, se vuelve a revisar la confirmación.
  document.getElementById("password").addEventListener("input", () => {
    const conf = document.getElementById("confirmarPassword");
    if (conf.value) conf.dispatchEvent(new Event("input"));
  });

  document.getElementById("formUsuario").addEventListener("submit", e => {
    e.preventDefault();
    if (!validarTodo()) return;

    const password = document.getElementById("password").value;
    const datos = {
      rut: document.getElementById("run").value.trim().toUpperCase(),
      nombre: document.getElementById("nombre").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      celular: document.getElementById("telefono").value.trim(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      rol: document.getElementById("tipoUsuario").value,
      region: selectRegion.value,
      comuna: selectComuna.value,
      direccion: document.getElementById("direccion").value.trim()
    };

    const lista = obtenerUsuariosRegistrados();
    if (existente) {
      const posicion = lista.findIndex(u => u.correo.toLowerCase() === existente.correo.toLowerCase());
      lista[posicion] = { ...existente, ...datos, password: password || existente.password };
      if (existente.correo.toLowerCase() === sesion.correo.toLowerCase()) {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: datos.nombre, correo: datos.correo, rol: datos.rol }));
      }
    } else {
      lista.push({ ...datos, password });
    }

    guardarUsuariosRegistrados(lista);
    window.location.href = `admin-usuarios.html?msg=${existente ? "editado" : "creado"}`;
  });
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const sesion = protegerPagina();
  if (!sesion) return;
  dibujarMenu(sesion);

  const paginas = {
    home: iniciarHome, productos: iniciarProductos, "producto-form": iniciarProductoForm,
    ordenes: iniciarOrdenes, usuarios: iniciarUsuarios, "usuario-form": iniciarUsuarioForm
  };
  const iniciar = paginas[document.body.dataset.pagina];
  if (iniciar) iniciar(sesion);
});
