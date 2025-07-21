import mongoose, { type Document } from 'mongoose';

export interface IPendingReview {
  content: string;
  bookId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPendingReviewDocument extends IPendingReview, Document {}

const PendingReviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  },
  { timestamps: true },
);

export const PendingReview = mongoose.model<IPendingReviewDocument>(
  'PendingReview',
  PendingReviewSchema,
);
