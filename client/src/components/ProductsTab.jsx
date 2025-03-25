/**
 * @module ProductsTab.jsx
 * @description Component with list of products for admin dashboard
 */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Star, StarOff, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import Popup from 'reactjs-popup';

import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

function ProductsTab() {
  // Grab list of products from state
  const { products } = useSelector((state) => state.products);
  // Keep track of edits to products
  const [editedProduct, setEditedProduct] = useState({});

  // Needed for popup product edit form
  const categories = ['Pants', 'Tops', 'Shoes', 'Jackets', 'Glasses', 'Prints', 'Gamer Gear'];

  // Needed to update the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const editProduct = (e) => {
    e.preventDefault();
    console.log(`Editing product: ${JSON.stringify(editedProduct)}`);
    // Alert user to successful edit
    toast.success('Edited product successfully.', { duration: 3000 });
    // Refresh page
    setTimeout(() => {
      navigate(0);
    }, 3000);
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
                  {/* Popup form for editing a product */}
                  <Popup
                    trigger={
                      <button className="p-2 rounded-full hover:text-amber-600">
                        <Pencil className="inline-block" />
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="bg-gray-800 text-gray-200 shadow-lg shadow-fuchsia-500/50 ring-2 ring-fuschsia-500/50 rounded-lg p-8 mb-8 w-full mx-auto">
                        <button
                          className="absolute block py-2 px-4 mx-5 my-5 -right-10 -top-10 text-amber-600 text-2xl rounded-lg"
                          onClick={close}
                        >
                          &times;
                        </button>
                        <div className="w-full border-b-[gray] border-b border-solid text-xl text-center p-[5px] font-audiowide text-pink-400 animate-neonSign">
                          Edit Product Details
                        </div>
                        <div className="w-full py-[10px] px-[5px]">
                          <p className="text-xs mb-5">*Edit only the fields you want changed</p>
                          <form onSubmit={editProduct}>
                            <div className="mb-2">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300"
                              >
                                Product Name
                              </label>
                              <input
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                type="text"
                                id="name"
                                name="name"
                                placeholder={product.name}
                                value={editedProduct.name || product.name}
                                onChange={(e) =>
                                  setEditedProduct({ ...editedProduct, name: e.target.value })
                                }
                              />
                            </div>
                            <div className="mb-2">
                              <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-300"
                              >
                                Price
                              </label>
                              <input
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                type="number"
                                step="0.01"
                                min="0"
                                id="price"
                                name="price"
                                placeholder={product.price}
                                value={editedProduct.price || product.price}
                                onChange={(e) =>
                                  setEditedProduct({ ...editedProduct, price: e.target.value })
                                }
                              />
                            </div>
                            <div className="mb-2">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300"
                              >
                                Description
                              </label>
                              <textarea
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                rows="3"
                                id="description"
                                name="description"
                                placeholder={product.description}
                                value={editedProduct.description || product.description}
                                onChange={(e) =>
                                  setEditedProduct({
                                    ...editedProduct,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-5">
                              <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-300"
                              >
                                Category
                              </label>
                              <select
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                id="category"
                                name="category"
                                value={editedProduct.category || product.category}
                                onChange={(e) =>
                                  setEditedProduct({ ...editedProduct, category: e.target.value })
                                }
                              >
                                <option value={product.category}>{product.category}</option>
                                {categories.map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <button
                              type="submit"
                              className="w-full py-2 px-4 rounded-md shadow-sm text-amber-600"
                            >
                              Edit Product
                            </button>
                          </form>
                        </div>
                        <div className="w-full py-[10px] px-[5px] m-auto text-center">
                          <button
                            className="text-amber-600 px-4 py-2 mx-2 my-2 rounded-md"
                            onClick={() => {
                              console.log('Popup closed');
                              close();
                            }}
                          >
                            Close Edit Form
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
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
