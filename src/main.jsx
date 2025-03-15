import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { Wallet } from 'lucide-react'
import { WalletProvider } from './context/wallet-context'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <WalletProvider>
    <App />
    </WalletProvider>
  </CartProvider>
)
