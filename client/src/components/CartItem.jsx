/**
 * @module CartItem.jsx
 * @description Renders cart item. Includes product name, image, description.
 */

import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { deleteFromCart, updateQuantity } from '../store/reducers/cartReducer.js';
import axios from '../lib/axios.js';
import toast from 'react-hot-toast';

function CartItem({ item }) {
  // Needed to update the Redux store
  const dispatch = useDispatch();

  /**
   * removeItem - removes product from cart
   */
  const removeItem = async (productId) => {
    try {
      // Delete product from user's cart in database
      // Note: axios delete requests with a body need to be set under a data key
      await axios.delete('/cart', { data: { productId } });
      // Update cart in Redux store
      dispatch(deleteFromCart(productId));
      toast.success('Product deleted!');
    } catch (error) {
      return toast.error(error.response.data.message || 'Error deleting product');
    }
  };

  /**
   * updateItemQuantity - updates the quantity of the product in cart
   */
  const updateItemQuantity = async (productId, quantity) => {
    // Delete product if quantity is 0
    if (quantity === 0) {
      removeItem(productId);
      return;
    }
    try {
      // Update quantity in user's cart in database
      await axios.put(`/cart/${productId}`, { quantity });
      // Update cart in Redux store
      dispatch(updateQuantity({ id: productId, quantity }));
      toast.success('Quantity updated!');
    } catch (error) {
      return toast.error(error.response.data.message || 'Error adjusting the quantity');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 md:p-6 shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50">
      <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
        <div className="shrink-0 md:order-1">
          <img
            src={item.image}
            alt={`${item.name} image`}
            className="h-24 w-24 md:h-32 rounded object-cover shadow-xl shadow-pink-500/50 ring-2 ring-pink-500/50 hover:scale-125"
          />
        </div>
        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          {/* Adjust Item Quantity */}
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
            >
              <Minus />
            </button>
            <p className="text-gray-300">{item.quantity}</p>
            <button
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
            >
              <Plus />
            </button>
          </div>
          {/* Delete Item */}
          <div className="flex items-center gap-4 md:order-4 md:ml-6">
            <button
              className="inline-flex items-center p-1 rounded-md text-red-500 hover:text-red-400"
              onClick={() => removeItem(item._id)}
            >
              <Trash2 />
            </button>
          </div>
          {/* Item Price */}
          <div className="text-end md:order-5 md:w-32">
            <p className="text-base font-bold text-emerald-400">${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="font-audiowide animate-neonSign text-white hover:text-fuchsia-400">
            {item.name}
          </p>
          <div className=" max-h-48 max-w-full md:max-w-80 overflow-y-auto">
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
