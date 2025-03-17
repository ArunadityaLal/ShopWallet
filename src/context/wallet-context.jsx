"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create the context with a default value
const WalletContext = createContext(undefined)

const CATEGORY_PERCENTAGES = {
  "Electronics": 10,
  "Grocery": 2,
  "Clothing": 7,
}

export function WalletProvider({ children }) {
  const INITIAL_BALANCE = 1000 
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    setBalance(INITIAL_BALANCE)
    setTransactions([]) 
  }, [])

  // const addCashback = (amount, description, category) => {
  //   if (amount <= 0) return // Prevent invalid cashback

  //   const newTransaction = {
  //     id: crypto.randomUUID(),
  //     amount,
  //     type: "cashback",
  //     description,
  //     date: new Date().toISOString(), // Ensure consistent date format
  //     category,
  //   }

  //   setBalance((prev) => prev + amount) //  Increase balance
  //   setTransactions((prev) => [newTransaction, ...prev]) //  Add to history
  // }

  //  Get the percentage limit for a category
  const getCategoryPercentage = (category) => {
    return CATEGORY_PERCENTAGES[category] || CATEGORY_PERCENTAGES.default
  }

  //  Properly deducts amount for purchases
  const useWalletFunds = (amount, description, category) => {
    if (balance < amount) return false // Prevent invalid deduction

    const newTransaction = {
      id: crypto.randomUUID(),
      amount: -amount, //  Deduction should be negative
      type: "purchase",
      description,
      date: new Date().toISOString(),
      category,
    }

    setBalance((prev) => prev - amount) //  Deduct balance
    setTransactions((prev) => [newTransaction, ...prev]) //  Add to history

    return true
  }

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
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
