import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from './features/productSlice'; // Adjust the path as necessary
import { Star, ChevronLeft, ChevronRight, Search, Package, Truck, RotateCcw } from 'lucide-react';

// ProductCard component
const ProductCard = ({ product }) => (
  <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[1350px] mx-auto">
    <img src={product.thumbnail} alt={product.title} className="w-1/4 object-cover" />
    <div className="p-4 flex-1">
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-1">
            <Star className="text-yellow-400 fill-current mr-1" />
            <span>{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
          </div>
          <div className="flex items-center mb-1">
            <Package className="mr-1" size={16} />
            <span>SKU: {product.sku}</span>
          </div>
          <div className="text-sm">
            Brand: {product.brand}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold mb-1">${product.price.toFixed(2)}</div>
          <div className="text-sm text-green-600 mb-1">-{product.discountPercentage}% off</div>
          <div className="text-sm">
            {product.availabilityStatus} - {product.stock} in stock
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <Truck className="mr-1" size={16} />
          <span>{product.shippingInformation}</span>
        </div>
        <div className="flex items-center">
          <RotateCcw className="mr-1" size={16} />
          <span>{product.returnPolicy}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function Dash() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const dispatch = useDispatch(); // Initialize dispatch
  const products = useSelector(selectProducts); // Get products from Redux store
  const loading = useSelector(selectLoading); // Get loading state from Redux store
  const error = useSelector(selectError); // Get error state from Redux store

  // Fetch the products from API when the component mounts
  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch fetchProducts action
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p>Loading products...</p>} {/* Loading state message */}
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[500px] pl-10 pr-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="space-y-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}

      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${
                currentPage === number + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
              }`}
              aria-current={currentPage === number + 1 ? "page" : undefined}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
