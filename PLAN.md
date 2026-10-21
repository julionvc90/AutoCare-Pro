# Plan de migración a React — AutoCare Pro

> Asignatura **DSY1104 — Desarrollo Fullstack I**
> Evaluación Parcial N° 2 (30% de la asignatura) · Encargo 40% · Presentación 60%
> Rama de trabajo: `vicente-4`

---

## 1. Contexto y requisitos (extraídos del PDF de la evaluación)

La evaluación pide **actualizar la plantilla de tienda** entregada (HTML, CSS, JavaScript y
Bootstrap, con carrito ya implementado) **integrando un framework moderno de frontend**, y además:

1. **Framework JS moderno (React)** con estructura sólida — *IE2.1.1 (10%)*.
2. **Componentes React** gestionando **props y estado**, con **diseño responsivo con Bootstrap** — *IE2.1.2 (10%)*.
3. **Navegación y formularios** con la lógica de validación del framework.
4. **Pruebas unitarias de componentes frontend** con **Jasmine y Karma** (idealmente 10) — *IE2.2.1 (12%)*.
5. **Proceso de testeo unitario**: configuración del entorno, escritura de pruebas, **mocks** y
   **análisis de resultados** — *IE2.3.1 (8%)*.
6. **Informe** y **presentación** explicando el proceso — *IE2.1.3, IE2.1.4, IE2.2.2, IE2.3.2*.

---

## 2. Decisiones técnicas

| Decisión | Elección | Motivo |
|---|---|---|
| Bundler | **Vite 5** | Arranque rápido, soporte JSX nativo |
| Framework | **React 18** | Requisito del encargo |
| Navegación | **React Router 6** | Rutas públicas + panel admin protegido |
| Estado global | **Context API** (Productos, Carrito, Auth) | Props/estado sin librerías extra |
| UI | **Bootstrap 5.3.8** + CSS original reutilizado | Mantener el diseño de la plantilla |
| Persistencia | **localStorage** (mismas claves del proyecto original) | Compatibilidad con datos existentes |
| Pruebas | **Karma 6 + Jasmine 5 + webpack + Babel** | Requisito explícito (Jasmine + Karma) |
| Ubicación | App React en **`frontend/`** | No romper la plantilla original |

**Claves de localStorage conservadas:** `carritoAutoCare`, `cuponCarrito`, `ordenes`,
`usuarioActivo`, `usuariosRegistrados`, `intentosLogin`, `productosAdmin`, `mensajesContacto`.

---

## 3. Estructura del proyecto

```
AutoCare-Pro/
├── frontend/                  # App React (nueva)
│   ├── public/IMG/            # Imágenes (copiadas del proyecto original)
│   ├── src/
│   │   ├── components/        # Layout, Navbar, TopBar, Footer, CartPanel, ProductCard, Modal, AdminLayout…
│   │   ├── context/           # ProductsContext, CartContext, AuthContext
│   │   ├── data/              # products.js, users.js, regions.js, orders.js
│   │   ├── pages/             # Home, Catalog, ProductDetail, Cart, Login, About, Blogs, Contact…
│   │   │   └── admin/         # AdminHome, AdminProducts, AdminProductForm, AdminOrders, AdminUsers, AdminUserForm
│   │   ├── styles/            # base.css, admin.css, blog.css, contact.css (del proyecto original)
│   │   ├── utils/             # cart.js, validation.js, format.js, storage.js (+ *.spec.jsx)
│   │   ├── App.jsx            # Rutas
│   │   └── main.jsx           # Providers + arranque
│   ├── babel.config.cjs
│   ├── karma.conf.cjs
│   ├── vite.config.js
│   └── package.json
├── *.html, css/, js/, IMG/    # Plantilla original (se conserva como referencia)
├── PLAN.md                    # Este documento
└── INFORME.md                 # Guía del informe de la evaluación
```

---

## 4. Fases ejecutadas

| # | Fase | Estado |
|---|---|---|
| 0 | Análisis del PDF, de la plantilla y del catálogo (12 productos, roles, validaciones) | ✅ |
| 1 | Scaffold Vite + React + Router + Bootstrap + Karma/Jasmine | ✅ |
| 2 | Datos y lógica pura (`products`, `users`, `regions`, `cart`, `validation`, `format`, `storage`) | ✅ |
| 3 | Layout compartido (TopBar, Navbar, Footer, panel de carrito) | ✅ |
| 4 | Páginas públicas (Inicio, Catálogo, Detalle, Carrito, Login/Registro, Nosotros, Blogs, Contacto, 404) | ✅ |
| 5 | Carrito con Context + localStorage (topes por stock, cupones, checkout) | ✅ |
| 6 | Autenticación (roles, intentos, dominios permitidos, sesión) | ✅ |
| 7 | Panel admin (dashboard, productos CRUD, órdenes, usuarios CRUD) | ✅ |
| 8 | Pruebas unitarias Jasmine + Karma | ✅ **40 pruebas en verde** |
| 9 | Documentación (README, informe, plan) | ✅ |
| 10 | Verificación: `vite build` + `karma start` | ✅ |
| 11 | Commit y push a `origin/vicente-4` | ⏳ Pendiente (a pedido del usuario) |

---

## 5. Mapeo plantilla HTML → React

| Archivo original | Página / componente React |
|---|---|
| `index.html` | `pages/Home.jsx` |
| `Catalogo.html` | `pages/Catalog.jsx` |
| `DetalleProducto.html` | `pages/ProductDetail.jsx` |
| `Carrito.html` | `pages/Cart.jsx` |
| `Login.html` | `pages/Login.jsx` |
| `SobreNosotros.html` | `pages/About.jsx` |
| `Blogs.html` | `pages/Blogs.jsx` |
| `DetalleBlog1.html` / `DetalleBlog2.html` | `pages/BlogDetail1.jsx` / `BlogDetail2.jsx` |
| `contacto.html` | `pages/Contact.jsx` |
| `admin-home.html` | `pages/admin/AdminHome.jsx` |
| `admin-productos.html` | `pages/admin/AdminProducts.jsx` |
| `admin-producto-form.html` | `pages/admin/AdminProductForm.jsx` |
| `admin-ordenes.html` | `pages/admin/AdminOrders.jsx` |
| `admin-usuarios.html` | `pages/admin/AdminUsers.jsx` |
| `admin-usuario-form.html` | `pages/admin/AdminUserForm.jsx` |
| `js/main.js` (carrito, sesión) | `context/CartContext.jsx` + `context/AuthContext.jsx` |
| `js/funciones.js` (datos, login, catálogo) | `data/*.js` + `utils/validation.js` + `context/AuthContext.jsx` |
| `js/Carrito.js` | `pages/Cart.jsx` + `utils/cart.js` |
| `js/Contacto.js` | `pages/Contact.jsx` + `utils/validation.js` |
| `js/admin.js` | `pages/admin/*` |
| `js/regiones.js` | `data/regions.js` |

---

## 6. Rúbrica → evidencia

| Indicador | Dónde se evidencia |
|---|---|
| **IE2.1.1** Proyecto con framework JS bien estructurado | `frontend/` con Vite + React + Router; estructura por capas (components/context/data/pages/utils) |
| **IE2.1.2** Componentes con props/estado + responsive Bootstrap | `ProductCard` (props), `Catalog`/`Cart` (estado), `AdminProductForm` (estado de formulario); rejilla Bootstrap `col-12 col-sm-6 col-md-4 col-lg-3`, navbar colapsable, panel admin off-canvas |
| **IE2.2.1** Pruebas unitarias Jasmine + Karma | `src/**/*.spec.jsx` (40 pruebas), `karma.conf.cjs`, `babel.config.cjs` |
| **IE2.3.1** Proceso de testeo (entorno, escritura, mocks, análisis) | Entorno Karma + webpack + Babel; `spyOn(localStorage, 'setItem')` como mock/espía; sección 7 del `INFORME.md` |
| **IE2.1.3 / IE2.1.4** Exposición del diseño y del desarrollo | `INFORME.md` secciones 2–5 |
| **IE2.2.2 / IE2.3.2** Demostración y explicación de pruebas | `INFORME.md` secciones 7–8 + `npm test` en vivo |

---

## 7. Cómo ejecutar

```bash
cd frontend
npm install          # instala dependencias
npm run dev          # servidor de desarrollo en http://localhost:5173
npm run build        # build de producción en frontend/dist
npm test             # pruebas unitarias (Karma + Jasmine)
```

> Requiere **Node.js 18+**. Las pruebas abren Chrome/Edge headless.

---

## 8. Mejoras respecto del proyecto original

- **Órdenes reales en el panel:** el original mostraba 6 órdenes fijas e ignoraba las del checkout;
  ahora el panel mezcla las órdenes demo con las que genera `checkout` en `localStorage`.
- **Rutas reales** en lugar de saltos entre archivos `.html`.
- **Estado reactivo**: el carrito, la sesión y los productos se actualizan sin recargar la página.
- **Guardas de ruta** (`ProtectedRoute`) por rol: staff → admin; clientes → tienda.
- **Formularios controlados** con validación en vivo y mensajes por campo.

---

## 9. Pendientes sugeridos

1. Revisar visualmente en el navegador y ajustar detalles de estilo.
2. Completar `INFORME.md` con nombre del equipo, capturas y conclusiones.
3. Hacer commit y push de la rama `vicente-4`.
4. Preparar la presentación (demo de rutas, carrito, cupones, admin y `npm test`).
