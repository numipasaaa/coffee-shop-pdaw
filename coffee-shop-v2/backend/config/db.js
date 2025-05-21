import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://numipasaaa:80fsMg616vF6@cluster0.0iw84qp.mongodb.net/coffee-shop').then (() => {
        console.log('MongoDB connected.');
    }).catch((err) => {
        console.log('MongoDB connection error:', err);
    });
}

// mongodb+srv://numipasaaa:80fsMg616vF6@cluster0.0iw84qp.mongodb.net/