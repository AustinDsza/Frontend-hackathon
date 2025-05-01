"use client"

import { useState, useEffect } from "react"
import { X, Bell, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotifications } from "@/components/notifications-provider"
import { formatDistanceToNow } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function NotificationArea() {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Update unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  const getIcon = (type: "info" | "success" | "warning" | "error") => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      {/* Notification toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -top-16 right-0 h-10 w-10 rounded-full bg-background shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Card className="overflow-hidden shadow-lg">
              <div className="flex items-center justify-between border-b p-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <h4 className="font-medium">Notifications</h4>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{notifications.length}</span>
                </div>
                <div className="flex gap-1">
                  {notifications.length > 0 && (
                    <>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearAllNotifications}>
                        Clear all
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[300px]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <Bell className="mb-2 h-8 w-8 text-muted-foreground/50" />
                    <h3 className="font-medium">No notifications</h3>
                    <p className="text-sm text-muted-foreground">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "relative flex gap-3 border-b p-3",
                          notification.read ? "bg-background" : "bg-muted/30",
                        )}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-medium">{notification.title}</h5>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Dismiss</span>
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                          {!notification.read && (
                            <Button
                              variant="link"
                              size="sm"
                              className="mt-1 h-auto p-0 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

