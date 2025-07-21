import { jest } from '@jest/globals';

// ✅ Mock first — BEFORE any imports
jest.unstable_mockModule('book-review-package-db', () => ({
  bookModel: {
    exists: jest.fn(),
  },
  pendingReviewModel: jest.fn(),
}));

jest.unstable_mockModule('book-review-package-queue', () => ({
  reviewQueue: {
    add: jest.fn(),
  },
}));

// ✅ THEN import the mocked modules and the resolver
const { bookModel: mockedBookModel, pendingReviewModel: MockedPendingReviewModel } = await import(
  'book-review-package-db'
);
const { reviewQueue: mockedReviewQueue } = await import('book-review-package-queue');
const resolver = (await import('../index.js')).default;

describe('addReview mutation resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error when book does not exist', async () => {
    // 🔁 Now this is the mocked version, no CastError
    (mockedBookModel.exists as jest.Mock).mockResolvedValue(false);

    const result = await resolver(null, {
      bookId: 'nonexistent-book',
      review: { content: 'Awesome read' },
    });

    expect(result).toEqual({
      success: false,
      message: 'Book not found',
      resourceId: null,
      errorCode: 'BOOK_NOT_FOUND',
    });

    expect(mockedBookModel.exists).toHaveBeenCalledWith({ _id: 'nonexistent-book' });
  });

  it('should save review and queue job when book exists', async () => {
    (mockedBookModel.exists as jest.Mock).mockResolvedValue(true);

    const saveMock = jest.fn().mockResolvedValue({ id: 'pending-review-id' });

    (MockedPendingReviewModel as jest.Mock).mockImplementation(() => ({
      save: saveMock,
    }));

    const addMock = mockedReviewQueue.add as jest.Mock;

    const result = await resolver(null, {
      bookId: 'book-123',
      review: { content: 'Great book!' },
    });

    expect(saveMock).toHaveBeenCalled();
    expect(addMock).toHaveBeenCalledWith(
      'processPendingReview',
      { pendingReviewId: 'pending-review-id' },
      expect.any(Object),
    );

    expect(result).toEqual({
      success: true,
      resourceId: 'pending-review-id',
    });
  });
});
