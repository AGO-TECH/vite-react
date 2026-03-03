"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Server, Wifi, WifiOff, Plug, Unplug, Activity, User,
  ArrowDownToLine, ArrowUpFromLine, Timer, Shield, Search,
  CheckCircle2, XCircle, AlertTriangle, Settings2, Terminal,
  Network, Router, Gauge, ToggleLeft, ToggleRight
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/components/shared/status-badge"
import { pppoeSessions, clients, servicePlans } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function PPPoETab() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = pppoeSessions.filter((s) => {
    if (search && !s.username.toLowerCase().includes(search.toLowerCase()) && !s.ipAddress.includes(search)) return false
    if (statusFilter !== "all" && s.status !== statusFilter) return false
    return true
  })

  const activeSessions = pppoeSessions.filter((s) => s.status === "active").length
  const totalSessions = pppoeSessions.length

  return (
    <div className="flex flex-col gap-4">
      {/* PPPoE Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Network className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Sesiones Totales</p>
            <p className="text-lg font-bold text-foreground">{totalSessions}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
            <Plug className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Activas</p>
            <p className="text-lg font-bold text-success">{activeSessions}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15">
            <Unplug className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Desconectadas</p>
            <p className="text-lg font-bold text-destructive">{totalSessions - activeSessions}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
            <Activity className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Trafico Total</p>
            <p className="text-lg font-bold text-foreground">
              {formatBytes(pppoeSessions.reduce((a, s) => a + s.bytesIn + s.bytesOut, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por usuario o IP..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 border-border bg-secondary pl-9 text-xs" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[140px] border-border bg-secondary text-xs">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="disconnected">Desconectado</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">{filtered.length} sesiones</span>
      </div>

      {/* Sessions Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Usuario PPPoE</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Perfil</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">IP Asignada</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">MAC</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Uptime</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Descarga</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Subida</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((session) => (
              <TableRow key={session.clientId} className={cn("border-border transition-colors hover:bg-accent/50", session.status === "disconnected" && "opacity-60")}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      session.status === "active" ? "bg-success/15" : "bg-destructive/15"
                    )}>
                      <User className={cn("h-3 w-3", session.status === "active" ? "text-success" : "text-destructive")} />
                    </div>
                    <span className="font-mono text-xs font-medium text-foreground">{session.username}</span>
                  </div>
                </TableCell>
                <TableCell><StatusBadge status={session.status} /></TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">{session.profile}</Badge>
                </TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{session.ipAddress}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{session.macAddress}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3 w-3 text-muted-foreground" />
                    <span className="font-mono text-[11px] text-muted-foreground">{session.uptime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <ArrowDownToLine className="h-3 w-3 text-primary" />
                    <span className="font-mono text-[11px] text-foreground">{formatBytes(session.bytesIn)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <ArrowUpFromLine className="h-3 w-3 text-chart-2" />
                    <span className="font-mono text-[11px] text-foreground">{formatBytes(session.bytesOut)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 text-[11px]">
                          <Terminal className="mr-1 h-3 w-3" /> Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-sm">Sesion PPPoE: {session.username}</DialogTitle>
                          <DialogDescription className="text-xs text-muted-foreground">
                            Detalles de la sesion y controles de servicio
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-3">
                              <span className="text-[10px] text-muted-foreground">Estado PPPoE</span>
                              <StatusBadge status={session.status} />
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-3">
                              <span className="text-[10px] text-muted-foreground">Sesion Activa</span>
                              <span className="text-sm font-bold text-foreground">{session.status === "active" ? "Si" : "No"}</span>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-3">
                              <span className="text-[10px] text-muted-foreground">Perfil Asignado</span>
                              <span className="text-sm font-bold text-foreground">{session.profile}</span>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-3">
                              <span className="text-[10px] text-muted-foreground">MAC Address</span>
                              <span className="font-mono text-xs text-foreground">{session.macAddress}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="destructive" size="sm" className="h-8 flex-1 text-xs" disabled={session.status === "disconnected"}>
                              <Unplug className="mr-1.5 h-3.5 w-3.5" /> Desconectar Sesion
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 flex-1 border-border text-xs" disabled={session.status === "active"}>
                              <Plug className="mr-1.5 h-3.5 w-3.5" /> Reconectar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {session.status === "active" && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <Unplug className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function QueueManagementTab() {
  const queueClients = clients.filter((c) => c.connectionType === "pppoe").slice(0, 15)

  return (
    <div className="flex flex-col gap-4">
      {/* Queue Summary */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Gauge className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Simple Queues Activas</p>
            <p className="text-lg font-bold text-foreground">{queueClients.filter((c) => c.status === "active").length}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
            <ToggleLeft className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Queues Deshabilitadas</p>
            <p className="text-lg font-bold text-warning">{queueClients.filter((c) => c.status !== "active").length}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
            <Router className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Perfiles de Velocidad</p>
            <p className="text-lg font-bold text-foreground">{servicePlans.length}</p>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">IP Target</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Plan</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Max Limit</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado Queue</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueClients.map((client) => {
              const plan = servicePlans.find((p) => p.id === client.planId)
              const queueEnabled = client.status === "active"
              return (
                <TableRow key={client.id} className={cn("border-border transition-colors hover:bg-accent/50", !queueEnabled && "opacity-60")}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-foreground">{client.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{client.pppoeUser}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{client.ipAddress}/32</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">{plan?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <ArrowDownToLine className="h-3 w-3 text-primary" />
                        <span className="font-mono text-[11px] text-foreground">{plan?.downloadSpeed}M</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">/</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpFromLine className="h-3 w-3 text-chart-2" />
                        <span className="font-mono text-[11px] text-foreground">{plan?.uploadSpeed}M</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {queueEnabled ? (
                        <Badge className="bg-success/15 text-success text-[10px]">
                          <ToggleRight className="mr-1 h-3 w-3" /> Habilitada
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/15 text-destructive text-[10px]">
                          <ToggleLeft className="mr-1 h-3 w-3" /> Deshabilitada
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {queueEnabled ? (
                        <Button variant="ghost" size="sm" className="h-7 text-[11px] text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <ToggleLeft className="mr-1 h-3 w-3" /> Deshabilitar
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-7 text-[11px] text-success hover:bg-success/10 hover:text-success">
                          <ToggleRight className="mr-1 h-3 w-3" /> Habilitar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function MikroTikIntegrationTab() {
  const [connected, setConnected] = useState(true)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Connection Config */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Conexion MikroTik API</h3>
            <div className="flex items-center gap-2">
              <span className={cn("relative flex h-2.5 w-2.5", connected && "animate-pulse")}>
                <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", connected ? "bg-success" : "bg-destructive")} />
                <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", connected ? "bg-success" : "bg-destructive")} />
              </span>
              <span className={cn("text-[11px] font-medium", connected ? "text-success" : "text-destructive")}>
                {connected ? "Conectado" : "Desconectado"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Router IP</Label>
              <Input value="10.0.1.1" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">Puerto API</Label>
                <Input value="8728" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">Puerto API-SSL</Label>
                <Input value="8729" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Usuario API</Label>
              <Input value="api_wisp_control" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Password</Label>
              <Input type="password" value="supersecretpass" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" className="h-8 text-xs">Guardar Configuracion</Button>
              <Button variant="outline" size="sm" className="h-8 border-border text-xs" onClick={() => setConnected(!connected)}>
                {connected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Router Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Informacion del Router</h3>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Modelo", value: "CCR1036-12G-4S" },
                { label: "RouterOS", value: "v7.14.3" },
                { label: "Architecture", value: "tile" },
                { label: "Board", value: "CCR1036-12G-4S" },
                { label: "CPU", value: "TLR4-00980 (36 cores)" },
                { label: "Uptime", value: "45d 12h 33m" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
                  <span className="text-[10px] text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-xs font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-secondary p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">CPU Load</span>
                <span className="font-mono text-[11px] text-foreground">28%</span>
              </div>
              <Progress value={28} className="h-1.5 [&>div]:bg-success" />
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-secondary p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Memory Used</span>
                <span className="font-mono text-[11px] text-foreground">512MB / 2048MB</span>
              </div>
              <Progress value={25} className="h-1.5 [&>div]:bg-primary" />
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-secondary p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">HDD Used</span>
                <span className="font-mono text-[11px] text-foreground">89MB / 512MB</span>
              </div>
              <Progress value={17} className="h-1.5 [&>div]:bg-chart-2" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Integration Capabilities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Capacidades de Integracion</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Network, label: "PPPoE Server", desc: "Gestion completa de sesiones PPPoE", active: true },
            { icon: Gauge, label: "Queue Management", desc: "Control de Simple Queues y Tree Queues", active: true },
            { icon: Shield, label: "Firewall Rules", desc: "Suspension via reglas de firewall", active: false },
            { icon: Router, label: "Hotspot", desc: "Integracion con Hotspot MikroTik", active: false },
          ].map((cap) => (
            <div key={cap.label} className={cn("flex flex-col gap-2 rounded-xl p-4", cap.active ? "bg-secondary" : "bg-secondary/50")}>
              <div className="flex items-center justify-between">
                <cap.icon className={cn("h-5 w-5", cap.active ? "text-primary" : "text-muted-foreground")} />
                <Badge className={cn("text-[9px]", cap.active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground")}>
                  {cap.active ? "Activo" : "Proximo"}
                </Badge>
              </div>
              <h4 className="text-xs font-semibold text-foreground">{cap.label}</h4>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{cap.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function ServiceControlPage() {
  return (
    <AppShell
      title="Control de Servicio"
      subtitle="MikroTik API, PPPoE y Queue Management"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Control de Servicio" }]}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs defaultValue="pppoe" className="flex flex-col gap-4">
          <TabsList className="w-fit bg-secondary">
            <TabsTrigger value="pppoe" className="text-xs">
              <Network className="mr-1.5 h-3.5 w-3.5" /> Sesiones PPPoE
            </TabsTrigger>
            <TabsTrigger value="queues" className="text-xs">
              <Gauge className="mr-1.5 h-3.5 w-3.5" /> Queue Management
            </TabsTrigger>
            <TabsTrigger value="mikrotik" className="text-xs">
              <Router className="mr-1.5 h-3.5 w-3.5" /> MikroTik API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pppoe"><PPPoETab /></TabsContent>
          <TabsContent value="queues"><QueueManagementTab /></TabsContent>
          <TabsContent value="mikrotik"><MikroTikIntegrationTab /></TabsContent>
        </Tabs>
      </motion.div>
    </AppShell>
  )
}
