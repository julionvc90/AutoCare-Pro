import { useEffect, useMemo, useRef, useState } from 'react';
import { formatPrice } from '../utils/format';

const normalizar = (texto) =>
  String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

function resaltar(texto, consulta) {
  const limpio = consulta.trim();
  if (!limpio) return texto;

  const indice = texto.toLowerCase().indexOf(limpio.toLowerCase());
  if (indice === -1) return texto;

  return (
    <>
      {texto.slice(0, indice)}
      <mark>{texto.slice(indice, indice + limpio.length)}</mark>
      {texto.slice(indice + limpio.length)}
    </>
  );
}

export default function SearchBox({
  value,
  onChange,
  onSubmit,
  onSelect,
  products,
  categories,
  inputId = 'buscador',
  placeholder = 'Buscar productos...',
}) {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(-1);
  const temporizador = useRef(null);

  const sugerencias = useMemo(() => {
    const termino = normalizar(value);
    if (!termino) return [];

    return products
      .filter((producto) => {
        const texto = normalizar(`${producto.nombre} ${categories[producto.categoria] || ''}`);
        return texto.includes(termino);
      })
      .slice(0, 6);
  }, [value, products, categories]);

  useEffect(() => {
    setActivo(-1);
  }, [value]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const seleccionar = (producto) => {
    setAbierto(false);
    if (onSelect) onSelect(producto);
  };

  const manejarTecla = (evento) => {
    if (evento.key === 'Escape') {
      setAbierto(false);
      return;
    }
    if (!abierto || sugerencias.length === 0) return;

    if (evento.key === 'ArrowDown') {
      evento.preventDefault();
      setActivo((indice) => (indice + 1) % sugerencias.length);
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault();
      setActivo((indice) => (indice <= 0 ? sugerencias.length - 1 : indice - 1));
    } else if (evento.key === 'Enter' && activo >= 0) {
      evento.preventDefault();
      seleccionar(sugerencias[activo]);
    }
  };

  const enviar = (evento) => {
    evento.preventDefault();
    setAbierto(false);
    if (onSubmit) onSubmit(value);
  };

  const mostrarPanel = abierto && value.trim().length > 0;

  return (
    <div className="search-box">
      <form onSubmit={enviar} role="search">
        <div className="input-group">
          <label className="visually-hidden" htmlFor={inputId}>Buscar productos</label>
          <input
            id={inputId}
            type="search"
            className="form-control"
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            role="combobox"
            aria-expanded={mostrarPanel}
            aria-controls={`${inputId}-sugerencias`}
            aria-autocomplete="list"
            aria-activedescendant={activo >= 0 ? `${inputId}-opcion-${activo}` : undefined}
            onChange={(evento) => {
              onChange(evento.target.value);
              setAbierto(true);
            }}
            onFocus={() => setAbierto(true)}
            onBlur={() => {
              temporizador.current = setTimeout(() => setAbierto(false), 120);
            }}
            onKeyDown={manejarTecla}
          />
          <button className="btn btn-success" type="submit">Buscar</button>
        </div>
      </form>

      {mostrarPanel && (
        <div className="search-suggest" id={`${inputId}-sugerencias`}>
          {sugerencias.length === 0 ? (
            <p className="search-suggest-empty">Sin coincidencias para “{value.trim()}”.</p>
          ) : (
            <ul role="listbox" aria-label="Sugerencias de productos">
              {sugerencias.map((producto, indice) => (
                <li
                  key={producto.id}
                  role="option"
                  aria-selected={indice === activo}
                  id={`${inputId}-opcion-${indice}`}
                >
                  <button
                    type="button"
                    className={`search-suggest-item${indice === activo ? ' activo' : ''}`}
                    onMouseDown={(evento) => evento.preventDefault()}
                    onMouseEnter={() => setActivo(indice)}
                    onClick={() => seleccionar(producto)}
                  >
                    <span className="search-suggest-name">{resaltar(producto.nombre, value)}</span>
                    <span className="search-suggest-meta">
                      <span>{categories[producto.categoria]}</span>
                      <span>{formatPrice(producto.precio)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
