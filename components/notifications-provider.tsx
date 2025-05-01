"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export type Notification = {
  id: string
  title: string
  description: string
  type: "info" | "success" | "warning" | "error"
  timestamp: Date
  read: boolean
}

type NotificationsContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  // Initialize with some sample notifications
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: "1",
        title: "New product added",
        description: "Premium Wireless Headphones has been added to inventory",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
      },
      {
        id: "2",
        title: "Sales target reached",
        description: "Congratulations! Your team has reached the monthly sales target",
        type: "success",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
      },
      {
        id: "3",
        title: "Low inventory alert",
        description: "Professional DSLR Camera is running low on stock",
        type: "warning",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        read: true,
      },
    ]

    setNotifications(initialNotifications)
  }, [])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.description,
      variant: notification.type === "error" ? "destructive" : "default",
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

