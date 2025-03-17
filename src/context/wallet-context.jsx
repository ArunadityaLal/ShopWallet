"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create the context with a default value
const WalletContext = createContext(undefined)

const CATEGORY_PERCENTAGES = {
  Electronics: 10,
  Grocery: 2,
  Clothing: 7,
}

export function WalletProvider({ children }) {
  const INITIAL_BALANCE = 1000
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [transactions, setTransactions] = useState([])
  const [pendingAmount, setPendingAmount] = useState(0) // Track wallet amount before order
  const [pendingTransaction, setPendingTransaction] = useState(null) // Track pending transaction

  useEffect(() => {
    setBalance(INITIAL_BALANCE)
    setTransactions([])
    setPendingAmount(0)
    setPendingTransaction(null)
  }, [])

  // Get the percentage limit for a category
  const getCategoryPercentage = (category) => {
    return CATEGORY_PERCENTAGES[category] || CATEGORY_PERCENTAGES.default
  }

  // Deducts or restores wallet funds, ensuring no duplicate transactions
  const useWalletFunds = (amount, description, category, options = {}) => {
    if (balance < amount && amount > 0) return false // Prevent invalid deduction

    if (options.isReverting) {
      // Restore the pending amount
      setBalance((prev) => prev + pendingAmount)
      setPendingAmount(0)
      setPendingTransaction(null)
      return true
    }

    // If we're canceling a pending transaction
    if (amount < 0 && pendingAmount > 0) {
      setBalance((prev) => prev - amount) // Restore the balance
      setPendingAmount(0)
      setPendingTransaction(null)
      return true
    }

    if (pendingAmount === amount) {
      // Prevent duplicate transaction if already applied
      return false
    }

    // Create a new transaction but don't add it to history yet
    const newTransaction = {
      id: crypto.randomUUID(),
      amount: -amount,
      type: "purchase",
      description,
      date: new Date().toISOString(),
      category,
    }

    setBalance((prev) => prev - amount)
    setPendingAmount(amount)
    setPendingTransaction(newTransaction)

    return true
  }

  // Confirm order and finalize transaction
  const confirmOrder = () => {
    if (pendingTransaction) {
      // Only add the transaction to history when order is confirmed
      setTransactions((prev) => [pendingTransaction, ...prev])
      setPendingTransaction(null)
    }
    setPendingAmount(0) // Clear pending amount after confirming
  }

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        useWalletFunds,
        getCategoryPercentage,
        confirmOrder,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Custom hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

