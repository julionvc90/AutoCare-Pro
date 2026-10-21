export default function PageHeader({ icono, titulo, subtitulo, children }) {
  return (
    <header className="page-header container">
      <div className="page-header-content">
        {icono && (
          <span className="page-header-icon">
            <i className={`fa-solid ${icono}`} aria-hidden="true" />
          </span>
        )}
        <h1 className="titulo-seccion">{titulo}</h1>
        {subtitulo && <p className="page-header-subtitle">{subtitulo}</p>}
        {children}
      </div>
    </header>
  );
}
