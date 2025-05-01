"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useNotifications } from "@/components/notifications-provider"
import { currencyToNumber, formatIndianRupees } from "@/utils/format-currency"

interface InlineProductEditorProps {
  product: any
  onSave: (updatedProduct: any) => void
  onCancel: () => void
  categories: string[]
}

export function InlineProductEditor({ product, onSave, onCancel, categories }: InlineProductEditorProps) {
  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price ? currencyToNumber(product.price).toString() : "",
    stock: product?.stock?.toString() || "0",
    status: product?.status || "In Stock",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required"
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Format price as Indian Rupees
      const priceNumber = Number.parseFloat(formData.price)
      const formattedPrice = formatIndianRupees(priceNumber)

      // Determine status based on stock
      const stockNumber = Number.parseInt(formData.stock)
      let status = "In Stock"

      if (stockNumber === 0) {
        status = "Out of Stock"
      } else if (stockNumber < 30) {
        status = "Low Stock"
      }

      const updatedProduct = {
        ...product,
        ...formData,
        price: formattedPrice,
        stock: stockNumber,
        status,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      onSave(updatedProduct)

      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      })

      addNotification({
        title: "Product updated",
        description: `${updatedProduct.name} has been updated successfully.`,
        type: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!product) return null

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Edit Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" name="id" value={formData.id} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                min="0"
                step="0.01"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                type="number"
                min="0"
                step="1"
                className={errors.stock ? "border-red-500" : ""}
              />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

