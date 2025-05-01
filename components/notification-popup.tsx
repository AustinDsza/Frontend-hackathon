"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NotificationPopupProps {
  id: string
  title: string
  description: string
  type: "info" | "success" | "warning" | "error"
  onClose: (id: string) => void
  duration?: number
}

export function NotificationPopup({ id, title, description, type, onClose, duration = 5000 }: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Allow animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
            "bg-white dark:bg-gray-800",
            type === "success" && "border-green-500",
            type === "error" && "border-red-500",
            type === "warning" && "border-yellow-500",
            type === "info" && "border-blue-500",
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === "success" && (
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {type === "error" && (
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {type === "warning" && (
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                )}
                {type === "info" && (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    setIsVisible(false)
                    setTimeout(() => onClose(id), 300)
                  }}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={cn(
              "absolute bottom-0 left-0 h-1",
              type === "success" && "bg-green-500",
              type === "error" && "bg-red-500",
              type === "warning" && "bg-yellow-500",
              type === "info" && "bg-blue-500",
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

