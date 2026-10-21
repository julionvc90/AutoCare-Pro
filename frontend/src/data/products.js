export const CATEGORIES = {
  aceites: 'Aceites & Filtros',
  detailing: 'Detailing & Limpieza',
  electricidad: 'Ampolletas & Electricidad',
  accesorios: 'Accesorios',
  motor: 'Motor y Transmisión',
  frenos: 'Frenos',
  carroceria: 'Carrocería',
};

export const DEFAULT_IMAGE = '/IMG/placeholder.svg';

export const CATALOG = [
  {
    id: 1,
    categoria: 'aceites',
    nombre: 'Aceite de Motor Castrol Edge 5W-30 4L',
    descripcion:
      'Aceite 100% sintético de alto rendimiento. Protege el motor en arranques en frío y ayuda a mantener el motor limpio. Recomendado para cambios cada 5.000 a 10.000 km.',
    precio: 34990,
    stock: 25,
    imagen: '/IMG/aceite-5w30.jpg',
  },
  {
    id: 2,
    categoria: 'aceites',
    nombre: 'Filtro de Aceite Blindado Premium',
    descripcion:
      'Filtro de aceite de carcasa reforzada con válvula antirretorno. Compatible con la mayoría de motores de 1.6 a 2.0 L. Cámbialo junto con cada cambio de aceite.',
    precio: 8500,
    stock: 40,
    imagen: '/IMG/filtro-aceite.jpg',
  },
  {
    id: 3,
    categoria: 'aceites',
    nombre: 'Filtro de Aire Cónico de Alto Flujo',
    descripcion:
      'Filtro de aire cónico lavable y reutilizable que mejora el flujo de aire al motor. Aporta mejor respuesta del acelerador y un consumo más eficiente.',
    precio: 15990,
    stock: 18,
    imagen: '/IMG/filtro-aire.jpg',
  },
  {
    id: 4,
    categoria: 'detailing',
    nombre: 'Shampoo Autolavado con Cera Concentrada',
    descripcion:
      'Shampoo de pH neutro con cera incorporada. Limpia sin dañar la pintura y deja una capa protectora con brillo. Rinde hasta 30 lavados.',
    precio: 12990,
    stock: 30,
    imagen: '/IMG/shampoo-cera.jpg',
  },
  {
    id: 5,
    categoria: 'detailing',
    nombre: 'Paños de Microfibra Ultra Absorbente (3u)',
    descripcion:
      'Pack de 3 paños de microfibra de alta densidad. No dejan pelusas ni rayan la pintura. Aptos para secado, pulido y limpieza interior.',
    precio: 5490,
    stock: 50,
    imagen: '/IMG/microfibra.jpg',
  },
  {
    id: 6,
    categoria: 'detailing',
    nombre: 'Limpiador de Llantas Activo',
    descripcion:
      'Limpiador que disuelve el polvo de frenos y la suciedad incrustada en llantas. Fórmula segura para aleación y cromo.',
    precio: 8990,
    stock: 22,
    imagen: '/IMG/limpiador-llantas.jpg',
  },
  {
    id: 7,
    categoria: 'electricidad',
    nombre: 'Ampolletas LED H7 de Alta Potencia',
    descripcion:
      'Par de ampolletas LED H7 con mayor luminosidad y menor consumo que las halógenas. Luz blanca de 6000K y larga vida útil.',
    precio: 21990,
    stock: 15,
    imagen: '/IMG/ampolleta.jpg',
  },
  {
    id: 8,
    categoria: 'electricidad',
    nombre: 'Set de Fusibles Automotrices Surtidos',
    descripcion:
      'Set de fusibles de distintos amperajes (5A a 40A) con pinza extractora. Ideal para tener de respaldo en la guantera.',
    precio: 4500,
    stock: 60,
    imagen: '/IMG/fusibles.jpg',
  },
  {
    id: 9,
    categoria: 'electricidad',
    nombre: 'Batería de Auto 12V 60AH Libre Mantención',
    descripcion:
      'Batería sellada de 12V y 60AH, libre de mantención. Buen desempeño de arranque en climas fríos. Consulta compatibilidad con tu vehículo.',
    precio: 68990,
    stock: 8,
    imagen: '/IMG/bateria.jpg',
  },
  {
    id: 10,
    categoria: 'accesorios',
    nombre: 'Gata Hidráulica de Caimán 2 Toneladas',
    descripcion:
      'Gata hidráulica tipo caimán con capacidad de 2 toneladas. Estructura de acero y bajo perfil para levantar el vehículo de forma estable.',
    precio: 38000,
    stock: 12,
    imagen: '/IMG/gata.jpg',
  },
  {
    id: 11,
    categoria: 'accesorios',
    nombre: 'Compresor de Aire Portátil 12V Digital',
    descripcion:
      'Compresor portátil con manómetro digital y apagado automático al alcanzar la presión elegida. Se conecta al encendedor del vehículo.',
    precio: 24990,
    stock: 20,
    imagen: '/IMG/compresor.jpg',
  },
  {
    id: 12,
    categoria: 'accesorios',
    nombre: 'Cables Pasa Corriente Reforzados 3 Metros',
    descripcion:
      'Cables pasa corriente de 3 metros con pinzas reforzadas y aislación resistente. Para partir el vehículo cuando la batería se descarga.',
    precio: 11990,
    stock: 16,
    imagen: '/IMG/cables.jpg',
  },
  {
    id: 13,
    categoria: 'motor',
    nombre: 'Motor de Partida 12V 1.4 kW',
    descripcion:
      'Motor de arranque de 12V y 1.4 kW con piñón reforzado. Compatible con motores bencineros de 1.4 a 2.0 L. Reemplaza el arranque original sin modificaciones.',
    precio: 89990,
    stock: 10,
    imagen: '/IMG/motor-partida.jpg',
  },
  {
    id: 14,
    categoria: 'motor',
    nombre: 'Kit Correa de Distribución con Tensor',
    descripcion:
      'Correa de distribución de alta resistencia con tensor y rodamientos. Recomendado para la mantención preventiva según el kilometraje del fabricante.',
    precio: 45990,
    stock: 14,
    imagen: '/IMG/correa-distribucion.jpg',
  },
  {
    id: 15,
    categoria: 'frenos',
    nombre: 'Pastillas de Freno con Patines (Juego Delantero)',
    descripcion:
      'Juego de pastillas cerámicas con patines antivibración y clips de montaje. Baja generación de polvo y frenado silencioso.',
    precio: 28990,
    stock: 24,
    imagen: '/IMG/pastillas-freno.jpg',
  },
  {
    id: 16,
    categoria: 'frenos',
    nombre: 'Discos de Freno Ventilados (Par)',
    descripcion:
      'Par de discos ventilados de hierro fundido para mejor disipación del calor. Verifica el diámetro y el número de pernos de tu vehículo.',
    precio: 74990,
    stock: 12,
    imagen: '/IMG/disco-freno.jpg',
  },
  {
    id: 17,
    categoria: 'frenos',
    nombre: 'Tambores de Freno (Par)',
    descripcion:
      'Par de tambores de freno balanceados con superficie de fricción rectificada. Ideales para reemplazo por desgaste o ruido.',
    precio: 58990,
    stock: 9,
    imagen: '/IMG/tambor-freno.jpg',
  },
  {
    id: 18,
    categoria: 'motor',
    nombre: 'Kit de Embrague Completo (Disco, Prensa y Collarín)',
    descripcion:
      'Kit de embrague con disco, plato de presión y collarín de empuje. Restaura la transmisión de fuerza y suaviza el accionamiento del pedal.',
    precio: 129990,
    stock: 7,
    imagen: '/IMG/embrague.jpg',
  },
  {
    id: 19,
    categoria: 'motor',
    nombre: 'Set de Pistones con Anillos (4 unidades)',
    descripcion:
      'Set de 4 pistones con anillos de compresión y de aceite. Fabricados en aleación de aluminio para motores de 1.6 a 2.0 L.',
    precio: 159990,
    stock: 6,
    imagen: '/IMG/pistones.jpg',
  },
  {
    id: 20,
    categoria: 'carroceria',
    nombre: 'Parachoques Delantero',
    descripcion:
      'Parachoques delantero de ABS reforzado con soportes de montaje. Acabado listo para pintar según el color del vehículo.',
    precio: 119990,
    stock: 5,
    imagen: '/IMG/parachoques-delantero.jpg',
  },
  {
    id: 21,
    categoria: 'carroceria',
    nombre: 'Parachoques Trasero',
    descripcion:
      'Parachoques trasero de ABS reforzado con soportes y guías de montaje. Acabado listo para pintar.',
    precio: 109990,
    stock: 5,
    imagen: '/IMG/parachoques-trasero.jpg',
  },
];
