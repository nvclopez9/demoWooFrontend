import React, { useEffect, useState } from "react";
import CartHelper from "../helpers/CartHelper";

const CheckoutSuccess = () => {
  const [status, setStatus] = useState("processing"); // 'processing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const cartKey = CartHelper.getCartKey();

    if (sessionId && cartKey) {
      handleOrderSuccess(sessionId, cartKey);
    } else {
      setStatus("error");
      setErrorMessage("Missing session_id or cart_key.");
    }
  }, []);

  const handleOrderSuccess = async (sessionId, cartKey) => {
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/stripe-cocart/v1/order-success`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId, cart_key: cartKey }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process the order.");
      }

      const data = await response.json();
      console.log("Order processed successfully:", data);

      CartHelper.clearCartKey(); // Limpiar carrito local
      setStatus("success");
    } catch (error) {
      console.error("Error processing the order:", error.message);
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {status === "processing" && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Processing Your Order...
          </h1>
          <p className="text-gray-600">Please wait while we finalize your order.</p>
          <div className="mt-6 animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Your order has been successfully processed. Thank you for shopping with us!
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">An error occurred: {errorMessage}</p>
        </>
      )}
    </div>
  );
};

export default CheckoutSuccess;
