import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            dbName: 'ecommerce_db',
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        // Tell NodeJS to terminate process immediately, even with pending async operations
        process.exit(1);
    }
};