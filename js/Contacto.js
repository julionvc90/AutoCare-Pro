// ==========================================
// FORMULARIO DE CONTACTO (contacto.html)
// ==========================================
// Depende de funciones.js (DOMINIOS_PERMITIDOS).
//
// REGLAS (Anexo 1)
//   Nombre:     requerido, máx. 100 caracteres.
//   Correo:     máx. 100 caracteres, solo @duoc.cl, @profesor.duoc.cl y @gmail.com.
//   Comentario: requerido, máx. 500 caracteres.
// REGLAS ADICIONALES (las agregamos nosotros)
//   Teléfono:   opcional; si se escribe debe tener entre 8 y 12 dígitos.
//
// El Anexo no marca el correo como "requerido" en Contacto (sí lo hace en
// Login y Registro). Se dejó opcional para respetar el documento; si el
// equipo decide exigirlo, basta con cambiar esta constante a true.
const CORREO_CONTACTO_REQUERIDO = false;

const MAX_NOMBRE = 100;
const MAX_CORREO = 100;
const MAX_COMENTARIO = 500;
const CLAVE_MENSAJES_CONTACTO = "mensajesContacto";

// ---------- validaciones: devuelven "" si es válido o el mensaje de error ----------
function errorNombreContacto(valor) {
    if (valor === "") return "El nombre es requerido.";
    if (valor.length > MAX_NOMBRE) return `El nombre no puede superar los ${MAX_NOMBRE} caracteres (llevas ${valor.length}).`;
    return "";
}

function errorCorreoContacto(valor) {
    if (valor === "") return CORREO_CONTACTO_REQUERIDO ? "El correo es requerido." : "";
    if (valor.length > MAX_CORREO) return `El correo no puede superar los ${MAX_CORREO} caracteres (llevas ${valor.length}).`;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Escribe un correo con formato válido, por ejemplo nombre@gmail.com.";

    const [local, dominio] = valor.split("@");
    if (!DOMINIOS_PERMITIDOS.includes(dominio.toLowerCase())) {
        const sugerido = sugerirDominio(dominio.toLowerCase());
        return sugerido
            ? `Dominio no permitido. ¿Quisiste decir ${local}@${sugerido}?`
            : "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return "";
}

function errorTelefonoContacto(valor) {
    if (valor === "") return "";
    const digitos = valor.replace(/[\s+\-()]/g, "");
    if (!/^[0-9]{8,12}$/.test(digitos)) return "Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.";
    return "";
}

function errorComentarioContacto(valor) {
    if (valor === "") return "El comentario es requerido.";
    if (valor.length > MAX_COMENTARIO) return `El comentario no puede superar los ${MAX_COMENTARIO} caracteres (te pasaste por ${valor.length - MAX_COMENTARIO}).`;
    return "";
}

// ---------- sugerencia de dominio (detecta errores de tipeo como "gmial.com") ----------
function distanciaTexto(a, b) {
    const m = [];
    for (let i = 0; i <= a.length; i++) m[i] = [i];
    for (let j = 1; j <= b.length; j++) m[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            m[i][j] = Math.min(
                m[i - 1][j] + 1,
                m[i][j - 1] + 1,
                m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }
    return m[a.length][b.length];
}

function sugerirDominio(dominio) {
    return DOMINIOS_PERMITIDOS.find(permitido => distanciaTexto(dominio, permitido) <= 2) || "";
}

// ---------- vinculación con el formulario ----------
const CAMPOS_CONTACTO = [
    { id: "nombre",   errorId: "errorNombre",   validar: errorNombreContacto },
    { id: "correo",   errorId: "errorCorreo",   validar: errorCorreoContacto },
    { id: "telefono", errorId: "errorTelefono", validar: errorTelefonoContacto },
    { id: "mensaje",  errorId: "errorMensaje",  validar: errorComentarioContacto }
];

function valorCampo(campo) {
    return document.getElementById(campo.id).value.trim();
}

// Muestra u oculta el error del campo. Devuelve true si el campo es válido.
function validarCampoContacto(campo) {
    const input = document.getElementById(campo.id);
    const zonaError = document.getElementById(campo.errorId);
    const valor = valorCampo(campo);
    const mensaje = campo.validar(valor);

    zonaError.textContent = mensaje;
    input.classList.toggle("campo-invalido", mensaje !== "");
    input.classList.toggle("campo-valido", mensaje === "" && valor !== "");
    input.setAttribute("aria-invalid", String(mensaje !== ""));
    return mensaje === "";
}

function actualizarContadorComentario() {
    const contador = document.getElementById("contadorMensaje");
    const largo = document.getElementById("mensaje").value.trim().length;
    contador.textContent = `${largo}/${MAX_COMENTARIO}`;
    contador.classList.toggle("excedido", largo > MAX_COMENTARIO);
}

function guardarMensajeContacto() {
    let mensajes = [];
    try {
        mensajes = JSON.parse(localStorage.getItem(CLAVE_MENSAJES_CONTACTO)) || [];
    } catch (error) {
        mensajes = [];
    }

    mensajes.push({
        id: "MSG-" + Date.now(),
        fecha: new Date().toISOString(),
        nombre: valorCampo(CAMPOS_CONTACTO[0]),
        correo: valorCampo(CAMPOS_CONTACTO[1]),
        telefono: valorCampo(CAMPOS_CONTACTO[2]),
        comentario: valorCampo(CAMPOS_CONTACTO[3])
    });

    localStorage.setItem(CLAVE_MENSAJES_CONTACTO, JSON.stringify(mensajes));
}

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formContacto");
    if (!formulario) return;

    const resultado = document.getElementById("contactoResultado");
    const tocados = new Set();

    CAMPOS_CONTACTO.forEach(campo => {
        const input = document.getElementById(campo.id);

        // Al salir del campo se valida siempre (así se avisa de los requeridos)...
        input.addEventListener("blur", () => {
            tocados.add(campo.id);
            validarCampoContacto(campo);
        });

        // ...y mientras escribe se valida en tiempo real, pero solo campos que ya visitó.
        input.addEventListener("input", () => {
            resultado.textContent = "";
            if (campo.id === "mensaje") actualizarContadorComentario();
            if (tocados.has(campo.id)) validarCampoContacto(campo);
        });
    });

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        CAMPOS_CONTACTO.forEach(campo => tocados.add(campo.id));
        const campoInvalido = CAMPOS_CONTACTO.filter(campo => !validarCampoContacto(campo));

        if (campoInvalido.length > 0) {
            resultado.textContent = "Revisa los campos marcados antes de enviar.";
            resultado.className = "contacto-resultado";
            document.getElementById(campoInvalido[0].id).focus();
            return;
        }

        guardarMensajeContacto();
        formulario.reset();
        tocados.clear();
        CAMPOS_CONTACTO.forEach(campo => {
            const input = document.getElementById(campo.id);
            document.getElementById(campo.errorId).textContent = "";
            input.classList.remove("campo-invalido", "campo-valido");
        });
        actualizarContadorComentario();

        resultado.textContent = "¡Mensaje enviado! Te responderemos a la brevedad.";
        resultado.className = "contacto-resultado exito";
    });
});