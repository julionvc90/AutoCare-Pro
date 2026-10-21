import {
  DOMINIOS_PERMITIDOS,
  errorComentarioContacto,
  errorTelefonoContacto,
  sugerirDominio,
  validarCorreo,
  validarPassword,
  validarRut,
} from './validation';

describe('validacion de RUT', () => {
  it('acepta un RUT con digito verificador correcto', () => {
    expect(validarRut('12.345.678-5')).toBeTrue();
  });

  it('rechaza un RUT con digito verificador incorrecto', () => {
    expect(validarRut('12.345.678-9')).toBeFalse();
  });

  it('rechaza un RUT con formato invalido', () => {
    expect(validarRut('abc')).toBeFalse();
  });
});

describe('validacion de correo', () => {
  it('acepta correos de los dominios permitidos', () => {
    DOMINIOS_PERMITIDOS.forEach((dominio) => {
      expect(validarCorreo(`cliente@${dominio}`)).toBeTrue();
    });
  });

  it('rechaza dominios no permitidos', () => {
    expect(validarCorreo('cliente@hotmail.com')).toBeFalse();
  });
});

describe('validacion de contrasena', () => {
  it('acepta entre 4 y 10 caracteres', () => {
    expect(validarPassword('Auto123')).toBeTrue();
    expect(validarPassword('1234')).toBeTrue();
  });

  it('rechaza menos de 4 o mas de 10 caracteres', () => {
    expect(validarPassword('123')).toBeFalse();
    expect(validarPassword('12345678901')).toBeFalse();
  });
});

describe('validaciones de contacto', () => {
  it('acepta un telefono con 8 a 12 digitos', () => {
    expect(errorTelefonoContacto('+56 9 1234 5678')).toBe('');
  });

  it('rechaza un telefono demasiado corto', () => {
    expect(errorTelefonoContacto('123')).not.toBe('');
  });

  it('exige el comentario', () => {
    expect(errorComentarioContacto('')).toBe('El comentario es requerido.');
  });

  it('sugiere el dominio permitido mas parecido', () => {
    expect(sugerirDominio('gmial.com')).toBe('gmail.com');
  });
});
