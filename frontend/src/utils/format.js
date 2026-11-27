/** Formatea un número como precio en pesos chilenos. */
export function formatPrice(value) {
  const number = Number(value) || 0;
  return `$${number.toLocaleString('es-CL')}`;
}

/** Escapa texto para usarlo de forma segura dentro de HTML (fallback defensivo). */
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
