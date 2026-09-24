// --- inicialización ---
let servicios = JSON.parse(localStorage.getItem('servicios')) || [
    { id: 1, nombre: 'Cambio de Aceite', precio: 30000 },
    { id: 2, nombre: 'Revisión de Frenos', precio: 20000 }
];

let reservas = JSON.parse(localStorage.getItem('reservas')) || []; //--- los datos no se borrarran ejeje

// guardo las cosas en una variable para el admin
let idEditando = null;

// --- FUNCIONES DE NAVEGACIÓN ---
function mostrarVista(nombreVista) {
    document.getElementById('vista-cliente').style.display = 'none';
    document.getElementById('vista-vendedor').style.display = 'none';
    document.getElementById('vista-admin').style.display = 'none';

    document.getElementById('vista-' + nombreVista).style.display = 'block';
    actualizarVistas();
}

// --- 2. logica ---
function guardarReserva() {
    let nom = document.getElementById('nombre').value;
    let pat = document.getElementById('patente').value;
    let serv = document.getElementById('servicio').value;

    if (!nom || !pat) return alert("Completa todos los campos");

    reservas.push({ id: Date.now(), cliente: nom, patente: pat, servicio: serv, estado: 'Pendiente' });
    guardarEnStorage();
    
    alert("Reserva Agendada");
    document.getElementById('nombre').value = '';
    document.getElementById('patente').value = '';
}

// --- 3. LÓGICA VENDEDOR ---
function cambiarEstado(id) {
    let res = reservas.find(r => r.id === id);
    if (res) {
        res.estado = (res.estado === 'Pendiente') ? 'Atendido' : 'Pendiente';
        guardarEnStorage();
        actualizarVistas();
    }
}

// --- 4. LÓGICA ADMIN (AGREGAR, EDITAR, ELIMINAR) ---
function guardarServicio() {
    let nom = document.getElementById('adm-nombre').value;
    let pre = document.getElementById('adm-precio').value;

    if (!nom || !pre) return alert("Ingresa nombre y precio");

    if (idEditando !== null) {
        // Modo Editar
        let serv = servicios.find(s => s.id === idEditando);
        serv.nombre = nom;
        serv.precio = pre;
        idEditando = null;
    } else {
        // Modo Agregar
        servicios.push({ id: Date.now(), nombre: nom, precio: pre });
    }

    guardarEnStorage();
    document.getElementById('adm-nombre').value = '';
    document.getElementById('adm-precio').value = '';
    actualizarVistas();
}

function cargarEdicion(id) {
    let serv = servicios.find(s => s.id === id);
    document.getElementById('adm-nombre').value = serv.nombre;
    document.getElementById('adm-precio').value = serv.precio;
    idEditando = id; // Guardamos la id del servicio a editar
}

function eliminarServicio(id) {
    servicios = servicios.filter(s => s.id !== id);
    guardarEnStorage();
    actualizarVistas();
}

// --- UTILIDADES ---
function guardarEnStorage() {
    localStorage.setItem('servicios', JSON.stringify(servicios));
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

function actualizarVistas() {
    // Actualizar Select del Cliente
    let select = document.getElementById('servicio');
    select.innerHTML = servicios.map(s => `<option value="${s.nombre}">${s.nombre} ($${s.precio})</option>`).join('');

    // Actualizar Tabla del Vendedor
    let tablaRes = document.getElementById('tabla-reservas');
    tablaRes.innerHTML = reservas.map(r => `
        <tr>
            <td>${r.cliente}</td>
            <td>${r.patente}</td>
            <td>${r.servicio}</td>
            <td><b>${r.estado}</b></td>
            <td><button onclick="cambiarEstado(${r.id})">Cambiar Estado</button></td>
        </tr>
    `).join('');

    // Actualizar Tabla del Admin
    let tablaAdm = document.getElementById('tabla-servicios-admin');
    tablaAdm.innerHTML = servicios.map(s => `
        <tr>
            <td>${s.nombre}</td>
            <td>$${s.precio}</td>
            <td>
                <button onclick="cargarEdicion(${s.id})">Editar</button>
                <button onclick="eliminarServicio(${s.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Cargar datos al abrir la página
actualizarVistas();