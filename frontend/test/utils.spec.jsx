import { formatPrice } from '../src/utils/format';
import { validarCorreo, validarPassword } from '../src/utils/validation';
import { agregarItem, calcularResumen, cambiarCantidad, contarItems, crearOrden, eliminarItem } from '../src/utils/cart';

describe('Funciones de la tienda', () => {
  it('1. formatea un precio en pesos chilenos', () => {
    expect(formatPrice(34990)).toBe('$34.990');
  });

  it('2. acepta solo correos de dominios permitidos', () => {
    expect(validarCorreo('cliente@duoc.cl')).toBeTrue();
    expect(validarCorreo('cliente@hotmail.com')).toBeFalse();
  });

  it('3. exige una contraseña de 4 a 10 caracteres', () => {
    expect(validarPassword('Auto123')).toBeTrue();
    expect(validarPassword('123')).toBeFalse();
  });

  it('4. calcula el total con un cupón de descuento', () => {
    const carrito = [{ nombre: 'Aceite', precio: 10000, cantidad: 2 }];
    const resumen = calcularResumen(carrito, 'AUTOCARE10');

    expect(resumen.subtotal).toBe(20000);
    expect(resumen.descuento).toBe(2000);
    expect(resumen.total).toBe(18000);
  });

  it('5. no agrega más unidades que el stock disponible', () => {
    const producto = { nombre: 'Aceite', precio: 10000, stock: 5 };
    const resultado = agregarItem([], producto, 8);

    expect(resultado.carrito[0].cantidad).toBe(5);
    expect(resultado.agregadas).toBe(5);
  });

  it('6. cuenta el total de unidades del carrito', () => {
    const carrito = [
      { nombre: 'A', precio: 100, cantidad: 2 },
      { nombre: 'B', precio: 200, cantidad: 3 },
    ];

    expect(contarItems(carrito)).toBe(5);
  });

  it('7. elimina un producto del carrito', () => {
    const carrito = [
      { nombre: 'Aceite', precio: 10000, cantidad: 1 },
      { nombre: 'Filtro', precio: 5000, cantidad: 2 },
    ];
    const resultado = eliminarItem(carrito, 'Aceite');

    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Filtro');
  });

  it('8. no permite una cantidad menor a 1', () => {
    const carrito = [{ nombre: 'Aceite', precio: 10000, cantidad: 2 }];
    const resultado = cambiarCantidad(carrito, 'Aceite', 0, 10);

    expect(resultado.cantidad).toBe(1);
  });

  it('9. ignora un cupón que no existe', () => {
    const carrito = [{ nombre: 'Aceite', precio: 10000, cantidad: 1 }];
    const resumen = calcularResumen(carrito, 'NOEXISTE');

    expect(resumen.descuento).toBe(0);
    expect(resumen.total).toBe(10000);
  });

  it('10. crea una orden con los datos del cliente y el total', () => {
    const carrito = [{ nombre: 'Aceite', precio: 10000, cantidad: 2 }];
    const cliente = { nombre: 'María González', correo: 'maria@duoc.cl', rut: '12.345.678-5' };
    const orden = crearOrden(carrito, cliente, 'AUTOCARE10', 'cliente');

    expect(orden.cliente).toBe('María González');
    expect(orden.total).toBe(18000);
    expect(orden.estado).toBe('Pendiente');
  });
});
