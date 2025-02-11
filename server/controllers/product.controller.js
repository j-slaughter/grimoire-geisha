/**
 * @module product.controller.js
 * @description Controller for handling products
 */
import Product from '../models/product.model.js';
import { redis } from '../db/redis.js';
import cloudinary from '../db/cloudinary.js';

/**
 * updateFeaturedProductsCache - retrieves all featured products from db and writes them to the Redis cache
 */
const updateFeaturedProductsCache = async () => {
  try {
    // Retrieve featured products from db in plain JS object form
    const products = await Product.find({ isFeatured: true }).lean();
    // Check if any featured products
    if (products.length > 0) {
      // Save in cache
      await redis.set('featured_products', JSON.stringify(products));
    } else {
      // Clear cache
      await redis.del(['featured_products']);
    }
    console.log('Updated featured products in cache!');
    return products;
  } catch (error) {
    console.log(`Error updating featured products in cache: ${error.message}`);
  }
};

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
 * createProduct - adds a new product to db
 */
export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    // Add image to cloudinary bucket
    let uploadImg = null;
    if (product.image) {
      uploadImg = await cloudinary.uploader.upload(product.image, {
        asset_folder: 'products',
      });
    }
    // Add product to db
    const newProduct = await Product.create({
      name: product.name,
      price: product.price,
      description: product.description,
      image: uploadImg ? uploadImg.secure_url : '',
      category: product.category,
    });
    // 201 (Created)
    return res.status(201).json({ product: newProduct, message: 'Created new product!' });
  } catch (error) {
    return res.status(500).json({ message: `Error creating product: ${error.message}` });
  }
};

/**
 * updateProduct - updates a product
 */
export const updateProduct = async (req, res) => {
  const update = req.body;
  try {
    // Update the product in the db and return updated product
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (product) {
      // If isFeatured is updated, update Redis cache
      if (update['isFeatured']) {
        await updateFeaturedProductsCache();
      }
      return res.status(200).json({ product, message: 'Product updated successfully!' });
    } else {
      // 404 (Not found)
      return res.status(404).json({ message: 'Unable to update - Product not found!' });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error updating product: ${error.message}` });
  }
};

/**
 * deleteProduct - removes a product from the db and its image from cloudinary
 */
export const deleteProduct = async (req, res) => {
  try {
    // Find product in db
    const product = await Product.findById(req.params.id);
    if (product) {
      // Retrieve image id from cloudinary (Ex. https://res.cloudinary.com/cloudname/image/upload/???/publicId.jpg)
      const publicId = product.image.split('/').pop().split('.')[0];
      try {
        // Remove image from cloudinary
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log(`Error deleting image from cloudinary: ${error.message}`);
      }
      // Remove product from db
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Product deleted successfully!' });
    } else {
      // 404 (Not found)
      return res.status(404).json({ message: 'Product not found!' });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error deleting product: ${error.message}` });
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
    // Otherwise, retrieve products from db in plain JS object form and save to cache
    products = await updateFeaturedProductsCache();
    // Check if any featured products were found
    if (products.length > 0) {
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

/**
 * getRecommendedProducts - retrieves a list of recommended products
 */
export const getRecommendedProducts = async (req, res) => {
  try {
    // Retrieve a group of 4 products in plain JS object form
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          image: 1,
        },
      },
    ]);
    return res.status(200).json({ products, message: 'Retrieved recommended products' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error getting recommended products: ${error.message}` });
  }
};

/**
 * getCategoryProducts - retrieves all the products from a category from the db
 */
export const getCategoryProducts = async (req, res) => {
  const { category } = req.params;
  try {
    // Retrieve all products with specified category
    const products = await Product.find({ category });
    return res.status(200).json({ products, message: `Retrieved all ${category} products` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error retrieving ${category} products: ${error.message}` });
  }
};
