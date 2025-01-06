import React, { useState, useEffect } from "react";
import CartHelper from "../helpers/CartHelper";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartError, setCartError] = useState(null);
  const cartKey = CartHelper.getCartKey();
  const baseUrl = import.meta.env.PUBLIC_API_URL;

  useEffect(() => {
    const fetchCart = async () => {
      if (!cartKey) {
        setCartError("Your cart is empty!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}/cocart/v2/cart?cart_key=${cartKey}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();

        if (!data.items || Object.keys(data.items).length === 0) {
          setCartError("Your cart is empty!");
        } else {
          setCartItems(Object.values(data.items));
          setCartTotal(data.totals.total / 100); // Convertir a euros
        }
      } catch (error) {
        console.error("Error fetching cart:", error.message);
        setCartError("An error occurred while fetching the cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cartKey, baseUrl]);

  const updateCartItemQuantity = async (itemKey, newQuantity) => {
    try {
      const url = `${baseUrl}/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      const data = await response.json();
      setCartItems(Object.values(data.items));
      setCartTotal(data.totals.total / 100); // Convertir a euros
    } catch (error) {
      console.error("Error updating item quantity:", error.message);
    }
  };

  const removeFromCart = async (itemKey) => {
    try {
      const response = await fetch(
        `${baseUrl}/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      setCartItems(Object.values(data.items));
      setCartTotal(data.totals.total / 100); // Convertir a euros
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading your cart...</p>;
  }

  if (cartError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18M9 13h6m-6 4h6M9 7h.01"
          />
        </svg>
        <p className="text-gray-600 text-lg">{cartError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.item_key}
              className="border rounded-lg shadow p-4 bg-gray-100"
            >
              {item.featured_image ? (
                <img
                  src={item.featured_image}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-700 mb-2">
                Quantity: {item.quantity.value}
              </p>
              <p className="text-gray-700 mb-4">
                Price: €{(item.price / 100).toFixed(2)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    item.quantity.value === 1
                      ? removeFromCart(item.item_key)
                      : updateCartItemQuantity(
                          item.item_key,
                          (item.quantity.value - 1).toString()
                        )
                  }
                  className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                >
                  {item.quantity.value === 1 ? "Remove" : "−"}
                </button>
                <button
                  onClick={() =>
                    updateCartItemQuantity(
                      item.item_key,
                      (item.quantity.value + 1).toString()
                    )
                  }
                  className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-gray-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {/* Lista de precios individuales */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Price Breakdown</h3>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.item_key}
                className="flex justify-between text-gray-600"
              >
                <span>
                  {item.name} ({item.quantity.value}x)
                </span>
                <span>
                  €{((item.price * item.quantity.value) / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desglose detallado de los precios */}
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">€{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 border-t pt-2">
          <span className="text-gray-800 font-semibold">Total</span>
          <span className="text-gray-800 font-bold">
            €{cartTotal.toFixed(2)}
          </span>
        </div>

        {/* Botón para proceder al pago */}
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
