"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Package, Settings, TrendingUp, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Leaderboards",
    href: "/dashboard/leaderboards",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg">X SPACE</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 lg:px-4">
            {sidebarLinks.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn(
                  "mb-1 justify-start",
                  pathname === link.href ? "bg-secondary font-medium" : "font-normal",
                )}
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

