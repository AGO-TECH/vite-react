"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2, ImageIcon, Calendar, Calculator, Mail, MessageSquare,
  CreditCard, Save, Upload, Globe, Server, Shield, Key,
  Users, Bell, Database, Palette
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

function SettingSection({ title, description, icon: Icon, children }: {
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

function CompanyTab() {
  return (
    <div className="flex flex-col gap-6">
      <SettingSection
        title="Informacion de la Empresa"
        description="Datos principales de tu organizacion"
        icon={Building2}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Nombre de la Empresa</Label>
              <Input defaultValue="NetVision ISP" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">RFC</Label>
              <Input defaultValue="NVI230115ABC" className="h-9 border-border bg-secondary font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Direccion</Label>
              <Input defaultValue="Av. Tecnologico #1250, Col. Centro" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Ciudad / Estado</Label>
              <Input defaultValue="Guadalajara, Jalisco" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Telefono</Label>
              <Input defaultValue="+52 33 1234 5678" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Email de Contacto</Label>
              <Input defaultValue="soporte@netvision.mx" className="h-9 border-border bg-secondary text-xs" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">Sitio Web</Label>
            <Input defaultValue="https://www.netvision.mx" className="h-9 border-border bg-secondary text-xs" />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Logo de la Empresa"
        description="Logotipo utilizado en facturas y comunicaciones"
        icon={ImageIcon}
      >
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary">
            <div className="flex flex-col items-center gap-1">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Logo</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="h-8 border-border text-xs">
              <Upload className="mr-1.5 h-3.5 w-3.5" /> Subir Logo
            </Button>
            <p className="text-[11px] text-muted-foreground">PNG, JPG o SVG. Max 2MB. Recomendado 512x512px.</p>
          </div>
        </div>
      </SettingSection>
    </div>
  )
}

function BillingConfigTab() {
  return (
    <div className="flex flex-col gap-6">
      <SettingSection
        title="Ciclo de Facturacion"
        description="Configuracion del periodo de cobro"
        icon={Calendar}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Dia de Facturacion</Label>
              <Select defaultValue="1">
                <SelectTrigger className="h-9 border-border bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>Dia {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Dias de Gracia</Label>
              <Input type="number" defaultValue="5" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Dias para Suspension</Label>
              <Input type="number" defaultValue="10" className="h-9 border-border bg-secondary text-xs" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-xs font-medium text-foreground">Facturacion Automatica</p>
              <p className="text-[11px] text-muted-foreground">Generar facturas automaticamente cada mes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-xs font-medium text-foreground">Suspension Automatica</p>
              <p className="text-[11px] text-muted-foreground">Suspender servicio automaticamente despues de X dias</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Impuestos"
        description="Configuracion de impuestos aplicables"
        icon={Calculator}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">IVA (%)</Label>
              <Input type="number" defaultValue="16" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Moneda</Label>
              <Select defaultValue="MXN">
                <SelectTrigger className="h-9 border-border bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                  <SelectItem value="USD">USD - Dolar Americano</SelectItem>
                  <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Formato de Factura</Label>
              <Select defaultValue="cfdi">
                <SelectTrigger className="h-9 border-border bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cfdi">CFDI 4.0</SelectItem>
                  <SelectItem value="simple">Recibo Simple</SelectItem>
                  <SelectItem value="nota">Nota de Venta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-xs font-medium text-foreground">Incluir IVA en precio</p>
              <p className="text-[11px] text-muted-foreground">Los precios de los planes ya incluyen IVA</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </SettingSection>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="flex flex-col gap-6">
      <SettingSection
        title="Configuracion SMTP"
        description="Servidor de correo para envio de notificaciones"
        icon={Mail}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">SMTP Host</Label>
              <Input defaultValue="smtp.gmail.com" className="h-9 border-border bg-secondary font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">SMTP Puerto</Label>
              <Input type="number" defaultValue="587" className="h-9 border-border bg-secondary font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Usuario SMTP</Label>
              <Input defaultValue="notificaciones@netvision.mx" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Password SMTP</Label>
              <Input type="password" defaultValue="app-password-xxxx" className="h-9 border-border bg-secondary text-xs" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Nombre Remitente</Label>
              <Input defaultValue="NetVision ISP" className="h-9 border-border bg-secondary text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Encriptacion</Label>
              <Select defaultValue="tls">
                <SelectTrigger className="h-9 border-border bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">Ninguna</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="h-8 text-xs">
              <Save className="mr-1.5 h-3.5 w-3.5" /> Guardar
            </Button>
            <Button variant="outline" size="sm" className="h-8 border-border text-xs">Enviar correo de prueba</Button>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="WhatsApp API"
        description="Configuracion del proveedor de WhatsApp Business"
        icon={MessageSquare}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Proveedor</Label>
              <Select defaultValue="meta">
                <SelectTrigger className="h-9 border-border bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta">Meta WhatsApp Cloud API</SelectItem>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="custom">API Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Phone Number ID</Label>
              <Input defaultValue="1234567890" className="h-9 border-border bg-secondary font-mono text-xs" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">
              <Key className="mr-1 inline h-3 w-3" /> API Token
            </Label>
            <Input type="password" defaultValue="EAAxxxxxxxxxxxxxxxxx" className="h-9 border-border bg-secondary font-mono text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">Webhook URL</Label>
            <div className="flex gap-2">
              <Input defaultValue="https://api.wispcontrolpro.com/webhooks/whatsapp" className="h-9 flex-1 border-border bg-secondary font-mono text-xs" readOnly />
              <Button variant="outline" size="sm" className="h-9 border-border text-xs">Copiar</Button>
            </div>
          </div>
          <Button size="sm" className="h-8 w-fit text-xs">
            <Save className="mr-1.5 h-3.5 w-3.5" /> Guardar
          </Button>
        </div>
      </SettingSection>
    </div>
  )
}

function PaymentGatewayTab() {
  return (
    <div className="flex flex-col gap-6">
      <SettingSection
        title="Stripe"
        description="Pasarela de pago para cobros en linea"
        icon={CreditCard}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/15">
                <CreditCard className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Stripe Payments</p>
                <p className="text-[11px] text-muted-foreground">Acepta tarjetas de credito y debito</p>
              </div>
            </div>
            <Badge className="bg-warning/15 text-warning text-[10px]">Pendiente Configuracion</Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">
                <Key className="mr-1 inline h-3 w-3" /> Publishable Key
              </Label>
              <Input placeholder="pk_live_xxxxx" className="h-9 border-border bg-secondary font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">
                <Key className="mr-1 inline h-3 w-3" /> Secret Key
              </Label>
              <Input type="password" placeholder="sk_live_xxxxx" className="h-9 border-border bg-secondary font-mono text-xs" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">Webhook Secret</Label>
            <Input placeholder="whsec_xxxxx" className="h-9 border-border bg-secondary font-mono text-xs" />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-xs font-medium text-foreground">Modo de Prueba</p>
              <p className="text-[11px] text-muted-foreground">Utilizar claves de prueba de Stripe</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button size="sm" className="h-8 w-fit text-xs">
            <Save className="mr-1.5 h-3.5 w-3.5" /> Guardar Configuracion
          </Button>
        </div>
      </SettingSection>

      {/* Other payment methods */}
      <SettingSection
        title="Metodos de Pago Adicionales"
        description="Integraciones de pago locales"
        icon={Globe}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "OXXO Pay", desc: "Pagos en tiendas OXXO via Stripe", enabled: true },
            { name: "SPEI", desc: "Transferencia interbancaria", enabled: true },
            { name: "Efectivo", desc: "Registro manual de pagos en efectivo", enabled: true },
            { name: "PayPal", desc: "Pagos con PayPal", enabled: false },
            { name: "MercadoPago", desc: "Integracion con MercadoPago", enabled: false },
            { name: "OpenPay", desc: "Pagos con OpenPay", enabled: false },
          ].map((method) => (
            <div key={method.name} className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="text-xs font-medium text-foreground">{method.name}</p>
                <p className="text-[11px] text-muted-foreground">{method.desc}</p>
              </div>
              <Switch defaultChecked={method.enabled} />
            </div>
          ))}
        </div>
      </SettingSection>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="flex flex-col gap-6">
      <SettingSection
        title="Roles y Permisos"
        description="Administracion de roles de acceso"
        icon={Shield}
      >
        <div className="flex flex-col gap-3">
          {[
            { role: "Super Admin", desc: "Acceso completo a todo el sistema y configuracion", perms: "Total", users: 1, color: "text-destructive" },
            { role: "WISP Admin", desc: "Gestion de clientes, facturacion y red", perms: "Alto", users: 2, color: "text-warning" },
            { role: "Billing Operator", desc: "Solo acceso a facturacion y pagos", perms: "Medio", users: 3, color: "text-primary" },
            { role: "NOC Operator", desc: "Solo acceso a monitoreo de red", perms: "Medio", users: 2, color: "text-chart-2" },
          ].map((r) => (
            <div key={r.role} className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <Shield className={cn("h-5 w-5", r.color)} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{r.role}</p>
                  <p className="text-[11px] text-muted-foreground">{r.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-[10px]">Nivel: {r.perms}</Badge>
                <Badge variant="secondary" className="text-[10px]">
                  <Users className="mr-1 h-2.5 w-2.5" /> {r.users}
                </Badge>
                <Button variant="ghost" size="sm" className="h-7 text-[11px]">Editar</Button>
              </div>
            </div>
          ))}
        </div>
      </SettingSection>

      <SettingSection
        title="Seguridad"
        description="Configuraciones de seguridad del sistema"
        icon={Key}
      >
        <div className="flex flex-col gap-3">
          {[
            { label: "Autenticacion de dos factores (2FA)", desc: "Requerir 2FA para todos los usuarios", enabled: false },
            { label: "Sesion expirable", desc: "Cerrar sesion automaticamente despues de 8 horas", enabled: true },
            { label: "Registro de auditoría", desc: "Registrar todas las acciones del sistema", enabled: true },
            { label: "Bloqueo por intentos fallidos", desc: "Bloquear cuenta despues de 5 intentos fallidos", enabled: true },
            { label: "Restriccion por IP", desc: "Limitar acceso al panel desde IPs especificas", enabled: false },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="text-xs font-medium text-foreground">{setting.label}</p>
                <p className="text-[11px] text-muted-foreground">{setting.desc}</p>
              </div>
              <Switch defaultChecked={setting.enabled} />
            </div>
          ))}
        </div>
      </SettingSection>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AppShell
      title="Configuracion"
      subtitle="Ajustes generales del sistema"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Configuracion" }]}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs defaultValue="company" className="flex flex-col gap-4">
          <TabsList className="w-fit bg-secondary">
            <TabsTrigger value="company" className="text-xs">
              <Building2 className="mr-1.5 h-3.5 w-3.5" /> Empresa
            </TabsTrigger>
            <TabsTrigger value="billing" className="text-xs">
              <Calendar className="mr-1.5 h-3.5 w-3.5" /> Facturacion
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">
              <Bell className="mr-1.5 h-3.5 w-3.5" /> Notificaciones
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs">
              <CreditCard className="mr-1.5 h-3.5 w-3.5" /> Pagos
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs">
              <Shield className="mr-1.5 h-3.5 w-3.5" /> Seguridad
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company"><CompanyTab /></TabsContent>
          <TabsContent value="billing"><BillingConfigTab /></TabsContent>
          <TabsContent value="notifications"><NotificationsTab /></TabsContent>
          <TabsContent value="payments"><PaymentGatewayTab /></TabsContent>
          <TabsContent value="security"><SecurityTab /></TabsContent>
        </Tabs>
      </motion.div>
    </AppShell>
  )
}
