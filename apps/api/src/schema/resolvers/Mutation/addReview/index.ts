import { pendingReviewModel, bookModel } from 'book-review-package-db';

type AddReviewArgs = {
  bookId: string;
  review: {
    content: string;
  };
};

export default async (_: unknown, { bookId, review }: AddReviewArgs) => {
  const bookExists = await bookModel.exists({ _id: bookId });

  if (!bookExists) {
    return {
      success: false,
      message: 'Book not found',
      resourceId: null,
      errorCode: 'BOOK_NOT_FOUND',
    };
  }

  const pendingReview = new pendingReviewModel({
    bookId,
    content: review.content,
  });

  const savedPendingReview = await pendingReview.save();

  return {
    success: true,
    resourceId: savedPendingReview.id,
  };
};
