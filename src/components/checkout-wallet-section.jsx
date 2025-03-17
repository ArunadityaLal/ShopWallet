"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../context/wallet-context"
import { formatCurrency } from "../lib/utils"
import { Switch } from "../components/ui/switch"

export function CheckoutWalletSection({ totalAmount, category, onWalletAmountChange }) {
  const { balance, getCategoryPercentage } = useWallet()
  const [useWalletState, setUseWallet] = useState(false)
  const [appliedAmount, setAppliedAmount] = useState(0) // Track applied amount
  const [walletFundsSuccess, setWalletFundsSuccess] = useState(false) // Track success of wallet funds usage
  const [walletFundsAmount, setWalletFundsAmount] = useState(0) // Track amount used from wallet
  const { useWalletFunds } = useWallet()

  // Calculate max applicable wallet amount
  const categoryPercentage = getCategoryPercentage(category)
  const maxApplicableAmount = (totalAmount ) / 10
  const actualApplicableAmount = Math.min(maxApplicableAmount, balance)

  useEffect(() => {
    if (useWalletState) {
      const success = useWalletFunds(actualApplicableAmount, `Used for ${category} purchase`, category)
      setWalletFundsSuccess(success)
      if (success) {
        setAppliedAmount(actualApplicableAmount)
        setWalletFundsAmount(actualApplicableAmount)
        onWalletAmountChange(actualApplicableAmount)
      }
    } else {
      // Restore balance without adding a transaction
      useWalletFunds(-appliedAmount, "", category, { skipTransaction: true })
      setAppliedAmount(0)
      setWalletFundsAmount(0)
      onWalletAmountChange(0)
    }
  }, [useWalletState, actualApplicableAmount, category, useWalletFunds, onWalletAmountChange, appliedAmount])

  // Handle toggle change
  const handleToggleChange = (checked) => {
    setUseWallet(checked)
  }

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium">Use Wallet Balance</h3>
          <p className="text-sm text-gray-500">Available: {formatCurrency(balance)}</p>
        </div>
        <Switch
          checked={useWalletState}
          onCheckedChange={handleToggleChange}
          disabled={balance <= 0 || actualApplicableAmount <= 0}
        />
      </div>

      {useWalletState && (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between text-sm mb-1">
            <span> Limit </span>
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

