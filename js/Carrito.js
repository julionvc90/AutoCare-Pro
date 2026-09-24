// ==========================================
// PÁGINA DEL CARRITO (Carrito.html)
// ==========================================
// Depende de: funciones.js (listaProductos) y main.js (operaciones del carrito).
//
// REGLAS DEL CARRITO
//  1. Cantidad mínima por producto: 1 (para quitarlo se usa el botón eliminar).
//  2. Cantidad máxima: el stock del producto (ver obtenerLimiteProducto en main.js).
//  3. Un solo cupón activo a la vez; el descuento es un % sobre el subtotal.
//  4. Para pagar hay que haber iniciado sesión.
//  5. Al pagar se guarda la orden en localStorage ("ordenes"), se vacía el
//     carrito y se quita el cupón.

const CLAVE_CUPON = "cuponCarrito";
const CLAVE_ORDENES = "ordenes";

// Cupones válidos (código -> % de descuento).
const CUPONES = {
    AUTOCARE10: 10,
    DUOC15: 15
};

// ---------- utilidades ----------
function escaparAtributo(texto) {
    return String(texto).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function mostrarMensajeCarrito(elementoId, texto, tipo) {
    const el = document.getElementById(elementoId);
    if (!el) return;
    el.innerHTML = texto;
    el.className = (el.className.replace(/\b(error|exito)\b/g, "").trim() + " " + (tipo || "")).trim();
}

function imagenDeProducto(nombre) {
    const producto = listaProductos.find(p => p.nombre === nombre);
    return producto ? producto.imagen : IMAGEN_POR_DEFECTO;
}

function obtenerCuponAplicado() {
    const codigo = localStorage.getItem(CLAVE_CUPON);
    return codigo && CUPONES[codigo] ? codigo : null;
}

function calcularResumen(carrito) {
    const subtotal = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);
    const cupon = obtenerCuponAplicado();
    const porcentaje = cupon ? CUPONES[cupon] : 0;
    const descuento = Math.round(subtotal * porcentaje / 100);
    return { subtotal, cupon, porcentaje, descuento, total: subtotal - descuento };
}

// ---------- render ----------
function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const contenido = document.getElementById("carritoContenido");
    const vacio = document.getElementById("carritoVacio");
    const contenedor = document.getElementById("carritoItems");
    if (!contenido || !vacio || !contenedor) return;

    contenido.hidden = carrito.length === 0;
    vacio.hidden = carrito.length > 0;

    if (carrito.length === 0) {
        localStorage.removeItem(CLAVE_CUPON);
        return;
    }

    contenedor.innerHTML = carrito.map(producto => {
        const nombre = escaparAtributo(producto.nombre);
        const limite = obtenerLimiteProducto(producto.nombre);
        const enMaximo = producto.cantidad >= limite;

        return `
          <article class="carrito-item">
            <img src="${imagenDeProducto(producto.nombre)}" alt="${nombre}" onerror="this.onerror=null;this.src='${IMAGEN_POR_DEFECTO}'">
            <div class="carrito-item-info">
              <h2 class="h6 mb-1">${nombre}</h2>
              <small>$${formatearPrecio(producto.precio)} c/u</small>
              ${enMaximo ? '<small class="carrito-aviso">Máximo disponible</small>' : ""}
            </div>
            <div class="carrito-cantidad" role="group" aria-label="Cantidad de ${nombre}">
              <button type="button" data-accion="menos" data-nombre="${nombre}" aria-label="Disminuir cantidad" ${producto.cantidad <= 1 ? "disabled" : ""}>
                <i class="fa-solid fa-minus" aria-hidden="true"></i>
              </button>
              <span>${producto.cantidad}</span>
              <button type="button" data-accion="mas" data-nombre="${nombre}" aria-label="Aumentar cantidad" ${enMaximo ? "disabled" : ""}>
                <i class="fa-solid fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <strong class="carrito-subtotal">$${formatearPrecio(producto.precio * producto.cantidad)}</strong>
            <button type="button" class="carrito-eliminar" data-accion="eliminar" data-nombre="${nombre}" aria-label="Quitar ${nombre} del carrito">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </article>`;
    }).join("");

    renderizarResumen(carrito);
}

function renderizarResumen(carrito) {
    const r = calcularResumen(carrito);
    document.getElementById("resumenSubtotal").textContent = `$${formatearPrecio(r.subtotal)}`;
    document.getElementById("resumenTotal").textContent = `$${formatearPrecio(r.total)}`;

    const filaDescuento = document.getElementById("filaDescuento");
    filaDescuento.hidden = !r.cupon;
    if (r.cupon) {
        document.getElementById("etiquetaDescuento").textContent = `Cupón ${r.cupon} (-${r.porcentaje}%)`;
        document.getElementById("resumenDescuento").textContent = `-$${formatearPrecio(r.descuento)}`;
    }
}

// ---------- acciones ----------
function manejarClickItem(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;

    const nombre = boton.dataset.nombre;
    const item = obtenerCarrito().find(p => p.nombre === nombre);
    if (!item) return;

    mostrarMensajeCarrito("carritoMensaje", "", "");

    if (boton.dataset.accion === "mas") cambiarCantidadCarrito(nombre, item.cantidad + 1);
    if (boton.dataset.accion === "menos") cambiarCantidadCarrito(nombre, item.cantidad - 1);
    if (boton.dataset.accion === "eliminar") eliminarDelCarrito(nombre);

    renderizarCarrito();
}

function aplicarCupon() {
    const entrada = document.getElementById("cuponInput");
    const codigo = entrada.value.trim().toUpperCase();

    if (codigo === "") {
        mostrarMensajeCarrito("cuponMensaje", "Ingresa un código de cupón.", "error");
        return;
    }

    if (!CUPONES[codigo]) {
        mostrarMensajeCarrito("cuponMensaje", "El cupón no es válido.", "error");
        return;
    }

    if (obtenerCuponAplicado() === codigo) {
        mostrarMensajeCarrito("cuponMensaje", "Ese cupón ya está aplicado.", "error");
        return;
    }

    localStorage.setItem(CLAVE_CUPON, codigo);
    entrada.value = "";
    mostrarMensajeCarrito("cuponMensaje", `Cupón aplicado: ${CUPONES[codigo]}% de descuento.`, "exito");
    renderizarResumen(obtenerCarrito());
}

function pagar() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    let usuario = null;
    try {
        usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    } catch (error) {
        usuario = null;
    }

    if (!usuario) {
        mostrarMensajeCarrito("carritoMensaje", 'Debes iniciar sesión para pagar. <a href="Login.html">Ir a iniciar sesión</a>', "error");
        return;
    }

    const resumen = calcularResumen(carrito);
    const orden = {
        id: "OC-" + Date.now(),
        fecha: new Date().toISOString(),
        cliente: usuario.correo,
        items: carrito,
        subtotal: resumen.subtotal,
        cupon: resumen.cupon,
        descuento: resumen.descuento,
        total: resumen.total,
        estado: "Pendiente"
    };

    try {
        const ordenes = JSON.parse(localStorage.getItem(CLAVE_ORDENES)) || [];
        ordenes.push(orden);
        localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ordenes));
    } catch (error) {
        console.error("No se pudo guardar la orden:", error);
    }

    vaciarCarrito();
    localStorage.removeItem(CLAVE_CUPON);
    renderizarCarrito();
    mostrarMensajeCarrito("carritoMensaje", `¡Compra realizada! Tu número de orden es ${orden.id}. Total pagado: $${formatearPrecio(orden.total)}.`, "exito");
}

document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("carritoContenido")) return;

    document.getElementById("carritoItems").addEventListener("click", manejarClickItem);
    document.getElementById("btnAplicarCupon").addEventListener("click", aplicarCupon);
    document.getElementById("cuponInput").addEventListener("keydown", e => {
        if (e.key === "Enter") aplicarCupon();
    });
    document.getElementById("btnPagar").addEventListener("click", pagar);
    document.getElementById("btnVaciarCarrito").addEventListener("click", () => {
        if (confirm("¿Quieres vaciar el carrito?")) {
            vaciarCarrito();
            renderizarCarrito();
        }
    });

    renderizarCarrito();
});