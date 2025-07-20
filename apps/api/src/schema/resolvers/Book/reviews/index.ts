import { reviewModel, IBookDocument } from 'book-review-package-db';

export default async (book: IBookDocument) => {
  return reviewModel.find({
    bookId: book.id,
  });
};
