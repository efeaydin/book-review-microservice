import { createSchema } from 'graphql-yoga';
import { typeDefs } from './schema.js';
import resolvers from './resolvers/index.js';

export const schema = createSchema({
  typeDefs,
  resolvers,
});
