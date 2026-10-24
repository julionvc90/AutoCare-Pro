// App: define las rutas publicas y las del panel de administracion.
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Login from './pages/Login';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogDetail1 from './pages/BlogDetail1';
import BlogDetail2 from './pages/BlogDetail2';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminHome from './pages/admin/AdminHome';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserForm from './pages/admin/AdminUserForm';
import AdminSale from './pages/admin/AdminSale';
import ReceiptPage from './pages/Receipt';

const STAFF = ['ADMINISTRADOR', 'VENDEDOR'];
const ADMIN_ONLY = ['ADMINISTRADOR'];

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/cambio-de-aceite" element={<BlogDetail1 />} />
        <Route path="/blogs/lavado-sin-danar" element={<BlogDetail2 />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boleta/:id" element={<ReceiptPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={STAFF}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="productos" element={<AdminProducts />} />
        <Route path="productos/nuevo" element={<AdminProductForm />} />
        <Route path="productos/:id/editar" element={<AdminProductForm />} />
        <Route path="ordenes" element={<AdminOrders />} />
        <Route path="venta" element={<AdminSale />} />
        <Route
          path="usuarios"
          element={
            <ProtectedRoute roles={ADMIN_ONLY}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="usuarios/nuevo"
          element={
            <ProtectedRoute roles={ADMIN_ONLY}>
              <AdminUserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="usuarios/:correo/editar"
          element={
            <ProtectedRoute roles={ADMIN_ONLY}>
              <AdminUserForm />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
