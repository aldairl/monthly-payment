import mongoose from 'mongoose'
import { MONGODB_URL } from './variables';

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDatabase