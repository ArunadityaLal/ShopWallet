import { useWallet } from "../context/wallet-context"
import { formatCurrency } from "../lib/utils"
import { ArrowDownCircle, ArrowUpCircle, Clock } from "lucide-react"

export function TransactionHistory() {
  const { transactions } = useWallet()

  // Format date to a readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                {/* ✅ Correct arrow logic */}
                {transaction.type === "cashback" ? (
                  <ArrowDownCircle className="h-8 w-8 text-green-500" /> // 🟢 Cashback earned
                ) : (
                  <ArrowUpCircle className="h-8 w-8 text-red-500" /> // 🔴 Deduction
                )}
                
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                    {transaction.category && ` • ${transaction.category}`}
                  </p>
                </div>
              </div>
              <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount > 0 ? "+" : ""}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
