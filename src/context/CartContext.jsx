import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => { 
    setCart((prevCart) => {
      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      ).concat(prevCart.some(cartItem => cartItem.id === item.id) ? [] : [{ ...item, quantity: 1 }]);
    });
 
    // Show temporary "Item Added to Cart" notification
    const toast = document.createElement("div");
    toast.innerText = "Item Added to Cart";
    toast.className =
      "fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg";
    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, isCartOpen, setCart, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
