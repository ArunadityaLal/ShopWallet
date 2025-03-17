"use client"

import { WalletCard } from "../components/wallet-card"
import { TransactionHistory } from "../components/transaction-history"
import { useWallet } from "../context/wallet-context"
import { Button } from "../components/ui/button"

export default function WalletPage() {
  // const { addCashback } = useWallet()

  // Demo function to add test cashback (for demonstration purposes)
  // const addTestCashback = () => {
  //   const amount = Math.floor(Math.random() * 20) + 5 // Random amount between 5 and 25
  //   const categories = ["Electronics", "Clothing", "Grocery"]
  //   const randomCategory = categories[Math.floor(Math.random() * categories.length)]

  //   addCashback(amount, `Cashback from order #${Math.floor(Math.random() * 10000)}`, randomCategory)
  // }
 
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Wallet</h1>

      <div className="grid gap-6">
        <WalletCard />

        {/* Demo section - remove in production
        <div className="bg-gray-50 p-4 rounded-lg border border-dashed">
          <h3 className="font-medium mb-2">Demo Controls</h3>
          <p className="text-sm text-gray-500 mb-3">For testing purposes only. Remove in production.</p>
          <Button onClick={addTestCashback}>Add Test Cashback</Button>
        </div> */}

        <TransactionHistory />
      </div>
    </div>
  )
}

