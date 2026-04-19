/* ══════════════════════════════════════════════════════
   detalle.styles.js
   Estilos inline centralizados de DetalleVehiculoPage.
   Separado del JSX para mantener el componente limpio.
   Paleta: azul institucional #1a4b8c / fondo #f8f9fa
   ══════════════════════════════════════════════════════ */

export const st = {

  /* ── Página ── */
  page: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: '#f8f9fa',
    minHeight: '100vh',
  },

  /* ── Toast de notificación (RF11.16) ── */
  toast: {
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 9999,
    color: '#fff',
    padding: '14px 20px',
    borderRadius: 10,
    boxShadow: '0 4px 20px rgba(0,0,0,.25)',
    fontSize: 14,
    maxWidth: 340,
    lineHeight: 1.4,
    animation: 'rm-slideDown .3s ease',
  },

  /* ── Navbar ── */
  nav: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    height: 56,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    gap: 20,
  },
  navBrand: {
    fontWeight: 800,
    fontSize: 16,
    color: '#1a4b8c',
    letterSpacing: 0.5,
  },
  navBack: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: 14,
    padding: 0,
  },

  /* ── Barra de pasos ── */
  stepBar: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '12px 24px',
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  stepItem:   { display: 'flex', alignItems: 'center', gap: 8 },
  stepCircle: {
    width: 24, height: 24,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700,
  },
  stepLabel:  { fontSize: 13 },
  stepSep:    { color: '#d1d5db', margin: '0 4px' },

  /* ── Layout principal (2 cols desktop) ── */
  layout: {
    maxWidth: 1200,
    margin: '32px auto',
    padding: '0 16px',
    alignItems: 'start',
    /* display y gridTemplateColumns se aplican via className rm-layout (responsive) */
  },

  /* ── Galería ── */
  imgWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    background: '#e5e7eb',
    aspectRatio: '16/9',
    position: 'relative',
  },
  imgMain:   { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  badge: {
    position: 'absolute', top: 14, right: 14,
    color: '#fff', padding: '4px 12px',
    borderRadius: 20, fontSize: 12, fontWeight: 600,
  },
  thumbGrid: { display: 'grid', gap: 10, marginTop: 12 },
  thumb: {
    borderRadius: 10, overflow: 'hidden',
    cursor: 'pointer', padding: 0, aspectRatio: '4/3',
  },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },

  /* ── Textos del vehículo ── */
  h1: { fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 },
  catLabel: { color: '#1a4b8c', fontWeight: 600, marginTop: 4, fontSize: 14 },
  desc: { color: '#6b7280', marginTop: 8, lineHeight: 1.6, fontSize: 14 },

  /* ── Ficha técnica ── */
  ficha: {
    display: 'grid', gap: 12, marginTop: 18,
    background: '#f9fafb', borderRadius: 12,
    padding: 16, border: '1px solid #e5e7eb',
  },
  fichaLbl: { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1 },
  fichaVal: { fontSize: 14, fontWeight: 600, color: '#111827', marginTop: 3 },

  /* ── Sección de configuración ── */
  seccion: { marginTop: 28 },
  seccionTitulo: { fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 12 },

  /* ── Tarjetas de opción (km, seguro, servicios) ── */
  kmGrid:  { display: 'grid', gap: 12 },
  opCard: {
    padding: '14px 16px', borderRadius: 12,
    textAlign: 'left', cursor: 'pointer', width: '100%',
  },
  opSub: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  segCard: {
    padding: '14px 16px', borderRadius: 12, textAlign: 'left',
    cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10, width: '100%',
  },
  servGrid: { display: 'grid', gap: 10 },
  servCard: {
    padding: '12px 14px', borderRadius: 12, textAlign: 'left',
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    gap: 10, width: '100%',
  },

  /* ── Panel derecho (formulario de reserva) ── */
  panelWrap:  { position: 'sticky', top: 72 },
  panel: {
    background: '#fff', borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,.1)', border: '1px solid #e5e7eb',
  },
  panelHead:  { background: '#1a4b8c', padding: '20px 24px' },
  panelBody:  { padding: 24, display: 'flex', flexDirection: 'column', gap: 16 },

  /* ── Inputs del formulario ── */
  input: {
    width: '100%', padding: '12px 14px',
    border: '1px solid #d1d5db', borderRadius: 10,
    fontSize: 14, color: '#111827',
    boxSizing: 'border-box', background: '#fff', outline: 'none',
  },
  campoWrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  campoLabel: { fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: 1 },
  errMsg: { color: '#dc2626', fontSize: 12, margin: '2px 0 0' },

  /* ── Disponibilidad (RF11.4) ── */
  alertaDisp: { padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500 },

  /* ── Calendario de disponibilidad (RF11.3) ── */
  btnCalendario: {
    background: 'none', border: '1px solid #1a4b8c', color: '#1a4b8c',
    borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
    fontSize: 13, fontWeight: 600, width: '100%',
  },
  calendarioBox: {
    background: '#f9fafb', borderRadius: 10, padding: 14,
    border: '1px solid #e5e7eb', fontSize: 13,
  },
  fechaBloq: {
    background: '#fecaca', color: '#991b1b',
    padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 500,
  },

  /* ── Desglose de costos (RF11.12) ── */
  desglose:  { borderTop: '1px solid #e5e7eb', paddingTop: 14 },
  filaCosto: {
    display: 'flex', justifyContent: 'space-between',
    padding: '5px 0', fontSize: 14, color: '#374151',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    marginTop: 10, paddingTop: 10, borderTop: '1px solid #e5e7eb',
  },
  totalLbl: { fontWeight: 800, fontSize: 15, color: '#111827' },
  totalVal: { fontWeight: 800, fontSize: 20, color: '#1a4b8c' },

  /* ── Botones ── */
  btnPrimary: {
    background: '#1a4b8c', color: '#fff', border: 'none',
    borderRadius: 30, padding: '15px 24px', fontWeight: 700,
    fontSize: 14, cursor: 'pointer', letterSpacing: 0.5, width: '100%',
  },
  btnSecondary: {
    background: '#fff', color: '#1a4b8c', border: '2px solid #1a4b8c',
    borderRadius: 30, padding: '13px 24px', fontWeight: 700,
    fontSize: 14, cursor: 'pointer', flex: 1,
  },
  noCharge: { textAlign: 'center', fontSize: 12, color: '#9ca3af', margin: 0 },

  /* ── Calificación ── */
  rating: {
    marginTop: 14, background: '#fff', borderRadius: 12,
    padding: '12px 16px', border: '1px solid #e5e7eb',
    display: 'flex', alignItems: 'center', gap: 10,
  },

  /* ── Paso 2: Resumen de reserva ── */
  resumenWrap: { maxWidth: 680, margin: '32px auto', padding: '0 16px' },
  resumenCard: {
    background: '#fff', borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,.08)',
  },
  grupoResumen: { borderBottom: '1px solid #f3f4f6', paddingBottom: 18 },
  grupoTitulo:  { fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 12 },
  filaRes: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14 },
  filaResLbl: { color: '#6b7280' },
  filaResVal: { color: '#111827', fontWeight: 600, textAlign: 'right', maxWidth: '60%' },
  botonesResumen: { display: 'flex', gap: 12 },

  /* ── Paso 3: Confirmación ── */
  confirmWrap: {
    maxWidth: 540, margin: '64px auto',
    padding: '0 16px', textAlign: 'center',
  },
  confirmCard: {
    background: '#fff', borderRadius: 20,
    padding: '44px 36px', boxShadow: '0 8px 40px rgba(0,0,0,.1)',
  },
  confirmIcon: {
    width: 76, height: 76, borderRadius: '50%',
    background: '#dcfce7', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 20px', fontSize: 38,
  },
  nroReserva: {
    background: '#f0fdf4', border: '1px solid #86efac',
    borderRadius: 12, padding: '14px 22px', marginBottom: 24,
  },
}

/* ── CSS global responsivo (se inyecta con <style>) ── */
export const CSS_RESPONSIVO = `
  @keyframes rm-slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Layout: 2 columnas desktop → 1 en tablet/móvil */
  .rm-layout {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 370px !important;
    gap: 32px !important;
  }
  @media (max-width: 900px) {
    .rm-layout { grid-template-columns: 1fr !important; }
    .rm-panel  { position: static !important; }
  }

  /* Galería: 4 cols → 2 en móvil */
  .rm-thumbs { grid-template-columns: repeat(4, 1fr) !important; }
  @media (max-width: 600px) {
    .rm-thumbs { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* Ficha técnica: 4 cols → 2 en móvil */
  .rm-ficha { grid-template-columns: repeat(4, 1fr) !important; }
  @media (max-width: 600px) {
    .rm-ficha { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* Km y servicios: 2 cols → 1 en móvil */
  .rm-km, .rm-serv { grid-template-columns: 1fr 1fr !important; }
  @media (max-width: 480px) {
    .rm-km, .rm-serv { grid-template-columns: 1fr !important; }
  }

  /* Botones del resumen: fila → columna en móvil */
  .rm-btns { flex-direction: row !important; }
  @media (max-width: 480px) {
    .rm-btns { flex-direction: column !important; }
  }

  /* Hover/active feedback */
  button:active { opacity: 0.85; }

  /* Normalizar date picker y select en todos los browsers */
  input[type="date"] { appearance: none; -webkit-appearance: none; }
  input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; }
  select {
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%236b7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px !important;
  }
`
