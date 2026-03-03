"use client"

import { AppShell } from "@/components/app-shell"
import { ClientsTable } from "@/components/clients/clients-table"

export default function ClientsPage() {
  return (
    <AppShell
      title="Clientes"
      subtitle="Gestion de clientes y servicios"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Clientes" }]}
    >
      <ClientsTable />
    </AppShell>
  )
}
