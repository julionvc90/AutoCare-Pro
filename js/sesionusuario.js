// ==========================================
// AUTOCARE PRO
// SISTEMA DE INICIO DE SESIÓN
// ==========================================

// Usuarios de prueba
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
// VARIABLES
// ==========================================

let intentos = Number(localStorage.getItem("intentosLogin")) || 0;

const MAX_INTENTOS = 5;

const loginForm = document.getElementById("loginForm");

const mensaje = document.getElementById("mensaje");

const contador = document.getElementById("contador");


// Mostrar contador
if (contador) {
    contador.textContent = intentos;
}


// ==========================================
// VALIDAR RUT CHILENO
// ==========================================

function validarRut(rut) {

    rut = rut
        .replace(/\./g, "")
        .replace(/-/g, "")
        .toUpperCase();

    if (!/^[0-9]+[0-9K]$/.test(rut)) {
        return false;
    }

    let cuerpo = rut.slice(0, -1);

    let dv = rut.slice(-1);

    let suma = 0;

    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += Number(cuerpo.charAt(i)) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    let resto = 11 - (suma % 11);

    let dvCalculado;

    if (resto === 11) {
        dvCalculado = "0";
    }
    else if (resto === 10) {
        dvCalculado = "K";
    }
    else {
        dvCalculado = resto.toString();
    }

    return dv === dvCalculado;
}


// ==========================================
// NORMALIZAR RUT
// ==========================================

function normalizarRut(rut) {

    return rut
        .replace(/\./g, "")
        .replace(/-/g, "")
        .toUpperCase();

}


// ==========================================
// VALIDAR CORREO
// ==========================================

function validarCorreo(correo) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);

}


// ==========================================
// BUSCAR USUARIO
// ==========================================

function buscarUsuario(usuario) {

    const valor = usuario.trim();

    // Si parece correo
    if (valor.includes("@")) {

        return usuarios.find(
            u => u.correo.toLowerCase() === valor.toLowerCase()
        );

    }

    // Si es RUT
    const rutNormalizado = normalizarRut(valor);

    return usuarios.find(
        u => normalizarRut(u.rut) === rutNormalizado
    );
}


// ==========================================
// MOSTRAR MENSAJE
// ==========================================

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = tipo;

}


// ==========================================
// INICIO DE SESIÓN
// ==========================================

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Verificar bloqueo
        if (intentos >= MAX_INTENTOS) {

            mostrarMensaje(
                "Cuenta bloqueada temporalmente por superar los 5 intentos.",
                "error"
            );

            return;
        }


        const usuarioIngresado =
            document.getElementById("usuario").value.trim();

        const passwordIngresada =
            document.getElementById("password").value;


        // Validar campo usuario
        if (usuarioIngresado === "") {

            mostrarMensaje(
                "Debe ingresar su RUT o correo electrónico.",
                "error"
            );

            return;
        }


        // ==================================
        // DETERMINAR SI ES RUT O CORREO
        // ==================================

        let tipoUsuario;


        if (usuarioIngresado.includes("@")) {

            tipoUsuario = "correo";

            if (!validarCorreo(usuarioIngresado)) {

                mostrarMensaje(
                    "El correo electrónico no tiene un formato válido.",
                    "error"
                );

                return;
            }

        }
        else {

            tipoUsuario = "rut";

            if (!validarRut(usuarioIngresado)) {

                mostrarMensaje(
                    "El RUT ingresado no es válido.",
                    "error"
                );

                return;
            }

        }


        // ==================================
        // BUSCAR EXISTENCIA DEL USUARIO
        // ==================================

        const usuario = buscarUsuario(usuarioIngresado);


        if (!usuario) {

            intentos++;

            localStorage.setItem(
                "intentosLogin",
                intentos
            );

            contador.textContent = intentos;

            mostrarMensaje(
                "El RUT o correo no está registrado.",
                "error"
            );

            return;
        }


        // ==================================
        // VALIDAR CONTRASEÑA
        // ==================================

        if (passwordIngresada !== usuario.password) {

            intentos++;

            localStorage.setItem(
                "intentosLogin",
                intentos
            );

            contador.textContent = intentos;


            if (intentos >= MAX_INTENTOS) {

                mostrarMensaje(
                    "Has superado los 5 intentos. La cuenta ha sido bloqueada.",
                    "error"
                );

                return;
            }


            const restantes =
                MAX_INTENTOS - intentos;


            mostrarMensaje(
                "Contraseña incorrecta. Te quedan " +
                restantes +
                " intento(s).",
                "error"
            );

            return;
        }


        // ==================================
        // LOGIN CORRECTO
        // ==================================

        localStorage.removeItem("intentosLogin");

        intentos = 0;


        // Guardar sesión
        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify({
                nombre: usuario.nombre,
                rut: usuario.rut,
                correo: usuario.correo,
                celular: usuario.celular,
                rol: usuario.rol
            })
        );


        mostrarMensaje(
            "Inicio de sesión correcto. Bienvenido " +
            usuario.nombre,
            "exito"
        );


        // Redireccionar
        setTimeout(function() {

            window.location.href = "tienda.html";

        }, 1000);

    });

}
