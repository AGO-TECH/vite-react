"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard, Users, Receipt, MessageSquare, Radio,
  Server, Settings, ChevronDown, Shield, Wifi, Building2, Crown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { organizations, currentUser } from "@/lib/mock-data"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Clientes", href: "/clients", icon: Users },
  { label: "Facturacion", href: "/billing", icon: Receipt },
  { label: "WhatsApp", href: "/whatsapp", icon: MessageSquare },
  { label: "NOC / Red", href: "/noc", icon: Radio },
  { label: "Control de Servicio", href: "/service-control", icon: Server },
  { label: "Configuracion", href: "/settings", icon: Settings },
]

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  wisp_admin: "WISP Admin",
  billing_operator: "Facturacion",
  noc_operator: "NOC Operador",
}

const planColors: Record<string, string> = {
  basic: "bg-muted text-muted-foreground",
  pro: "bg-primary/20 text-primary",
  enterprise: "bg-chart-3/20 text-chart-3",
}

export function AppSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  const org = organizations[0]

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Wifi className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-sidebar-foreground">WISP Control</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-primary">Pro</span>
          </div>
        )}
      </div>

      {/* Organization Selector */}
      {!collapsed && (
        <div className="border-b border-sidebar-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-xl bg-sidebar-accent p-2.5 transition-colors hover:bg-sidebar-accent/80">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-1 flex-col items-start">
                  <span className="text-xs font-semibold text-sidebar-foreground">{org.name}</span>
                  <Badge variant="secondary" className={cn("mt-0.5 h-4 px-1.5 text-[9px] font-bold uppercase", planColors[org.plan])}>
                    <Crown className="mr-0.5 h-2.5 w-2.5" />
                    {org.plan}
                  </Badge>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[230px]">
              {organizations.map((o) => (
                <DropdownMenuItem key={o.id} className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{o.name}</span>
                  <Badge variant="secondary" className={cn("ml-auto h-4 px-1.5 text-[9px] uppercase", planColors[o.plan])}>
                    {o.plan}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-primary/20 text-xs font-bold text-primary">
              {currentUser.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-1 flex-col">
              <span className="text-xs font-semibold text-sidebar-foreground">{currentUser.name}</span>
              <div className="flex items-center gap-1">
                <Shield className="h-2.5 w-2.5 text-primary" />
                <span className="text-[10px] text-muted-foreground">{roleLabels[currentUser.role]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
