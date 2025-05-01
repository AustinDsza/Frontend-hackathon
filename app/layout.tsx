import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { NotificationsProvider } from "@/components/notifications-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "X SPACE Dashboard",
  description: "A comprehensive dashboard for X SPACE with INR support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NotificationsProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </NotificationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

