// ProductsContext: catalogo compartido, cargado desde la API REST del backend.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CATEGORIES, DEFAULT_IMAGE } from '../data/products';
import { api } from '../api/client';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    setCargando(true);
    try {
      const lista = await api.listarProductos();
      setProducts(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error('No se pudo cargar el catálogo desde el backend', error);
      setProducts([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const getById = (id) => products.find((p) => Number(p.id) === Number(id)) || null;

  const addProduct = async (datos) => {
    try {
      const nuevo = await api.crearProducto(datos);
      await cargar();
      return nuevo;
    } catch (error) {
      console.error('Error al crear producto', error);
      return null;
    }
  };

  const updateProduct = async (id, datos) => {
    try {
      await api.actualizarProducto(id, datos);
      await cargar();
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.eliminarProducto(id);
      await cargar();
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  const value = useMemo(
    () => ({
      products,
      cargando,
      categories: CATEGORIES,
      defaultImage: DEFAULT_IMAGE,
      getById,
      addProduct,
      updateProduct,
      deleteProduct,
      recargar: cargar,
    }),
    [products, cargando],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const contexto = useContext(ProductsContext);
  if (!contexto) throw new Error('useProducts debe usarse dentro de <ProductsProvider>');
  return contexto;
}
