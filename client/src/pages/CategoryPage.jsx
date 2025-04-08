/**
 * @module CategoryPage.jsx
 * @description Renders Category page
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';

import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';
import ScrollButton from '../components/ScrollButton.jsx';

function CategoryPage() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Grab category from the route parameter
  const { category } = useParams();

  //Load category products from database to state
  useEffect(() => {
    const fetchProductsByCategory = async (category) => {
      try {
        setLoading(true);
        // Grab products from database by category
        const categoryName = category[0].toUpperCase() + category.slice(1);
        const res = await axios.get(`/products/category/${categoryName}`);
        setCategoryProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return toast.error(error.response.data.message || 'Error retrieving category products');
      }
    };
    // Call the function to load products
    fetchProductsByCategory(category);
  }, [category]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto my-45 px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 font-audiowide mb-8 drop-shadow-lg animate-neonSign"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category !== 'gear' ? category[0].toUpperCase() + category.slice(1) : 'Gamer Gear'}
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading ? (
            <Loader height={'min-h-screen'} />
          ) : (
            <>
              {categoryProducts.length === 0 && (
                <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                  No products found
                </h2>
              )}
              {categoryProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </>
          )}
        </motion.div>
        <ScrollButton />
      </div>
    </div>
  );
}

export default CategoryPage;
