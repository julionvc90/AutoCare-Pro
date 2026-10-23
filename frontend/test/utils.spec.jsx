import { formatPrice } from '../src/utils/format';
import { validarCorreo, validarPassword } from '../src/utils/validation';
import { agregarItem, calcularResumen, contarItems } from '../src/utils/cart';

describe('Funciones de la tienda', () => {
  it('1. formatea un precio en pesos chilenos', () => {
    expect(formatPrice(34990)).toBe('$34990');
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
    const producto = { nombre: 'Aceite', precio: 10000, stock: 5};
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
});
