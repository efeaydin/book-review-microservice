import { bookModel, type IBookDocument } from 'book-review-package-db';

export default async (): Promise<IBookDocument[]> => {
  return bookModel.find();
};
