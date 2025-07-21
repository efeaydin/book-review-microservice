import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});

export const reviewQueue = new Queue('reviewQueue', {
  connection,
});
