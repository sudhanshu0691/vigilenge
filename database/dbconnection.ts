import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable.');
}

// Improved caching logic
let cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
}

export default dbConnect;
