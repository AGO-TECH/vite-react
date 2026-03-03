"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search, Filter, ChevronLeft, ChevronRight, Eye, Signal,
  Phone, MoreHorizontal, WifiOff, RotateCcw, MessageSquare
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/shared/status-badge"
import { clients, towers, servicePlans } from "@/lib/mock-data"
import type { Client } from "@/lib/types"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 15

function getSignalColor(signal: number) {
  if (signal >= -55) return "text-success"
  if (signal >= -65) return "text-chart-2"
  if (signal >= -75) return "text-warning"
  return "text-destructive"
}

export function ClientsTable() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [towerFilter, setTowerFilter] = useState<string>("all")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.includes(search) && !c.phone.includes(search)) return false
      if (statusFilter !== "all" && c.status !== statusFilter) return false
      if (towerFilter !== "all" && c.towerId !== towerFilter) return false
      if (planFilter !== "all" && c.planId !== planFilter) return false
      return true
    })
  }, [search, statusFilter, towerFilter, planFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      {/* Filters */}
      <div className="glass-card flex flex-wrap items-center gap-3 rounded-2xl p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, ID o telefono..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            className="h-9 border-border bg-secondary pl-9 text-xs"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(0) }}>
          <SelectTrigger className="h-9 w-[160px] border-border bg-secondary text-xs">
            <Filter className="mr-2 h-3 w-3" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="suspended">Suspendido</SelectItem>
            <SelectItem value="pending_payment">Pago Pendiente</SelectItem>
          </SelectContent>
        </Select>
        <Select value={towerFilter} onValueChange={(v) => { setTowerFilter(v); setPage(0) }}>
          <SelectTrigger className="h-9 w-[160px] border-border bg-secondary text-xs">
            <SelectValue placeholder="Torre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las torres</SelectItem>
            {towers.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={(v) => { setPlanFilter(v); setPage(0) }}>
          <SelectTrigger className="h-9 w-[160px] border-border bg-secondary text-xs">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los planes</SelectItem>
            {servicePlans.slice(0, 15).map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{filtered.length} clientes</span>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">ID</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Telefono</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Plan</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">IP</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Torre</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Vencimiento</TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Saldo</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Signal</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((client: Client) => (
              <TableRow key={client.id} className="border-border transition-colors hover:bg-accent/50">
                <TableCell className="text-xs font-medium text-foreground">{client.name}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{client.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-success" />
                    <span className="text-[11px] text-muted-foreground">{client.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-foreground">{client.plan}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{client.ipAddress}</TableCell>
                <TableCell className="text-[11px] text-muted-foreground">{client.tower}</TableCell>
                <TableCell><StatusBadge status={client.status} /></TableCell>
                <TableCell className="text-[11px] text-muted-foreground">{client.dueDate}</TableCell>
                <TableCell className={cn("text-right text-xs font-medium", client.balance > 0 ? "text-destructive" : "text-success")}>
                  ${client.balance.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Signal className={cn("h-3 w-3", getSignalColor(client.signalStrength))} />
                    <span className={cn("text-[11px] font-mono", getSignalColor(client.signalStrength))}>{client.signalStrength}dBm</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/clients/${client.id}`}>
                          <Eye className="mr-2 h-3.5 w-3.5" /> Ver detalle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-3.5 w-3.5" /> Enviar WhatsApp
                      </DropdownMenuItem>
                      {client.status === "active" ? (
                        <DropdownMenuItem className="text-destructive">
                          <WifiOff className="mr-2 h-3.5 w-3.5" /> Suspender
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-success">
                          <RotateCcw className="mr-2 h-3.5 w-3.5" /> Reactivar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Mostrando {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filtered.length)} de {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground">Pagina {page + 1} de {totalPages}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
