"use client";

import { useState, useEffect } from "react";
import { useWallet } from "../context/wallet-context";
import { CheckoutWalletSection } from "../components/checkout-wallet-section";
import { calculateCashback, formatCurrency } from "../lib/utils";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

// Cashback percentage for this order
const ORDER_CASHBACK_PERCENTAGE = 5;

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const { useWalletFunds, addCashback, getCategoryPercentage } = useWallet();
  const [walletAmountToUse, setWalletAmountToUse] = useState(0);
  const [walletPaymentProcessed, setWalletPaymentProcessed] = useState(false);
  const [walletPaymentSuccess, setWalletPaymentSuccess] = useState(true);
  const [attemptedWalletPayment, setAttemptedWalletPayment] = useState(false);

  // Convert price to a number and calculate subtotal (accounting for quantity)
  const subtotal = cart.reduce(
    (sum, product) =>
      sum + parseFloat(product.price.replace("$", "")) * (product.quantity || 1),
    0
  );

  // Get order category and its discount percentage
  const orderCategory = cart[0]?.category || "General";
  const categoryPercentage = getCategoryPercentage(orderCategory);
  const categoryDiscount = (subtotal * categoryPercentage) / 100;

  // Calculate total after applying category discount and wallet funds
  const total = Math.max(0, subtotal - categoryDiscount - walletAmountToUse);

  // Process wallet payment
  let walletPaymentResult = true;
  if (walletAmountToUse > 0 && attemptedWalletPayment && !walletPaymentProcessed) {
    walletPaymentResult = useWalletFunds(walletAmountToUse, "Payment for order", orderCategory);
    if (walletPaymentResult) {
      setWalletPaymentProcessed(true);
    }
  }

  // Handle checkout
  const handleCheckout = () => {
    setWalletPaymentSuccess(true);

    if (walletAmountToUse > 0 && !walletPaymentProcessed) {
      setAttemptedWalletPayment(true);

      if (!walletPaymentResult) {
        setWalletPaymentSuccess(false);
        alert("Failed to process wallet payment");
        return;
      }
    }

    if (!walletPaymentSuccess) return;

    // Calculate and add cashback
    const cashbackAmount = calculateCashback(total, ORDER_CASHBACK_PERCENTAGE);
    addCashback(cashbackAmount, `Cashback from order #${Math.floor(Math.random() * 10000)}`, orderCategory);

    alert(`Order placed successfully! You earned ${formatCurrency(cashbackAmount)} cashback.`);

    // Clear cart after successful checkout
    setCart([]);
  };

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
                    {formatCurrency(parseFloat(product.price.replace("$", "")) * (product.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2 text-blue-600">
                <span>Category Discount ({categoryPercentage}%)</span>
                <span>- {formatCurrency(categoryDiscount)}</span>
              </div>
              {walletAmountToUse > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Wallet Credit</span>
                  <span>- {formatCurrency(walletAmountToUse)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
            <p className="text-green-800 font-medium">
              You'll earn {formatCurrency(calculateCashback(total, ORDER_CASHBACK_PERCENTAGE))} cashback on this order!
            </p>
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
  );
}
