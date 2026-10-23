# AutoCare Pro — Frontend React

Migración del proyecto **AutoCare Pro** (tienda de repuestos y taller mecánico) desde una plantilla
HTML/CSS/JS/Bootstrap a **React**, para la **Evaluación Parcial N° 2 de DSY1104**.

## Requisitos

- Node.js 18 o superior
- Chrome o Edge (para las pruebas Karma)

## Instalación y scripts

```bash
npm install
npm run dev      # desarrollo (http://localhost:5173)
npm run build    # build de producción (dist/)
npm run preview  # previsualizar el build
npm test         # pruebas unitarias con Karma + Jasmine
```

## Arquitectura

- **Vite 5 + React 18 + React Router 6 + Bootstrap 5.3.8**
- **Context API** para estado global:
  - `ProductsContext`: catálogo editable por el admin (persiste en `productosAdmin`).
  - `CartContext`: carrito, cupones y checkout (persiste en `carritoAutoCare` / `cuponCarrito` / `ordenes`).
  - `AuthContext`: login, registro, roles e intentos (persiste en `usuarioActivo` / `usuariosRegistrados` / `intentosLogin`).
- **CSS original reutilizado** (`src/styles/base.css`, `admin.css`, `blog.css`, `contact.css`).
- **Imágenes** en `public/IMG/` (se usa `Logo.png` como reemplazo cuando falta una foto).

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/catalogo` (`?cat=`, `?q=`) | Catálogo con filtros |
| `/producto/:id` | Detalle de producto |
| `/carrito` | Carrito y pago |
| `/login` | Iniciar sesión / registrarse |
| `/nosotros` | Sobre nosotros |
| `/blogs`, `/blogs/cambio-de-aceite`, `/blogs/lavado-sin-danar` | Blog |
| `/contacto` | Formulario de contacto |
| `/admin/home` | Dashboard (staff) |
| `/admin/productos`, `/admin/productos/nuevo`, `/admin/productos/:id/editar` | Productos (staff) |
| `/admin/ordenes` | Órdenes (staff) |
| `/admin/usuarios`, `/admin/usuarios/nuevo`, `/admin/usuarios/:correo/editar` | Usuarios (solo admin) |

## Roles y cuentas de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| `admin@duoc.cl` | `Admin123` | ADMINISTRADOR |
| `vendedor@profesor.duoc.cl` | `Venta123` | VENDEDOR |
| `cliente@duoc.cl` | `Auto123` | CLIENTE |

Dominios permitidos: `duoc.cl`, `profesor.duoc.cl`, `gmail.com`. Contraseña de 4 a 10 caracteres.
Máximo 5 intentos fallidos consecutivos.

## Cupones

- `AUTOCARE10` → 10% de descuento
- `DUOC15` → 15% de descuento

## Pruebas unitarias

La suite vive en la carpeta **`test/`** y se ejecuta con **Karma + Jasmine**:

| Archivo | Qué valida |
|---|---|
| `test/utils.spec.jsx` | Precio en CLP, correo, contraseña, cupón, stock y unidades |
| `test/components.spec.jsx` | `ProductCard` (render y clic) y sugerencias de `SearchBox` |
| `test/app.spec.jsx` | Que la aplicación muestre la página de inicio |

Total: **10 pruebas**, todas en verde.

## Notas

- Toda la persistencia es **del lado del cliente** (localStorage), igual que el proyecto original.
- El stock es informativo: el carrito lo respeta, pero el checkout no descuenta unidades.
- Al pagar se genera una **boleta** en `/boleta/:id` con los datos del cliente y el detalle de la compra.
- El vendedor puede registrar una venta desde **`/admin/venta`**: ingresa los datos del cliente, agrega
  productos y obtiene la misma boleta.
- El panel de órdenes muestra las órdenes demo más las generadas por el checkout y por el vendedor.
