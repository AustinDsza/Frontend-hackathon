"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ProductDetailsModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
}

export function ProductDetailsModal({ product, isOpen, onClose, onEdit }: ProductDetailsModalProps) {
  if (!product) return null

  // Generate mock sales data for the last 6 months
  const generateMonthlySalesData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const baseSales = product.sales / 6

    return months.map((month) => ({
      month,
      sales: Math.round(baseSales * (0.8 + Math.random() * 0.4)), // Random variation
    }))
  }

  const salesData = generateMonthlySalesData()

  // Calculate product metrics
  const profitMargin = 25 + Math.floor(Math.random() * 15) // 25-40%
  const returnRate = Math.floor(Math.random() * 5) // 0-5%
  const reviewScore = (3.5 + Math.random() * 1.5).toFixed(1) // 3.5-5.0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
          <DialogDescription>Product ID: {product.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p>{product.category}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                <p className="text-lg font-bold">{product.price}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Stock</h3>
                <div className="flex items-center gap-2">
                  <p>{product.stock} units</p>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "success"
                        : product.status === "Low Stock"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
                <p>{product.sales} units</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Profit Margin</h3>
                <p>{profitMargin}%</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Return Rate</h3>
                <p>{returnRate}%</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Customer Rating</h3>
                <div className="flex items-center gap-1">
                  <p>{reviewScore}/5.0</p>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.floor(Number.parseFloat(reviewScore)) ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sales Chart */}
          <div>
            <h3 className="text-sm font-medium mb-4">Monthly Sales (Last 6 Months)</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} units`, "Sales"]} />
                  <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Separator />

          {/* Product Description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Product Description</h3>
            <p className="text-sm text-muted-foreground">
              {product.name} is a high-quality product in our {product.category} category. It has been one of our{" "}
              {product.sales > 1000 ? "best-selling" : "popular"} items, with a total of {product.sales} units sold to
              date. This product maintains a{profitMargin}% profit margin and has received an average rating of{" "}
              {reviewScore}/5.0 from our customers.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

