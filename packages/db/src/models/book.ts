import mongoose, { Document } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBookDocument extends IBook, Document {}

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true },
);

export const Book = mongoose.model<IBookDocument>('Book', BookSchema);
