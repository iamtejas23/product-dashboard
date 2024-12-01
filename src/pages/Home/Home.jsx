import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaTags, FaShoppingCart } from 'react-icons/fa';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stats = {
    totalProducts: products.length,
    totalBrands: 20, // Hardcoded example
    ordersToday: 35, // Hardcoded example
  };

  // Fetch products from a fake API
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products') // Fake store API
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Home</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaBoxOpen className="text-blue-400 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaTags className="text-green-400 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Brands</h2>
            <p className="text-3xl font-bold">{stats.totalBrands}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaShoppingCart className="text-yellow-400 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Orders Today</h2>
            <p className="text-3xl font-bold">{stats.ordersToday}</p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm">Category: {product.category}</p>
              <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
