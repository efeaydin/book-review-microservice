import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

import { connectDB, pendingReviewModel, reviewModel } from 'book-review-package-db';

const connection = new Redis({
  host: 'host.docker.internal',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

async function startWorker() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await connectDB(MONGO_URI); // ensure DB is connected before proceeding

    const reviewWorker = new Worker(
      'reviewQueue',
      async (job) => {
        const { pendingReviewId } = job.data;

        const pendingReview = await pendingReviewModel.findOneAndDelete({ _id: pendingReviewId });

        if (!pendingReview) {
          return;
        }

        const review = new reviewModel({
          content: pendingReview.content + ' worker text',
          bookId: pendingReview.bookId,
        });

        await review.save();

        console.log(`✅ Done processing review ${pendingReviewId}`);
      },
      { connection },
    );

    reviewWorker.on('failed', (job, err) => {
      console.error(`❌ Job ${job?.id} failed:`, err);
    });

    console.log('🚀 Review worker is up and waiting for jobs...');
  } catch (error) {
    console.error('❌ Failed to connect DB or start worker:', error);
  }
}

// run the worker starter
startWorker();
