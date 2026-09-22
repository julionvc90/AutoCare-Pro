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
function agregarAlCarrito(nombre, precio) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(producto => producto.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  actualizarPanelCarrito();
  alert(`"${nombre}" fue añadido al carrito.`);
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