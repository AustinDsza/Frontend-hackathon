"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useResizeObserver } from "@/hooks/use-resize-observer"

interface ResponsiveChartContainerProps {
  children: (width: number, height: number) => React.ReactNode
  aspectRatio?: number
  className?: string
  minHeight?: number
}

export function ResponsiveChartContainer({
  children,
  aspectRatio = 16 / 9,
  className = "",
  minHeight = 300,
}: ResponsiveChartContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const onResize = useResizeObserver(containerRef)

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      const height = Math.max(width / aspectRatio, minHeight)
      setDimensions({ width, height })
    }
  }, [onResize, aspectRatio, minHeight])

  return (
    <div ref={containerRef} className={`w-full ${className}`} style={{ height: `${dimensions.height}px` }}>
      {dimensions.width > 0 && children(dimensions.width, dimensions.height)}
    </div>
  )
}

