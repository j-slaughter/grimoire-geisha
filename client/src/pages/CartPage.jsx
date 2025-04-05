/**
 * @module CartPage.jsx
 * @description Renders Cart page
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

import { updateSubtotal, updateTotal } from '../store/reducers/cartReducer.js';
import CartItem from '../components/CartItem.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import RecommendedProducts from '../components/RecommendedProducts.jsx';

function CartPage() {
  const { cart, coupon } = useSelector((state) => state.cart);

  // Needed to update the Redux store
  const dispatch = useDispatch();

  // Calculate the total amount in the shopping cart
  useEffect(() => {
    const calculateTotal = () => {
      // Sum the products in cart to get subtotal
      const subtotalAmount = Number(
        cart
          .reduce((sum, product) => {
            return sum + product.price * product.quantity;
          }, 0)
          .toFixed(2)
      );
      // Store subtotal in state
      dispatch(updateSubtotal(subtotalAmount));
      let totalAmount = subtotalAmount;
      // Check for coupon discount
      if (coupon) {
        const discount = subtotalAmount * (coupon.discountPercentage / 100);
        totalAmount = subtotalAmount - discount;
      }
      // Store total in state
      dispatch(updateTotal(Number(totalAmount).toFixed(2)));
    };
    // Call the function to calculate total
    calculateTotal();
  }, [cart, coupon, dispatch]);

  /**
   * EmptyCart - UI component for empty carts
   */
  const EmptyCart = () => (
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShoppingCart className="h-24 w-24 text-gray-300" />
      <h3 className="text-2xl font-semibold">Your cart is empty!</h3>
      <p className="text-amber-600">Looks like you {"haven't"} added anything to your cart yet.</p>
      <Link
        to="/"
        className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
      >
        Start Shopping
      </Link>
    </motion.div>
  );

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto my-45 max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-6 mb-6">
                {cart.map((product) => (
                  <CartItem key={product._id} item={product} />
                ))}
              </div>
            )}
            {/* Recommended Products */}
            {cart.length > 0 && <RecommendedProducts />}
          </motion.div>
          {/* Order Summary and Coupon Code Section */}
          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <div>Coupon Section</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
