import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formatea un precio en pesos chilenos', () => {
    expect(formatPrice(34990)).toBe('$34.990');
  });

  it('devuelve $0 cuando el valor no es numérico', () => {
    expect(formatPrice('abc')).toBe('$0');
    expect(formatPrice(null)).toBe('$0');
  });

  it('agrega separador de miles en montos grandes', () => {
    expect(formatPrice(1234567)).toBe('$1.234.567');
  });
});
