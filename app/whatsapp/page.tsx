"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MessageSquare, Settings2, FileText, Send, Eye,
  Phone, CheckCircle2, XCircle, Clock, Smartphone, Key, Globe
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/shared/status-badge"
import { whatsappMessages } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const templates = [
  {
    id: "t1",
    name: "Recordatorio de pago",
    type: "payment_reminder",
    body: "Estimado {{nombre}}, le recordamos que su pago de ${{monto}} vence el {{fecha}}. Puede realizar su pago en cualquiera de nuestros puntos autorizados.",
  },
  {
    id: "t2",
    name: "Aviso de suspension",
    type: "suspension_notice",
    body: "Estimado {{nombre}}, su servicio de internet ha sido suspendido por falta de pago. Para reactivar su servicio, por favor realice su pago de ${{monto}}. Contactenos al {{telefono_soporte}}.",
  },
  {
    id: "t3",
    name: "Confirmacion de reconexion",
    type: "reconnection",
    body: "Estimado {{nombre}}, su servicio de internet ha sido reactivado exitosamente. Gracias por su pago. Si tiene alguna pregunta, no dude en contactarnos.",
  },
  {
    id: "t4",
    name: "Mensaje promocional",
    type: "promotional",
    body: "Estimado {{nombre}}, tenemos una oferta especial para usted. Actualice su plan a {{plan_nuevo}} por solo ${{precio_nuevo}}/mes. Contactenos para mas informacion.",
  },
]

function ConfigTab() {
  const [provider, setProvider] = useState("meta")

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Provider Config */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-5"
        >
          <h3 className="mb-4 text-sm font-semibold text-foreground">Proveedor de WhatsApp API</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Proveedor</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className="h-9 border-border bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta">
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5" /> Meta WhatsApp Cloud API
                    </div>
                  </SelectItem>
                  <SelectItem value="twilio">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" /> Twilio
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-3.5 w-3.5" /> API Personalizada
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">
                <Key className="mr-1 inline h-3 w-3" /> API Key
              </Label>
              <Input type="password" value="sk-xxxx-xxxx-xxxx-xxxx" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">
                <Smartphone className="mr-1 inline h-3 w-3" /> Phone Number ID
              </Label>
              <Input value="1234567890" className="h-9 border-border bg-secondary font-mono text-xs" readOnly />
            </div>
            <Button size="sm" className="h-8 w-fit text-xs">Guardar Configuracion</Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5"
        >
          <h3 className="mb-4 text-sm font-semibold text-foreground">Estadisticas de Mensajes</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4 text-primary" />
                <span className="text-[11px] text-muted-foreground">Enviados hoy</span>
              </div>
              <span className="text-xl font-bold text-foreground">47</span>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-[11px] text-muted-foreground">Entregados</span>
              </div>
              <span className="text-xl font-bold text-success">43</span>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-[11px] text-muted-foreground">Fallidos</span>
              </div>
              <span className="text-xl font-bold text-destructive">2</span>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-[11px] text-muted-foreground">Pendientes</span>
              </div>
              <span className="text-xl font-bold text-warning">2</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TemplatesTab() {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Plantillas de Mensaje</h3>
        <Button size="sm" className="h-8 text-xs">Nueva Plantilla</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {templates.map((tpl) => (
          <motion.div
            key={tpl.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">{tpl.name}</h4>
              </div>
              <Badge variant="secondary" className="text-[9px] uppercase">{tpl.type.replace("_", " ")}</Badge>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{tpl.body}</p>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 border-border text-[11px]">
                    <Eye className="mr-1 h-3 w-3" /> Vista previa
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-sm">Vista previa: {tpl.name}</DialogTitle>
                  </DialogHeader>
                  <div className="rounded-xl bg-success/10 p-4">
                    <div className="rounded-lg bg-card p-3">
                      <p className="text-xs leading-relaxed text-foreground">
                        {tpl.body
                          .replace("{{nombre}}", "Carlos Garcia Martinez")
                          .replace("{{monto}}", "399")
                          .replace("{{fecha}}", "5 de marzo")
                          .replace("{{telefono_soporte}}", "55 1234 5678")
                          .replace("{{plan_nuevo}}", "Ultra 100")
                          .replace("{{precio_nuevo}}", "899")}
                      </p>
                    </div>
                    <p className="mt-2 text-right text-[10px] text-muted-foreground">09:00 AM</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" className="h-7 text-[11px]">Editar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function MessageLogTab() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Telefono</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Mensaje</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {whatsappMessages.map((msg) => (
            <TableRow key={msg.id} className="border-border transition-colors hover:bg-accent/50">
              <TableCell className="text-xs font-medium text-foreground">{msg.clientName}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{msg.phone}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-[9px] uppercase">
                  {msg.messageType.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate text-xs text-muted-foreground">{msg.content}</TableCell>
              <TableCell><StatusBadge status={msg.status} /></TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(msg.date).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function WhatsAppPage() {
  return (
    <AppShell
      title="WhatsApp"
      subtitle="Notificaciones y mensajeria"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "WhatsApp" }]}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="log" className="flex flex-col gap-4">
          <TabsList className="w-fit bg-secondary">
            <TabsTrigger value="log" className="text-xs">
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Registro de Mensajes
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-xs">
              <FileText className="mr-1.5 h-3.5 w-3.5" /> Plantillas
            </TabsTrigger>
            <TabsTrigger value="config" className="text-xs">
              <Settings2 className="mr-1.5 h-3.5 w-3.5" /> Configuracion
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log"><MessageLogTab /></TabsContent>
          <TabsContent value="templates"><TemplatesTab /></TabsContent>
          <TabsContent value="config"><ConfigTab /></TabsContent>
        </Tabs>
      </motion.div>
    </AppShell>
  )
}
