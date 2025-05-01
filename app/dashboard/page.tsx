"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { SalesChart } from "@/components/sales-chart"
import { FunnelChart } from "@/components/funnel-chart"
import { RegionChart } from "@/components/region-chart"
import { CustomerChart } from "@/components/customer-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications } from "@/components/notifications-provider"
import { NotificationArea } from "@/components/notification-area"
import { WelcomePopup } from "@/components/welcome-popup"
import { useRealTimeMetrics } from "@/hooks/use-real-time-metrics"
import { formatLargeUSD } from "@/utils/format-currency"

export default function DashboardPage() {
  const { addNotification } = useNotifications()
  const [activeTab, setActiveTab] = useState("overview")

  // Initialize real-time metrics with more frequent updates (3 seconds)
  const metrics = useRealTimeMetrics(
    {
      revenue: {
        value: 6031000,
        formatter: (val) => formatLargeUSD(val),
      },
      sales: {
        value: 2350,
        formatter: (val) => `+${val}`,
      },
      customers: {
        value: 573,
        formatter: (val) => `+${val}`,
      },
      conversionRate: {
        value: 24.3,
        formatter: (val) => `${val.toFixed(1)}%`,
      },
    },
    3000,
  )

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Add a notification when switching tabs
    if (value !== "overview") {
      addNotification({
        title: `${value.charAt(0).toUpperCase() + value.slice(1)} view activated`,
        description: `You are now viewing the ${value} data.`,
        type: "info",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={metrics.revenue?.formattedValue || "$6.03M"}
            change={{
              value:
                metrics.revenue?.trend === "up"
                  ? `+${metrics.revenue?.changePercentage.toFixed(2)}%`
                  : `-${metrics.revenue?.changePercentage.toFixed(2)}%`,
              percentage: metrics.revenue?.changePercentage || 20.1,
              trend: metrics.revenue?.trend || "up",
            }}
            isLive={true}
          />
          <StatCard
            title="Sales"
            value={metrics.sales?.formattedValue || "+2,350"}
            change={{
              value:
                metrics.sales?.trend === "up"
                  ? `+${metrics.sales?.changePercentage.toFixed(2)}%`
                  : `-${metrics.sales?.changePercentage.toFixed(2)}%`,
              percentage: metrics.sales?.changePercentage || 10.5,
              trend: metrics.sales?.trend || "up",
            }}
            isLive={true}
          />
          <StatCard
            title="Active Customers"
            value={metrics.customers?.formattedValue || "+573"}
            change={{
              value:
                metrics.customers?.trend === "up"
                  ? `+${metrics.customers?.changePercentage.toFixed(2)}%`
                  : `-${metrics.customers?.changePercentage.toFixed(2)}%`,
              percentage: metrics.customers?.changePercentage || 12.7,
              trend: metrics.customers?.trend || "up",
            }}
            isLive={true}
          />
          <StatCard
            title="Conversion Rate"
            value={metrics.conversionRate?.formattedValue || "24.3%"}
            change={{
              value:
                metrics.conversionRate?.trend === "up"
                  ? `+${metrics.conversionRate?.changePercentage.toFixed(2)}%`
                  : `-${metrics.conversionRate?.changePercentage.toFixed(2)}%`,
              percentage: metrics.conversionRate?.changePercentage || 3.2,
              trend: metrics.conversionRate?.trend || "up",
            }}
            isLive={true}
          />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SalesChart />
              <FunnelChart />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <RegionChart />
              <CustomerChart />
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SalesChart />
              <CustomerChart />
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FunnelChart />
              <RegionChart />
            </div>
          </TabsContent>
          <TabsContent value="visualizations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SalesChart />
              <FunnelChart />
              <RegionChart />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Notification area */}
      <NotificationArea />

      {/* Welcome popup */}
      <WelcomePopup />
    </div>
  )
}

