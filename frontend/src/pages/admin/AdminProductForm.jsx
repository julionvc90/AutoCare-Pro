import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';

const FALLBACK = '/IMG/Logo.png';
const MAX_IMAGEN = 300 * 1024;

export default function AdminProductForm() {
  const { id } = useParams();
  const { products, categories, getById, addProduct, updateProduct } = useProducts();
  const navigate = useNavigate();

  const existente = id ? getById(id) : null;

  const [form, setForm] = useState(() => ({
    codigo: existente?.codigo || '',
    nombre: existente?.nombre || '',
    descripcion: existente?.descripcion || '',
    precio: existente ? String(existente.precio) : '',
    stock: existente ? String(existente.stock) : '',
    stockCritico: existente?.stockCritico !== undefined && existente?.stockCritico !== null ? String(existente.stockCritico) : '',
    categoria: existente?.categoria || '',
    imagen: existente?.imagen || '',
  }));

  const [errores, setErrores] = useState({});

  if (id && !existente) {
    return (
      <section className="admin-card">
        <p>El producto solicitado no existe.</p>
        <Link className="btn btn-sm btn-outline-light" to="/admin/productos">Volver al listado</Link>
      </section>
    );
  }

  const cambiar = (campo, valor) => setForm((previo) => ({ ...previo, [campo]: valor }));

  const validar = () => {
    const nuevos = {};

    if (!form.codigo.trim()) nuevos.codigo = 'El código es obligatorio.';
    else if (form.codigo.trim().length < 3) nuevos.codigo = 'El código debe tener al menos 3 caracteres.';
    else {
      const repetido = products.some(
        (p) =>
          (p.codigo || `PRD${String(p.id).padStart(3, '0')}`).toLowerCase() === form.codigo.trim().toLowerCase() &&
          (!existente || p.id !== existente.id),
      );
      if (repetido) nuevos.codigo = 'Ese código ya existe.';
    }

    if (!form.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.';
    else if (form.nombre.trim().length > 100) nuevos.nombre = 'El nombre no puede superar 100 caracteres.';

    if (form.descripcion.length > 500) nuevos.descripcion = 'La descripción no puede superar 500 caracteres.';

    if (form.precio === '' || Number.isNaN(Number(form.precio)) || Number(form.precio) < 0) {
      nuevos.precio = 'Ingresa un precio numérico mayor o igual a 0.';
    }

    if (form.stock === '' || !/^\d+$/.test(form.stock.trim())) {
      nuevos.stock = 'Ingresa un stock entero mayor o igual a 0.';
    }

    if (form.stockCritico !== '' && !/^\d+$/.test(form.stockCritico.trim())) {
      nuevos.stockCritico = 'El stock crítico debe ser un entero mayor o igual a 0.';
    }

    if (!form.categoria) nuevos.categoria = 'Selecciona una categoría.';

    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const seleccionarImagen = (evento) => {
    const archivo = evento.target.files && evento.target.files[0];
    if (!archivo) return;
    if (!archivo.type.startsWith('image/') || archivo.size > MAX_IMAGEN) {
      setErrores((previos) => ({ ...previos, imagen: 'La imagen debe ser de tipo imagen y pesar menos de 300 KB.' }));
      return;
    }

    const lector = new FileReader();
    lector.onload = () => {
      cambiar('imagen', String(lector.result));
      setErrores((previos) => ({ ...previos, imagen: undefined }));
    };
    lector.readAsDataURL(archivo);
  };

  const enviar = (evento) => {
    evento.preventDefault();
    if (!validar()) return;

    const datos = {
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: form.stockCritico === '' ? '' : Number(form.stockCritico),
      categoria: form.categoria,
      imagen: form.imagen,
    };

    if (existente) {
      updateProduct(existente.id, datos);
    } else {
      addProduct({ ...datos, imagen: datos.imagen || FALLBACK });
    }

    navigate('/admin/productos');
  };

  const alertaStock =
    /^\d+$/.test(form.stock.trim()) &&
    /^\d+$/.test(form.stockCritico.trim()) &&
    Number(form.stock) <= Number(form.stockCritico);

  return (
    <section className="admin-card" style={{ maxWidth: 760 }}>
      <h2 className="h5 mb-3">{existente ? 'Editar producto' : 'Nuevo producto'}</h2>
      <form id="formProducto" noValidate onSubmit={enviar}>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Código*</label>
          <input
            id="codigo"
            name="codigo"
            type="text"
            className={`form-control${errores.codigo ? ' is-invalid' : ''}`}
            value={form.codigo}
            onChange={(evento) => cambiar('codigo', evento.target.value)}
          />
          {errores.codigo && <div className="invalid-feedback d-block">{errores.codigo}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre*</label>
          <input
            id="nombre"
            type="text"
            className={`form-control${errores.nombre ? ' is-invalid' : ''}`}
            maxLength={150}
            value={form.nombre}
            onChange={(evento) => cambiar('nombre', evento.target.value)}
          />
          {errores.nombre && <div className="invalid-feedback d-block">{errores.nombre}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            className={`form-control${errores.descripcion ? ' is-invalid' : ''}`}
            rows={4}
            maxLength={500}
            value={form.descripcion}
            onChange={(evento) => cambiar('descripcion', evento.target.value)}
          />
          <small className="contador">{form.descripcion.length}/500</small>
          {errores.descripcion && <div className="invalid-feedback d-block">{errores.descripcion}</div>}
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label htmlFor="precio" className="form-label">Precio*</label>
            <input
              id="precio"
              type="number"
              min={0}
              step="any"
              className={`form-control${errores.precio ? ' is-invalid' : ''}`}
              value={form.precio}
              onChange={(evento) => cambiar('precio', evento.target.value)}
            />
            {errores.precio && <div className="invalid-feedback d-block">{errores.precio}</div>}
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="stock" className="form-label">Stock*</label>
            <input
              id="stock"
              type="number"
              min={0}
              step={1}
              className={`form-control${errores.stock ? ' is-invalid' : ''}`}
              value={form.stock}
              onChange={(evento) => cambiar('stock', evento.target.value)}
            />
            {errores.stock && <div className="invalid-feedback d-block">{errores.stock}</div>}
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="stockCritico" className="form-label">Stock crítico</label>
            <input
              id="stockCritico"
              type="number"
              min={0}
              step={1}
              className={`form-control${errores.stockCritico ? ' is-invalid' : ''}`}
              value={form.stockCritico}
              onChange={(evento) => cambiar('stockCritico', evento.target.value)}
            />
            {errores.stockCritico && <div className="invalid-feedback d-block">{errores.stockCritico}</div>}
          </div>
        </div>

        {alertaStock && (
          <div id="alertaStock" className="alert alert-warning mt-3 mb-0">
            El stock actual está en o bajo el nivel crítico.
          </div>
        )}

        <div className="mb-3 mt-3">
          <label htmlFor="categoria" className="form-label">Categoría*</label>
          <select
            id="categoria"
            className={`form-select${errores.categoria ? ' is-invalid' : ''}`}
            value={form.categoria}
            onChange={(evento) => cambiar('categoria', evento.target.value)}
          >
            <option value="">— Selecciona —</option>
            {Object.entries(categories).map(([clave, etiqueta]) => (
              <option key={clave} value={clave}>{etiqueta}</option>
            ))}
          </select>
          {errores.categoria && <div className="invalid-feedback d-block">{errores.categoria}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen (máx. 300 KB)</label>
          <input id="imagen" type="file" accept="image/*" className="form-control" onChange={seleccionarImagen} />
          {errores.imagen && <div className="text-danger small mt-1">{errores.imagen}</div>}
          {form.imagen && (
            <img
              id="vistaPrevia"
              className="vista-previa d-block"
              src={form.imagen}
              alt="Vista previa"
              onError={(evento) => {
                evento.currentTarget.onerror = null;
                evento.currentTarget.src = FALLBACK;
              }}
            />
          )}
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">Guardar</button>
          <Link className="btn btn-outline-light" to="/admin/productos">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
