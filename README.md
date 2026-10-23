# AutoCare Pro (React)

Migración del proyecto HTML/CSS/JS original a **React + Vite**, conservando los
CSS, las imágenes, el HTML de cada página y toda la lógica (carrito, cupones,
login con 5 intentos, validaciones, panel por roles, localStorage).

## Cómo ejecutarlo

```bash
npm install
npm run dev       # desarrollo
npm run build     # producción (carpeta dist)
```

## Qué se mantuvo igual

- `public/css/` → **los 4 CSS originales sin modificar** (`styles.css`, `admin.css`, `Blogs.css`, `contacto.css`).
- `public/IMG/` → las mismas imágenes.
- Bootstrap 5.3.8 y Font Awesome siguen cargándose por CDN desde `index.html`, igual que antes.
- Mismas clases, mismos textos, mismas reglas de negocio y mismas claves de localStorage
  (`carritoAutoCare`, `cuponCarrito`, `usuarioActivo`, `usuariosRegistrados`, `productosAdmin`, `ordenes`, `mensajesContacto`, `intentosLogin`).
- Cuentas de prueba: `admin@duoc.cl / Admin123`, `vendedor@profesor.duoc.cl / Venta123`, `cliente@duoc.cl / Auto123`.

## Equivalencia de archivos

| Original | React |
|---|---|
| `index.html` | `src/pages/Home.jsx` → `/` |
| `SobreNosotros.html` | `src/pages/SobreNosotros.jsx` → `/nosotros` |
| `Catalogo.html?cat=x` | `src/pages/Catalogo.jsx` → `/catalogo?cat=x` |
| `DetalleProducto.html?id=N` | `src/pages/DetalleProducto.jsx` → `/producto/N` |
| `Blogs.html`, `DetalleBlog1/2.html` | `Blogs.jsx`, `DetalleBlog1.jsx`, `DetalleBlog2.jsx` → `/blogs`, `/blog/...` |
| `contacto.html` + `Contacto.js` | `Contacto.jsx` + `utils/validaciones.js` |
| `Login.html` | `Login.jsx` (login + registro) |
| `Carrito.html` + `Carrito.js` | `Carrito.jsx` + `context/CarritoContext.jsx` |
| `admin-*.html` + `admin.js` | `src/pages/admin/*` → `/admin/...` |
| `main.js` (carrito, sesión) | `context/CarritoContext.jsx`, `context/SesionContext.jsx`, `components/TopBar.jsx` |
| `funciones.js` (datos, validaciones) | `data/productos.js`, `data/usuarios.js`, `utils/*` |
| `regiones.js` | `data/regiones.js` |
| Barra superior + navbar + footer repetidos en cada .html | `components/TopBar`, `NavBar`, `Footer` (una sola vez) |

## Lo único que cambió por ser React

- Un solo `index.html`; las páginas son rutas (`react-router-dom`). Los CSS de página
  (`admin`, `Blogs`, `contacto`) se activan solo en su página (`hooks/useCss.js`) para
  que no se pisen entre sí.
- `src/App.css` (nuevo, 2 reglas) reemplaza lo que `styles.css` hacía con `body`, porque ahora el contenido vive dentro de `#root`.
- El JS de Bootstrap ya no se usa: el menú colapsable, los modales y los avisos están hechos con estado de React y las mismas clases de Bootstrap.
- Se corrigió una ruta de imagen: `limpiador de llantas activo.jpg` → `Limpiador de Llantas Activo.jpg`
  (en Windows funcionaba, en Linux/hosting no).
- Los enlaces "Ver carrito completo" de Login/Catálogo apuntaban a `index.html`; ahora van a `/carrito`.

## Despliegue

Con `BrowserRouter` el hosting debe redirigir cualquier ruta a `index.html`
(Netlify/Vercel lo hacen con una regla; en GitHub Pages usa `HashRouter` en `main.jsx`).

## Comentarios en el código

Los archivos tienen una línea de resumen al inicio y notas cortas en lenguaje simple
donde hay algo de React que puede costar entender (`useState`, `useEffect`, contextos, `.map`, etc.).
Las que empiezan con `CONEXIÓN:` indican dónde se conecta una parte con otra.

Para verlas todas: Ctrl+Shift+F en VS Code y buscar `CONEXIÓN:`.
