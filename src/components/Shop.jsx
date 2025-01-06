import React, { useState, useEffect } from "react";
import CartHelper from "../helpers/CartHelper";

const ProductsListComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartKey, setCartKey] = useState(CartHelper.getCartKey());
  const [cartMessage, setCartMessage] = useState(null);
  const [cartError, setCartError] = useState(null);
  const baseUrl = import.meta.env.PUBLIC_API_URL;

  // Cargar productos al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/cocart/v2/products`, {
          method: "GET",
          credentials: "include", // Enviar credenciales con la solicitud
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  const addToCart = async (productId) => {
    try {
      // Construir la URL con el `cart_key` como parámetro si existe
      let url = `${baseUrl}/cocart/v2/cart/add-item?id=${productId}&quantity=1`;
      const currentCartKey = CartHelper.getCartKey();

      if (currentCartKey) {
        url += `&cart_key=${currentCartKey}`;
      }

      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // Enviar credenciales con la solicitud
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product to cart");
      }

      const data = await response.json();

      // Si no hay cartKey, guardar el que devuelve la API
      if (!currentCartKey && data.cart_key) {
        CartHelper.setCartKey(data.cart_key); // Guardar en la cookie
        setCartKey(data.cart_key);
      }

      setCartMessage("Product added to cart successfully!");
      console.log("Producto agregado correctamente:", data);
    } catch (error) {
      setCartError("An error occurred while adding the product.");
      console.error("Error adding product to cart:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Products List</h1>

        {cartMessage && (
          <p className="text-center text-green-600 font-semibold mb-4">
            {cartMessage}
          </p>
        )}

        {cartError && (
          <p className="text-center text-red-600 font-semibold mb-4">
            {cartError}
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-600">Loading products...</p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow p-4 bg-gray-100"
              >
                {product.images && product.images[0]?.src.full && (
                  <img
                    src={product.images[0].src.full}
                    alt={product.images[0].alt || product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name} - {product.prices.price / 100}{" "}
                  {product.prices.currency.currency_symbol}
                </h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                  {product.add_to_cart?.text || "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-600">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsListComponent;
