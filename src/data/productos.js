// Datos iniciales de la tienda. Cada producto es un objeto dentro de un arreglo.
// ==========================================
// LISTA DE ARTÍCULOS (semilla)
// ==========================================
// precio: número (pesos CLP) para poder calcular totales sin parsear texto.
// stock:  unidades disponibles; limita la cantidad que se puede elegir en el detalle.
// Las imágenes viven en /public/IMG (se escriben sin "/" inicial, igual que antes).
export const PRODUCTOS_INICIALES = [
  // --- Aceites & Filtros ---
  {
    id: 1,
    categoria: "aceites",
    nombre: "Aceite de Motor Castrol Edge 5W-30 4L",
    descripcion: "Aceite 100% sintético de alto rendimiento. Protege el motor en arranques en frío y ayuda a mantener el motor limpio. Recomendado para cambios cada 5.000 a 10.000 km.",
    precio: 34990,
    stock: 25,
    imagen: "/IMG/aceite-5w30.jpg"
  },
  {
    id: 2,
    categoria: "aceites",
    nombre: "Filtro de Aceite Blindado Premium",
    descripcion: "Filtro de aceite de carcasa reforzada con válvula antirretorno. Compatible con la mayoría de motores de 1.6 a 2.0 L. Cámbialo junto con cada cambio de aceite.",
    precio: 8500,
    stock: 40,
    imagen: "/IMG/filtro-aceite.jpg"
  },
  {
    id: 3,
    categoria: "aceites",
    nombre: "Filtro de Aire Cónico de Alto Flujo",
    descripcion: "Filtro de aire cónico lavable y reutilizable que mejora el flujo de aire al motor. Aporta mejor respuesta del acelerador y un consumo más eficiente.",
    precio: 15990,
    stock: 18,
    imagen: "/IMG/filtro-aire.jpg"
  },

  // --- Detailing & Limpieza ---
  {
    id: 4,
    categoria: "detailing",
    nombre: "Shampoo Autolavado con Cera Concentrada",
    descripcion: "Shampoo de pH neutro con cera incorporada. Limpia sin dañar la pintura y deja una capa protectora con brillo. Rinde hasta 30 lavados.",
    precio: 12990,
    stock: 30,
    imagen: "/IMG/shampoo-cera.jpg"
  },
  {
    id: 5,
    categoria: "detailing",
    nombre: "Paños de Microfibra Ultra Absorbente (3u)",
    descripcion: "Pack de 3 paños de microfibra de alta densidad. No dejan pelusas ni rayan la pintura. Aptos para secado, pulido y limpieza interior.",
    precio: 5490,
    stock: 50,
    imagen: "/IMG/Paños de Microfibra Ultra Absorbente (3u).jpg"
  },
  {
    id: 6,
    categoria: "detailing",
    nombre: "Limpiador de Llantas Activo",
    descripcion: "Limpiador que disuelve el polvo de frenos y la suciedad incrustada en llantas. Fórmula segura para aleación y cromo.",
    precio: 8990,
    stock: 22,
    imagen: "/IMG/Limpiador de Llantas Activo.jpg"
  },

  // --- Ampolletas & Electricidad ---
  {
    id: 7,
    categoria: "electricidad",
    nombre: "Ampolletas LED H7 de Alta Potencia",
    descripcion: "Par de ampolletas LED H7 con mayor luminosidad y menor consumo que las halógenas. Luz blanca de 6000K y larga vida útil.",
    precio: 21990,
    stock: 15,
    imagen: "/IMG/Ampolletas LED H7 de Alta Potencia.jpg"
  },
  {
    id: 8,
    categoria: "electricidad",
    nombre: "Set de Fusibles Automotrices Surtidos",
    descripcion: "Set de fusibles de distintos amperajes (5A a 40A) con pinza extractora. Ideal para tener de respaldo en la guantera.",
    precio: 4500,
    stock: 60,
    imagen: "/IMG/Set de Fusibles Automotrices Surtidos.jpg"
  },
  {
    id: 9,
    categoria: "electricidad",
    nombre: "Batería de Auto 12V 60AH Libre Mantención",
    descripcion: "Batería sellada de 12V y 60AH, libre de mantención. Buen desempeño de arranque en climas fríos. Consulta compatibilidad con tu vehículo.",
    precio: 68990,
    stock: 8,
    imagen: "/IMG/Batería de Auto 12V 60AH Libre Mantención.jpg"
  },

  // --- Accesorios ---
  {
    id: 10,
    categoria: "accesorios",
    nombre: "Gata Hidráulica de Caimán 2 Toneladas",
    descripcion: "Gata hidráulica tipo caimán con capacidad de 2 toneladas. Estructura de acero y bajo perfil para levantar el vehículo de forma estable.",
    precio: 38000,
    stock: 12,
    imagen: "/IMG/Gata Hidráulica de Caimán 2 Toneladas.jpg"
  },
  {
    id: 11,
    categoria: "accesorios",
    nombre: "Compresor de Aire Portátil 12V Digital",
    descripcion: "Compresor portátil con manómetro digital y apagado automático al alcanzar la presión elegida. Se conecta al encendedor del vehículo.",
    precio: 24990,
    stock: 20,
    imagen: "/IMG/Compresor de Aire Portátil 12V Digital.jpg"
  },
  {
    id: 12,
    categoria: "accesorios",
    nombre: "Cables Pasa Corriente Reforzados 3 Metros",
    descripcion: "Cables pasa corriente de 3 metros con pinzas reforzadas y aislación resistente. Para partir el vehículo cuando la batería se descarga.",
    precio: 11990,
    stock: 16,
    imagen: "/IMG/Cables Pasa Corriente Reforzados 3 Metros.jpg"
  }
];

export const NOMBRES_CATEGORIAS = {
  aceites: "Aceites & Filtros",
  detailing: "Detailing & Limpieza",
  electricidad: "Ampolletas & Electricidad",
  accesorios: "Accesorios"
};

