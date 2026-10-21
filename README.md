# AutoCare Pro

Tienda de repuestos automotrices y taller mecánico — proyecto de **DSY1104 — Desarrollo Fullstack I**.

## Integrantes del equipo

- Julio Navarro
- Claudio Carril
- Vicente Zúñiga
- José Ignacio Zúñiga

## Versión vigente: React

La aplicación está en la carpeta **`frontend/`** y usa **Vite + React 18 + React Router 6 + Bootstrap 5**.

```bash
cd frontend
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm test         # 40 pruebas unitarias con Jasmine + Karma
npm run build    # build de producción (frontend/dist)
```

### Estructura de la app

```
frontend/src/
├── components/   # Layout, Navbar, TopBar, Footer, CartPanel, ProductCard, Modal, AdminLayout…
├── context/      # ProductsContext, CartContext, AuthContext
├── data/         # catálogo, usuarios, regiones y órdenes de ejemplo
├── pages/        # páginas públicas
│   └── admin/    # dashboard, productos, órdenes y usuarios
├── styles/       # CSS del proyecto
├── utils/        # carrito, validaciones, formato y almacenamiento (+ pruebas)
├── App.jsx       # definición de rutas
└── main.jsx      # providers y arranque
```

### Documentación

- [`PLAN.md`](PLAN.md) — plan de migración por fases y mapeo HTML → React.
- [`INFORME.md`](INFORME.md) — base del informe de la Evaluación Parcial 2.
- [`frontend/README.md`](frontend/README.md) — rutas, roles, cupones y pruebas.

## Historial

La primera versión del proyecto (HTML, CSS, JavaScript y Bootstrap de la Parte 1) se conserva en el
historial de git. Se eliminó del árbol de trabajo al migrar la aplicación a React.
