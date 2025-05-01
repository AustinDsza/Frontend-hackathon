"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { NotificationPopup } from "@/components/notification-popup"
import { useNotifications } from "@/components/notifications-provider"

export function NotificationPopupContainer() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeNotifications, setActiveNotifications] = useState<
    Array<{
      id: string
      title: string
      description: string
      type: "info" | "success" | "warning" | "error"
    }>
  >([])

  const { notifications } = useNotifications()

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Watch for new notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0]

      // Only add if it's not already in the active notifications
      if (!activeNotifications.some((n) => n.id === latestNotification.id)) {
        setActiveNotifications((prev) =>
          [
            {
              id: latestNotification.id,
              title: latestNotification.title,
              description: latestNotification.description,
              type: latestNotification.type,
            },
            ...prev,
          ].slice(0, 3),
        ) // Limit to 3 active notifications
      }
    }
  }, [notifications, activeNotifications])

  const handleCloseNotification = (id: string) => {
    setActiveNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  if (!isMounted) return null

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {activeNotifications.map((notification) => (
        <NotificationPopup
          key={notification.id}
          id={notification.id}
          title={notification.title}
          description={notification.description}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      ))}
    </div>,
    document.body,
  )
}

