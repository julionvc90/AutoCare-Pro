# Informe — Evaluación Parcial N° 2

**Asignatura:** DSY1104 — Desarrollo Fullstack I
**Proyecto:** AutoCare Pro — migración a React
**Evaluación:** Parcial N° 2 (30% de la asignatura · Encargo 40% · Presentación 60%)

**Integrantes:**
- Julio Navarro
- Claudio Carril
- Vicente Zúñiga
- José Ignacio Zúñiga

> Este documento es la base del informe. Reemplaza los textos entre corchetes por capturas y
> conclusiones del equipo antes de la entrega.

---

## 1. Introducción

AutoCare Pro es una tienda de repuestos automotrices y taller mecánico. En la Evaluación Parcial 1 se
construyó una plantilla con HTML, CSS, JavaScript y Bootstrap, con carrito implementado en JavaScript.
Para esta segunda parte el equipo migró el proyecto a **React**, incorporando componentes, navegación,
formularios con validación y una batería de **pruebas unitarias con Jasmine y Karma**.

**Objetivo:** actualizar el frontend a un framework moderno manteniendo la lógica de negocio del
carrito, el catálogo, la autenticación y el panel de administración.

---

## 2. Framework y arquitectura

Se eligió **React 18** con **Vite 5** como bundler. La aplicación se organiza en capas:

- `components/`: piezas reutilizables (layout, tarjetas, modales, rutas protegidas).
- `pages/`: una página por ruta; el panel admin en `pages/admin/`.
- `context/`: estado global con Context API (`Products`, `Cart`, `Auth`).
- `data/`: catálogo, usuarios semilla, regiones y órdenes de ejemplo.
- `utils/`: lógica pura y testeable (carrito, validaciones, formato, almacenamiento).

La persistencia se mantiene en **localStorage** con las mismas claves del proyecto original, lo que
permite conservar datos entre la versión antigua y la nueva.

**Evidencia de estructura sólida:** `npm run build` transforma 77 módulos y genera un bundle de
~253 KB (77 KB gzip) sin errores.

---

## 3. Componentes, props y estado

| Componente | Props principales | Estado que gestiona |
|---|---|---|
| `Layout` | — | Composición de TopBar, Navbar, Footer y panel de carrito |
| `TopBar` | — | Consume sesión y contador del carrito |
| `Navbar` | — | `abierto` (menú móvil) |
| `ProductCard` | `product`, `alAgregar` | — (consume `CartContext`) |
| `CartPanel` | — | Consume ítems y total del carrito |
| `Catalog` | — | `busqueda` (texto) + parámetros de URL (`cat`, `q`) |
| `ProductDetail` | — | `cantidad`, `mensaje` |
| `Cart` | — | `mensaje`, `tipo`, `cuponTexto` |
| `Login` | — | `formLogin`, `formRegistro`, mensajes |
| `Contact` | — | `valores`, `tocados`, `resultado` |
| `AdminLayout` | — | `abierto` (sidebar móvil) |
| `AdminProducts` | — | `filtro`, `pagina`, `detalle` |
| `AdminProductForm` | — | `form`, `errores` (incluye vista previa de imagen) |
| `AdminUsers` | — | `filtro`, `pagina` |
| `AdminUserForm` | — | `form`, `errores` |

**Props y estado en acción:**
- `ProductCard` recibe el producto por **props** y notifica la acción con un callback opcional.
- `Catalog` mantiene el **estado** del texto de búsqueda y sincroniza el filtro con la URL.
- `AdminProductForm` maneja un **estado de formulario** completo, errores por campo y la imagen como
  *data URL* mediante `FileReader`.

---

## 4. Navegación

Se usa **React Router 6** con rutas anidadas:

- Rutas públicas bajo el layout de tienda.
- Rutas de administración bajo `/admin` protegidas con `ProtectedRoute`:
  - sin sesión → redirige a `/login`;
  - cliente → redirige a `/`;
  - vendedor → no accede a usuarios.
- Enlaces con `NavLink` para marcar la sección activa.
- Filtros del catálogo por *query string* (`/catalogo?cat=aceites`, `/catalogo?q=...`).

---

## 5. Formularios y validación

| Formulario | Reglas principales |
|---|---|
| Login | Correo requerido y de dominio permitido; contraseña 4–10; máximo 5 intentos |
| Registro | Nombre ≤100; correo válido y único; contraseña 4–10; rol CLIENTE |
| Contacto | Nombre requerido ≤100; correo opcional ≤100 y dominio permitido; teléfono opcional 8–12 dígitos; comentario requerido ≤500 |
| Producto (admin) | Código requerido ≥3 y único; nombre ≤100; precio ≥0; stock entero ≥0; categoría requerida; imagen ≤300 KB |
| Usuario (admin) | RUN con DV válido; nombre/apellidos; correo único; contraseña 4–10 y confirmación; región/comuna; dirección |

Las validaciones viven en `src/utils/validation.js` (funciones puras y testeables) y los formularios
muestran el error junto al campo, marcando `is-invalid` / `campo-invalido`.

---

## 6. Diseño responsivo con Bootstrap

- Se conserva **Bootstrap 5.3.8** y el CSS original del proyecto.
- Rejilla responsiva: `col-12 col-sm-6 col-md-4 col-lg-3` para productos;
  `col-6 col-md-3` para categorías; `col-12 col-lg-8` + `col-12 col-lg-4` en el carrito.
- **Navbar colapsable** en móvil y **sidebar admin off-canvas** bajo 992 px.
- Panel de carrito flotante que se adapta a ancho de pantalla.
- [Agregar capturas en escritorio y móvil]

---

## 7. Pruebas unitarias (Jasmine + Karma)

**Configuración:** `karma.conf.cjs` (Karma 6 + karma-jasmine + karma-webpack + Babel) y
`babel.config.cjs` (preset-env + preset-react). Los specs viven en `test/**/*.spec.jsx`, se ejecutan en
Chrome/Edge headless y se limpia `localStorage` antes y después de cada prueba.

**Resultado:** **10 pruebas, todas exitosas (`TOTAL: 10 SUCCESS`).**

| # | Archivo | Caso de prueba |
|---|---|---|
| 1 | `test/utils.spec.jsx` | Formatea un precio en pesos chilenos |
| 2 | `test/utils.spec.jsx` | Acepta solo correos de dominios permitidos |
| 3 | `test/utils.spec.jsx` | Exige una contraseña de 4 a 10 caracteres |
| 4 | `test/utils.spec.jsx` | Calcula el total con un cupón de descuento |
| 5 | `test/utils.spec.jsx` | No agrega más unidades que el stock disponible |
| 6 | `test/utils.spec.jsx` | Cuenta el total de unidades del carrito |
| 7 | `test/utils.spec.jsx` | Elimina un producto del carrito |
| 8 | `test/utils.spec.jsx` | No permite una cantidad menor a 1 |
| 9 | `test/utils.spec.jsx` | Ignora un cupón que no existe |
| 10 | `test/utils.spec.jsx` | `crearOrden` guarda los datos del cliente y el total |

> Nota: las 10 pruebas son de funciones puras; no se monta la app ni se usa el DOM.

---

## 8. Proceso de testeo unitario

1. **Configuración del entorno:** se instalaron `karma`, `karma-jasmine`, `karma-chrome-launcher`,
   `karma-webpack`, `jasmine-core`, Babel y webpack. `karma.conf.cjs` define el *browser* headless y
   detecta Chrome o Edge según el sistema.
2. **Escritura de pruebas:** se probaron las funciones puras de `utils`. Cada `describe` agrupa un
   comportamiento y cada `it` valida un caso concreto.
3. **Pruebas simples:** cada `it` valida una sola idea y tiene un nombre descriptivo. No se usan
   mocks, espías ni renderizado de componentes: se llama a la función real y se revisa el resultado.
4. **Análisis de resultados:** `npm test` informa las 10 pruebas ejecutadas; la salida queda limpia,
   sin advertencias, y el equipo puede explicar qué valida cada una.
5. **Cobertura funcional:** precio en CLP, correo, contraseña, cupón, stock, unidades del carrito,
   eliminación de productos, cantidad mínima, cupón inválido y creación de una orden.

---

## 9. Conclusiones

- La migración a React permitió separar responsabilidades y reutilizar componentes (tarjetas,
  layout, formularios) sin perder la lógica del carrito ni el diseño original.
- Context API resolvió el estado global de forma simple y suficiente para el alcance del proyecto.
- Las pruebas con Jasmine y Karma dan confianza sobre la lógica crítica (carrito y validaciones) y
  sobre la interacción del usuario con los componentes.
- [Agregar aprendizajes del equipo y próximos pasos]

---

## Anexos

- Comandos: `npm install`, `npm run dev`, `npm run build`, `npm test`.
- Cuentas de prueba: `admin@duoc.cl / Admin123`, `vendedor@profesor.duoc.cl / Venta123`,
  `cliente@duoc.cl / Auto123`.
- Cupones: `AUTOCARE10` (10%), `DUOC15` (15%).
