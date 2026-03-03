"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-success/15 text-success border-success/30" },
  suspended: { label: "Suspendido", className: "bg-destructive/15 text-destructive border-destructive/30" },
  pending_payment: { label: "Pago Pendiente", className: "bg-warning/15 text-warning border-warning/30" },
  online: { label: "Online", className: "bg-success/15 text-success border-success/30" },
  offline: { label: "Offline", className: "bg-destructive/15 text-destructive border-destructive/30" },
  warning: { label: "Warning", className: "bg-warning/15 text-warning border-warning/30" },
  paid: { label: "Pagado", className: "bg-success/15 text-success border-success/30" },
  pending: { label: "Pendiente", className: "bg-warning/15 text-warning border-warning/30" },
  overdue: { label: "Vencido", className: "bg-destructive/15 text-destructive border-destructive/30" },
  sent: { label: "Enviado", className: "bg-primary/15 text-primary border-primary/30" },
  delivered: { label: "Entregado", className: "bg-success/15 text-success border-success/30" },
  failed: { label: "Fallido", className: "bg-destructive/15 text-destructive border-destructive/30" },
  critical: { label: "Critico", className: "bg-destructive/15 text-destructive border-destructive/30" },
  info: { label: "Info", className: "bg-primary/15 text-primary border-primary/30" },
  disconnected: { label: "Desconectado", className: "bg-muted text-muted-foreground border-muted" },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, className: "bg-secondary text-muted-foreground" }
  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold uppercase", config.className)}>
      {config.label}
    </Badge>
  )
}
