// AuthContext: sesion, login, registro y usuarios.
import { createContext, useContext, useMemo, useState } from 'react';
import { SEED_USERS } from '../data/users';
import { readJSON, removeKey, writeJSON } from '../utils/storage';
import { MAX_INTENTOS, validarCorreo, validarPassword } from '../utils/validation';

const CLAVE_USUARIOS = 'usuariosRegistrados';
const CLAVE_ACTIVO = 'usuarioActivo';
const CLAVE_INTENTOS = 'intentosLogin';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJSON(CLAVE_ACTIVO, null));

  const [attempts, setAttempts] = useState(() => {
    try {
      return Number(localStorage.getItem(CLAVE_INTENTOS)) || 0;
    } catch (error) {
      return 0;
    }
  });

  const [registeredList, setRegisteredList] = useState(() => {
    const guardados = readJSON(CLAVE_USUARIOS, []);
    return Array.isArray(guardados) ? guardados : [];
  });

  const allUsers = useMemo(
    () => [
      ...SEED_USERS.map((u) => ({ ...u, base: true })),
      ...registeredList.map((u) => ({ ...u, base: false })),
    ],
    [registeredList],
  );

  const persistirRegistrados = (lista) => {
    setRegisteredList(lista);
    writeJSON(CLAVE_USUARIOS, lista);
  };

  const resetearIntentos = () => {
    setAttempts(0);
    removeKey(CLAVE_INTENTOS);
  };

  const findByEmail = (correo) =>
    allUsers.find((u) => u.correo.toLowerCase() === String(correo || '').trim().toLowerCase()) || null;

  const login = (correoCrudo, password) => {
    const correo = String(correoCrudo || '').trim();

    if (correo === '') return { ok: false, message: 'Debe ingresar su correo electrónico.' };
    if (!validarCorreo(correo)) {
      return { ok: false, message: 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.' };
    }
    if (!validarPassword(password)) {
      return { ok: false, message: 'La contraseña debe tener entre 4 y 10 caracteres.' };
    }
    if (attempts >= MAX_INTENTOS) {
      return { ok: false, message: 'Cuenta bloqueada temporalmente por superar los 5 intentos.' };
    }

    const usuario = findByEmail(correo);

    if (usuario && password === usuario.password) {
      resetearIntentos();
      const sesion = { nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
      setUser(sesion);
      writeJSON(CLAVE_ACTIVO, sesion);
      return {
        ok: true,
        message: `Inicio de sesión correcto. Bienvenido ${usuario.nombre}`,
        rol: usuario.rol,
      };
    }

    const siguientes = attempts + 1;
    setAttempts(siguientes);
    try {
      localStorage.setItem(CLAVE_INTENTOS, String(siguientes));
    } catch (error) {
      /* noop */
    }

    if (siguientes >= MAX_INTENTOS) {
      return { ok: false, message: 'Has superado los 5 intentos. La cuenta ha sido bloqueada.' };
    }
    return {
      ok: false,
      message: `Correo o contraseña incorrectos. Te quedan ${MAX_INTENTOS - siguientes} intento(s).`,
    };
  };

  const register = ({ nombre, correo, password }) => {
    const nombreLimpio = String(nombre || '').trim();
    const correoLimpio = String(correo || '').trim();

    if (nombreLimpio === '' || nombreLimpio.length > 100) {
      return { ok: false, message: 'El nombre es requerido (máximo 100 caracteres).' };
    }
    if (!validarCorreo(correoLimpio)) {
      return { ok: false, message: 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.' };
    }
    if (findByEmail(correoLimpio)) {
      return { ok: false, message: 'Ese correo ya está registrado.' };
    }
    if (!validarPassword(password)) {
      return { ok: false, message: 'La contraseña debe tener entre 4 y 10 caracteres.' };
    }

    const nuevo = { nombre: nombreLimpio, correo: correoLimpio, password, rol: 'CLIENTE' };
    persistirRegistrados([...registeredList, nuevo]);
    return { ok: true, message: 'Cuenta creada correctamente. Ya puedes iniciar sesión.' };
  };

  const logout = () => {
    setUser(null);
    removeKey(CLAVE_ACTIVO);
  };

  const createUser = (datos) => {
    const nuevo = { rol: 'CLIENTE', ...datos, base: false };
    persistirRegistrados([...registeredList, nuevo]);
    return nuevo;
  };

  const updateUser = (correoOriginal, datos) => {
    const lista = registeredList.map((u) =>
      u.correo.toLowerCase() === String(correoOriginal).toLowerCase() ? { ...u, ...datos } : u,
    );
    persistirRegistrados(lista);

    if (user && user.correo.toLowerCase() === String(correoOriginal).toLowerCase()) {
      const actualizado = { nombre: datos.nombre ?? user.nombre, correo: datos.correo ?? user.correo, rol: datos.rol ?? user.rol };
      setUser(actualizado);
      writeJSON(CLAVE_ACTIVO, actualizado);
    }
  };

  const deleteUser = (correo) => {
    persistirRegistrados(registeredList.filter((u) => u.correo.toLowerCase() !== String(correo).toLowerCase()));
  };

  const esPersonal = Boolean(user && (user.rol === 'ADMINISTRADOR' || user.rol === 'VENDEDOR'));
  const esAdmin = Boolean(user && user.rol === 'ADMINISTRADOR');

  const value = {
    user,
    attempts,
    allUsers,
    registeredList,
    esPersonal,
    esAdmin,
    login,
    register,
    logout,
    findByEmail,
    createUser,
    updateUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return contexto;
}
