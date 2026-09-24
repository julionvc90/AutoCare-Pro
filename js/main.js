/* ============================================================
   AUTOCARE PRO - LÓGICA PRINCIPAL
   ============================================================ */

/* 1. Configuración */
const CLAVE_CARRITO = "carritoAutoCare";

/* 2. Inicialización */
document.addEventListener("DOMContentLoaded", inicializarPagina);

function inicializarPagina() {
  actualizarContadorCarrito();
  configurarPanelCarrito();
  mostrarSesionEnBarra();
}

/* Sesión: si hay un usuario logueado, la barra superior muestra su nombre,
   un acceso al panel (solo administrador y vendedor) y "Salir". */
function mostrarSesionEnBarra() {
  const botonLogin = document.querySelector(".btn-top-login");
  if (!botonLogin) return;

  let sesion = null;
  try {
    sesion = JSON.parse(localStorage.getItem("usuarioActivo"));
  } catch (error) {
    sesion = null;
  }
  if (!sesion || !sesion.nombre) return;

  const esPersonal = sesion.rol === "ADMINISTRADOR" || sesion.rol === "VENDEDOR";

  botonLogin.removeAttribute("href");
  botonLogin.style.cursor = "default";
  botonLogin.innerHTML = '<i class="fa-solid fa-user" aria-hidden="true"></i><span></span>';
  botonLogin.querySelector("span").textContent = sesion.nombre;

  if (esPersonal) {
    const panel = document.createElement("a");
    panel.href = "admin-home.html";
    panel.className = "btn-top-login";
    panel.innerHTML = '<i class="fa-solid fa-gauge" aria-hidden="true"></i><span>Panel</span>';
    botonLogin.insertAdjacentElement("afterend", panel);
  }

  const salir = document.createElement("a");
  salir.href = "index.html";
  salir.className = "btn-top-login";
  salir.innerHTML = '<i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i><span>Salir</span>';
  salir.addEventListener("click", () => localStorage.removeItem("usuarioActivo"));
  (esPersonal ? botonLogin.nextElementSibling : botonLogin).insertAdjacentElement("afterend", salir);
}

/* 3. Buscador */
function buscarProducto() {
  const buscador = document.getElementById("buscador");
  if (!buscador) return;

  const termino = buscador.value.trim();

  if (!termino) {
    alert("Por favor ingrese un término de búsqueda.");
    return;
  }

  alert(`Buscando productos relacionados con: "${termino}".`);
}

/* 4. Operaciones del carrito */
// Regla de stock: el carrito nunca puede tener más unidades que el stock del
// producto. Si el producto no está en listaProductos (o funciones.js no está
// cargado en la página, como en index.html) se usa un tope fijo.
const CANTIDAD_MAXIMA_POR_PRODUCTO = 10;

function obtenerLimiteProducto(nombre) {
  if (typeof listaProductos !== "undefined") {
    const producto = listaProductos.find(p => p.nombre === nombre);
    if (producto) return producto.stock;
  }
  return CANTIDAD_MAXIMA_POR_PRODUCTO;
}

function agregarAlCarrito(nombre, precio, cantidad = 1) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(producto => producto.nombre === nombre);
  const limite = obtenerLimiteProducto(nombre);
  const cantidadActual = productoExistente ? productoExistente.cantidad : 0;
  const cantidadFinal = Math.min(cantidadActual + cantidad, limite);
  const agregadas = cantidadFinal - cantidadActual;

  if (agregadas <= 0) {
    alert(`Ya tienes en el carrito todas las unidades disponibles de "${nombre}" (${limite}).`);
    return;
  }

  if (productoExistente) {
    productoExistente.cantidad = cantidadFinal;
  } else {
    carrito.push({ nombre, precio, cantidad: cantidadFinal });
  }

  guardarCarrito(carrito);
  refrescarCarrito();

  if (agregadas < cantidad) {
    alert(`Solo quedaban ${limite} unidades de "${nombre}". Se agregaron ${agregadas}.`);
  } else {
    alert(`${agregadas} x "${nombre}" fue añadido al carrito.`);
  }
}

// Cambia la cantidad de un producto ya agregado (1 hasta el límite de stock).
// Devuelve la cantidad final para que la vista pueda mostrar avisos.
function cambiarCantidadCarrito(nombre, nuevaCantidad) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(p => p.nombre === nombre);
  if (!producto) return 0;

  producto.cantidad = Math.max(1, Math.min(nuevaCantidad, obtenerLimiteProducto(nombre)));
  guardarCarrito(carrito);
  refrescarCarrito();
  return producto.cantidad;
}

function eliminarDelCarrito(nombre) {
  guardarCarrito(obtenerCarrito().filter(p => p.nombre !== nombre));
  refrescarCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  refrescarCarrito();
}

// Mantiene sincronizados el contador y el panel desplegable tras cualquier cambio.
function refrescarCarrito() {
  actualizarContadorCarrito();
  actualizarPanelCarrito();
}

function obtenerCarrito() {
  try {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error("No se pudo leer el carrito:", error);
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/* 5. Contador del carrito */
function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return;

  const totalProductos = obtenerCarrito().reduce(
    (total, producto) => total + Number(producto.cantidad || 0),
    0
  );

  contador.textContent = totalProductos;
}

/* 6. Panel desplegable */
function configurarPanelCarrito() {
  const boton = document.getElementById("btnCarrito");
  const panel = document.getElementById("panelCarrito");
  const botonCerrar = document.getElementById("cerrarCarrito");

  if (!boton || !panel) {
    console.error("No se encontraron btnCarrito o panelCarrito en el HTML.");
    return;
  }

  boton.addEventListener("click", alternarPanelCarrito);
  botonCerrar?.addEventListener("click", cerrarPanelCarrito);
}

function alternarPanelCarrito(evento) {
  evento?.preventDefault();
  evento?.stopPropagation();

  const boton = document.getElementById("btnCarrito");
  const panel = document.getElementById("panelCarrito");

  if (!boton || !panel) return;

  const panelAbierto = !panel.hasAttribute("hidden");

  if (panelAbierto) {
    panel.setAttribute("hidden", "");
  } else {
    panel.removeAttribute("hidden");
    actualizarPanelCarrito();
  }

  boton.setAttribute("aria-expanded", String(!panelAbierto));
}

function actualizarPanelCarrito() {
  const lista = document.getElementById("listaCarrito");
  const totalElemento = document.getElementById("totalCarrito");
  if (!lista || !totalElemento) return;

  const carrito = obtenerCarrito();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="cart-empty mb-0">El carrito está vacío.</p>';
    totalElemento.textContent = "$0";
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    const precio = Number(producto.precio || 0);
    const cantidad = Number(producto.cantidad || 0);
    const subtotal = precio * cantidad;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <div>
        <strong>${producto.nombre}</strong>
        <small>${cantidad} x $${formatearPrecio(precio)}</small>
      </div>
      <span>$${formatearPrecio(subtotal)}</span>
    `;

    lista.appendChild(item);
  });

  totalElemento.textContent = `$${formatearPrecio(total)}`;
}

function cerrarPanelCarrito(evento) {
  evento?.preventDefault();
  evento?.stopPropagation();

  const panel = document.getElementById("panelCarrito");
  const boton = document.getElementById("btnCarrito");

  if (!panel) return;

  panel.setAttribute("hidden", "");
  boton?.setAttribute("aria-expanded", "false");
}

/* 7. Funciones auxiliares */
function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL").format(valor);
}