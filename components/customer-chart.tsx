"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/chart-container"
import { ResponsiveChartContainer } from "@/components/responsive-chart-container"

const data = [
  { name: "New Customers", value: 1200, color: "#4F86C6" }, // Soft blue
  { name: "Returning", value: 1800, color: "#63B995" }, // Soft teal
  { name: "Loyal", value: 800, color: "#F7C480" }, // Soft yellow
  { name: "VIP", value: 200, color: "#E57A77" }, // Soft red
]

export function CustomerChart() {
  return (
    <ChartContainer title="Customer Segmentation">
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
                    width < 350
                      ? `${(percent * 100).toFixed(0)}%`
                      : `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} customers`, ""]}
                  labelFormatter={(label) => `Segment: ${label}`}
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
      <div className="border-t p-4">
        <h3 className="mb-4 text-sm font-medium">Customer Lifetime Value by Segment</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <p className="text-xs font-medium">{item.name}</p>
              </div>
              <p className="text-xl font-bold">
                $
                {item.name === "New Customers"
                  ? "120"
                  : item.name === "Returning"
                    ? "350"
                    : item.name === "Loyal"
                      ? "780"
                      : "1,500"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  )
}

