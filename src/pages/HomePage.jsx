import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import asusLaptop from "../assets/electronicsImg/asus-laptop.png";
import earbuds from "../assets/electronicsImg/earbuds.png";
import laptop1 from "../assets/electronicsImg/laptop1.png";
import motoMobile from "../assets/electronicsImg/moto-mobile.png";
import speaker from "../assets/electronicsImg/speaker.png";
import vivoT3 from "../assets/electronicsImg/vivo-t3.png";
import jeans from "../assets/clothingImg/jeans.png";
import oversize from "../assets/clothingImg/oversize.png";
import pant from "../assets/clothingImg/pant.png";
import tshirt from "../assets/clothingImg/t-shirt.png";
import maggie from "../assets/groceryImg/maggie.png";
import mayo from "../assets/groceryImg/mayo.png";
import pasta from "../assets/groceryImg/pasta.png";
import sauce from "../assets/groceryImg/sauce.png";
import vinegar from "../assets/groceryImg/vinegar.png";

// Discount mapping
const DISCOUNTS = {
  Electronics: 10,
  Clothing: 7,
  Grocery: 2,
};

// Product data with categories
const products = [
  { id: 1,name: "Asus Laptop", price: "$999", image: asusLaptop, category: "Electronics" },
  { id:2,name: "Earbuds", price: "$49", image: earbuds, category: "Electronics" },
  { id:3,name: "Laptop 1", price: "$799", image: laptop1, category: "Electronics" },
  { id:4,name: "Moto Mobile", price: "$199", image: motoMobile, category: "Electronics" },
  { id:5,name: "Speaker", price: "$59", image: speaker, category: "Electronics" },
  { id:6,name: "Vivo T3", price: "$299", image: vivoT3, category: "Electronics" },
  { id:7,name: "Jeans", price: "$39", image: jeans, category: "Clothing" },
  { id:8,name: "Oversized T-Shirt", price: "$25", image: oversize, category: "Clothing" },
  { id:9,name: "Pant", price: "$30", image: pant, category: "Clothing" },
  { id:10,name: "T-Shirt", price: "$20", image: tshirt, category: "Clothing" },
  { id:11,name: "Maggie", price: "$5", image: maggie, category: "Grocery" },
  { id:12,name: "Mayonnaise", price: "$7", image: mayo, category: "Grocery" },
  { id:13,name: "Pasta", price: "$8", image: pasta, category: "Grocery" },
  { id:14,name: "Sauce", price: "$6", image: sauce, category: "Grocery" },
  { id:15,name: "Vinegar", price: "$4", image: vinegar, category: "Grocery" },
];

const HomePage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to ShopWallet</h1>
      <p className="mb-8 max-w-2xl mx-auto">
        Explore our e-commerce platform with integrated wallet functionality. Find the best deals on electronics,
        clothing, and groceries.
      </p>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="text-lg font-semibold mr-2">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => {
          const discount = DISCOUNTS[product.category] || 0;
          const originalPrice = parseFloat(product.price.replace("$", ""));
          const discountedPrice = (originalPrice * (1 - discount / 100)).toFixed(2);

          return (
            <div key={index} className="relative border rounded-lg p-4 bg-white shadow-md text-center flex flex-col justify-between">
              {/* Discount Badge - Top Left */}
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                  {discount}% OFF
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain rounded bg-white"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-500 line-through">{product.price}</p>
              <p className="text-green-600 font-bold">${discountedPrice}</p>

              {/* Add to Cart Button - Bottom Right */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
 