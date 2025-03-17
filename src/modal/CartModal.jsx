import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react"; 

const CartModal = () => {
  const { cart, setCart, setCartOpen, addToCart } = useCart();
  const navigate = useNavigate();

  // Increase quantity
  const increaseQuantity = (item) => {
    addToCart(item);
  };

  // Decrease quantity
  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // Remove item from cart
  const handleRemove = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * (item.quantity || 1),
    0
  );

  const navigateToCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-5 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Cart</h1>
        <button
          className="bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center"
          onClick={() => setCartOpen(false)}
        >
          <XCircle size={20} />
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">ITEM</th>
              <th className="py-2 text-left">PRICE</th>
              <th className="py-2 text-center">QTY</th>
              <th className="py-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-2"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="py-2">{item.price}</td>
                <td className="py-2 text-center">
                  <button
                    className="bg-gray-300 px-2 rounded text-lg mr-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  {item.quantity || 1}
                  <button
                    className="bg-gray-300 px-2 rounded text-lg ml-2"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </td>
                <td className="py-2 text-center">
                  <button
                    title="Remove"
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-center">
        {cart.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={navigateToCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded text-lg"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
