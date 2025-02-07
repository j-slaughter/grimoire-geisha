/**
 * @module product.model.js
 * @description Creates a Product model in MongoDB
 */
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Generates createdAt and updatedAt info
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
