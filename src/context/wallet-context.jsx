"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create the context with a default value
const WalletContext = createContext(undefined)
 
// Category percentages configuration
const CATEGORY_PERCENTAGES = {
  "Electronics": 10, 
  "Grocery": 2,
  "Clothing": 7,
  default: 5, // Default percentage if categoryb not found
} 
  
export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(1000)
  const [transactions, setTransactions] = useState([])

  // Load wallet data from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("wallet_balance")
    const savedTransactions = localStorage.getItem("wallet_transactions")

    if (savedBalance) {
      setBalance(Number.parseFloat(savedBalance))
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  // Save wallet data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wallet_balance", balance.toString())
    localStorage.setItem("wallet_transactions", JSON.stringify(transactions))
  }, [balance, transactions])

  // Add cashback to wallet
  const addCashback = (amount, description, category) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      amount,
      type: "cashback",
      description,
      date: new Date(),
      category,
    }

    setBalance((prev) => prev + amount)
    setTransactions((prev) => [newTransaction, ...prev])
  }

  // Get the percentage limit for a category
  const getCategoryPercentage = (category) => {
    return CATEGORY_PERCENTAGES[category] || CATEGORY_PERCENTAGES.default
  }

  // Use wallet funds for a purchase
  const useWalletFunds = (amount, description, category) => {
    // Check if user has enough balance
    if (balance < amount) {
      return false
    }

    const newTransaction = {
      id: crypto.randomUUID(),
      amount: -amount,
      type: "purchase",
      description,
      date: new Date(),
      category,
    }

    setBalance((prev) => prev - amount)
    setTransactions((prev) => [newTransaction, ...prev])
    return true
  }

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        addCashback,
        useWalletFunds,
        getCategoryPercentage,
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

