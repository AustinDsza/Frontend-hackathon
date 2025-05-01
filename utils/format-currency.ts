/**
 * Formats a number as US Dollars (USD)
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats a large number as USD with K/M/B suffixes
 */
export function formatLargeUSD(amount: number): string {
  if (amount < 1000) {
    return formatUSD(amount)
  }

  if (amount < 1000000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }

  if (amount < 1000000000) {
    return `$${(amount / 1000000).toFixed(2)}M`
  }

  return `$${(amount / 1000000000).toFixed(2)}B`
}

/**
 * Converts a currency string (with $ or other symbols) to a number
 */
export function currencyToNumber(currencyString: string): number {
  // Remove currency symbols, commas, and spaces
  const cleanedString = currencyString.replace(/[$₹,\s]/g, "")

  // Handle K/M/B notation
  if (cleanedString.includes("K")) {
    const value = Number.parseFloat(cleanedString.replace("K", ""))
    return value * 1000
  }

  if (cleanedString.includes("M")) {
    const value = Number.parseFloat(cleanedString.replace("M", ""))
    return value * 1000000
  }

  if (cleanedString.includes("B")) {
    const value = Number.parseFloat(cleanedString.replace("B", ""))
    return value * 1000000000
  }

  return Number.parseFloat(cleanedString)
}

/**
 * Generates a random increase or decrease in value for simulating real-time changes
 * Ensures both positive and negative fluctuations
 */
export function generateRandomChange(currentValue: number): number {
  // Generate a random change between -2% and +2%
  const changePercent = (Math.random() * 4 - 2) * 0.01
  const change = currentValue * changePercent
  return Math.round(currentValue + change)
}

/**
 * Formats a number as Indian Rupees (INR)
 */
export function formatIndianRupees(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

