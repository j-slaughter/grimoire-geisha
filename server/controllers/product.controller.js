/**
 * @module product.controller.js
 * @description Controller for handling products
 */
import Product from '../models/product.model.js';

/**
 * getAllProducts - retrieves all the products from the db
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products, message: 'Retrieved all products' });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving all products: ${error.message}` });
  }
};
