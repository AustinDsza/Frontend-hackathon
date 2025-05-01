"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatCardProps {
  title: string
  value: string
  change: {
    value: string
    percentage: number
    trend: "up" | "down" | "neutral"
  }
  className?: string
  isLive?: boolean
}

export function StatCard({ title, value, change, className, isLive = false }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
          {title}
          {isLive && (
            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-500">
              <span className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-red-500"></span>
              LIVE
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          {value}
        </motion.div>
        <div className="mt-2 flex items-center text-xs">
          {change.trend === "up" ? (
            <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
          ) : change.trend === "down" ? (
            <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
          ) : null}
          <motion.span
            key={change.value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "font-medium",
              change.trend === "up" && "text-emerald-500",
              change.trend === "down" && "text-rose-500",
            )}
          >
            {change.value}
          </motion.span>
          <span className="ml-1 text-muted-foreground">from last update</span>
        </div>
      </CardContent>
    </Card>
  )
}

