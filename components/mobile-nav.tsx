"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Menu, Package, Settings, TrendingUp, Users, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const mobileLinks = [
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

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
              <Zap className="h-5 w-5 text-primary" />
              <span>X SPACE</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="grid gap-1 p-4">
            {mobileLinks.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn("justify-start", pathname === link.href ? "bg-secondary font-medium" : "font-normal")}
                onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  )
}

