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

La suite vive en `src/**/*.spec.jsx` y se ejecuta con **Karma + Jasmine**:

| Archivo | Qué valida |
|---|---|
| `utils/format.spec.jsx` | Formato de precios CLP y casos inválidos |
| `utils/validation.spec.jsx` | RUT, correo, contraseña, teléfono, comentario y sugerencia de dominio |
| `utils/cart.spec.jsx` | Resumen con cupón, topes de stock, cantidades, eliminar y contar |
| `components/ProductCard.spec.jsx` | Render de nombre/precio, clic en “Comprar”, persistencia con espía de Jasmine |
| `pages/Login.spec.jsx` | Validación del formulario: correo vacío y dominio no permitido |
| `App.spec.jsx` | Montaje (smoke) de portada, catálogo, detalle, carrito, contacto, panel admin y formularios admin |

Total: **40 pruebas**, todas en verde.

## Notas

- Toda la persistencia es **del lado del cliente** (localStorage), igual que el proyecto original.
- El stock es informativo: el carrito lo respeta, pero el checkout no descuenta unidades.
- El panel de órdenes muestra las órdenes demo más las generadas por el checkout real.
