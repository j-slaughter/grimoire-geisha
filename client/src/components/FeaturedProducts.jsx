/**
 * @module FeaturedProducts.jsx
 * @description Carousel component with featured products
 */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

import { addToCart } from '../store/reducers/cartReducer.js';
import axios from '../lib/axios.js';
import toast from 'react-hot-toast';

function FeaturedProducts({ products }) {
  // Store carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const disableStart = currentIndex === 0;
  const disableEnd = currentIndex >= products.length - itemsPerPage;

  // Get user info from state
  const { user } = useSelector((state) => state.user);
  // Needed to update the Redux store
  const dispatch = useDispatch();

  // Update size of carousel depending on window size
  useEffect(() => {
    const resizeCarousel = () => {
      // Small screen
      if (window.innerWidth < 640) setItemsPerPage(1);
      // Medium screen
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      // Large screen
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      // Default
      else setItemsPerPage(4);
    };
    // Call the function to load the appropriate size carousel initially
    resizeCarousel();
    // Listen for resizing
    window.addEventListener('resize', resizeCarousel);
    // Clean up function when component unmounts
    return () => window.removeEventListener('resize', resizeCarousel);
  }, []);

  /**
   * handleAddToCart - places selected product into user's cart
   */
  const handleAddToCart = async (product) => {
    // Check for logged in user before adding to cart
    if (user) {
      try {
        // Update cart in database
        await axios.post('/cart', { productId: product._id });
        // Update cart in state
        dispatch(addToCart(product));
        return toast.success('Added to cart!');
      } catch (error) {
        return toast.error(error.response.data.message || 'Error: Unable to add product to cart');
      }
    } else {
      return toast.error('Please login to add products to cart.', { id: 'login' });
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 font-audiowide mb-4 drop-shadow-lg animate-neonSign">
          Featured
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
                >
                  <div className="h-full bg-gradient-to-b from-transparent to-gray-900 bg-opacity-10 backdrop-blur-sm border border-emerald-500/30 rounded-lg shadow-lg hover:shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50 overflow-hidden transition-all duration-300">
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-white font-semibold animate-neonSign mb-2">
                        {product.name}
                      </h3>
                      <p className="text-emerald-300 font-medium mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        className="w-full flex items-center justify-center rounded px-4 py-2 text-center"
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="inline-block" size={22} />
                        <span className="inline ml-2">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Arrow Buttons */}
          <button
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              disableStart
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-amber-600 hover:text-amber-500'
            }`}
            disabled={disableStart}
            onClick={() => {
              setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              disableEnd
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-amber-600 hover:text-amber-500'
            }`}
            disabled={disableEnd}
            onClick={() => {
              setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
