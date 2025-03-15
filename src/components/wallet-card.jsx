import { useWallet } from "../context/wallet-context"
import { Wallet } from "lucide-react"
import { formatCurrency } from "../lib/utils"

export function WalletCard() {
  const { balance } = useWallet()

  return (
    <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Wallet</h2>
        <Wallet className="h-6 w-6" />
      </div> 

      <div className="mt-2">
        <p className="text-sm opacity-80">Available Balance</p>
        <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
      </div>

      <div className="mt-6 text-sm">
        <p>Use your balance for your next purchase</p>
      </div>
    </div>
  )
}

