"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Radio, Server, AlertTriangle, Activity, Cpu, HardDrive,
  Clock, Signal, Wifi, WifiOff, ChevronRight, Search,
  CheckCircle2, XCircle, ArrowUpDown, TowerControl
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/shared/status-badge"
import { devices, towers, alerts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function DevicesTab() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [towerFilter, setTowerFilter] = useState("all")

  const filtered = useMemo(() => {
    return devices.filter(d => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.ip.includes(search)) return false
      if (statusFilter !== "all" && d.status !== statusFilter) return false
      if (towerFilter !== "all" && d.towerId !== towerFilter) return false
      return true
    })
  }, [search, statusFilter, towerFilter])

  return (
    <div className="flex flex-col gap-4">
      {/* Device Summary */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Total Dispositivos</p>
            <p className="text-lg font-bold text-foreground">{devices.length}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
            <Wifi className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Online</p>
            <p className="text-lg font-bold text-success">{devices.filter(d => d.status === "online").length}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15">
            <WifiOff className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Offline</p>
            <p className="text-lg font-bold text-destructive">{devices.filter(d => d.status === "offline").length}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Alertas Activas</p>
            <p className="text-lg font-bold text-warning">{alerts.filter(a => !a.acknowledged).length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar dispositivo..." value={search} onChange={e => setSearch(e.target.value)} className="h-9 border-border bg-secondary pl-9 text-xs" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[140px] border-border bg-secondary text-xs">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Select value={towerFilter} onValueChange={setTowerFilter}>
          <SelectTrigger className="h-9 w-[160px] border-border bg-secondary text-xs">
            <SelectValue placeholder="Torre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las torres</SelectItem>
            {towers.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">{filtered.length} dispositivos</span>
      </div>

      {/* Devices Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Dispositivo</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">IP</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">IP Publica</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Torre</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Latencia</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pkt Loss</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">CPU</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">RAM</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Uptime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((dev) => (
              <TableRow key={dev.id} className={cn("border-border transition-colors hover:bg-accent/50", dev.status === "offline" && "opacity-60")}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      dev.status === "online" ? "bg-success/15" : "bg-destructive/15"
                    )}>
                      <Server className={cn("h-3 w-3", dev.status === "online" ? "text-success" : "text-destructive")} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-foreground">{dev.name}</span>
                      <Badge variant="secondary" className="ml-2 text-[8px] uppercase">{dev.type}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{dev.ip}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{dev.publicIp}</TableCell>
                <TableCell className="text-[11px] text-muted-foreground">{dev.tower}</TableCell>
                <TableCell><StatusBadge status={dev.status} /></TableCell>
                <TableCell>
                  <span className={cn(
                    "font-mono text-[11px]",
                    dev.latency === 0 ? "text-muted-foreground" : dev.latency < 10 ? "text-success" : dev.latency < 20 ? "text-warning" : "text-destructive"
                  )}>
                    {dev.latency}ms
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "font-mono text-[11px]",
                    dev.packetLoss < 1 ? "text-success" : dev.packetLoss < 3 ? "text-warning" : "text-destructive"
                  )}>
                    {dev.packetLoss.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={dev.cpu}
                      className={cn("h-1.5 w-12", dev.cpu > 80 ? "[&>div]:bg-destructive" : dev.cpu > 60 ? "[&>div]:bg-warning" : "[&>div]:bg-success")}
                    />
                    <span className="font-mono text-[11px] text-muted-foreground">{dev.cpu}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={dev.ram}
                      className={cn("h-1.5 w-12", dev.ram > 80 ? "[&>div]:bg-destructive" : dev.ram > 60 ? "[&>div]:bg-warning" : "[&>div]:bg-primary")}
                    />
                    <span className="font-mono text-[11px] text-muted-foreground">{dev.ram}%</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{dev.uptime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function TowersTab() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {towers.map((tower, idx) => (
        <motion.div
          key={tower.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className={cn(
            "glass-card rounded-2xl p-5",
            tower.status === "offline" && "border border-destructive/30"
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                tower.status === "online" ? "bg-success/15" : tower.status === "warning" ? "bg-warning/15" : "bg-destructive/15"
              )}>
                <Radio className={cn(
                  "h-5 w-5",
                  tower.status === "online" ? "text-success" : tower.status === "warning" ? "text-warning" : "text-destructive"
                )} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{tower.name}</h4>
                <p className="text-[11px] text-muted-foreground">{tower.location}</p>
              </div>
            </div>
            <StatusBadge status={tower.status} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="text-[10px] text-muted-foreground">Clientes</span>
              <span className="text-sm font-bold text-foreground">{tower.totalClients}</span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="text-[10px] text-muted-foreground">Online</span>
              <span className={cn("text-sm font-bold", tower.onlinePercent >= 90 ? "text-success" : "text-warning")}>{tower.onlinePercent}%</span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="text-[10px] text-muted-foreground">Backhaul</span>
              <span className="text-sm font-bold text-foreground">{tower.backhaulTraffic} Mbps</span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="text-[10px] text-muted-foreground">Carga Sector</span>
              <div className="flex items-center gap-2">
                <Progress value={tower.sectorLoad} className="h-1.5 flex-1" />
                <span className="text-[11px] font-medium text-muted-foreground">{tower.sectorLoad}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function AlertsTab() {
  const severityOrder = { critical: 0, warning: 1, info: 2 }
  const sorted = [...alerts].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Badge className="bg-destructive/15 text-destructive">{alerts.filter(a => a.severity === "critical").length} Criticas</Badge>
        <Badge className="bg-warning/15 text-warning">{alerts.filter(a => a.severity === "warning").length} Advertencias</Badge>
        <Badge className="bg-primary/15 text-primary">{alerts.filter(a => a.severity === "info").length} Informativas</Badge>
      </div>
      <div className="flex flex-col gap-3">
        {sorted.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "glass-card flex items-start gap-4 rounded-2xl p-4",
              alert.severity === "critical" && "border border-destructive/30",
              alert.severity === "warning" && "border border-warning/30",
              alert.acknowledged && "opacity-60"
            )}
          >
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              alert.severity === "critical" ? "bg-destructive/15" : alert.severity === "warning" ? "bg-warning/15" : "bg-primary/15"
            )}>
              <AlertTriangle className={cn(
                "h-5 w-5",
                alert.severity === "critical" ? "text-destructive" : alert.severity === "warning" ? "text-warning" : "text-primary"
              )} />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <StatusBadge status={alert.severity} />
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
                </span>
                {alert.acknowledged && <Badge variant="secondary" className="text-[9px]">Reconocida</Badge>}
              </div>
              <p className="text-sm font-medium text-foreground">{alert.message}</p>
              {alert.device && <p className="text-[11px] text-muted-foreground">Dispositivo: {alert.device}</p>}
            </div>
            {!alert.acknowledged && (
              <Button variant="ghost" size="sm" className="h-7 shrink-0 text-[11px]">Reconocer</Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function NocPage() {
  return (
    <AppShell
      title="NOC / Red"
      subtitle="Monitoreo de red y dispositivos"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "NOC / Red" }]}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="devices" className="flex flex-col gap-4">
          <TabsList className="w-fit bg-secondary">
            <TabsTrigger value="devices" className="text-xs">
              <Server className="mr-1.5 h-3.5 w-3.5" /> Dispositivos
            </TabsTrigger>
            <TabsTrigger value="towers" className="text-xs">
              <Radio className="mr-1.5 h-3.5 w-3.5" /> Torres
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Alertas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices"><DevicesTab /></TabsContent>
          <TabsContent value="towers"><TowersTab /></TabsContent>
          <TabsContent value="alerts"><AlertsTab /></TabsContent>
        </Tabs>
      </motion.div>
    </AppShell>
  )
}
