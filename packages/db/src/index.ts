import mongoose from 'mongoose';
export * from './models/index.js';

export async function connectDB(url: string) {
  await mongoose.connect(url);
  console.log('Connected to MongoDB');
}
