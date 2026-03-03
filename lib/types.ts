// ============================================
// WISP Control Pro - Core Type Definitions
// ============================================

export type UserRole = "super_admin" | "wisp_admin" | "billing_operator" | "noc_operator"
export type SubscriptionPlan = "basic" | "pro" | "enterprise"
export type ClientStatus = "active" | "suspended" | "pending_payment"
export type InvoiceStatus = "paid" | "pending" | "overdue"
export type DeviceStatus = "online" | "offline" | "warning"
export type AlertSeverity = "info" | "warning" | "critical"
export type MessageStatus = "sent" | "delivered" | "failed"
export type MessageType = "payment_reminder" | "suspension_notice" | "reconnection" | "promotional"
export type WhatsAppProvider = "meta" | "twilio" | "custom"

export interface Organization {
  id: string
  name: string
  logo?: string
  plan: SubscriptionPlan
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  organizationId: string
}

export interface Client {
  id: string
  name: string
  phone: string
  email: string
  plan: string
  planId: string
  ipAddress: string
  tower: string
  towerId: string
  status: ClientStatus
  dueDate: string
  balance: number
  signalStrength: number
  connectionType: "pppoe" | "static"
  pppoeUser?: string
  autoSuspend: boolean
  createdAt: string
  lastPayment?: string
}

export interface ServicePlan {
  id: string
  name: string
  downloadSpeed: number
  uploadSpeed: number
  monthlyPrice: number
  installationFee: number
  graceDays: number
  clientCount: number
}

export interface Invoice {
  id: string
  clientId: string
  clientName: string
  amount: number
  status: InvoiceStatus
  dueDate: string
  paidDate?: string
  paymentMethod?: string
  period: string
}

export interface Tower {
  id: string
  name: string
  location: string
  totalClients: number
  onlinePercent: number
  backhaulTraffic: number
  sectorLoad: number
  status: DeviceStatus
  lat?: number
  lng?: number
}

export interface Device {
  id: string
  name: string
  ip: string
  publicIp: string
  tower: string
  towerId: string
  status: DeviceStatus
  latency: number
  packetLoss: number
  cpu: number
  ram: number
  uptime: string
  type: "router" | "ap" | "switch" | "cpe"
}

export interface Alert {
  id: string
  type: "device_down" | "high_latency" | "high_cpu" | "client_offline"
  severity: AlertSeverity
  message: string
  device?: string
  timestamp: string
  acknowledged: boolean
}

export interface WhatsAppMessage {
  id: string
  clientId: string
  clientName: string
  messageType: MessageType
  date: string
  status: MessageStatus
  phone: string
  content: string
}

export interface AutomationRule {
  id: string
  name: string
  description: string
  enabled: boolean
  triggerDays: number
  action: string
}

export interface RecentActivity {
  id: string
  type: "payment" | "suspension" | "whatsapp" | "reconnection"
  description: string
  timestamp: string
  client?: string
  amount?: number
}

export interface PPPoESession {
  clientId: string
  username: string
  status: "active" | "disconnected"
  profile: string
  uptime: string
  ipAddress: string
  macAddress: string
  bytesIn: number
  bytesOut: number
}

export interface CompanySettings {
  name: string
  logo?: string
  billingCycleDay: number
  taxRate: number
  currency: string
  smtpHost: string
  smtpPort: number
  smtpUser: string
  whatsappProvider: WhatsAppProvider
  whatsappApiKey: string
  whatsappPhoneId: string
  stripePublicKey: string
  stripeSecretKey: string
}

// Chart data types
export interface RevenueDataPoint {
  month: string
  revenue: number
  collected: number
}

export interface ClientGrowthPoint {
  month: string
  clients: number
  newClients: number
}

export interface TrafficDataPoint {
  time: string
  download: number
  upload: number
}
