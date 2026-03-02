import { createFileRoute } from "@tanstack/react-router"
import { Download } from "lucide-react"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/dashboard")({ component: DashboardPage })

const statsCards = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month" },
  { title: "Subscriptions", value: "+2350", change: "+180.1% from last month" },
  { title: "Sales", value: "+12,234", change: "+19% from last month" },
  { title: "Active Now", value: "+573", change: "+201 since last hour" },
]

function DashboardPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      <DashboardSidebar />

      {/* Content area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Download
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => (
              <StatsCard key={card.title} title={card.title} value={card.value} change={card.change} />
            ))}
          </div>

          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </main>
    </div>
  )
}
