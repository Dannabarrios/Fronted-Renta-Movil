/* ══════════════════════════════════════════════════════
   DetalleVehiculoPage.jsx  —  RF11: Reserva de vehículo
   Solo lógica + estructura JSX.
   Datos  → detalle.constants.js
   Estilos → detalle.styles.js
   ══════════════════════════════════════════════════════ */
import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/* Datos y helpers separados */
import {
  VEHICULOS_MOCK,
  SEGUROS,
  SERVICIOS,
  fmtCOP,
  hoyISO,
  diffDias,
} from './detalle.constants'

/* Estilos separados */
import { st, CSS_RESPONSIVO } from './detalle.styles'

/* ══════════════════════════════════════════════════════
   SUB-COMPONENTES (pequeños, sin lógica propia)
   ══════════════════════════════════════════════════════ */

/* Sección con título (kilometraje, seguro, servicios) */
const Seccion = ({ titulo, children }) => (
  <div style={st.seccion}>
    <h3 style={st.seccionTitulo}>{titulo}</h3>
    {children}
  </div>
)

/* Campo de formulario con label */
const Campo = ({ label, children }) => (
  <div style={st.campoWrap}>
    <label style={st.campoLabel}>{label}</label>
    {children}
  </div>
)

/* Mensaje de error de validación */
const Err = ({ children }) => <p style={st.errMsg}>{children}</p>

/* Fila de costo en el desglose (RF11.12) */
const FilaCosto = ({ lbl, val }) => (
  <div style={st.filaCosto}>
    <span>{lbl}</span>
    <span style={{ fontWeight: 600 }}>{fmtCOP(val)}</span>
  </div>
)

/* Grupo del resumen con título (RF11.13) */
const GrupoResumen = ({ titulo, children }) => (
  <div style={st.grupoResumen}>
    <h3 style={st.grupoTitulo}>{titulo}</h3>
    {children}
  </div>
)

/* Fila clave/valor del resumen */
const FilaRes = ({ lbl, val }) => (
  <div style={st.filaRes}>
    <span style={st.filaResLbl}>{lbl}</span>
    <span style={st.filaResVal}>{val}</span>
  </div>
)

/* ══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ══════════════════════════════════════════════════════ */
export default function DetalleVehiculoPage() {
  const navigate = useNavigate()
  const { id }   = useParams()

  /* RF11.7 — Buscar el vehículo por id de URL */
  const vehiculo = VEHICULOS_MOCK.find(v => String(v.id) === String(id)) ?? VEHICULOS_MOCK[0]

  /* ── Estado: galería ── */
  const [imgIdx, setImgIdx] = useState(0)

  /* ── Estado: formulario ── */
  const [fechaInicio, setFechaInicio] = useState('')  // RF11.1
  const [fechaFin,    setFechaFin]    = useState('')  // RF11.1
  const [sucursal,    setSucursal]    = useState('')  // RF11.2
  const [tipoKm,      setTipoKm]      = useState('ilimitado') // RF11.8
  const [kmDia,       setKmDia]       = useState(200)         // RF11.8 modo limitado
  const [seguroId,    setSeguroId]    = useState('soat')      // RF11.10
  const [servicios,   setServiciosS]  = useState([])          // RF11.11

  /* ── Estado: UI ── */
  const [paso,          setPaso]          = useState(1)     // 1=detalle 2=resumen 3=confirmado
  const [errores,       setErrores]       = useState({})
  const [verCalendario, setVerCalendario] = useState(false) // RF11.3
  const [toast,         setToast]         = useState(null)  // RF11.16

  /* Días entre fechas seleccionadas */
  const dias = diffDias(fechaInicio, fechaFin)

  /* RF11.4 — Validar disponibilidad: ninguna fecha bloqueada en el rango */
  const disponibleEnFechas = useMemo(() => {
    if (!fechaInicio || !fechaFin) return true
    return !vehiculo.fechasBloqueadas.some(f => f >= fechaInicio && f <= fechaFin)
  }, [fechaInicio, fechaFin, vehiculo])

  /* RF11.12 — Calcular tarifa total: base + seguro + servicios + km extra */
  const calculo = useMemo(() => {
    const base    = vehiculo.tarifa * dias
    const seguro  = vehiculo.seguroBase + (SEGUROS.find(s => s.id === seguroId)?.precio ?? 0)
    const extras  = servicios.reduce((acc, sid) =>
      acc + (SERVICIOS.find(s => s.id === sid)?.precio ?? 0), 0) * dias
    /* RF11.9 — exceso de km (en mock = 0; conectar con backend) */
    const kmExtra = tipoKm === 'limitado' ? 0 * vehiculo.tarifaKmExtra : 0
    return { base, seguro, extras, kmExtra, total: base + seguro + extras + kmExtra }
  }, [dias, seguroId, servicios, tipoKm, vehiculo])

  /* RF11.11 — Activar/desactivar servicio adicional */
  const toggleServicio = (sid) =>
    setServiciosS(prev =>
      prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]
    )

  /* Validar formulario antes de avanzar al resumen */
  const validar = () => {
    const e = {}
    if (!fechaInicio)                          e.fi   = 'Selecciona la fecha de recogida'
    if (fechaInicio && fechaInicio < hoyISO()) e.fi   = 'La fecha no puede ser en el pasado'
    if (!fechaFin)                             e.ff   = 'Selecciona la fecha de devolución'
    if (fechaFin && fechaFin <= fechaInicio)   e.ff   = 'Debe ser posterior a la fecha de inicio'
    if (!sucursal)                             e.suc  = 'Selecciona una sucursal'
    if (!disponibleEnFechas)                   e.disp = 'Vehículo no disponible en esas fechas'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  /* RF11.13 — Ir al resumen si el formulario es válido */
  const irResumen = () => { if (validar()) setPaso(2) }

  /* RF11.15 — Confirmar reserva (mock: avanza al paso 3) */
  const confirmarReserva = () => {
    setPaso(3)
    setToast({ tipo: 'ok', msg: '✅ Reserva creada. Recibirás confirmación en tu correo.' })
    /* TODO: POST /api/reservas con los datos del formulario */
  }

  /* RF11.14 — Editar reserva: volver al paso 1 */
  const editarReserva = () => setPaso(1)

  /* Auto-cerrar toast después de 4.5 s */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4500)
    return () => clearTimeout(t)
  }, [toast])

  const seguroActual = SEGUROS.find(s => s.id === seguroId)

  /* ═══════════════ RENDER ═══════════════ */
  return (
    <div style={st.page}>

      {/* CSS responsivo inyectado (viene de detalle.styles.js) */}
      <style>{CSS_RESPONSIVO}</style>

      {/* Toast / mensajes del sistema (RF11.16) */}
      {toast && (
        <div style={{ ...st.toast, background: toast.tipo === 'ok' ? '#1a4b8c' : '#dc2626' }}>
          {toast.msg}
        </div>
      )}

      {/* NAVBAR con botón volver al catálogo */}
      <nav style={st.nav}>
        <span style={st.navBrand}>RENTA MÓVIL</span>
        <button style={st.navBack} onClick={() => navigate('/catalogo')}>
          ← Volver al catálogo
        </button>
      </nav>

      {/* BARRA DE PASOS */}
      <div style={st.stepBar}>
        {['Detalles y configuración', 'Resumen de reserva', 'Confirmación'].map((lbl, i) => (
          <div key={i} style={st.stepItem}>
            <div style={{
              ...st.stepCircle,
              background: paso > i + 1 ? '#22c55e' : paso === i + 1 ? '#1a4b8c' : '#e5e7eb',
              color:      paso >= i + 1 ? '#fff' : '#9ca3af',
            }}>
              {paso > i + 1 ? '✓' : i + 1}
            </div>
            <span style={{ ...st.stepLabel, color: paso === i + 1 ? '#1a4b8c' : '#9ca3af', fontWeight: paso === i + 1 ? 700 : 400 }}>
              {lbl}
            </span>
            {i < 2 && <span style={st.stepSep}>›</span>}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          PASO 1 — DETALLE DEL VEHÍCULO + FORMULARIO
          RF11.6: galería/ficha  |  RF11.1–RF11.12: config
          ══════════════════════════════════════════════ */}
      {paso === 1 && (
        <div style={st.layout} className="rm-layout">

          {/* Columna izquierda: galería + ficha + opciones */}
          <div>

            {/* RF11.6 — Imagen principal */}
            <div style={st.imgWrap}>
              <img
                src={vehiculo.imagen}
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                style={st.imgMain}
                onError={e => { e.target.src = 'https://placehold.co/800x450?text=Sin+imagen' }}
              />
              {/* Badge de disponibilidad RF11.4 */}
              <span style={{ ...st.badge, background: vehiculo.disponible ? '#16a34a' : '#dc2626' }}>
                {vehiculo.disponible ? '✓ Disponible' : '✗ No disponible'}
              </span>
            </div>

            {/* RF11.6 — Miniaturas de galería */}
            <div style={st.thumbGrid} className="rm-thumbs">
              {[vehiculo.imagen, vehiculo.imagen, vehiculo.imagen, vehiculo.imagen].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  style={{ ...st.thumb, border: imgIdx === i ? '2px solid #1a4b8c' : '2px solid transparent' }}
                >
                  <img src={img} alt="" style={st.thumbImg}
                    onError={e => { e.target.src = 'https://placehold.co/200x150?text=Foto' }} />
                </button>
              ))}
            </div>

            {/* RF11.6 — Nombre, categoría y descripción */}
            <div style={{ marginTop: 24 }}>
              <h1 style={st.h1}>{vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}</h1>
              <p style={st.catLabel}>{vehiculo.categoria} • Placa: {vehiculo.placa}</p>
              <p style={st.desc}>{vehiculo.descripcion}</p>
            </div>

            {/* RF11.6 — Ficha técnica */}
            <div style={st.ficha} className="rm-ficha">
              {[
                { lbl: 'MOTOR',       val: vehiculo.motor },
                { lbl: 'TRANSMISIÓN', val: vehiculo.transmision },
                { lbl: 'COMBUSTIBLE', val: vehiculo.combustible },
                { lbl: 'PASAJEROS',   val: `${vehiculo.pasajeros} personas` },
              ].map(({ lbl, val }) => (
                <div key={lbl}>
                  <div style={st.fichaLbl}>{lbl}</div>
                  <div style={st.fichaVal}>{val}</div>
                </div>
              ))}
            </div>

            {/* RF11.8 — Tipo de kilometraje */}
            <Seccion titulo="Tipo de kilometraje">
              <div style={st.kmGrid} className="rm-km">
                {[
                  { id: 'ilimitado', lbl: 'Ilimitado', sub: 'Sin restricción de km', extra: 'Incluido' },
                  { id: 'limitado',  lbl: 'Limitado',  sub: 'Km diarios a definir',  extra: `+${fmtCOP(vehiculo.tarifaKmExtra)}/km extra` },
                ].map(op => (
                  <button key={op.id} onClick={() => setTipoKm(op.id)}
                    style={{ ...st.opCard, border: tipoKm === op.id ? '2px solid #1a4b8c' : '2px solid #e5e7eb', background: tipoKm === op.id ? '#eff6ff' : '#fff' }}>
                    <div style={{ fontWeight: 700, color: tipoKm === op.id ? '#1a4b8c' : '#374151' }}>{op.lbl}</div>
                    <div style={st.opSub}>{op.sub}</div>
                    <div style={{ fontSize: 12, color: tipoKm === op.id ? '#1a4b8c' : '#9ca3af', marginTop: 2 }}>{op.extra}</div>
                  </button>
                ))}
              </div>
              {/* RF11.9 — Input km diarios si es limitado */}
              {tipoKm === 'limitado' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                  <label style={{ fontSize: 14, color: '#374151' }}>Km diarios incluidos:</label>
                  <input type="number" min={50} max={500} step={25} value={kmDia}
                    onChange={e => setKmDia(Number(e.target.value))}
                    style={{ width: 90, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
                  <span style={{ fontSize: 13, color: '#6b7280' }}>km/día</span>
                </div>
              )}
            </Seccion>

            {/* RF11.10 — Tipo de seguro */}
            <Seccion titulo="Tipo de seguro">
              {SEGUROS.map(seg => (
                <button key={seg.id} onClick={() => setSeguroId(seg.id)}
                  style={{ ...st.segCard, border: seguroId === seg.id ? '2px solid #1a4b8c' : '2px solid #e5e7eb', background: seguroId === seg.id ? '#eff6ff' : '#fff' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: seguroId === seg.id ? '#1a4b8c' : '#374151' }}>{seg.nombre}</div>
                    <div style={st.opSub}>{seg.desc}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: seguroId === seg.id ? '#1a4b8c' : '#6b7280', whiteSpace: 'nowrap' }}>
                    {seg.precio === 0 ? 'Incluido' : `+${fmtCOP(seg.precio)}`}
                  </div>
                </button>
              ))}
            </Seccion>

            {/* RF11.11 — Servicios adicionales */}
            <Seccion titulo="Servicios adicionales">
              <div style={st.servGrid} className="rm-serv">
                {SERVICIOS.map(srv => {
                  const activo = servicios.includes(srv.id)
                  return (
                    <button key={srv.id} onClick={() => toggleServicio(srv.id)}
                      style={{ ...st.servCard, border: activo ? '2px solid #1a4b8c' : '2px solid #e5e7eb', background: activo ? '#eff6ff' : '#fff' }}>
                      <span style={{ fontSize: 22 }}>{srv.icono}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: activo ? '#1a4b8c' : '#374151' }}>{srv.nombre}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>+{fmtCOP(srv.precio)}/día</div>
                      </div>
                      {activo && <span style={{ color: '#1a4b8c', fontWeight: 700 }}>✓</span>}
                    </button>
                  )
                })}
              </div>
            </Seccion>
          </div>

          {/* Columna derecha: panel de reserva (sticky en desktop) */}
          <div style={st.panelWrap} className="rm-panel">
            <div style={st.panel}>

              <div style={st.panelHead}>
                <h2 style={{ color: '#fff', margin: 0, fontSize: 18, fontWeight: 700 }}>Reserva tu vehículo</h2>
              </div>

              <div style={st.panelBody}>

                {/* RF11.2 — Sucursal de recogida */}
                <Campo label="SUCURSAL DE RECOGIDA">
                  <select value={sucursal} onChange={e => setSucursal(e.target.value)} style={st.input}>
                    <option value="">Seleccionar sucursal…</option>
                    {vehiculo.sucursales.map(sc => <option key={sc}>{sc}</option>)}
                  </select>
                  {errores.suc && <Err>{errores.suc}</Err>}
                </Campo>

                {/* RF11.1 — Fecha de recogida */}
                <Campo label="FECHA DE RECOGIDA">
                  <input type="date" value={fechaInicio} min={hoyISO()}
                    onChange={e => { setFechaInicio(e.target.value); setFechaFin('') }}
                    style={st.input} />
                  {errores.fi && <Err>{errores.fi}</Err>}
                </Campo>

                {/* RF11.1 — Fecha de devolución */}
                <Campo label="FECHA DE DEVOLUCIÓN">
                  <input type="date" value={fechaFin} min={fechaInicio || hoyISO()}
                    onChange={e => setFechaFin(e.target.value)}
                    style={st.input} />
                  {errores.ff && <Err>{errores.ff}</Err>}
                </Campo>

                {/* RF11.4 — Alerta de disponibilidad en tiempo real */}
                {fechaInicio && fechaFin && (
                  <div style={{
                    ...st.alertaDisp,
                    background: disponibleEnFechas ? '#f0fdf4' : '#fef2f2',
                    border:     `1px solid ${disponibleEnFechas ? '#86efac' : '#fca5a5'}`,
                    color:      disponibleEnFechas ? '#166534' : '#991b1b',
                  }}>
                    {disponibleEnFechas
                      ? `✓ Disponible · ${dias} día${dias !== 1 ? 's' : ''}`
                      : '✗ Vehículo no disponible en esas fechas'}
                  </div>
                )}
                {errores.disp && <Err>{errores.disp}</Err>}

                {/* RF11.3 — Ver calendario de disponibilidad */}
                <button style={st.btnCalendario} onClick={() => setVerCalendario(v => !v)}>
                  📅 {verCalendario ? 'Ocultar' : 'Ver'} disponibilidad del mes
                </button>

                {/* RF11.3 — Listado de fechas bloqueadas */}
                {verCalendario && (
                  <div style={st.calendarioBox}>
                    <p style={{ fontWeight: 600, color: '#374151', marginBottom: 8, fontSize: 13 }}>
                      Fechas no disponibles:
                    </p>
                    {vehiculo.fechasBloqueadas.length === 0
                      ? <span style={{ fontSize: 13, color: '#16a34a' }}>✓ Sin restricciones este mes</span>
                      : <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {vehiculo.fechasBloqueadas.map(f => (
                            <span key={f} style={st.fechaBloq}>{f}</span>
                          ))}
                        </div>
                    }
                  </div>
                )}

                {/* RF11.12 — Desglose de costos */}
                {dias > 0 && (
                  <div style={st.desglose}>
                    <FilaCosto lbl={`${fmtCOP(vehiculo.tarifa)} × ${dias} día${dias !== 1 ? 's' : ''}`} val={calculo.base} />
                    <FilaCosto lbl="Seguro obligatorio (SOAT)" val={vehiculo.seguroBase} />
                    {seguroActual?.precio > 0 && <FilaCosto lbl={seguroActual.nombre} val={seguroActual.precio} />}
                    {servicios.map(sid => {
                      const sv = SERVICIOS.find(s => s.id === sid)
                      return sv ? <FilaCosto key={sid} lbl={`${sv.nombre} × ${dias} días`} val={sv.precio * dias} /> : null
                    })}
                    {calculo.kmExtra > 0 && <FilaCosto lbl="Exceso de km" val={calculo.kmExtra} />}
                    <div style={st.totalRow}>
                      <span style={st.totalLbl}>TOTAL</span>
                      <span style={st.totalVal}>{fmtCOP(calculo.total)}</span>
                    </div>
                  </div>
                )}

                <button style={st.btnPrimary} onClick={irResumen}>CONTINUAR AL PAGO</button>
                <p style={st.noCharge}>No se realizará ningún cargo todavía.</p>
              </div>
            </div>

            {/* Calificación del vehículo */}
            <div style={st.rating}>
              <span style={{ fontSize: 20 }}>⭐</span>
              <div>
                <div style={{ fontWeight: 700, color: '#111827', fontSize: 15 }}>{vehiculo.calificacion} / 5.0</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{vehiculo.resenas} reseñas</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PASO 2 — RESUMEN DE RESERVA  (RF11.13)
          ══════════════════════════════════════════════ */}
      {paso === 2 && (
        <div style={st.resumenWrap}>
          <div style={st.resumenCard}>
            <div style={st.panelHead}>
              <h2 style={{ color: '#fff', margin: 0, fontSize: 20, fontWeight: 700 }}>Resumen de tu reserva</h2>
              <p style={{ color: '#93c5fd', marginTop: 4, fontSize: 13 }}>Revisa los detalles antes de confirmar</p>
            </div>

            <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* RF11.13 — Vehículo */}
              <GrupoResumen titulo="🚗 Vehículo">
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <img src={vehiculo.imagen} alt=""
                    style={{ width: 90, height: 62, objectFit: 'cover', borderRadius: 10 }}
                    onError={e => { e.target.src = 'https://placehold.co/90x62?text=Auto' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#111827' }}>{vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}</div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>{vehiculo.categoria} • Placa: {vehiculo.placa}</div>
                  </div>
                </div>
              </GrupoResumen>

              {/* RF11.13 — Fechas y sucursal */}
              <GrupoResumen titulo="📅 Fechas y sucursal">
                <FilaRes lbl="Sucursal de recogida" val={sucursal} />
                <FilaRes lbl="Fecha de inicio"      val={fechaInicio} />
                <FilaRes lbl="Fecha de devolución"  val={fechaFin} />
                <FilaRes lbl="Duración"             val={`${dias} día${dias !== 1 ? 's' : ''}`} />
              </GrupoResumen>

              {/* RF11.13 — Configuración elegida */}
              <GrupoResumen titulo="⚙️ Configuración">
                <FilaRes lbl="Kilometraje" val={tipoKm === 'ilimitado' ? 'Ilimitado' : `Limitado · ${kmDia} km/día`} />
                <FilaRes lbl="Seguro"      val={seguroActual?.nombre} />
                <FilaRes lbl="Servicios adicionales"
                  val={servicios.length ? servicios.map(sid => SERVICIOS.find(s => s.id === sid)?.nombre).join(', ') : 'Ninguno'} />
              </GrupoResumen>

              {/* RF11.13 — Costos */}
              <GrupoResumen titulo="💰 Costos">
                <FilaCosto lbl={`Tarifa base (${fmtCOP(vehiculo.tarifa)}/día × ${dias} días)`} val={calculo.base} />
                <FilaCosto lbl="Seguro SOAT obligatorio" val={vehiculo.seguroBase} />
                {seguroActual?.precio > 0 && <FilaCosto lbl={seguroActual.nombre} val={seguroActual.precio} />}
                {servicios.map(sid => {
                  const sv = SERVICIOS.find(s => s.id === sid)
                  return sv ? <FilaCosto key={sid} lbl={`${sv.nombre} × ${dias} días`} val={sv.precio * dias} /> : null
                })}
                <div style={{ ...st.totalRow, borderTop: '2px solid #1a4b8c', marginTop: 10, paddingTop: 12 }}>
                  <span style={{ ...st.totalLbl, fontSize: 17 }}>TOTAL A PAGAR</span>
                  <span style={{ ...st.totalVal, fontSize: 22 }}>{fmtCOP(calculo.total)}</span>
                </div>
              </GrupoResumen>

              {/* RF11.13 — Datos del usuario (mock hasta auth real) */}
              <GrupoResumen titulo="👤 Datos del usuario">
                <FilaRes lbl="Nombre"    val="Usuario Demo" />
                <FilaRes lbl="Correo"    val="usuario@rentamovil.com" />
                <FilaRes lbl="Documento" val="CC 1.234.567.890" />
              </GrupoResumen>

              {/* RF11.14 editar  |  RF11.15 confirmar */}
              <div style={st.botonesResumen} className="rm-btns">
                <button style={st.btnSecondary} onClick={editarReserva}>← Editar reserva</button>
                <button style={{ ...st.btnPrimary, flex: 2 }} onClick={confirmarReserva}>CONFIRMAR RESERVA</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PASO 3 — CONFIRMACIÓN  (RF11.15 + RF11.16)
          ══════════════════════════════════════════════ */}
      {paso === 3 && (
        <div style={st.confirmWrap}>
          <div style={st.confirmCard}>
            <div style={st.confirmIcon}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 6 }}>¡Reserva confirmada!</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
              Tu reserva del <strong>{vehiculo.marca} {vehiculo.modelo}</strong> quedó registrada.
              {/* RF11.16 — Notificación enviada al usuario */}
              <br />Se envió la confirmación a tu correo electrónico.
            </p>
            <div style={st.nroReserva}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#166534', letterSpacing: 1 }}>NÚMERO DE RESERVA</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#15803d', letterSpacing: 3, marginTop: 4 }}>
                RM-{String(Date.now()).slice(-5)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button style={st.btnSecondary} onClick={() => navigate('/catalogo')}>Ver más vehículos</button>
              <button style={st.btnPrimary}
                onClick={() => { setPaso(1); setFechaInicio(''); setFechaFin(''); setSucursal(''); setServiciosS([]) }}>
                Nueva reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
