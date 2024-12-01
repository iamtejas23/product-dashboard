import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [error, setError] = useState(null);

  // Fetch products from a fake API
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => setError('Failed to load products. Please try again later.'));
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value, categoryFilter);
  };

  // Handle category filter
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    filterProducts(searchQuery, e.target.value);
  };

  // Filter products based on search query and category
  const filterProducts = (searchQuery, category) => {
    let filtered = products;

    if (category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <FaSearch className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 rounded-md text-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <FaFilter className="text-white mr-2" />
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-md text-gray-800"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Men's clothing">Men's Clothing</option>
            <option value="Women's clothing">Women's Clothing</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
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
              <button
                onClick={() => alert(JSON.stringify(product, null, 2))}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-600'
            } hover:bg-blue-600 text-white`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
