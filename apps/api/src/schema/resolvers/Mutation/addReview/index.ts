import { pendingReviewModel, bookModel } from 'book-review-package-db';
import { reviewQueue } from 'book-review-package-queue';

type AddReviewArgs = {
  bookId: string;
  review: {
    content: string;
  };
};

type AddReviewResult =
  | {
      success: true;
      resourceId: string;
    }
  | {
      success: false;
      message: string;
      resourceId: null;
      errorCode: string;
    };

export default async (_: unknown, { bookId, review }: AddReviewArgs): Promise<AddReviewResult> => {
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

  await addPendingReviewJob({ pendingReviewId: savedPendingReview.id });

  return {
    success: true,
    resourceId: savedPendingReview.id,
  };
};

const addPendingReviewJob = async (data: { pendingReviewId: string }): Promise<void> => {
  await reviewQueue.add('processPendingReview', data, {
    delay: 0, // you can delay job start (ms)
    attempts: 3, // retry up to 3 times on failure
    removeOnComplete: true, // clean up
    removeOnFail: false,
  });
};
