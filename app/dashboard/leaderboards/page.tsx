"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ExcelExport } from "@/components/excel-export"
import { useNotifications } from "@/components/notifications-provider"

const salesReps = [
  {
    id: "SR001",
    name: "Alex Johnson",
    region: "North",
    sales: 145890,
    target: 120000,
    deals: 48,
    performance: 121.6,
  },
  {
    id: "SR002",
    name: "Maria Garcia",
    region: "South",
    sales: 132450,
    target: 120000,
    deals: 42,
    performance: 110.4,
  },
  {
    id: "SR003",
    name: "David Kim",
    region: "East",
    sales: 128760,
    target: 120000,
    deals: 39,
    performance: 107.3,
  },
  {
    id: "SR004",
    name: "Sarah Williams",
    region: "West",
    sales: 118540,
    target: 120000,
    deals: 36,
    performance: 98.8,
  },
  {
    id: "SR005",
    name: "James Brown",
    region: "North",
    sales: 115230,
    target: 120000,
    deals: 35,
    performance: 96.0,
  },
  {
    id: "SR006",
    name: "Lisa Chen",
    region: "East",
    sales: 112890,
    target: 120000,
    deals: 34,
    performance: 94.1,
  },
  {
    id: "SR007",
    name: "Robert Martinez",
    region: "South",
    sales: 109670,
    target: 120000,
    deals: 33,
    performance: 91.4,
  },
  {
    id: "SR008",
    name: "Emily Wilson",
    region: "West",
    sales: 105430,
    target: 120000,
    deals: 32,
    performance: 87.9,
  },
]

const products = [
  {
    id: "PRD001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    sales: 245890,
    units: 985,
    growth: 18.5,
  },
  {
    id: "PRD002",
    name: 'Ultra HD Smart TV 55"',
    category: "Electronics",
    sales: 189760,
    units: 237,
    growth: 12.3,
  },
  {
    id: "PRD003",
    name: "Professional DSLR Camera",
    category: "Photography",
    sales: 156430,
    units: 120,
    growth: 8.7,
  },
  {
    id: "PRD004",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    sales: 134520,
    units: 708,
    growth: 15.2,
  },
  {
    id: "PRD005",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    sales: 98760,
    units: 3950,
    growth: 22.1,
  },
  {
    id: "PRD006",
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    sales: 87650,
    units: 1095,
    growth: 9.8,
  },
  {
    id: "PRD007",
    name: "Bluetooth Portable Speaker",
    category: "Electronics",
    sales: 76540,
    units: 587,
    growth: 7.5,
  },
  {
    id: "PRD008",
    name: "Fitness Tracker Watch",
    category: "Wearables",
    sales: 65430,
    units: 654,
    growth: 14.3,
  },
]

const regions = [
  {
    id: "REG001",
    name: "North Region",
    sales: 578900,
    target: 550000,
    growth: 15.2,
    reps: 12,
  },
  {
    id: "REG002",
    name: "South Region",
    sales: 523450,
    target: 500000,
    growth: 12.8,
    reps: 10,
  },
  {
    id: "REG003",
    name: "East Region",
    sales: 498760,
    target: 500000,
    growth: 8.5,
    reps: 9,
  },
  {
    id: "REG004",
    name: "West Region",
    sales: 467890,
    target: 450000,
    growth: 10.3,
    reps: 8,
  },
]

export default function LeaderboardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("sales-reps")
  const { addNotification } = useNotifications()

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    addNotification({
      title: `${value === "sales-reps" ? "Sales Representatives" : value === "products" ? "Products" : "Regions"} leaderboard`,
      description: `You are now viewing the ${value === "sales-reps" ? "Sales Representatives" : value === "products" ? "Products" : "Regions"} rankings.`,
      type: "info",
    })
  }

  const handleAction = (action: string, item: any, type: string) => {
    const itemName = type === "rep" ? item.name : type === "product" ? item.name : item.name

    addNotification({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} ${type}`,
      description: `You selected to ${action} ${itemName}.`,
      type: "info",
    })
  }

  // Filter data based on search query
  const filteredSalesReps = salesReps.filter(
    (rep) =>
      searchQuery === "" ||
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.region.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredProducts = products.filter(
    (product) =>
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRegions = regions.filter(
    (region) => searchQuery === "" || region.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Prepare export data
  const getExportData = () => {
    if (activeTab === "sales-reps") {
      return filteredSalesReps.map((rep, index) => ({
        Rank: index + 1,
        ID: rep.id,
        Name: rep.name,
        Region: rep.region,
        Sales: `$${rep.sales.toLocaleString()}`,
        Target: `$${rep.target.toLocaleString()}`,
        Deals: rep.deals,
        Performance: `${rep.performance.toFixed(1)}%`,
      }))
    } else if (activeTab === "products") {
      return filteredProducts.map((product, index) => ({
        Rank: index + 1,
        ID: product.id,
        Name: product.name,
        Category: product.category,
        Sales: `$${product.sales.toLocaleString()}`,
        Units: product.units,
        Growth: `${product.growth}%`,
      }))
    } else {
      return filteredRegions.map((region, index) => ({
        Rank: index + 1,
        ID: region.id,
        Name: region.name,
        Sales: `$${region.sales.toLocaleString()}`,
        Target: `$${region.target.toLocaleString()}`,
        Growth: `${region.growth}%`,
        Representatives: region.reps,
        Performance: `${((region.sales / region.target) * 100).toFixed(1)}%`,
      }))
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Leaderboards" />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Performance Rankings</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[200px] md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ExcelExport data={getExportData()} filename={`${activeTab}-leaderboard.xlsx`} buttonText="Export" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList>
            <TabsTrigger value="sales-reps">Sales Representatives</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
          </TabsList>
          <TabsContent value="sales-reps" className="space-y-6">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle className="text-base">Top Sales Representatives</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">Deals</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Performance
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSalesReps.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No sales representatives found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSalesReps
                        .sort((a, b) => b.performance - a.performance)
                        .map((rep, index) => (
                          <TableRow key={rep.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{rep.name}</TableCell>
                            <TableCell>{rep.region}</TableCell>
                            <TableCell className="text-right">${rep.sales.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${rep.target.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{rep.deals}</TableCell>
                            <TableCell className="text-right">
                              <span
                                className={`font-medium ${
                                  rep.performance >= 100
                                    ? "text-emerald-500"
                                    : rep.performance >= 90
                                      ? "text-amber-500"
                                      : "text-rose-500"
                                }`}
                              >
                                {rep.performance.toFixed(1)}%
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
                                  <DropdownMenuItem onClick={() => handleAction("view profile", rep, "rep")}>
                                    View profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAction("view sales history", rep, "rep")}>
                                    View sales history
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleAction("send message to", rep, "rep")}>
                                    Send message
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
          </TabsContent>
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle className="text-base">Top Products by Sales</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Units</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Growth
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts
                        .sort((a, b) => b.sales - a.sales)
                        .map((product, index) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="text-right">${product.sales.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{product.units.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <span className="text-emerald-500 font-medium">+{product.growth}%</span>
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
                                  <DropdownMenuItem
                                    onClick={() => handleAction("view details for", product, "product")}
                                  >
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleAction("view sales history for", product, "product")}
                                  >
                                    View sales history
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleAction("edit", product, "product")}>
                                    Edit product
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
          </TabsContent>
          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle className="text-base">Regional Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">Growth</TableHead>
                      <TableHead className="text-right">Reps</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Performance
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No regions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRegions
                        .sort((a, b) => b.sales / b.target - a.sales / a.target)
                        .map((region, index) => (
                          <TableRow key={region.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{region.name}</TableCell>
                            <TableCell className="text-right">${region.sales.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${region.target.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <span className="text-emerald-500 font-medium">+{region.growth}%</span>
                            </TableCell>
                            <TableCell className="text-right">{region.reps}</TableCell>
                            <TableCell className="text-right">
                              <span
                                className={`font-medium ${
                                  region.sales >= region.target
                                    ? "text-emerald-500"
                                    : region.sales >= region.target * 0.9
                                      ? "text-amber-500"
                                      : "text-rose-500"
                                }`}
                              >
                                {((region.sales / region.target) * 100).toFixed(1)}%
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
                                  <DropdownMenuItem onClick={() => handleAction("view details for", region, "region")}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleAction("view sales history for", region, "region")}
                                  >
                                    View sales history
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleAction("view team for", region, "region")}>
                                    View team
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

