import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  family: 0,
});

export const reviewQueue = new Queue('reviewQueue', {
  connection,
});
