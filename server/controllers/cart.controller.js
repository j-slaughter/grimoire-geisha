/**
 * @module cart.controller.js
 * @description Controller for handling checkout cart
 */
import Product from '../models/product.model.js';

/**
 * getCart - retrieve all products in checkout cart
 */
export const getCart = async (req, res) => {
  try {
    // Retrieve user info from previous verifyAccess middleware
    const user = req.user;
    // Retrieve products from user's cart
    // $in operator takes an array as value and matches based on values in the array
    const products = await Product.find({ _id: { $in: user.cartItems } });
    // Add cart quantity to product info
    const cartItems = products.map((product) => {
      // Find product in cart
      // Use .id instead of ._id to invoke mongoose getter method that returns string version of _id
      const cartItem = user.cartItems.find((item) => item.id === product.id);
      // Return all product fields as JSON object and add quantity as field
      return { ...product.toJSON(), quantity: cartItem.quantity };
    });
    // Return user's cart
    return res.status(200).json({ cart: cartItems, message: 'Retrieved cart products!' });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving cart products: ${error.message}` });
  }
};

/**
 * addToCart - add product to cart
 */
export const addToCart = async (req, res) => {
  try {
    // Retrieve user info from previous verifyAccess middleware
    const user = req.user;
    const { productId } = req.body;
    // Check if product already exists in user's cart
    // Use .id instead of ._id to invoke mongoose getter method that returns string version of _id
    const existingProduct = user.cartItems.find((product) => product.id === productId);
    if (existingProduct) {
      // Increment quantity
      existingProduct.quantity += 1;
    } else {
      // Add product to user's cart
      user.cartItems.push(productId);
    }
    // Save changes to the db
    await user.save();
    return res
      .status(200)
      .json({ cart: user.cartItems, message: 'Product successfully added to cart!' });
  } catch (error) {
    return res.status(500).json({ message: `Error adding product to cart: ${error.message}` });
  }
};

/**
 * updateQuantityInCart - update the quantity of a cart item
 */
export const updateQuantityInCart = async (req, res) => {
  try {
    // Retrieve user info from previous verifyAccess middleware
    const user = req.user;
    const { id } = req.params;
    const { quantity } = req.body;
    // Check if product in user's cart
    const existingProduct = user.cartItems.find((product) => product.id === id);
    if (existingProduct) {
      // Check if updated quantity is 0
      // The typeof quantity is a string, so need to compare to string
      if (quantity == 0) {
        // Remove product from cart
        user.cartItems = user.cartItems.filter((product) => product.id !== id);
      } else {
        // Update quantity in cart
        existingProduct.quantity = quantity;
      }
      // Save changes to db
      await user.save();
      return res.status(200).json({ cart: user.cartItems, message: 'Cart quantity updated!' });
    } else {
      // 404 (Not found)
      return res.status(404).json({ message: 'Product not found in cart!' });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error updating cart item quantity: ${error.message}` });
  }
};

/**
 * deleteFromCart - delete product from cart
 */
export const deleteFromCart = async (req, res) => {
  try {
    // Retrieve user info from previous verifyAccess middleware
    const user = req.user;
    const { productId } = req.body;
    // Filter product from cartItems array
    if (productId) {
      user.cartItems = user.cartItems.filter((product) => product.id !== productId);
    }
    // Save changes to db
    await user.save();
    return res
      .status(200)
      .json({ cart: user.cartItems, message: 'Product successfully deleted from cart!' });
  } catch (error) {
    return res.status(500).json({ message: `Error deleting product from cart: ${error.message}` });
  }
};
