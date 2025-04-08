/**
 * @module RecommendedProducts.jsx
 * @description Component with list of 3 products recommended to the user
 */

import { useEffect, useState } from 'react';

import axios from '../lib/axios.js';
import toast from 'react-hot-toast';

import ProductCard from './ProductCard.jsx';
import Loader from './Loader.jsx';

function RecommendedProducts() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get recommended products from database
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        // Fetch list of recommended products from database
        const res = await axios.get('/products/recommended');
        setRecommendations(res.data.products);
      } catch (error) {
        return toast.error(error.response.data.message || 'Cannot retrieve recommended products');
      } finally {
        // Update loading state
        setLoading(false);
      }
    };
    // Call the function to load recommendations
    fetchRecommendedProducts();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold font-audiowide animate-neonSign text-fuchsia-400 hover:text-emerald-400">
        Recommended For You
      </h3>
      {loading ? (
        <Loader height={'min-h-64'} />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.length === 0 && (
            <p className="text-xl font-semibold text-center col-span-full">No products found</p>
          )}
          {recommendations.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedProducts;
