import { Link } from "react-router-dom";
import { ShoppingCart, Wallet, Home } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { isCartOpen, setCartOpen } = useCart();
  const {cart, setCart} = useCart(); // Extract cart & setCartOpen
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold">
            ShopWallet
          </Link>

          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-800 flex items-center">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            <Link to="/wallet" className="text-gray-600 hover:text-gray-800 flex items-center">
              <Wallet className="h-5 w-5 mr-1" /> Wallet
            </Link>

            {/* Cart Button */}
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
