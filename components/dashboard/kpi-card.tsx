"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: number; label: string }
  variant?: "default" | "success" | "warning" | "destructive" | "primary"
  delay?: number
}

const variantStyles = {
  default: {
    icon: "bg-secondary text-muted-foreground",
    trend: "text-muted-foreground"
  },
  success: {
    icon: "bg-success/15 text-success",
    trend: "text-success"
  },
  warning: {
    icon: "bg-warning/15 text-warning",
    trend: "text-warning"
  },
  destructive: {
    icon: "bg-destructive/15 text-destructive",
    trend: "text-destructive"
  },
  primary: {
    icon: "bg-primary/15 text-primary",
    trend: "text-primary"
  },
}

export function KpiCard({ title, value, subtitle, icon: Icon, trend, variant = "default", delay = 0 }: KpiCardProps) {
  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
          {subtitle && <span className="text-[11px] text-muted-foreground">{subtitle}</span>}
          {trend && (
            <div className={cn("flex items-center gap-1 text-[11px] font-medium", styles.trend)}>
              <span>{trend.value > 0 ? "+" : ""}{trend.value}%</span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  )
}
