import { agregarItem, calcularResumen, cambiarCantidad, contarItems, eliminarItem } from './cart';

const producto = { nombre: 'Aceite Test', precio: 10000, stock: 20 };

describe('calcularResumen del carrito', () => {
  it('calcula subtotal, descuento y total con cupon', () => {
    const carrito = [
      { nombre: 'A', precio: 10000, cantidad: 1 },
      { nombre: 'B', precio: 5000, cantidad: 2 },
    ];
    const resumen = calcularResumen(carrito, 'AUTOCARE10');

    expect(resumen.subtotal).toBe(20000);
    expect(resumen.porcentaje).toBe(10);
    expect(resumen.descuento).toBe(2000);
    expect(resumen.total).toBe(18000);
  });

  it('ignora un cupon inexistente', () => {
    const resumen = calcularResumen([{ nombre: 'A', precio: 1000, cantidad: 1 }], 'NOEXISTE');
    expect(resumen.descuento).toBe(0);
    expect(resumen.total).toBe(1000);
  });
});

describe('agregarItem respeta el stock', () => {
  it('agrega unidades nuevas al carrito', () => {
    const resultado = agregarItem([], producto, 3);
    expect(resultado.agregadas).toBe(3);
    expect(resultado.carrito[0].cantidad).toBe(3);
  });

  it('no supera el limite de stock del producto', () => {
    const resultado = agregarItem([{ nombre: producto.nombre, precio: producto.precio, cantidad: 19 }], producto, 5);
    expect(resultado.carrito[0].cantidad).toBe(20);
    expect(resultado.agregadas).toBe(1);
  });

  it('no agrega nada cuando ya se alcanzo el limite', () => {
    const resultado = agregarItem([{ nombre: producto.nombre, precio: producto.precio, cantidad: 20 }], producto, 1);
    expect(resultado.agregadas).toBe(0);
  });
});

describe('cambiarCantidad', () => {
  it('mantiene un minimo de 1 unidad', () => {
    const carrito = [{ nombre: 'A', precio: 100, cantidad: 2 }];
    const resultado = cambiarCantidad(carrito, 'A', 0, 10);
    expect(resultado.cantidad).toBe(1);
  });

  it('no supera el limite indicado', () => {
    const carrito = [{ nombre: 'A', precio: 100, cantidad: 2 }];
    const resultado = cambiarCantidad(carrito, 'A', 99, 10);
    expect(resultado.cantidad).toBe(10);
  });
});

describe('eliminarItem y contarItems', () => {
  it('elimina la linea por nombre', () => {
    const carrito = [
      { nombre: 'A', precio: 100, cantidad: 1 },
      { nombre: 'B', precio: 200, cantidad: 2 },
    ];
    expect(eliminarItem(carrito, 'A')).toEqual([{ nombre: 'B', precio: 200, cantidad: 2 }]);
  });

  it('suma las cantidades de todas las lineas', () => {
    const carrito = [
      { nombre: 'A', precio: 100, cantidad: 2 },
      { nombre: 'B', precio: 200, cantidad: 3 },
    ];
    expect(contarItems(carrito)).toBe(5);
  });
});
