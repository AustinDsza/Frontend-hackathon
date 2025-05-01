"use client"

import { useState, useEffect, useRef } from "react"
import { generateRandomChange } from "@/utils/format-currency"

interface Metric {
  name: string
  value: number
  formattedValue: string
  trend: "up" | "down" | "neutral"
  changePercentage: number
}

export function useRealTimeMetrics(
  initialMetrics: Record<string, { value: number; formatter: (value: number) => string }>,
  updateInterval = 5000,
) {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({})
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize metrics
  useEffect(() => {
    const initializedMetrics: Record<string, Metric> = {}

    Object.entries(initialMetrics).forEach(([key, { value, formatter }]) => {
      initializedMetrics[key] = {
        name: key,
        value,
        formattedValue: formatter(value),
        trend: "neutral",
        changePercentage: 0,
      }
    })

    setMetrics(initializedMetrics)
  }, [])

  // Set up interval for updating metrics
  useEffect(() => {
    if (Object.keys(metrics).length === 0) return

    const updateMetrics = () => {
      setMetrics((prevMetrics) => {
        const updatedMetrics = { ...prevMetrics }

        Object.entries(prevMetrics).forEach(([key, metric]) => {
          const { value, name } = metric
          const formatter = initialMetrics[key].formatter

          // Generate new value with random change (can be positive or negative)
          const newValue = generateRandomChange(value)
          const changePercentage = ((newValue - value) / value) * 100
          const trend: "up" | "down" | "neutral" =
            changePercentage > 0 ? "up" : changePercentage < 0 ? "down" : "neutral"

          // Update metric
          updatedMetrics[key] = {
            name,
            value: newValue,
            formattedValue: formatter(newValue),
            trend,
            changePercentage: Math.abs(changePercentage),
          }
        })

        return updatedMetrics
      })
    }

    intervalRef.current = setInterval(updateMetrics, updateInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [metrics, updateInterval, initialMetrics])

  return metrics
}

