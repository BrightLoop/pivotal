import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        const connectionDetails = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;
        
        console.log(`MongoDB connected: ${connectionDetails}`);
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
