import mongoose from 'mongoose';
export * from './models/index.js';

export async function connectDB(url: string): Promise<void> {
  await mongoose.connect(url, {
    dbName: 'book-review-dev',
  });
  console.warn('Connected to MongoDB');
}
