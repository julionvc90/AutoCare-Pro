/* ============================================================
   AUTOCARE PRO - REGIONES Y COMUNAS DE CHILE
   Arreglo usado por los formularios de usuario (registro y panel).
   Al cambiar la región se cargan solo las comunas de esa región.
   Nota: por simplicidad se listan las comunas principales de cada región.
   ============================================================ */
const regiones = [
  { nombre: "Región de Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
  { nombre: "Región de Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"] },
  { nombre: "Región de Antofagasta", comunas: ["Antofagasta", "Calama", "Mejillones", "Tocopilla", "San Pedro de Atacama"] },
  { nombre: "Región de Atacama", comunas: ["Copiapó", "Caldera", "Vallenar", "Chañaral"] },
  { nombre: "Región de Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"] },
  { nombre: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota"] },
  { nombre: "Región Metropolitana de Santiago", comunas: ["Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes", "Providencia", "Ñuñoa", "San Bernardo", "Pudahuel", "Peñalolén"] },
  { nombre: "Región del Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "San Fernando", "Rengo", "Machalí", "Santa Cruz"] },
  { nombre: "Región del Maule", comunas: ["Talca", "Curicó", "Linares", "Constitución", "Cauquenes"] },
  { nombre: "Región de Ñuble", comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"] },
  { nombre: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "San Pedro de la Paz", "Chiguayante"] },
  { nombre: "Región de la Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón"] },
  { nombre: "Región de Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"] },
  { nombre: "Región de Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Puerto Varas", "Ancud"] },
  { nombre: "Región de Aysén del General Carlos Ibáñez del Campo", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"] },
  { nombre: "Región de Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] }
];

/* Rellena un <select> de regiones. */
function cargarRegiones(selectRegion) {
  selectRegion.innerHTML = '<option value="">-- Seleccione la región --</option>' +
    regiones.map(r => `<option value="${r.nombre}">${r.nombre}</option>`).join("");
}

/* Rellena el <select> de comunas según la región elegida. */
function cargarComunas(selectComuna, nombreRegion) {
  const region = regiones.find(r => r.nombre === nombreRegion);
  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>' +
    (region ? region.comunas.map(c => `<option value="${c}">${c}</option>`).join("") : "");
  selectComuna.disabled = !region;
}
