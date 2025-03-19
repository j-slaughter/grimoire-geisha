/**
 * @module ProductForm.jsx
 * @description Product form tab component for admin dashboard
 */

import { useState } from 'react';
import { CirclePlus, Upload, Loader } from 'lucide-react';
import { motion } from 'motion/react';

const categories = ['pants', 'tops', 'shoes', 'jackets', 'glasses', 'prints', 'gamer gear'];

function ProductForm() {
  // Store new product form info
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl text-center font-semibold mb-6 text-emerald-300">
        Create A New Product
      </h2>
    </motion.div>
  );
}

export default ProductForm;
