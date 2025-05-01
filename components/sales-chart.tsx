"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/chart-container"
import { ResponsiveChartContainer } from "@/components/responsive-chart-container"
import { formatUSD } from "@/utils/format-currency"

// Updated data with USD values
const data = [
  { month: "Jan", actual: 4000, target: 4400 },
  { month: "Feb", actual: 5000, target: 4800 },
  { month: "Mar", actual: 6000, target: 5200 },
  { month: "Apr", actual: 7000, target: 5600 },
  { month: "May", actual: 8000, target: 6000 },
  { month: "Jun", actual: 9000, target: 6400 },
  { month: "Jul", actual: 10000, target: 6800 },
  { month: "Aug", actual: 11000, target: 7200 },
  { month: "Sep", actual: 12000, target: 7600 },
  { month: "Oct", actual: 13000, target: 8000 },
  { month: "Nov", actual: 14000, target: 8400 },
  { month: "Dec", actual: 15000, target: 8800 },
]

// Professional, light color palette
const colors = {
  actual: "#4F86C6", // Soft blue
  target: "#63B995", // Soft teal
}

export function SalesChart() {
  return (
    <ChartContainer title="Sales Performance">
      <ResponsiveChartContainer aspectRatio={21 / 9}>
        {(width, height) => (
          <div className="p-4" style={{ width, height }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.actual} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.actual} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.target} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.target} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: width < 500 ? 10 : 12 }} tickMargin={8} stroke="#9CA3AF" />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  width={60}
                  tick={{ fontSize: width < 500 ? 10 : 12 }}
                  stroke="#9CA3AF"
                />
                <Tooltip
                  formatter={(value) => [formatUSD(Number(value)), ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#E5E7EB",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual Sales"
                  stroke={colors.actual}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke={colors.target}
                  fillOpacity={1}
                  fill="url(#colorTarget)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </ResponsiveChartContainer>
    </ChartContainer>
  )
}

