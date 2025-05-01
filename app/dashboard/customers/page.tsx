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
import { MoreHorizontal, Search } from "lucide-react"
import { ExcelExport } from "@/components/excel-export"
import { ViewOptionsDropdown } from "@/components/view-options-dropdown"
import { AddCustomerForm } from "@/components/add-customer-form"
import { useNotifications } from "@/components/notifications-provider"
import { useToast } from "@/components/ui/use-toast"
import { CustomerView } from "@/components/customer-view"
import { CustomerEdit } from "@/components/customer-edit"
import { NotificationArea } from "@/components/notification-area"

// Convert initial customer spent values to USD
const initialCustomers = [
  {
    id: "CUST001",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Active",
    orders: 12,
    spent: "$1,245",
    lastOrder: "2023-03-15",
  },
  {
    id: "CUST002",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    status: "Active",
    orders: 8,
    spent: "$876",
    lastOrder: "2023-03-12",
  },
  {
    id: "CUST003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    status: "Inactive",
    orders: 2,
    spent: "$129",
    lastOrder: "2022-11-28",
  },
  {
    id: "CUST004",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    status: "Active",
    orders: 15,
    spent: "$1,876",
    lastOrder: "2023-03-18",
  },
  {
    id: "CUST005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    status: "Active",
    orders: 6,
    spent: "$567",
    lastOrder: "2023-02-28",
  },
  {
    id: "CUST006",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    status: "Active",
    orders: 9,
    spent: "$987",
    lastOrder: "2023-03-05",
  },
  {
    id: "CUST007",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    status: "Inactive",
    orders: 3,
    spent: "$245",
    lastOrder: "2022-12-15",
  },
  {
    id: "CUST008",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    status: "Active",
    orders: 11,
    spent: "$1,123",
    lastOrder: "2023-03-10",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("all")
  const { addNotification } = useNotifications()
  const { toast } = useToast()

  // Customer view/edit states
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isViewing, setIsViewing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Filter customers based on search query and view mode
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase())

      // View mode filter
      const matchesViewMode =
        viewMode === "all" ||
        (viewMode === "active" && customer.status === "Active") ||
        (viewMode === "inactive" && customer.status === "Inactive") ||
        (viewMode === "high-value" && Number.parseFloat(customer.spent.replace(/[^0-9.-]+/g, "")) > 1000)

      return matchesSearch && matchesViewMode
    })
  }, [customers, searchQuery, viewMode])

  // Handle customer actions
  const handleCustomerAction = (action: string, customer: any) => {
    switch (action) {
      case "view":
        setSelectedCustomer(customer)
        setIsViewing(true)
        setIsEditing(false)
        addNotification({
          title: "View customer",
          description: `Viewing profile for ${customer.name}`,
          type: "info",
        })
        break
      case "edit":
        setSelectedCustomer(customer)
        setIsEditing(true)
        setIsViewing(false)
        addNotification({
          title: "Edit customer",
          description: `You are now editing ${customer.name}'s information`,
          type: "info",
        })
        break
      case "delete":
        // Remove customer from the list
        setCustomers(customers.filter((c) => c.id !== customer.id))

        // Show notification
        toast({
          title: "Customer deleted",
          description: `${customer.name} has been removed from your customer database.`,
          variant: "destructive",
        })

        addNotification({
          title: "Customer deleted",
          description: `${customer.name} has been removed from your customer database.`,
          type: "warning",
        })
        break
    }
  }

  // Add new customer
  const handleAddCustomer = (newCustomer: any) => {
    setCustomers([newCustomer, ...customers])
  }

  // Update customer
  const handleSaveCustomer = (updatedCustomer: any) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => (customer.id === updatedCustomer.id ? updatedCustomer : customer)),
    )
    setIsEditing(false)
    setSelectedCustomer(null)
  }

  // Close customer view/edit
  const handleClose = () => {
    setIsViewing(false)
    setIsEditing(false)
    setSelectedCustomer(null)
  }

  // Prepare data for Excel export
  const exportData = useMemo(() => {
    return filteredCustomers.map((customer) => ({
      ID: customer.id,
      Name: customer.name,
      Email: customer.email,
      Status: customer.status,
      Orders: customer.orders,
      "Total Spent": customer.spent,
      "Last Order": customer.lastOrder,
    }))
  }, [filteredCustomers])

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Customers" />
      <main className="flex-1 space-y-6 p-6">
        {/* Customer view/edit */}
        {isViewing && selectedCustomer && (
          <CustomerView
            customer={selectedCustomer}
            onEdit={() => {
              setIsViewing(false)
              setIsEditing(true)
            }}
            onClose={handleClose}
          />
        )}

        {isEditing && selectedCustomer && (
          <CustomerEdit customer={selectedCustomer} onSave={handleSaveCustomer} onCancel={handleClose} />
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">All Customers</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
              {filteredCustomers.length} customers
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ViewOptionsDropdown
              options={[
                { label: "All Customers", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "High Value", value: "high-value" },
              ]}
              defaultValue="all"
              onViewChange={setViewMode}
            />
            <AddCustomerForm onAddCustomer={handleAddCustomer} />
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
            <CardTitle className="text-base">Customer Database</CardTitle>
            <ExcelExport data={exportData} filename="customer-database.xlsx" buttonText="Export to Excel" />
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            customer.status === "Active"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-500"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{customer.orders}</TableCell>
                      <TableCell className="text-right">{customer.spent}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleCustomerAction("view", customer)}>
                              View customer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCustomerAction("edit", customer)}>
                              Edit customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-rose-500"
                              onClick={() => handleCustomerAction("delete", customer)}
                            >
                              Delete customer
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
              <CardTitle>Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "VIP Customers", count: 12, percentage: "5%" },
                  { name: "Regular Customers", count: 145, percentage: "60%" },
                  { name: "New Customers", count: 64, percentage: "25%" },
                  { name: "At-Risk Customers", count: 23, percentage: "10%" },
                ].map((segment) => (
                  <div key={segment.name} className="flex items-center justify-between">
                    <div className="font-medium">{segment.name}</div>
                    <div className="flex items-center gap-2">
                      <div>{segment.count}</div>
                      <div className="text-xs text-muted-foreground">({segment.percentage})</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers
                  .sort(
                    (a, b) =>
                      Number.parseFloat(b.spent.replace(/[^0-9.-]+/g, "")) -
                      Number.parseFloat(a.spent.replace(/[^0-9.-]+/g, "")),
                  )
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={customer.id} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium leading-none">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                      <div className="font-medium">{customer.spent}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers
                  .sort((a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime())
                  .slice(0, 5)
                  .map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium leading-none">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.lastOrder}</p>
                      </div>
                      <div className="font-medium">{customer.orders} orders</div>
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

