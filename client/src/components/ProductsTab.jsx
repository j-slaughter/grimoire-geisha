/**
 * @module ProductsTab.jsx
 * @description Component with list of products for admin dashboard
 */

import { useSelector, useDispatch } from 'react-redux';
import { Star, StarOff, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

function ProductsTab() {
  // Grab list of products from state
  const { products } = useSelector((state) => state.products);

  // Needed to update the Redux store
  const dispatch = useDispatch();

  /**
   * removeProduct - deletes a product
   */
  const removeProduct = async (productId) => {
    try {
      console.log('deleting product');
    } catch (error) {
      console.log('Error!');
    }
  };

  /**
   * editProduct - edits a product
   */
  const editProduct = (productId) => {
    console.log('Editing product');
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50 rounded-lg mx-auto max-w-4xl overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr className="font-audiowide text-emerald-300">
            <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
              Featured
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="group hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-white">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-15 w-15">
                    <img
                      className="h-15 w-15 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4 group-hover:text-emerald-300">
                    <div className="text-sm font-medium">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">${product.price.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white group-hover:text-emerald-300">
                <div className="text-sm">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`p-2 rounded-full ${product.isFeatured ? 'text-amber-600' : ''}`}
                  onClick={() => editProduct(product._id)}
                >
                  {product.isFeatured ? <Star /> : <StarOff />}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <button
                    className="p-2 rounded-full hover:text-amber-600"
                    onClick={() => editProduct(product._id)}
                  >
                    <Pencil className="inline-block" />
                  </button>
                  <button
                    className="ml-4 p-2 rounded-full hover:text-red-500"
                    onClick={() => removeProduct(product._id)}
                  >
                    <Trash2 className="inline-block" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default ProductsTab;
