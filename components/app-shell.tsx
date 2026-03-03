"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

interface AppShellProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function AppShell({ children, title, subtitle, breadcrumbs }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AppSidebar collapsed={collapsed} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[260px] border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
          <AppSidebar collapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader
          title={title}
          subtitle={subtitle}
          onToggleSidebar={() => setCollapsed(v => !v)}
          onMobileMenu={() => setMobileOpen(true)}
          breadcrumbs={breadcrumbs}
        />
        <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
