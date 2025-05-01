"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/chart-container"
import { ResponsiveChartContainer } from "@/components/responsive-chart-container"
import { formatUSD } from "@/utils/format-currency"

const data = [
  { name: "North", value: 35000 },
  { name: "South", value: 32500 },
  { name: "East", value: 26500 },
  { name: "West", value: 32000 },
]

// Professional, light color palette
const COLORS = ["#4F86C6", "#63B995", "#F7C480", "#E57A77"]

export function RegionChart() {
  return (
    <ChartContainer title="Product Sales by Region">
      <ResponsiveChartContainer aspectRatio={1.5}>
        {(width, height) => (
          <div className="p-4" style={{ width, height }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={width < 400 ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    width < 350 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [formatUSD(Number(value)), ""]}
                  labelFormatter={(label) => `Region: ${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#E5E7EB",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </ResponsiveChartContainer>
      <div className="grid grid-cols-2 gap-4 border-t p-4 sm:grid-cols-4">
        {data.map((item, index) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <p className="text-xs font-medium">{item.name} Region</p>
            </div>
            <p className="text-xl font-bold">${(item.value / 1000).toFixed(1)}k</p>
            <p className="text-xs text-muted-foreground">
              {index === 0 ? "27.8%" : index === 1 ? "25.8%" : index === 2 ? "21.0%" : "25.4%"} of total
            </p>
          </div>
        ))}
      </div>
    </ChartContainer>
  )
}

