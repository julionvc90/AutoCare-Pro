// ==========================================
// USUARIOS DE PRUEBA
// ==========================================
const usuarios = [
    {
        rut: "12.345.678-5",
        correo: "cliente@autocarepro.cl",
        celular: "+56912345678",
        password: "Auto123",
        nombre: "Cliente AutoCare",
        rol: "CLIENTE"
    },
    {
        rut: "11.111.111-1",
        correo: "vendedor@autocarepro.cl",
        celular: "+56998765432",
        password: "Venta123",
        nombre: "Vendedor AutoCare",
        rol: "VENDEDOR"
    },
    {
        rut: "9.999.999-9",
        correo: "admin@autocarepro.cl",
        celular: "+56987654321",
        password: "Admin123",
        nombre: "Administrador",
        rol: "ADMINISTRADOR"
    }
];

// ==========================================
// LISTA DE ARTÍCULOS CON IMÁGENES REALES
// ==========================================
// 1. LISTA DE PRODUCTOS CON RUTAS LOCALES (Asegúrate de que los nombres coincidan en tu carpeta IMG)
const listaProductos = [
    // --- Aceites & Filtros ---
    {
        id: 1,
        categoria: "aceites",
        nombre: "Aceite de Motor Castrol Edge 5W-30 4L",
        precio: "$34.990",
        precioNumerico: 34990,
        descripcion: "Aceite sintético de alto rendimiento para motores modernos, ideal para proteger y prolongar la vida útil del motor.",
        imagen: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 2,
        categoria: "aceites",
        nombre: "Filtro de Aceite Blindado Premium",
        precio: "$8.500",
        precioNumerico: 8500,
        descripcion: "Filtro de aceite con alta capacidad de retención para ofrecer mejor limpieza y protección interna del motor.",
        imagen: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        categoria: "aceites",
        nombre: "Filtro de Aire Cónico de Alto Flujo",
        precio: "$15.990",
        precioNumerico: 15990,
        descripcion: "Mejora la entrada de aire al motor y ayuda a mantener un mejor rendimiento y consumo eficiente del combustible.",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
    },

    // --- Detailing & Limpieza ---
    {
        id: 4,
        categoria: "detailing",
        nombre: "Shampoo Autolavado con Cera Concentrada",
        precio: "$12.990",
        precioNumerico: 12990,
        descripcion: "Solución de limpieza que elimina suciedad y deja una capa de brillo suave sin dañar la pintura del vehículo.",
        imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 5,
        categoria: "detailing",
        nombre: "Paños de Microfibra Ultra Absorbente (3u)",
        precio: "$5.490",
        precioNumerico: 5490,
        descripcion: "Paños suaves y absorbentes ideales para secado, pulido y limpieza del interior y exterior del auto.",
        imagen: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 6,
        categoria: "detailing",
        nombre: "Limpiador de Llantas Activo",
        precio: "$8.990",
        precioNumerico: 8990,
        descripcion: "Elimina suciedad y óxido de las llantas, dejando un acabado más limpio y renovado para tu vehículo.",
        imagen: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80"
    },

    // --- Ampolletas & Electricidad ---
    {
        id: 7,
        categoria: "electricidad",
        nombre: "Ampolletas LED H7 de Alta Potencia",
        precio: "$21.990",
        precioNumerico: 21990,
        descripcion: "Ampolletas de larga duración y mejor visibilidad nocturna, pensadas para mayor seguridad al conducir.",
        imagen: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 8,
        categoria: "electricidad",
        nombre: "Set de Fusibles Automotrices Surtidos",
        precio: "$4.500",
        precioNumerico: 4500,
        descripcion: "Kit de fusibles de diferentes amperajes para reemplazos rápidos y soluciones eléctricas de emergencia.",
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 9,
        categoria: "electricidad",
        nombre: "Batería de Auto 12V 60AH Libre Mantención",
        precio: "$68.990",
        precioNumerico: 68990,
        descripcion: "Batería confiable para uso diario, con buena potencia de arranque y resistencia para diversas condiciones.",
        imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
    },

    // --- Accesorios ---
    {
        id: 10,
        categoria: "accesorios",
        nombre: "Gata Hidráulica de Caimán 2 Toneladas",
        precio: "$38.000",
        precioNumerico: 38000,
        descripcion: "Gata robusta y segura para trabajos mecánicos básicos, ideal para cambios de neumáticos y revisiones del vehículo.",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 11,
        categoria: "accesorios",
        nombre: "Compresor de Aire Portátil 12V Digital",
        precio: "$24.990",
        precioNumerico: 24990,
        descripcion: "Compresor compacto para inflado rápido de neumáticos y uso práctico en viajes o mantenimiento del vehículo.",
        imagen: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 12,
        categoria: "accesorios",
        nombre: "Cables Pasa Corriente Reforzados 3 Metros",
        precio: "$11.990",
        precioNumerico: 11990,
        descripcion: "Cables resistentes para arranque de emergencia, con conexión segura y mayor durabilidad para uso frecuente.",
        imagen: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80"
    }
];


// ==========================================
// VARIABLES DE SESIÓN
// ==========================================
let intentos = Number(localStorage.getItem("intentosLogin")) || 0;
const MAX_INTENTOS = 5;
const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

if (contador) {
    contador.textContent = intentos;
}

// ==========================================
// FUNCIONES DE VALIDACIÓN Y CONTROL DE ACCESO
// ==========================================
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

function validarCorreo(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

function buscarUsuario(usuario) {
    const valor = usuario.trim();
    if (valor.includes("@")) {
        return usuarios.find(u => u.correo.toLowerCase() === valor.toLowerCase());
    }
    const rutNormalizado = normalizarRut(valor);
    return usuarios.find(u => normalizarRut(u.rut) === rutNormalizado);
}

function mostrarMensaje(texto, tipo) {
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.className = tipo;
    }
}

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (intentos >= MAX_INTENTOS) {
            mostrarMensaje("Cuenta bloqueada temporalmente por superar los 5 intentos.", "error");
            return;
        }

        const usuarioIngresado = document.getElementById("usuario").value.trim();
        const passwordIngresada = document.getElementById("password").value;

        if (usuarioIngresado === "") {
            mostrarMensaje("Debe ingresar su RUT o correo electrónico.", "error");
            return;
        }

        let tipoUsuario = usuarioIngresado.includes("@") ? "correo" : "rut";

        if (tipoUsuario === "correo" && !validarCorreo(usuarioIngresado)) {
            mostrarMensaje("El correo electrónico no tiene un formato válido.", "error");
            return;
        } else if (tipoUsuario === "rut" && !validarRut(usuarioIngresado)) {
            mostrarMensaje("El RUT ingresado no es válido.", "error");
            return;
        }

        const usuario = buscarUsuario(usuarioIngresado);

        if (!usuario) {
            intentos++;
            localStorage.setItem("intentosLogin", intentos);
            if (contador) contador.textContent = intentos;
            mostrarMensaje("El RUT o correo no está registrado.", "error");
            return;
        }

        if (passwordIngresada !== usuario.password) {
            intentos++;
            localStorage.setItem("intentosLogin", intentos);
            if (contador) contador.textContent = intentos;

            if (intentos >= MAX_INTENTOS) {
                mostrarMensaje("Has superado los 5 intentos. La cuenta ha sido bloqueada.", "error");
                return;
            }

            mostrarMensaje("Contraseña incorrecta. Te quedan " + (MAX_INTENTOS - intentos) + " intento(s).", "error");
            return;
        }

        localStorage.removeItem("intentosLogin");
        intentos = 0;

        localStorage.setItem("usuarioActivo", JSON.stringify({
            nombre: usuario.nombre,
            rut: usuario.rut,
            correo: usuario.correo,
            celular: usuario.celular,
            rol: usuario.rol
        }));

        mostrarMensaje("Inicio de sesión correcto. Bienvenido " + usuario.nombre, "exito");

        setTimeout(function() {
            window.location.href = "tienda.html";
        }, 1000);
    });
}

function normalizarTexto(texto) {
    return (texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function obtenerTerminoBusqueda() {
    const params = new URLSearchParams(window.location.search);
    return params.get("buscar")?.trim() || "";
}

function buscarProductos(termino) {
    const texto = normalizarTexto(termino);

    if (!texto) return [...listaProductos];

    return listaProductos.filter(producto => {
        const nombre = normalizarTexto(producto.nombre);
        const categoria = normalizarTexto(producto.categoria);
        const descripcion = normalizarTexto(producto.descripcion || "");
        return nombre.includes(texto) || categoria.includes(texto) || descripcion.includes(texto);
    });
}

function renderProductosHome(cantidad = 4) {
    const contenedor = document.getElementById('contenedorProductos');
    if (!contenedor) return;

    const productosHome = listaProductos.slice(0, cantidad);
    cargarProductos(productosHome);

    const titulo = document.getElementById('titulo-productos');
    if (titulo) {
        titulo.innerText = 'Productos para mantenimiento preventivo';
    }
}

function cargarProductos(productosAMostrar) {
    const contenedor = document.getElementById('contenedorProductos');
    if (!contenedor) return; 
    
    contenedor.innerHTML = "";

    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-white mb-3">No se encontraron resultados</h3>
                <p class="text-light">Intenta buscar otro término como aceite, filtro, cera o batería.</p>
            </div>
        `;
        return;
    }

    productosAMostrar.forEach(producto => {
        const descripcion = producto.descripcion || "Producto de alta calidad ideal para mantener tu vehículo en óptimas condiciones.";
        const precioNumerico = Number(producto.precioNumerico ?? 0);

        const cardProducto = `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <article class="card card-producto h-100">
              <div class="card-producto-img">
                <img src="${producto.imagen}" alt="${producto.nombre}">
              </div>
              <div class="card-body">
                <h3 class="card-title h5">${producto.nombre}</h3>
                <p class="card-text small mb-2">${descripcion}</p>
                <p class="precio">${producto.precio}</p>
                <button class="btn btn-sm btn-outline-success" type="button" onclick="agregarAlCarrito('${producto.nombre}', ${precioNumerico})">Comprar</button>
              </div>
            </article>
          </div>
        `;
        contenedor.innerHTML += cardProducto;
    });
}

function filtrarCategoria(categoriaSeleccionada) {
    const productosFiltrados = listaProductos.filter(producto => producto.categoria === categoriaSeleccionada);
    cargarProductos(productosFiltrados);

    const titulo = document.getElementById('titulo-productos');
    if (!titulo) return;

    const nombresCategorias = {
        'aceites': 'Aceites & Filtros',
        'detailing': 'Detailing & Limpieza',
        'electricidad': 'Ampolletas & Electricidad',
        'accesorios': 'Accesorios'
    };
    
    titulo.innerText = `Productos: ${nombresCategorias[categoriaSeleccionada] || 'Mantenimiento Preventivo'}`;
}


document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById('buscador');
    const terminoBusqueda = obtenerTerminoBusqueda();

    if (buscador && terminoBusqueda) {
        buscador.value = terminoBusqueda;
    }

    if (document.getElementById('contenedorProductos')) {
        const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

        if (paginaActual === 'index.html' && !terminoBusqueda) {
            renderProductosHome(4);
            return;
        }

        const productosMostrados = buscarProductos(terminoBusqueda);
        cargarProductos(productosMostrados);

        const titulo = document.getElementById('titulo-productos');
        if (titulo) {
            titulo.innerText = terminoBusqueda
                ? `Resultados para: "${terminoBusqueda}"`
                : 'Productos para mantenimiento preventivo';
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('lista-productos')) {
        cargarProductos(listaProductos);
    }
});