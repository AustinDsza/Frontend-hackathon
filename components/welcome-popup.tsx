"use client"

import { useEffect, useState } from "react"
import { X, LineChart } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the welcome popup has been shown before
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome") === "true"

    if (!hasSeenWelcome) {
      // Show the popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
        // Mark as seen
        localStorage.setItem("hasSeenWelcome", "true")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md px-4"
          >
            <Card className="relative overflow-hidden">
              <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-8 w-8" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>

              <CardHeader className="pb-2 pt-6">
                <div className="mb-2 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-xl">Welcome to X SPACE Dashboard</CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Live metrics are now being tracked. Watch for real-time updates.
                </p>
              </CardContent>

              <CardFooter className="flex justify-center pb-6">
                <Button onClick={handleClose}>Get Started</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

