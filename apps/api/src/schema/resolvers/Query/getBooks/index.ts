import { bookModel } from 'book-review-package-db';

export default async () => {
  return bookModel.find();
};
