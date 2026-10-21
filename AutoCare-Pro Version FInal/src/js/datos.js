
const productosIniciales = [
  { 
    id: 1, 
    nombre: "Aceite Sintético 5W-30", 
    precio: 35000, 
    categoria: "Lubricantes", 
    enOferta: true, 
    descuento: 10, 
    imagen: "https://via.placeholder.com/300" 
  },
  { 
    id: 2, 
    nombre: "Líquido de Frenos DOT 4", 
    precio: 12000, 
    categoria: "Fluidos", 
    enOferta: false, 
    descuento: 0, 
    imagen: "https://via.placeholder.com/300" 
  },
  { 
    id: 3, 
    nombre: "Plumillas Limpiaparabrisas", 
    precio: 15000, 
    categoria: "Accesorios", 
    enOferta: true, 
    descuento: 15, 
    imagen: "https://via.placeholder.com/300" 
  },
  { 
    id: 4, 
    nombre: "Filtro de Aire Deportivo", 
    precio: 28000, 
    categoria: "Repuestos", 
    enOferta: false, 
    descuento: 0, 
    imagen: "https://via.placeholder.com/300" 
  }
];

//READ 
export const obtenerProductos = () => {
  const productosGuardados = localStorage.getItem('productos');
  if (!productosGuardados) {
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  return JSON.parse(productosGuardados);
};

// CREATEs
export const agregarProducto = (nuevoProducto) => {
  const productos = obtenerProductos();
  const productoConId = { ...nuevoProducto, id: Date.now() };
  productos.push(productoConId);
  localStorage.setItem('productos', JSON.stringify(productos));
  return productos;
};

// UPDATEa
export const actualizarProducto = (id, productoActualizado) => {
  let productos = obtenerProductos();
  productos = productos.map(p => p.id === id ? { ...p, ...productoActualizado } : p);
  localStorage.setItem('productos', JSON.stringify(productos));
  return productos;
};

// DELETE
export const eliminarProducto = (id) => {
  let productos = obtenerProductos();
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));
  return productos;
};