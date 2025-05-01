"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { ExcelExport } from "@/components/excel-export"
import { ProductInventoryDropdown } from "@/components/product-inventory-dropdown"
import { ViewOptionsDropdown } from "@/components/view-options-dropdown"
import { useNotifications } from "@/components/notifications-provider"
import { useToast } from "@/components/ui/use-toast"
import { InlineProductEditor } from "@/components/inline-product-editor"
import { ProductDetails } from "@/components/product-details"
import { NotificationArea } from "@/components/notification-area"

// Convert initial product prices to INR (assuming 1 USD = 75 INR for simplicity)
const initialProducts = [
  {
    id: "PRD001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: "₹18,749",
    stock: 120,
    sales: 1245,
    status: "In Stock",
  },
  {
    id: "PRD002",
    name: 'Ultra HD Smart TV 55"',
    category: "Electronics",
    price: "₹59,999",
    stock: 45,
    sales: 890,
    status: "In Stock",
  },
  {
    id: "PRD003",
    name: "Professional DSLR Camera",
    category: "Photography",
    price: "₹97,499",
    stock: 28,
    sales: 432,
    status: "Low Stock",
  },
  {
    id: "PRD004",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: "₹14,249",
    stock: 78,
    sales: 654,
    status: "In Stock",
  },
  {
    id: "PRD005",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: "₹1,874",
    stock: 230,
    sales: 1876,
    status: "In Stock",
  },
  {
    id: "PRD006",
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    price: "₹5,999",
    stock: 0,
    sales: 987,
    status: "Out of Stock",
  },
  {
    id: "PRD007",
    name: "Bluetooth Portable Speaker",
    category: "Electronics",
    price: "₹9,749",
    stock: 65,
    sales: 765,
    status: "In Stock",
  },
  {
    id: "PRD008",
    name: "Fitness Tracker Watch",
    category: "Wearables",
    price: "₹7,499",
    stock: 15,
    sales: 543,
    status: "Low Stock",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState("all")
  const { addNotification } = useNotifications()
  const { toast } = useToast()

  // Inline editing/viewing states
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isViewing, setIsViewing] = useState(false)

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [products])

  // Filter products based on search query, category filter, and view mode
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = categoryFilter === null || product.category === categoryFilter

      // View mode filter
      const matchesViewMode =
        viewMode === "all" ||
        (viewMode === "in-stock" && product.status === "In Stock") ||
        (viewMode === "low-stock" && product.status === "Low Stock") ||
        (viewMode === "out-of-stock" && product.status === "Out of Stock")

      return matchesSearch && matchesCategory && matchesViewMode
    })
  }, [products, searchQuery, categoryFilter, viewMode])

  // Handle product actions
  const handleProductAction = (action: string, product: any) => {
    switch (action) {
      case "edit":
        setSelectedProduct(product)
        setIsEditing(true)
        setIsViewing(false)
        break
      case "view":
        setSelectedProduct(product)
        setIsViewing(true)
        setIsEditing(false)
        break
      case "delete":
        // Remove product from the list
        setProducts(products.filter((p) => p.id !== product.id))

        // Show notification
        toast({
          title: "Product deleted",
          description: `${product.name} has been deleted.`,
          variant: "destructive",
        })

        addNotification({
          title: "Product deleted",
          description: `${product.name} has been removed from inventory.`,
          type: "warning",
        })
        break
    }
  }

  // Handle product update from edit form
  const handleSaveProduct = (updatedProduct: any) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    )

    // Close the editor
    setIsEditing(false)
    setSelectedProduct(null)
  }

  // Handle closing the editor or details view
  const handleClose = () => {
    setIsEditing(false)
    setIsViewing(false)
    setSelectedProduct(null)
  }

  // Prepare data for Excel export
  const exportData = useMemo(() => {
    return filteredProducts.map((product) => ({
      ID: product.id,
      Name: product.name,
      Category: product.category,
      Price: product.price,
      Stock: product.stock,
      Sales: product.sales,
      Status: product.status,
    }))
  }, [filteredProducts])

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Products" />
      <main className="flex-1 space-y-6 p-6">
        {/* Inline product editor or details view */}
        {isEditing && selectedProduct && (
          <InlineProductEditor
            product={selectedProduct}
            onSave={handleSaveProduct}
            onCancel={handleClose}
            categories={categories}
          />
        )}

        {isViewing && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onEdit={() => {
              setIsViewing(false)
              setIsEditing(true)
            }}
            onClose={handleClose}
          />
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">All Products</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
              {filteredProducts.length} items
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ProductInventoryDropdown categories={categories} onFilterChange={setCategoryFilter} />
            <ViewOptionsDropdown
              options={[
                { label: "All Products", value: "all" },
                { label: "In Stock", value: "in-stock" },
                { label: "Low Stock", value: "low-stock" },
                { label: "Out of Stock", value: "out-of-stock" },
              ]}
              defaultValue="all"
              onViewChange={setViewMode}
            />
            <Button size="sm" className="h-9 gap-1">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
            <CardTitle className="text-base">Product Inventory</CardTitle>
            <ExcelExport data={exportData} filename="product-inventory.xlsx" buttonText="Export to Excel" />
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">{product.sales}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            product.status === "In Stock"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500"
                              : product.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-500"
                          }`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleProductAction("edit", product)}>
                              Edit product
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleProductAction("view", product)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-rose-500"
                              onClick={() => handleProductAction("delete", product)}
                            >
                              Delete product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 5)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="font-medium">{product.sales} sales</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products
                  .filter((product) => product.stock < 30 && product.stock > 0)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.id}</p>
                      </div>
                      <div className="font-medium text-rose-500">{product.stock} left</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Electronics", count: 4, percentage: "50%" },
                  { name: "Furniture", count: 1, percentage: "12.5%" },
                  { name: "Photography", count: 1, percentage: "12.5%" },
                  { name: "Accessories", count: 1, percentage: "12.5%" },
                  { name: "Wearables", count: 1, percentage: "12.5%" },
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="font-medium">{category.name}</div>
                    <div className="flex items-center gap-2">
                      <div>{category.count} products</div>
                      <div className="text-xs text-muted-foreground">({category.percentage})</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Notification area */}
      <NotificationArea />
    </div>
  )
}

