// Modal: ventana emergente reutilizable.
export default function Modal({ abierto, titulo, onCerrar, children, pie }) {
  if (!abierto) return null;

  return (
    <div
      className="modal fade show d-block"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onCerrar}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(evento) => evento.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
          </div>
          <div className="modal-body">{children}</div>
          {pie && <div className="modal-footer">{pie}</div>}
        </div>
      </div>
    </div>
  );
}
