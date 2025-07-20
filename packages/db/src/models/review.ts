import mongoose, { Document } from 'mongoose';

export interface IReview {
  content: string;
  bookId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviewDocument extends IReview, Document {}

const ReviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  },
  { timestamps: true },
);

export const Review = mongoose.model<IReviewDocument>('Review', ReviewSchema);
