/* ══════════════════════════════════════════════════════
   detalle.constants.js
   Datos mock, constantes y helpers de DetalleVehiculoPage
   Separado del componente y del CSS (buenas prácticas)
   ══════════════════════════════════════════════════════ */

/* ─── Mock de vehículos — espejo de VehiculoPage.jsx ─── */
export const VEHICULOS_MOCK = [
  {
    id: 1,
    marca: 'Toyota', modelo: 'RAV4 Hybrid', anio: 2024,
    categoria: 'SUV de Lujo', placa: 'KLS-456',
    motor: '2.5L Híbrido', transmision: 'Automática',
    combustible: 'Híbrido', pasajeros: 5, gasolina: 'Tanque Lleno',
    tarifa: 120000, tarifaKmExtra: 800, seguroBase: 45000,
    disponible: true, calificacion: 4.8, resenas: 127,
    descripcion: 'SUV compacto híbrido con tracción integral opcional, ideal para ciudad y montaña.',
    imagen: '/toyota rawr.jpeg',
    /* RF11.3 — fechas bloqueadas (otras reservas en el sistema) */
    fechasBloqueadas: ['2026-04-20', '2026-04-21', '2026-04-25'],
    sucursales: ['Sede Norte', 'Sede Centro', 'Sede Sur', 'Sede Este'],
  },
  {
    id: 2,
    marca: 'Mazda', modelo: '3 Grand Touring', anio: 2023,
    categoria: 'Sedán', placa: 'ABC-123',
    motor: '2.5L Skyactiv-G', transmision: 'Automática',
    combustible: 'Gasolina', pasajeros: 5, gasolina: 'Tanque Lleno',
    tarifa: 95000, tarifaKmExtra: 600, seguroBase: 35000,
    disponible: true, calificacion: 4.6, resenas: 89,
    descripcion: 'Sedán premium con diseño Kodo y tecnología Skyactiv.',
    imagen: '/mazda3.jpeg',
    fechasBloqueadas: ['2026-04-22', '2026-04-23'],
    sucursales: ['Sede Centro', 'Sede Sur'],
  },
  {
    id: 3,
    marca: 'Kia', modelo: 'Picanto Ion', anio: 2022,
    categoria: 'Urbano', placa: 'KIA-789',
    motor: '1.2L', transmision: 'Manual',
    combustible: 'Gasolina', pasajeros: 4, gasolina: 'Tanque Lleno',
    tarifa: 65000, tarifaKmExtra: 400, seguroBase: 25000,
    disponible: true, calificacion: 4.2, resenas: 54,
    descripcion: 'Vehículo urbano económico, perfecto para movilizarse en la ciudad.',
    imagen: '/KiaPicanto_Ion2022.jpeg',
    fechasBloqueadas: [],
    sucursales: ['Sede Sur', 'Sede Norte'],
  },
  {
    id: 4,
    marca: 'Ford', modelo: 'F-150 Lariat', anio: 2024,
    categoria: 'Pickup', placa: 'FOR-456',
    motor: '3.5L EcoBoost', transmision: 'Automática',
    combustible: 'Gasolina', pasajeros: 5, gasolina: 'Tanque Lleno',
    tarifa: 180000, tarifaKmExtra: 1000, seguroBase: 60000,
    disponible: false, calificacion: 4.9, resenas: 203,
    descripcion: 'Pickup potente con cabina doble y capacidad de carga de 1 tonelada.',
    imagen: '/fordf150_lariat2024.jpeg',
    fechasBloqueadas: ['2026-04-18','2026-04-19','2026-04-20','2026-04-21','2026-04-22','2026-04-23','2026-04-24','2026-04-25','2026-04-26','2026-04-27','2026-04-28','2026-04-29','2026-04-30'],
    sucursales: ['Sede Norte'],
  },
  {
    id: 5,
    marca: 'BMW', modelo: 'Serie 3', anio: 2023,
    categoria: 'Lujo', placa: 'BMW-321',
    motor: '2.0L TwinPower Turbo', transmision: 'Automática',
    combustible: 'Gasolina', pasajeros: 5, gasolina: 'Tanque Lleno',
    tarifa: 210000, tarifaKmExtra: 1200, seguroBase: 75000,
    disponible: true, calificacion: 4.9, resenas: 67,
    descripcion: 'Sedán de lujo deportivo con motorización BMW TwinPower Turbo.',
    imagen: '/BMWSerie3_2023lujo.jpeg',
    fechasBloqueadas: ['2026-04-28', '2026-04-29'],
    sucursales: ['Sede Este', 'Sede Norte'],
  },
  {
    id: 6,
    marca: 'BYD', modelo: 'Seagull', anio: 2024,
    categoria: 'Urbano Eléctrico', placa: 'BYD-001',
    motor: 'Motor Eléctrico 55kW', transmision: 'Automática',
    combustible: 'Eléctrico', pasajeros: 4, gasolina: 'Carga 100%',
    tarifa: 110000, tarifaKmExtra: 500, seguroBase: 40000,
    disponible: true, calificacion: 4.5, resenas: 31,
    descripcion: 'Hatchback eléctrico de última generación con autonomía de 405 km.',
    imagen: '/byd seagull URBANO 2024.jpeg',
    fechasBloqueadas: [],
    sucursales: ['Sede Centro', 'Sede Este'],
  },
  {
    id: 7,
    marca: 'Chevrolet', modelo: 'Tracker', anio: 2024,
    categoria: 'SUV', placa: 'CHE-007',
    motor: '1.2L Turbo', transmision: 'Automática',
    combustible: 'Gasolina', pasajeros: 5, gasolina: 'Tanque Lleno',
    tarifa: 105000, tarifaKmExtra: 550, seguroBase: 38000,
    disponible: true, calificacion: 4.3, resenas: 76,
    descripcion: 'SUV compacto con conectividad Wi-Fi y sistema de infoentretenimiento avanzado.',
    imagen: '/Chevrolet1.jpg',
    fechasBloqueadas: [],
    sucursales: ['Sede Sur', 'Sede Centro'],
  },
  {
    id: 8,
    marca: 'Hyundai', modelo: 'Ioniq 6', anio: 2024,
    categoria: 'Sedán Eléctrico', placa: 'HYU-600',
    motor: 'Motor Eléctrico 168kW', transmision: 'Automática',
    combustible: 'Eléctrico', pasajeros: 5, gasolina: 'Carga 100%',
    tarifa: 195000, tarifaKmExtra: 900, seguroBase: 65000,
    disponible: false, calificacion: 4.7, resenas: 42,
    descripcion: 'Sedán eléctrico aerodinámico con autonomía de 614 km y carga rápida 800V.',
    imagen: '/Hyundai Ioniq 6 sedan 2024.jpeg',
    fechasBloqueadas: [],
    sucursales: ['Sede Norte'],
  },
]

/* ─── RF11.10 — Tipos de seguro disponibles ─── */
export const SEGUROS = [
  {
    id: 'soat',
    nombre: 'Solo SOAT',
    precio: 0,
    desc: 'Cobertura mínima obligatoria por ley',
  },
  {
    id: 'basico',
    nombre: 'Todo Riesgo Básico',
    precio: 25000,
    desc: 'Cubre colisiones sin deducible',
  },
  {
    id: 'premium',
    nombre: 'Premium + Asistencia',
    precio: 45000,
    desc: 'Todo riesgo + grúa + asistencia 24/7',
  },
]

/* ─── RF11.11 — Servicios adicionales disponibles ─── */
export const SERVICIOS = [
  { id: 'gps',       nombre: 'GPS',                    precio: 8000,  icono: '📍' },
  { id: 'bebe',      nombre: 'Silla para bebé',         precio: 12000, icono: '👶' },
  { id: 'conductor', nombre: 'Conductor adicional',     precio: 15000, icono: '👤' },
  { id: 'tanque',    nombre: 'Tanque lleno garantizado', precio: 20000, icono: '⛽' },
]

/* ─── Helpers de formato y fecha ─── */

/* Formatea número a pesos colombianos: $120,000 */
export const fmtCOP = (n) => `$${Number(n).toLocaleString('es-CO')}`

/* Fecha de hoy en formato ISO yyyy-mm-dd */
export const hoyISO = () => new Date().toISOString().split('T')[0]

/* Diferencia en días entre dos fechas ISO */
export const diffDias = (a, b) => {
  if (!a || !b) return 0
  const d = (new Date(b) - new Date(a)) / 86400000
  return d > 0 ? Math.round(d) : 0
}
