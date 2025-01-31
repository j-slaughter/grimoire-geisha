import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Valid email is required"],
        unique: true,
        // Automatically trims leading and trailing whitespace
        trim: true,
        lowercase: true,
        // Confirms valid email format
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    }
}, {
    // Generates createdAt and updatedAt info
    timestamps: true
});

// | 0 added to convert .env variable from string to number
const workFactor = process.env.SALT_WORK_FACTOR | 0;

// Pre-hook: Hash passwords before saving in db
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        // Create salt using work factor
        const salt = await bcrypt.genSalt(workFactor);
        // Save password as hashed version
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Compare inputted password to hashed password in db for authentication
userSchema.methods.comparePassword = async (password) => {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log('Error validating password:', error.message);
    }
};

const User = mongoose.model('User', userSchema);
export default User;