import { createContext, useContext, useMemo, useState } from 'react';
import { CATALOG, CATEGORIES, DEFAULT_IMAGE } from '../data/products';
import { readJSON, writeJSON } from '../utils/storage';

const CLAVE_PRODUCTOS = 'productosAdmin';
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const guardados = readJSON(CLAVE_PRODUCTOS, null);
    return Array.isArray(guardados) && guardados.length ? guardados : CATALOG;
  });

  const persistir = (siguientes) => {
    setProducts(siguientes);
    writeJSON(CLAVE_PRODUCTOS, siguientes);
  };

  const value = useMemo(() => {
    const getById = (id) => products.find((p) => p.id === Number(id)) || null;

    const addProduct = (datos) => {
      const nuevoId = products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
      const nuevo = { ...datos, id: nuevoId, imagen: datos.imagen || DEFAULT_IMAGE };
      persistir([...products, nuevo]);
      return nuevo;
    };

    const updateProduct = (id, datos) => {
      persistir(products.map((p) => (p.id === Number(id) ? { ...p, ...datos } : p)));
    };

    const deleteProduct = (id) => {
      persistir(products.filter((p) => p.id !== Number(id)));
    };

    return {
      products,
      categories: CATEGORIES,
      defaultImage: DEFAULT_IMAGE,
      getById,
      addProduct,
      updateProduct,
      deleteProduct,
    };
  }, [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const contexto = useContext(ProductsContext);
  if (!contexto) throw new Error('useProducts debe usarse dentro de <ProductsProvider>');
  return contexto;
}
