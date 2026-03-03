"use client"

import { motion } from "framer-motion"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { revenueData, clientGrowthData, trafficData, clients } from "@/lib/mock-data"

const COLORS = {
  primary: "oklch(0.62 0.18 250)",
  success: "oklch(0.65 0.18 155)",
  warning: "oklch(0.75 0.15 85)",
  destructive: "oklch(0.55 0.22 25)",
  muted: "oklch(0.30 0.02 260)",
}

const tooltipStyle = {
  contentStyle: {
    background: "oklch(0.18 0.01 260)",
    border: "1px solid oklch(0.28 0.015 260)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "oklch(0.90 0.01 260)",
  },
}

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Ingresos Mensuales</h3>
          <p className="text-[11px] text-muted-foreground">Facturado vs cobrado</p>
        </div>
        <span className="text-lg font-bold text-foreground">$225,000</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.3} />
              <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.success} stopOpacity={0.3} />
              <stop offset="100%" stopColor={COLORS.success} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={COLORS.muted} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.60 0.02 260)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "oklch(0.60 0.02 260)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip {...tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
          <Area type="monotone" dataKey="revenue" stroke={COLORS.primary} fill="url(#revGrad)" strokeWidth={2} name="Facturado" />
          <Area type="monotone" dataKey="collected" stroke={COLORS.success} fill="url(#colGrad)" strokeWidth={2} name="Cobrado" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function ClientGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Crecimiento de Clientes</h3>
          <p className="text-[11px] text-muted-foreground">Total y nuevos por mes</p>
        </div>
        <span className="text-lg font-bold text-foreground">500</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={clientGrowthData}>
          <CartesianGrid stroke={COLORS.muted} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.60 0.02 260)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "oklch(0.60 0.02 260)" }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="clients" fill={COLORS.primary} radius={[6, 6, 0, 0]} name="Total Clientes" />
          <Bar dataKey="newClients" fill={COLORS.success} radius={[6, 6, 0, 0]} name="Nuevos" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function TrafficChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Trafico de Red</h3>
          <p className="text-[11px] text-muted-foreground">Download / Upload (Mbps)</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={trafficData}>
          <defs>
            <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.3} />
              <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ulGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.warning} stopOpacity={0.3} />
              <stop offset="100%" stopColor={COLORS.warning} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={COLORS.muted} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "oklch(0.60 0.02 260)" }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fontSize: 11, fill: "oklch(0.60 0.02 260)" }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltipStyle} />
          <Area type="monotone" dataKey="download" stroke={COLORS.primary} fill="url(#dlGrad)" strokeWidth={2} name="Download" />
          <Area type="monotone" dataKey="upload" stroke={COLORS.warning} fill="url(#ulGrad)" strokeWidth={2} name="Upload" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function PaymentStatusPie() {
  const paid = clients.filter(c => c.status === "active").length
  const pending = clients.filter(c => c.status === "pending_payment").length
  const overdue = clients.filter(c => c.status === "suspended").length

  const data = [
    { name: "Al corriente", value: paid, color: COLORS.success },
    { name: "Pendiente", value: pending, color: COLORS.warning },
    { name: "Vencido", value: overdue, color: COLORS.destructive },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Estado de Pagos</h3>
        <p className="text-[11px] text-muted-foreground">Distribucion de clientes</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ color: "oklch(0.75 0.02 260)", fontSize: "11px" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
