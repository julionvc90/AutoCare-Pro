import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  CLAVE_CARRITO,
  CLAVE_CUPON,
  CLAVE_ORDENES,
  CUPONES,
  agregarItem,
  calcularResumen,
  cambiarCantidad,
  contarItems,
  crearOrden,
  eliminarItem,
  limiteProducto,
} from '../utils/cart';
import { readJSON, readString, removeKey, writeJSON, writeString } from '../utils/storage';
import { useProducts } from './ProductsContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { products } = useProducts();

  const [items, setItems] = useState(() => {
    const guardado = readJSON(CLAVE_CARRITO, []);
    return Array.isArray(guardado) ? guardado : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const codigo = readString(CLAVE_CUPON, null);
    return codigo && CUPONES[codigo] ? codigo : null;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    writeJSON(CLAVE_CARRITO, items);
  }, [items]);

  const limitFor = (nombre) => limiteProducto(nombre, products);

  const addProduct = (producto, cantidad = 1) => {
    const resultado = agregarItem(items, producto, cantidad, limitFor(producto.nombre));
    if (resultado.agregadas > 0) {
      setItems(resultado.carrito);
    }
    return resultado;
  };

  const updateQty = (nombre, cantidad) => {
    const resultado = cambiarCantidad(items, nombre, cantidad, limitFor(nombre));
    setItems(resultado.carrito);
    return resultado.cantidad;
  };

  const removeProduct = (nombre) => {
    setItems((previos) => eliminarItem(previos, nombre));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    removeKey(CLAVE_CUPON);
  };

  const applyCoupon = (codigoCrudo) => {
    const codigo = String(codigoCrudo || '').trim().toUpperCase();
    if (!codigo) return { ok: false, message: 'Ingresa un código de cupón.' };
    if (!CUPONES[codigo]) return { ok: false, message: 'El cupón no es válido.' };
    if (coupon === codigo) return { ok: false, message: 'Ese cupón ya está aplicado.' };

    setCoupon(codigo);
    writeString(CLAVE_CUPON, codigo);
    return { ok: true, message: `Cupón aplicado: ${CUPONES[codigo]}% de descuento.` };
  };

  const removeCoupon = () => {
    setCoupon(null);
    removeKey(CLAVE_CUPON);
  };

  const checkout = (usuario) => {
    if (!usuario) {
      return { ok: false, message: 'Debes iniciar sesión para pagar.' };
    }
    if (items.length === 0) {
      return { ok: false, message: 'El carrito está vacío.' };
    }

    const orden = crearOrden(items, usuario, coupon);
    const ordenesGuardadas = readJSON(CLAVE_ORDENES, []);
    const lista = Array.isArray(ordenesGuardadas) ? ordenesGuardadas : [];
    writeJSON(CLAVE_ORDENES, [...lista, orden]);

    const resumen = calcularResumen(items, coupon);
    setItems([]);
    setCoupon(null);
    removeKey(CLAVE_CUPON);

    return { ok: true, orden, total: resumen.total };
  };

  const summary = useMemo(() => calcularResumen(items, coupon), [items, coupon]);
  const count = useMemo(() => contarItems(items), [items]);

  const value = {
    items,
    coupon,
    summary,
    count,
    isOpen,
    lastMessage,
    setLastMessage,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((abierto) => !abierto),
    addProduct,
    updateQty,
    removeProduct,
    clearCart,
    applyCoupon,
    removeCoupon,
    checkout,
    limitFor,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const contexto = useContext(CartContext);
  if (!contexto) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return contexto;
}
