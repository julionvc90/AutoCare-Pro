// ==========================================
// USUARIOS BASE (semilla)
// ==========================================
// Estos son los usuarios "de fábrica". Los usuarios que se registren desde
// el formulario de Registro se guardan aparte, en localStorage, y se
// combinan con estos al momento de buscar/validar un login.
// Cuentas de prueba (los correos usan los dominios permitidos por la validación):
//   admin@duoc.cl / Admin123 | vendedor@profesor.duoc.cl / Venta123 | cliente@duoc.cl / Auto123
const usuarios = [
    {
        rut: "12.345.678-5",
        correo: "cliente@duoc.cl",
        celular: "+56912345678",
        password: "Auto123",
        nombre: "Cliente AutoCare",
        rol: "CLIENTE"
    },
    {
        rut: "11.111.111-1",
        correo: "vendedor@profesor.duoc.cl",
        celular: "+56998765432",
        password: "Venta123",
        nombre: "Vendedor AutoCare",
        rol: "VENDEDOR"
    },
    {
        rut: "9.999.999-9",
        correo: "admin@duoc.cl",
        celular: "+56987654321",
        password: "Admin123",
        nombre: "Administrador",
        rol: "ADMINISTRADOR"
    }
];

const CLAVE_USUARIOS_REGISTRADOS = "usuariosRegistrados";

// ==========================================
// LISTA DE ARTÍCULOS
// ==========================================
// precio: número (pesos CLP) para poder calcular totales sin parsear texto.
// stock:  unidades disponibles; limita la cantidad que se puede elegir en el detalle.
const listaProductos = [
    // --- Aceites & Filtros ---
    {
        id: 1,
        categoria: "aceites",
        nombre: "Aceite de Motor Castrol Edge 5W-30 4L",
        descripcion: "Aceite 100% sintético de alto rendimiento. Protege el motor en arranques en frío y ayuda a mantener el motor limpio. Recomendado para cambios cada 5.000 a 10.000 km.",
        precio: 34990,
        stock: 25,
        imagen: "IMG/aceite-5w30.jpg"
    },
    {
        id: 2,
        categoria: "aceites",
        nombre: "Filtro de Aceite Blindado Premium",
        descripcion: "Filtro de aceite de carcasa reforzada con válvula antirretorno. Compatible con la mayoría de motores de 1.6 a 2.0 L. Cámbialo junto con cada cambio de aceite.",
        precio: 8500,
        stock: 40,
        imagen: "IMG/filtro-aceite.jpg"
    },
    {
        id: 3,
        categoria: "aceites",
        nombre: "Filtro de Aire Cónico de Alto Flujo",
        descripcion: "Filtro de aire cónico lavable y reutilizable que mejora el flujo de aire al motor. Aporta mejor respuesta del acelerador y un consumo más eficiente.",
        precio: 15990,
        stock: 18,
        imagen: "IMG/filtro-aire.jpg"
    },

    // --- Detailing & Limpieza ---
    {
        id: 4,
        categoria: "detailing",
        nombre: "Shampoo Autolavado con Cera Concentrada",
        descripcion: "Shampoo de pH neutro con cera incorporada. Limpia sin dañar la pintura y deja una capa protectora con brillo. Rinde hasta 30 lavados.",
        precio: 12990,
        stock: 30,
        imagen: "IMG/shampoo-cera.jpg"
    },
    {
        id: 5,
        categoria: "detailing",
        nombre: "Paños de Microfibra Ultra Absorbente (3u)",
        descripcion: "Pack de 3 paños de microfibra de alta densidad. No dejan pelusas ni rayan la pintura. Aptos para secado, pulido y limpieza interior.",
        precio: 5490,
        stock: 50,
        imagen: "IMG/microfibra.jpg"
    },
    {
        id: 6,
        categoria: "detailing",
        nombre: "Limpiador de Llantas Activo",
        descripcion: "Limpiador que disuelve el polvo de frenos y la suciedad incrustada en llantas. Fórmula segura para aleación y cromo.",
        precio: 8990,
        stock: 22,
        imagen: "IMG/limpiador-llantas.jpg"
    },

    // --- Ampolletas & Electricidad ---
    {
        id: 7,
        categoria: "electricidad",
        nombre: "Ampolletas LED H7 de Alta Potencia",
        descripcion: "Par de ampolletas LED H7 con mayor luminosidad y menor consumo que las halógenas. Luz blanca de 6000K y larga vida útil.",
        precio: 21990,
        stock: 15,
        imagen: "IMG/ampolleta.jpg"
    },
    {
        id: 8,
        categoria: "electricidad",
        nombre: "Set de Fusibles Automotrices Surtidos",
        descripcion: "Set de fusibles de distintos amperajes (5A a 40A) con pinza extractora. Ideal para tener de respaldo en la guantera.",
        precio: 4500,
        stock: 60,
        imagen: "IMG/fusibles.jpg"
    },
    {
        id: 9,
        categoria: "electricidad",
        nombre: "Batería de Auto 12V 60AH Libre Mantención",
        descripcion: "Batería sellada de 12V y 60AH, libre de mantención. Buen desempeño de arranque en climas fríos. Consulta compatibilidad con tu vehículo.",
        precio: 68990,
        stock: 8,
        imagen: "IMG/bateria.jpg"
    },

    // --- Accesorios ---
    {
        id: 10,
        categoria: "accesorios",
        nombre: "Gata Hidráulica de Caimán 2 Toneladas",
        descripcion: "Gata hidráulica tipo caimán con capacidad de 2 toneladas. Estructura de acero y bajo perfil para levantar el vehículo de forma estable.",
        precio: 38000,
        stock: 12,
        imagen: "IMG/gata.jpg"
    },
    {
        id: 11,
        categoria: "accesorios",
        nombre: "Compresor de Aire Portátil 12V Digital",
        descripcion: "Compresor portátil con manómetro digital y apagado automático al alcanzar la presión elegida. Se conecta al encendedor del vehículo.",
        precio: 24990,
        stock: 20,
        imagen: "IMG/compresor.jpg"
    },
    {
        id: 12,
        categoria: "accesorios",
        nombre: "Cables Pasa Corriente Reforzados 3 Metros",
        descripcion: "Cables pasa corriente de 3 metros con pinzas reforzadas y aislación resistente. Para partir el vehículo cuando la batería se descarga.",
        precio: 11990,
        stock: 16,
        imagen: "IMG/cables.jpg"
    }
];

// ==========================================
// PRODUCTOS EDITADOS DESDE EL PANEL ADMINISTRADOR
// ==========================================
// El panel (admin-productos.html) guarda la lista completa en localStorage.
// Si existe, reemplaza el contenido de listaProductos para que la tienda
// muestre los mismos productos que administra el panel.
(function cargarProductosGuardados() {
    try {
        const guardados = localStorage.getItem("productosAdmin");
        if (guardados === null) return;
        const lista = JSON.parse(guardados);
        if (Array.isArray(lista)) {
            listaProductos.splice(0, listaProductos.length, ...lista);
        }
    } catch (error) {
        console.error("No se pudieron leer los productos guardados:", error);
    }
})();

// ==========================================
// VALIDACIONES REUTILIZABLES
// ==========================================

// RUT chileno con dígito verificador. Se deja disponible para el futuro
// formulario "Nuevo Usuario" del panel administrador,
// aunque el login de la tienda ya no lo usa.
function validarRut(rut) {
    rut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(rut)) return false;

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo.charAt(i)) * multiplicador;
        multiplicador++;
        if (multiplicador > 7) multiplicador = 2;
    }

    let resto = 11 - (suma % 11);
    let dvCalculado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();
    return dv === dvCalculado;
}

function normalizarRut(rut) {
    return rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
}

// Dominios permitidos para CUALQUIER correo del sitio (login, registro y,
// más adelante, el formulario de contacto piden exactamente esta misma regla).
const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

function validarCorreo(correo) {
    if (!correo || correo.length > 100) return false;

    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!formatoValido) return false;

    const dominio = correo.split("@")[1].toLowerCase();
    return DOMINIOS_PERMITIDOS.includes(dominio);
}

// Contraseña: requerida, entre 4 y 10 caracteres (Anexo 1).
function validarPassword(password) {
    return typeof password === "string" && password.length >= 4 && password.length <= 10;
}

// ==========================================
// PERSISTENCIA DE USUARIOS REGISTRADOS
// ==========================================
function obtenerUsuariosRegistrados() {
    try {
        const guardados = localStorage.getItem(CLAVE_USUARIOS_REGISTRADOS);
        const lista = guardados ? JSON.parse(guardados) : [];
        return Array.isArray(lista) ? lista : [];
    } catch (error) {
        console.error("No se pudo leer usuariosRegistrados:", error);
        return [];
    }
}

function guardarUsuarioRegistrado(usuario) {
    const lista = obtenerUsuariosRegistrados();
    lista.push(usuario);
    localStorage.setItem(CLAVE_USUARIOS_REGISTRADOS, JSON.stringify(lista));
}

function obtenerTodosLosUsuarios() {
    return usuarios.concat(obtenerUsuariosRegistrados());
}

function buscarUsuarioPorCorreo(correo) {
    const valor = correo.trim().toLowerCase();
    return obtenerTodosLosUsuarios().find(u => u.correo.toLowerCase() === valor);
}

// ==========================================
// LOGIN
// ==========================================
const MAX_INTENTOS = 5;
let intentos = Number(localStorage.getItem("intentosLogin")) || 0;

const loginForm = document.getElementById("loginForm");
const loginMensaje = document.getElementById("loginMensaje");

function mostrarMensajeLogin(texto, tipo) {
    if (loginMensaje) {
        loginMensaje.textContent = texto;
        loginMensaje.className = tipo;
    }
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (intentos >= MAX_INTENTOS) {
            mostrarMensajeLogin("Cuenta bloqueada temporalmente por superar los 5 intentos.", "error");
            return;
        }

        const correoIngresado = document.getElementById("usuario").value.trim();
        const passwordIngresada = document.getElementById("password").value;

        if (correoIngresado === "") {
            mostrarMensajeLogin("Debe ingresar su correo electrónico.", "error");
            return;
        }

        if (!validarCorreo(correoIngresado)) {
            mostrarMensajeLogin("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.", "error");
            return;
        }

        if (!validarPassword(passwordIngresada)) {
            mostrarMensajeLogin("La contraseña debe tener entre 4 y 10 caracteres.", "error");
            return;
        }

        const usuario = buscarUsuarioPorCorreo(correoIngresado);

        if (!usuario || passwordIngresada !== usuario.password) {
            intentos++;
            localStorage.setItem("intentosLogin", intentos);

            if (intentos >= MAX_INTENTOS) {
                mostrarMensajeLogin("Has superado los 5 intentos. La cuenta ha sido bloqueada.", "error");
                return;
            }

            mostrarMensajeLogin("Correo o contraseña incorrectos. Te quedan " + (MAX_INTENTOS - intentos) + " intento(s).", "error");
            return;
        }

        localStorage.removeItem("intentosLogin");
        intentos = 0;

        localStorage.setItem("usuarioActivo", JSON.stringify({
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        }));

        mostrarMensajeLogin("Inicio de sesión correcto. Bienvenido " + usuario.nombre, "exito");

        // Administrador y vendedor entran al panel; el cliente va a la tienda.
        const destino = (usuario.rol === "ADMINISTRADOR" || usuario.rol === "VENDEDOR")
            ? "admin-home.html"
            : "index.html";

        setTimeout(function () {
            window.location.href = destino;
        }, 1000);
    });
}

// ==========================================
// REGISTRO
// ==========================================
const registerForm = document.getElementById("registerForm");
const registerMensaje = document.getElementById("registerMensaje");

function mostrarMensajeRegistro(texto, tipo) {
    if (registerMensaje) {
        registerMensaje.textContent = texto;
        registerMensaje.className = tipo;
    }
}

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("regNombre").value.trim();
        const correo = document.getElementById("regCorreo").value.trim();
        const password = document.getElementById("regPassword").value;

        if (nombre === "" || nombre.length > 100) {
            mostrarMensajeRegistro("El nombre es requerido (máximo 100 caracteres).", "error");
            return;
        }

        if (!validarCorreo(correo)) {
            mostrarMensajeRegistro("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.", "error");
            return;
        }

        if (buscarUsuarioPorCorreo(correo)) {
            mostrarMensajeRegistro("Ese correo ya está registrado.", "error");
            return;
        }

        if (!validarPassword(password)) {
            mostrarMensajeRegistro("La contraseña debe tener entre 4 y 10 caracteres.", "error");
            return;
        }

        guardarUsuarioRegistrado({
            nombre: nombre,
            correo: correo,
            password: password,
            rol: "CLIENTE"
        });

        mostrarMensajeRegistro("Cuenta creada correctamente. Ya puedes iniciar sesión.", "exito");
        registerForm.reset();
    });
}

// ==========================================
// CATÁLOGO DE PRODUCTOS
// ==========================================
const NOMBRES_CATEGORIAS = {
    aceites: "Aceites & Filtros",
    detailing: "Detailing & Limpieza",
    electricidad: "Ampolletas & Electricidad",
    accesorios: "Accesorios"
};

// Varios productos aún no tienen su foto en /IMG: si la imagen falla al
// cargar, se muestra el logo para que la tarjeta no quede con un ícono roto.
const IMAGEN_POR_DEFECTO = "IMG/Logo.png";
const ATRIBUTO_IMAGEN_RESPALDO = `onerror="this.onerror=null;this.src='${IMAGEN_POR_DEFECTO}'"`;

function crearTarjetaProducto(producto) {
    const urlDetalle = `DetalleProducto.html?id=${producto.id}`;

    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 border-0 bg-white text-dark shadow-sm" style="border-radius: 12px; overflow: hidden;">
          <a href="${urlDetalle}" class="p-3 d-flex align-items-center justify-content-center" style="height: 160px; background-color: #f8f9fa;" aria-label="Ver detalle de ${producto.nombre}">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="max-height: 100%; object-fit: contain;" ${ATRIBUTO_IMAGEN_RESPALDO}>
          </a>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h3 class="card-title h5 fw-bold mb-1" style="font-size: 16px;">
                <a href="${urlDetalle}" class="text-dark text-decoration-none">${producto.nombre}</a>
              </h3>
            </div>
            <div>
              <p class="fw-bold text-primary h5 mb-2">$${formatearPrecio(producto.precio)}</p>
              <button class="btn btn-sm btn-success w-100 fw-bold" type="button" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
}

function cargarProductos(productosAMostrar) {
    const contenedor = document.getElementById('contenedorProductos');
    if (!contenedor) return;

    contenedor.innerHTML = productosAMostrar.map(crearTarjetaProducto).join("");
}

function filtrarCategoria(categoriaSeleccionada) {
    const productosFiltrados = listaProductos.filter(producto => producto.categoria === categoriaSeleccionada);
    cargarProductos(productosFiltrados);

    const titulo = document.getElementById('titulo-productos');
    if (!titulo) return;

    titulo.innerText = `Productos: ${NOMBRES_CATEGORIAS[categoriaSeleccionada] || 'Mantenimiento Preventivo'}`;
}

// ==========================================
// DETALLE DE PRODUCTO (DetalleProducto.html?id=N)
// ==========================================
const CANTIDAD_MAXIMA_POR_COMPRA = 10;

function cargarDetalleProducto() {
    const contenedor = document.getElementById("detalleProducto");
    if (!contenedor) return;

    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const producto = listaProductos.find(p => p.id === id);

    if (!producto) {
        contenedor.innerHTML = `
          <div class="detalle-vacio">
            <h1 class="h3">Producto no encontrado</h1>
            <p>El producto que buscas no existe o ya no está disponible.</p>
            <a href="Catalogo.html" class="btn btn-success">Volver al catálogo</a>
          </div>`;
        return;
    }

    const nombreCategoria = NOMBRES_CATEGORIAS[producto.categoria] || "Productos";
    const maxCantidad = Math.min(producto.stock, CANTIDAD_MAXIMA_POR_COMPRA);
    const hayStock = maxCantidad > 0;

    document.title = `${producto.nombre} - AutoCare Pro`;

    const breadcrumb = document.getElementById("breadcrumbProducto");
    if (breadcrumb) {
        breadcrumb.innerHTML = `
          <a href="index.html">Inicio</a> &rsaquo;
          <a href="Catalogo.html?cat=${producto.categoria}">${nombreCategoria}</a> &rsaquo;
          <span aria-current="page">${producto.nombre}</span>`;
    }

    let opcionesCantidad = "";
    for (let i = 1; i <= maxCantidad; i++) {
        opcionesCantidad += `<option value="${i}">${i}</option>`;
    }

    contenedor.innerHTML = `
      <div class="row g-4">
        <div class="col-12 col-lg-7">
          <div class="detalle-imagen">
            <img src="${producto.imagen}" alt="${producto.nombre}" ${ATRIBUTO_IMAGEN_RESPALDO}>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="detalle-info">
            <span class="detalle-categoria">${nombreCategoria}</span>
            <h1>${producto.nombre}</h1>
            <p class="detalle-precio">$${formatearPrecio(producto.precio)}</p>

            <p class="detalle-descripcion">${producto.descripcion}</p>

            <p class="detalle-stock ${hayStock ? "" : "sin-stock"}">
              ${hayStock ? `<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${producto.stock} unidades disponibles`
                         : `<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> Sin stock`}
            </p>

            <div class="detalle-cantidad">
              <label for="cantidadProducto" class="form-label fw-bold mb-0">Cantidad</label>
              <select id="cantidadProducto" class="form-select" ${hayStock ? "" : "disabled"}>${opcionesCantidad}</select>
            </div>

            <button type="button" id="btnAgregarDetalle" class="btn btn-success w-100 fw-bold mt-3" ${hayStock ? "" : "disabled"}>
              <i class="fa-solid fa-cart-plus" aria-hidden="true"></i> Añadir al carrito
            </button>
            <a href="Catalogo.html" class="btn btn-outline-light w-100 mt-2">Seguir comprando</a>
          </div>
        </div>
      </div>`;

    document.getElementById("btnAgregarDetalle").addEventListener("click", function () {
        const cantidad = Number(document.getElementById("cantidadProducto").value);
        agregarAlCarrito(producto.nombre, producto.precio, cantidad);
    });

    cargarProductosRelacionados(producto);
}

function cargarProductosRelacionados(productoActual) {
    const seccion = document.getElementById("seccionRelacionados");
    const contenedor = document.getElementById("productosRelacionados");
    if (!seccion || !contenedor) return;

    const relacionados = listaProductos
        .filter(p => p.categoria === productoActual.categoria && p.id !== productoActual.id)
        .slice(0, 4);

    if (relacionados.length === 0) {
        seccion.hidden = true;
        return;
    }

    contenedor.innerHTML = relacionados.map(crearTarjetaProducto).join("");
}

// Productos mencionados en un artículo del blog: el HTML indica los ids en
// data-productos="1,2,3" y se reutiliza la misma tarjeta del catálogo.
function cargarProductosDeBlog() {
    const contenedor = document.getElementById("productosBlog");
    if (!contenedor) return;

    const ids = contenedor.dataset.productos.split(",").map(Number);
    const productos = ids
        .map(id => listaProductos.find(p => p.id === id))
        .filter(Boolean);

    contenedor.innerHTML = productos.map(crearTarjetaProducto).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('contenedorProductos')) {
        // Catalogo.html?cat=aceites abre el catálogo ya filtrado (lo usa el breadcrumb del detalle).
        const categoriaUrl = new URLSearchParams(window.location.search).get("cat");

        if (categoriaUrl && NOMBRES_CATEGORIAS[categoriaUrl]) {
            filtrarCategoria(categoriaUrl);
        } else {
            cargarProductos(listaProductos);
        }
    }

    cargarDetalleProducto();
    cargarProductosDeBlog();
});