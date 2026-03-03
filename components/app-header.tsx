"use client"

import { Bell, Search, Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { alerts } from "@/lib/mock-data"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const severityStyles: Record<string, string> = {
  critical: "bg-destructive/20 text-destructive",
  warning: "bg-warning/20 text-warning",
  info: "bg-primary/20 text-primary",
}

interface AppHeaderProps {
  title: string
  subtitle?: string
  onToggleSidebar: () => void
  onMobileMenu?: () => void
  breadcrumbs?: { label: string; href?: string }[]
}

export function AppHeader({ title, subtitle, onToggleSidebar, onMobileMenu, breadcrumbs }: AppHeaderProps) {
  const unacknowledged = alerts.filter(a => !a.acknowledged).length

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMobileMenu} className="h-8 w-8 text-muted-foreground lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              {breadcrumbs.map((bc, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-2.5 w-2.5" />}
                  <span className={i === breadcrumbs.length - 1 ? "text-foreground" : ""}>{bc.label}</span>
                </span>
              ))}
            </div>
          )}
          <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes, dispositivos..."
            className="h-9 w-64 border-border bg-secondary pl-9 text-xs"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unacknowledged > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                  {unacknowledged}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-semibold">Alertas</span>
              <Badge variant="secondary" className="text-[10px]">{unacknowledged} nuevas</Badge>
            </div>
            <DropdownMenuSeparator />
            {alerts.slice(0, 5).map((alert) => (
              <DropdownMenuItem key={alert.id} className="flex flex-col items-start gap-1 px-3 py-2">
                <div className="flex w-full items-center gap-2">
                  <Badge className={`h-4 px-1.5 text-[9px] font-bold uppercase ${severityStyles[alert.severity]}`}>
                    {alert.severity}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <span className="text-xs text-foreground">{alert.message}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status indicator */}
        <div className="hidden items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 lg:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">Sistema operativo</span>
        </div>
      </div>
    </header>
  )
}
