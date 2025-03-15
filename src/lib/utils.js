/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) { 
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  } 

  export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

  
  /**
   * Calculate cashback amount based on order total and percentage
   * @param {number} orderTotal - The total order amount
   * @param {number} percentage - The cashback percentage
   * @returns {number} The calculated cashback amount
   */
  export function calculateCashback(orderTotal, percentage) {
    return (orderTotal * percentage) / 100
  }
  
  /**
   * Generate a random ID
   * @returns {string} A random ID string
   */
  export function generateId() {
    return Math.random().toString(36).substring(2, 9)
  }
  

  