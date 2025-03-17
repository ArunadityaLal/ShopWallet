import { useWallet } from "../context/wallet-context";
import { formatCurrency } from "../lib/utils";
import { ArrowUpCircle, Clock } from "lucide-react";

export function TransactionHistory() {
  const { transactions } = useWallet();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Filter out cashback transactions
  const filteredTransactions = transactions.filter((t) => t.type !== "cashback");

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <ArrowUpCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                    {transaction.category && ` • ${transaction.category}`}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-red-600">
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
