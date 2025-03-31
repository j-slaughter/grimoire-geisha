/**
 * @module ProductCard.jsx
 * @description Card component for product viewed on category page
 */

import { useSelector } from 'react-redux';
import { ShoppingCart, ScanBarcode } from 'lucide-react';
import toast from 'react-hot-toast';
import Popup from 'reactjs-popup';

function ProductCard({ product }) {
  // Get user info from state
  const { user } = useSelector((state) => state.user);

  /**
   * addToCart - places selected product into user's cart
   */
  const addToCart = () => {
    // Check for logged in user before adding to cart
    if (user) {
      return toast.success('Added to cart!');
    } else {
      return toast.error('Please login to add products to cart.', { id: 'login' });
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-amber-700 shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50">
      <div className="flex h-60 relative overflow-hidden rounded-xl mx-3 mt-3">
        <img className="object-cover w-full" src={product.image} alt="product image" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50"></div>
      <div className="mt-4 px-5 pb-5 z-10">
        <h5 className="text-xl font-semibold tracking-tight text-white animate-neonSign">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">${product.price.toFixed(2)}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            className="flex items-center justify-center rounded-lg px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
            onClick={addToCart}
          >
            <ShoppingCart className="inline-block" size={22} />
            <span className="inline ml-2">Add to Cart</span>
          </button>
          {/* Popup of product description */}
          <Popup
            trigger={
              <button className="flex items-center justify-center rounded-lg px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-emerald-300">
                <ScanBarcode className="inline-block" size={22} />
                <span className="inline ml-2">See details</span>
              </button>
            }
            modal
            nested
            lockScroll
          >
            {(close) => (
              <div className="max-h-screen overflow-auto bg-gray-800 text-gray-200 shadow-lg shadow-fuchsia-500/50 ring-2 ring-fuschsia-500/50 rounded-lg p-8 mb-8 mx-auto max-w-4xl">
                <div className="w-full border-b-[gray] border-b border-solid text-2xl text-center p-[5px] font-audiowide text-pink-400 animate-neonSign">
                  {product.name}
                </div>
                <div className="w-full py-[10px] px-[5px] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt="product image"
                    className="object-contain max-h-1/2 max-w-1/2"
                  />
                </div>
                <div className="w-full py-[10px] px-[5px]">
                  <div>{product.description}</div>
                </div>
                <div className="w-full py-[10px] px-[5px] m-auto text-center">
                  <button
                    className="text-amber-600 px-4 py-2 mx-2 my-2 rounded-md"
                    onClick={() => {
                      console.log('Popup closed');
                      close();
                    }}
                  >
                    Close Description
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
