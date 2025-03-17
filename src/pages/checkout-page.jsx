"use client"

import { useState } from "react"
import { useWallet } from "../context/wallet-context"
import { CheckoutWalletSection } from "../components/checkout-wallet-section"
import { calculateCashback, formatCurrency } from "../lib/utils"
import { Button } from "../components/ui/button"
import { useCart } from "../context/CartContext"

const ORDER_CASHBACK_PERCENTAGE = 5

export default function CheckoutPage() {
  const { cart, setCart } = useCart()
  const { useWalletFunds, addCashback, getCategoryPercentage, confirmOrder } = useWallet()
  const [walletAmountToUse, setWalletAmountToUse] = useState(0)
  const [walletPaymentProcessed, setWalletPaymentProcessed] = useState(false)
  const [walletPaymentSuccess, setWalletPaymentSuccess] = useState(true)
  const [attemptedWalletPayment, setAttemptedWalletPayment] = useState(false)

  // Convert price to a number and calculate subtotal (accounting for quantity)
  const subtotal = cart.reduce(
    (sum, product) => sum + Number.parseFloat(product.price.replace("$", "")) * (product.quantity || 1),
    0,
  )

  // Get order category and its discount percentage
  const orderCategory = cart[0]?.category || "General"
  const categoryPercentage = getCategoryPercentage(orderCategory)
  const categoryDiscount = (subtotal * categoryPercentage) / 100

  // Calculate total after applying category discount and wallet funds
  const total = Math.max(0, subtotal - walletAmountToUse)

  // Calculate cashback
  const cashbackAmount = calculateCashback(total, ORDER_CASHBACK_PERCENTAGE)

  // Handle checkout
  const handleCheckout = () => {
    setWalletPaymentSuccess(true)

    if (walletAmountToUse > 0) {
      // The wallet funds are already deducted when the toggle is switched on
      // We just need to confirm the transaction now
      confirmOrder()
    }

    alert(`Order placed successfully!`)
    setCart([]) // Clear cart after successful order
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map((product, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm">Quantity: {product.quantity || 1}</p>
                  </div>
                  <span>
                    {formatCurrency(Number.parseFloat(product.price.replace("$", "")) * (product.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {walletAmountToUse > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Wallet</span>
                  <span>- {formatCurrency(walletAmountToUse)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <CheckoutWalletSection
              totalAmount={subtotal}
              category={orderCategory}
              onWalletAmountChange={setWalletAmountToUse}
            />

            <Button onClick={handleCheckout} className="w-full">
              Place Order
            </Button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

