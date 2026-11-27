// AuthContext: sesion, login y usuarios, conectado a la API REST del backend.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, getToken, setToken } from '../api/client';
import { readJSON, writeJSON, removeKey } from '../utils/storage';

const CLAVE_ACTIVO = 'usuarioActivo';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // La sesion se lee de localStorage para persistir al recargar (IE3.3.2).
  // Solo se considera valida si ademas existe el token JWT.
  const [user, setUser] = useState(() => {
    const guardado = readJSON(CLAVE_ACTIVO, null);
    return guardado && getToken() ? guardado : null;
  });
  const [allUsers, setAllUsers] = useState([]);

  const esAdmin = Boolean(user && user.rol === 'ADMINISTRADOR');
  const esPersonal = Boolean(user && (user.rol === 'ADMINISTRADOR' || user.rol === 'VENDEDOR'));

  const listarUsuarios = useCallback(async () => {
    if (!esAdmin) return;
    try {
      const lista = await api.listarUsuarios();
      setAllUsers(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error('No se pudo cargar la lista de usuarios', error);
    }
  }, [esAdmin]);

  useEffect(() => {
    if (esAdmin) listarUsuarios();
  }, [esAdmin, listarUsuarios]);

  const login = async (correoCrudo, password) => {
    const correo = String(correoCrudo || '').trim();
    if (!correo || !password) {
      return { ok: false, message: 'Debe ingresar su correo y contraseña.' };
    }

    try {
      const respuesta = await api.login(correo, password);
      setToken(respuesta.token);
      const sesion = { nombre: respuesta.nombre, correo: respuesta.correo, rol: respuesta.rol };
      setUser(sesion);
      writeJSON(CLAVE_ACTIVO, sesion);
      return { ok: true, message: `Inicio de sesión correcto. Bienvenido ${respuesta.nombre}`, rol: respuesta.rol };
    } catch (error) {
      return { ok: false, message: error.message || 'Correo o contraseña incorrectos.' };
    }
  };

  const register = async (datos) => {
    try {
      await api.register(datos);
      return { ok: true, message: 'Cuenta creada correctamente. Ya puedes iniciar sesión.' };
    } catch (error) {
      return { ok: false, message: error.message || 'No se pudo crear la cuenta.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeKey(CLAVE_ACTIVO);
    setAllUsers([]);
  };

  const findByEmail = (correo) =>
    allUsers.find((u) => u.correo.toLowerCase() === String(correo || '').trim().toLowerCase()) || null;

  const createUser = async (datos) => {
    try {
      const nuevo = await api.crearUsuario(datos);
      await listarUsuarios();
      return nuevo;
    } catch (error) {
      console.error('Error al crear usuario', error);
      return null;
    }
  };

  const updateUser = async (correoOriginal, datos) => {
    try {
      const existente = findByEmail(correoOriginal);
      if (!existente) return null;
      await api.actualizarUsuario(existente.id, datos);
      await listarUsuarios();

      if (user && user.correo.toLowerCase() === String(correoOriginal).toLowerCase()) {
        const actualizado = {
          nombre: datos.nombre ?? user.nombre,
          correo: datos.correo ?? user.correo,
          rol: datos.rol ?? user.rol,
        };
        setUser(actualizado);
        writeJSON(CLAVE_ACTIVO, actualizado);
      }
      return existente;
    } catch (error) {
      console.error('Error al actualizar usuario', error);
      return null;
    }
  };

  const deleteUser = async (correo) => {
    try {
      const existente = findByEmail(correo);
      if (!existente) return;
      await api.eliminarUsuario(existente.id);
      await listarUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      allUsers,
      esPersonal,
      esAdmin,
      login,
      register,
      logout,
      findByEmail,
      createUser,
      updateUser,
      deleteUser,
      listarUsuarios,
    }),
    [user, allUsers, esPersonal, esAdmin, listarUsuarios],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return contexto;
}
