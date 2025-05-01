"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, X, Mail, Phone, Building, ShoppingBag, Calendar } from "lucide-react"
import { formatUSD } from "@/utils/format-currency"

interface CustomerViewProps {
  customer: any
  onEdit: () => void
  onClose: () => void
}

export function CustomerView({ customer, onEdit, onClose }: CustomerViewProps) {
  if (!customer) return null

  // Format the spent value to USD
  const formattedSpent = customer.spent.startsWith("$")
    ? customer.spent
    : formatUSD(Number.parseFloat(customer.spent.replace(/[^0-9.-]+/g, "")))

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{customer.name}</CardTitle>
        <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Email</h3>
              <p className="ml-auto">{customer.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Phone</h3>
              <p className="ml-auto">{customer.phone || "N/A"}</p>
            </div>

            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Company</h3>
              <p className="ml-auto">{customer.company || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Orders</h3>
              <p className="ml-auto">{customer.orders}</p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Last Order</h3>
              <p className="ml-auto">{customer.lastOrder}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 text-muted-foreground">$</div>
              <h3 className="text-sm font-medium">Total Spent</h3>
              <p className="ml-auto font-medium">{formattedSpent}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Status</h3>
          <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
        </div>

        <Separator />

        {/* Customer Notes */}
        <div>
          <h3 className="text-sm font-medium mb-2">Notes</h3>
          <p className="text-sm text-muted-foreground">
            {customer.name} has been a customer since{" "}
            {customer.lastOrder !== "N/A"
              ? new Date(customer.lastOrder).toLocaleDateString("en-US", { year: "numeric", month: "long" })
              : "recently"}
            . They have placed {customer.orders} {customer.orders === 1 ? "order" : "orders"} and spent a total of{" "}
            {formattedSpent}.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="outline" onClick={onClose}>
          <X className="mr-2 h-4 w-4" />
          Close
        </Button>
        <Button onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Customer
        </Button>
      </CardFooter>
    </Card>
  )
}

