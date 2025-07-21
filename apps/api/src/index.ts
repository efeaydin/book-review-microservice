import { createServer } from 'node:http';

import { connectDB } from 'book-review-package-db';
import { createYoga } from 'graphql-yoga';

import { schema } from './schema/index.js';

const yoga = createYoga({ schema });

const server = createServer(yoga);

async function main(): Promise<void> {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  await connectDB(MONGO_URI);

  server.listen(4000, () => {
    console.warn('🚀 GraphQL API ready at http://localhost:4000/graphql');
  });
}

main().catch((err) => {
  console.error('❌ Failed to start API', err);
});
