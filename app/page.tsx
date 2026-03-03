"use client"

import {
  Users, UserX, Clock, DollarSign, Wifi, WifiOff,
  Banknote, AlertTriangle
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { RevenueChart, ClientGrowthChart, TrafficChart, PaymentStatusPie } from "@/components/dashboard/dashboard-charts"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { kpis } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Vista ejecutiva - NetVision ISP">
      <div className="flex flex-col gap-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Clientes Activos"
            value={kpis.totalActiveClients.toLocaleString()}
            icon={Users}
            variant="success"
            trend={{ value: 3.2, label: "vs mes anterior" }}
            delay={0}
          />
          <KpiCard
            title="Suspendidos"
            value={kpis.suspendedClients}
            icon={UserX}
            variant="destructive"
            trend={{ value: -1.5, label: "vs mes anterior" }}
            delay={0.05}
          />
          <KpiCard
            title="Pago Pendiente"
            value={kpis.pendingPaymentClients}
            icon={Clock}
            variant="warning"
            subtitle="Requieren seguimiento"
            delay={0.1}
          />
          <KpiCard
            title="Ingreso Mensual"
            value={`$${kpis.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            variant="primary"
            trend={{ value: 5.8, label: "vs mes anterior" }}
            delay={0.15}
          />
          <KpiCard
            title="Dispositivos Online"
            value={kpis.devicesOnline}
            icon={Wifi}
            variant="success"
            subtitle="De la red completa"
            delay={0.2}
          />
          <KpiCard
            title="Dispositivos Offline"
            value={kpis.devicesOffline}
            icon={WifiOff}
            variant="destructive"
            subtitle="Requieren atencion"
            delay={0.25}
          />
          <KpiCard
            title="Cobranza Hoy"
            value={`$${kpis.todayCollections.toLocaleString()}`}
            icon={Banknote}
            variant="primary"
            trend={{ value: 12.3, label: "vs ayer" }}
            delay={0.3}
          />
          <KpiCard
            title="Cortes Proximos"
            value={kpis.upcomingCutoffs}
            icon={AlertTriangle}
            variant="warning"
            subtitle="Proximos 5 dias"
            delay={0.35}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <RevenueChart />
          <ClientGrowthChart />
        </div>

        {/* Charts Row 2 + Activity */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TrafficChart />
          <PaymentStatusPie />
          <ActivityFeed />
        </div>
      </div>
    </AppShell>
  )
}
