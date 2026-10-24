// Layout: estructura base de la tienda con barra, navbar, contenido y footer.
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartPanel from './CartPanel';

export default function Layout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartPanel />
    </>
  );
}
