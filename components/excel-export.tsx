"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useNotifications } from "@/components/notifications-provider"

interface ExcelExportProps {
  data: any[]
  filename?: string
  buttonText?: string
  className?: string
}

export function ExcelExport({
  data,
  filename = "export.xlsx",
  buttonText = "Export",
  className = "",
}: ExcelExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const exportToExcel = async () => {
    if (!data.length) {
      toast({
        title: "No data to export",
        description: "There is no data available to export.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsExporting(true)

      // Dynamically import xlsx to reduce bundle size
      const XLSX = await import("xlsx")

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data)

      // Create workbook and add the worksheet
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

      // Generate Excel file and trigger download
      XLSX.writeFile(workbook, filename)

      toast({
        title: "Export successful",
        description: `Data has been exported to ${filename}`,
      })

      addNotification({
        title: "Export successful",
        description: `Data has been exported to ${filename}`,
        type: "success",
      })
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`h-9 gap-1 ${className}`}
      onClick={exportToExcel}
      disabled={isExporting}
    >
      <Download className="h-4 w-4" />
      {isExporting ? "Exporting..." : buttonText}
    </Button>
  )
}

