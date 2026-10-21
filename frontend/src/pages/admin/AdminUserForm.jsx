import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { REGIONES } from '../../data/regions';
import { validarCorreo, validarPassword, validarRut } from '../../utils/validation';

const VACIO = {
  rut: '',
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  confirmarPassword: '',
  telefono: '',
  fechaNacimiento: '',
  tipoUsuario: 'CLIENTE',
  region: '',
  comuna: '',
  direccion: '',
};

export default function AdminUserForm() {
  const { correo } = useParams();
  const correoOriginal = correo ? decodeURIComponent(correo) : '';
  const { allUsers, findByEmail, createUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const existente = correoOriginal
    ? allUsers.find((u) => u.correo.toLowerCase() === correoOriginal.toLowerCase())
    : null;

  const [form, setForm] = useState(() =>
    existente
      ? {
          ...VACIO,
          rut: existente.rut || '',
          nombre: existente.nombre || '',
          apellidos: existente.apellidos || '',
          correo: existente.correo || '',
          telefono: existente.telefono || existente.celular || '',
          fechaNacimiento: existente.fechaNacimiento || '',
          tipoUsuario: existente.rol || 'CLIENTE',
          region: existente.region || '',
          comuna: existente.comuna || '',
          direccion: existente.direccion || '',
        }
      : VACIO,
  );

  const [errores, setErrores] = useState({});

  if (correoOriginal && (!existente || existente.base)) {
    return (
      <section className="admin-card">
        <p>No se puede editar esa cuenta.</p>
        <Link className="btn btn-sm btn-outline-light" to="/admin/usuarios">Volver al listado</Link>
      </section>
    );
  }

  const cambiar = (campo, valor) => setForm((previo) => ({ ...previo, [campo]: valor }));

  const comunasDisponibles = REGIONES.find((region) => region.nombre === form.region)?.comunas || [];

  const validar = () => {
    const nuevos = {};
    const rutLimpio = form.rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

    if (!rutLimpio) nuevos.rut = 'El RUN es obligatorio.';
    else if (!/^[0-9]+[0-9K]$/.test(rutLimpio) || rutLimpio.length < 7 || rutLimpio.length > 9) {
      nuevos.rut = 'Formato de RUN inválido (7 a 9 caracteres, sin puntos ni guion).';
    } else if (!validarRut(rutLimpio)) {
      nuevos.rut = 'El dígito verificador del RUN no es correcto.';
    }

    if (!form.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.';
    else if (form.nombre.trim().length > 50) nuevos.nombre = 'El nombre no puede superar 50 caracteres.';

    if (!form.apellidos.trim()) nuevos.apellidos = 'Los apellidos son obligatorios.';
    else if (form.apellidos.trim().length > 100) nuevos.apellidos = 'Los apellidos no pueden superar 100 caracteres.';

    if (!form.correo.trim()) nuevos.correo = 'El correo es obligatorio.';
    else if (!validarCorreo(form.correo.trim())) {
      nuevos.correo = 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    } else {
      const repetido = findByEmail(form.correo.trim());
      if (repetido && (!existente || repetido.correo.toLowerCase() !== existente.correo.toLowerCase())) {
        nuevos.correo = 'Ese correo ya está registrado.';
      }
    }

    if (!existente && !form.password) {
      nuevos.password = 'La contraseña es obligatoria al crear un usuario.';
    } else if (form.password && !validarPassword(form.password)) {
      nuevos.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    if (form.password !== form.confirmarPassword) {
      nuevos.confirmarPassword = 'Las contraseñas no coinciden.';
    }

    if (form.telefono && !/^\+?\d{8,11}$/.test(form.telefono)) {
      nuevos.telefono = 'Ingresa un teléfono válido (8 a 11 dígitos).';
    }

    if (form.fechaNacimiento) {
      const fecha = new Date(form.fechaNacimiento);
      if (Number.isNaN(fecha.getTime()) || fecha > new Date() || fecha.getFullYear() < 1900) {
        nuevos.fechaNacimiento = 'Ingresa una fecha de nacimiento válida.';
      }
    }

    if (!form.tipoUsuario) nuevos.tipoUsuario = 'Selecciona un tipo de usuario.';
    if (!form.region) nuevos.region = 'Selecciona una región.';
    if (!form.comuna) nuevos.comuna = 'Selecciona una comuna.';
    if (!form.direccion.trim()) nuevos.direccion = 'La dirección es obligatoria.';
    else if (form.direccion.trim().length > 300) nuevos.direccion = 'La dirección no puede superar 300 caracteres.';

    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const enviar = (evento) => {
    evento.preventDefault();
    if (!validar()) return;

    const datos = {
      rut: form.rut.replace(/\./g, '').replace(/-/g, '').toUpperCase(),
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
      fechaNacimiento: form.fechaNacimiento,
      rol: form.tipoUsuario,
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion.trim(),
    };

    if (form.password) datos.password = form.password;

    if (existente) {
      updateUser(correoOriginal, datos);
    } else {
      createUser({ ...datos, password: form.password });
    }

    navigate('/admin/usuarios');
  };

  const campoError = (clave) => errores[clave] && <div className="invalid-feedback d-block">{errores[clave]}</div>;

  return (
    <section className="admin-card" style={{ maxWidth: 860 }}>
      <h2 className="h5 mb-3">{existente ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <form id="formUsuario" noValidate onSubmit={enviar}>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label htmlFor="run" className="form-label">RUN*</label>
            <input id="run" type="text" maxLength={12} className={`form-control${errores.rut ? ' is-invalid' : ''}`} value={form.rut} onChange={(evento) => cambiar('rut', evento.target.value)} />
            {campoError('rut')}
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="tipoUsuario" className="form-label">Tipo de usuario*</label>
            <select id="tipoUsuario" className={`form-select${errores.tipoUsuario ? ' is-invalid' : ''}`} value={form.tipoUsuario} onChange={(evento) => cambiar('tipoUsuario', evento.target.value)}>
              <option value="">— Selecciona —</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="VENDEDOR">Vendedor</option>
              <option value="CLIENTE">Cliente</option>
            </select>
            {campoError('tipoUsuario')}
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
            <input id="fechaNacimiento" type="date" className={`form-control${errores.fechaNacimiento ? ' is-invalid' : ''}`} value={form.fechaNacimiento} onChange={(evento) => cambiar('fechaNacimiento', evento.target.value)} />
            {campoError('fechaNacimiento')}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre*</label>
            <input id="nombre" type="text" maxLength={80} className={`form-control${errores.nombre ? ' is-invalid' : ''}`} value={form.nombre} onChange={(evento) => cambiar('nombre', evento.target.value)} />
            {campoError('nombre')}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="apellidos" className="form-label">Apellidos*</label>
            <input id="apellidos" type="text" maxLength={150} className={`form-control${errores.apellidos ? ' is-invalid' : ''}`} value={form.apellidos} onChange={(evento) => cambiar('apellidos', evento.target.value)} />
            {campoError('apellidos')}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="correo" className="form-label">Correo*</label>
            <input id="correo" type="email" maxLength={120} className={`form-control${errores.correo ? ' is-invalid' : ''}`} value={form.correo} onChange={(evento) => cambiar('correo', evento.target.value)} />
            {campoError('correo')}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input id="telefono" type="tel" maxLength={14} className={`form-control${errores.telefono ? ' is-invalid' : ''}`} value={form.telefono} onChange={(evento) => cambiar('telefono', evento.target.value)} />
            {campoError('telefono')}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input id="password" type="password" maxLength={20} className={`form-control${errores.password ? ' is-invalid' : ''}`} value={form.password} onChange={(evento) => cambiar('password', evento.target.value)} />
            {existente && <small className="form-text">Déjala en blanco para mantener la contraseña actual.</small>}
            {campoError('password')}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="confirmarPassword" className="form-label">Confirmar contraseña</label>
            <input id="confirmarPassword" type="password" maxLength={20} className={`form-control${errores.confirmarPassword ? ' is-invalid' : ''}`} value={form.confirmarPassword} onChange={(evento) => cambiar('confirmarPassword', evento.target.value)} />
            {campoError('confirmarPassword')}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="region" className="form-label">Región*</label>
            <select
              id="region"
              className={`form-select${errores.region ? ' is-invalid' : ''}`}
              value={form.region}
              onChange={(evento) => {
                cambiar('region', evento.target.value);
                cambiar('comuna', '');
              }}
            >
              <option value="">— Seleccione la región —</option>
              {REGIONES.map((region) => (
                <option key={region.nombre} value={region.nombre}>{region.nombre}</option>
              ))}
            </select>
            {campoError('region')}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="comuna" className="form-label">Comuna*</label>
            <select id="comuna" className={`form-select${errores.comuna ? ' is-invalid' : ''}`} value={form.comuna} disabled={!form.region} onChange={(evento) => cambiar('comuna', evento.target.value)}>
              <option value="">— Seleccione la comuna —</option>
              {comunasDisponibles.map((comuna) => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
            {campoError('comuna')}
          </div>

          <div className="col-12">
            <label htmlFor="direccion" className="form-label">Dirección*</label>
            <textarea id="direccion" rows={2} maxLength={300} className={`form-control${errores.direccion ? ' is-invalid' : ''}`} value={form.direccion} onChange={(evento) => cambiar('direccion', evento.target.value)} />
            <small className="contador">{form.direccion.length}/300</small>
            {campoError('direccion')}
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-success">Guardar</button>
          <Link className="btn btn-outline-light" to="/admin/usuarios">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
