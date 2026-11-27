// PageHeader: encabezado reutilizable para paginas internas.
export default function PageHeader({ titulo, subtitulo, children }) {
  return (
    <header className="page-header container">
      <div className="page-header-content">
        <h1 className="titulo-seccion">{titulo}</h1>
        {subtitulo && <p className="page-header-subtitle">{subtitulo}</p>}
        {children}
      </div>
    </header>
  );
}
