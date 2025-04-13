/**
 * @module Home.jsx
 * @description Renders Home page
 */

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import CategoryItem from '../components/CategoryItem.jsx';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import axios from '../lib/axios.js';

const categories = [
  { name: 'Pants', href: '/pants', img: '/pants.png' },
  { name: 'Tops', href: '/tops', img: '/tops.png' },
  { name: 'Shoes', href: '/shoes', img: '/shoes.png' },
  { name: 'Jackets', href: '/jackets', img: '/jackets.png' },
  { name: 'Glasses', href: '/glasses', img: '/glasses.png' },
  { name: 'Prints', href: '/prints', img: '/prints.png' },
  { name: 'Gamer Gear', href: '/gear', img: '/gear.png' },
];

function Home() {
  // Store featured products
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products from database
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const res = await axios.get('/products/featured');
        setFeaturedProducts(res.data.products);
      } catch (error) {
        console.error(`Error getting featured products: ${error}`);
      } finally {
        // Update loading state
        setLoading(false);
      }
    };
    // Call the function to load featured products
    getFeaturedProducts();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-45 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 font-audiowide mb-4 drop-shadow-lg animate-neonSign">
          Shop Our Categories
        </h1>
        <p className="text-center text-xl text-amber-600 font-semibold mb-12 drop-shadow-lg ">
          Discover wearable art that fuses gaming culture and Japanese animations
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        {/* Featured Products */}
        {!loading && featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )}
        {/* Footer */}
        <div className="flex flex-col items-center justify-center py-8">
          <div>©2025 Grimoire Geisha, LLC.</div>
          <div className="flex items-center">
            Made with <Heart className="text-emerald-300 mx-2" size={16} /> in Los Angeles,
            California.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
