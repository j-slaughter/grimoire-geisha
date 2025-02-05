/**
 * @module product.model.js
 * @description Creates a Product model in MongoDB
 */
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    inventory: [
        {
            size: {
                type: String,
                enum: ["XS", "S", "M", "L", "XL"]
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    // Generates createdAt and updatedAt info
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;