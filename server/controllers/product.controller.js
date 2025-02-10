/**
 * @module product.controller.js
 * @description Controller for handling products
 */
import Product from '../models/product.model.js';
import { redis } from '../db/redis.js';

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

/**
 * getFeaturedProducts - retrieves all the featured products from the cache/db
 */
export const getFeaturedProducts = async (req, res) => {
  try {
    // First, try to retrieve products from cache
    let products = await redis.get('featured_products');
    if (products) {
      return res.status(200).json({
        products: JSON.parse(products),
        message: 'Retrieved all featured products from cache',
      });
    }
    // Otherwise, retrieve products from db in plain JS object form
    products = await Product.find({ isFeatured: true }).lean();
    if (products.length > 0) {
      // Save in cache
      await redis.set('featured_products', JSON.stringify(products));
      return res.status(200).json({ products, message: 'Retrieved all featured products from db' });
    } else {
      // 404 (Not found)
      return res.status(404).json({ message: 'No featured products found!' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error retrieving featured products: ${error.message}` });
  }
};
