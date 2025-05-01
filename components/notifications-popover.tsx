"use client"

import type { ReactNode } from "react"
import { formatDistanceToNow } from "date-fns"
import { Bell, Check, Info, AlertTriangle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useNotifications, type Notification } from "@/components/notifications-provider"

export function NotificationsPopover({ children }: { children: ReactNode }) {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications()

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <h4 className="font-medium">Notifications</h4>
          </div>
          {notifications.length > 0 && (
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                Mark all as read
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearAllNotifications}>
                Clear all
              </Button>
            </div>
          )}
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Bell className="mb-2 h-8 w-8 text-muted-foreground/50" />
            <h3 className="font-medium">No notifications</h3>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative flex gap-3 border-b p-4 ${notification.read ? "bg-background" : "bg-muted/30"}`}
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
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  )
}

