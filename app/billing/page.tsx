"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign, Zap, FileText, Settings2, ChevronLeft, ChevronRight,
  Search, Download, Upload, Clock, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/shared/status-badge"
import { servicePlans, invoices, automationRules } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function PlansTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Planes de Servicio ({servicePlans.length})</h3>
        <Button size="sm" className="h-8 text-xs">Agregar Plan</Button>
      </div>
      <div className="glass-card overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Plan</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Velocidad</TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Precio Mensual</TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Instalacion</TableHead>
              <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Dias de Gracia</TableHead>
              <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Clientes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicePlans.map((plan) => (
              <TableRow key={plan.id} className="border-border transition-colors hover:bg-accent/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{plan.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      <Download className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-foreground">{plan.downloadSpeed}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">/</span>
                    <div className="flex items-center gap-0.5">
                      <Upload className="h-3 w-3 text-chart-2" />
                      <span className="text-xs font-medium text-foreground">{plan.uploadSpeed}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Mbps</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs font-bold text-foreground">${plan.monthlyPrice.toLocaleString()}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">${plan.installationFee.toLocaleString()}</TableCell>
                <TableCell className="text-center text-xs text-muted-foreground">{plan.graceDays}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="text-[10px]">{plan.clientCount}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function InvoicesTab() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 15

  const filtered = invoices.filter((inv) => {
    if (search && !inv.clientName.toLowerCase().includes(search.toLowerCase()) && !inv.id.includes(search)) return false
    if (statusFilter !== "all" && inv.status !== statusFilter) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0)
  const totalPending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0)
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0)

  return (
    <div className="flex flex-col gap-4">
      {/* Invoice KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Pagadas</p>
            <p className="text-lg font-bold text-success">${totalPaid.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
            <Clock className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Pendientes</p>
            <p className="text-lg font-bold text-warning">${totalPending.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Vencidas</p>
            <p className="text-lg font-bold text-destructive">${totalOverdue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar factura..." value={search} onChange={e => { setSearch(e.target.value); setPage(0) }} className="h-9 border-border bg-secondary pl-9 text-xs" />
        </div>
        <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(0) }}>
          <SelectTrigger className="h-9 w-[160px] border-border bg-secondary text-xs">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="paid">Pagadas</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="overdue">Vencidas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoices Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Factura</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Monto</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Vencimiento</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Periodo</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Metodo</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((inv) => (
              <TableRow key={inv.id} className="border-border transition-colors hover:bg-accent/50">
                <TableCell className="font-mono text-[11px] text-muted-foreground">{inv.id}</TableCell>
                <TableCell className="text-xs font-medium text-foreground">{inv.clientName}</TableCell>
                <TableCell className="text-right text-xs font-bold text-foreground">${inv.amount.toLocaleString()}</TableCell>
                <TableCell><StatusBadge status={inv.status} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{inv.dueDate}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{inv.period}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{inv.paymentMethod || "-"}</TableCell>
                <TableCell>
                  {inv.status !== "paid" && (
                    <Button variant="ghost" size="sm" className="h-7 text-[11px] text-success">
                      Marcar pagada
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <span className="text-xs text-muted-foreground">
            {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filtered.length)} de {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground">{page + 1} / {totalPages}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AutomationTab() {
  const [rules, setRules] = useState(automationRules)

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Reglas de Automatizacion</h3>
          <p className="text-[11px] text-muted-foreground">Configura acciones automaticas de facturacion y suspension</p>
        </div>
        <Button size="sm" className="h-8 text-xs">Nueva Regla</Button>
      </div>
      <div className="flex flex-col gap-3">
        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "glass-card flex items-center justify-between rounded-2xl p-4 transition-all",
              !rule.enabled && "opacity-60"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                rule.enabled ? "bg-primary/15" : "bg-secondary"
              )}>
                {rule.enabled ? (
                  <ToggleRight className="h-5 w-5 text-primary" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{rule.name}</h4>
                <p className="text-[11px] text-muted-foreground">{rule.description}</p>
                <Badge variant="secondary" className="mt-1 text-[9px]">
                  {rule.triggerDays < 0 ? `${Math.abs(rule.triggerDays)} dias antes` : rule.triggerDays === 0 ? "En la fecha" : `${rule.triggerDays} dias despues`}
                </Badge>
              </div>
            </div>
            <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function BillingPage() {
  return (
    <AppShell
      title="Facturacion"
      subtitle="Planes, facturas y automatizacion"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Facturacion" }]}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="invoices" className="flex flex-col gap-4">
          <TabsList className="w-fit bg-secondary">
            <TabsTrigger value="invoices" className="text-xs">
              <FileText className="mr-1.5 h-3.5 w-3.5" /> Facturas
            </TabsTrigger>
            <TabsTrigger value="plans" className="text-xs">
              <DollarSign className="mr-1.5 h-3.5 w-3.5" /> Planes
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-xs">
              <Settings2 className="mr-1.5 h-3.5 w-3.5" /> Automatizacion
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices"><InvoicesTab /></TabsContent>
          <TabsContent value="plans"><PlansTab /></TabsContent>
          <TabsContent value="automation"><AutomationTab /></TabsContent>
        </Tabs>
      </motion.div>
    </AppShell>
  )
}
