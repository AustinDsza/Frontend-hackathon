"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/chart-container"
import { ResponsiveChartContainer } from "@/components/responsive-chart-container"

const data = [
  { name: "Visitors", value: 5000 },
  { name: "Product Views", value: 3500 },
  { name: "Add to Cart", value: 2200 },
  { name: "Checkout", value: 1500 },
  { name: "Purchases", value: 1000 },
]

// Professional, light color palette
const barColor = "#6366F1" // Indigo

export function FunnelChart() {
  return (
    <ChartContainer title="Revenue Funnel">
      <ResponsiveChartContainer aspectRatio={21 / 9}>
        {(width, height) => (
          <div className="p-4" style={{ width, height }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: width < 500 ? 10 : 12 }} stroke="#9CA3AF" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={width < 500 ? 80 : 100}
                  tick={{ fontSize: width < 500 ? 10 : 12 }}
                  stroke="#9CA3AF"
                />
                <Tooltip
                  formatter={(value) => [`${value}`, ""]}
                  labelFormatter={(label) => `Stage: ${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#E5E7EB",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Bar dataKey="value" fill={barColor} radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </ResponsiveChartContainer>
      <div className="grid grid-cols-2 gap-4 border-t p-4 sm:grid-cols-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Conversion Rate</p>
          <p className="text-xl font-bold">20%</p>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Avg Order Value</p>
          <p className="text-xl font-bold">$120</p>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Revenue</p>
          <p className="text-xl font-bold">$120,000</p>
          <p className="text-xs text-muted-foreground">+8.1% from last month</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Customers</p>
          <p className="text-xl font-bold">1,000</p>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </div>
      </div>
    </ChartContainer>
  )
}

