/**
 * @module ProductForm.jsx
 * @description Product form tab component for admin dashboard
 */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CirclePlus, Upload, Loader } from 'lucide-react';
import { motion } from 'motion/react';

import { updateLoading, addProduct } from '../store/reducers/productReducer.js';
import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

const categories = ['Pants', 'Tops', 'Shoes', 'Jackets', 'Glasses', 'Prints', 'Gear'];

function ProductForm() {
  // Store new product form info
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  // Get products loading info from Redux store
  const { loading } = useSelector((state) => state.products);

  // Needed to update the Redux store
  const dispatch = useDispatch();

  /**
   * handleImageUpload - handles upload of new product image
   */
  const handleImageUpload = (e) => {
    // Get image file uploaded by admin
    const file = e.target.files[0];
    if (file) {
      // Create file reader
      const reader = new FileReader();
      // Once loaded, add image to state
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      // Convert to base64 encoded string
      reader.readAsDataURL(file);
    }
  };

  /**
   * createNewProduct - creates a new product
   */
  const createNewProduct = async (productData) => {
    // Update loading state to true
    dispatch(updateLoading(true));
    // Create new product
    try {
      const res = await axios.post('/products', productData);
      // Add new product to products list
      dispatch(addProduct(res.data.product));
      dispatch(updateLoading(false));
      return toast.success('Successfully created!');
    } catch (error) {
      dispatch(updateLoading(false));
      return toast.error(error.response.data.message || 'An error occurred creating new product');
    }
  };

  /**
   * handleSubmit - handles product form data to create new product
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewProduct(newProduct);
    // Clear form fields
    setNewProduct({
      name: '',
      price: '',
      description: '',
      category: '',
      image: '',
    });
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50 rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl text-center font-semibold font-audiowide mb-6 text-emerald-300">
        Create A New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Product Name
          </label>
          <input
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <input
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            type="number"
            step="0.01"
            min="0"
            id="price"
            name="price"
            placeholder="0.00"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            rows="3"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-emerald-500"
          >
            <Upload className="inline-block" size={18} />
            <span className="inline ml-2">Upload Image</span>
          </label>
          {newProduct.image && (
            <>
              <span className="ml-3 text-sm text-gray-400">Image Uploaded!</span>
              {/* Image Preview*/}
              <img src={newProduct.image} className="h-20 w-20 ml-2" />
            </>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Loading...
            </>
          ) : (
            <>
              <CirclePlus className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default ProductForm;
