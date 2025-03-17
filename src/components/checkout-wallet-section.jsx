"use client"

import { useState } from "react"
import { useWallet } from "../context/wallet-context"
import { formatCurrency } from "../lib/utils"
import { Switch } from "../components/ui/switch"

export function CheckoutWalletSection({ totalAmount, category, onWalletAmountChange }) {
  const { balance, getCategoryPercentage, useWalletFunds } = useWallet()
  const [useWalletState, setUseWallet] = useState(false)
  const [appliedAmount, setAppliedAmount] = useState(0) // Track applied amount

  // Calculate max applicable wallet amount
  const categoryPercentage = getCategoryPercentage(category)
  const maxApplicableAmount = (totalAmount * categoryPercentage) / 100
  const actualApplicableAmount = Math.min(maxApplicableAmount, balance)

  // Handle toggle change
  const handleToggleChange = (checked) => {
    setUseWallet(checked)

    if (checked) {
      // Deduct from wallet & add transaction
      const success = useWalletFunds(actualApplicableAmount, `Used for ${category} purchase`, category)
      if (success) {
        setAppliedAmount(actualApplicableAmount)
        onWalletAmountChange(actualApplicableAmount)
      }
    } else {
      // Restore balance if turned off
      setAppliedAmount(0)
      onWalletAmountChange(0)
    }
  }

  return ( 
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium">Use Wallet Balance</h3>
          <p className="text-sm text-gray-500">Available: {formatCurrency(balance)}</p>
        </div>
        <Switch checked={useWalletState} onCheckedChange={handleToggleChange} disabled={balance <= 0} />
      </div>

      {useWalletState && (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between text-sm mb-1">
            <span> Limit ({categoryPercentage}%)</span>
            <span>{formatCurrency(maxApplicableAmount)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Applied from wallet</span>
            <span className="text-green-600">- {formatCurrency(appliedAmount)}</span>
          </div>
        </div>
      )}
    </div> 
  )
}
