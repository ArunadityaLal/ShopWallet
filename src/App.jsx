import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import CartModal from "./modal/CartModal";
import CheckoutPage from "./pages/checkout-page";
import { useCart } from "./context/CartContext"; 

function App() {
  const { cart,isCartOpen } = useCart(); // ✅ Now useCart() is valid
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        {isCartOpen && <CartModal/>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          {
            cart.length>0 &&
            <Route path="/checkout" element={<CheckoutPage />} />
          }
          <Route path = "*" element = {<HomePage />} />
        </Routes>
        {isCartOpen && <CartModal />} {/* ✅ Show CartModal when cart is open */}
      </Router>
    </div>
  );
}

export default App;
