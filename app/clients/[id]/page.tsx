"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import {
  User, Phone, Mail, MapPin, Wifi, WifiOff, RotateCcw,
  MessageSquare, CreditCard, Clock, Signal, ToggleLeft,
  ToggleRight, History, DollarSign, Calendar, Globe, Shield
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/status-badge"
import { clients, servicePlans, invoices, whatsappMessages } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function InfoRow({ icon: Icon, label, value, className }: { icon: React.ElementType; label: string; value: string; className?: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="w-32 text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-xs font-medium text-foreground", className)}>{value}</span>
    </div>
  )
}

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const client = clients.find(c => c.id === id)
  if (!client) return notFound()

  const plan = servicePlans.find(p => p.id === client.planId)
  const clientInvoices = invoices.filter(inv => inv.clientId === client.id).slice(0, 10)
  const clientMessages = whatsappMessages.filter(m => m.clientId === client.id)

  // Mock billing history
  const billingHistory = [
    { period: "Marzo 2026", amount: plan?.monthlyPrice || 0, status: "pending", dueDate: client.dueDate },
    { period: "Febrero 2026", amount: plan?.monthlyPrice || 0, status: "paid", dueDate: "2026-02-15", paidDate: "2026-02-14" },
    { period: "Enero 2026", amount: plan?.monthlyPrice || 0, status: "paid", dueDate: "2026-01-15", paidDate: "2026-01-13" },
    { period: "Diciembre 2025", amount: plan?.monthlyPrice || 0, status: "paid", dueDate: "2025-12-15", paidDate: "2025-12-15" },
    { period: "Noviembre 2025", amount: plan?.monthlyPrice || 0, status: "paid", dueDate: "2025-11-15", paidDate: "2025-11-12" },
    { period: "Octubre 2025", amount: plan?.monthlyPrice || 0, status: "paid", dueDate: "2025-10-15", paidDate: "2025-10-14" },
  ]

  const suspensionHistory = [
    { date: "2025-09-20", reason: "Falta de pago", duration: "3 dias", resolvedDate: "2025-09-23" },
    { date: "2025-06-18", reason: "Falta de pago", duration: "5 dias", resolvedDate: "2025-06-23" },
  ]

  return (
    <AppShell
      title={client.name}
      subtitle={`${client.id} - ${client.plan}`}
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Clientes", href: "/clients" }, { label: client.name }]}
    >
      <div className="flex flex-col gap-6">
        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{client.name}</h2>
              <div className="flex items-center gap-2">
                <StatusBadge status={client.status} />
                <span className="text-xs text-muted-foreground">{client.plan} - {plan?.downloadSpeed}/{plan?.uploadSpeed} Mbps</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 border-border text-xs">
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Enviar WhatsApp
            </Button>
            {client.status === "active" ? (
              <Button variant="destructive" size="sm" className="h-8 text-xs">
                <WifiOff className="mr-1.5 h-3.5 w-3.5" />
                Suspender Servicio
              </Button>
            ) : (
              <Button size="sm" className="h-8 bg-success text-xs text-success-foreground hover:bg-success/90">
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Reactivar Servicio
              </Button>
            )}
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <h3 className="mb-3 text-sm font-semibold text-foreground">Informacion Personal</h3>
            <div className="flex flex-col divide-y divide-border">
              <InfoRow icon={User} label="Nombre" value={client.name} />
              <InfoRow icon={Phone} label="Telefono" value={client.phone} />
              <InfoRow icon={Mail} label="Email" value={client.email} />
              <InfoRow icon={MapPin} label="Torre" value={client.tower} />
              <InfoRow icon={Calendar} label="Cliente desde" value={client.createdAt} />
            </div>
          </motion.div>

          {/* Service Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-5"
          >
            <h3 className="mb-3 text-sm font-semibold text-foreground">Plan de Servicio</h3>
            <div className="flex flex-col divide-y divide-border">
              <InfoRow icon={Wifi} label="Plan" value={`${plan?.name} - ${plan?.downloadSpeed}/${plan?.uploadSpeed} Mbps`} />
              <InfoRow icon={Globe} label="IP" value={client.ipAddress} />
              <InfoRow icon={Shield} label="Tipo" value={client.connectionType === "pppoe" ? "PPPoE" : "IP Estatica"} />
              {client.pppoeUser && <InfoRow icon={User} label="Usuario PPPoE" value={client.pppoeUser} />}
              <InfoRow icon={Signal} label="Signal" value={`${client.signalStrength} dBm`} className={client.signalStrength >= -65 ? "text-success" : "text-warning"} />
              <InfoRow icon={DollarSign} label="Precio" value={`$${plan?.monthlyPrice?.toLocaleString()} MXN`} />
            </div>
          </motion.div>

          {/* Billing Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-5"
          >
            <h3 className="mb-3 text-sm font-semibold text-foreground">Resumen de Cuenta</h3>
            <div className="flex flex-col divide-y divide-border">
              <InfoRow icon={CreditCard} label="Saldo" value={`$${client.balance.toLocaleString()}`} className={client.balance > 0 ? "text-destructive" : "text-success"} />
              <InfoRow icon={Clock} label="Vencimiento" value={client.dueDate} />
              <InfoRow icon={History} label="Ultimo pago" value={client.lastPayment || "Sin registro"} />
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {client.autoSuspend ? <ToggleRight className="h-4 w-4 text-success" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                  <span className="text-xs text-muted-foreground">Suspension automatica</span>
                </div>
                <Switch checked={client.autoSuspend} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card rounded-2xl p-5"
        >
          <Tabs defaultValue="billing">
            <TabsList className="bg-secondary">
              <TabsTrigger value="billing" className="text-xs">Historial de Pagos</TabsTrigger>
              <TabsTrigger value="invoices" className="text-xs">Facturas</TabsTrigger>
              <TabsTrigger value="suspensions" className="text-xs">Suspensiones</TabsTrigger>
              <TabsTrigger value="whatsapp" className="text-xs">WhatsApp</TabsTrigger>
            </TabsList>

            <TabsContent value="billing" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Periodo</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Monto</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Estado</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Vencimiento</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Fecha de Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item, idx) => (
                    <TableRow key={idx} className="border-border">
                      <TableCell className="text-xs">{item.period}</TableCell>
                      <TableCell className="text-xs font-medium">${item.amount.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={item.status} /></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.dueDate}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.paidDate || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="invoices" className="mt-4">
              {clientInvoices.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Factura</TableHead>
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Monto</TableHead>
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Estado</TableHead>
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Metodo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientInvoices.map(inv => (
                      <TableRow key={inv.id} className="border-border">
                        <TableCell className="font-mono text-[11px]">{inv.id}</TableCell>
                        <TableCell className="text-xs font-medium">${inv.amount.toLocaleString()}</TableCell>
                        <TableCell><StatusBadge status={inv.status} /></TableCell>
                        <TableCell className="text-xs text-muted-foreground">{inv.paymentMethod || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-xs text-muted-foreground">Sin facturas registradas</p>
              )}
            </TabsContent>

            <TabsContent value="suspensions" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Fecha</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Motivo</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Duracion</TableHead>
                    <TableHead className="text-[11px] uppercase text-muted-foreground">Restaurado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suspensionHistory.map((item, idx) => (
                    <TableRow key={idx} className="border-border">
                      <TableCell className="text-xs">{item.date}</TableCell>
                      <TableCell className="text-xs">{item.reason}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.duration}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.resolvedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="whatsapp" className="mt-4">
              {clientMessages.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Tipo</TableHead>
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Mensaje</TableHead>
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Estado</TableHead>
                      <TableHead className="text-[11px] uppercase text-muted-foreground">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientMessages.map(msg => (
                      <TableRow key={msg.id} className="border-border">
                        <TableCell><Badge variant="secondary" className="text-[10px]">{msg.messageType.replace("_", " ")}</Badge></TableCell>
                        <TableCell className="max-w-xs truncate text-xs">{msg.content}</TableCell>
                        <TableCell><StatusBadge status={msg.status} /></TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(msg.date).toLocaleDateString("es-MX")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-xs text-muted-foreground">Sin mensajes registrados</p>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AppShell>
  )
}
