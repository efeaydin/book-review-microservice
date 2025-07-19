export const typeDefs = /* GraphQL */ `
  type Review {
    content: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    reviews: [Review!]!
  }

  input ReviewInput {
    content: String!
  }

  type Query {
    getBooks: [Book!]!
  }

  type MutationResponse {
    success: Boolean!
    message: String
    errorCode: String
    resourceId: ID
  }

  type Mutation {
    addReview(bookId: ID!, review: ReviewInput!): MutationResponse!
  }
`;
