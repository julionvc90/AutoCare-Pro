import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import AdminProductos from "./pages/AdminProductos";

import { PRODUCTOS_INICIALES } from "./data/productos";
import { leerStorage } from "./utils/formato";

// App es el componente principal. Aquí viven los datos que usan VARIAS páginas
// (productos, carrito y usuario) y se los pasamos a cada una con "props".
// A esto se le llama "levantar el estado" (lifting state up).
export default function App() {
  // useState(valorInicial): guarda un dato. Si cambia, React vuelve a dibujar.
  // Al iniciar leemos localStorage para no perder los datos al recargar.
  const [productos, setProductos] = useState(() => leerStorage("productos", PRODUCTOS_INICIALES));
  const [carrito, setCarrito] = useState(() => leerStorage("carrito", []));
  const [usuario, setUsuario] = useState(() => leerStorage("usuarioActivo", null));

  // useEffect: corre después de dibujar, cada vez que cambia lo que está en [ ].
  // Aquí lo usamos para guardar en localStorage cuando cambia un dato.
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario) localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    else localStorage.removeItem("usuarioActivo");
  }, [usuario]);

  // ----- Funciones del carrito -----
  function agregarAlCarrito(producto, cantidad = 1) {
    const existente = carrito.find(item => item.id === producto.id);
    const cantidadActual = existente ? existente.cantidad : 0;
    // No se puede superar el stock
    const cantidadFinal = Math.min(cantidadActual + cantidad, producto.stock);

    if (cantidadFinal === cantidadActual) {
      alert(`Ya tienes todas las unidades disponibles de "${producto.nombre}".`);
      return;
    }

    if (existente) {
      // map crea una lista nueva cambiando solo el producto que coincide
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: cantidadFinal } : item));
    } else {
      setCarrito([...carrito, {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        stock: producto.stock,
        cantidad: cantidadFinal
      }]);
    }
    alert(`"${producto.nombre}" fue añadido al carrito.`);
  }

  function cambiarCantidad(id, nuevaCantidad) {
    setCarrito(carrito.map(item => {
      if (item.id !== id) return item;
      const cantidad = Math.max(1, Math.min(nuevaCantidad, item.stock));
      return { ...item, cantidad };
    }));
  }

  function quitarDelCarrito(id) {
    setCarrito(carrito.filter(item => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <TopBar usuario={usuario} carrito={carrito} onSalir={() => setUsuario(null)} />
      <NavBar />

      {/* Routes: según la URL se muestra UNA de estas páginas */}
      <Routes>
        <Route path="/" element={<Home productos={productos} onComprar={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/catalogo" element={<Catalogo productos={productos} onComprar={agregarAlCarrito} />} />
        {/* :id es un parámetro: /producto/3 -> id = "3" */}
        <Route path="/producto/:id" element={<DetalleProducto productos={productos} onComprar={agregarAlCarrito} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login onLogin={setUsuario} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              usuario={usuario}
              onCambiarCantidad={cambiarCantidad}
              onQuitar={quitarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          }
        />
        <Route path="/admin" element={<AdminProductos usuario={usuario} productos={productos} onCambiarProductos={setProductos} />} />
      </Routes>

      <Footer />
    </>
  );
}
