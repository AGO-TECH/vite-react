// ============================================
// WISP Control Pro - Realistic Mock Data
// ============================================

import type {
  Client, ServicePlan, Tower, Device, Invoice, Alert,
  WhatsAppMessage, AutomationRule, RecentActivity, PPPoESession,
  RevenueDataPoint, ClientGrowthPoint, TrafficDataPoint, Organization, User
} from "./types"

// --- Seed helpers (mulberry32 - deterministic across Node & browser) ---
function seededRandom(seed: number): number {
  let t = (seed + 0x6D2B79F5) | 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const FIRST_NAMES = [
  "Carlos", "Maria", "Jose", "Ana", "Juan", "Rosa", "Luis", "Guadalupe", "Miguel", "Patricia",
  "Francisco", "Martha", "Pedro", "Leticia", "Ricardo", "Alejandra", "Fernando", "Veronica", "Eduardo", "Monica",
  "Javier", "Adriana", "Roberto", "Gabriela", "Daniel", "Claudia", "Arturo", "Sandra", "Raul", "Elizabeth",
  "Antonio", "Isabel", "Manuel", "Carmen", "Rafael", "Silvia", "Diego", "Teresa", "Sergio", "Laura",
  "Jorge", "Cristina", "Alberto", "Beatriz", "Oscar", "Norma", "Victor", "Mariana", "Enrique", "Yolanda"
]

const LAST_NAMES = [
  "Garcia", "Martinez", "Lopez", "Hernandez", "Gonzalez", "Rodriguez", "Perez", "Sanchez", "Ramirez", "Torres",
  "Flores", "Rivera", "Gomez", "Diaz", "Cruz", "Morales", "Reyes", "Gutierrez", "Ramos", "Ortiz",
  "Jimenez", "Castillo", "Ruiz", "Mendoza", "Aguilar", "Herrera", "Vargas", "Medina", "Castro", "Romero",
  "Navarro", "Chavez", "Delgado", "Vega", "Salazar", "Soto", "Fuentes", "Campos", "Rojas", "Guerrero"
]

const COLONIAS = [
  "Col. Centro", "Col. Reforma", "Col. Industrial", "Col. Mirador", "Col. Las Palmas",
  "Col. San Miguel", "Col. Vista Hermosa", "Col. Del Valle", "Col. Santa Fe", "Col. Jardines",
  "Fracc. Los Olivos", "Fracc. Montecarlo", "Fracc. Las Brisas", "Col. Progreso", "Col. Libertad"
]

// --- Organizations ---
export const organizations: Organization[] = [
  { id: "org-1", name: "NetVision ISP", plan: "enterprise", createdAt: "2023-01-15" },
  { id: "org-2", name: "WifiMax Conecta", plan: "pro", createdAt: "2023-06-20" },
  { id: "org-3", name: "Sierra Net", plan: "basic", createdAt: "2024-02-01" },
]

export const currentUser: User = {
  id: "usr-1",
  name: "Carlos Mendoza",
  email: "carlos@netvision.mx",
  role: "wisp_admin",
  organizationId: "org-1",
}

// --- Towers ---
export const towers: Tower[] = [
  { id: "tw-1", name: "Torre Centro", location: "Col. Centro, Cerro del Vigía", totalClients: 68, onlinePercent: 94, backhaulTraffic: 450, sectorLoad: 72, status: "online" },
  { id: "tw-2", name: "Torre Norte", location: "Col. Industrial, Cerro Norte", totalClients: 55, onlinePercent: 91, backhaulTraffic: 380, sectorLoad: 65, status: "online" },
  { id: "tw-3", name: "Torre Sur", location: "Col. Reforma, Cerro Sur", totalClients: 72, onlinePercent: 88, backhaulTraffic: 520, sectorLoad: 80, status: "warning" },
  { id: "tw-4", name: "Torre Poniente", location: "Col. Las Palmas, Cerro Poniente", totalClients: 45, onlinePercent: 96, backhaulTraffic: 290, sectorLoad: 55, status: "online" },
  { id: "tw-5", name: "Torre Oriente", location: "Col. Mirador, Cerro Oriente", totalClients: 38, onlinePercent: 92, backhaulTraffic: 260, sectorLoad: 48, status: "online" },
  { id: "tw-6", name: "Torre Valle", location: "Fracc. Los Olivos, Cerro Valle", totalClients: 62, onlinePercent: 89, backhaulTraffic: 410, sectorLoad: 70, status: "online" },
  { id: "tw-7", name: "Torre Sierra", location: "Col. Vista Hermosa, Cerro Sierra", totalClients: 41, onlinePercent: 93, backhaulTraffic: 310, sectorLoad: 58, status: "online" },
  { id: "tw-8", name: "Torre Costa", location: "Col. Del Valle, Cerro Costa", totalClients: 50, onlinePercent: 85, backhaulTraffic: 360, sectorLoad: 68, status: "warning" },
  { id: "tw-9", name: "Torre Lago", location: "Col. Santa Fe, Cerro Lago", totalClients: 35, onlinePercent: 97, backhaulTraffic: 220, sectorLoad: 42, status: "online" },
  { id: "tw-10", name: "Torre Bosque", location: "Fracc. Montecarlo, Cerro Bosque", totalClients: 34, onlinePercent: 90, backhaulTraffic: 240, sectorLoad: 45, status: "offline" },
]

// --- Service Plans ---
export const servicePlans: ServicePlan[] = [
  { id: "pl-1", name: "Basico 10", downloadSpeed: 10, uploadSpeed: 5, monthlyPrice: 299, installationFee: 500, graceDays: 5, clientCount: 45 },
  { id: "pl-2", name: "Basico 15", downloadSpeed: 15, uploadSpeed: 7, monthlyPrice: 349, installationFee: 500, graceDays: 5, clientCount: 38 },
  { id: "pl-3", name: "Estandar 20", downloadSpeed: 20, uploadSpeed: 10, monthlyPrice: 399, installationFee: 500, graceDays: 5, clientCount: 62 },
  { id: "pl-4", name: "Estandar 30", downloadSpeed: 30, uploadSpeed: 15, monthlyPrice: 449, installationFee: 500, graceDays: 5, clientCount: 55 },
  { id: "pl-5", name: "Plus 40", downloadSpeed: 40, uploadSpeed: 20, monthlyPrice: 549, installationFee: 500, graceDays: 5, clientCount: 42 },
  { id: "pl-6", name: "Plus 50", downloadSpeed: 50, uploadSpeed: 25, monthlyPrice: 599, installationFee: 500, graceDays: 5, clientCount: 48 },
  { id: "pl-7", name: "Premium 60", downloadSpeed: 60, uploadSpeed: 30, monthlyPrice: 699, installationFee: 500, graceDays: 5, clientCount: 35 },
  { id: "pl-8", name: "Premium 80", downloadSpeed: 80, uploadSpeed: 40, monthlyPrice: 799, installationFee: 500, graceDays: 5, clientCount: 28 },
  { id: "pl-9", name: "Ultra 100", downloadSpeed: 100, uploadSpeed: 50, monthlyPrice: 899, installationFee: 500, graceDays: 5, clientCount: 22 },
  { id: "pl-10", name: "Ultra 150", downloadSpeed: 150, uploadSpeed: 75, monthlyPrice: 999, installationFee: 500, graceDays: 5, clientCount: 15 },
  { id: "pl-11", name: "Fibra 200", downloadSpeed: 200, uploadSpeed: 100, monthlyPrice: 1199, installationFee: 800, graceDays: 7, clientCount: 18 },
  { id: "pl-12", name: "Fibra 300", downloadSpeed: 300, uploadSpeed: 150, monthlyPrice: 1499, installationFee: 800, graceDays: 7, clientCount: 12 },
  { id: "pl-13", name: "Empresarial 50", downloadSpeed: 50, uploadSpeed: 50, monthlyPrice: 1299, installationFee: 1500, graceDays: 10, clientCount: 8 },
  { id: "pl-14", name: "Empresarial 100", downloadSpeed: 100, uploadSpeed: 100, monthlyPrice: 1999, installationFee: 1500, graceDays: 10, clientCount: 6 },
  { id: "pl-15", name: "Dedicado 200", downloadSpeed: 200, uploadSpeed: 200, monthlyPrice: 2999, installationFee: 2500, graceDays: 15, clientCount: 4 },
  { id: "pl-16", name: "Hogar 10", downloadSpeed: 10, uploadSpeed: 3, monthlyPrice: 249, installationFee: 300, graceDays: 3, clientCount: 20 },
  { id: "pl-17", name: "Hogar 20", downloadSpeed: 20, uploadSpeed: 5, monthlyPrice: 349, installationFee: 300, graceDays: 3, clientCount: 15 },
  { id: "pl-18", name: "Hogar 30", downloadSpeed: 30, uploadSpeed: 10, monthlyPrice: 429, installationFee: 300, graceDays: 3, clientCount: 12 },
  { id: "pl-19", name: "Negocio 40", downloadSpeed: 40, uploadSpeed: 40, monthlyPrice: 899, installationFee: 1000, graceDays: 7, clientCount: 10 },
  { id: "pl-20", name: "Negocio 80", downloadSpeed: 80, uploadSpeed: 80, monthlyPrice: 1599, installationFee: 1000, graceDays: 7, clientCount: 5 },
  // Extended plans
  { id: "pl-21", name: "Estudiantil 5", downloadSpeed: 5, uploadSpeed: 2, monthlyPrice: 199, installationFee: 250, graceDays: 3, clientCount: 25 },
  { id: "pl-22", name: "Basico Plus 12", downloadSpeed: 12, uploadSpeed: 6, monthlyPrice: 329, installationFee: 500, graceDays: 5, clientCount: 18 },
  { id: "pl-23", name: "Estandar Plus 25", downloadSpeed: 25, uploadSpeed: 12, monthlyPrice: 429, installationFee: 500, graceDays: 5, clientCount: 14 },
  { id: "pl-24", name: "Plus Pro 45", downloadSpeed: 45, uploadSpeed: 22, monthlyPrice: 579, installationFee: 500, graceDays: 5, clientCount: 10 },
  { id: "pl-25", name: "Premium Pro 70", downloadSpeed: 70, uploadSpeed: 35, monthlyPrice: 749, installationFee: 500, graceDays: 5, clientCount: 8 },
  { id: "pl-26", name: "Ultra Pro 120", downloadSpeed: 120, uploadSpeed: 60, monthlyPrice: 949, installationFee: 500, graceDays: 5, clientCount: 6 },
  { id: "pl-27", name: "Fibra Plus 250", downloadSpeed: 250, uploadSpeed: 125, monthlyPrice: 1349, installationFee: 800, graceDays: 7, clientCount: 5 },
  { id: "pl-28", name: "Empresarial Plus 75", downloadSpeed: 75, uploadSpeed: 75, monthlyPrice: 1649, installationFee: 1500, graceDays: 10, clientCount: 3 },
  { id: "pl-29", name: "Residencial 35", downloadSpeed: 35, uploadSpeed: 15, monthlyPrice: 479, installationFee: 400, graceDays: 5, clientCount: 9 },
  { id: "pl-30", name: "Gamer 100", downloadSpeed: 100, uploadSpeed: 100, monthlyPrice: 1099, installationFee: 800, graceDays: 5, clientCount: 7 },
  { id: "pl-31", name: "Streaming 60", downloadSpeed: 60, uploadSpeed: 20, monthlyPrice: 649, installationFee: 500, graceDays: 5, clientCount: 11 },
  { id: "pl-32", name: "Home Office 50", downloadSpeed: 50, uploadSpeed: 50, monthlyPrice: 749, installationFee: 600, graceDays: 5, clientCount: 8 },
  { id: "pl-33", name: "Micro Empresa 30", downloadSpeed: 30, uploadSpeed: 30, monthlyPrice: 699, installationFee: 800, graceDays: 7, clientCount: 6 },
  { id: "pl-34", name: "Pyme 60", downloadSpeed: 60, uploadSpeed: 60, monthlyPrice: 1199, installationFee: 1200, graceDays: 10, clientCount: 4 },
  { id: "pl-35", name: "Corporativo 150", downloadSpeed: 150, uploadSpeed: 150, monthlyPrice: 2499, installationFee: 2000, graceDays: 15, clientCount: 3 },
  { id: "pl-36", name: "Rural 8", downloadSpeed: 8, uploadSpeed: 3, monthlyPrice: 229, installationFee: 400, graceDays: 5, clientCount: 15 },
  { id: "pl-37", name: "Rural Plus 15", downloadSpeed: 15, uploadSpeed: 5, monthlyPrice: 299, installationFee: 400, graceDays: 5, clientCount: 10 },
  { id: "pl-38", name: "Express 25", downloadSpeed: 25, uploadSpeed: 10, monthlyPrice: 399, installationFee: 450, graceDays: 5, clientCount: 12 },
  { id: "pl-39", name: "Turbo 90", downloadSpeed: 90, uploadSpeed: 45, monthlyPrice: 849, installationFee: 600, graceDays: 5, clientCount: 7 },
  { id: "pl-40", name: "Max 180", downloadSpeed: 180, uploadSpeed: 90, monthlyPrice: 1099, installationFee: 700, graceDays: 7, clientCount: 4 },
]

// --- Generate 500 Clients ---
function generateClients(): Client[] {
  const clients: Client[] = []
  const statuses: ClientStatus[] = ["active", "active", "active", "active", "suspended", "pending_payment"]

  for (let i = 0; i < 500; i++) {
    const seed = i + 1
    const r = (offset: number) => seededRandom(seed * 100 + offset)
    const firstName = FIRST_NAMES[Math.floor(r(1) * FIRST_NAMES.length)]
    const lastName1 = LAST_NAMES[Math.floor(r(2) * LAST_NAMES.length)]
    const lastName2 = LAST_NAMES[Math.floor(r(3) * LAST_NAMES.length)]
    const towerIdx = Math.floor(r(4) * towers.length)
    const planIdx = Math.floor(r(5) * servicePlans.length)
    const status = statuses[Math.floor(r(6) * statuses.length)]
    const subnet = r(7) > 0.5 ? "10.10" : "192.168"
    const octet3 = Math.floor(r(8) * 254) + 1
    const octet4 = Math.floor(r(9) * 254) + 1
    const dayOfMonth = Math.floor(r(10) * 28) + 1
    const balance = status === "active" ? 0 : Math.floor(r(11) * 3) * servicePlans[planIdx].monthlyPrice
    const areaCode = ["55", "33", "81", "222", "477", "614", "667", "686", "744", "951"][Math.floor(r(12) * 10)]

    clients.push({
      id: `cl-${String(i + 1).padStart(4, "0")}`,
      name: `${firstName} ${lastName1} ${lastName2}`,
      phone: `+52 ${areaCode} ${String(Math.floor(r(13) * 9000 + 1000))} ${String(Math.floor(r(14) * 9000 + 1000))}`,
      email: `${firstName.toLowerCase()}.${lastName1.toLowerCase()}${Math.floor(r(15) * 99)}@gmail.com`,
      plan: servicePlans[planIdx].name,
      planId: servicePlans[planIdx].id,
      ipAddress: `${subnet}.${octet3}.${octet4}`,
      tower: towers[towerIdx].name,
      towerId: towers[towerIdx].id,
      status,
      dueDate: `2026-03-${String(dayOfMonth).padStart(2, "0")}`,
      balance,
      signalStrength: Math.floor(r(16) * 40) - 75,
      connectionType: r(17) > 0.3 ? "pppoe" : "static",
      pppoeUser: r(17) > 0.3 ? `${firstName.toLowerCase()}.${lastName1.toLowerCase()}` : undefined,
      autoSuspend: r(18) > 0.2,
      createdAt: `202${Math.floor(r(19) * 3) + 3}-${String(Math.floor(r(20) * 12) + 1).padStart(2, "0")}-${String(Math.floor(r(21) * 28) + 1).padStart(2, "0")}`,
      lastPayment: status === "active" ? `2026-02-${String(Math.floor(r(22) * 28) + 1).padStart(2, "0")}` : undefined,
    })
  }
  return clients
}

export const clients: Client[] = generateClients()

// --- Devices ---
function generateDevices(): Device[] {
  const devices: Device[] = []
  const devicePrefixes = {
    router: ["RB4011", "RB3011", "CCR1009", "CCR1036", "RB750Gr3", "hEX-S"],
    ap: ["LHG-XL", "SXT-Lite5", "QRT-5", "LDF-5", "RBLHG-5nD", "mANTBox"],
    switch: ["CRS328", "CRS326", "CSS610", "CRS312"],
    cpe: ["SXT-SA5", "LHG-5", "Groove-52", "Metal-52", "QMP"]
  }
  let deviceId = 1
  let seedCounter = 5000

  for (const tower of towers) {
    const tIdx = towers.indexOf(tower)
    const r = () => seededRandom(seedCounter++)
    // Main router
    const routerName = devicePrefixes.router[deviceId % devicePrefixes.router.length]
    devices.push({
      id: `dev-${deviceId++}`,
      name: `${routerName} - ${tower.name}`,
      ip: `10.0.${tIdx + 1}.1`,
      publicIp: `189.${200 + tIdx}.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}`,
      tower: tower.name,
      towerId: tower.id,
      status: tower.status === "offline" ? "offline" : "online",
      latency: tower.status === "offline" ? 0 : Math.floor(r() * 15) + 1,
      packetLoss: tower.status === "offline" ? 100 : r() * 2,
      cpu: Math.floor(r() * 60) + 10,
      ram: Math.floor(r() * 50) + 20,
      uptime: `${Math.floor(r() * 90) + 10}d ${Math.floor(r() * 24)}h`,
      type: "router"
    })
    // APs per tower
    const apCount = Math.floor(r() * 3) + 2
    for (let a = 0; a < apCount; a++) {
      const apName = devicePrefixes.ap[deviceId % devicePrefixes.ap.length]
      const isOnline = tower.status !== "offline" && r() > 0.08
      devices.push({
        id: `dev-${deviceId++}`,
        name: `${apName} - ${tower.name} S${a + 1}`,
        ip: `10.0.${tIdx + 1}.${10 + a}`,
        publicIp: "-",
        tower: tower.name,
        towerId: tower.id,
        status: isOnline ? "online" : "offline",
        latency: isOnline ? Math.floor(r() * 8) + 1 : 0,
        packetLoss: isOnline ? r() * 1.5 : 100,
        cpu: isOnline ? Math.floor(r() * 50) + 15 : 0,
        ram: isOnline ? Math.floor(r() * 40) + 25 : 0,
        uptime: isOnline ? `${Math.floor(r() * 60) + 5}d ${Math.floor(r() * 24)}h` : "0d 0h",
        type: "ap"
      })
    }
  }
  return devices
}

export const devices: Device[] = generateDevices()

// --- Invoices ---
function generateInvoices(): Invoice[] {
  const invoices: Invoice[] = []
  const methods = ["Transferencia", "Efectivo", "Tarjeta", "OXXO", "SPEI"]
  const statuses: InvoiceStatus[] = ["paid", "paid", "paid", "pending", "overdue"]

  for (let i = 0; i < 200; i++) {
    const client = clients[i % clients.length]
    const status = statuses[Math.floor(seededRandom(i * 7) * statuses.length)]
    invoices.push({
      id: `inv-${String(i + 1).padStart(5, "0")}`,
      clientId: client.id,
      clientName: client.name,
      amount: servicePlans.find(p => p.id === client.planId)?.monthlyPrice || 399,
      status,
      dueDate: `2026-03-${String((i % 28) + 1).padStart(2, "0")}`,
      paidDate: status === "paid" ? `2026-02-${String((i % 28) + 1).padStart(2, "0")}` : undefined,
      paymentMethod: status === "paid" ? methods[i % methods.length] : undefined,
      period: "Marzo 2026",
    })
  }
  return invoices
}

export const invoices: Invoice[] = generateInvoices()

// --- Alerts ---
export const alerts: Alert[] = [
  { id: "alt-1", type: "device_down", severity: "critical", message: "Torre Bosque - Router principal sin respuesta", device: "RB4011 - Torre Bosque", timestamp: "2026-03-01T08:15:00", acknowledged: false },
  { id: "alt-2", type: "high_latency", severity: "warning", message: "Torre Sur - Latencia alta detectada (45ms)", device: "CCR1009 - Torre Sur", timestamp: "2026-03-01T07:45:00", acknowledged: false },
  { id: "alt-3", type: "high_cpu", severity: "warning", message: "Torre Costa - CPU al 92%", device: "RB3011 - Torre Costa", timestamp: "2026-03-01T07:30:00", acknowledged: true },
  { id: "alt-4", type: "client_offline", severity: "info", message: "12 clientes desconectados en Torre Sur", timestamp: "2026-03-01T07:00:00", acknowledged: false },
  { id: "alt-5", type: "device_down", severity: "critical", message: "AP Sector 2 - Torre Bosque sin respuesta", device: "LHG-XL - Torre Bosque S2", timestamp: "2026-03-01T08:16:00", acknowledged: false },
  { id: "alt-6", type: "high_latency", severity: "warning", message: "Torre Valle - Packet loss elevado (3.2%)", device: "CCR1036 - Torre Valle", timestamp: "2026-03-01T06:20:00", acknowledged: true },
  { id: "alt-7", type: "high_cpu", severity: "info", message: "Torre Centro - RAM al 78%", device: "RB4011 - Torre Centro", timestamp: "2026-03-01T05:45:00", acknowledged: true },
  { id: "alt-8", type: "device_down", severity: "critical", message: "Switch CRS328 - Torre Bosque sin respuesta", device: "CRS328 - Torre Bosque", timestamp: "2026-03-01T08:17:00", acknowledged: false },
]

// --- WhatsApp Messages ---
export const whatsappMessages: WhatsAppMessage[] = [
  { id: "wa-1", clientId: "cl-0001", clientName: clients[0].name, messageType: "payment_reminder", date: "2026-03-01T09:00:00", status: "delivered", phone: clients[0].phone, content: "Estimado cliente, le recordamos que su pago de $399 vence el 5 de marzo." },
  { id: "wa-2", clientId: "cl-0005", clientName: clients[4].name, messageType: "suspension_notice", date: "2026-03-01T08:30:00", status: "sent", phone: clients[4].phone, content: "Su servicio ha sido suspendido por falta de pago. Contactenos para reactivar." },
  { id: "wa-3", clientId: "cl-0010", clientName: clients[9].name, messageType: "reconnection", date: "2026-02-28T16:00:00", status: "delivered", phone: clients[9].phone, content: "Su servicio ha sido reactivado exitosamente. Gracias por su pago." },
  { id: "wa-4", clientId: "cl-0022", clientName: clients[21].name, messageType: "payment_reminder", date: "2026-03-01T07:00:00", status: "failed", phone: clients[21].phone, content: "Recordatorio: Su pago mensual vence en 3 dias." },
  { id: "wa-5", clientId: "cl-0033", clientName: clients[32].name, messageType: "promotional", date: "2026-02-28T12:00:00", status: "delivered", phone: clients[32].phone, content: "Actualice su plan a 100 Mbps por solo $899/mes. Contactenos!" },
  { id: "wa-6", clientId: "cl-0044", clientName: clients[43].name, messageType: "payment_reminder", date: "2026-03-01T06:30:00", status: "delivered", phone: clients[43].phone, content: "Estimado cliente, su factura de marzo ya esta disponible." },
  { id: "wa-7", clientId: "cl-0055", clientName: clients[54].name, messageType: "suspension_notice", date: "2026-02-28T14:00:00", status: "delivered", phone: clients[54].phone, content: "Aviso: Su servicio sera suspendido manana si no se registra el pago." },
  { id: "wa-8", clientId: "cl-0066", clientName: clients[65].name, messageType: "reconnection", date: "2026-02-27T10:00:00", status: "sent", phone: clients[65].phone, content: "Confirmacion: Su servicio de internet ha sido restaurado." },
]

// --- Automation Rules ---
export const automationRules: AutomationRule[] = [
  { id: "ar-1", name: "Recordatorio previo", description: "Enviar recordatorio WhatsApp 3 dias antes del vencimiento", enabled: true, triggerDays: -3, action: "send_whatsapp_reminder" },
  { id: "ar-2", name: "Aviso de vencimiento", description: "Enviar aviso el dia del vencimiento", enabled: true, triggerDays: 0, action: "send_whatsapp_warning" },
  { id: "ar-3", name: "Suspension automatica", description: "Suspender servicio 5 dias despues del vencimiento", enabled: true, triggerDays: 5, action: "suspend_service" },
  { id: "ar-4", name: "Notificacion de suspension", description: "Enviar notificacion de suspension por WhatsApp", enabled: true, triggerDays: 5, action: "send_suspension_notice" },
  { id: "ar-5", name: "Mensaje de reconexion", description: "Enviar confirmacion de reconexion automaticamente", enabled: true, triggerDays: 0, action: "send_reconnection_message" },
  { id: "ar-6", name: "Segundo recordatorio", description: "Enviar segundo recordatorio 1 dia antes del vencimiento", enabled: false, triggerDays: -1, action: "send_whatsapp_reminder" },
]

// --- Recent Activity ---
export const recentActivity: RecentActivity[] = [
  { id: "ra-1", type: "payment", description: "Pago recibido - Transferencia SPEI", timestamp: "2026-03-01T09:15:00", client: clients[0].name, amount: 399 },
  { id: "ra-2", type: "payment", description: "Pago recibido - Efectivo en sucursal", timestamp: "2026-03-01T09:00:00", client: clients[12].name, amount: 599 },
  { id: "ra-3", type: "suspension", description: "Servicio suspendido por falta de pago", timestamp: "2026-03-01T08:45:00", client: clients[4].name },
  { id: "ra-4", type: "whatsapp", description: "Recordatorio de pago enviado", timestamp: "2026-03-01T08:30:00", client: clients[20].name },
  { id: "ra-5", type: "payment", description: "Pago recibido - OXXO", timestamp: "2026-03-01T08:15:00", client: clients[7].name, amount: 449 },
  { id: "ra-6", type: "reconnection", description: "Servicio reactivado tras pago", timestamp: "2026-03-01T08:00:00", client: clients[15].name },
  { id: "ra-7", type: "whatsapp", description: "Notificacion de suspension enviada", timestamp: "2026-03-01T07:45:00", client: clients[33].name },
  { id: "ra-8", type: "payment", description: "Pago recibido - Tarjeta de credito", timestamp: "2026-03-01T07:30:00", client: clients[42].name, amount: 899 },
  { id: "ra-9", type: "suspension", description: "Servicio suspendido automaticamente", timestamp: "2026-03-01T07:15:00", client: clients[18].name },
  { id: "ra-10", type: "whatsapp", description: "Recordatorio masivo enviado (45 clientes)", timestamp: "2026-03-01T07:00:00" },
]

// --- PPPoE Sessions ---
export const pppoeSessions: PPPoESession[] = clients.filter(c => c.connectionType === "pppoe").slice(0, 20).map((c, i) => ({
  clientId: c.id,
  username: c.pppoeUser || "",
  status: c.status === "active" ? "active" : "disconnected",
  profile: c.plan,
  uptime: c.status === "active" ? `${Math.floor(seededRandom(i * 11) * 48) + 1}h ${Math.floor(seededRandom(i * 13) * 59)}m` : "0h 0m",
  ipAddress: c.ipAddress,
  macAddress: `AA:BB:CC:${String(Math.floor(seededRandom(i * 17) * 255)).padStart(2, "0")}:${String(Math.floor(seededRandom(i * 19) * 255)).padStart(2, "0")}:${String(Math.floor(seededRandom(i * 23) * 255)).padStart(2, "0")}`,
  bytesIn: Math.floor(seededRandom(i * 29) * 5000000000),
  bytesOut: Math.floor(seededRandom(i * 31) * 1000000000),
}))

// --- Chart Data ---
export const revenueData: RevenueDataPoint[] = [
  { month: "Sep", revenue: 185000, collected: 172000 },
  { month: "Oct", revenue: 192000, collected: 180000 },
  { month: "Nov", revenue: 198000, collected: 185000 },
  { month: "Dec", revenue: 205000, collected: 195000 },
  { month: "Ene", revenue: 210000, collected: 198000 },
  { month: "Feb", revenue: 218000, collected: 206000 },
  { month: "Mar", revenue: 225000, collected: 212000 },
]

export const clientGrowthData: ClientGrowthPoint[] = [
  { month: "Sep", clients: 410, newClients: 18 },
  { month: "Oct", clients: 425, newClients: 15 },
  { month: "Nov", clients: 438, newClients: 13 },
  { month: "Dec", clients: 452, newClients: 14 },
  { month: "Ene", clients: 468, newClients: 16 },
  { month: "Feb", clients: 485, newClients: 17 },
  { month: "Mar", clients: 500, newClients: 15 },
]

export const trafficData: TrafficDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, "0")}:00`,
  download: Math.floor(seededRandom(i * 37) * 800 + 200),
  upload: Math.floor(seededRandom(i * 41) * 200 + 50),
}))

// --- KPI Calculations ---
export const kpis = {
  totalActiveClients: clients.filter(c => c.status === "active").length,
  suspendedClients: clients.filter(c => c.status === "suspended").length,
  pendingPaymentClients: clients.filter(c => c.status === "pending_payment").length,
  monthlyRevenue: 225000,
  devicesOnline: devices.filter(d => d.status === "online").length,
  devicesOffline: devices.filter(d => d.status === "offline").length,
  todayCollections: 48750,
  upcomingCutoffs: clients.filter(c => {
    const due = new Date(c.dueDate)
    const now = new Date("2026-03-01")
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 5 && c.status !== "active"
  }).length,
}

export type { Client as ClientType }
