import { reviewModel, type IBookDocument, type IReviewDocument } from 'book-review-package-db';

export default async (book: IBookDocument): Promise<IReviewDocument[]> => {
  return reviewModel.find({
    bookId: book.id,
  });
};
