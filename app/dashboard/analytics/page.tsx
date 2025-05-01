"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SalesChart } from "@/components/sales-chart"
import { FunnelChart } from "@/components/funnel-chart"
import { RegionChart } from "@/components/region-chart"
import { CustomerChart } from "@/components/customer-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications } from "@/components/notifications-provider"

export default function AnalyticsPage() {
  const { addNotification } = useNotifications()
  const [activeTab, setActiveTab] = useState("overview")

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    addNotification({
      title: `${value.charAt(0).toUpperCase() + value.slice(1)} view activated`,
      description: `You are now viewing the ${value} data and metrics.`,
      type: "info",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Analytics" />
      <main className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-emerald-500 font-medium">+12.3%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.5%</div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-emerald-500 font-medium">-3.8%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3m 42s</div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-emerald-500 font-medium">+18.2%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6%</div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-emerald-500 font-medium">+0.8%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SalesChart />
              <CustomerChart />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FunnelChart />
              <RegionChart />
            </div>
          </TabsContent>
          <TabsContent value="traffic" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Direct", value: "35%", change: "+5.2%" },
                      { source: "Organic Search", value: "28%", change: "+2.1%" },
                      { source: "Referral", value: "22%", change: "+7.3%" },
                      { source: "Social", value: "15%", change: "+12.5%" },
                    ].map((item) => (
                      <div key={item.source} className="flex items-center justify-between">
                        <div className="font-medium">{item.source}</div>
                        <div className="flex items-center gap-2">
                          <div>{item.value}</div>
                          <div className="text-xs text-emerald-500">{item.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { page: "/home", views: "125,430", change: "+8.2%" },
                      { page: "/products", views: "98,320", change: "+12.1%" },
                      { page: "/blog", views: "67,842", change: "+5.3%" },
                      { page: "/about", views: "45,281", change: "+2.5%" },
                      { page: "/contact", views: "32,190", change: "+1.8%" },
                    ].map((item) => (
                      <div key={item.page} className="flex items-center justify-between">
                        <div className="font-medium">{item.page}</div>
                        <div className="flex items-center gap-2">
                          <div>{item.views}</div>
                          <div className="text-xs text-emerald-500">{item.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SalesChart />
              <FunnelChart />
            </div>
          </TabsContent>
          <TabsContent value="conversions" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <RegionChart />
              <CustomerChart />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

