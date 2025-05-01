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
import { currencyToNumber, formatUSD } from "@/utils/format-currency"

interface CustomerEditProps {
  customer: any
  onSave: (updatedCustomer: any) => void
  onCancel: () => void
}

export function CustomerEdit({ customer, onSave, onCancel }: CustomerEditProps) {
  const [formData, setFormData] = useState({
    id: customer?.id || "",
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    company: customer?.company || "",
    status: customer?.status || "Active",
    orders: customer?.orders?.toString() || "0",
    spent: customer?.spent ? currencyToNumber(customer.spent).toString() : "0",
    lastOrder: customer?.lastOrder || new Date().toISOString().split("T")[0],
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
      newErrors.name = "Customer name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Format spent as USD
      const spentNumber = Number.parseFloat(formData.spent)
      const formattedSpent = formatUSD(spentNumber)

      const updatedCustomer = {
        ...customer,
        ...formData,
        orders: Number.parseInt(formData.orders),
        spent: formattedSpent,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      onSave(updatedCustomer)

      toast({
        title: "Customer updated",
        description: "The customer has been successfully updated.",
      })

      addNotification({
        title: "Customer updated",
        description: `${updatedCustomer.name}'s information has been updated successfully.`,
        type: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!customer) return null

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Edit Customer</CardTitle>
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" value={formData.company} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orders">Orders</Label>
              <Input id="orders" name="orders" type="number" min="0" value={formData.orders} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spent">Total Spent ($)</Label>
              <Input
                id="spent"
                name="spent"
                type="number"
                min="0"
                step="0.01"
                value={formData.spent}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastOrder">Last Order Date</Label>
              <Input id="lastOrder" name="lastOrder" type="date" value={formData.lastOrder} onChange={handleChange} />
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

