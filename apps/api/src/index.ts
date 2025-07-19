import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema/index.js';

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('🚀 GraphQL API ready at http://localhost:4000/graphql');
});
