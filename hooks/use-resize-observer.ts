"use client"

import { useEffect, useState, useRef, type RefObject } from "react"

export function useResizeObserver<T extends HTMLElement>(ref: RefObject<T>): number {
  const [resizeCount, setResizeCount] = useState(0)
  const observer = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (ref.current) {
      observer.current = new ResizeObserver(() => {
        setResizeCount((prev) => prev + 1)
      })
      observer.current.observe(ref.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [ref])

  return resizeCount
}

