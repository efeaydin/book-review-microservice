export type Review = {
  content: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  reviews: Review[];
};

export const books: Book[] = [
  {
    id: '1',
    title: '1984',
    author: 'George Orwell',
    reviews: [],
  },
  {
    id: '2',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    reviews: [],
  },
];
