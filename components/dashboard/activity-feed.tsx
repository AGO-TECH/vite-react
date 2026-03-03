"use client"

import { motion } from "framer-motion"
import { DollarSign, WifiOff, MessageSquare, RotateCcw } from "lucide-react"
import { recentActivity } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const typeConfig = {
  payment: { icon: DollarSign, color: "text-success", bg: "bg-success/15" },
  suspension: { icon: WifiOff, color: "text-destructive", bg: "bg-destructive/15" },
  whatsapp: { icon: MessageSquare, color: "text-primary", bg: "bg-primary/15" },
  reconnection: { icon: RotateCcw, color: "text-chart-2", bg: "bg-chart-2/15" },
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Actividad Reciente</h3>
        <p className="text-[11px] text-muted-foreground">Ultimos eventos del sistema</p>
      </div>
      <div className="flex flex-col gap-3">
        {recentActivity.map((item) => {
          const config = typeConfig[item.type]
          const Icon = config.icon
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                <Icon className={cn("h-3.5 w-3.5", config.color)} />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-xs font-medium text-foreground">{item.description}</span>
                <div className="flex items-center gap-2">
                  {item.client && <span className="text-[11px] text-muted-foreground">{item.client}</span>}
                  {item.amount && <span className="text-[11px] font-medium text-success">${item.amount.toLocaleString()}</span>}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {new Date(item.timestamp).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
